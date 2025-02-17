import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../api";

const ProtectedRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
