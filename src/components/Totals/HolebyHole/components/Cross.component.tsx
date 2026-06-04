import GridCross from "@/styles/grid/GridCross.styles";
import CompositeTypography from "@/styles/typography/CompositeTypography.styles";
import { ICrossProps } from "@/types/props.types";
import { safeDivide } from "@/utils/calculator/math.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Grid } from "@mui/material";

const Cross = ({ left, over, right, short, center, totals }: ICrossProps) => {

  return (
    <Grid container sx={{ width: '100%', justifyContent: 'space-between' }}>
      <GridCross>
        <CompositeTypography string='Left' value={formatPerc(Number(safeDivide(left, totals)))} />
      </GridCross>
      <GridCross>
        <CompositeTypography string='Over' value={formatPerc(Number(safeDivide(over, totals)))} />
        <CompositeTypography string='CENTER' value={formatPerc(Number(safeDivide(center, totals)))} sx={{ padding: '10px', color: 'white !important' }} center='green' />
        <CompositeTypography string='Short' value={formatPerc(Number(safeDivide(short, totals)))} />
      </GridCross>
      <GridCross>
        <CompositeTypography string='Right' value={formatPerc(Number(safeDivide(right, totals)))} />
      </GridCross>
    </Grid>
  )
}

export default Cross
