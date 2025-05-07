import { BoxStatistics } from "@/styles/box/BoxStatistics.styles";
import { Card } from "@/styles/card/statistics/Card.styles";
import { CardContent } from "@/styles/card/statistics/CardContent.styles";
import { CardHeader } from "@/styles/card/statistics/CardHeader.styles";
import { IPenaltiesPieValues } from "@/types/props.types";
import { pieChartDimensions } from "@/utils/constant.utils";
import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";


export const PieChartsPenalties = ({ values }: IPenaltiesPieValues) => {
  const { name, value: { totWater, totOut } } = values;
  const totalPenalties = (totWater || 0) + (totOut || 0);

  if (totalPenalties === 0) {
    return (
      <Card sx={{ width: '500px', textAlign: 'center', p: 2 }}>
        <Typography>No penalty data for {name.toLowerCase()}.</Typography>
      </Card>
    );
  }
  return (
    <Card sx={{ width: '500px' }}>
      <CardHeader
        sx={{
          backgroundColor: '#cfcfcf',
          color: 'black',
        }}
        title={name.toUpperCase()}
      />
      <CardContent direction='row'>
        <BoxStatistics>
          <Typography sx={{ textAlign: 'center' }}>Total:</Typography>
          <BoxStatistics sx={{ width: pieChartDimensions.width, height: pieChartDimensions.height, display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}: ${item.value}`,
                  arcLabelMinAngle: 30,
                  data: [
                    { id: 0, value: totWater || 0, label: 'Waters', color: '#70b0d2' },
                    { id: 1, value: totOut || 0, label: 'Outs', color: '#878787' }
                  ].filter(d => d.value > 0),
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
            />
          </BoxStatistics>
        </BoxStatistics>
        <BoxStatistics>
          <Typography sx={{ textAlign: 'center' }}>Avg %:</Typography>
          <BoxStatistics sx={{ width: pieChartDimensions.width, height: pieChartDimensions.height, display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}: ${item.value}%`,
                  arcLabelMinAngle: 30,
                  data: [
                    { id: 3, value: totalPenalties > 0 ? Number((((totWater || 0) / totalPenalties) * 100).toFixed(1)) : 0, label: 'Waters', color: '#70b0d2' },
                    { id: 4, value: totalPenalties > 0 ? Number((((totOut || 0) / totalPenalties) * 100).toFixed(1)) : 0, label: 'Outs', color: '#878787' }
                  ].filter(d => d.value > 0),
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                },
              }}
            />
          </BoxStatistics>
        </BoxStatistics>
      </CardContent>
    </Card>
  )
};
