import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewTotal } from '../features/newRound/newRoundTotals.slice';
import { RootState } from '../store/store';

export const useTotals = () => {
  const dispatch = useDispatch<any>();
  const { shots, roundID } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  useEffect(() => {
    const totals = shots.reduce((acc, shot) => {
      acc.totDistance += shot.distance;
      acc.totDriverDistance += shot.driveDistance;

      switch (shot.fairway.toString()) {
        case '4':
          acc.totFairwaysLeft++;
          break;
        case '5':
          acc.totFairwaysCenter++;
          break;
        case '6':
          acc.totFairwaysRight++;
          break;
      }
      acc.totFir += shot.fir;
      acc.totGir += shot.gir ? 1 : 0;
      acc.totGirBogey += shot.girBogey ? 1 : 0;
      acc.totGreenSideL += shot.greenSideL;
      acc.totGreenSideO += shot.greenSideO;
      acc.totGreenSideR += shot.greenSideR;
      acc.totGreenSideS += shot.greenSideS;
      acc.totOut += shot.out;
      acc.totWater += shot.water;
      acc.totSand += shot.sand;
      acc.totPoints += shot.points;
      acc.totPutts += shot.putts;
      acc.totStrokes += shot.strokes;
      switch (shot.upDown) {
        case 'x':
          acc.totUpDown.X++;
          break;
        case 'n':
          acc.totUpDown.N++;
          break;
        case '':
          acc.totUpDown.V++;
          break;
      }
      return acc;
    }, {
      roundID: Number(roundID),
      totDistance: 0,
      totDriverDistance: 0,
      totFairwaysLeft: 0,
      totFairwaysCenter: 0,
      totFairwaysRight: 0,
      totFir: 0,
      totGir: 0,
      totGirBogey: 0,
      totGreenSideL: 0,
      totGreenSideO: 0,
      totGreenSideR: 0,
      totGreenSideS: 0,
      totOut: 0,
      totWater: 0,
      totSand: 0,
      totPoints: 0,
      totPutts: 0,
      totStrokes: 0,
      totUpDown: { X: 0, N: 0, V: 0 },
    });
    dispatch(setNewTotal({ totals }));
    // eslint-disable-next-line
  }, [shots, dispatch]);
}

export const useGenerateStatistics = () => {
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const [stat, setStat] = useState<any>();
  useEffect(() => {
    const statistics = totals.reduce((acc, stat) => {
      acc.totDistance += stat.totDistance;
      acc.totDriverDistance += stat.totDriverDistance;
      acc.totFairwaysLeft += stat.totFairwaysLeft;
      acc.totFairwaysCenter += stat.totFairwaysCenter;
      acc.totFairwaysRight += stat.totFairwaysRight;
      acc.totFir += stat.totFir;
      acc.totGir += stat.totGir;
      acc.totGirBogey += stat.totGirBogey;
      acc.totOut += stat.totOut;
      acc.totWater += stat.totWater;
      acc.totSand += stat.totSand;
      acc.totPoints += stat.totPoints;
      acc.totPutts += stat.totPutts;
      acc.totStrokes += stat.totStrokes;

      switch (stat.totUpDown.toString()) {
        case 'x':
          acc.totUpDown.X++;
          break;
        case 'n':
          acc.totUpDown.N++;
          break;
        case '':
          acc.totUpDown.V++;
          break;
      }

      return acc
    }, {
      roundID: 0,
      totDistance: 0,
      totDriverDistance: 0,
      totFairwaysLeft: 0,
      totFairwaysCenter: 0,
      totFairwaysRight: 0,
      totFir: 0,
      totGir: 0,
      totGirBogey: 0,
      totGreenSide: { L: 0, O: 0, R: 0, C: 0 },
      totOut: 0,
      totWater: 0,
      totSand: 0,
      totPoints: 0,
      totPutts: 0,
      totStrokes: 0,
      totUpDown: { X: 0, N: 0, V: 0 },
    });


    setStat(statistics);
  }, [totals])

  return stat;
}
