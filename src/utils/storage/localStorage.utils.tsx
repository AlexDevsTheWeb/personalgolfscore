import { IUser } from "../../types/user.types";

export const writeUserLocalStorage = (user: IUser) => {
  const newUser = {
    email: user.email,
    uid: user.uid,
  }

  localStorage.setItem('user', JSON.stringify(newUser));
}

export const readUserLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user!).uid;
  }
  return null;
}