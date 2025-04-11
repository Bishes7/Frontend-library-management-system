import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div>
      {/* NavBAR */}
      <Header />

      {/* Main Page */}
      <main className="main">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
