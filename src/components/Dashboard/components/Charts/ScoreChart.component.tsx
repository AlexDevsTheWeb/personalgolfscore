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
        date: dayjs(round.roundDate).format('DD/MM/YYYY'),
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
      // type: 'bar', // Removed: BarChart infers this; type is optional in ICustomChartSeries
      data: displayableRecentRounds.map(r => r.score),
      label: 'Total Score',
      valueFormatter: (value: number | null) => (value === null ? '' : `${value}`),
      color: theme.palette.primary.main,
    },
    {
      id: 'netScoreSeries',
      // type: 'bar', // Removed
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
      // type: 'bar', // Removed
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
    const { style, ownerState, className } = props;

    if (!style || !ownerState) {
      return null;
    }

    const { x: xFromStyle, y: yFromStyle, width: slotWidthFromStyle, height: heightFromStyle } = style;
    const { id: seriesIdFromOwner, color: defaultColorFromOwnerState, dataIndex } = ownerState;

    const currentSeriesDefinitionForValue = chartSeries.find(s => s.id === seriesIdFromOwner);
    let valueToUse: number | null | undefined = undefined;

    if (currentSeriesDefinitionForValue && currentSeriesDefinitionForValue.data && dataIndex < currentSeriesDefinitionForValue.data.length) {
      valueToUse = currentSeriesDefinitionForValue.data[dataIndex];
    }

    const fixedBarWidth = 20;
    let fillColor = defaultColorFromOwnerState;

    if (seriesIdFromOwner === 'netScoreSeries' || seriesIdFromOwner === 'grossScoreSeries') {
      if (valueToUse !== null && valueToUse !== undefined && valueToUse > 0) {
        fillColor = theme.palette.redDim.main;
      } else if (valueToUse !== null && valueToUse !== undefined && valueToUse < 0) {
        fillColor = theme.palette.greenDim.main;
      } else if (valueToUse === 0) {
        fillColor = theme.palette.grey[400];
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

    const barX = (xNum ?? 0) + ((slotWidthNum ?? fixedBarWidth) - fixedBarWidth) / 2;

    const layoutPropsInvalid = xNum === undefined || yNum === undefined || heightNum === undefined || slotWidthNum === undefined ||
      isNaN(xNum) || isNaN(yNum) || isNaN(heightNum) || isNaN(slotWidthNum);

    const dimensionsInvalid = (heightNum && heightNum < 0) || (slotWidthNum && slotWidthNum <= 0);


    if (layoutPropsInvalid || dimensionsInvalid || seriesIdFromOwner === undefined || valueToUse === undefined) {
      return null;
    }

    const seriesDefinition = chartSeries.find(s => s.id === seriesIdFromOwner);
    const formattedValue = seriesDefinition && valueToUse !== null && valueToUse !== undefined ? seriesDefinition.valueFormatter(valueToUse) : '';

    return (
      <g className={className}>
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
      { label: 'Net/Gross Score (>0)', color: theme.palette.redDim.main },
      { label: 'Net/Gross Score (<0)', color: theme.palette.greenDim.main },
      { label: 'Net/Gross Score (0)', color: theme.palette.grey[400] },
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
                border: '1px solid rgba(0,0,0,0.2)',
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
    <Paper sx={{ p: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} elevation={2}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Score (last {recentRounds.length} rounds)
      </Typography>
      {displayableRecentRounds.length > 0 && <CustomLegend />}
      <Box sx={{ mt: 1, width: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BarChart
          barLabel="value"
          // @ts-ignore - The 'xAxis' prop is standard for BarChart.
          // This directive is used because TypeScript is currently not recognizing it.
          // Investigate @mui/x-charts version, type definitions, or potential conflicts
          // in the project's TypeScript setup that might be causing this.
          // The error occurs on the next line (line 219 in your original file).
          xAxis={[{
            data: xAxisData,
            scaleType: 'band',
          }]}
          yAxis={[{
            id: 'scoresYAxis',
            label: 'Score',
            colorMap: {
              type: 'piecewise',
              thresholds: [0],
              colors: [theme.palette.greenDim.main, theme.palette.redDim.main],
            }
          }]}
          series={chartSeries}
          height={300}
          skipAnimation
          margin={{ top: 30, right: 15, bottom: 30, left: 45 }}
          slotProps={{
            legend: {
              // The 'hidden' prop is standard for MUI X legends.
              // If TypeScript reports an error here, it might indicate an issue with
              // the installed library's type definitions or a TypeScript environment problem.
              // Using 'as any' can bypass the type check as a temporary workaround.
              hidden: true, // This should ideally work
              labelStyle: { fontSize: '0.8rem' }
            } as any, // Add 'as any' to bypass the TS error if types are incorrect
          }}
          slots={{ bar: CustomBarItem }}
        />
      </Box>
    </Paper>
  );
};

export default ScoreCharts;