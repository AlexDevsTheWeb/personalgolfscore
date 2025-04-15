import { registerUser } from "@/utils/firebase/firebaseSignup.utils";
import { Copyright } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function SignupForm() {
  const auth = getAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;

    try {

      const newUser = await registerUser(auth, { email, password, firstName, lastName });

    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}