import { IFetchParams } from "@/types/round.types";
import { IShots } from "@/types/roundData.types";
import { IRoundDetails } from "@/types/roundDetails.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";

export const getRoundDetailsThunk = async (
  { playerId, roundId }: IFetchParams,
  { rejectWithValue }: any) => {

  if (!playerId || !roundId) {
    console.error('getRoundDetailsThunk: playerId and roundId are requested');
    return rejectWithValue('Player ID and Round ID are required');
  }

  try {
    const roundDocRef = doc(db, 'players', playerId, 'rounds', roundId);
    const roundDoc = await getDoc(roundDocRef);

    if (!roundDoc.exists()) {
      console.warn(`Round details not found for player ${playerId}, round ${roundId}`);
      return rejectWithValue('Round not found');
    }
    const roundData = roundDoc.data();

    const holesColRef = collection(roundDocRef, 'holes');
    const holesDoc = await getDocs(holesColRef);
    const holesData: IShots[] = holesDoc.docs.map(doc => ({
      holeNumber: parseInt(doc.id, 10),
      ...doc.data(),
    } as IShots));

    // --- 3. Fetch the 'distances' subcollection (Optional) ---
    // Uncomment and adapt if you have a distances subcollection per round
    // const distancesColRef = collection(roundDocRef, 'distances');
    // const distancesSnap = await getDocs(distancesColRef);
    // const distancesData: IDistance[] = distancesSnap.docs.map(doc => ({
    //   // Assuming IDistance is the correct type
    //   ...doc.data(),
    // } as IDistance));

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
    return rejectWithValue(error.message || 'Failed to fetch round details');
  }

};
