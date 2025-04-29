import { IGetPlayerDetailsPayload, IPlayerStateData, IUpdateGolfBagPayload } from "@/types/player.types";
import { IBasicRoundData, ITotalDistanceAvg } from "@/types/roundData.types";
import { ITotalRoundsAvg } from "@/types/roundTotals.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";

export const getPlayerInfoThunk = async (uid: string, { rejectWithValue }: any): Promise<IGetPlayerDetailsPayload | ReturnType<typeof rejectWithValue>> => {
  if (!uid) {
    console.error("getPlayerInfoThunk: UID is required.");
    return rejectWithValue('User ID not provided.');
  }

  try {
    const playerDocRef: DocumentReference<DocumentData> = doc(db, 'players', uid);
    const playerSnapshot = await getDoc(playerDocRef);

    if (!playerSnapshot.exists()) {
      console.warn(`Player data not found for UID: ${uid}`);
      return rejectWithValue('Player data not found.');
    }

    const playerData = playerSnapshot.data();

    const roundsColRef = collection(db, 'players', uid, 'rounds');
    const roundsQuery = query(roundsColRef, orderBy('roundDate', 'desc'));
    const roundsSnapshot = await getDocs(roundsQuery);

    const roundsData: IBasicRoundData[] = roundsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        roundDate: data.roundDate instanceof Timestamp ? data.roundDate.toMillis() : data.roundDate,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : data.createdAt,
      } as IBasicRoundData
    });

    const totalDistancesAvgColRef = collection(db, 'players', uid, 'totalDistancesAVG');
    const totalDistancesAvgSnapshot = await getDocs(totalDistancesAvgColRef);
    const totalDistancesAvgData: ITotalDistanceAvg[] = totalDistancesAvgSnapshot.docs.map(doc => ({
      ...doc.data()
    } as ITotalDistanceAvg));

    const totalsRoundsAvgDocRef = doc(db, 'players', uid, 'totalsRoundsAVG', 'overall');
    const totalsRoundsAvgSnapshot = await getDoc(totalsRoundsAvgDocRef);
    const totalsRoundsAvgData: ITotalRoundsAvg | null = totalsRoundsAvgSnapshot.exists()
      ? totalsRoundsAvgSnapshot.data() as ITotalRoundsAvg
      : null;

    const finalPlayerData: IPlayerStateData = {
      ...playerData,
      uid: uid,
      displayName: playerData.displayName ?? null,
      email: playerData.email ?? null,
      DOB: playerData.DOB instanceof Timestamp ? playerData.DOB.toMillis() : playerData.DOB,
      totalDistancesAVG: totalDistancesAvgData,
      totalsRoundsAVG: totalsRoundsAvgData,
      golfBag: playerData.golfBag || [],
      firstName: playerData.firstName,
      lastName: playerData.lastName,
      HCP: playerData.HCP,
      photoURL: playerData.photoURL,
    };

    return {
      player: finalPlayerData,
      rounds: roundsData,
    }

  } catch (error: any) {
    console.error("Error fetching player details:", error);
    return rejectWithValue(error.message || 'Failed to fetch player details');
  }
};



export const updatePlayerGolfBagThunk = async (payload: IUpdateGolfBagPayload, { rejectWithValue }: any) => {
  const { uid, golfBagData } = payload;

  if (!uid) {
    console.error("Player ID is required to update golf bag.");
    throw new Error("Player ID is required."); // Or handle appropriately
  }
  if (!golfBagData || !Array.isArray(golfBagData)) {
    console.error("Invalid golf bag data provided.");
    throw new Error("Invalid golf bag data.");
  }
  try {
    const playerDocRef: DocumentReference<DocumentData> = doc(db, "players", uid);
    await updateDoc(playerDocRef, { golfBag: golfBagData });
    return golfBagData;
  } catch (error: any) {
    console.error("Thunk error updating golf bag:", error);
    return rejectWithValue(error.message || 'Failed to update golf bag');
  }
}
