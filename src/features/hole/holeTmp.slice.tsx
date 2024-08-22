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
  gir: false,
  girBogey: false,
  greenSide: '',
  greenSideL: 0,
  greenSideO: 0,
  greenSideR: 0,
  greenSideS: 0,
  hcp: 0,
  out: 0,
  par: 0,
  points: 0,
  pointsAvg: 0,
  putts: 0,
  puttsLength: [],
  puttsUnder2: 0,
  putts2_4: 0,
  putts4_6: 0,
  putts6_10: 0,
  puttsOver10: 0,
  sand: 0,
  strokes: 0,
  teeClub: '',
  toGreen: '',
  toGreenMeters: 0,
  toGreenMetersOver100: 0,
  toGreenMeters80_100: 0,
  toGreenMeters60_80: 0,
  toGreenMetersUnder60: 0,
  upDown: '',
  upDownX: 0,
  upDownN: 0,
  upDownE: 0,
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
      else {
        if (name === 'greenSide') {
          state[name] = value;
          if (state[`${name}L`] !== 0) { state[`${name}L`] = 0 }
          if (state[`${name}O`] !== 0) { state[`${name}O`] = 0 }
          if (state[`${name}R`] !== 0) { state[`${name}R`] = 0 }
          if (state[`${name}S`] !== 0) { state[`${name}S`] = 0 }
          state[`${name}${value.substring(0, 1)}`] = 1;
        }
        else {
          state[name] = value;
        }
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
      state.holeNumber = payload.newHoleNumber;
    },
    resetNewRoundHoleTmp: () => initialState,
  },
  extraReducers: () => { }
})

export const { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } = holeTmpSlice.actions;
export default holeTmpSlice.reducer;