import DistancesTotals from "@/components/Totals/HolebyHole/DistancesTotals.component"
import { Grid, Typography } from "@mui/material"
import FairwayHitsChart from "./FairwayChart.component"
import GirPercentageChart from "./GirChart.component"
import ParAveragesChart from "./ParAveragesChart.component"
import PointsChart from "./PointsChart.component"
import PuttsChart from "./PuttsChart.component"
import ScoreCharts from "./ScoreChart.component"
import { useAppStore } from "@/store/zustand";

const ChartsMain = () => {
  const roundsList = useAppStore((state) => state.roundsList);
  return (
    <>
      <Typography variant="headline6" component="h2" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
        Performance Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ScoreCharts rounds={roundsList} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointsChart rounds={roundsList} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PuttsChart rounds={roundsList} />
        </Grid>

        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <FairwayHitsChart rounds={roundsList} />
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <GirPercentageChart rounds={roundsList} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ParAveragesChart rounds={roundsList} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <DistancesTotals />
        </Grid>
      </Grid>
    </>
  )
}

export default ChartsMain
