import { setLoginUser } from "@/features/user/user.slice";
import { IUser } from "@/types/user.types";
import { db } from "@/utils/firebase/firebase.utils";
import { writeUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../../assets/CustomIcons.assets";

const GoogleLoginButton = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      const photoURL = result.user.photoURL;
      const userDocRef = doc(db, 'players', user.uid);
      const docSnap = await getDoc(userDocRef);



      if (!docSnap.exists()) {
        navigate('/login');
      }
      else {

        const userRef = doc(db, "players", docSnap.id);

        await updateDoc(userRef, {
          "photoURL": photoURL as string
        });

        debugger;
        writeUserLocalStorage({ uid: docSnap.id })
        const user: IUser = {
          displayName: docSnap?.data().displayName,
          email: docSnap?.data().email,
          photoURL: photoURL as string,
          uid: docSnap.id,
        };
        dispatch(setLoginUser(user));
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleGoogleLogin}
      startIcon={<GoogleIcon />}
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;