import { RootState } from "@/store/store";
import StackHoles from "@/styles/stack/StackHoles.styles";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const NewRoundMainData = () => {

  const roundData = useSelector((state: RootState) => state.newRound.newRoundMain.round);
  const { roundCourse, roundDate, roundHoles, roundPar, roundPlayingHCP, roundTee } = roundData;

  const formattedDate = roundDate ? dayjs(roundDate).format('DD/MM/YYYY') : 'N/A';

  return (
    <Box sx={{ width: '100%' }} flexGrow={1}>
      <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Grid size={{ xs: 5, md: 5, lg: 3 }}>
          <StackHoles name={'Course'} value={roundCourse || 'N/A'} />
        </Grid>
        <Grid size={{ xs: 4, md: 3, lg: 2 }}>
          <StackHoles name={'Date'} value={formattedDate} />
        </Grid>
        <Grid size={{ xs: 3, md: 3, lg: 1 }}>
          <StackHoles name={'Tees'} value={roundTee || 'N/A'} />
        </Grid>
        <Grid size={{ xs: 2, md: 3, lg: 1 }}>
          {/* Use holes array length */}
          <StackHoles name={'Holes'} value={roundHoles} />
        </Grid>
        <Grid size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'Par'} value={roundPar} />
        </Grid>
        <Grid size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'HCP'} value={roundPlayingHCP} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default NewRoundMainData
