import { Box, Button } from "@mui/material";
import { useAppStore } from "@/store/zustand";

const RoundSave = () => {
  const isLoading = useAppStore((state) => state.newRoundSaver.isLoading);
  const saveNewRound = useAppStore((state) => state.saveNewRound);

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
