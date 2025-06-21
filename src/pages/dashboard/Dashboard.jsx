import React from "react";
import { Col, Row } from "react-bootstrap";
import { BorrowChart } from "../../components/charts/BorrowChart";
import UserSignUpChart from "../../components/charts/UserSignUpChart";
import BookCatagoryPieChart from "../../components/charts/BookCatagoryPieChart";
import RecentBooksTable from "../../components/charts/RecentBooksTable";
import BorrowStatusDonutChart from "../../components/charts/BorrowStatusDonutChart";

export const Dashboard = () => {
  return (
    <Row className="mt-2">
      <Col md={4}>
        <div className="bg-dark p-3 rounded shadow">
          <BorrowChart />
        </div>
      </Col>
      <Col md={4}>
        <div className="bg-dark p-4 rounded shadow mb-4">
          <UserSignUpChart />
        </div>
      </Col>
      <Col md={4}>
        <div className="bg-dark p-3 rounded shadow mb-4">
          <BookCatagoryPieChart />
        </div>
      </Col>
      <Row>
        <Col md={4}>
          <RecentBooksTable />
        </Col>
        <Col md={4}>
          <div className="bg-dark p-4 rounded shadow mb-4">
            <BorrowStatusDonutChart />
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default Dashboard;
