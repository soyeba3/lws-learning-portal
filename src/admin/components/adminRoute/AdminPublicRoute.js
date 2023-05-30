import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../../hooks/useAdminAuth";

const AdminPublicRoute = ({ children }) => {
  const isLoggedIn = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/admin");
  }, [isLoggedIn]);

  return !isLoggedIn && children;
};

export default AdminPublicRoute;
