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
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  hcp: number;
  out: number
  par: number;
  points: number;
  pointsAvg: number;
  putts: number;
  puttsLength: number[];
  sand: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  upDown: string;
  water: number;
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