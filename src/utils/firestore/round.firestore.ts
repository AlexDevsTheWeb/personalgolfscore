import { INewRound } from '@/types/round.types';
import { IDistance, IShots } from '@/types/roundData.types';
import { writeBatch } from 'firebase/firestore';
import { IRoundTotals } from "../../types/roundTotals.types";
import { db } from '../../utils/firebase/firebase.utils';
import { useAppStore } from '@/store/zustand';
import { IFetchParams } from "@/types/round.types";
import { IRoundDetails } from "@/types/roundDetails.types";
import { collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
import {
  fetchExistingAverageDistances,
  fetchOverallTotalsAvg,
  prepareAverageDistanceUpdateBatch,
  prepareOverallTotalsUpdateBatch,
  prepareRoundSaveBatch
} from '../../utils/round/round.utils';
import { getCourseByName } from '@/utils/firestore/course.firestore';
import { calculateScoreDifferential } from '@/utils/whs/whs.utils';

export const getRoundDetails = async (
  { playerId, roundId }: IFetchParams
): Promise<IRoundDetails> => {

  if (!playerId || !roundId) {
    console.error('getRoundDetails: playerId and roundId are required');
    throw new Error('Player ID and Round ID are required');
  }

  try {
    const roundDocRef = doc(db, 'players', playerId, 'rounds', roundId);
    const roundDoc = await getDoc(roundDocRef);

    if (!roundDoc.exists()) {
      console.warn(`Round details not found for player ${playerId}, round ${roundId}`);
      throw new Error('Round not found');
    }
    const roundData = roundDoc.data();

    const holesColRef = collection(roundDocRef, 'holes');
    const holesDoc = await getDocs(holesColRef);
    const holesData: IShots[] = holesDoc.docs.map(doc => ({
      holeNumber: parseInt(doc.id, 10),
      ...doc.data(),
    } as IShots));

    const detailedRoundData: IRoundDetails = {
      id: roundDoc.id,
      ...roundData,
      roundDate: roundData.roundDate instanceof Timestamp ? roundData.roundDate.toMillis() : roundData.roundDate,
      createdAt: roundData.createdAt instanceof Timestamp ? roundData.createdAt.toMillis() : roundData.createdAt,
      holes: holesData,
      totals: roundData.totals,
      distances: roundData.distances,
    }

    return detailedRoundData;

  } catch (error: any) {
    console.error('Error fetching round details: ', error);
    throw error;
  }

};

export const saveNewRound = async (): Promise<{ success: boolean; roundId: string }> => {
  const store = useAppStore.getState();
  const { newRoundMain, newRoundTotals, newRoundHoles, newRoundDistances, player } = store;
  const general: INewRound = newRoundMain.round;
  const holes: IShots[] = newRoundHoles.holes;
  const currentRoundDistances: IDistance[] = newRoundDistances.roundDistances;
  const currentTotals: IRoundTotals = newRoundTotals.roundTotals;

  let userId: string | null = player?.uid ?? null;
  let savedRoundId: string | null = null;

  try {
    if (!userId) {
      console.error("Authentication Error: userId is missing.");
      throw new Error('User not authenticated');
    }

    // Compute Score Differential before saving (per D-03)
    let scoreDifferential: number | null = null;
    try {
      const course = await getCourseByName(general.roundCourse);
      const teebox = course?.teeboxes.find(t => t.name === general.roundTee);
      if (teebox && general.roundPar && general.roundPlayingHCP) {
        const sdResult = calculateScoreDifferential({
          par: general.roundPar,
          courseRating: teebox.courseRating,
          slopeRating: teebox.slopeRating,
          stablefordPoints: currentTotals.points.totals,
          playingHCP: general.roundPlayingHCP,
        });
        scoreDifferential = sdResult.scoreDifferential;
      } else {
        console.warn(
          'saveNewRound: Could not compute Score Differential — ' +
          `course="${general.roundCourse}", tee="${general.roundTee}", ` +
          `par=${general.roundPar}, playingHCP=${general.roundPlayingHCP}`
        );
      }
    } catch (sdError: any) {
      console.error('saveNewRound: Error computing Score Differential:', sdError);
      // Round save continues without SD — non-blocking
    }

    const batchSaveRound = writeBatch(db);
    savedRoundId = prepareRoundSaveBatch(
      batchSaveRound,
      userId,
      general,
      currentTotals,
      currentRoundDistances,
      holes,
      scoreDifferential
    );
    await batchSaveRound.commit();

    if (currentRoundDistances.length > 0 && userId) {
      try {
        const existingAveragesMap = await fetchExistingAverageDistances(userId);
        const batchUpdateAverages = writeBatch(db);
        prepareAverageDistanceUpdateBatch(
          batchUpdateAverages,
          userId,
          currentRoundDistances,
          existingAveragesMap
        );

        await batchUpdateAverages.commit();

      } catch (avgError: any) {
        console.error("Error updating overall player distances:", avgError);
      }
    }
    else {
      console.log("No distances to update or missing userId/savedRoundId.");
    }

    if (userId && currentTotals) {
      try {
        const existingTotalsAvg = await fetchOverallTotalsAvg(userId);
        const batchUpdateTotals = writeBatch(db);
        prepareOverallTotalsUpdateBatch(
          batchUpdateTotals,
          userId,
          currentTotals,
          existingTotalsAvg
        );

        await batchUpdateTotals.commit();
      } catch (totalsError: any) {
        console.error("Error updating totals:", totalsError);
      }

    } else {
      console.log("Missing userId or current round totals for statistics update.");
    }

    return { success: true, roundId: savedRoundId ?? '' };

  } catch (error: any) {
    console.error("Error saving round to Firestore: ", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save round";
    throw new Error(errorMessage);
  }
};
