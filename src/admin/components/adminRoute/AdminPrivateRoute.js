import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../../hooks/useAdminAuth";

const AdminPrivateRoute = ({ children }) => {
  const isLoggedIn = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/admin/login");
  }, [isLoggedIn]);

  return isLoggedIn && children;
};

export default AdminPrivateRoute;
