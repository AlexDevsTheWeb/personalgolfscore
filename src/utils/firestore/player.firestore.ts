import { IGetPlayerDetailsPayload, IPlayerDetails, IPlayerStateData, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from "@/types/player.types";
import { IBasicRoundData, ITotalDistanceAvg } from "@/types/roundData.types";
import { ITotalRoundsAvg } from "@/types/roundTotals.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";

export const getPlayerInfo = async (uid: string): Promise<IGetPlayerDetailsPayload> => {
  if (!uid) {
    console.error("getPlayerInfo: UID is required.");
    throw new Error('User ID not provided.');
  }

  try {
    const playerDocRef: DocumentReference<DocumentData> = doc(db, 'players', uid);
    const playerSnapshot = await getDoc(playerDocRef);

    if (!playerSnapshot.exists()) {
      console.warn(`Player data not found for UID: ${uid}`);
      throw new Error('Player data not found.');
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
      initialHCP: playerData.initialHCP ?? null,
      currentHCP: playerData.currentHCP ?? null,
      photoURL: playerData.photoURL,
      isSetupComplete: playerData.isSetupComplete ?? false,
    };

    return {
      player: finalPlayerData,
      rounds: roundsData,
    }

  } catch (error: any) {
    console.error("Error fetching player details:", error);
    throw error;
  }
};

export const updatePlayerGolfBag = async (payload: IUpdateGolfBagPayload): Promise<any> => {
  const { uid, golfBagData } = payload;

  if (!uid) {
    console.error("Player ID is required to update golf bag.");
    throw new Error("Player ID is required.");
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
    console.error("Error updating golf bag:", error);
    throw error;
  }
}

export const updatePlayerProfile = async (payload: IUpdatePlayerProfilePayload): Promise<Partial<IPlayerStateData>> => {
  const { uid, data } = payload;

  if (!uid) {
    console.error("updatePlayerProfile: UID is required.");
    throw new Error('User ID not provided.');
  }
  if (!data) {
    console.error("updatePlayerProfile: Data is required.");
    throw new Error('No profile data provided for update.');
  }

  try {
    const playerDocRef: DocumentReference<DocumentData> = doc(db, 'players', uid);
    await updateDoc(playerDocRef, data);
    return data as Partial<IPlayerStateData>;
	} catch (error: any) {
    console.error("Error updating player profile:", error);
    throw error;
  }
};

export const getAllPlayers = async (): Promise<IPlayerDetails[]> => {
  try {
    const playersRef = collection(db, 'players');
    const playersQuery = query(playersRef, orderBy('displayName', 'asc'));
    const snapshot = await getDocs(playersQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        uid: doc.id,
        displayName: data.displayName ?? null,
        email: data.email ?? null,
        DOB: data.DOB instanceof Timestamp ? data.DOB.toMillis() : data.DOB,
      } as IPlayerDetails;
    });
  } catch (error: any) {
    console.error("Error fetching all players:", error);
    throw error;
  }
};
