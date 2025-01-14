import { db } from "@/utils/firebase/firebase.utils";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";

export const getClubsThunk = async (uid: string, thunkAPI: any) => {
  // let playerURL = `/data/clubs.json`;
  // try {
  //   const response = await authFetch.get(playerURL);
  //   return response.data;
  // } catch (error) {
  //   return checkForUnauthorizedResponse(error, thunkAPI);
  // }

  const booksRef = collection(db, 'clubs')
  const q = query(booksRef, where(documentId(), '==', uid))

  const querySnapshot = await getDocs(q);

  console.log("doc data: ", JSON.parse(querySnapshot.docs[0].data().clubs));

  const response = querySnapshot.docs.map((doc) => {

    return {
      ...doc.data().clubs,
      uid: doc.id
    };
  }) as any;

  return response.pop();
};