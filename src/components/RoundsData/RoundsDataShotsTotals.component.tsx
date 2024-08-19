import { Box } from '@mui/material';
import { Gauge, gaugeClasses, pieArcLabelClasses, PieChart } from '@mui/x-charts';
import _ from 'lodash';
import { useState } from 'react';
import { BoxPlayer, Grid, Typography } from '../../styles';


interface Props {
  totals: any
}

const RoundsDataShotsTotals = (props: Props) => {
  const { totals } = props;
  const [wh, setWh] = useState<any>();

  if (totals) {
    setWh(
      <Grid container spacing={0} >
        <Box key={_.uniqueId()} sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <Grid item md={2} sx={{}}>
            <Typography>POINTS</Typography>
            <Gauge width={100} height={100} value={totals.points} valueMin={1} valueMax={100}
              title='POINTS'
              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                  fontWeight: 'bold',
                  fill: totals.points >= (totals.holeNumber * 2) ? '#52b202 !important' : 'rgb(244 0 0 / 87%)',
                  color: totals.points >= (totals.holeNumber * 2) ? '#52b202' : '#f25448',
                  transform: 'translate(0px, 0px)',
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: totals.points >= (totals.holeNumber * 2) ? '#52b202' : '#f25448',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.divider,
                },
              })}
              text={
                ({ value }) => `${value}`

              } />
            <Typography>GIR</Typography>
            <Gauge width={100} height={100} value={totals.gir} valueMin={1} valueMax={100}

              sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 18,
                  transform: 'translate(0px, 0px)',
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: totals.gir >= 50 ? '#52b202' : '#f25448',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: theme.palette.divider,
                  border: '1px solid #ff9900'
                },
              })}
              text={
                ({ value }) => `${value}%`
              } />
            <Typography>Putts</Typography>
            <Gauge width={100} height={100} value={totals.putts / totals.holeNumber} valueMin={1} valueMax={10} />
            <Gauge width={100} height={100} value={totals.putts} valueMin={1} valueMax={totals.holeNumber * 5} />
          </Grid>
          <Grid item md={4}>
            <Typography>Fairway in regulation</Typography>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}`,
                  arcLabelMinAngle: 45,
                  data: [
                    { id: 0, value: totals.fir, label: 'FAIRWAYS (%)', color: '#5f8d65' },
                    { id: 1, value: totals.left, label: 'Left (%)', color: '#d29c70' },
                    { id: 2, value: totals.right, label: 'Right (%)', color: '#fcb173' }
                  ],
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
              height={250}
            />
          </Grid>
          <Grid item md={3}>
            <Typography>Penalties</Typography>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}`,
                  arcLabelMinAngle: 30,
                  data: [
                    { id: 3, value: totals.sand, label: 'Sands', color: '#bb8c00' },
                    { id: 4, value: totals.water, label: 'Waters', color: '#70b0d2' },
                    { id: 5, value: totals.out, label: 'Outs', color: '#878787' }
                  ],
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
              height={250}
            />

          </Grid>

        </Box>

      </Grid>
    )
  }
  return (
    <BoxPlayer>
      {wh}
    </BoxPlayer>
  )
}

export default RoundsDataShotsTotals