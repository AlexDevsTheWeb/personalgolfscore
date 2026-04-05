import { IUser } from "@/types/user.types";
import { login } from "@/utils/firebase/firebaseLogin.utils";
import { writeUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/zustand";

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const setLoginUser = useUserStore((state) => state.setLoginUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setLoginUser(user);

      }
      navigate('/dashboard');
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailErrorMessage}
          color={emailError ? 'error' : 'primary'}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextField
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordErrorMessage}
          color={passwordError ? 'error' : 'primary'}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={validateInputs}
      >
        Sign in
      </Button>

    </Box>
  );
};

export default LoginForm













