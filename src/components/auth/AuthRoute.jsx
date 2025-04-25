import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  // user real data
  const { user } = useSelector((state) => state.userInfo);
  const isAuth = user?._id;

  return isAuth ? children : <Navigate to="/login" />;
};

export default AuthRoute;
