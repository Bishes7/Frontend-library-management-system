import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  Dashboard,
  SignUpPage,
  LogInPage,
  ForgotPasswordPage,
} from "../pages";
import DefaultLayout from "../components/layout/DefaultLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* PRIVATE PAGES  */}
      <Route path="/user" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
