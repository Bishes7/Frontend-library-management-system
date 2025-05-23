import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import AuthRoute from "../auth/AuthRoute";
import { useSelector } from "react-redux";

export const UserLayout = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <AuthRoute>
      {/* NavBAR */}
      <Header />

      <div className="d-flex">
        <div
          className="bg-dark text-white fw-bold p-3"
          style={{ width: "200px" }}
        >
          <div className="p-3 text-warning">
            <div>Welcome Back</div>
            <h4>{user.fName}</h4>
          </div>
          <hr />
          <SideBar />
        </div>

        {/* Main Page */}
        <main className="user-main ">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </AuthRoute>
  );
};
