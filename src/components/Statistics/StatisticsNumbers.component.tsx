import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { RowCard } from '../../styles'
import BoxBetween from '../../styles/box/BoxBetween.styles'
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles'
import { IShots } from '../../types/roundData.types'
import { INewTotals } from '../../types/roundTotals.types'
import PieChartFairways from './components/PieChartsFairways.component'
import PieChartsPenalties from './components/PieChartsPenalties.component'
import PointsGauge from './components/PointsGauge.component'
import StrokesGauge from './components/StrokesGauge.component'
import UDGauge from './components/UDGauge.components'

interface IStatisticNumbersProps {
  roundDate?: string;
  roundCourse?: string;
  totals: INewTotals;
  shots: IShots[];
  coursePar: number;
}

const StatisticsNumbers = ({ roundDate, roundCourse, totals, shots, coursePar }: IStatisticNumbersProps) => {
  return (
    <Box sx={{ padding: 1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {
        (roundDate && roundCourse) &&
        <BoxBetween>
          <RowCard
            label={"Round course"}
            value={roundCourse}
            name="round course"
          />
          <RowCard
            label={"Round date"}
            value={dayjs(roundDate).format("dddd, MMMM D, YYYY")}
            name="round date"
          />
        </BoxBetween>
      }

      <BoxGeneralShadow>
        <StrokesGauge values={{ name: 'strokes', value: totals.totStrokes, holes: shots.length, coursePar: coursePar }} />
        <PointsGauge values={{ name: 'points', value: totals.totPoints, holes: shots.length, percentage: false }} />
        <PointsGauge values={{ name: 'strokes', value: totals.totStrokes, holes: shots.length, percentage: false }} />
      </BoxGeneralShadow>
      <BoxGeneralShadow>

        <PointsGauge values={{ name: 'gir', value: totals.totGir, holes: shots.length, percentage: true }} />
        <PointsGauge values={{ name: 'putts', value: totals.totPutts, holes: shots.length, percentage: false }} />
      </BoxGeneralShadow>

      <BoxGeneralShadow>
        <PieChartFairways values={{ name: 'fairways', value: totals, holes: shots.filter((s) => s.par !== 3).length }} />
        <PieChartsPenalties values={{ name: 'penalties', value: totals }} />
      </BoxGeneralShadow>
      <BoxGeneralShadow>
        <UDGauge values={{ name: 'up&down', value: totals.totUpDown, holes: shots.length, percentage: true }} />
      </BoxGeneralShadow>
    </Box >

  )
}

export default StatisticsNumbers
