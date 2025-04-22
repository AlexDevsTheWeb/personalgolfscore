
export interface IPlayer {
  playerID: string,
  firstName: string,
  lastName: string,
  DOB: {
    seconds: number,
    nanoseconds: number,
  },
  HCP: number,
  email: string
}

export type InitialStatePlayer = {
  isLoading: boolean;
  error: string,
  errorMessage: string,
  player: IPlayerDetails;
}

// export type PlayerPayload = {
//   payload: PlayerResponse;
// };

type PlayerResponse = {
  playerID: string,
  firstName: string,
  lastName: string,
  dob: string,
  hcp: number,
  email: string
}


export type IGolfBagData = IClubType[];
interface IClubType {
  typeName: string;
  details: IClubDetail[];
}
interface IClubDetail {
  name: string;
  loft: number;
  imageURL: string;
  clubIdentifier: string;
  selected: boolean;
  clubNumber?: string | number; // Optional
}
export interface IPlayerDetails {
  uid: string;
  displayName: string | null;
  email: string | null;
  firstName?: string;
  lastName?: string;
  HCP?: number;
  DOB?: number; // Assuming DOB is stored as timestamp milliseconds
  photoURL?: string | null;
  golfbag?: IGolfBagData; // Use the GolfBagData type
  rounds?: any,
  // ... other player fields
}