import { setHoleNumber } from "@/features/hole/holeTmp.slice";
import { setHolesCompleted } from "@/features/newRound/newRoundHoles.slice";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SaveRoundButton = () => {
  const dispatch = useDispatch();
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { round: { roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);

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
    }
  };

  useEffect(() => {
    if (howManyHolesToPlay === 0) {
      setHandleSave(true);
    }
    else {
      if (tmpHole.hcp !== 0 && tmpHole.par !== 0 && tmpHole.strokes !== 0 && tmpHole.putts !== 0) {
        setHandleSave(true);
      }
    }

    if (howManyHolesToPlay === 0) {
      setLabel("Save round");
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
