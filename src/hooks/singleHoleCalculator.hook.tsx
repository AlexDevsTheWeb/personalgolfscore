import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useGetHoleValues = () => {
  const { putts, strokes, par, hcp } = useSelector((store: RootState) => store.newRound.holeTmp);
  const { round: { roundPlayingHCP, roundStrokes, roundHoles }
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { chipClubs } = useSelector((store: RootState) => store.golfBag);

  return { hcp, par, strokes, putts, roundPlayingHCP, roundStrokes, roundHoles, chipClubs };
}

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
        string: 'DOUBLE BOGEY'
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