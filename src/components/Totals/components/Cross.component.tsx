import { Grid } from "@mui/material";
import GridCross from "../../../styles/grid/GridCross.styles";
import CompositeTypography from "../../../styles/typography/CompositeTypography.styles";
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
        <CompositeTypography string='Left' value={formatPerc(divide(left, totals))} />
      </GridCross>
      <GridCross item>
        <CompositeTypography string='Over' value={formatPerc(divide(over, totals))} />
        <CompositeTypography string='CENTER' value={formatPerc(divide(center, totals))} sx={{ padding: '10px', color: 'white !important' }} center='green' />
        <CompositeTypography string='Short' value={formatPerc(divide(short, totals))} />
      </GridCross>
      <GridCross item>
        <CompositeTypography string='Right' value={formatPerc(divide(right, totals))} />
      </GridCross>
    </Grid>
  )
}

export default Cross
