import LoginCard from '@/styles/card/LoginCard.style';
import SigninContainer from '@/styles/container/SigninContainer.styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SitemarkIcon } from '../../assets/CustomIcons.assets';
import GoogleLoginButton from './GoogleLoginButton.component';
import LoginForm from './LoginForm.component';
// import { FacebookIcon, GoogleIcon, SitemarkIcon } from './CustomIcons';
// import ForgotPassword from './ForgotPassword';
// import AppTheme from './theme/AppTheme';
// import ColorModeSelect from './theme/ColorModeSelect';

const SignIn = (props: { disableCustomTheme?: boolean }) => {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginSuccess = () => {
    // Handle successful login (e.g., navigate to another page)
    console.log('Login successful!');
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

          <LoginForm onLoginSuccess={handleLoginSuccess} />

          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <GoogleLoginButton />

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
