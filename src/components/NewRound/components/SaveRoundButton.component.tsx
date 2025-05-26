
import { RootState } from "@/store/store";
import { ISaveRoundButtonProps } from "@/types/round.types";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const SaveRoundButton: React.FC<ISaveRoundButtonProps> = ({ onSave, disabled }) => {
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundHoles } = round;

  const howManyHolesToPlay = roundHoles - holes.length;
  const label = howManyHolesToPlay <= 0 ? "Save" : "Next";

  return (
    <Button
      variant="contained"
      onClick={onSave}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}

export default SaveRoundButton
