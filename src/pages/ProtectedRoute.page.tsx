import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import _ from "lodash";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/zustand";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const uid = readUserLocalStorage();
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
    if (_.isEmpty(user) && !isLoading && !uid) {
      navigate("/login");
    }
  }, [user])

  if (!uid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;