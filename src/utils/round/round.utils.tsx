import { CHIPCONDITION } from '@/enum/shots.enum';
import { IClubDetail, IClubType, IGolfBagData } from '@/types/player.types';
import { IRoundFinalData, IRoundFinalDataProps } from '@/types/round.types';
import { IDistance, IDistanceSingle, IShots } from '@/types/roundData.types';
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

const calculateAvg = (values: number[]): number => {
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