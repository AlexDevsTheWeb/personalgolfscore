import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IShots } from '../types/roundData.types';

const useNewRoundTotals = () => {
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const shots2 = shots.reduce((acc: IShots, total: IShots) => {
    acc.holeNumber += Number(total.holeNumber) || 0;
    acc.distance += Number(total.distance) || 0;
    acc.driveDistance += Number(total.driveDistance) || 0;
    acc.firstPutt += total.firstPutt || 0;
    acc.fir += total.fir || 0;
    acc.gir = false;
    acc.girBogey = false;
    acc.hcp += total.hcp || 0;
    acc.out += total.out || 0;
    acc.par += total.par || 0;
    acc.points += total.points || 0;
    acc.putts += total.putts || 0;
    acc.sand += total.sand || 0;
    acc.secondPutt += total.secondPutt || 0;
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
    chipClub: '',
    distance: 0,
    driveDistance: 0,
    fairway: '',
    fir: 0,
    firstPutt: 0,
    gir: false,
    girBogey: false,
    greenSide: '',
    hcp: 0,
    out: 0,
    par: 0,
    points: 0,
    putts: 0,
    sand: 0,
    secondPutt: 0,
    strokes: 0,
    teeClub: '',
    toGreen: '',
    toGreenMeters: 0,
    upDown: '',
    water: 0
  });

  return shots2
}

export default useNewRoundTotals
