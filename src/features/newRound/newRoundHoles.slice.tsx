import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateNewRoundsData } from "../../types/roundData.types";
import { calculation } from "../../utils/shots/shots.utils";

const initialState: InitialStateNewRoundsData = {
  isLoading: false,
  playerID: '',
  roundID: '',
  holesCompleted: 0,
  shots: [],
}

// export const getAllRounds = createAsyncThunk(
//   "rounds/getAllRounds",
//   getAllRoundsThunk
// );
interface IPayloadActionNewHole {
  holeAdjusted: any,
  roundPlayingHCP: number
  roundHoles: number,
  holesCompleted: number
};

const newRoundHolesSlice = createSlice({
  name: 'newRoundHoles',
  initialState,
  reducers: {

    setHolesCompleted: (state, { payload }: PayloadAction<{ newHoleNumber: number }>) => {
      state.holesCompleted = payload.newHoleNumber;
    },
    setNewHole: (state, { payload }: PayloadAction<IPayloadActionNewHole>) => {
      const completeHole = { ...payload.holeAdjusted, holeNumber: payload.holesCompleted };

      const newValues = calculation(completeHole);

      const finalHole = {
        ...completeHole,
        puttsUnder2: newValues.puttsUnder2,
        putts2_4: newValues.putts2_4,
        putts4_6: newValues.putts4_6,
        putts6_10: newValues.putts6_10,
        puttsOver10: newValues.puttsOver10,
        upDownX: newValues.upDownX,
        upDownN: newValues.upDownN,
        upDownE: newValues.upDownE,
        toGreenMetersOver100: newValues.greenMetersOver100,
        toGreenMeters80_100: newValues.greenMeters80_100,
        toGreenMeters60_80: newValues.greenMeters60_80,
        toGreenMetersUnder60: newValues.greenMetersUnder60,
      };

      state.shots = [...state.shots, finalHole];
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setHolesCompleted, setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;