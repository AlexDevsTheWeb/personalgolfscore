// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, documentId, getDocs, query, where } from "firebase/firestore";

import { IRoundsTotals } from "@/types/roundsTotals.types";
import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getAllRoundsTotalsThunk = async (uid: string, thunkAPI: any) => {
  // const booksRef = collection(db, 'roundsTotals')
  // const q = query(booksRef, where(documentId(), '==', uid))
  // const querySnapshot = await getDocs(q);

  // if (querySnapshot.empty) {
  //   return [];
  // }
  // const response = querySnapshot.docs.map((doc) => {

  //   console.log("doc: ", doc.data());
  //   return {
  //     ...doc.data().roundsTotals,
  //     uid: doc.id
  //   };
  // }) as IRoundsTotals[];
  // return response.pop();

  // FIXME: this is just to avoid access online data and reduce read limits on firebase
  // let roundDistanceURL = `/data/P2_ALESSANDROTORRI/allTotals.json`;
  let allRoundsURL = `/data/P1_TIGERWOODS/allTotals.json`;
  try {
    const response = await authFetch.get(allRoundsURL);
    const actualResponse: IRoundsTotals[] =
    {
      ...response.data
    }

    // console.log("actual THUNK: ", actualResponse)
    return actualResponse
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
  // FIXME: remove it when everything is fine
}
