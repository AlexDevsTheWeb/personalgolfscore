import GridCross from "@/styles/grid/GridCross.styles";
import CompositeTypography from "@/styles/typography/CompositeTypography.styles";
import { formatPerc } from "@/utils/number/number.utils";
import { divide } from "@/utils/totals/totalsGenFunc.utils";
import { Grid2 } from "@mui/material";
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
    <Grid2 container sx={{ width: '100%', justifyContent: 'space-between' }}>
      <GridCross>
        <CompositeTypography string='Left' value={formatPerc(Number(divide(left, totals)))} />
      </GridCross>
      <GridCross>
        <CompositeTypography string='Over' value={formatPerc(Number(divide(over, totals)))} />
        <CompositeTypography string='CENTER' value={formatPerc(Number(divide(center, totals)))} sx={{ padding: '10px', color: 'white !important' }} center='green' />
        <CompositeTypography string='Short' value={formatPerc(Number(divide(short, totals)))} />
      </GridCross>
      <GridCross>
        <CompositeTypography string='Right' value={formatPerc(Number(divide(right, totals)))} />
      </GridCross>
    </Grid2>
  )
}

export default Cross
