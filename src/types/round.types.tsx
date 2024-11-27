export interface IPayloadActionNewHole {
  holeAdjusted: any,
  roundPlayingHCP: number
  roundHoles: number,
  holesCompleted: number
};

interface IState {
  playerID: string,
  rounds: IRounds[]
}

export interface IRounds {
  roundID: string,
  roundDate: string,
  roundCourse: string,
  roundHoles: number,
  roundTee: string,
  roundPar: number,
  roundPlayingHCP: number,
  roundStrokes: number
}

export type InitialStateRounds = {
  isLoading: boolean;
  playerID: string;
  rounds: IRounds[];
}

export type RoundPayload = {
  payload: IState;
};

export interface INewRound {
  roundID: string,
  roundDate: any,
  roundCourse: string,
  roundHoles: number,
  roundTee: string,
  roundPar: number,
  roundPlayingHCP: number,
  roundNumber: number
}
export type InitialStateNewRound = {
  isLoading: boolean;
  isSaved: boolean;
  playerID: string;
  setFirstHole: boolean;
  round: INewRound;
}