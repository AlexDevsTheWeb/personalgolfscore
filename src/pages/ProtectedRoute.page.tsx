import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useSelector((store: any) => store.user);
  if (!user.uid) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;