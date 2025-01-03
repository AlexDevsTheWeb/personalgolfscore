export interface IStablefordPointsProps {
  hcp: number;
  par: number;
  strokes: number;
  roundPlayingHCP: number;
  roundHoles: number;
}

export interface IGirProps {
  par: number;
  putts: number;
  strokes: number;
  bogey: boolean;
}

export interface IUDProps {
  girValue: number;
  chipClub: string;
  parValue: number;
  numberOfPutts: number;
  strokesValue: number;
  chipClubs: string[];
}
export interface IScrambleProps {
  girValue: number;
  parValue: number;
  strokesValue: number;
}