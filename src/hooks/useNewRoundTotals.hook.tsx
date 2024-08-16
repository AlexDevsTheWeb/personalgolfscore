import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      acc.firstPutt += total.firstPutt || 0;
      acc.secondPutt += total.secondPutt || 0;
      acc.thirdPutt += total.thirdPutt || 0;
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
      firstPutt: 0,
      secondPutt: 0,
      thirdPutt: 0,
      fir: 0,
      gir: false,
      girBogey: false,
      hcp: 0,
      out: 0,
      points: 0,
      pointsAvg: 0,
      putts: 0,
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

export default useNewRoundTotals
