import React from "react";
import { BorrowChart } from "../../components/charts/BorrowChart";
import UserSignUpChart from "../../components/charts/UserSignUpChart";
import BookCatagoryPieChart from "../../components/charts/BookCatagoryPieChart";
import BorrowStatusDonutChart from "../../components/charts/BorrowStatusDonutChart";
import DashBoardSummaryStats from "../../components/dashboardSumamryStats/DashBoardSummaryStats";
import Typewriter from "typewriter-effect";
import { useSelector } from "react-redux";
import UserDashboardContent from "../../features/user/UserDashboardContent";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.userInfo);
  const isAdmin = user?.role === "admin";

  return (
    <div className="container mt-2 fade-in">
      <div className="mb-3 ">
        <h3 className="text-dark typewriter fw-bold">
          <Typewriter
            options={{
              strings: [`Welcome Back ${user?.fName || "User"} !!`],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </h3>
      </div>

      {isAdmin ? (
        <>
          <DashBoardSummaryStats />

          <div className="row g-3 mt-3">
            <div className="col-lg-3 col-md-6">
              <div className="equal-height-card p-3 shadow-sm fade-in">
                <BorrowChart />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 fade-in">
              <div className="equal-height-card p-3 shadow-sm fade-in">
                <UserSignUpChart />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="equal-height-card p-3 shadow-sm fade-in">
                <BookCatagoryPieChart />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="equal-height-card p-3 shadow-sm fade-in">
                <BorrowStatusDonutChart />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <UserDashboardContent />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
