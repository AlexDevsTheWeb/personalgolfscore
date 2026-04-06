import { IShots } from "@/types/roundData.types";
import { IRoundTotals } from "@/types/roundTotals.types";
import _ from "lodash";
import { initialStateRoundTotals } from "../constant.utils";
import { calculateChippingPitchingStatistics, calculateFWIrons, calculateInside100mtStatistics, calculatePuttsStatistics, calculateTeeShotsStatistics } from "../totals/totals.utils";
import { safeDivide, safePercentage } from "./math.utils";

export const totalsCalculator = (shots: IShots[]) => {
  let totals: IRoundTotals = _.cloneDeep(initialStateRoundTotals);
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
    acc.scoreEagleBetter += ((curr.strokes - curr.par) <= -2 ? 1 : 0);
    acc.scoreBirdie += ((curr.strokes - curr.par) === -1 ? 1 : 0);
    acc.scorePar += ((curr.strokes - curr.par) === 0 ? 1 : 0);
    acc.scoreBogey += ((curr.strokes - curr.par) === 1 ? 1 : 0);
    acc.scoreDoubleBogeyWorst += ((curr.strokes - curr.par) >= 2 ? 1 : 0);
    acc.scorePar3 += (curr.par === 3 ? curr.strokes : 0);
    acc.scorePar4 += (curr.par === 4 ? curr.strokes : 0);
    acc.scorePar5 += (curr.par === 5 ? curr.strokes : 0);

    acc.teeDriver += (curr.teeClub === 'DRIVER' ? 1 : 0);
    acc.teeFW += (curr.teeClub && curr.teeClub.includes('w') ? 1 : 0);
    acc.teeHY += (curr.teeClub && curr.teeClub.includes('y') ? 1 : 0);
    acc.teeIron += (curr.teeClub && curr.teeClub.includes('i') ? 1 : 0);
    acc.noGreen += (curr.toGreen === 'NO' ? 1 : 0);

    acc.fairwayCenter += (curr.fairway === 5 ? 1 : 0);
    acc.fairwayLeft += (curr.fairway === 4 ? 1 : 0);
    acc.fairwayRight += (curr.fairway === 6 ? 1 : 0);
    acc.gir += (!!curr.gir ? 1 : 0);
    acc.girBogey += (!!curr.girBogey ? 1 : 0);

    acc.upDownMade += (curr.upDown?.made ? 1 : 0);
    acc.upDownAttempts += (curr.upDown?.attempts ? 1 : 0);
    acc.putts += curr.putts;
    acc.scrambleMade += (curr.scramble?.made ? 1 : 0);
    acc.scrambleAttempts += (curr.scramble?.attempts ? 1 : 0);
    acc.puttsGIR += (!!curr.gir ? 1 : 0);
    acc.puttsThree += (curr.putts === 3 ? 1 : 0);
    acc.putts1 += (curr.puttsLength?.length === 1 ? 1 : 0);
    acc.putts2 += (curr.puttsLength?.length === 2 ? 1 : 0);
    acc.putts3More += ((curr.puttsLength?.length || 0) > 2 ? 1 : 0);
    acc.puttsDistGir += (!!curr.gir ? Number(curr.puttsLength?.[0] || 0) : 0);
    acc.sand += (curr.chipClub === 'Bunker' ? 1 : 0);
    acc.sandSaved += ((curr.chipClub === 'Bunker' && curr.upDown?.made === 1 && curr.strokes === curr.par) ? 1 : 0);
    acc.water += curr.water;
    acc.out += curr.out;

    return acc
  }, { par: 0, score: 0, points: 0, scoreEagleBetter: 0, scoreBirdie: 0, scorePar: 0, scoreBogey: 0, scoreDoubleBogeyWorst: 0, scorePar3: 0, scorePar4: 0, scorePar5: 0, teeDriver: 0, teeFW: 0, teeHY: 0, teeIron: 0, noGreen: 0, fairwayCenter: 0, fairwayLeft: 0, fairwayRight: 0, gir: 0, girBogey: 0, upDownMade: 0, upDownAttempts: 0, putts: 0, scrambleMade: 0, scrambleAttempts: 0, puttsGIR: 0, puttsThree: 0, putts1: 0, putts2: 0, putts3More: 0, puttsDistGir: 0, sand: 0, sandSaved: 0, water: 0, out: 0 });

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

  const puttsStatistics = calculatePuttsStatistics(shots);
  const teeShotsStatistics = calculateTeeShotsStatistics(shots);
  const chipPitchStatistics = calculateChippingPitchingStatistics(shots);
  const inside100MtStatistics = calculateInside100mtStatistics(shots);
  const fairwayWoodAndIrons = calculateFWIrons(shots);

  totals = {
    ...totals,

    mainData: {
      roundCourse: '',
      roundDate: '',
      roundNumber: 0,
      roundTee: '',
      coursePar: totalALL.par,
      playerHCP: 0
    },
    score: {
      totals: totalALL.score,
      avg: safeDivide(totalALL.score, holes),
      vsPar: totalALL.score - totalALL.par,
      scoreIN: totalIN.scoreIN,
      scoreOUT: totalOUT.scoreOUT,
      vsParIN: totalIN.scoreIN - totalIN.parIN,
      vsParOUT: totalOUT.scoreOUT - totalOUT.parOUT,
      avgIN: totalIN.scoreIN && holesIN
        ? safeDivide(totalIN.scoreIN, holesIN) : 0,
      avgOUT: totalOUT.scoreOUT && holesOUT
        ? safeDivide(totalOUT.scoreOUT, holesOUT) : 0,
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
      avg: safeDivide(totalALL.points, holes),
      pointsIN: totalIN.pointsIN,
      pointsOUT: totalOUT.pointsOUT,
      avgIN: safeDivide(totalIN.pointsIN, holesIN),
      avgOUT: safeDivide(totalOUT.pointsOUT, holesOUT),
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
    fwAndIrons: fairwayWoodAndIrons,
    gir: {
      totals: totalALL.gir,
      avg: safeDivide(totalALL.gir, holes),
      totalsIN: totalIN.girIN,
      avgIN: safeDivide(totalIN.girIN, holesIN),
      totalsOUT: totalOUT.girOUT,
      avgOUT: safeDivide(totalOUT.girOUT, holesOUT),
    },
    girBogey: {
      totals: totalALL.girBogey,
      avg: safeDivide(totalALL.girBogey, holes),
      totalsIN: totalIN.girBogeyIN,
      avgIN: safeDivide(totalIN.girBogeyIN, holesIN),
      totalsOUT: totalOUT.girBogeyOUT,
      avgOUT: safeDivide(totalOUT.girBogeyOUT, holesOUT),
    },
    scramble: {
      totals: totalALL.scrambleAttempts,
      saved: totalALL.scrambleMade,
      perc: safePercentage(totalALL.scrambleMade, totalALL.scrambleAttempts),
    },
    upDown: {
      totals: totalALL.upDownAttempts,
      saved: totalALL.upDownMade,
      perc: safePercentage(totalALL.upDownMade, totalALL.upDownAttempts),
    },
    putts: {
      totals: totalALL.putts,
      avg: safeDivide(totalALL.putts, holes),
      totalsIN: totalIN.puttsIN,
      avgIN: safeDivide(totalIN.puttsIN, holesIN),
      totalsOUT: totalOUT.puttsOUT,
      avgOUT: safeDivide(totalOUT.puttsOUT, holesOUT),
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
      avg: safeDivide(totalALL.sand, holes),
      saved: totalALL.sandSaved,
      avgSaved: safeDivide(totalALL.sandSaved, holes), // Avg saved per hole
      savedPerc: safePercentage(totalALL.sandSaved, totalALL.sand),
    },
    water: {
      totals: totalALL.water,
      avg: safeDivide(totalALL.water, holes),
      totalsIN: totalIN.waterIN,
      avgIN: safeDivide(totalIN.waterIN, holesIN),
      totalsOUT: totalOUT.waterOUT,
      avgOUT: safeDivide(totalOUT.waterOUT, holesOUT),
    },
    out: {
      totals: totalALL.out,
      avg: safeDivide(totalALL.out, holes),
      totalsIN: totalIN.outIN,
      avgIN: safeDivide(totalIN.outIN, holesIN),
      totalsOUT: totalOUT.outOUT,
      avgOUT: safeDivide(totalOUT.outOUT, holesOUT),
    }
  }
  return totals;
}