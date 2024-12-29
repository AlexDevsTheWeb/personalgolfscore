import SignIn from "@/components/LoginForm/Signin.component";
// import { ReactComponent as IconLogo } from 'assett/icons/logo_white.svg';
// import { resetLogin } from "features/user/userSlice";
import * as React from "react";
import { useDispatch } from "react-redux";
// import { Stack } from "style";
// import { Wrapper } from "../assett/wrappers/loginWrapper";
// import LoginForm from "../components/login/LoginForm";


const LoginPage: React.FC = () => {
  const dispatch = useDispatch<any>();

  // React.useEffect(() => {
  //   dispatch(resetLogin());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SignIn />
  );
};

export default LoginPage;
