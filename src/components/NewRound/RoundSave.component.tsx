import { Box, Button } from "@mui/material";
import { useAppStore } from "@/store/zustand";

const RoundSave = () => {
  const isLoading = useAppStore((state) => state.newRoundSaver.isLoading);
  const saveNewRound = useAppStore((state) => state.saveNewRound);
  const initialHCP = useAppStore((state) => state.player?.initialHCP) ?? null;
  const roundsListLength = useAppStore((state) => state.roundsList.length);

  const blocked = roundsListLength === 0 && initialHCP == null;

  const handleClick = () => {
    if (blocked) return;
    saveNewRound();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        variant='contained'
        onClick={handleClick}
        disabled={isLoading || blocked}
      >
        {isLoading ? "Saving Round..." : "Save Final Round"}
      </Button>
    </Box>
  )
}

export default RoundSave
