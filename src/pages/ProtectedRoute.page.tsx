import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import _ from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const uid = readUserLocalStorage();
  const { user, isLoading } = useSelector((store: any) => store.user);

  useEffect(() => {
    if (_.isEmpty(user) && !isLoading && !uid) {
      navigate("/login");
    }
  }, [user])

  if (!uid) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;