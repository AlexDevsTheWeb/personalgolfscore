
export const saveNewRoundThunk = async (_: any, thunkAPI: any) => {
  const { newRoundMain, newRoundTotals, newRoundHoles, newRoundDistances } = thunkAPI.getState().newRound;

  // console.log("newRoundMain: ", newRoundMain.round);
  // console.log("newRoundTotals: ", newRoundTotals.roundTotals);
  // console.log("newRoundHoles: ", newRoundHoles.holes);
  // console.log("newRoundDistances: ", newRoundDistances.roundDistances);


  const main = newRoundMain.round;
  const holes = newRoundHoles.holes;
  const distances = newRoundDistances.roundDistances;
  const totals = newRoundTotals.roundTotals;

  const newObj = { main, holes, distances, totals };
  console.log("new obj: ", newObj)

  try {
    return null
  } catch (error) {
    return null
  }


};