import StackHoles from "@/styles/stack/StackHoles.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Box, Grid2 } from "@mui/material";

const RoundsDataHeader = ({ round }: IRoundMainDataProp) => {
  const { general: { roundCourse, roundDate, coursePar, roundTee, playerHCP }, holes, totals } = round

  const roundStrokes = totals.score.totals;
  const score = roundStrokes;
  const overParNet = roundStrokes - coursePar;
  const overParGross = roundStrokes - (coursePar + playerHCP);
  const overParNetString = overParNet > 0 ? `+${overParNet}` : `${overParNet}`;
  const overParGrossString = overParGross > 0 ? `+${overParGross}` : `${overParGross}`;
  const underPar = roundStrokes <= coursePar + playerHCP;
  const scoreValue = {
    score: score,
    overParNetString: overParNetString,
    overParGrossString: overParGrossString
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2} width={'100%'}>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Course'} value={roundCourse} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Date'} value={roundDate.toString()} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Starting Tees'} value={roundTee} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Holes'} value={holes.length} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Par'} value={coursePar} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Player HCP'} value={playerHCP} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <StackHoles name={'Score'} value={''} scoreValue={scoreValue} underPar={underPar} />
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default RoundsDataHeader
