import Rounds from "@/components/Rounds/Rounds.component";
import { useAppStore } from "@/store/zustand";
import { Stack, Typography } from "@mui/material";

const AllRounds = () => {
  const roundsList = useAppStore((state) => state.roundsList);

  return (
    <Stack gap={2} sx={{ width: '100%' }}>
      <Typography variant='headline2'>All rounds</Typography>
      <Rounds rounds={roundsList} />
    </Stack>
  )
}

export default AllRounds
