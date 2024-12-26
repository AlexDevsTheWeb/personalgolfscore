import { BoxStatistics } from "@/styles/box/BoxStatistics.styles";
import { Card } from "@/styles/card/statistics/Card.styles";
import { CardContent } from "@/styles/card/statistics/CardContent.styles";
import { CardHeader } from "@/styles/card/statistics/CardHeader.styles";
import { INewTotals } from "@/types/roundTotals.types";
import { pieChartDimensions } from "@/utils/constant.utils";
import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

interface IPenaltiesPie {
  name: string;
  value: INewTotals;
}
interface IPenaltiesPieValues {
  values: IPenaltiesPie;
}


export const PieChartsPenalties = ({ values }: IPenaltiesPieValues) => {
  const { name, value: { totWater, totOut } } = values;

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
          <Typography>Total:</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}: ${item.value}`,
                arcLabelMinAngle: 30,
                data: [
                  { id: 0, value: totWater, label: 'Waters', color: '#70b0d2' },
                  { id: 1, value: totOut, label: 'Outs', color: '#878787' }
                ],
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            width={pieChartDimensions.width}
            height={pieChartDimensions.height}
          />
        </BoxStatistics>
        <BoxStatistics>
          <Typography>Avg:</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}: ${item.value}%`,
                arcLabelMinAngle: 30,
                data: [
                  { id: 3, value: Number(((totWater / (totWater + totOut)) * 100).toFixed(2)), label: 'Waters', color: '#70b0d2' },
                  { id: 4, value: Number(((totOut / (totWater + totOut)) * 100).toFixed(2)), label: 'Outs', color: '#878787' }
                ],
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            width={pieChartDimensions.width}
            height={pieChartDimensions.height}
          />
        </BoxStatistics>
      </CardContent>
    </Card>
  )
};
