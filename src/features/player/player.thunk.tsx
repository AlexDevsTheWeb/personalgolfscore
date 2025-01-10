import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { setPlayer } from "./player.slice";


export const getPlayerInfoThunk = async (uid: string, thunkAPI: any) => {
  // let playerURL = `/data/player.json`;
  // try {
  //   const response = await authFetch.get(playerURL);
  //   return response.data;
  // } catch (error) {
  //   return checkForUnauthorizedResponse(error, thunkAPI);
  // }

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'players', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      thunkAPI.dispatch(setPlayer(docSnap.data()));

      return true;

    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  fetchData();
};
