import { setLoginUser } from "@/features/user/user.slice";
import { db } from "@/utils/firebase/firebase.utils";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
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

      //check if user exists in firesrtore
      // const userDocRef = doc(db, 'users', user.uid);
      // const docSnap = await getDoc(userDocRef);

      // console.log("USER: ", user);
      // console.log("userDocRef: ", userDocRef);
      // console.log("docSnap: ", docSnap);

      // if (!docSnap.exists()) {
      //   console.log("USER DOES NOT EXIST in FIRESTORE");
      //   //user does not exist, add user to firestore
      //   navigate('/login');
      // }
      // else {
      //   navigate('/dashboard');
      // }

      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        dispatch(setLoginUser(user as any));
        navigate('/dashboard');
      }
      else {
        console.log("USER DOES NOT EXIST in FIRESTORE");
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