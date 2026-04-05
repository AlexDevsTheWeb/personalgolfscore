
export const isTheRightClub = (wanted: string, teeClub: string) => {

  let correctClub = '';
  let isTheRightClub = false;

  if (!teeClub) {
    return false;
  }

  switch (teeClub) {
    case 'i1':
    case 'i2':
    case 'i3':
    case 'i4':
    case 'i5':
    case 'i6':
    case 'i7':
    case 'i8':
    case 'i9':
      correctClub = 'IRONS';
      break;
    default:
      correctClub = teeClub;
      break;
  }

  isTheRightClub = wanted === correctClub
    ? true
    : correctClub.includes(wanted)
      ? true
      : false;

  return isTheRightClub;
}

export const isTheRightClubFw = (clubCategoryIdentifier: string, toGreenClub: string): boolean => {
  if (!toGreenClub) {
    return false;
  }
  const upperToGreenClub = toGreenClub.toUpperCase(); // Normalize toGreenClub for case-insensitive matching

  switch (clubCategoryIdentifier) {
    case 'FW':
      // Matches '3W', '5W', 'FW', 'FAIRWAY WOOD', etc.
      return ['3W', '4W', '5W', '7W', 'FW', 'FAIRWAY WOOD'].some(fw => upperToGreenClub.startsWith(fw));
    case 'HY':
      // Matches '3H', '4H', 'HY', 'HYBRID', etc.
      return ['2H', '3H', '4H', '5H', 'HY', 'HYBRID'].some(hy => upperToGreenClub.startsWith(hy));
    case 'LONG_IRON':
      // Matches 'I4', 'I5', 'I6'
      return ['I4', 'I5', 'I6'].includes(upperToGreenClub);
    case 'MID_IRON':
      // Matches 'I7', 'I8', 'I9'
      return ['I7', 'I8', 'I9'].includes(upperToGreenClub);
    default:
      return false;
  }
};

export const isTheRightClubChip = (wanted: string, chipClub: string) => {
  let isTheRightClub = false;

  if (!chipClub) {
    return false;
  }

  switch (wanted) {
    case 'B':
      if (chipClub === 'Bunker') isTheRightClub = true;
      break;
    default:
      if (chipClub.toUpperCase() === wanted.toUpperCase()) isTheRightClub = true;
      break;
  }

  return isTheRightClub;
}

/**
 * Checks if a value falls within a specific zone defined by two boundaries.
 * The behavior depends on the boundary values:
 * - boundary1=0, boundary2!=0: value > boundary2 (e.g., iAmintheZone(0, 10, val) -> val > 10)
 * - boundary1!=0, boundary2=0: value <= boundary1 (e.g., iAmintheZone(2, 0, val) -> val <= 2)
 * - boundary1!=0, boundary2!=0: value > Math.min(b1,b2) AND value <= Math.max(b1,b2) (e.g., iAmintheZone(2,4,val) -> val > 2 && val <= 4)
 * - boundary1=0, boundary2=0: true (all values)
 */
export const iAmintheZone = (start: number, finish: number, shots: number) => {
  let iAmintheZone = false;

  if (start === 0 && finish !== 0) {
    iAmintheZone = shots > finish;
  }
  if (start !== 0 && finish === 0) {
    iAmintheZone = shots <= start;
  }
  if (start !== 0 && finish !== 0) {
    const min = Math.min(start, finish);
    const max = Math.max(start, finish);
    iAmintheZone = (shots > min) && (shots <= max);
  }
  if (start === 0 && finish === 0) {
    iAmintheZone = true;
  }
  return iAmintheZone;
}