import React, { useEffect, useState } from "react";
import { fetchUserWeeklyBorrStats } from "../../features/borrow/borrowApi";
import { scales } from "chart.js";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const UserBorrowChart = () => {
  const { user } = useSelector((state) => state.userInfo);

  const userId = user?._id;
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const payload = await fetchUserWeeklyBorrStats();

        console.log("📊 Weekly Chart Data:", payload);
        setChartData({
          labels: payload.labels || [],
          data: payload.data || [],
        });
      } catch (error) {
        console.error("Failed to load chart data", error);
      }
    };
    fetchChartData();
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Books Borrowed",
        data: chartData.data,
        backgroundColor: "#4e73df",
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "#f8f9fc",
        titleColor: "#1a1a1a",
        bodyColor: "#333",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
        },
        grid: {
          color: "#eee",
        },
      },
    },
  };
  return (
    <div>
      <h6 className="mb-3">Weekly Borrowing Activity</h6>
      {chartData?.labels.length > 0 ? (
        <Bar
          style={{ maxWidth: "400px", margin: "0 auto" }}
          data={data}
          options={options}
        />
      ) : (
        <p className="text-muted">No data available to display</p>
      )}
    </div>
  );
};

export default UserBorrowChart;
