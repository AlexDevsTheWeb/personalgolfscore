import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { BoxStatistics } from "../../../styles/box/BoxStatistics.styles";
import { Card } from "../../../styles/card/statistics/Card.styles";
import { CardContent } from "../../../styles/card/statistics/CardContent.styles";
import { CardHeader } from "../../../styles/card/statistics/CardHeader.styles";
import { INewTotals } from "../../../types/roundTotals.types";
import { pieChartDimensions } from "../../../utils/constant.utils";

interface IPenaltiesPie {
  name: string;
  value: INewTotals;
  holes: number;
}
interface IPenaltiesPieValues {
  values: IPenaltiesPie;
}

const PieChartFairways = ({ values }: IPenaltiesPieValues) => {
  const { name, value: { totFairwaysCenter, totFairwaysLeft, totFairwaysRight }, holes } = values;

  return (
    <Card>
      <CardHeader title={name.toUpperCase()} />
      <CardContent direction='row'>
        <BoxStatistics>
          <Typography>Total:</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}: ${Number(item.value)}`,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                data: [
                  { id: 0, value: totFairwaysCenter, label: 'Center', color: '#30a854' },
                  { id: 1, value: totFairwaysLeft, label: 'Left', color: '#f9954e' },
                  { id: 2, value: totFairwaysRight, label: 'Right', color: '#d270a1' },
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
          <Typography>%:</Typography>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}: ${item.value}%`,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                data: [
                  { id: 6, value: Number(((totFairwaysCenter / holes) * 100).toFixed(2)), label: 'Center', color: '#30a854' },
                  { id: 7, value: Number(((totFairwaysLeft / holes) * 100).toFixed(2)), label: 'Left', color: '#f9954e' },
                  { id: 8, value: Number(((totFairwaysRight / holes) * 100).toFixed(2)), label: 'Right', color: '#d270a1' },
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
}

export default PieChartFairways
