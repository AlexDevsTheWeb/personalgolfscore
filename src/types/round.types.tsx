export interface IState {
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