export interface IState {
  roundID: string;
  playerID: string;
  shots: IShots[];
}

export interface IShots {
  holeNumber: number;
  chipClub: string;
  distance: number;
  driveDistance: number;
  fairway: string;
  fir: number;
  firstPutt: number;
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  hcp: number;
  out: number
  par: number;
  points: number;
  putts: number;
  sand: number;
  secondPutt: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  upDown: string;
  water: number;
}

export interface IShotsTotals2 {
  distance: number;
  putts: number;
  puttsTotals: number;
}

export type InitialStateRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  shots: IShots[];
}

export type InitialStateNewRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  holesCompleted: number;
  shots: IShots[];
}

export type RoundsDataPayload = {
  payload: IState;
}