import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useGetHoleValues = () => {
  const { putts, strokes, par, hcp } = useSelector((store: RootState) => store.newRound.holeTmp);
  const { round: { roundPlayingHCP, roundStrokes, roundHoles }
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { chipClubs } = useSelector((store: RootState) => store.golfBag);

  return { hcp, par, strokes, putts, roundPlayingHCP, roundStrokes, roundHoles, chipClubs };
}