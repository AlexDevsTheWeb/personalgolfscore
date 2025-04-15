// import { setLoginUser } from "@/features/user/user.slice";
// import { IUser } from "@/types/user.types";
// import { login } from "@/utils/firebase/firebaseLogin.utils";
// import { writeUserLocalStorage } from "@/utils/storage/localStorage.utils";
// import { getAuth } from "@firebase/auth";

// export const useUserLogin = async () => {
//   const auth = getAuth();
//   try {
//     const docSnap = await login(auth, email, password);

//     if (docSnap) {
//       writeUserLocalStorage({ uid: docSnap.id })
//       const user: IUser = {
//         displayName: docSnap?.data().displayName,
//         email: docSnap?.data().email,
//         photoURL: docSnap?.data().photoURL,
//         uid: docSnap.id,
//       };
//       dispatch(setLoginUser(user));

//     }
//     navigate('/dashboard');
//   } catch (error) {
//     setError(error as Error);
//   }
// }

export const useLogin = () => { }