import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* NavBAR */}
      <Header />

      {/* Main Page */}
      <main className="main">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
