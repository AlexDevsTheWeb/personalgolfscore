import DistancesTotals from "@/components/Totals/HolebyHole/DistancesTotals.component"
import { Grid, Typography } from "@mui/material"
import FairwayHitsChart from "./FairwayChart.component"
import GirPercentageChart from "./GirChart.component"
import PointsChart from "./PointsChart.component"
import PuttsChart from "./PuttsChart.component"
import ScoreCharts from "./ScoreChart.component"

const ChartsMain = () => {
  return (
    <>
      <Typography variant="headline6" component="h2" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
        Performance Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ScoreCharts />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointsChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <DistancesTotals />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <FairwayHitsChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 2 }}>
          <GirPercentageChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <PuttsChart />
        </Grid>
      </Grid>
    </>
  )
}

export default ChartsMain
