import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  Dashboard,
  SignUpPage,
  LogInPage,
  ForgotPasswordPage,
  Books,
  EditBookPage,
  NewBookPage,
  UserPage,
  ReviewPage,
  BookLandingPage,
  Profile,
  Borrow,
} from "../pages";
import { DefaultLayout } from "../components/layout/DefaultLayout ";
import { UserLayout } from "../components/layout/UserLayout";

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

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="new-book" element={<NewBookPage />} />
        <Route path="edit-book" element={<EditBookPage />} />
        <Route path="book-landing" element={<BookLandingPage />} />
        <Route path="reviews" element={<ReviewPage />} />
        <Route path="all" element={<UserPage />} />
        <Route path="borrow" element={<Borrow />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
