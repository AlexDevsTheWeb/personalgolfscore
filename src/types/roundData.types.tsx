interface IState {
  roundID: string;
  playerID: string;
  roundCourse: string;
  roundDate: string;
  shots: IShots[];
}

export interface IShots {
  holeNumber: number;
  chipClub: string;
  distance: number;
  driveDistance: number;
  fairway: number;
  fir: number;
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  greenSideL: number;
  greenSideO: number;
  greenSideR: number;
  greenSideS: number;
  hcp: number;
  out: number
  par: number;
  bounceBack: number,
  bounceForward: number,
  points: number;
  pointsAvg: number;
  putts: number;
  puttsLength: number[];
  puttsUnder2: number;
  putts2_4: number;
  putts4_6: number;
  putts6_10: number;
  puttsOver10: number;
  sand: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  toGreenMetersOver100: number;
  toGreenMeters80_100: number;
  toGreenMeters60_80: number;
  toGreenMetersUnder60: number;
  upDown: string;
  upDownX: number;
  upDownN: number;
  upDownE: number;
  scramble: number;
  water: number;
}

export type InitialStateRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  roundDate: string;
  roundCourse: string;
  shots: IShots[];
}

export type InitialStateNewRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  holesCompleted: number;
  holes: IShots[];
}

export type RoundsDataPayload = {
  payload: IState;
}

export interface IRoundInitialState {
  isLoading: boolean;
  mainData: IRoundMainData;
  holes: IRoundHoles[];
}

export interface IRoundPayload {
  mainData: IRoundMainData;
  holes: IRoundHoles[] | [];
}

export interface IRoundMainData {
  playerID: string,
  roundID: number,
  roundDate: string,
  roundCourse: string,
}

export interface IRoundHoles {
  holeNumber: number;
  chipClub: string;
  distance: number;
  driveDistance: number;
  fairway: number;
  fir: number;
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  greenSideL: number;
  greenSideO: number;
  greenSideR: number;
  greenSideS: number;
  hcp: number;
  out: number
  par: number;
  bounceBack: number,
  bounceForward: number,
  points: number;
  pointsAvg: number;
  putts: number;
  puttsLength: number[];
  puttsUnder2: number;
  putts2_4: number;
  putts4_6: number;
  putts6_10: number;
  puttsOver10: number;
  sand: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  toGreenMetersOver100: number;
  toGreenMeters80_100: number;
  toGreenMeters60_80: number;
  toGreenMetersUnder60: number;
  upDown: string;
  upDownX: number;
  upDownN: number;
  upDownE: number;
  scramble: number;
  water: number;
}