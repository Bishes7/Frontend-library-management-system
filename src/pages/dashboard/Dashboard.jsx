import React from "react";
import { Col, Row } from "react-bootstrap";
import { BorrowChart } from "../../components/charts/BorrowChart";
import UserSignUpChart from "../../components/charts/UserSignUpChart";
import BookCatagoryPieChart from "../../components/charts/BookCatagoryPieChart";
import RecentBooksTable from "../../components/charts/RecentBooksTable";
import BorrowStatusDonutChart from "../../components/charts/BorrowStatusDonutChart";
import DashBoardSummaryStats from "../../components/dashboardSumamryStats/DashBoardSummaryStats";

export const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div>
        <DashBoardSummaryStats />
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <BorrowChart />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <UserSignUpChart />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <BookCatagoryPieChart />
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <BorrowStatusDonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
