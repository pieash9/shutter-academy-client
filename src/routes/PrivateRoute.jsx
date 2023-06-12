/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router";

import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader";
import { toast } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  toast.error("Login First");
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
