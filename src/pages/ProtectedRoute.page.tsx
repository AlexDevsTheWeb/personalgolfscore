import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useSelector((store: any) => store.user);
  const uid = readUserLocalStorage();

  console.log("userStorage: ", readUserLocalStorage());
  if (!user.uid && !uid) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;