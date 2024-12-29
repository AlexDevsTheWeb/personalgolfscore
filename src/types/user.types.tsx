export interface User {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

export interface InitialStateUser {
  isLoading: boolean;
  user: User;
}