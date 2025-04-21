import { INewRound } from '@/types/round.types';
import { IDistance, IShots } from '@/types/roundData.types';
import { collection, doc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import { IRoundTotals } from "../../types/roundTotals.types";
import { db } from '../../utils/firebase/firebase.utils';

export const saveNewRoundThunk = async (_: any, thunkAPI: any) => {
  const state = thunkAPI.getState();
  const { newRoundMain, newRoundTotals, newRoundHoles, newRoundDistances } = state.newRound;
  const general: INewRound = newRoundMain.round;
  const holes: IShots[] = newRoundHoles.holes;
  const distances: IDistance[] = newRoundDistances.roundDistances;
  const totals: IRoundTotals = newRoundTotals.roundTotals;

  try {
    const userId = state.player.player.uid;
    if (!userId) {
      console.error("Authentication Error: userId is missing.");
      return thunkAPI.rejectWithValue('User not authenticated');
    }

    const batch = writeBatch(db);
    const playerRoundsCollectionRef = collection(db, 'players', userId, 'rounds');

    const roundRef = doc(playerRoundsCollectionRef);
    const roundId = roundRef.id;

    batch.set(roundRef, {
      ...general,
      totals: totals,
      userId: userId,
      roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    holes.forEach((holeData: IShots) => {
      const holeDocId = holeData.holeNumber?.toString();
      if (holeDocId && holeData.holeNumber > 0) {
        const holeRef = doc(db, 'players', userId, 'rounds', roundId, 'holes', holeDocId);
        batch.set(holeRef, holeData);
      } else {
        console.warn("Skipping hole due to missing/invalid holeNumber: ", holeData);
      }
    });

    distances.forEach((distanceData: IDistance) => {
      const distanceRef = doc(collection(db, 'players', userId, 'rounds', roundId, 'distances'));
      batch.set(distanceRef, distanceData);
    });

    await batch.commit();
    return { success: true, roundId: roundId };

  } catch (error: any) {
    console.error("Error saving round to Firestore: ", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save round";
    return thunkAPI.rejectWithValue(errorMessage);
  }

};