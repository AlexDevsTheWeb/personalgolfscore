import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewTotal } from '../features/newRound/newRoundTotals.slice';
import { RootState } from '../store/store';
import { IShots } from '../types/roundData.types';

const useNewRoundTotals = () => {
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const [totals, setTotals] = useState<any>();

  useEffect(() => {
    const calculations = shots.reduce((acc: IShots, total: IShots) => {
      acc.holeNumber += Number(total.holeNumber) || 0;
      acc.distance += Number(total.distance) / acc.holeNumber || 0;
      acc.driveDistance += Number(total.driveDistance) / acc.holeNumber || 0;

      acc.fir += total.fir || 0;
      acc.gir = total.gir === true;
      acc.girBogey = total.girBogey === true;
      acc.hcp += total.hcp || 0;
      acc.out += total.out / total.holeNumber || 0;
      acc.points += total.points || 0;
      acc.pointsAvg += total.points / total.holeNumber || 0
      acc.putts += total.putts || 0;
      acc.sand += total.sand || 0;
      acc.strokes += total.strokes || 0;
      acc.teeClub += total.teeClub || '';
      acc.water += total.water || 0;


      // chipClub: "",
      // airway: "",
      // greenSide: "",
      // toGreen: "",

      return acc;
    }, {
      holeNumber: 0,
      distance: 0,
      driveDistance: 0,
      fir: 0,
      gir: false,
      girBogey: false,
      hcp: 0,
      out: 0,
      points: 0,
      pointsAvg: 0,
      putts: 0,
      puttsLength: [],
      sand: 0,
      strokes: 0,
      teeClub: '',
      water: 0,
      chipClub: '',
      fairway: '',
      greenSide: '',
      par: 0,
      toGreen: '',
      toGreenMeters: 0,
      upDown: ''
    });

    setTotals(calculations);
  }, [shots])

  return totals
}

export const useTotals = () => {
  const dispatch = useDispatch<any>();
  const { shots, roundID } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  useEffect(() => {
    const totals = shots.reduce((acc, shot) => {
      acc.totDistance += shot.distance;
      acc.totDriverDistance += shot.driveDistance;

      // Use a switch statement for fairway counts
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

      switch (shot.greenSide.substring(0, 1)) {
        case 'L':
          acc.totGreenSide.L++;
          break;
        case 'O':
          acc.totGreenSide.O++;
          break;
        case 'R':
          acc.totGreenSide.R++;
          break;
        case 'S':
          acc.totGreenSide.C++;
          break;
      }
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
      totGreenSide: { L: 0, O: 0, R: 0, C: 0 },
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

export default useNewRoundTotals
