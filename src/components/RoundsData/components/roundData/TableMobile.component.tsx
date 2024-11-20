import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CompositeTypography from '../../../../styles/typography/CompositeTypography.styles';
import { IRoundMainDataProp } from '../../../../types/props.types';

const TableMobile = ({ round }: IRoundMainDataProp) => {

  const { roundCourse, roundDate, roundHoles, roundPar, roundTee, roundPlayingHCP, roundStrokes } = round

  const score = roundStrokes;
  const overParNet = roundStrokes - roundPar;
  const overParGross = roundStrokes - (roundPar + roundPlayingHCP);
  const overParNetString = overParNet > 0 ? `+${overParNet}` : `${overParNet}`;
  const overParGrossString = overParGross > 0 ? `+${overParGross}` : `${overParGross}`;

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container>
        <Grid size={12}>
          <CompositeTypography string='Course' value={roundCourse} dir='row' />
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={12}>
          <Grid container sx={{ gap: '10px' }}>
            <Grid size={6}>
              <CompositeTypography string='Starting Tees' value={roundTee} dir='row' />
            </Grid>
            <Grid size={6}>
              <CompositeTypography string='Date' value={roundDate} dir='row' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={12}>
          <Grid container sx={{ gap: '10px' }}>
            <Grid size={4}>
              <CompositeTypography string='Holes' value={roundHoles} dir='row' />
            </Grid>
            <Grid size={4}>
              <CompositeTypography string='Par' value={roundPar} dir='row' />
            </Grid>
            <Grid size={4}>
              <CompositeTypography string='Player HCP' value={roundPlayingHCP} dir='row' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={12}>
          <CompositeTypography string='Score (TOT | NET | GROSS)' value={`${score} | ${overParNetString} | ${overParGrossString}`} dir='row' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TableMobile
