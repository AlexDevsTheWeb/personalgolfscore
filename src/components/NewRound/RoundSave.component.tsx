import { Box, Button } from "@mui/material";
import { useNewRoundStore } from "@/store/zustand";

const RoundSave = () => {
  const isLoading = useNewRoundStore((state) => state.saver.isLoading);
  const saveNewRound = useNewRoundStore((state) => state.saveNewRound);

  const handleClick = () => {
    saveNewRound();
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
