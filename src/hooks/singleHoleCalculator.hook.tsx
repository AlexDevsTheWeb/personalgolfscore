
export const useGetVsPar = (strokes: number, par: number, total?: boolean) => {
  const diff = strokes - par;
  let result = {
    value: '',
    string: ''
  };
  switch (diff) {
    case 0:
      result = {
        value: `${diff}`,
        string: 'PAR'
      };
      break;
    case 1:
      result = {
        value: `+${diff}`,
        string: 'BOGEY'
      };
      break;
    case 2:
      result = {
        value: `+${diff}`,
        string: 'DOUBLE BOGEY'
      };
      break;
    case 3:
      result = {
        value: `+${diff}`,
        string: 'TRIPLE BOGEY'
      };
      break;
    case 4:
      result = {
        value: `+${diff}`,
        string: 'QUAD BOGEY'
      };
      break;
    case -1:
      result = {
        value: `${diff}`,
        string: 'BIRDIE'
      };
      break;
    case -2:
      result = {
        value: `${diff}`,
        string: 'EAGLE'
      };
      break;
    case -3:
      result = {
        value: `${diff}`,
        string: 'ALBATROSS'
      };
      break;
  }

  return result;
}

export const createStrokesBorder = (value: string) => {

  let result = '';
  switch (value) {
    case 'PAR':
      result = 'solid';
      break;
    case 'BOGEY':
      result = 'solid';
      break;
    case 'DOUBLE BOGEY':
      result = 'double';
      break;
    case 'TRIPLE BOGEY':
      result = 'double';
      break;
    case 'QUAD BOGEY':
      result = 'double';
      break;
    case 'BIRDIE':
      result = 'solid';
      break;
    case 'EAGLE':
      result = 'double';
      break;
    case 'ALBATROSS':
      result = 'double';
      break;
  }

  return result;
}

export const createStrokesBorderThickness = (value: string) => {

  let result = '';
  switch (value) {
    case 'PAR':
      result = '1px solid';
      break;
    case 'BOGEY':
      result = '1px solid';
      break;
    case 'DOUBLE BOGEY':
      result = '3px solid';
      break;
    case 'TRIPLE BOGEY':
      result = '3px solid';
      break;
    case 'QUAD BOGEY':
      result = '3px solid';
      break;
    case 'BIRDIE':
      result = '1px solid';
      break;
    case 'EAGLE':
      result = '3px solid';
      break;
    case 'ALBATROSS':
      result = '3px solid';
      break;
  }

  return result;
}

export const createStrokesBorderRoundness = (value: string) => {

  let result = '';
  switch (value) {

    case 'BIRDIE':
    case 'EAGLE':
    case 'ALBATROSS':
      result = '100%';
      break;
    default:
      result = '0%';
      break;
  }
  return result;
}
export const createStrokesBorderColor = (value: string) => {

  let result = '';
  switch (value) {

    case 'PAR':
      result = 'transparent';
      break;
    default:
      result = '#494949';
      break;
  }
  return result;
} 