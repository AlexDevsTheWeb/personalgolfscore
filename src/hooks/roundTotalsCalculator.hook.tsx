import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IShots } from "../types/roundData.types";
import { IRoundTotals } from "../types/roundTotals.types";
import { initialStateRoundTotals } from "../utils/constant.utils";
import { useGetVsParTotals } from "./singleHoleCalculator.hook";

export const useRoundTotals = (shots: IShots[]) => {

  const { round: { roundDate, roundCourse, roundTee, roundPlayingHCP, roundNumber } } = useSelector((store: RootState) => store.newRound.newRoundMain);

  let totals: IRoundTotals = initialStateRoundTotals;

  const holes = shots.length;
  const shotsIN = _.slice(shots, 0, 9);
  const shotsOUT = _.slice(shots, 9, 18);
  const holesIN = shotsIN.length;
  const holesOUT = shotsOUT.length;
  // const hcp = shots.reduce((acc, curr) => acc + curr.hcp, 0);
  const par = shots.reduce((acc, curr) => acc + curr.par, 0);
  const parIN = shotsIN.reduce((acc, curr) => acc + curr.par, 0);
  const parOUT = shotsOUT.reduce((acc, curr) => acc + curr.par, 0);
  const score = shots.reduce((acc, curr) => acc + curr.strokes, 0);
  const scoreIN = shotsIN.reduce((acc, curr) => acc + curr.strokes, 0);
  const scoreOUT = shotsOUT.reduce((acc, curr) => acc + curr.strokes, 0);

  const points = shots.reduce((acc, curr) => acc + curr.points, 0);
  const pointsIN = shotsIN.reduce((acc, curr) => acc + curr.points, 0);
  const pointsOUT = shotsOUT.reduce((acc, curr) => acc + curr.points, 0);

  const fairwayTotal = shots.filter((hole) => hole.par !== 3).length;
  const fairwayCenter = shots.reduce((acc, curr) => acc + (curr.fairway === 5 ? 1 : 0), 0);
  const fairwayLeft = shots.reduce((acc, curr) => acc + (curr.fairway === 4 ? 1 : 0), 0);
  const fairwayRight = shots.reduce((acc, curr) => acc + (curr.fairway === 6 ? 1 : 0), 0);

  const gir = shots.reduce((acc, curr) => acc + (!!curr.gir ? 1 : 0), 0);
  const girIN = shotsIN.reduce((acc, curr) => acc + (!!curr.gir ? 1 : 0), 0);
  const girOUT = shotsOUT.reduce((acc, curr) => acc + (!!curr.gir ? 1 : 0), 0);
  const girBogey = shots.reduce((acc, curr) => acc + (!!curr.girBogey ? 1 : 0), 0);
  const girBogeyIN = shotsIN.reduce((acc, curr) => acc + (!!curr.gir ? 1 : 0), 0);
  const girBogeyOUT = shotsOUT.reduce((acc, curr) => acc + (!!curr.gir ? 1 : 0), 0);

  const upDown = shots.reduce((acc, curr) => acc + (!!curr.upDownX ? 1 : 0), 0);
  const upDownTotals = shots.reduce((acc, curr) => acc + (!!curr.upDownX && curr.strokes === curr.par && curr.putts === 1 ? 1 : 0) + (!!curr.upDownN && curr.strokes === curr.par && curr.putts === 1 ? 1 : 0), 0);

  // const scramble = shots.reduce((acc, curr) => acc + (curr.strokes === curr.par && curr.gir !== true ? 1 : 0), 0);
  const scramble = shots.reduce((acc, curr) => acc + curr.scramble, 0);
  const scrambleTotals = holes - gir;

  const putts = shots.reduce((acc, curr) => acc + curr.putts, 0);
  const puttsIN = shotsIN.reduce((acc, curr) => acc + curr.putts, 0);
  const puttsOUT = shotsOUT.reduce((acc, curr) => acc + curr.putts, 0);

  const sand = shots.reduce((acc, curr) => acc + curr.sand + (curr.chipClub === 'b' ? 1 : 0), 0);
  const sandSaved = shots.reduce((acc, curr) => acc +
    ((curr.chipClub === 'b' && curr.upDown === 'x' && curr.strokes === curr.par) ? 1 : 0), 0);

  const water = shots.reduce((acc, curr) => acc + curr.water, 0);
  const waterIN = shotsIN.reduce((acc, curr) => acc + curr.water, 0);
  const waterOUT = shotsOUT.reduce((acc, curr) => acc + curr.water, 0);
  const out = shots.reduce((acc, curr) => acc + curr.out, 0);
  const outIN = shotsIN.reduce((acc, curr) => acc + curr.out, 0);
  const outOUT = shotsOUT.reduce((acc, curr) => acc + curr.out, 0);

  totals = {
    ...totals,
    playerID: "playerID",
    mainData: {
      roundCourse: roundCourse,
      roundDate: roundDate,
      roundNumber: roundNumber,
      roundTee: roundTee,
      coursePar: par,
      playerHCP: roundPlayingHCP
    },
    score: {
      totals: score,
      avg: (score / holes).toFixed(2),
      vsPar: useGetVsParTotals(score, par, true).value,
      scoreIN: scoreIN,
      scoreOUT: scoreOUT,
      vsParIN: useGetVsParTotals(scoreIN, parIN, true).value,
      vsParOUT: useGetVsParTotals(scoreOUT, parOUT, true).value,
      avgIN: scoreIN && holesIN
        ? (scoreIN / holesIN).toFixed(2)
        : '-',
      avgOUT: scoreOUT && holesOUT
        ? (scoreOUT / holesOUT).toFixed(2)
        : '-',
    },
    points: {
      totals: points,
      avg: points && holes ? (points / holes).toFixed(2) : '-',
      pointsIN: pointsIN,
      pointsOUT: pointsOUT,
      avgIN: pointsIN && holesIN ? (pointsIN / holesIN).toFixed(2) : '-',
      avgOUT: pointsOUT && holesOUT ? (pointsOUT / holesOUT).toFixed(2) : '-',
    },
    fairway: {
      total: fairwayTotal,
      fairwayCenter: fairwayCenter,
      fairwayLeft: fairwayLeft,
      fairwayRight: fairwayRight,
    },
    gir: {
      totals: gir,
      avg: gir && holes ? (gir / holes).toFixed(2) : '-',
      totalsIN: girIN,
      avgIN: girIN && holesIN ? (girIN / holesIN).toFixed(2) : '-',
      totalsOUT: girOUT,
      avgOUT: girOUT && holesOUT ? (girOUT / holesOUT).toFixed(2) : '-',
    },
    girBogey: {
      totals: girBogey,
      avg: girBogey && holes ? (girBogey / holes).toFixed(2) : '-',
      totalsIN: girBogeyIN,
      avgIN: girBogeyIN && holesIN ? (girBogeyIN / holesIN).toFixed(2) : '-',
      totalsOUT: girBogeyOUT,
      avgOUT: girBogeyOUT && holesOUT ? (girBogeyOUT / holesOUT).toFixed(2) : '-',
    },
    scramble: {
      totals: scrambleTotals,
      saved: scramble,
      perc: scramble && scrambleTotals ? (scramble / scrambleTotals) * 100 : 0,
    },
    upDown: {
      totals: upDownTotals,
      saved: upDown,
      perc: upDown && upDownTotals ? (upDown / upDownTotals) * 100 : 0,
    },
    putts: {
      totals: putts,
      avg: putts && holes ? (putts / holes).toFixed(2) : '-',
      totalsIN: puttsIN,
      avgIN: puttsIN && holesIN ? (puttsIN / holesIN).toFixed(2) : '-',
      totalsOUT: puttsOUT,
      avgOUT: puttsOUT && holesOUT ? (puttsOUT / holesOUT).toFixed(2) : '-',
    },
    sand: {
      totals: sand,
      avg: sand && holes ? (sand / holes).toFixed(2) : '-',
      saved: sandSaved,
      avgSaved: sandSaved && holes ? (sandSaved / holes).toFixed(2) : '-',
      savedPerc: sandSaved && sand ? (sandSaved / sand) * 100 : 0,
    },
    water: {
      totals: water,
      avg: water && holes ? (water / holes).toFixed(2) : '-',
      totalsIN: waterIN,
      avgIN: waterIN && holesIN ? (waterIN / holesIN).toFixed(2) : '-',
      totalsOUT: waterOUT,
      avgOUT: waterOUT && holesOUT ? (waterOUT / holesOUT).toFixed(2) : '-',
    },
    out: {
      totals: out,
      avg: out && holes ? (out / holes).toFixed(2) : '-',
      totalsIN: outIN,
      avgIN: outIN && holesIN ? (outIN / holesIN).toFixed(2) : '-',
      totalsOUT: outOUT,
      avgOUT: outOUT && holesOUT ? (outOUT / holesOUT).toFixed(2) : '-',
    }
  }


  return totals;
}