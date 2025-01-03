import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.utils";

export const login = async (auth: Auth, email: string, password: string) => {

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const userDocRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap;
    }
    else {
      return null;
    }
    // Signed in

  } catch (error: any) {
    console.error("Login error:", error);
    if (error.code === 'auth/invalid-email') {
      console.error("Invalid email format.");
    } else if (error.code === 'auth/wrong-password') {
      console.error("Incorrect password.");
    } else {
      console.error("Unknown login error:", error);
    }
  }
};