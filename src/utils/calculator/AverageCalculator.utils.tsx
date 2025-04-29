import { IRoundTotals, ITotalRoundsAvg } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';

const safeDivide = (numerator: number | undefined, denominator: number | undefined, precision: number = 2): number => {
  const num = numerator || 0;
  const den = denominator || 0;
  if (den === 0) return 0;
  const result = num / den;
  return parseFloat(result.toFixed(precision));
};

const safePercentage = (numerator: number | undefined, denominator: number | undefined, precision: number = 2): number => {
  const divisionResult = safeDivide(numerator, denominator, precision + 4);
  const percentageResult = divisionResult;
  return parseFloat(percentageResult.toFixed(precision));
}

export const calculateDisplayableAverages = (
  totalsAvg: ITotalRoundsAvg | null | undefined
): IRoundTotals => {
  if (!totalsAvg || totalsAvg.totalRoundsCount === 0) {
    return JSON.parse(JSON.stringify(initialStateRoundTotals));
  }

  const displayTotals: IRoundTotals = JSON.parse(JSON.stringify(initialStateRoundTotals));
  const roundsCount = totalsAvg.totalRoundsCount;
  const holesCount = totalsAvg.totalHolesPlayed;
  const holesInCount = totalsAvg.totalHolesPlayedIN;
  const holesOutCount = totalsAvg.totalHolesPlayedOUT;

  // --- Calculate Score Averages ---
  displayTotals.score.totals = safeDivide(totalsAvg.score?.sumTotals, roundsCount);
  displayTotals.score.avg = safeDivide(totalsAvg.score?.sumTotals, holesCount);
  displayTotals.score.vsPar = safeDivide(totalsAvg.score?.sumVsPar, roundsCount);
  displayTotals.score.scoreIN = safeDivide(totalsAvg.score?.sumScoreIN, roundsCount);
  displayTotals.score.scoreOUT = safeDivide(totalsAvg.score?.sumScoreOUT, roundsCount);
  displayTotals.score.vsParIN = safeDivide(totalsAvg.score?.sumVsParIN, roundsCount);
  displayTotals.score.vsParOUT = safeDivide(totalsAvg.score?.sumVsParOUT, roundsCount);
  displayTotals.score.avgIN = safeDivide(totalsAvg.score?.sumScoreIN, holesInCount);
  displayTotals.score.avgOUT = safeDivide(totalsAvg.score?.sumScoreOUT, holesOutCount);
  displayTotals.score.par3 = totalsAvg.score?.countPar3 || 0;
  displayTotals.score.par4 = totalsAvg.score?.countPar4 || 0;
  displayTotals.score.par5 = totalsAvg.score?.countPar5 || 0;
  displayTotals.score.scoreEagleBetter = totalsAvg.score?.countScoreEagleBetter || 0;
  displayTotals.score.scoreBirdie = totalsAvg.score?.countScoreBirdie || 0;
  displayTotals.score.scorePar = totalsAvg.score?.countScorePar || 0;
  displayTotals.score.scoreBogey = totalsAvg.score?.countScoreBogey || 0;
  displayTotals.score.scoreDoubleBogeyWorst = totalsAvg.score?.countScoreDoubleBogeyWorst || 0;
  displayTotals.score.scorePar3 = safeDivide(totalsAvg.score?.sumScorePar3, totalsAvg.score?.countPar3);
  displayTotals.score.scorePar4 = safeDivide(totalsAvg.score?.sumScorePar4, totalsAvg.score?.countPar4);
  displayTotals.score.scorePar5 = safeDivide(totalsAvg.score?.sumScorePar5, totalsAvg.score?.countPar5);

  // --- Calculate Points Averages ---
  displayTotals.points.totals = safeDivide(totalsAvg.points?.sumTotals, roundsCount);
  displayTotals.points.avg = safeDivide(totalsAvg.points?.sumTotals, holesCount);
  displayTotals.points.pointsIN = safeDivide(totalsAvg.points?.sumPointsIN, roundsCount);
  displayTotals.points.pointsOUT = safeDivide(totalsAvg.points?.sumPointsOUT, roundsCount);
  displayTotals.points.avgIN = safeDivide(totalsAvg.points?.sumPointsIN, holesInCount);
  displayTotals.points.avgOUT = safeDivide(totalsAvg.points?.sumPointsOUT, holesOutCount);

  // --- Calculate Fairway Percentages ---
  displayTotals.fairway.total = totalsAvg.fairway?.sumAttempts || 0;
  displayTotals.fairway.fairwayCenter = totalsAvg.fairway?.sumFairwayCenter as number;
  displayTotals.fairway.fairwayLeft = safePercentage(totalsAvg.fairway?.sumFairwayLeft, totalsAvg.fairway?.sumAttempts);
  displayTotals.fairway.fairwayRight = safePercentage(totalsAvg.fairway?.sumFairwayRight, totalsAvg.fairway?.sumAttempts);

  // --- Calculate GIR Percentages ---
  displayTotals.gir.totals = safePercentage(totalsAvg.gir?.sumGirMade, holesCount);
  displayTotals.gir.avg = displayTotals.gir.totals;
  displayTotals.gir.totalsIN = safePercentage(totalsAvg.gir?.sumGirMadeIN, holesInCount);
  displayTotals.gir.avgIN = displayTotals.gir.totalsIN;
  displayTotals.gir.totalsOUT = safePercentage(totalsAvg.gir?.sumGirMadeOUT, holesOutCount);
  displayTotals.gir.avgOUT = displayTotals.gir.totalsOUT;

  // --- Calculate GIR Bogey Percentages ---
  displayTotals.girBogey.totals = totalsAvg.girBogey?.sumGirBogeyMade as number;
  displayTotals.girBogey.avg = displayTotals.girBogey.totals;
  displayTotals.girBogey.totalsIN = safePercentage(totalsAvg.girBogey?.sumGirBogeyMadeIN, holesInCount);
  displayTotals.girBogey.avgIN = displayTotals.girBogey.totalsIN;
  displayTotals.girBogey.totalsOUT = safePercentage(totalsAvg.girBogey?.sumGirBogeyMadeOUT, holesOutCount);
  displayTotals.girBogey.avgOUT = displayTotals.girBogey.totalsOUT;

  // --- Calculate Up & Down / Scramble Percentages ---
  displayTotals.upDown.totals = totalsAvg.upDown?.sumAttempts || 0;
  displayTotals.upDown.saved = totalsAvg.upDown?.sumSaved || 0;
  displayTotals.upDown.perc = safePercentage(totalsAvg.upDown?.sumSaved, totalsAvg.upDown?.sumAttempts);
  displayTotals.scramble.totals = totalsAvg.scramble?.sumAttempts || 0;
  displayTotals.scramble.saved = totalsAvg.scramble?.sumSaved || 0;
  displayTotals.scramble.perc = safePercentage(totalsAvg.scramble?.sumSaved, totalsAvg.scramble?.sumAttempts);

  // --- Calculate Putts Averages ---
  displayTotals.putts.totals = safeDivide(totalsAvg.putts?.sumTotals, roundsCount);
  displayTotals.putts.avg = safeDivide(totalsAvg.putts?.sumTotals, holesCount);
  displayTotals.putts.totalsIN = safeDivide(totalsAvg.putts?.sumTotalsIN, roundsCount);
  displayTotals.putts.avgIN = safeDivide(totalsAvg.putts?.sumTotalsIN, holesInCount);
  displayTotals.putts.totalsOUT = safeDivide(totalsAvg.putts?.sumTotalsOUT, roundsCount);
  displayTotals.putts.avgOUT = safeDivide(totalsAvg.putts?.sumTotalsOUT, holesOutCount);
  displayTotals.putts.puttsGir = safeDivide(totalsAvg.putts?.sumPuttsGir, totalsAvg.gir?.sumGirMade);
  displayTotals.putts.puttsGirIn = safeDivide(totalsAvg.putts?.sumPuttsGirIN, totalsAvg.gir?.sumGirMadeIN);
  displayTotals.putts.puttsGirOut = safeDivide(totalsAvg.putts?.sumPuttsGirOUT, totalsAvg.gir?.sumGirMadeOUT);
  displayTotals.putts.puttsThree = safeDivide(totalsAvg.putts?.countPutts3OrMore, roundsCount); // Avg 3+ putts per round
  displayTotals.putts.putts1 = totalsAvg.putts?.countPutts1 || 0;
  displayTotals.putts.putts2 = totalsAvg.putts?.countPutts2 || 0;
  displayTotals.putts.putts3More = totalsAvg.putts?.countPutts3OrMore || 0;
  displayTotals.putts.puttsDistGir = safeDivide(totalsAvg.putts?.sumDistanceFirstPuttGir, totalsAvg.gir?.sumGirMade);

  // Putts Statistics by Range
  if (totalsAvg.putts?.statisticsByRange) {
    (Object.keys(totalsAvg.putts.statisticsByRange) as Array<keyof typeof totalsAvg.putts.statisticsByRange>).forEach(range => {
      // Check if the key exists on both objects (belt-and-braces check)
      if (range in displayTotals.putts.puttsStatistics && totalsAvg.putts?.statisticsByRange?.[range]) {
        const avgStats = totalsAvg.putts.statisticsByRange[range];
        // Now 'range' is correctly typed as one of the specific keys
        const displayStats = displayTotals.putts.puttsStatistics[range as keyof Omit<typeof displayTotals.putts.puttsStatistics, '_puttsOverall'>]; // Keep assertion for display object

        if (avgStats && displayStats) { // Add null check for safety
          displayStats.puttsAttempts = avgStats.sumAttempts || 0;
          displayStats.puttsHoled = avgStats.sumHoled || 0;
          displayStats.putt1Perc = safePercentage(avgStats.sumHoled, avgStats.sumAttempts);
          displayStats.puttsAverage = safeDivide(avgStats.sumPuttsTaken, avgStats.sumAttempts);
          displayStats.puttsAverageDistance = safeDivide(avgStats.sumDistanceFirstPutt, avgStats.sumAttempts);
          displayStats.puttsSecondAverageLength = safeDivide(avgStats.sumDistanceSecondPutt, avgStats.countSecondPutts);
          displayStats.putts3 = avgStats.countPutts3OrMore || 0;
          displayStats.putt3Perc = safePercentage(avgStats.countPutts3OrMore, avgStats.sumAttempts);
          displayStats.numberPuttsInRange = avgStats.sumAttempts || 0;
          displayStats.numberSecondPutt = avgStats.countSecondPutts || 0;
        }
      }
    });
  }

  // Putts Overall Stats
  displayTotals.putts.puttsStatistics._puttsOverall.birdieBetter = totalsAvg.putts?.overallStats?.sumPuttsMadeForBirdieOrBetter || 0;
  displayTotals.putts.puttsStatistics._puttsOverall.birdieConversion = safePercentage(totalsAvg.putts?.overallStats?.sumPuttsMadeForBirdieOrBetter, totalsAvg.putts?.overallStats?.countAttemptsForBirdieOrBetter);
  displayTotals.putts.puttsStatistics._puttsOverall.gir = totalsAvg.gir?.sumGirMade || 0;
  displayTotals.putts.puttsStatistics._puttsOverall.puttsInGIR = totalsAvg.putts?.sumPuttsGir || 0;
  displayTotals.putts.puttsStatistics._puttsOverall.threePutts = totalsAvg.putts?.countPutts3OrMore || 0;
  displayTotals.putts.puttsStatistics._puttsOverall.totalPutts = totalsAvg.putts?.sumTotals || 0;
  displayTotals.putts.puttsStatistics._puttsOverall.totalPuttsInGIR = totalsAvg.putts?.sumPuttsGir || 0;


  // --- Calculate Sand Averages ---
  displayTotals.sand.totals = totalsAvg.sand?.sumAttempts || 0;
  displayTotals.sand.avg = safeDivide(totalsAvg.sand?.sumAttempts, roundsCount);
  displayTotals.sand.saved = totalsAvg.sand?.sumSaved || 0;
  displayTotals.sand.savedPerc = safePercentage(totalsAvg.sand?.sumSaved, totalsAvg.sand?.sumAttempts);

  // --- Calculate Penalty Averages ---
  displayTotals.water.totals = totalsAvg.water?.countPenalties || 0;
  displayTotals.water.avg = safeDivide(totalsAvg.water?.countPenalties, roundsCount);
  displayTotals.water.totalsIN = totalsAvg.water?.countPenaltiesIN || 0;
  displayTotals.water.avgIN = safeDivide(totalsAvg.water?.countPenaltiesIN, roundsCount);
  displayTotals.water.totalsOUT = totalsAvg.water?.countPenaltiesOUT || 0;
  displayTotals.water.avgOUT = safeDivide(totalsAvg.water?.countPenaltiesOUT, roundsCount);

  displayTotals.out.totals = totalsAvg.out?.countPenalties || 0;
  displayTotals.out.avg = safeDivide(totalsAvg.out?.countPenalties, roundsCount);
  displayTotals.out.totalsIN = totalsAvg.out?.countPenaltiesIN || 0;
  displayTotals.out.avgIN = safeDivide(totalsAvg.out?.countPenaltiesIN, roundsCount);
  displayTotals.out.totalsOUT = totalsAvg.out?.countPenaltiesOUT || 0;
  displayTotals.out.avgOUT = safeDivide(totalsAvg.out?.countPenaltiesOUT, roundsCount);

  // --- Calculate TeeShots ---
  const teeShotCategories = ['teeDriver', 'teeFW', 'teeHY', 'teeIron'] as const;

  console.log("DEBUG: totalsAvg.teeShots:", JSON.stringify(totalsAvg?.teeShots, null, 2));
  teeShotCategories.forEach(category => {
    const avgData = totalsAvg.teeShots?.[category];
    // Use type assertion here
    const displayData = displayTotals.teeShots[category as keyof typeof displayTotals.teeShots];
    if (avgData && displayData) {
      displayData.attempts = avgData.sumAttempts || 0;
      displayData.fairwayHits = avgData.sumFairwayHits || 0;
      displayData.averageDistance = safeDivide(avgData.sumDistance, avgData.countShotsWithDistance);
      displayData.missLeft = avgData.sumMissLeft || 0;
      displayData.missRight = avgData.sumMissRight || 0;
      displayData.noGreen = avgData.sumFirMiss || 0; // FIR Miss
      // Use sumPar4_5_Attempts for fairway related percentages
      const fairwayAttempts = avgData.sumPar4_5_Attempts || 0;
      displayData.fairwayCenterPCT = safePercentage(avgData.sumFairwayHits, fairwayAttempts);
      displayData.missLeftPCT = safePercentage(avgData.sumMissLeft, fairwayAttempts);
      displayData.missRightPCT = safePercentage(avgData.sumMissRight, fairwayAttempts);
      displayData.firMissPCT = safePercentage(avgData.sumFirMiss, fairwayAttempts);

      if (category === "teeDriver") {
        console.log("avgData.sumMissLeft -> ", avgData.sumMissLeft);
        console.log("fairwayAttempts -> ", fairwayAttempts);
        console.log("safe percentage -> ", safePercentage(avgData.sumMissLeft, fairwayAttempts));
      }
    }
  });

  // --- Calculate FwAndIrons ---
  const fwAndIronsCategories = ['fwFW', 'fwHY', 'fwLongIron', 'fwMidIron', 'fwShortIron'] as const;
  fwAndIronsCategories.forEach(category => {
    const avgData = totalsAvg.fwAndIrons?.[category];
    // --- FIX IS HERE ---
    // Use type assertion to tell TypeScript 'category' is a valid key
    const displayData = displayTotals.fwAndIrons[category as keyof typeof displayTotals.fwAndIrons];
    // --- END FIX ---
    if (avgData && displayData) {
      displayData.attempts = avgData.sumAttempts || 0;
      displayData.girHits = avgData.sumGirHits || 0;
      displayData.averageDistance = safeDivide(avgData.sumDistance, avgData.countShotsWithDistance);
      displayData.missLeft = avgData.sumMissLeft || 0;
      displayData.missRight = avgData.sumMissRight || 0;
      displayData.missShort = avgData.sumMissShort || 0;
      displayData.missLong = avgData.sumMissLong || 0;
      // Use sumAttempts for percentages
      const attempts = avgData.sumAttempts || 0;
      displayData.girPCT = safePercentage(avgData.sumGirHits, attempts);
      displayData.missLeftPCT = safePercentage(avgData.sumMissLeft, attempts);
      displayData.missRightPCT = safePercentage(avgData.sumMissRight, attempts);
      displayData.missShortPCT = safePercentage(avgData.sumMissShort, attempts);
      displayData.missLongPCT = safePercentage(avgData.sumMissLong, attempts);
    }
  });

  // --- Calculate Inside100Mt ---
  const inside100MtRanges = ['over100', 'range80_100', 'range60_80', 'under60'] as const;
  inside100MtRanges.forEach(range => {
    const avgData = totalsAvg.inside100Mt?.[range]; // Accesses 'over100', 'inside10081', etc.
    // displayTotals.inside100Mt now uses 'over100', 'inside10081', etc. after constant.utils change
    const displayData = displayTotals.inside100Mt[range as keyof typeof displayTotals.inside100Mt];
    if (avgData && displayData) {
      displayData.attempts = avgData.sumAttempts || 0;
      displayData.greensHits = avgData.sumGirHits || 0; // Map sumGirHits to greensHits for display
      displayData.averageDistGIR = safeDivide(avgData.sumDistanceToPinOnGIR, avgData.countGirHits); // Use specific sum/count
      displayData.averageShots = safeDivide(avgData.sumPuttsTaken, avgData.sumAttempts); // Example: Avg putts
      displayData.girPCT = safePercentage(avgData.sumGirHits, avgData.sumAttempts);
      // Populate misses if needed for display
      displayData.missedLeft = avgData.sumMissedLeft || 0;
      displayData.missedRight = avgData.sumMissedRight || 0;
      displayData.missedShort = avgData.sumMissedShort || 0;
      displayData.missedLong = avgData.sumMissedLong || 0;
    }
  });

  // --- Calculate ChipPitch ---
  const chipPitchTypes = ['chipPutter', 'chipWedge', 'chipIron'] as const;
  chipPitchTypes.forEach(type => {
    const avgData = totalsAvg.chipPitch?.[type];
    const displayData = displayTotals.chipPitch[type as keyof typeof displayTotals.chipPitch];
    if (avgData && displayData) {
      displayData.attempts = avgData.sumAttempts || 0;
      displayData.upDownMade = avgData.sumUpDownSuccess || 0;
      displayData.averageShot = safeDivide(avgData.sumPuttsTaken, avgData.sumAttempts);
      displayData.upDownPCT = safePercentage(avgData.sumUpDownSuccess, avgData.sumAttempts);
    }
  });

  return displayTotals;
};

