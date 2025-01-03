import { setLoginUser } from "@/features/user/user.slice";
import { IUser } from "@/types/user.types";
import { login } from "@/utils/firebase/firebaseLogin.utils";
import { writeUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    const auth = getAuth();
    try {
      const docSnap = await login(auth, email, password);
      if (docSnap) {
        writeUserLocalStorage({ uid: docSnap.id })
        const user: IUser = {
          displayName: docSnap?.data().displayName,
          email: docSnap?.data().email,
          photoURL: docSnap?.data().photoURL,
          uid: docSnap.id,
        };
        dispatch(setLoginUser(user));

      }
      navigate('/dashboard');
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm
