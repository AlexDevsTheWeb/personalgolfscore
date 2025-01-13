import { IUser } from "@/types/user.types";
import { db } from "@/utils/firebase/firebase.utils";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";

export const getUserDetailsThunk = async (uid: string, thunkAPI: any) => {
  const booksRef = collection(db, 'users')
  const q = query(booksRef, where(documentId(), '==', uid))

  const querySnapshot = await getDocs(q);

  const response = querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    return {
      ...doc.data(),
      uid: doc.id
    };
  }) as IUser[];

  return response.pop();
};
