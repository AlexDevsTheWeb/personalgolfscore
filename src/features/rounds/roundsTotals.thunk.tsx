import { IAllRoundsTotals } from "@/types/roundTotals.types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";


export const getAllRoundsTotalsThunk = async (uid: string, thunkAPI: any) => {
  // let roundsDataTotalsURL = `/data/NEW/TOTALS_new.json`;
  // try {
  //   const response = await authFetch.get(roundsDataTotalsURL);
  //   return response.data;
  // } catch (error) {
  //   return checkForUnauthorizedResponse(error, thunkAPI);
  // }

  const fetchData = async () => {
    try {
      console.log("arrivo alla thunk");
      const docRef = doc(db, 'roundsTotals', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const roundsTotals: IAllRoundsTotals = docSnap.data().roundsTotals.roundsTotals.map((rt: any) => JSON.parse(rt));

      // thunkAPI.dispatch(setRoundsTotals({ roundsTotals: roundsTotals }));

      const payload = { roundsTotals: roundsTotals }
      console.log("payload thunk: ", payload);
      return payload;

    } catch (error) {
      console.error("Error getting document:", error);
    }

  };
  fetchData();
}
