import StackHoles from "@/styles/stack/StackHoles.styles";
import StackHolesPoints from "@/styles/stack/StackHolesPoints.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Box, Grid2 } from "@mui/material";

const RoundsDataHeader = ({ round }: IRoundMainDataProp) => {
  const { general: { roundCourse, roundDate, coursePar, roundTee, playerHCP }, holes, totals } = round;

  const roundStrokes = totals.score.totals;
  const score = roundStrokes;
  const overParNet = roundStrokes - coursePar;
  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParNetString = overParNet > 0 ? `+${overParNet}` : `${overParNet}`;
  const overParGrossString = overParGross > 0 ? `+${overParGross}` : `${overParGross}`;
  const underPar = roundStrokes <= coursePar + playerHCP;

  return (
    <Box sx={{ width: '100%' }} flexGrow={1}>
      <Grid2 container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Grid2 size={{ xs: 5, md: 5, lg: 3 }}>
          <StackHoles name={'Course'} value={roundCourse} />
        </Grid2>
        <Grid2 size={{ xs: 4, md: 3, lg: 2 }}>
          <StackHoles name={'Date'} value={roundDate.toString()} />
        </Grid2>
        <Grid2 size={{ xs: 3, md: 3, lg: 1 }}>
          <StackHoles name={'Tees'} value={roundTee} />
        </Grid2>
        <Grid2 size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'Holes'} value={holes.length} />
        </Grid2>
        <Grid2 size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'Par'} value={coursePar} />
        </Grid2>
        <Grid2 size={{ xs: 2, md: 3, lg: 1 }}>
          <StackHoles name={'HCP'} value={playerHCP} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3, lg: 3 }}>
          <StackHolesPoints round={round} />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default RoundsDataHeader
