import { IPayloadActionNewHole } from "@/types/round.types";
import { InitialStateNewRoundsData, IShots } from "@/types/roundData.types";
import { initialStateTmpHole } from "@/utils/constant.utils";
import { calculateGirValue, calculateGreenApproachCounts, calculatePuttLengthCounts, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from "@/utils/shots/shots.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateNewRoundsData = {
  isLoading: false,
  playerID: '',
  roundID: '',
  holesCompleted: 0,
  holes: [],
}

const newRoundHolesSlice = createSlice({
  name: 'newRoundHoles',
  initialState,
  reducers: {
    setNewHole: (state, { payload }: PayloadAction<IPayloadActionNewHole>) => {
      const { holeAdjusted, roundPlayingHCP, roundHoles } = payload;
      const currentHoleNum = state.holesCompleted + 1;
      const baseHole: IShots = {
        ...initialStateTmpHole,
        ...holeAdjusted,
        holeNumber: currentHoleNum,
      };
      const calculatedPoints = calculateStablefordPoints({
        hcp: baseHole.hcp,
        par: baseHole.par,
        strokes: baseHole.strokes,
        roundPlayingHCP: roundPlayingHCP,
        roundHoles: roundHoles,
      }) || 0;
      const calculatedGir = calculateGirValue({
        par: baseHole.par,
        putts: baseHole.putts,
        strokes: baseHole.strokes,
        bogey: false,
      });
      const calculatedGirBogey = calculateGirValue({
        par: baseHole.par,
        putts: baseHole.putts,
        strokes: baseHole.strokes,
        bogey: true,
      });
      const calculatedUpDown = calculateUDValue({
        girValue: calculatedGir ? 1 : 0,
        chipClub: baseHole.chipClub,
        parValue: baseHole.par,
        numberOfPutts: baseHole.putts,
        strokesValue: baseHole.strokes,
        chipClubs: holeAdjusted.chipClubs || [],
      });

      const calculatedScramble = calculateScrambleValue({
        girValue: calculatedGir ? 1 : 0,
        parValue: baseHole.par,
        strokesValue: baseHole.strokes,
      });

      const puttCounts = calculatePuttLengthCounts(baseHole.puttsLength);
      const greenApproachCounts = calculateGreenApproachCounts(baseHole.toGreenMeters);

      const finalHole: IShots = {
        ...baseHole,
        points: calculatedPoints,
        gir: calculatedGir,
        girBogey: calculatedGirBogey,
        upDown: calculatedUpDown,
        scramble: calculatedScramble,
        ...puttCounts,
        ...greenApproachCounts,
      };
      state.holes.push(finalHole);
      state.holesCompleted += 1;
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;