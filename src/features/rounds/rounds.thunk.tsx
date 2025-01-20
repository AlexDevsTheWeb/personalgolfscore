import { db } from "@/utils/firebase/firebase.utils";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import _ from "lodash";

export const getAllRoundsThunk = async (uid: string, thunkAPI: any) => {
  const booksRef = collection(db, 'roundsData')
  const q = query(booksRef, where(documentId(), '==', uid))

  const querySnapshot = await getDocs(q);
  if (!querySnapshot || _.isUndefined(querySnapshot) || querySnapshot.docs.length === 0) {
    return { data: [], uid: uid };
  }
  const response = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      uid: uid
    };
  }) as any;


  return response.pop();
};