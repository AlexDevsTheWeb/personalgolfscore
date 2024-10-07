import { Divider, Grid, Stack } from "@mui/material";
import { formatPerc } from "../../../utils/number/number.utils";
import GridStat from "./GridStat.component";

interface ITotal {
  value: any;
}

const TotalsDisplay = ({ value }: ITotal) => {
  return (
    <Stack sx={{ backgroundColor: '#f9f9f9' }}>
      <Grid container spacing={1} >
        <GridStat
          gridNumber={4}
          label='1 putt %'
          value={formatPerc(value.putt1Perc)}
        />
        <GridStat
          gridNumber={4}
          label='2 putt %'
          value={(value.putt1Perc === 0 && value.putt3Perc === 0) ? '-' : formatPerc(1 - value.putt1Perc - value.putt3Perc)} />
        <GridStat
          gridNumber={4}
          label='3 putt %'
          value={formatPerc(value.putt3Perc)} />
      </Grid>
      <Divider />
      <Grid container spacing={1}>
        <GridStat
          gridNumber={4}
          label='Holed'
          value={value.puttsHoled !== 0 ? value.puttsHoled : '-'} />
        <GridStat
          gridNumber={4}
          label='Attempts'
          value={value.puttsAttempts !== 0 ? value.puttsAttempts : '-'} />
        <GridStat
          gridNumber={4}
          label='Average'
          value={value.puttsAverage !== 0 ? value.puttsAverage : '-'} />
      </Grid>
      <Divider />
      <Grid container spacing={1}>
        <GridStat
          gridNumber={4}
          label='Average distance'
          value={value.puttsAverageDistance !== 0 ? value.puttsAverageDistance : '-'} />
        <GridStat
          gridNumber={4}
          label='Second putt avg. length'
          value={Number(value.puttsSecondAverageLength) !== 0 ? Number(value.puttsSecondAverageLength) : '-'} />
        <GridStat
          gridNumber={4}
          label='3 putts'
          value={value.putts3 !== 0 ? value.putts3 : '-'} />
      </Grid>
    </Stack >
  )
}

export default TotalsDisplay
