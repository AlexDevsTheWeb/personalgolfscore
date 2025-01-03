import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { setLoginUser } from "./user.slice";


export const getUserDetailsThunk = async (uid: string, thunkAPI: any) => {
  const fetchData = async () => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      thunkAPI.dispatch(setLoginUser(docSnap.data()));

      return docSnap.data();

    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  fetchData();
};
