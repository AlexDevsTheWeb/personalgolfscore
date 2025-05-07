import { BoxStatistics } from "@/styles/box/BoxStatistics.styles";
import { Card } from "@/styles/card/statistics/Card.styles";
import { CardContent } from "@/styles/card/statistics/CardContent.styles";
import { CardHeader } from "@/styles/card/statistics/CardHeader.styles";
import { IFairwayPieChartProps } from "@/types/props.types"; // Changed prop type
import { pieChartDimensions } from "@/utils/constant.utils";
import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

export const PieChartFairways = ({ values }: IFairwayPieChartProps) => {
  const { name, value, holes } = values;
  const totFairwaysCenter = value.totFairwaysCenter || 0;
  const totFairwaysLeft = value.totFairwaysLeft || 0;
  const totFairwaysRight = value.totFairwaysRight || 0;

  const totalFairwayAttempts = totFairwaysCenter + totFairwaysLeft + totFairwaysRight;

  if (totalFairwayAttempts === 0) {
    return (
      <Card sx={{ width: '500px', textAlign: 'center', p: 2 }}>
        <Typography>No fairway data for {name.toLowerCase()}.</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ width: '500px' }}>
      <CardHeader title={name.toUpperCase()} />
      <CardContent direction='row'>
        <BoxStatistics>
          <Typography sx={{ textAlign: 'center' }}>Total:</Typography>
          <BoxStatistics sx={{ width: pieChartDimensions.width, height: pieChartDimensions.height, display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}: ${Number(item.value)}`,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  data: [
                    { id: 0, value: totFairwaysCenter, label: 'Center', color: '#30a854' },
                    { id: 1, value: totFairwaysLeft, label: 'Left', color: '#f9954e' },
                    { id: 2, value: totFairwaysRight, label: 'Right', color: '#d270a1' },
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
          <Typography sx={{ textAlign: 'center' }}>%:</Typography>
          <BoxStatistics sx={{ width: pieChartDimensions.width, height: pieChartDimensions.height, display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}: ${item.value}%`,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  data: [
                    { id: 6, value: holes > 0 ? Number(((totFairwaysCenter / holes) * 100).toFixed(1)) : 0, label: 'Center', color: '#30a854' },
                    { id: 7, value: holes > 0 ? Number(((totFairwaysLeft / holes) * 100).toFixed(1)) : 0, label: 'Left', color: '#f9954e' },
                    { id: 8, value: holes > 0 ? Number(((totFairwaysRight / holes) * 100).toFixed(1)) : 0, label: 'Right', color: '#d270a1' },
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
}
