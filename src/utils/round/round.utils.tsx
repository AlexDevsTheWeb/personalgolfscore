import { CHIPCONDITION } from '@/enum/shots.enum';
import { IClubDetail, IClubType, IGolfBagData } from '@/types/player.types';
import { INewRound } from '@/types/round.types';
import { IDistance, IDistanceSingle, IShots, ITotalDistanceAvg } from '@/types/roundData.types';
import { IRoundTotals, ITotalRoundsAvg } from '@/types/roundTotals.types';
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
    console.log(`Prepared update for club: ${club}`, updatedAvgData);
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
  const prevCount = existingTotalsAvg?.totalRoundsCount || 0;

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
    sumScorePar3: safeAdd(existingTotalsAvg?.score?.sumScorePar3, currentTotals.score.scorePar3),
    sumScorePar4: safeAdd(existingTotalsAvg?.score?.sumScorePar4, currentTotals.score.scorePar4),
    sumScorePar5: safeAdd(existingTotalsAvg?.score?.sumScorePar5, currentTotals.score.scorePar5),
  };

  const newPoints = {
    sumTotals: safeAdd(existingTotalsAvg?.points?.sumTotals, currentTotals.points.totals),
    sumPointsIN: safeAdd(existingTotalsAvg?.points?.sumPointsIN, currentTotals.points.pointsIN),
    sumPointsOUT: safeAdd(existingTotalsAvg?.points?.sumPointsOUT, currentTotals.points.pointsOUT),
  };

  const newFairway = {
    sumAttempts: newTotalPar4_5_Holes, // Use the cumulative count
    sumFairwayCenter: safeAdd(existingTotalsAvg?.fairway?.sumFairwayCenter, currentTotals.fairway.fairwayCenter),
    sumFairwayLeft: safeAdd(existingTotalsAvg?.fairway?.sumFairwayLeft, currentTotals.fairway.fairwayLeft),
    sumFairwayRight: safeAdd(existingTotalsAvg?.fairway?.sumFairwayRight, currentTotals.fairway.fairwayRight),
  };

  const newTeeShots: ITotalRoundsAvg['teeShots'] = { ...(existingTotalsAvg?.teeShots || {}) };
  for (const clubType in currentTotals.teeShots) {
    const currentData = currentTotals.teeShots[clubType as keyof typeof currentTotals.teeShots];
    const existingData = newTeeShots[clubType];

    const currentSumDistance = (currentData.averageDistance || 0) * (currentData.attempts || 0);
    const currentCountWithDistance = (currentData.averageDistance || 0) > 0 ? (currentData.attempts || 0) : 0;

    newTeeShots[clubType] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumFairwayHits: safeAdd(existingData?.sumFairwayHits, currentData.fairwayHits),
      sumPar4_5_Attempts: safeAdd(existingData?.sumPar4_5_Attempts, currentData.attempts),
      sumDistance: safeAdd(existingData?.sumDistance, currentSumDistance),
      countShotsWithDistance: safeAdd(existingData?.countShotsWithDistance, currentCountWithDistance),
      sumMissLeft: safeAdd(existingData?.sumMissLeft, currentData.missLeft),
      sumMissRight: safeAdd(existingData?.sumMissRight, currentData.missRight),
      sumFirMiss: safeAdd(existingData?.sumFirMiss, currentData.noGreen),
    };
  }

  const newFwAndIrons: ITotalRoundsAvg['fwAndIrons'] = { ...(existingTotalsAvg?.fwAndIrons || {}) };
  for (const clubCategory in currentTotals.fwAndIrons) {
    const currentData = currentTotals.fwAndIrons[clubCategory as keyof typeof currentTotals.fwAndIrons];
    const existingData = newFwAndIrons[clubCategory];

    const currentSumDistanceGIR = (currentData.averageDistGIR || 0) * (currentData.greenHits || 0);

    newFwAndIrons[clubCategory] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumGreenHits: safeAdd(existingData?.sumGreenHits, currentData.greenHits),
      sumScorePar3: safeAdd(existingData?.sumScorePar3, currentData.totalScorePar3),
      countPar3Attempts: safeAdd(existingData?.countPar3Attempts, currentData.attempts),
      sumScorePar4: safeAdd(existingData?.sumScorePar4, currentData.totalScorePar4),
      countPar4Attempts: safeAdd(existingData?.countPar4Attempts, currentData.totalNumberPar4),
      sumScorePar5: safeAdd(existingData?.sumScorePar5, currentData.totalScorePar5),
      countPar5Attempts: safeAdd(existingData?.countPar5Attempts, currentData.totalNumberPar5),
      sumDistanceToPinOnGIR: safeAdd(existingData?.sumDistanceToPinOnGIR, currentSumDistanceGIR),
      countGirHits: safeAdd(existingData?.countGirHits, currentData.greenHits),
      sumMissedLeft: safeAdd(existingData?.sumMissedLeft, currentData.missedLeft),
      sumMissedRight: safeAdd(existingData?.sumMissedRight, currentData.missedRight),
      sumMissedShort: safeAdd(existingData?.sumMissedShort, currentData.missedShort),
      sumMissedLong: safeAdd(existingData?.sumMissedLong, currentData.missedOver),
    };
  }

  const newInside100Mt: ITotalRoundsAvg['inside100Mt'] = { ...(existingTotalsAvg?.inside100Mt || {}) };
  for (const range in currentTotals.inside100Mt) {
    const currentData = currentTotals.inside100Mt[range as keyof typeof currentTotals.inside100Mt];
    const existingData = newInside100Mt[range];

    const currentSumDistanceGIR = (currentData.averageDistGIR || 0) * (currentData.greensHits || 0);
    const currentSumScoreRelativeToPar = (currentData.averageShots || 0) * (currentData.attempts || 0);

    newInside100Mt[range] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumGreensHits: safeAdd(existingData?.sumGreensHits, currentData.greensHits),
      sumScoreRelativeToPar: safeAdd(existingData?.sumScoreRelativeToPar, currentSumScoreRelativeToPar),
      sumDistanceToPinOnGIR: safeAdd(existingData?.sumDistanceToPinOnGIR, currentSumDistanceGIR),
      countGirHits: safeAdd(existingData?.countGirHits, currentData.greensHits),
      sumMissedLeft: safeAdd(existingData?.sumMissedLeft, currentData.missedLeft),
      sumMissedRight: safeAdd(existingData?.sumMissedRight, currentData.missedRight),
      sumMissedShort: safeAdd(existingData?.sumMissedShort, currentData.missedShort),
      sumMissedLong: safeAdd(existingData?.sumMissedLong, currentData.missedLong),
    };
  }

  const newChipPitch: ITotalRoundsAvg['chipPitch'] = { ...(existingTotalsAvg?.chipPitch || {}) };
  for (const clubType in currentTotals.chipPitch) {
    const currentData = currentTotals.chipPitch[clubType as keyof typeof currentTotals.chipPitch];
    const existingData = newChipPitch[clubType];

    const currentSumDistanceToHole = (currentData.averageHoleDistance || 0) * (currentData.attempts || 0);
    const currentSumScoreRelativeToPar = (currentData.averageShot || 0) * (currentData.attempts || 0);

    newChipPitch[clubType] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.attempts),
      sumUpDownMade: safeAdd(existingData?.sumUpDownMade, currentData.upDownMade),
      sumScoreRelativeToPar: safeAdd(existingData?.sumScoreRelativeToPar, currentSumScoreRelativeToPar),
      sumDistanceToHole: safeAdd(existingData?.sumDistanceToHole, currentSumDistanceToHole),
      sumShotsHoled: safeAdd(existingData?.sumShotsHoled, currentData.shotsHoled),
    };
  }

  const newGir = {
    sumGirMade: safeAdd(existingTotalsAvg?.gir?.sumGirMade, currentTotals.gir.totals),
    sumGirMadeIN: safeAdd(existingTotalsAvg?.gir?.sumGirMadeIN, currentTotals.gir.totalsIN),
    sumGirMadeOUT: safeAdd(existingTotalsAvg?.gir?.sumGirMadeOUT, currentTotals.gir.totalsOUT),
  };

  const newGirBogey = {
    sumGirBogeyMade: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMade, currentTotals.girBogey.totals),
    sumGirBogeyMadeIN: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMadeIN, currentTotals.girBogey.totalsIN),
    sumGirBogeyMadeOUT: safeAdd(existingTotalsAvg?.girBogey?.sumGirBogeyMadeOUT, currentTotals.girBogey.totalsOUT),
  };

  const newUpDown = {
    sumAttempts: safeAdd(existingTotalsAvg?.upDown?.sumAttempts, currentTotals.upDown.totals),
    sumSaved: safeAdd(existingTotalsAvg?.upDown?.sumSaved, currentTotals.upDown.saved),
  };

  const newScramble = {
    sumAttempts: safeAdd(existingTotalsAvg?.scramble?.sumAttempts, currentTotals.scramble.totals),
    sumSaved: safeAdd(existingTotalsAvg?.scramble?.sumSaved, currentTotals.scramble.saved),
  };

  const newPutts: ITotalRoundsAvg['putts'] = {
    sumTotals: safeAdd(existingTotalsAvg?.putts?.sumTotals, currentTotals.putts.totals),
    sumTotalsIN: safeAdd(existingTotalsAvg?.putts?.sumTotalsIN, currentTotals.putts.totalsIN),
    sumTotalsOUT: safeAdd(existingTotalsAvg?.putts?.sumTotalsOUT, currentTotals.putts.totalsOUT),
    sumPuttsGir: safeAdd(existingTotalsAvg?.putts?.sumPuttsGir, currentTotals.putts.puttsGir),
    sumPuttsGirIN: safeAdd(existingTotalsAvg?.putts?.sumPuttsGirIN, currentTotals.putts.puttsGirIn),
    sumPuttsGirOUT: safeAdd(existingTotalsAvg?.putts?.sumPuttsGirOUT, currentTotals.putts.puttsGirOut),
    countPutts1: safeAdd(existingTotalsAvg?.putts?.countPutts1, currentTotals.putts.putts1),
    countPutts2: safeAdd(existingTotalsAvg?.putts?.countPutts2, currentTotals.putts.putts2),
    countPutts3OrMore: safeAdd(existingTotalsAvg?.putts?.countPutts3OrMore, currentTotals.putts.putts3More),
    sumDistanceFirstPuttGir: safeAdd(existingTotalsAvg?.putts?.sumDistanceFirstPuttGir, currentTotals.putts.puttsDistGir),
    statisticsByRange: { ...(existingTotalsAvg?.putts?.statisticsByRange || {}) },
    overallStats: {
      sumPuttsMadeForBirdieOrBetter: safeAdd(existingTotalsAvg?.putts?.overallStats?.sumPuttsMadeForBirdieOrBetter, currentTotals.putts.puttsStatistics._puttsOverall.birdieBetter),
      countAttemptsForBirdieOrBetter: safeAdd(existingTotalsAvg?.putts?.overallStats?.countAttemptsForBirdieOrBetter, currentTotals.putts.puttsStatistics._puttsOverall.birdieBetter),
    }
  };

  for (const range in currentTotals.putts.puttsStatistics) {
    if (range === '_puttsOverall') continue;
    const currentData = currentTotals.putts.puttsStatistics[range as keyof Omit<typeof currentTotals.putts.puttsStatistics, '_puttsOverall'>];
    const existingData = newPutts.statisticsByRange[range];
    const currentSumPuttsTaken = (currentData.puttsAverage || 0) * (currentData.puttsAttempts || 0);
    const currentSumDistFirst = (currentData.distanceFirstPutt || 0);
    const currentSumDistSecond = (currentData.distanceSecondPutt || 0);

    newPutts.statisticsByRange[range] = {
      sumAttempts: safeAdd(existingData?.sumAttempts, currentData.puttsAttempts),
      sumHoled: safeAdd(existingData?.sumHoled, currentData.puttsHoled),
      sumPuttsTaken: safeAdd(existingData?.sumPuttsTaken, currentSumPuttsTaken),
      sumDistanceFirstPutt: safeAdd(existingData?.sumDistanceFirstPutt, currentSumDistFirst),
      sumDistanceSecondPutt: safeAdd(existingData?.sumDistanceSecondPutt, currentSumDistSecond),
      countSecondPutts: safeAdd(existingData?.countSecondPutts, currentData.numberSecondPutt),
      countPutts3OrMore: safeAdd(existingData?.countPutts3OrMore, currentData.putts3),
    };
  }

  const newSand = {
    sumAttempts: safeAdd(existingTotalsAvg?.sand?.sumAttempts, currentTotals.sand.totals),
    sumSaved: safeAdd(existingTotalsAvg?.sand?.sumSaved, currentTotals.sand.saved),
  };

  const newWater = {
    countPenalties: safeAdd(existingTotalsAvg?.water?.countPenalties, currentTotals.water.totals),
    countPenaltiesIN: safeAdd(existingTotalsAvg?.water?.countPenaltiesIN, currentTotals.water.totalsIN),
    countPenaltiesOUT: safeAdd(existingTotalsAvg?.water?.countPenaltiesOUT, currentTotals.water.totalsOUT),
  };

  const newOut = {
    countPenalties: safeAdd(existingTotalsAvg?.out?.countPenalties, currentTotals.out.totals),
    countPenaltiesIN: safeAdd(existingTotalsAvg?.out?.countPenaltiesIN, currentTotals.out.totalsIN),
    countPenaltiesOUT: safeAdd(existingTotalsAvg?.out?.countPenaltiesOUT, currentTotals.out.totalsOUT),
  };

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

  batch.set(totalsAvgDocRef, updatedTotalsAvgData, { merge: true });

};