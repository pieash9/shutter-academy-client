/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Loader from "../components/Shared/Loader";

const AdminRoute = ({ children }) => {
  const { user,loading } = useAuth()
    const location = useLocation()
    const [isAdmin,isAdminLoading] = useAdmin()

  if(loading || isAdminLoading){
    return <Loader/>
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{from:location}} replace/>;
};

export default AdminRoute;
