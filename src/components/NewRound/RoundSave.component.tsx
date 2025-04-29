import { saveNewRound } from "@/features/newRound/roundSaver.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const RoundSave = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((store: RootState) => store.roundSaver);

  const handleClick = () => {
    // Dispatch the action to save the entire round data
    dispatch(saveNewRound(null));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        variant='contained'
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Saving Round..." : "Save Final Round"}
      </Button>
    </Box>
  )
}

export default RoundSave
