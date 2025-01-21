// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, documentId, getDocs, query, where } from "firebase/firestore";

import { IRoundsState } from "@/types/round.types";
import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getAllRoundsThunk = async (uid: string, thunkAPI: any) => {

  // const booksRef = collection(db, 'roundsData')
  // const q = query(booksRef, where(documentId(), '==', uid))

  // const querySnapshot = await getDocs(q);

  // const response = querySnapshot.docs.map((doc) => {

  //   console.log("doc: ", doc.data())
  //   return {
  //     ...doc.data(),
  //     uid: uid
  //   };
  // }) as any;

  // return response.pop();

  // FIXME: this is just to avoid access online data and reduce read limits on firebase
  // let roundDistanceURL = `/data/P2_ALESSANDROTORRI/allRounds.json`;
  let allRoundsURL = `/data/P1_TIGERWOODS/allRounds.json`;
  try {
    const response = await authFetch.get(allRoundsURL);
    const actualResponse: IRoundsState =
    {
      ...response.data
    }
    return actualResponse;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
  // FIXME: remove it when everything is fine

};