import { Grid, Stack, Typography } from "@mui/material";
import GridCross from "../../../styles/grid/GridCross.styles";
import { formatPerc } from "../../../utils/number/number.utils";
import { divide } from "../../../utils/totals/totalsGenFunc.utils";

interface ICrossProps {
  left: number,
  over: number,
  right: number,
  short: number,
  center: number,
  totals: number
};

const Cross = ({ left, over, right, short, center, totals }: ICrossProps) => {

  return (
    <Grid container sx={{ width: '100%', justifyContent: 'space-between' }}>

      <GridCross item>
        <Stack>
          <Typography>Left</Typography>
          <Typography fontWeight={'bold'}>{formatPerc(divide(left, totals))}</Typography>
        </Stack>
      </GridCross>
      <GridCross item>

        <Stack>
          <Typography>Over</Typography>
          <Typography fontWeight={'bold'}>{formatPerc(divide(over, totals))}</Typography>
        </Stack>

        <Stack sx={{ backgroundColor: 'green', padding: '10px', color: 'white' }}>
          <Typography sx={{ color: 'white !important' }}>CENTER</Typography>
          <Typography fontWeight={'bold'} sx={{ color: 'white !important' }}>{formatPerc(divide(center, totals))}</Typography>
        </Stack>

        <Stack>
          <Typography>Short</Typography>
          <Typography fontWeight={'bold'}>{formatPerc(divide(short, totals))}</Typography>
        </Stack>

      </GridCross>
      <GridCross item>
        <Stack>
          <Typography>Right</Typography>
          <Typography fontWeight={'bold'}>{formatPerc(divide(right, totals))}</Typography>
        </Stack>
      </GridCross>
    </Grid>
  )
}

export default Cross
