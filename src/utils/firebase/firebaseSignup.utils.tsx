import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.utils";

interface IUserInfo {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

export const registerUser = async (auth: Auth, { email, firstName, lastName, password }: IUserInfo) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userInfo = {
      email: email,
      displayName: `${firstName} ${lastName}`,
    };

    const newUser = await setDoc(doc(db, "users", userCredential.user.uid), userInfo);

    return newUser;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};