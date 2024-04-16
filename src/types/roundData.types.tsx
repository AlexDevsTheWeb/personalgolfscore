export interface IState {
  roundID: string;
  playerID: string;
  shots: IShots[];
}

export interface IShots {
  holeNumber: number;
  distance: number;
  hcp: number;
  par: number;
  strokes: number;
  points: number;
  teeClub: string;
  fir: number;
  gir: boolean;
  putts: number;
  sand: number;
  water: number;
  out: number;
}

export type InitialStateRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  shots: IShots[];
}

export type RoundsDataPayload = {
  payload: IState;
}