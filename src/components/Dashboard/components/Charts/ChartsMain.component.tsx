import DistancesTotals from "@/components/Totals/HolebyHole/DistancesTotals.component"
import { Grid, Typography } from "@mui/material"
import FairwayHitsChart from "./FairwayChart.component"
import GirPercentageChart from "./GirChart.component"
import ParAveragesChart from "./ParAveragesChart.component"
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


        <Grid size={{ xs: 12, md: 4 }}>
          <PuttsChart />
        </Grid>

        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <FairwayHitsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <GirPercentageChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ParAveragesChart />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <DistancesTotals />
        </Grid>
      </Grid>
    </>
  )
}

export default ChartsMain
