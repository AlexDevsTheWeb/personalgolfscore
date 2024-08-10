import { createSlice } from "@reduxjs/toolkit";
import { IShots } from "../../types/roundData.types";

const initialState: IShots = {
  holeNumber: 0,
  chipClub: '',
  distance: 0,
  driveDistance: 0,
  fairway: '',
  fir: 0,
  firstPutt: 0,
  gir: false,
  girBogey: false,
  greenSide: '',
  hcp: 0,
  out: 0,
  par: 0,
  points: 0,
  putts: 0,
  sand: 0,
  secondPutt: 0,
  strokes: 0,
  teeClub: '',
  toGreen: '',
  toGreenMeters: 0,
  upDown: false,
  water: 0,
};

const holeTmpSlice = createSlice({
  name: 'holeTmp',
  initialState,
  reducers: {
    setTmpHoleData: (state: any, { payload: { name, value } }: any) => {
      if (typeof state[name] === 'number') {
        if (name === 'toGreen') {
          state['toGreenMeters'] = Number(value);
        }
        else { state[name] = Number(value); }
      }
      else { state[name] = value; }

      // TODO: missing: 
      // TODO: 1) distance(?),
      // TODO: 2) fir calculation,
      // TODO: 3) gir + gir bogey calculation,
      // TODO: 4) holeNumber(?),
      // TODO: 5) points calculation,
    },
    resetNewRoundHoleTmp: () => initialState,
  },
  extraReducers: () => { }
})

export const { resetNewRoundHoleTmp, setTmpHoleData } = holeTmpSlice.actions;
export default holeTmpSlice.reducer;