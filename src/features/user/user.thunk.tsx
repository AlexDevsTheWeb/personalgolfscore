import { IUser, ThemeMode } from "@/types/user.types";
import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";
import { db } from '@/utils/firebase/firebase.utils';
import { doc, updateDoc } from "firebase/firestore";

// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, documentId, getDocs, query, where } from "firebase/firestore";

export const getUserDetailsThunk = async (uid: string, thunkAPI: any) => {
  // const booksRef = collection(db, 'players')
  // const q = query(booksRef, where(documentId(), '==', uid))

  // const querySnapshot = await getDocs(q);

  // const response = querySnapshot.docs.map((doc) => {
  //   return {
  //     ...doc.data(),
  //     uid: doc.id
  //   };
  // }) as IUser[];

  //  return response.pop();



  // FIXME: this is just to avoid access online data and reduce read limits on firebase
  // let roundDistanceURL = `/data/NEW/PLAYERS/alessandrotorri.json`;
  let roundDistanceURL = `/data/NEW/PLAYERS/tigerwoods.json`;
  try {
    const response = await authFetch.get(roundDistanceURL);

    const actualResponse: IUser[] = [
      {
        ...response,
        uid: ''
      }
    ]
    return actualResponse.pop();
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
  // FIXME: remove it when everything is fine


};

// Modify to accept a single object argument
export const updateUserThemePreferenceThunk = async (
  { playerId, theme }: { playerId: string, theme: ThemeMode },
  thunkAPI: any // Keep thunkAPI if needed for dispatching or accessing state
): Promise<void> => {
  if (!playerId) return; // Don't proceed if playerId is invalid
  const playerDocRef = doc(db, 'players', playerId);
  try {
    await updateDoc(playerDocRef, { themePreference: theme });
  } catch (error) {
    console.error("Error updating theme preference in Firestore: ", error);
  }
};
