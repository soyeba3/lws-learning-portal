import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn]);

  return !isLoggedIn && children;
};

export default PublicRoute;
