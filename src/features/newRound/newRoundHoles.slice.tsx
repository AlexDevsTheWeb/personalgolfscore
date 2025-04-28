import { IPayloadActionNewHole } from "@/types/round.types";
import { InitialStateNewRoundsData, IShots } from "@/types/roundData.types";
import { initialStateTmpHole } from "@/utils/constant.utils";
import { calculateGirValue, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from "@/utils/shots/shots.utils";
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

    // setHolesCompleted: (state, { payload }: PayloadAction<{ newHoleNumber: number }>) => {
    //   state.holesCompleted = payload.newHoleNumber;
    // },
    setNewHole: (state, { payload }: PayloadAction<IPayloadActionNewHole>) => {
      const { holeAdjusted, roundPlayingHCP, roundHoles } = payload; // Destructure payload

      // 1. Determine hole number
      const currentHoleNum = state.holesCompleted + 1;

      // 2. Create the base hole object
      // Ensure holeAdjusted has all necessary base fields from IShots
      const baseHole: IShots = {
        ...initialStateTmpHole, // Start with default values from your constant
        ...holeAdjusted,        // Overlay the user input
        holeNumber: currentHoleNum,
      };

      // 3. Perform individual calculations
      const calculatedPoints = calculateStablefordPoints({
        hcp: baseHole.hcp,
        par: baseHole.par,
        strokes: baseHole.strokes,
        roundPlayingHCP: roundPlayingHCP,
        roundHoles: roundHoles,
      }) || 0; // Default to 0 if calculation fails

      const calculatedGir = calculateGirValue({
        par: baseHole.par,
        putts: baseHole.putts,
        strokes: baseHole.strokes,
        bogey: false, // Assuming standard GIR calculation
      });

      const calculatedGirBogey = calculateGirValue({
        par: baseHole.par,
        putts: baseHole.putts,
        strokes: baseHole.strokes,
        bogey: true, // Bogey GIR calculation
      });

      // Note: calculateUDValue needs chipClubs - assuming it's available in holeAdjusted or payload
      // If not, you might need to fetch it or pass it differently.
      // For now, assuming chipClubs is part of holeAdjusted or derived elsewhere.
      const calculatedUpDown = calculateUDValue({
        girValue: calculatedGir ? 1 : 0, // Pass 1 for true, 0 for false
        chipClub: baseHole.chipClub,
        parValue: baseHole.par,
        numberOfPutts: baseHole.putts,
        strokesValue: baseHole.strokes,
        chipClubs: holeAdjusted.chipClubs || [], // Get chipClubs from adjusted data or provide default
      });

      const calculatedScramble = calculateScrambleValue({
        girValue: calculatedGir ? 1 : 0, // Pass 1 for true, 0 for false
        parValue: baseHole.par,
        strokesValue: baseHole.strokes,
      });

      // 4. Calculate Putt/Green Meter Ranges (if needed)
      // You can either call the old 'calculation' function just for these,
      // or integrate its logic here directly. Let's integrate:
      let puttsUnder2 = 0, putts2_4 = 0, putts4_6 = 0, putts6_10 = 0, puttsOver10 = 0;
      (baseHole.puttsLength || []).forEach(len => {
        const length = Number(len);
        if (length <= 2) puttsUnder2++;
        else if (length <= 4) putts2_4++;
        else if (length <= 6) putts4_6++;
        else if (length <= 10) putts6_10++;
        else puttsOver10++;
      });

      let greenMetersOver100 = 0, greenMeters80_100 = 0, greenMeters60_80 = 0, greenMetersUnder60 = 0;
      const toGreenMeters = baseHole.toGreenMeters || 0;
      if (toGreenMeters >= 100) greenMetersOver100++;
      else if (toGreenMeters > 80) greenMeters80_100++;
      else if (toGreenMeters > 60) greenMeters60_80++;
      else if (toGreenMeters > 0) greenMetersUnder60++; // Only count if > 0


      // 5. Construct the final hole object with all calculated values
      const finalHole: IShots = {
        ...baseHole, // Start with base hole data
        points: calculatedPoints,
        gir: calculatedGir,
        girBogey: calculatedGirBogey,
        upDown: calculatedUpDown, // { made, attempts }
        scramble: calculatedScramble, // { made, attempts }
        // Add putt range counts
        puttsUnder2: puttsUnder2,
        putts2_4: putts2_4,
        putts4_6: putts4_6,
        putts6_10: putts6_10,
        puttsOver10: puttsOver10,
        // Add green meter range counts
        toGreenMetersOver100: greenMetersOver100,
        toGreenMeters80_100: greenMeters80_100,
        toGreenMeters60_80: greenMeters60_80,
        toGreenMetersUnder60: greenMetersUnder60,
        // Ensure other fields potentially calculated by the old 'calculation' are handled if needed
      };

      // 6. Update state
      state.holes = [...state.holes, finalHole];
      state.holesCompleted += 1;
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;