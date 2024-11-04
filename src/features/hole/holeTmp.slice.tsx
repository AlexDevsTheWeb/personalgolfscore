import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShots } from "../../types/roundData.types";
import { initialStateTmpHole } from "../../utils/constant.utils";
import { calculateGirValue, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from "../../utils/shots/shots.utils";

const initialState: IShots = initialStateTmpHole;

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
      state.bounceBack = state.score - state.par;
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
      });
      if (name !== 'puttsLength') {
        state.scramble = calculateScrambleValue({
          girValue: Number(state.gir),
          parValue: Number(state.par),
          strokesValue: Number(state.strokes)
        });
      }
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