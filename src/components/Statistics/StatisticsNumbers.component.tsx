import { Grid, Typography } from '@mui/material'
import { Gauge, PieChart, gaugeClasses, pieArcLabelClasses } from '@mui/x-charts'

interface Props {
  totals: any,
  holes: number
}

const StatisticsNumbers = ({ totals, holes }: Props) => {
  return (
    <Grid container spacing={0}>
      <Grid item md={1}>
        <Typography>POINTS</Typography>
        <Gauge width={100} height={100} value={totals.points / holes} valueMin={1} valueMax={100}
          title='POINTS'
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
              fontWeight: 'bold',
              transform: 'translate(0px, 0px)',
            },
            [`& .${gaugeClasses.valueArc}`]: {
              // fill: calculatedTotals.points >= (holeNumber * 2) ? '#52b202' : '#f25448',
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.divider,
            },
          })}
          text={
            ({ value }) => `${value}`

          } />
        <Typography>GIR</Typography>
        <Gauge width={100} height={100} value={totals.gir / holes} valueMin={1} valueMax={100}

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
        <Gauge width={100} height={100} value={totals.putts / holes} valueMin={1} />
        <Gauge width={100} height={100} value={totals.putts} valueMin={1} />
      </Grid>
      <Grid item md={6}>
        <Typography>Fairway in regulation</Typography>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label}`,
              arcLabelMinAngle: 45,
              data: [
                { id: 0, value: totals.fir / holes, label: 'F.I.R. (%)', color: '#5f8d65' },
                { id: 1, value: totals.left / holes, label: 'Left (%)', color: '#d29c70' },
                { id: 2, value: totals.right / holes, label: 'Right (%)', color: '#fcb173' }
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
      <Grid item md={5}>
        <Typography>Penalties</Typography>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label}`,
              arcLabelMinAngle: 30,
              data: [
                { id: 3, value: totals.sand / holes, label: 'Sands', color: '#bb8c00' },
                { id: 4, value: totals.water / holes, label: 'Waters', color: '#70b0d2' },
                { id: 5, value: totals.out / holes, label: 'Outs', color: '#878787' }
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
    </Grid>
  )
}

export default StatisticsNumbers
