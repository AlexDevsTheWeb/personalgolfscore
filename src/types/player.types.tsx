export interface IPlayer {
  DOB: {
    seconds: number;
    nanoseconds: number;
  };
  HCP: number;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  userID: string;
}

export type InitialStatePlayer = {
  isLoading: boolean;
  player: IPlayer;
}

export type PlayerPayload = {
  payload: PlayerResponse;
};

export type PlayerResponse = {
  DOB: {
    seconds: number;
    nanoseconds: number;
  };
  HCP: number;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  userID: string;
}