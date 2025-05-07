import StackHoles from "@/styles/stack/StackHoles.styles";
import StackHolesPoints from "@/styles/stack/StackHolesPoints.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";

const RoundsDataHeader = ({ round }: IRoundMainDataProp) => {
  const {
    roundCourse,
    roundDate,
    roundPar,
    roundTee,
    roundPlayingHCP,
    holes,
    totals,
  } = round;

  const par = Number(roundPar);
  const playingHCP = Number(roundPlayingHCP);
  const roundStrokes = totals?.score?.totals;

  const score = roundStrokes ? Number(roundStrokes) : 0;
  const overParNet = roundStrokes ? score - par : 0;
  const overParGross = roundStrokes ? score - (par + playingHCP) : 0;
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
          <StackHoles name={'Holes'} value={holes?.length || 0} />
        </Grid>
        <Grid size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'Par'} value={par} />
        </Grid>
        <Grid size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'HCP'} value={playingHCP} />
        </Grid>
        <Grid size={{ xs: 6, md: 3, lg: 3 }}>
          <StackHolesPoints round={round} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RoundsDataHeader
