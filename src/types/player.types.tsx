export interface IPlayer {
  playerID: string,
  firstName: string,
  lastName: string,
  dob: string,
  hcp: number,
  email: string
}

export type InitialStatePlayer = {
  isLoading: boolean;
  player: IPlayer;
}

export type PlayerPayload = {
  payload: PlayerResponse;
};

type PlayerResponse = {
  playerID: string,
  firstName: string,
  lastName: string,
  dob: string,
  hcp: number,
  email: string
}