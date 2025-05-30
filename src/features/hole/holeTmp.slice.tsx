import { IShots } from "@/types/roundData.types";
import { initialStateTmpHole } from "@/utils/constant.utils";
import { calculateGirValue, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from "@/utils/shots/shots.utils";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the payload of setTmpHoleData
interface SetTmpHoleDataPayload {
  name: keyof IShots; // Use keyof IShots for type safety
  value: string | number | boolean; // Adjust based on possible values
  roundPlayingHCP: number;
  roundHoles: number;
  chipClubs: string[];
}

// Use IShots as the state type
const initialState: IShots = initialStateTmpHole;

const holeTmpSlice = createSlice({
  name: 'holeTmp',
  initialState,
  reducers: {
    setTmpHoleData: (state: Draft<IShots>, action: PayloadAction<SetTmpHoleDataPayload>) => {
      const { name, value, roundPlayingHCP, roundHoles, chipClubs } = action.payload;
      const initialValueType = typeof initialState[name];

      if (initialValueType === 'number') {
        // Ensure empty strings become 0 or handle as needed
        const numericValue = value === '' ? 0 : Number(value);
        // Use type assertion carefully if needed, or ensure 'name' is a valid key
        (state as any)[name] = isNaN(numericValue) ? 0 : numericValue; // Prevent NaN
      } else if (initialValueType === 'string') {
        if (name === 'greenSide') {
          const stringValue = String(value); // Ensure value is a string
          state.greenSide = stringValue;
          // Reset flags (consider a more robust way if values change)
          state.greenSideL = 0;
          state.greenSideO = 0;
          state.greenSideR = 0;
          state.greenSideS = 0;
          // Set flag based on first letter - ensure stringValue is not empty
          if (stringValue.length > 0) {
            const flagKey = `greenSide${stringValue.substring(0, 1).toUpperCase()}` as keyof IShots;
            // Check if flagKey is a valid key before assigning
            if (flagKey in state && typeof state[flagKey] === 'number') {
              (state as any)[flagKey] = 1;
            }
          }
        } else if (name === 'chipClub') {
          const stringValue = String(value);
          state.chipClub = stringValue;
          // Handle bunker/sand logic
          if (stringValue.toLowerCase() === 'bunker' || stringValue.toLowerCase() === 'b') {
            state.sand = 1;
          } else {
            // Optional: Reset sand if chipClub is not bunker? Depends on desired logic.
            // state.sand = 0;
          }
        } else {
          // Assign other string values directly
          (state as any)[name] = String(value);
        }
      } else if (initialValueType === 'boolean') {
        // Handle boolean values if any exist in IShots
        (state as any)[name] = Boolean(value);
      }
      state.bounceBack = state.strokes - state.par; // Use state.strokes
      // Ensure the result is always a number, defaulting to 0 if undefined
      state.points = calculateStablefordPoints({
        hcp: Number(state.hcp),
        par: Number(state.par),
        strokes: Number(state.strokes),
        roundPlayingHCP: Number(roundPlayingHCP),
        roundHoles: Number(roundHoles)
      }) ?? 0;
      state.gir = calculateGirValue({
        par: Number(state.par),
        putts: Number(state.putts),
        strokes: Number(state.strokes), // Use state.strokes (already correct here, but good to double-check)
        bogey: false
      });
      state.girBogey = calculateGirValue({
        par: Number(state.par),
        putts: Number(state.putts),
        strokes: Number(state.strokes), // Use state.strokes (already correct here)
        bogey: true
      });
      state.upDown = calculateUDValue({
        girValue: Number(state.gir),
        chipClub: state.chipClub,
        parValue: Number(state.par),
        numberOfPutts: state.putts,
        strokesValue: Number(state.strokes), // Use state.strokes (already correct here)
        chipClubs: chipClubs
      });
      if (name !== 'puttsLength') {
        state.scramble = calculateScrambleValue({
          girValue: Number(state.gir),
          parValue: Number(state.par),
          strokesValue: Number(state.strokes) // Use state.strokes (already correct here)
        });
      }
    },
    setHoleNumber: (state: Draft<IShots>, action: PayloadAction<{ newHoleNumber: number }>) => {
      state.holeNumber = action.payload.newHoleNumber; // Access payload via action
    },
    resetNewRoundHoleTmp: () => initialState,
  },
  extraReducers: () => { }
})

export const { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } = holeTmpSlice.actions;
// console.oog()
export default holeTmpSlice.reducer;