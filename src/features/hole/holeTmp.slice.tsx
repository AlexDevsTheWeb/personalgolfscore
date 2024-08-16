import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShots } from "../../types/roundData.types";
import { calculateGirValue, calculateStablefordPoints, calculateUDValue } from "../../utils/shots/shots.utils";


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
  pointsAvg: 0,
  putts: 0,
  sand: 0,
  secondPutt: 0,
  thirdPutt: 0,
  strokes: 0,
  teeClub: '',
  toGreen: '',
  toGreenMeters: 0,
  upDown: '',
  water: 0,
};

const holeTmpSlice = createSlice({
  name: 'holeTmp',
  initialState,
  reducers: {
    setTmpHoleData: (state: any, { payload: { name, value, roundPlayingHCP, roundHoles, chipClubs } }: any) => {
      if (typeof state[name] === 'number') {
        if (name === 'toGreen') {
          state['toGreenMeters'] = Number(value);
        }
        else { state[name] = Number(value); }
      }
      else { state[name] = value; }
      if (name === 'fairway') {
        state['fairway'] = Number(value.toString().substring(0, 1));
      }

      state.points = calculateStablefordPoints({
        hcp: Number(state.hcp),
        par: Number(state.par),
        strokes: Number(state.strokes),
        roundPlayingHCP: Number(roundPlayingHCP),
        roundHoles: Number(roundHoles)
      });
      state.gir = calculateGirValue({
        par: Number(state.par),
        putts: Number(state.putts),
        strokes: Number(state.strokes),
        bogey: false
      });
      state.girBogey = calculateGirValue({
        par: Number(state.par),
        putts: Number(state.putts),
        strokes: Number(state.strokes),
        bogey: true
      });
      state.upDown = calculateUDValue({
        girValue: Number(state.gir),
        chipClub: state.chipClub,
        parValue: Number(state.par),
        strokesValue: Number(state.strokes),
        chipClubs: chipClubs
      })
    },
    setHoleNumber: (state: any, { payload }: PayloadAction<{ newHoleNumber: number }>) => {
      console.log("Payload: ", payload)
      state.holeNumber = payload.newHoleNumber;
    },
    resetNewRoundHoleTmp: () => initialState,
  },
  extraReducers: () => { }
})

export const { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } = holeTmpSlice.actions;
export default holeTmpSlice.reducer;