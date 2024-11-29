import { setHoleNumber } from "@/features/hole/holeTmp.slice";
import { setHolesCompleted } from "@/features/newRound/newRoundHoles.slice";
import { saveRound } from "@/features/newRound/roundSaver.slice";
import { RootState } from "@/store/store";
import { finalRoundGeneration } from "@/utils/round/round.utils";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SaveRoundButton = () => {
  const dispatch = useDispatch();
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { roundDistances } = useSelector((store: RootState) => store.newRound.newRoundDistances);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);

  const { roundHoles } = round;

  const [handleSave, setHandleSave] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("Next hole");

  const howManyHolesToPlay = roundHoles - holes.length;

  const saveHole = () => {
    if (howManyHolesToPlay > 0) {
      const newHoleNumber = holesCompleted + 1
      dispatch(setHolesCompleted({ newHoleNumber }));
      dispatch(setHoleNumber({ newHoleNumber }));
      setHandleSave(false);
    }
    else {
      // TODO: here we have to save the entire round
      setLabel("Save round");
      const roundFinalData = finalRoundGeneration(
        { round, holes, roundTotals, roundDistances }
      );
      dispatch(saveRound(roundFinalData));
    }
  };

  useEffect(() => {
    if (howManyHolesToPlay === 0) {
      setHandleSave(true);
    }
    else {
      if (tmpHole.hcp !== 0 && tmpHole.par !== 0 && tmpHole.strokes !== 0 && tmpHole.putts !== 0) {
        if (howManyHolesToPlay === 0) {
          setHandleSave(true);
          setLabel("Save round");
        }
        else {
          setHandleSave(true);
        }
      }
    }
  }, [holes, tmpHole])

  return (
    <Button
      variant="contained"
      onClick={saveHole}
      disabled={!handleSave}
      sx={{ marginTop: '0px' }}
    >
      {label}
    </Button>
  )
}

export default SaveRoundButton
