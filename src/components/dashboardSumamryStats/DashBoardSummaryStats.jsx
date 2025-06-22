import React, { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../features/borrowStatus/borrowStatsStatus";

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
          <h6>Total Books</h6>
          <h2>{summarystats.totalBooks}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card text-center shadow-sm">
          <h6>Total Users</h6>
          <h2>{summarystats.totalUsers}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="summary-card text-center shadow-sm">
          <h6>Total Borrows</h6>
          <h2>{summarystats.totalBorrows}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSummaryStats;
