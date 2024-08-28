import { IShots } from '../../types/roundData.types'
import { IRoundTotals } from '../../types/roundTotals.types'

interface IStatisticNumbersProps {
  roundDate?: string;
  roundCourse?: string;
  totals: IRoundTotals;
  shots: IShots[];
  coursePar: number;
}

const StatisticsNumbers = ({ roundDate, roundCourse, totals, shots, coursePar }: IStatisticNumbersProps) => {

  return (
    <></>
    // <Box sx={{ padding: 1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
    //   {
    //     (roundDate && roundCourse) &&
    //     <BoxBetween>
    //       <RowCard
    //         label={"Round course"}
    //         value={roundCourse}
    //         name="round course"
    //       />
    //       <RowCard
    //         label={"Round date"}
    //         value={dayjs(roundDate).format("dddd, MMMM D, YYYY")}
    //         name="round date"
    //       />
    //     </BoxBetween>
    //   }

    //   <BoxGeneralShadow>
    //     <StrokesGauge values={{ name: 'strokes', value: totals.score, holes: shots.length, coursePar: coursePar }} />
    //     <PointsGauge values={{ name: 'points', value: totals.points, holes: shots.length, percentage: false }} />
    //     <PointsGauge values={{ name: 'strokes', value: totals.score, holes: shots.length, percentage: false }} />
    //   </BoxGeneralShadow>
    //   <BoxGeneralShadow>

    //     <PointsGauge values={{ name: 'gir', value: totals.gir, holes: shots.length, percentage: true }} />
    //     <PointsGauge values={{ name: 'putts', value: totals.girBogey, holes: shots.length, percentage: false }} />
    //   </BoxGeneralShadow>

    //   <BoxGeneralShadow>
    //     <PieChartFairways values={{ name: 'fairways', value: totals.fairway, holes: shots.filter((s) => s.par !== 3).length }} />
    //     <PieChartsPenalties values={{ name: 'penalties', value: totals }} />
    //   </BoxGeneralShadow>
    //   <BoxGeneralShadow>
    //     <UDGauge values={{ name: 'up&down', value: totals.upDown, holes: shots.length, percentage: true }} />
    //   </BoxGeneralShadow>
    // </Box >

  )
}

export default StatisticsNumbers
