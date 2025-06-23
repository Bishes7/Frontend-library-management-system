import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../features/borrowStatus/borrowStatsStatus";
import { FaBook, FaUser, FaExchangeAlt } from "react-icons/fa";

const DashBoardSummaryStats = () => {
  const [summarystats, setSummaryStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrows: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetchDashboardStats();
        const { totalBooks, totalBorrows, totalUsers } = response;
        setSummaryStats(response);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="summary-card text-center shadow-sm">
          <b>Total Books</b> <FaBook className="me-2" />
          <h2>{summarystats.totalBooks}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card text-center shadow-sm">
          <b>Total Users</b> <FaUser className="me-2" />
          <h2>{summarystats.totalUsers}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card text-center shadow-sm ">
          <b>Total Borrows</b> <FaExchangeAlt className="me-2" />
          <h2>{summarystats.totalBorrows}</h2>
        </div>
      </div>
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="small-info-card p-3 shadow-sm rounded">
            <h6 className="text-light">📘 Top Book</h6>
            <h5>JavaScript Mastery</h5>
          </div>
        </div>

        <div className="col-md-6">
          <div className="small-info-card p-3 shadow-sm rounded">
            <h6 className="text-light">👤 Top Reader</h6>
            <h5>Bishes (5 borrows)</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSummaryStats;
