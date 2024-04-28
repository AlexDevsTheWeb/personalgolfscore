import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IShots } from '../types/roundData.types';

const useNewRoundTotals = () => {
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const shots2 = shots.reduce((acc: IShots, total: IShots) => {
    acc.holeNumber += Number(total.holeNumber) || 0;
    acc.distance += Number(total.distance) || 0;
    acc.hcp += total.hcp || 0;
    acc.par += total.par || 0;
    acc.strokes += total.strokes || 0;
    acc.points += total.points || 0;
    acc.teeClub += total.teeClub || '';
    acc.fir += total.fir || 0;
    acc.gir = false;
    acc.putts += total.putts || 0;
    acc.sand += total.sand || 0;
    acc.water += total.water || 0;
    acc.out += total.out || 0;

    return acc;
  }, {
    holeNumber: 0,
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    gir: false,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0
  });

  return shots2
}

export default useNewRoundTotals
