import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import _ from "lodash";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/zustand";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const uid = readUserLocalStorage();
  const user = useAppStore((state) => state.user);
  const isLoading = useAppStore((state) => state.isLoadingUser);

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