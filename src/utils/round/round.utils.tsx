import { CHIPCONDITION } from '@/enum/shots.enum';
import { IClubDetail, IClubType, IGolfBagData } from '@/types/player.types';
import { INewRound } from '@/types/round.types';
import { IDistance, IDistanceSingle, IShots, ITotalDistanceAvg } from '@/types/roundData.types';
import { IPuttsStatistics, IRoundInside100MtTotals, IRoundTotals, ITotalRoundsAvg } from '@/types/roundTotals.types';
import { db } from '@/utils/firebase/firebase.utils';
import { collection, doc, getDoc, getDocs, serverTimestamp, Timestamp, WriteBatch } from 'firebase/firestore';
import { capitalize } from 'lodash';

export const getClubsNames = (clubTypes: IGolfBagData): string[] => {

  type SelectedClubDetail = IClubDetail & { typeName: string };
  const selectedClubs: SelectedClubDetail[] = clubTypes.flatMap((ct: IClubType) => {
    return ct.details
      .filter((c: IClubDetail) => c.selected)
      .map((c: IClubDetail) => ({ ...c, typeName: ct.typeName })
      )
  });
  const clubNames = selectedClubs.map((club: SelectedClubDetail) => {
    switch (club.typeName) {
      case 'iron':
        return `${club.typeName.slice(0, 1).toLowerCase()}${club.clubNumber ?? ''}`;
      case "wedge":
        return `${capitalize(String(club.clubNumber ?? ''))} ${club.typeName.toUpperCase()}`;
      default:
        return club.typeName.toUpperCase();
    }
  });
  return clubNames;
}

export const getDistanceClubs = (distanceClubs: string[]): string[] => {
  return distanceClubs.slice(0, -1);
}

export const getGreenClubs = (teeClubs: string[]): string[] => {
  return teeClubs.slice(1).concat(["mt.", "NO"]);
}

export const getChipClubs = (teeClubs: string[]): string[] => {
  return teeClubs.slice(3).concat(["Bunker", "Chip"]);
}

export const newRoundDisabledSelect = (name: string, tmpHole: IShots): boolean => {
  switch (name) {
    case CHIPCONDITION.GREEN:
    case CHIPCONDITION.CHIP:
      return !!tmpHole.gir;
    case CHIPCONDITION.FAIRWAY:
      return tmpHole.par === 3;
    case CHIPCONDITION.TOGREENCLUB:
      return tmpHole.par === 3;
    default:
      return false;
  }
}

export const createDistanceObject = (value: IDistanceSingle): IDistance[] => {
  const { roundDistances, club, mt } = value;
  const existingIndex = roundDistances.findIndex((distance) => distance.club === club);

  if (existingIndex === -1) {
    return [...roundDistances, { club: club, mt: [mt], avg: mt }];
  } else {
    return roundDistances.map((distance, index) => {
      if (index === existingIndex) {
        const updatedMt = [...distance.mt, mt];
        const updatedAvg = calculateAvg(updatedMt);
        return { ...distance, mt: updatedMt, avg: updatedAvg };
      }
      return distance;
    });
  }
}

export const calculateAvg = (values: number[]): number => {
  if (!values || values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return Math.floor(sum / values.length);
}

export const prepareRoundSaveBatch = (
  batch: WriteBatch,
  userId: string,
  general: INewRound,
  totals: IRoundTotals,
  currentRoundDistances: IDistance[],
  holes: IShots[]
): string => {
  const playerRoundsCollectionRef = collection(db, 'players', userId, 'rounds');
  const roundRef = doc(playerRoundsCollectionRef);
  const roundId = roundRef.id;

  batch.set(roundRef, {
    ...general,
    totals: totals,
    distances: currentRoundDistances,
    userId: userId,
    roundDate: general.roundDate ? Timestamp.fromDate(new Date(general.roundDate)) : serverTimestamp(),
    createdAt: serverTimestamp(),
  });
  holes.forEach((holeData: IShots) => {
    const holeDocId = holeData.holeNumber?.toString();
    if (holeDocId && holeData.holeNumber > 0) {
      const holeRef = doc(db, 'players', userId, 'rounds', roundId, 'holes', holeDocId);
      batch.set(holeRef, holeData);
    } else {
      console.warn("Skipping hole due to missing/invalid holeNumber: ", holeData);
    }
  });
  return roundId;
};

export const fetchExistingAverageDistances = async (userId: string): Promise<Map<string, ITotalDistanceAvg>> => {
  const totalDistancesAvgCollectionRef = collection(db, 'players', userId, 'totalDistancesAVG');
  const existingAveragesSnapshot = await getDocs(totalDistancesAvgCollectionRef);

  const existingAveragesMap = new Map<string, ITotalDistanceAvg>();
  existingAveragesSnapshot.forEach((doc) => {
    existingAveragesMap.set(doc.id, doc.data() as ITotalDistanceAvg);
  });
  return existingAveragesMap;
};

export const prepareAverageDistanceUpdateBatch = (
  batch: WriteBatch,
  userId: string,
  currentRoundDistances: IDistance[],
  existingAveragesMap: Map<string, ITotalDistanceAvg>
): void => {
  currentRoundDistances.forEach((newDistanceEntry: IDistance) => {
    const club = newDistanceEntry.club;
    const shotsInNewRound = newDistanceEntry.mt;

    if (!club || shotsInNewRound.length === 0) {
      console.warn("Skipping distance update for entry with no club or no shots:", newDistanceEntry);
      return;
    }

    const sumOfNewShots = shotsInNewRound.reduce((acc, dist) => acc + dist, 0);
    const countOfNewShots = shotsInNewRound.length;

    const existingAvgData = existingAveragesMap.get(club);

    const newTotalSum = (existingAvgData?.totalDistancesSum || 0) + sumOfNewShots;
    const newNumberOfShots = (existingAvgData?.numberOfShots || 0) + countOfNewShots;
    const newAvg = newNumberOfShots > 0 ? Math.floor(newTotalSum / newNumberOfShots) : 0;

    const updatedAvgData: ITotalDistanceAvg = {
      club: club,
      totalDistancesSum: newTotalSum,
      numberOfShots: newNumberOfShots,
      avg: newAvg,
    };

    const clubAvgDocRef = doc(db, 'players', userId, 'totalDistancesAVG', club);
    batch.set(clubAvgDocRef, updatedAvgData, { merge: true });
  });
};

export const fetchOverallTotalsAvg = async (userId: string): Promise<ITotalRoundsAvg | null> => {
  const totalsAvgDocRef = doc(db, 'players', userId, 'totalsRoundsAVG', 'overall');
  const totalsAvgSnapshot = await getDoc(totalsAvgDocRef);

  if (totalsAvgSnapshot.exists()) {
    return totalsAvgSnapshot.data() as ITotalRoundsAvg;
  }
  else {
    return null;
  }
};

export const prepareOverallTotalsUpdateBatch = (
  batch: WriteBatch,
  userId: string,
  currentTotals: IRoundTotals,
  existingTotalsAvg: ITotalRoundsAvg | null
): void => {
  const totalsAvgDocRef = doc(db, 'players', userId, 'totalsRoundsAVG', 'overall');

  const safeAdd = (existing: number | undefined, current: number | undefined): number => {
    return (existing || 0) + (current || 0);
  };

  const currentRoundHolesPlayed = safeAdd(safeAdd(currentTotals.score.par3, currentTotals.score.par4), currentTotals.score.par5);
  const currentRoundHolesPlayedIN = currentTotals.score.scoreIN > 0 ? 9 : 0;
  const currentRoundHolesPlayedOUT = currentTotals.score.scoreOUT > 0 ? 9 : 0;
  const currentRoundPar4_5_Holes = safeAdd(currentTotals.score.par4, currentTotals.score.par5);

  const newTotalRoundsCount = safeAdd(existingTotalsAvg?.totalRoundsCount, 1);
  const newTotalHolesPlayed = safeAdd(existingTotalsAvg?.totalHolesPlayed, currentRoundHolesPlayed);
  const newTotalHolesPlayedIN = safeAdd(existingTotalsAvg?.totalHolesPlayedIN, currentRoundHolesPlayedIN);
  const newTotalHolesPlayedOUT = safeAdd(existingTotalsAvg?.totalHolesPlayedOUT, currentRoundHolesPlayedOUT);
  const newTotalPar4_5_Holes = safeAdd(existingTotalsAvg?.totalPar4_5_Holes, currentRoundPar4_5_Holes);

  // --- Score ---
  const newScore = {
    sumTotals: safeAdd(existingTotalsAvg?.score?.sumTotals, currentTotals.score.totals),
    sumVsPar: safeAdd(existingTotalsAvg?.score?.sumVsPar, currentTotals.score.vsPar),
    sumScoreIN: safeAdd(existingTotalsAvg?.score?.sumScoreIN, currentTotals.score.scoreIN),
    sumScoreOUT: safeAdd(existingTotalsAvg?.score?.sumScoreOUT, currentTotals.score.scoreOUT),
    sumVsParIN: safeAdd(existingTotalsAvg?.score?.sumVsParIN, currentTotals.score.vsParIN),
    sumVsParOUT: safeAdd(existingTotalsAvg?.score?.sumVsParOUT, currentTotals.score.vsParOUT),
    countPar3: safeAdd(existingTotalsAvg?.score?.countPar3, currentTotals.score.par3),
    countPar4: safeAdd(existingTotalsAvg?.score?.countPar4, currentTotals.score.par4),
    countPar5: safeAdd(existingTotalsAvg?.score?.countPar5, currentTotals.score.par5),
    countScoreEagleBetter: safeAdd(existingTotalsAvg?.score?.countScoreEagleBetter, currentTotals.score.scoreEagleBetter),
    countScoreBirdie: safeAdd(existingTotalsAvg?.score?.countScoreBirdie, currentTotals.score.scoreBirdie),
    countScorePar: safeAdd(existingTotalsAvg?.score?.countScorePar, currentTotals.score.scorePar),
    countScoreBogey: safeAdd(existingTotalsAvg?.score?.countScoreBogey, currentTotals.score.scoreBogey),
    countScoreDoubleBogeyWorst: safeAdd(existingTotalsAvg?.score?.countScoreDoubleBogeyWorst, currentTotals.score.scoreDoubleBogeyWorst),
    // Use total score per par type if available, otherwise keep as is
    sumScorePar3: safeAdd(existingTotalsAvg?.score?.sumScorePar3, currentTotals.score.scorePar3), // Assuming scorePar3 is SUM
    sumScorePar4: safeAdd(existingTotalsAvg?.score?.sumScorePar4, currentTotals.score.scorePar4), // Assuming scorePar4 is SUM
    sumScorePar5: safeAdd(existingTotalsAvg?.score?.sumScorePar5, currentTotals.score.scorePar5), // Assuming scorePar5 is SUM
  };

  // --- Points ---
  const newPoints = {
    sumTotals: safeAdd(existingTotalsAvg?.points?.sumTotals, currentTotals.points.totals),
    sumPointsIN: safeAdd(existingTotalsAvg?.points?.sumPointsIN, currentTotals.points.pointsIN),
    sumPointsOUT: safeAdd(existingTotalsAvg?.points?.sumPointsOUT, currentTotals.points.pointsOUT),
  };

  // --- Fairway ---
  const newFairway = {
    // Use the aggregated Par 4/5 count as the attempt basis for fairway stats
    sumAttempts: newTotalPar4_5_Holes,
    sumFairwayCenter: safeAdd(existingTotalsAvg?.fairway?.sumFairwayCenter, currentTotals.fairway.fairwayCenter),
    sumFairwayLeft: safeAdd(existingTotalsAvg?.fairway?.sumFairwayLeft, currentTotals.fairway.fairwayLeft),
    sumFairwayRight: safeAdd(existingTotalsAvg?.fairway?.sumFairwayRight, currentTotals.fairway.fairwayRight),
  };

  // --- TeeShots ---
  const newTeeShots: ITotalRoundsAvg['teeShots'] = {};
  const teeShotKeys = Object.keys(currentTotals.teeShots) as Array<keyof typeof currentTotals.teeShots>;

  for (const clubType of teeShotKeys) {
    const currentData = currentTotals.teeShots[clubType];
    // Ensure currentData has the raw sum/count fields after changes in totals.utils.tsx
    const existingData = existingTotalsAvg?.teeShots?.[clubType];

    // Use raw sums/counts from currentData if they exist
    const currentSumDistance = currentData.totalDistance || ((currentData.averageDistance || 0) * (currentData.attempts || 0));
    const currentCountWithDistance = currentData.countShotsWithDistance || ((currentData.averageDistance && currentData.averageDistance > 0) ? (currentData.attempts || 0) : 0);
    const currentPar4_5_Attempts = currentData.par4_5_Attempts || 0; // Use the specific count

    newTeeShots[clubType] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumFairwayHits: safeAdd(existingData?.sumFairwayHits, currentData.fairwayHits),
      sumPar4_5_Attempts: safeAdd(existingData?.sumPar4_5_Attempts, currentPar4_5_Attempts), // Use specific count
      sumDistance: safeAdd(existingData?.sumDistance, currentSumDistance),
      countShotsWithDistance: safeAdd(existingData?.countShotsWithDistance, currentCountWithDistance),
      sumMissLeft: safeAdd(existingData?.sumMissLeft, currentData.missLeft),
      sumMissRight: safeAdd(existingData?.sumMissRight, currentData.missRight),
      sumFirMiss: safeAdd(existingData?.sumFirMiss, currentData.noGreen), // Assuming noGreen maps to FirMiss
    };
  }

  // --- FwAndIrons ---
  const newFwAndIrons: ITotalRoundsAvg['fwAndIrons'] = {};
  const fwIronsKeys = Object.keys(currentTotals.fwAndIrons) as Array<keyof typeof currentTotals.fwAndIrons>;

  for (const clubCategory of fwIronsKeys) {
    // Type assertion might still be needed depending on TS version/config
    const currentData = currentTotals.fwAndIrons[clubCategory as keyof typeof currentTotals.fwAndIrons];
    if (!currentData) continue; // Skip if category doesn't exist (e.g., fwShortIron initially)

    const existingData = existingTotalsAvg?.fwAndIrons?.[clubCategory as keyof typeof currentTotals.fwAndIrons];

    // Use direct sums from currentData
    const currentSumDistanceGIR = currentData.totalDistanceGIR || 0;
    const currentGirHitsCount = currentData.girHits || 0; // Use girHits as the count for GIR related sums

    // Placeholder for total distance sum/count - using average temporarily
    const currentSumDistance = (currentData.averageDistance || 0) * (currentData.attempts || 0);
    const currentCountWithDistance = (currentData.averageDistance && currentData.averageDistance > 0) ? (currentData.attempts || 0) : 0;

    newFwAndIrons[clubCategory as keyof typeof currentTotals.fwAndIrons] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumGirHits: safeAdd(existingData?.sumGirHits, currentData.girHits),
      sumScorePar3: safeAdd(existingData?.sumScorePar3, currentData.totalScorePar3),
      countPar3Attempts: safeAdd(existingData?.countPar3Attempts, currentData.totalNumberPar3),
      sumScorePar4: safeAdd(existingData?.sumScorePar4, currentData.totalScorePar4),
      countPar4Attempts: safeAdd(existingData?.countPar4Attempts, currentData.totalNumberPar4),
      sumScorePar5: safeAdd(existingData?.sumScorePar5, currentData.totalScorePar5),
      countPar5Attempts: safeAdd(existingData?.countPar5Attempts, currentData.totalNumberPar5),
      sumDistanceToPinOnGIR: safeAdd(existingData?.sumDistanceToPinOnGIR, currentSumDistanceGIR),
      countGirHits: safeAdd(existingData?.countGirHits, currentGirHitsCount),
      sumMissLeft: safeAdd(existingData?.sumMissLeft, currentData.missLeft),
      sumMissRight: safeAdd(existingData?.sumMissRight, currentData.missRight),
      sumMissShort: safeAdd(existingData?.sumMissShort, currentData.missShort),
      sumMissLong: safeAdd(existingData?.sumMissLong, currentData.missLong),
      sumDistance: safeAdd(existingData?.sumDistance, currentSumDistance),
      countShotsWithDistance: safeAdd(existingData?.countShotsWithDistance, currentCountWithDistance),
    };
  }

  // --- Inside100Mt ---
  const newInside100Mt: ITotalRoundsAvg['inside100Mt'] = {};
  // Ensure keys match between IRoundInside100MtTotals and ITotalRoundsAvg['inside100Mt']
  const inside100Keys: Array<keyof IRoundInside100MtTotals> = ['over100', 'inside10081', 'inside8061', 'inside60'];

  for (const range of inside100Keys) {
    const currentData = currentTotals.inside100Mt[range];
    if (!currentData) continue;
    let existingRangeKey: keyof NonNullable<ITotalRoundsAvg['inside100Mt']>;
    switch (range) {
      case 'over100': existingRangeKey = 'over100'; break;
      case 'inside10081': existingRangeKey = 'range80_100'; break;
      case 'inside8061': existingRangeKey = 'range60_80'; break;
      case 'inside60': existingRangeKey = 'under60'; break;
      default:
        // This should not happen with the defined keys, but good practice to handle
        console.warn(`Unknown inside100Mt range key: ${range}`);
        continue; // Skip this iteration
    }
    // Use the mapped key to access existing data
    const existingData = existingTotalsAvg?.inside100Mt?.[existingRangeKey];

    // Use direct sums from currentData
    const currentSumDistanceGIR = currentData.totalDistGIR || 0;
    const currentSumPuttsTaken = currentData.totalPuttsTaken || 0;
    const currentSumDistance = currentData.totalDistance || 0;
    const currentCountWithDistance = currentData.countShotsWithDistance || 0;
    // Define sumScoreRelativeToPar based on totalShotsTaken or another metric
    const currentSumScoreRelativeToPar = currentData.totalShotsTaken || 0; // Example

    newInside100Mt[existingRangeKey] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumGirHits: safeAdd(existingData?.sumGirHits, currentData.greensHits), // Target: sumGirHits
      sumScoreRelativeToPar: safeAdd(existingData?.sumScoreRelativeToPar, currentSumScoreRelativeToPar), // Needs definition
      sumDistanceToPinOnGIR: safeAdd(existingData?.sumDistanceToPinOnGIR, currentSumDistanceGIR),
      countGirHits: safeAdd(existingData?.countGirHits, currentData.greensHits), // Count is greensHits
      sumMissedLeft: safeAdd(existingData?.sumMissedLeft, currentData.missedLeft),
      sumMissedRight: safeAdd(existingData?.sumMissedRight, currentData.missedRight),
      sumMissedShort: safeAdd(existingData?.sumMissedShort, currentData.missedShort),
      sumMissedLong: safeAdd(existingData?.sumMissedLong, currentData.missedLong),
      sumDistance: safeAdd(existingData?.sumDistance, currentSumDistance), // Use direct sum
      countShotsWithDistance: safeAdd(existingData?.countShotsWithDistance, currentCountWithDistance), // Use direct count
      sumPuttsTaken: safeAdd(existingData?.sumPuttsTaken, currentSumPuttsTaken), // Use direct sum
    };
  }


  // --- ChipPitch ---
  const newChipPitch: ITotalRoundsAvg['chipPitch'] = {};
  const chipPitchKeys = Object.keys(currentTotals.chipPitch) as Array<keyof typeof currentTotals.chipPitch>;

  for (const clubType of chipPitchKeys) {
    const currentData = currentTotals.chipPitch[clubType];
    if (!currentData) continue;
    const existingData = existingTotalsAvg?.chipPitch?.[clubType];

    // Use direct sums from currentData
    const currentSumDistanceToHole = currentData.totalDistanceToHole || 0;
    const currentSumScoreRelativeToPar = currentData.totalShotsTaken || 0; // Use totalShotsTaken as score metric
    const currentSumPuttsTaken = currentData.totalPuttsTaken || 0;

    newChipPitch[clubType] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumUpDownSuccess: safeAdd(existingData?.sumUpDownSuccess, currentData.upDownMade), // Target: sumUpDownSuccess
      sumScoreRelativeToPar: safeAdd(existingData?.sumScoreRelativeToPar, currentSumScoreRelativeToPar),
      sumDistanceToHole: safeAdd(existingData?.sumDistanceToHole, currentSumDistanceToHole),
      sumShotsHoled: safeAdd(existingData?.sumShotsHoled, currentData.shotsHoled),
      sumPuttsTaken: safeAdd(existingData?.sumPuttsTaken, currentSumPuttsTaken), // Use direct sum
    };
  }

  // --- GIR ---
  const newGir = {
    sumGirMade: safeAdd(existingTotalsAvg?.gir?.sumGirMade, currentTotals.gir.totals),
    sumGirMadeIN: safeAdd(existingTotalsAvg?.gir?.sumGirMadeIN, currentTotals.gir.totalsIN),
    sumGirMadeOUT: safeAdd(existingTotalsAvg?.gir?.sumGirMadeOUT, currentTotals.gir.totalsOUT),
  };

  // --- GIR Bogey ---
  const newGirBogey = {
    sumGirBogeyMade: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMade, currentTotals.girBogey.totals),
    sumGirBogeyMadeIN: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMadeIN, currentTotals.girBogey.totalsIN),
    sumGirBogeyMadeOUT: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMadeOUT, currentTotals.girBogey.totalsOUT),
  };

  // --- UpDown ---
  const newUpDown = {
    sumAttempts: safeAdd(existingTotalsAvg?.upDown?.sumAttempts, currentTotals.upDown.totals),
    sumSaved: safeAdd(existingTotalsAvg?.upDown?.sumSaved, currentTotals.upDown.saved),
  };

  // --- Scramble ---
  const newScramble = {
    sumAttempts: safeAdd(existingTotalsAvg?.scramble?.sumAttempts, currentTotals.scramble.totals),
    sumSaved: safeAdd(existingTotalsAvg?.scramble?.sumSaved, currentTotals.scramble.saved),
  };

  // --- Putts ---
  const newPutts: ITotalRoundsAvg['putts'] = {
    sumTotals: safeAdd(existingTotalsAvg?.putts?.sumTotals, currentTotals.putts.totals),
    sumTotalsIN: safeAdd(existingTotalsAvg?.putts?.sumTotalsIN, currentTotals.putts.totalsIN),
    sumTotalsOUT: safeAdd(existingTotalsAvg?.putts?.sumTotalsOUT, currentTotals.putts.totalsOUT),
    sumPuttsGir: safeAdd(existingTotalsAvg?.putts?.sumPuttsGir, currentTotals.putts.puttsGir), // Assuming puttsGir is SUM
    sumPuttsGirIN: safeAdd(existingTotalsAvg?.putts?.sumPuttsGirIN, currentTotals.putts.puttsGirIn), // Assuming puttsGirIn is SUM
    sumPuttsGirOUT: safeAdd(existingTotalsAvg?.putts?.sumPuttsGirOUT, currentTotals.putts.puttsGirOut), // Assuming puttsGirOut is SUM
    countPutts1: safeAdd(existingTotalsAvg?.putts?.countPutts1, currentTotals.putts.putts1),
    countPutts2: safeAdd(existingTotalsAvg?.putts?.countPutts2, currentTotals.putts.putts2),
    countPutts3OrMore: safeAdd(existingTotalsAvg?.putts?.countPutts3OrMore, currentTotals.putts.putts3More),
    sumDistanceFirstPuttGir: safeAdd(existingTotalsAvg?.putts?.sumDistanceFirstPuttGir, currentTotals.putts.puttsDistGir), // Assuming puttsDistGir is SUM
    statisticsByRange: {}, // Initialize as empty object
    overallStats: { // Aggregate overall stats
      sumPuttsMadeForBirdieOrBetter: safeAdd(existingTotalsAvg?.putts?.overallStats?.sumPuttsMadeForBirdieOrBetter, currentTotals.putts.puttsStatistics._puttsOverall.birdieBetter),
      // Need attempts for birdie conversion %
      countAttemptsForBirdieOrBetter: safeAdd(existingTotalsAvg?.putts?.overallStats?.countAttemptsForBirdieOrBetter, currentTotals.putts.puttsStatistics._puttsOverall.birdieBetterAttempts), // Use attempts if calculated
    }
  };

  // --- Putts by Range ---
  const puttRangeKeys = Object.keys(currentTotals.putts.puttsStatistics)
    .filter(key => key !== '_puttsOverall') as Array<keyof Omit<IPuttsStatistics, '_puttsOverall'>>;

  for (const range of puttRangeKeys) {
    const currentData = currentTotals.putts.puttsStatistics[range];
    if (!currentData) continue;
    const existingData = existingTotalsAvg?.putts?.statisticsByRange?.[range];

    // Use direct sums from currentData
    const currentSumPuttsTaken = currentData.numberPuttsInRange || 0; // Sum of putts taken
    const currentSumDistFirst = currentData.distanceFirstPutt || 0; // Sum of 1st putt distances
    const currentSumDistSecond = currentData.distanceSecondPutt || 0; // Sum of 2nd putt distances

    newPutts.statisticsByRange![range] = { // Use non-null assertion assuming it's initialized
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.puttsAttempts),
      sumHoled: safeAdd(existingData?.sumHoled, currentData.puttsHoled),
      sumPuttsTaken: safeAdd(existingData?.sumPuttsTaken, currentSumPuttsTaken),
      sumDistanceFirstPutt: safeAdd(existingData?.sumDistanceFirstPutt, currentSumDistFirst),
      sumDistanceSecondPutt: safeAdd(existingData?.sumDistanceSecondPutt, currentSumDistSecond),
      countSecondPutts: safeAdd(existingData?.countSecondPutts, currentData.numberSecondPutt),
      countPutts3OrMore: safeAdd(existingData?.countPutts3OrMore, currentData.putts3),
    };
  }


  // --- Sand ---
  const newSand = {
    sumAttempts: safeAdd(existingTotalsAvg?.sand?.sumAttempts, currentTotals.sand.totals),
    sumSaved: safeAdd(existingTotalsAvg?.sand?.sumSaved, currentTotals.sand.saved),
  };

  // --- Water ---
  const newWater = {
    countPenalties: safeAdd(existingTotalsAvg?.water?.countPenalties, currentTotals.water.totals),
    countPenaltiesIN: safeAdd(existingTotalsAvg?.water?.countPenaltiesIN, currentTotals.water.totalsIN),
    countPenaltiesOUT: safeAdd(existingTotalsAvg?.water?.countPenaltiesOUT, currentTotals.water.totalsOUT),
  };

  // --- Out ---
  const newOut = {
    countPenalties: safeAdd(existingTotalsAvg?.out?.countPenalties, currentTotals.out.totals),
    countPenaltiesIN: safeAdd(existingTotalsAvg?.out?.countPenaltiesIN, currentTotals.out.totalsIN),
    countPenaltiesOUT: safeAdd(existingTotalsAvg?.out?.countPenaltiesOUT, currentTotals.out.totalsOUT),
  };

  // --- Final Aggregated Object ---
  const updatedTotalsAvgData: ITotalRoundsAvg = {
    totalRoundsCount: newTotalRoundsCount,
    totalHolesPlayed: newTotalHolesPlayed,
    totalHolesPlayedIN: newTotalHolesPlayedIN,
    totalHolesPlayedOUT: newTotalHolesPlayedOUT,
    totalPar4_5_Holes: newTotalPar4_5_Holes,
    score: newScore,
    points: newPoints,
    fairway: newFairway,
    teeShots: newTeeShots,
    fwAndIrons: newFwAndIrons,
    inside100Mt: newInside100Mt,
    chipPitch: newChipPitch,
    gir: newGir,
    girBogey: newGirBogey,
    upDown: newUpDown,
    scramble: newScramble,
    putts: newPutts,
    sand: newSand,
    water: newWater,
    out: newOut,
  };

  // --- Set in Batch ---
  batch.set(totalsAvgDocRef, updatedTotalsAvgData, { merge: true });

};