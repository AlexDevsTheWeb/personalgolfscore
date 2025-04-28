import { INewRound } from '@/types/round.types';
import { IDistance, IShots } from '@/types/roundData.types';
import { writeBatch } from 'firebase/firestore';
import { IRoundTotals } from "../../types/roundTotals.types";
import { db } from '../../utils/firebase/firebase.utils';
import {
  fetchExistingAverageDistances,
  prepareAverageDistanceUpdateBatch,
  prepareRoundSaveBatch
} from '../../utils/round/round.utils';

export const saveNewRoundThunk = async (_: any, thunkAPI: any) => {
  const state = thunkAPI.getState();
  const { newRoundMain, newRoundTotals, newRoundHoles, newRoundDistances } = state.newRound;
  const general: INewRound = newRoundMain.round;
  const holes: IShots[] = newRoundHoles.holes;
  const currentRoundDistances: IDistance[] = newRoundDistances.roundDistances;
  const totals: IRoundTotals = newRoundTotals.roundTotals;

  let userId: string | null = null;
  let savedRoundId: string | null = null;

  try {
    userId = state.player.player.uid;
    if (!userId) {
      console.error("Authentication Error: userId is missing.");
      return thunkAPI.rejectWithValue('User not authenticated');
    }

    const batchSaveRound = writeBatch(db);
    savedRoundId = prepareRoundSaveBatch(
      batchSaveRound,
      userId,
      general,
      totals,
      currentRoundDistances,
      holes
    );
    await batchSaveRound.commit();

    if (currentRoundDistances.length > 0 && userId && savedRoundId) {
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
        console.log("Overall player distances updated successfully.");

      } catch (avgError: any) {
        console.error("Error updating overall player distances:", avgError);
      }
    }
    else {
      console.log("No distances to update or missing userId/savedRoundId.");
    }
    return { success: true, roundId: savedRoundId };

  } catch (error: any) {
    console.error("Error saving round to Firestore: ", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save round";
    return thunkAPI.rejectWithValue(errorMessage);
  }
};