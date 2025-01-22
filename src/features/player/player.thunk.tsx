// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, documentId, getDocs, query, where } from "firebase/firestore";

import { IUser } from "@/types/user.types";
import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getPlayerInfoThunk = async (uid: string, thunkAPI: any) => {

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
  let playerURL = `/data/P1_TIGERWOODS/player.json`;
  try {
    const response = await authFetch.get(playerURL);

    const actualResponse: IUser[] = [
      {
        ...response,
        uid: ''
      }
    ]
    console.log("player: ", actualResponse)
    return actualResponse.pop();
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
  // FIXME: remove it when everything is fine
};
