import { IGolfBagData, IPlayerDetails } from "@/types/player.types";
import { IBasicRoundData, IDistance, IRoundHoles } from "@/types/roundData.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";

export const getPlayerInfoThunk = async (uid: string, { rejectWithValue }: any) => {

  // const booksRef = collection(db, 'players')
  // const q = query(booksRef, where(documentId(), '==', uid))

  // const querySnapshot = await getDocs(q);
  // const response = querySnapshot.docs.map((doc) => {
  //   return {
  //     ...doc.data(),
  //     uid: doc.id
  //   };
  // }) as any;

  // return response.pop();


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
    const roundsCollectionRef = collection(db, 'players', uid, 'rounds');
    const roundsQuery = query(roundsCollectionRef, orderBy('roundDate', 'desc'));
    const roundsSnapshot = await getDocs(roundsQuery);

    const roundsData: IBasicRoundData[] = await Promise.all(
      roundsSnapshot.docs.map(async (roundDoc) => {
        const roundId = roundDoc.id;
        const roundData = roundDoc.data();

        const distancesCollectionRef = collection(db, 'players', uid, 'rounds', roundId, 'distances');
        const distancesSnapshot = await getDocs(distancesCollectionRef);
        const distancesData: IDistance[] = distancesSnapshot.docs.map(distancesDoc => {
          const data = distancesDoc.data();
          return {
            ...data,
          } as IDistance;
        });

        const holesCollectionRef = collection(db, 'players', uid, 'rounds', roundId, 'holes');
        const holesQuery = query(holesCollectionRef, orderBy('holeNumber', 'asc'));
        const holesSnapshot = await getDocs(holesQuery);
        const holesData: IRoundHoles[] = holesSnapshot.docs.map(holesDoc => ({
          ...holesDoc.data(),
        } as IRoundHoles
        ));

        return {
          id: roundId,
          ...roundData,
          roundDate: roundData.roundDate instanceof Timestamp ? roundData.roundDate.toMillis() : roundData.roundDate,
          createdAt: roundData.createdAt instanceof Timestamp ? roundData.createdAt.toMillis() : roundData.createdAt,
          distances: distancesData,
          holes: holesData,
        } as IBasicRoundData;
      })
    );

    // Serialize Timestamp if necessary (like DOB)
    const serializedPlayerData = {
      ...playerData,
      DOB: playerData.DOB instanceof Timestamp ? playerData.DOB.toMillis() : playerData.DOB,
      // Ensure golfbag data is included if fetched here
      golfbag: playerData.golfbag || [], // Default to empty array if not present
    } as Omit<IPlayerDetails, 'rounds'>;

    return {
      player: serializedPlayerData,
      rounds: roundsData
    };
    // return { player: serializedPlayerData };

  } catch (error: any) {
    console.error("Error fetching player details:", error);
    return rejectWithValue(error.message || 'Failed to fetch player details');
  }
};

export const updatePlayerGolfBagThunk = async (payload: { uid: string, golfBagData: IGolfBagData }, { rejectWithValue }: any) => {
  const { uid, golfBagData } = payload;
  try {
    if (!uid) {
      console.error("Player ID is required to update golf bag.");
      throw new Error("Player ID is required."); // Or handle appropriately
    }
    if (!golfBagData || !Array.isArray(golfBagData)) {
      console.error("Invalid golf bag data provided.");
      throw new Error("Invalid golf bag data.");
    }

    // Optional: Data cleaning step (Example: Remove clubNumber if desired)
    const cleanedGolfBagData = golfBagData.map(type => ({
      ...type,
      details: type.details.map(({ clubNumber, ...rest }) => rest) // Removes clubNumber
    }));


    const playerDocRef: DocumentReference<DocumentData> = doc(db, "players", uid);

    try {
      console.log(`Updating golfbag for player: ${uid}`);
      // Use updateDoc to update only the 'golfbag' field.
      // If the 'golfbag' field might not exist yet, setDoc with merge:true is safer.
      // await setDoc(playerDocRef, { golfbag: cleanedGolfBagData }, { merge: true });
      await updateDoc(playerDocRef, {
        golfbag: cleanedGolfBagData // Use cleanedGolfBagData or golfBagData directly
      });
      console.log(`Successfully updated golfbag for player: ${uid}`);
    } catch (error) {
      console.error("Error updating player golf bag:", error);
      // Re-throw or handle the error as needed for your UI
      throw error;
    }
    return cleanedGolfBagData;
  } catch (error: any) {
    console.error("Thunk error updating golf bag:", error);
    return rejectWithValue(error.message || 'Failed to update golf bag');
  }
}
