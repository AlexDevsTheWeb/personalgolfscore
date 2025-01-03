import { getUserDetails } from "@/features/user/user.slice";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((store: any) => store.user);
  const uid = readUserLocalStorage();
  console.log('USER SHARED LAYOUT', user);
  useEffect(() => {

    if (_.isEmpty(user)) {
      const uid = readUserLocalStorage();
      dispatch(getUserDetails(uid));
    }

  }, [user, dispatch]);

  if (!uid) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;