import { User } from "../../types/user.types";

export const writeUserLocalStorage = (user: User) => {
  const newUser = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
  }

  localStorage.setItem('user', JSON.stringify(newUser));

}

export const readUserLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}