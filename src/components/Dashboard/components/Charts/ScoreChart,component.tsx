import { RootState } from '@/store/store';
import { ICustomBarItemProps, ICustomChartSeries, IRecentRoundData } from '@/types/charts.types';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

const ScoreCharts: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();
  const recentRounds: IRecentRoundData[] = rounds
    .slice(-5)
    .map(round => {
      const rawTotalScore = round.totals.score.totals;
      const rawPar = round.roundPar;
      const rawPlayingHCP = round.roundPlayingHCP;

      const totalScoreNum = (rawTotalScore === undefined || rawTotalScore === null || String(rawTotalScore).trim() === "")
        ? NaN
        : Number(rawTotalScore);
      const parNum = (rawPar === undefined || rawPar === null || String(rawPar).trim() === "")
        ? NaN
        : Number(rawPar);
      const playingHCPNum = (rawPlayingHCP === undefined || rawPlayingHCP === null || String(rawPlayingHCP).trim() === "")
        ? NaN
        : Number(rawPlayingHCP);

      const calculatedScore: number | null = isNaN(totalScoreNum) ? null : totalScoreNum;
      let calculatedNetScore: number | null = null;
      let calculatedGrossScore: number | null = null;

      if (calculatedScore !== null && !isNaN(parNum)) {
        calculatedNetScore = calculatedScore - parNum;
        if (isNaN(calculatedNetScore)) {
          calculatedNetScore = null;
        }

        if (!isNaN(playingHCPNum)) {
          calculatedGrossScore = calculatedScore - (parNum + playingHCPNum);
          if (isNaN(calculatedGrossScore)) {
            calculatedGrossScore = null;
          }
        } else {
          calculatedGrossScore = null;
        }
      }
      return {
        score: calculatedScore,
        netScore: calculatedNetScore,
        grossScore: calculatedGrossScore,
        date: dayjs(round.roundDate).format('DD/MM/YYYY'), // Keep YYYY for clarity if space allows
        course: round.roundCourse,
      }
    });
  const displayableRecentRounds = [...recentRounds].reverse();

  if (displayableRecentRounds.length === 0) {
    return null;
  }

  const xAxisData = displayableRecentRounds.map(r => dayjs(r.date, 'DD/MM/YYYY').format('DD/MM'));

  const chartSeries: ICustomChartSeries[] = [
    {
      id: 'totalScoreSeries',
      type: 'bar',
      data: displayableRecentRounds.map(r => r.score),
      label: 'Total Score',
      valueFormatter: (value: number | null) => (value === null ? '' : `${value}`),
      color: theme.palette.primary.main,
    },
    {
      id: 'netScoreSeries',
      type: 'bar',
      data: displayableRecentRounds.map(r => r.netScore),
      label: 'Net Score',
      valueFormatter: (value: number | null) => {
        if (value === null) return '';
        if (value === 0) return 'E';
        return value > 0 ? `+${value}` : `${value}`;
      },
    },
    {
      id: 'grossScoreSeries',
      type: 'bar',
      data: displayableRecentRounds.map(r => r.grossScore),
      label: 'Gross Score',
      valueFormatter: (value: number | null) => {
        if (value === null) return '';
        if (value === 0) return 'E';
        return value > 0 ? `+${value}` : `${value}`;
      },
    },
  ];

  const CustomBarItem = (props: ICustomBarItemProps) => {
    // console.log('LRC - CustomBarItem CALLED. RAW PROPS:', JSON.parse(JSON.stringify(props)));

    const { style, ownerState, className } = props;

    if (!style || !ownerState) {
      console.log("sono qui 1")
      // console.error('LRC - CustomBarItem: style or ownerState is missing!', { props });
      return null;
    }

    const { x: xFromStyle, y: yFromStyle, width: slotWidthFromStyle, height: heightFromStyle } = style;
    // Destructure reliably available props from ownerState
    const { id: seriesIdFromOwner, color: defaultColorFromOwnerState, dataIndex } = ownerState;
    // `value` from ownerState is unreliable, so we will derive it.

    // --- Derive valueToUse directly from chartSeries ---
    const currentSeriesDefinitionForValue = chartSeries.find(s => s.id === seriesIdFromOwner);
    let valueToUse: number | null | undefined = undefined;

    if (currentSeriesDefinitionForValue && currentSeriesDefinitionForValue.data && dataIndex < currentSeriesDefinitionForValue.data.length) {
      valueToUse = currentSeriesDefinitionForValue.data[dataIndex];
    }
    // --- End value derivation ---

    // console.log("ownerstate -> ", ownerState, "valueToUse ->", valueToUse);

    const fixedBarWidth = 20; // Your desired fixed width
    let fillColor = defaultColorFromOwnerState;

    // Apply custom coloring based on value for net and gross scores
    if (seriesIdFromOwner === 'netScoreSeries' || seriesIdFromOwner === 'grossScoreSeries') {
      if (valueToUse !== null && valueToUse !== undefined && valueToUse > 0) {
        fillColor = '#cf8484'; // Specific Red for positive
      } else if (valueToUse !== null && valueToUse !== undefined && valueToUse < 0) {
        fillColor = '#82b38b'; // Specific Green for negative
      } else if (valueToUse === 0) {
        fillColor = theme.palette.grey[400]; // Neutral grey for zero scores
      }
    }

    // Ensure layout props from style are numbers
    const parseLayoutProp = (prop: any): number | undefined => {
      if (typeof prop === 'number') {
        return prop;
      }
      if (typeof prop === 'string') {
        const num = parseFloat(prop);
        return isNaN(num) ? undefined : num;
      }
      // Check if it's an object with a .get() method (common for animated values)
      if (typeof prop === 'object' && prop !== null && typeof prop.get === 'function') {
        const num = parseFloat(prop.get());
        return isNaN(num) ? undefined : num;
      }
      return undefined;
    };

    const xNum = parseLayoutProp(xFromStyle);
    const yNum = parseLayoutProp(yFromStyle);
    const heightNum = parseLayoutProp(heightFromStyle);
    const slotWidthNum = parseLayoutProp(slotWidthFromStyle);

    // Calculate x position to center the fixed-width bar within its allocated slot
    const barX = (xNum ?? 0) + ((slotWidthNum ?? fixedBarWidth) - fixedBarWidth) / 2;

    // Guard clause: ensure layout properties are numbers and dimensions are valid.
    const layoutPropsInvalid = xNum === undefined || yNum === undefined || heightNum === undefined || slotWidthNum === undefined ||
      isNaN(xNum) || isNaN(yNum) || isNaN(heightNum) || isNaN(slotWidthNum);

    const dimensionsInvalid = (heightNum && heightNum < 0) || (slotWidthNum && slotWidthNum <= 0);


    if (layoutPropsInvalid || dimensionsInvalid || seriesIdFromOwner === undefined || valueToUse === undefined) { // Use valueToUse here
      // console.log('LRC - CustomBarItem: Guard clause triggered. Not rendering.', { xNum, yNum, heightNum, slotWidthNum, seriesIdFromOwner, value });
      // console.log("Guard clause triggered. valueToUse:", valueToUse, "Layout invalid:", layoutPropsInvalid, "Dimensions invalid:", dimensionsInvalid);

      return null;
    }

    // Find the series definition to get the valueFormatter for the label
    const seriesDefinition = chartSeries.find(s => s.id === seriesIdFromOwner);
    const formattedValue = seriesDefinition && valueToUse !== null && valueToUse !== undefined ? seriesDefinition.valueFormatter(valueToUse) : '';

    // console.log(`LRC - CustomBarItem RENDERING BAR: barX=${barX}, yNum=${yNum}, fixedBarWidth=${fixedBarWidth}, heightNum=${heightNum}, fill=${fillColor}, value=${value}`);
    // console.log("formatted value: ", formattedValue)

    return (
      <g className={className}> {/* Pass down className */}
        <rect x={barX} y={yNum} width={fixedBarWidth} height={Math.max(0, heightNum!)} fill={fillColor} />
        {formattedValue && heightNum! > 12 && fixedBarWidth > 0 && (
          <text x={barX + fixedBarWidth / 2} y={(yNum ?? 0) + (heightNum! ?? 0) / 2} dy=".35em" textAnchor="middle" fill={theme.palette.getContrastText(fillColor || '#000')} fontSize="0.7rem">
            {formattedValue}
          </text>
        )}
      </g>
    );
  };

  const CustomLegend = () => {
    const legendItems = [
      { label: 'Total Score', color: theme.palette.primary.main },
      { label: 'Net/Gross Score (>0)', color: '#cf8484' }, // Red for positive
      { label: 'Net/Gross Score (<0)', color: '#82b38b' }, // Green for negative
      { label: 'Net/Gross Score (0)', color: theme.palette.grey[400] }, // Grey for zero
    ];

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 1, mb: 2 }}>
        {legendItems.map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                mr: 0.5,
                border: '1px solid rgba(0,0,0,0.2)', // Optional: adds a slight border to swatches
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 2, width: '100%' }} elevation={2}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Last {displayableRecentRounds.length} Rounds Performance
      </Typography>
      {/* Render Custom Legend if there's data */}
      {displayableRecentRounds.length > 0 && <CustomLegend />}
      <Box sx={{ mt: 1, width: '100%' }}>
        <BarChart

          barLabel="value"
          xAxis={[{
            data: xAxisData,
            scaleType: 'band',
            id: 'roundsDatesXAxis',

            // colorMap: {
            //   type: 'piecewise',
            //   thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
            //   colors: ['blue', '#cf8484', '#82b38b'],
            // }
          }]}
          yAxis={[{
            id: 'scoresYAxis',
            label: 'Score',

            colorMap: {
              type: 'piecewise',
              thresholds: [0],
              colors: ['#82b38b', '#cf8484'],
            }
          }]}
          series={chartSeries}
          height={400}
          skipAnimation
          margin={{ top: 30, right: 15, bottom: 30, left: 45 }}
          slotProps={{
            legend: {
              hidden: true, // Always hide the default legend
              labelStyle: { fontSize: '0.8rem' }
            },
          }}
          slots={{ bar: CustomBarItem }}
        />
      </Box>
    </Paper>
  );
};

export default ScoreCharts;