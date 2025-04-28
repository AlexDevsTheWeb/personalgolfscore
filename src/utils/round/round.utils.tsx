import { CHIPCONDITION } from '@/enum/shots.enum';
import { IClubDetail, IClubType, IGolfBagData } from '@/types/player.types';
import { INewRound, IRoundFinalData, IRoundFinalDataProps } from '@/types/round.types';
import { IDistance, IDistanceSingle, IShots, ITotalDistanceAvg } from '@/types/roundData.types';
import { IRoundTotals } from '@/types/roundTotals.types';
import { db } from '@/utils/firebase/firebase.utils';
import { collection, doc, getDocs, serverTimestamp, Timestamp, WriteBatch } from 'firebase/firestore';
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

export const finalRoundGeneration = ({ round, holes, roundTotals, roundDistances }: IRoundFinalDataProps) => {
  const roundFinalData: IRoundFinalData = {
    roundMainData: round,
    roundHolesData: holes,
    roundTotalsData: roundTotals,
    roundDistancesData: roundDistances,
  }

  return roundFinalData;
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