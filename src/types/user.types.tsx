
export interface IUser {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

export interface InitialStateUser {
  isLoading: boolean;
  user: IUser;
  rounds: IUser;
}