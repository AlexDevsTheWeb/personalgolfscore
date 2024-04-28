import { BoxPlayer, Grid } from '../../styles';

import { Box, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { IShotsTotals } from '../../types/roundTotals.types';

interface Props {
  totals: IShotsTotals[]
}

const RoundsDataShotsTotals = (props: Props) => {
  const { totals } = props;
  return (
    <BoxPlayer>
      <Grid container spacing={0}>
        {
          totals.map((total) => {
            const { points, fir, left, right, gir, putts, sand, water, out, holeNumber } = total;
            return (
              <Box key={total.roundID} sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'space-between',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <Grid item md={2} sx={{}}>
                  <Typography>POINTS</Typography>
                  <Gauge width={100} height={100} value={points} valueMin={1} valueMax={100}
                    title='POINTS'
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: points >= (holeNumber * 2) ? '#52b202 !important' : 'rgb(244 0 0 / 87%)',
                        color: points >= (holeNumber * 2) ? '#52b202' : '#f25448',
                        transform: 'translate(0px, 0px)',
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: points >= (holeNumber * 2) ? '#52b202' : '#f25448',
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.divider,
                      },
                    })}
                    text={
                      ({ value }) => `${value}`

                    } />
                  <Typography>GIR</Typography>
                  <Gauge width={100} height={100} value={gir} valueMin={1} valueMax={100}

                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 18,
                        transform: 'translate(0px, 0px)',
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: gir >= 50 ? '#52b202' : '#f25448',
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
                  <Gauge width={100} height={100} value={putts} valueMin={1} valueMax={holeNumber * 2} />
                </Grid>
                <Grid item md={4}>
                  <Typography>Fairway in regulation</Typography>
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `${item.label}`,
                        arcLabelMinAngle: 45,
                        data: [
                          { id: 0, value: fir, label: 'F.I.R. (%)', color: '#5f8d65' },
                          { id: 1, value: left, label: 'Left (%)', color: '#d29c70' },
                          { id: 2, value: right, label: 'Right (%)', color: '#fcb173' }
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
                          { id: 3, value: sand, label: 'Sands', color: '#bb8c00' },
                          { id: 4, value: water, label: 'Waters', color: '#70b0d2' },
                          { id: 5, value: out, label: 'Outs', color: '#878787' }
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
            )
          })
        }

      </Grid >
    </BoxPlayer >
  )
}

export default RoundsDataShotsTotals