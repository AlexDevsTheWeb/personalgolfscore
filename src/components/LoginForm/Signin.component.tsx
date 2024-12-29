import LoginCard from '@/styles/card/LoginCard.style';
import SigninContainer from '@/styles/container/SigninContainer.styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import console from 'console';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FacebookIcon, SitemarkIcon } from '../../assets/CustomIcons.assets';
import GoogleLoginButton from './GoogleLoginButton.component';
// import { FacebookIcon, GoogleIcon, SitemarkIcon } from './CustomIcons';
// import ForgotPassword from './ForgotPassword';
// import AppTheme from './theme/AppTheme';
// import ColorModeSelect from './theme/ColorModeSelect';

const SignIn = (props: { disableCustomTheme?: boolean }) => {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const [inputErrorMessage, setInputErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (inputError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    debugger;
    await handleLogin(data.get('email'), data.get('password'));


  };

  const handleLogin = async (email: any, password: any) => {

    const auth = getAuth();

    console.log("---> ci passo di qui")
    try {
      debugger;
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log("logged in: ", user);
    }
    catch (error) {

      console.log("error: ", error as any)
    }


    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log("user: ", user);
    //     debugger;

    //     navigate('/dashboard')
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.log("CODE: ", error.code);
    //     console.log("MESSAGE: ", error.message);
    //   });


    // try {





    //   console.log("auth: ", auth);
    //   debugger;
    //   const result = await signInWithEmailAndPassword(auth, email, password);
    //   // Successful login, navigate to the desired page
    //   console.log("result: ", result);
    //   debugger;
    //   console.log('Login successful!');
    //   const user = result.user;

    //   const usersCollection = collection(db, 'users');
    //   const q = query(usersCollection, where("email", "==", email));
    //   const querySnapshot = await getDocs(q);

    //   if (!querySnapshot.empty) {
    //     dispatch(setLoginUser(user as any));
    //     debugger;
    //     // navigate('/dashboard');
    //   }
    //   // Replace with your navigation logic (e.g., using a router)
    //   // navigate('/home'); 
    //   //navigate('/dashboard')
    // } catch (error) {
    //   debugger;
    //   console.log("ERROR LOGGING IN: ", error);
    // }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    // const isValid = ValidateInputs(email, 'email');
    // const isValid = ValidateInputs(password, 'password');

    // if (!!isValid.error) {
    //   setInputError(true);
    //   setInputErrorMessage(isValid.errorMessage);
    // }

    const isValid = true;

    return isValid;
  };

  return (
    // <AppTheme {...props}>
    <>
      <CssBaseline enableColorScheme />
      <SigninContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <LoginCard variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"

            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
                error={inputError}
                helperText={inputErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={inputError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={inputError}
                helperText={inputErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={inputError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              // variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button> */}
            <GoogleLoginButton />
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"

                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </LoginCard>
      </SigninContainer>
      {/* </AppTheme>
    */}
    </>

  );
}

export default SignIn;
