import React from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, Dashboard } from "../pages";
import DefaultLayout from "../components/layout/DefaultLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route
        path="/"
        element={
          <DefaultLayout>
            <HomePage />
          </DefaultLayout>
        }
      />

      {/* PRIVATE PAGES  */}
      <Route path="/user" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
