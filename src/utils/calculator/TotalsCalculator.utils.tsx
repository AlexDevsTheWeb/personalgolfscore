import _ from "lodash";
import { IShots } from "../../types/roundData.types";
import { IRoundTotals } from "../../types/roundTotals.types";
import { initialStateRoundTotals } from "../constant.utils";
import { calculateChippingPitchingStatistics, calculateInside100mtStatistics, calculatePuttsStatistics, calculateTeeShotsStatistics } from "../totals/totals.utils";

export const totalsCalculator = (shots: IShots[]) => {
  let totals: IRoundTotals = initialStateRoundTotals;
  const holes = shots.length;
  const shotsIN = _.slice(shots, 0, 9);
  const shotsOUT = _.slice(shots, 9, 18);
  const holesIN = shotsIN.length;
  const holesOUT = shotsOUT.length;

  const par3 = shots.filter((s) => s.par === 3).length;
  const par4 = shots.filter((s) => s.par === 4).length;
  const par5 = shots.filter((s) => s.par === 5).length;
  const fairwayTotal = shots.filter((hole) => hole.par !== 3).length;

  //SHOTS
  const totalALL = shots.reduce((acc, curr) => {
    acc.par += curr.par;
    acc.score += curr.strokes;
    acc.points += curr.points;
    acc.scoreEagleBetter += ((acc.score - acc.par) <= -2 ? 1 : 0);
    acc.scoreBirdie += ((acc.score - acc.par) === -1 ? 1 : 0);
    acc.scorePar += ((acc.score - acc.par) === 0 ? 1 : 0);
    acc.scoreBogey += ((acc.score - acc.par) === 1 ? 1 : 0);
    acc.scoreDoubleBogeyWorst += ((acc.score - acc.par) >= 2 ? 1 : 0);
    acc.scorePar3 += (curr.par === 3 ? curr.strokes : 0);
    acc.scorePar4 += (curr.par === 4 ? curr.strokes : 0);
    acc.scorePar5 += (curr.par === 5 ? curr.strokes : 0);

    acc.teeDriver += (curr.teeClub === 'DRIVER' ? 1 : 0);
    acc.teeFW += (curr.teeClub.includes('w') ? 1 : 0);
    acc.teeHY += (curr.teeClub.includes('y') ? 1 : 0);
    acc.teeIron += (curr.teeClub.includes('i') ? 1 : 0);
    acc.noGreen += (curr.toGreen === 'NO' ? 1 : 0);

    acc.fairwayCenter += (curr.fairway === 5 ? 1 : 0);
    acc.fairwayLeft += (curr.fairway === 4 ? 1 : 0);
    acc.fairwayRight += (curr.fairway === 6 ? 1 : 0);
    acc.gir += (!!curr.gir ? 1 : 0);
    acc.girBogey += (!!curr.girBogey ? 1 : 0);
    acc.upDown += (!!curr.upDownX ? 1 : 0);
    acc.putts += curr.putts;
    acc.upDownTotals += ((!!curr.gir && (curr.upDownX === 1 || curr.upDownN === 1)) ? 1 : 0);
    acc.scramble += curr.scramble;
    acc.puttsGIR += (!!curr.gir ? 1 : 0);
    acc.puttsThree += (curr.putts === 3 ? 1 : 0);
    acc.putts1 += (curr.puttsLength.length === 1 ? 1 : 0);
    acc.putts2 += (curr.puttsLength.length === 2 ? 1 : 0);
    acc.putts3More += (curr.puttsLength.length > 2 ? 1 : 0);
    acc.puttsDistGir += (!!curr.gir ? Number(curr.puttsLength[0]) : 0);
    acc.sand += curr.sand + (curr.chipClub === 'b' ? 1 : 0);
    acc.sandSaved += ((curr.chipClub === 'b' && curr.upDown === 'x' && curr.strokes === curr.par) ? 1 : 0);
    acc.water += curr.water;
    acc.out += curr.out;

    return acc
  }, { par: 0, score: 0, points: 0, scoreEagleBetter: 0, scoreBirdie: 0, scorePar: 0, scoreBogey: 0, scoreDoubleBogeyWorst: 0, scorePar3: 0, scorePar4: 0, scorePar5: 0, teeDriver: 0, teeFW: 0, teeHY: 0, teeIron: 0, noGreen: 0, fairwayCenter: 0, fairwayLeft: 0, fairwayRight: 0, gir: 0, girBogey: 0, upDown: 0, putts: 0, upDownTotals: 0, scramble: 0, puttsGIR: 0, puttsThree: 0, putts1: 0, putts2: 0, putts3More: 0, puttsDistGir: 0, sand: 0, sandSaved: 0, water: 0, out: 0 });

  // SHOTS IN
  const totalIN = shotsIN.reduce((acc, curr) => {

    acc.parIN += curr.par;
    acc.scoreIN += curr.strokes;
    acc.pointsIN += curr.points;
    acc.girIN += (!!curr.gir ? 1 : 0);
    acc.girBogeyIN += (!!curr.gir ? 1 : 0);
    acc.puttsIN += curr.putts;
    acc.puttsGIRIN += (!!curr.gir ? 1 : 0);
    acc.waterIN += curr.water;
    acc.outIN += curr.out;

    return acc
  }, { parIN: 0, scoreIN: 0, pointsIN: 0, girIN: 0, girBogeyIN: 0, puttsIN: 0, puttsGIRIN: 0, waterIN: 0, outIN: 0, }
  );

  // SHOTS OUT
  const totalOUT = shotsOUT.reduce((acc, curr) => {

    acc.parOUT += curr.par;
    acc.scoreOUT += curr.strokes;
    acc.pointsOUT += curr.points;
    acc.girOUT += (!!curr.gir ? 1 : 0);
    acc.girBogeyOUT += (!!curr.gir ? 1 : 0);
    acc.puttsOUT += curr.putts;
    acc.puttsGIROUT += (!!curr.gir ? 1 : 0);
    acc.waterOUT += curr.water;
    acc.outOUT += curr.out;

    return acc
  }, { parOUT: 0, scoreOUT: 0, pointsOUT: 0, girOUT: 0, girBogeyOUT: 0, puttsOUT: 0, puttsGIROUT: 0, waterOUT: 0, outOUT: 0, }
  );

  const scrambleTotals = holes - totalALL.gir

  const puttsStatistics = calculatePuttsStatistics(shots);
  const teeShotsStatistics = calculateTeeShotsStatistics(shots);
  const chipPitchStatistics = calculateChippingPitchingStatistics(shots);
  const inside100MtStatistics = calculateInside100mtStatistics(shots);

  totals = {
    ...totals,
    playerID: "playerID",

    score: {
      totals: totalALL.score,
      avg: (totalALL.score / holes).toFixed(2), // TODO: convert in number and add parseFloat()
      vsPar: getVsParTotals(totalALL.score, totalALL.par, true).value,
      scoreIN: totalIN.scoreIN,
      scoreOUT: totalOUT.scoreOUT,
      vsParIN: getVsParTotals(totalIN.scoreIN, totalIN.parIN, true).value,
      vsParOUT: getVsParTotals(totalOUT.scoreOUT, totalOUT.parOUT, true).value,
      avgIN: totalIN.scoreIN && holesIN
        ? (totalIN.scoreIN / holesIN).toFixed(2) // TODO: convert in number and add parseFloat()
        : '-',
      avgOUT: totalOUT.scoreOUT && holesOUT
        ? (totalOUT.scoreOUT / holesOUT).toFixed(2) // TODO: convert in number and add parseFloat()
        : '-',
      par3: par3,
      par4: par4,
      par5: par5,
      scoreEagleBetter: totalALL.scoreEagleBetter,
      scoreBirdie: totalALL.scoreBirdie,
      scorePar: totalALL.scorePar,
      scoreBogey: totalALL.scoreBogey,
      scoreDoubleBogeyWorst: totalALL.scoreDoubleBogeyWorst,
      scorePar3: totalALL.scorePar3,
      scorePar4: totalALL.scorePar4,
      scorePar5: totalALL.scorePar5,
    },
    points: {
      totals: totalALL.points,
      avg: totalALL.points && holes ? (totalALL.points / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      pointsIN: totalIN.pointsIN,
      pointsOUT: totalOUT.pointsOUT,
      avgIN: totalIN.pointsIN && holesIN ? (totalIN.pointsIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      avgOUT: totalOUT.pointsOUT && holesOUT ? (totalOUT.pointsOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
    },
    fairway: {
      total: fairwayTotal,
      fairwayCenter: totalALL.fairwayCenter,
      fairwayLeft: totalALL.fairwayLeft,
      fairwayRight: totalALL.fairwayRight,
    },
    teeShots: teeShotsStatistics,
    chipPitch: chipPitchStatistics,
    inside100Mt: inside100MtStatistics,
    gir: {
      totals: totalALL.gir,
      avg: totalALL.gir && holes ? (totalALL.gir / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsIN: totalIN.girIN,
      avgIN: totalIN.girIN && holesIN ? (totalIN.girIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsOUT: totalOUT.girOUT,
      avgOUT: totalOUT.girOUT && holesOUT ? (totalOUT.girOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
    },
    girBogey: {
      totals: totalALL.girBogey,
      avg: totalALL.girBogey && holes ? (totalALL.girBogey / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsIN: totalIN.girBogeyIN,
      avgIN: totalIN.girBogeyIN && holesIN ? (totalIN.girBogeyIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsOUT: totalOUT.girBogeyOUT,
      avgOUT: totalOUT.girBogeyOUT && holesOUT ? (totalOUT.girBogeyOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
    },
    scramble: {
      totals: scrambleTotals,
      saved: totalALL.scramble,
      perc: totalALL.scramble && scrambleTotals ? (totalALL.scramble / scrambleTotals) * 100 : 0,
    },
    upDown: {
      totals: totalALL.upDownTotals,
      saved: totalALL.upDown,
      perc: totalALL.upDown && totalALL.upDownTotals ? (totalALL.upDown / totalALL.upDownTotals) * 100 : 0,
    },
    putts: {
      totals: totalALL.putts,
      avg: totalALL.putts && holes ? (totalALL.putts / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsIN: totalIN.puttsIN,
      avgIN: totalIN.puttsIN && holesIN ? (totalIN.puttsIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsOUT: totalOUT.puttsOUT,
      avgOUT: totalOUT.puttsOUT && holesOUT ? (totalOUT.puttsOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      puttsGir: totalALL.puttsGIR,
      puttsGirIn: totalIN.puttsGIRIN,
      puttsGirOut: totalOUT.puttsGIROUT,
      puttsThree: totalALL.puttsThree,
      putts1: totalALL.putts1,
      putts2: totalALL.putts2,
      putts3More: totalALL.putts3More,
      puttsDistGir: totalALL.puttsDistGir,
      puttsStatistics: puttsStatistics,
    },
    sand: {
      totals: totalALL.sand,
      avg: totalALL.sand && holes ? (totalALL.sand / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      saved: totalALL.sandSaved,
      avgSaved: totalALL.sandSaved && holes ? (totalALL.sandSaved / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      savedPerc: totalALL.sandSaved && totalALL.sand ? (totalALL.sandSaved / totalALL.sand) * 100 : 0,
    },
    water: {
      totals: totalALL.water,
      avg: totalALL.water && holes ? (totalALL.water / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsIN: totalIN.waterIN,
      avgIN: totalIN.waterIN && holesIN ? (totalIN.waterIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsOUT: totalOUT.waterOUT,
      avgOUT: totalOUT.waterOUT && holesOUT ? (totalOUT.waterOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
    },
    out: {
      totals: totalALL.out,
      avg: totalALL.out && holes ? (totalALL.out / holes).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsIN: totalIN.outIN,
      avgIN: totalIN.outIN && holesIN ? (totalIN.outIN / holesIN).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
      totalsOUT: totalOUT.outOUT,
      avgOUT: totalOUT.outOUT && holesOUT ? (totalOUT.outOUT / holesOUT).toFixed(2) : '-', // TODO: convert in number and add parseFloat()
    }
  }
  return totals;
}

const getVsParTotals = (strokes: number, par: number, total?: boolean) => {
  const diff = strokes - par;
  const result = { value: diff };
  return result;
}