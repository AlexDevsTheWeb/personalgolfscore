
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