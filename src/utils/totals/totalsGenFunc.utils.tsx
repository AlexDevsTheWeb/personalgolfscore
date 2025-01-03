
export const isTheRightClub = (wanted: string, teeClub: string) => {

  let correctClub = '';
  let isTheRightClub = false;

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

export const isTheRightClubFw = (start: string, toGreenClub: string) => {
  const clubGroups = {
    '4w': ['FAIRWAY WOOD', 'HYBRID'],
    'i4': ['i4', 'i5', 'i6'],
    'i7': ['i8', 'i8', 'i9'],
  } as any;

  return clubGroups[start]?.includes(toGreenClub) ?? false;
};

export const isTheRightClubChip = (wanted: string, chipClub: string) => {
  let isTheRightClub = false;

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

export const iAmintheZone = (start: number, finish: number, shots: number) => {
  let iAmintheZone = false;

  if (start === 0 && finish !== 0) {
    iAmintheZone = shots > finish;
  }
  if (start !== 0 && finish === 0) {
    iAmintheZone = shots <= start;
  }
  if (start !== 0 && finish !== 0) {
    iAmintheZone = (shots > start) && (shots <= finish);
  }
  if (start === 0 && finish === 0) {
    iAmintheZone = true;
  }

  return iAmintheZone;
}

export const divide = (first: number, second: number) => {
  let result = 0;
  if (first !== 0 && (second !== 0 || second !== 0.00)) {
    result = first / second;
  }

  return result
}