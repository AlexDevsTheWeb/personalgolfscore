import { setLoginUser } from "@/features/user/user.slice";
import { IUser } from "@/types/user.types";
import { db } from "@/utils/firebase/firebase.utils";
import { writeUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        navigate('/login');
      }
      else {
        writeUserLocalStorage({ uid: docSnap.id })
        const user: IUser = {
          displayName: docSnap?.data().displayName,
          email: docSnap?.data().email,
          photoURL: result?.user.photoURL as string,
          uid: docSnap.id,
        };
        dispatch(setLoginUser(user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.log("ERROR LOGGIN IN WITH GOOGLE: ", error)
    }
  }


  return (
    <div>

      <button onClick={handleGoogleLogin}>Sign in with Google</button>

    </div>
  );
};

export default GoogleLoginButton;