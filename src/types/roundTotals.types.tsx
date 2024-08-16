
export interface IState {
  playerID: string;
  totals: IShotsTotals[];
}

export interface INewState {
  playerID: string;
  totals: INewShotsTotals;
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
  left: number;
  right: number;
  gir: number;
  putts: number;
  sand: number;
  water: number;
  out: number;
}

export interface INewShotsTotals {
  roundID: string;
  holeNumber: number;
  distance: number;
  hcp: number;
  par: number;
  strokes: number;
  points: number;
  teeClub: string;
  fir: number;
  left: number;
  right: number;
  gir: number;
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

export type InitialStateNewRoundsTotals = {
  isLoading: boolean;
  playerID: string;
  totals: INewShotsTotals;
}

export type NewRoundsTotalsPayload = {
  payload: IState;
}