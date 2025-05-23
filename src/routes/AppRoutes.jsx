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
  VerifyUser,
} from "../pages";
import { DefaultLayout } from "../components/layout/DefaultLayout ";
import { UserLayout } from "../components/layout/UserLayout";
import AllBooks from "../pages/books/AllBooks";
import Search from "../pages/books/Search";
import CartPage from "../pages/cart/CartPage";
import ThankyouPage from "../pages/thankyouPage/ThankyouPage";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const noAccess = (
  <Alert variant="danger" className="p-3 text-center fw-bold fs-3">
    This page is protected for Admins Only
  </Alert>
);
const AppRoutes = () => {
  const { user } = useSelector((state) => state.userInfo);

  const admin = user.role === "admin";

  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="all-books" element={<AllBooks />} />
        <Route path="search" element={<Search />} />
        <Route path="book/:slug" element={<BookLandingPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="activate-user" element={<VerifyUser />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      {/* PRIVATE PAGES  */}

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="my-borrow" element={<Borrow />} />
        <Route path="profile" element={<Profile />} />
        <Route path="thankyou" element={<ThankyouPage />} />

        {/* Only admin access pages */}
        <Route path="books" element={admin ? <Books /> : noAccess} />
        <Route path="new-book" element={admin ? <NewBookPage /> : noAccess} />
        <Route
          path="edit-book/:_id"
          element={admin ? <EditBookPage /> : noAccess}
        />
        <Route
          path="borrow"
          element={admin ? <Borrow admin={true} /> : noAccess}
        />
        <Route path="reviews" element={admin ? <ReviewPage /> : noAccess} />
        <Route path="all" element={admin ? <UserPage /> : noAccess} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
