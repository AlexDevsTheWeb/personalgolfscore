// import { db } from "@/utils/firebase/firebase.utils";
// import { collection, documentId, getDocs, query, where } from "firebase/firestore";

import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getClubsThunk = async (uid: string, thunkAPI: any) => {
  // const booksRef = collection(db, 'clubs')
  // const q = query(booksRef, where(documentId(), '==', uid))
  // const querySnapshot = await getDocs(q);
  // const response = querySnapshot.docs.map((doc) => {

  //   return {
  //     ...doc.data(),
  //     uid: doc.id
  //   };
  // }) as IClubsPayload[];

  // return response.pop();

  // FIXME: this is just to avoid access online data and reduce read limits on firebase
  //const clubsURL = `/data/P2_ALESSANDROTORRI/clubs.json`;
  const clubsURL = `/data/P1_TIGERWOODS/clubs.json`;
  try {
    const response = await authFetch.get(clubsURL);

    const actualResponse: any[] = [
      {
        ...response.data,
        uid: uid
      }
    ]
    return actualResponse.pop();
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
  // FIXME: remove it when everything is fine

};