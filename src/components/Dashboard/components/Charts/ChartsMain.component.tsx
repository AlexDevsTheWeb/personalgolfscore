import DistancesTotals from "@/components/Totals/HolebyHole/DistancesTotals.component"
import { Grid, Typography } from "@mui/material"
import FairwayHitsChart from "./FairwayChart.component"
import GirPercentageChart from "./GirChart.component"
import ParAveragesChart from "./ParAveragesChart.component"
import PointsChart from "./PointsChart.component"
import PuttsChart from "./PuttsChart.component"
import ScoreCharts from "./ScoreChart.component"
import { useRoundsStore } from "@/store/zustand";

const ChartsMain = () => {
  const rounds = useRoundsStore((state) => state.rounds);
  return (
    <>
      <Typography variant="headline6" component="h2" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
        Performance Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ScoreCharts rounds={rounds} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PointsChart rounds={rounds} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PuttsChart rounds={rounds} />
        </Grid>

        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <FairwayHitsChart rounds={rounds} />
        </Grid>
        <Grid size={{ xs: 12, md: 3, lg: 4 }}>
          <GirPercentageChart rounds={rounds} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ParAveragesChart rounds={rounds} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <DistancesTotals />
        </Grid>
      </Grid>
    </>
  )
}

export default ChartsMain
