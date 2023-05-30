import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn]);

  return isLoggedIn && children;
};

export default PrivateRoute;
