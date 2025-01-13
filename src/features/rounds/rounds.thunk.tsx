import { db } from "@/utils/firebase/firebase.utils";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";

export const getAllRoundsThunk = async (uid: string, thunkAPI: any) => {
  const booksRef = collection(db, 'roundsData')
  const q = query(booksRef, where(documentId(), '==', uid))

  const querySnapshot = await getDocs(q);

  const response = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      uid: doc.id
    };
  }) as any;

  return response.pop();
};