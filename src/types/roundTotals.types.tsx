
export interface IState {
  playerID: string;
  totals: IShotsTotals[];
}

export interface IShotsTotals {
  roundID: string;
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

export type InitialStateRoundsTotals = {
  isLoading: boolean;
  playerID: string;
  totals: IShotsTotals[];
}

export type RoundsTotalsPayload = {
  payload: IState;
}