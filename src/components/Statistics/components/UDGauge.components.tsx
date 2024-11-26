import {
  Typography
} from '@mui/material';

import { BoxStatistics } from '@/styles/box/BoxStatistics.styles';
import { Card } from '@/styles/card/statistics/Card.styles';
import { CardContent } from '@/styles/card/statistics/CardContent.styles';
import { CardHeader } from '@/styles/card/statistics/CardHeader.styles';
import { Gauge, gaugeClasses } from "@mui/x-charts";

interface IPointsGauge {
  name: string;
  value: { X: number; N: number; V: number };
  holes: number;
  percentage: boolean;
}
interface IPointsGaugeValues {
  values: IPointsGauge;
}

export const UDGauge = ({ values }: IPointsGaugeValues) => {
  const { name, value: { X, N } } = values;

  const upTotals = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: X + N,
  }
  const upDone = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: X,
  }
  const udFailed = {
    width: 150,
    height: 80,
    valueMax: 20,
    value: N,
  }
  const udDonePerc = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: Number(((X / (X + N)) * 100).toFixed(2))
  }
  const udFailedPerc = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: Number(((N / (X + N)) * 100).toFixed(2))
  }

  return (
    <Card>
      <CardHeader
        sx={{
          backgroundColor: '#cfcfcf',
          color: 'black',
        }}
        title={name.toUpperCase()}
      />
      <CardContent direction='row'>
        <BoxStatistics>
          <Typography>Up&Down Totals:</Typography>
          <Gauge
            {...upTotals}
            startAngle={-90}
            endAngle={90}
            innerRadius='50%'
            outerRadius='80%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.main,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },

            })}
          />
        </BoxStatistics>
        <BoxStatistics>
          <Typography>Up&Down Done:</Typography>
          <Gauge
            {...upDone}
            startAngle={-90}
            endAngle={90}
            innerRadius='50%'
            outerRadius='80%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.main,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },

            })}
          />
        </BoxStatistics>
        <BoxStatistics>
          <Typography>Up&Down Failed:</Typography>
          <Gauge
            {...udFailed}
            startAngle={-90}
            endAngle={90}
            innerRadius='50%'
            outerRadius='80%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.main,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },
            })}
          />
        </BoxStatistics>


      </CardContent>
      <CardContent direction='row'>

        <BoxStatistics>
          <Typography>Up&Down Done %:</Typography>
          <Gauge
            {...udDonePerc}
            startAngle={-90}
            endAngle={90}
            innerRadius='50%'
            outerRadius='80%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.main,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },

            })}
          />
        </BoxStatistics>
        <BoxStatistics>
          <Typography>Up&Down Failed %:</Typography>
          <Gauge
            {...udFailedPerc}
            startAngle={-90}
            endAngle={90}
            innerRadius='50%'
            outerRadius='80%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fontWeight: 'bold'
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.main,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },
            })}
          />
        </BoxStatistics>


      </CardContent>
    </Card>
  )
};
