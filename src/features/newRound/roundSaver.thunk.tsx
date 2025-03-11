
export const saveNewRoundThunk = async (_: any, thunkAPI: any) => {
  const { newRoundMain, newRoundTotals, newRoundHoles, newRoundDistances } = thunkAPI.getState().newRound;

  console.log("newRoundMain: ", newRoundMain.round);
  console.log("newRoundTotals: ", newRoundTotals.roundTotals);
  console.log("newRoundHoles: ", newRoundHoles.holes);
  console.log("newRoundDistances: ", newRoundDistances.roundDistances);

  try {
    return null
  } catch (error) {
    return null
  }


};