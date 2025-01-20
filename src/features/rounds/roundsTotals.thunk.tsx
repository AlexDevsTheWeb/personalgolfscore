import { IRoundsTotals } from "@/types/roundsTotals.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";


export const getAllRoundsTotalsThunk = async (uid: string, thunkAPI: any) => {
  const booksRef = collection(db, 'roundsTotals')
  const q = query(booksRef, where(documentId(), '==', uid))
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }
  const response = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data().roundsTotals,
      uid: doc.id
    };
  }) as IRoundsTotals[];
  return response.pop();
}
