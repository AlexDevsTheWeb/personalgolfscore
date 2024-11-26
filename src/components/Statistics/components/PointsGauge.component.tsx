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
  value: number;
  holes: number;
  percentage: boolean;
}
interface IPointsGaugeValues {
  values: IPointsGauge;
}

export const PointsGauge = ({ values }: IPointsGaugeValues) => {

  const { name, value, holes, percentage } = values;

  const settingsTotals = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: value,
  }
  const settingsAvg = {
    width: 150,
    height: 80,
    valueMax: 20,
    value: Number((value / holes).toFixed(2)),
  }
  const settingsPct = {
    width: 150,
    height: 80,
    valueMax: 100,
    value: Number(((value / holes) * 100).toFixed(2)),
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
          <Typography>Total:</Typography>
          <Gauge
            {...settingsTotals}
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
                fill: (value > (2 * holes)) ? '#ff9900' : '#238b00',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },

            })}
          />
        </BoxStatistics>
        <BoxStatistics>
          <Typography>Avg:</Typography>
          <Gauge
            {...settingsAvg}
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
                fill: (value > (2 * holes)) ? '#ff9900' : '#238b00',
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#cccccc',
              },
            })}
          />
        </BoxStatistics>

        {
          !!percentage &&
          <BoxStatistics>
            <Typography>Avg:</Typography>
            <Gauge
              {...settingsPct}
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
                  fill: (value > (2 * holes)) ? '#ff9900' : '#238b00',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                  fill: '#cccccc',
                },
              })}
            />
          </BoxStatistics>
        }
      </CardContent>
    </Card>
  )
};
