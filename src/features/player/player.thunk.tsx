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



  console.log("arrivo?")

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'players', uid);
      const docSnap = await getDoc(docRef);

      console.log("docSnap -> ", docSnap.data());

      if (!docSnap.exists()) {
        return null;
      }


      thunkAPI.dispatch(setPlayer(docSnap.data()));

      return docSnap.data();

    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  fetchData();
};
