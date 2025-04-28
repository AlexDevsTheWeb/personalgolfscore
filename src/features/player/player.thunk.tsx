import { IGolfBagData } from "@/types/player.types";
import { IBasicRoundData } from "@/types/roundData.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";

export const getPlayerInfoThunk = async (uid: string, { rejectWithValue }: any) => {
  // FIXME: this is just to avoid access online data and reduce read limits on firebase
  // let playerURL = `/data/P2_ALESSANDROTORRI/player.json`;
  // let playerURL = `/data/P1_TIGERWOODS/player.json`;
  // try {
  //   const response = await authFetch.get(playerURL);

  //   const actualResponse: IUser[] = [
  //     {
  //       ...response,
  //       uid: uid
  //     }
  //   ]
  //   return actualResponse.pop();
  // } catch (error: any) {
  //   return rejectWithValue(error.message || 'Failed to fetch player details');
  // }
  // FIXME: remove it when everything is fine


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



    const serializedPlayerData = {
      ...playerData,
      uid: uid,
      DOB: playerData.DOB instanceof Timestamp ? playerData.DOB.toMillis() : playerData.DOB,
      totals: playerData.totals || {},
      distances: playerData.distances || {},
    }

    return {
      player: serializedPlayerData,
      rounds: roundsData,
    }

  } catch (error: any) {
    console.error("Error fetching player details:", error);
    return rejectWithValue(error.message || 'Failed to fetch player details');
  }
};

interface IUpdateGolfBagPayload {
  uid: string;
  golfBagData: IGolfBagData; // Use the correct type for your golf bag structure
}

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
