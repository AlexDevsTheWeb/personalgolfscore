
import { ISaveRoundButtonProps } from "@/types/round.types";
import { Button } from "@mui/material";
import { useAppStore } from "@/store/zustand";

const SaveRoundButton: React.FC<ISaveRoundButtonProps> = ({ onSave, disabled }) => {
  const holes = useAppStore((state) => state.newRoundHoles.holes);
  const round = useAppStore((state) => state.newRoundMain.round);
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
