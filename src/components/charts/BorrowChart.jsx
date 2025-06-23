import React, { useEffect, useState } from "react";
import { borrowStatsApi } from "../../features/borrow/borrowApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  plugins,
  scales,
} from "chart.js";

// Register the chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const BorrowChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await borrowStatsApi();
        const { labels, data } = response;

        setChartData({
          labels,
          datasets: [
            {
              label: "Books Borrowed",
              data,
              backgroundColor: "rgba(0, 123, 255, 0.8)",
            },
          ],
        });
      } catch (error) {
        console.error("Error laoding borrow stats:", error);
      }
    };

    getData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Weekly Book Borrows",
        color: "#fff",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <>
      {chartData.labels?.length ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p style={{ color: "white" }}>Loading Chart...</p>
      )}
    </>
  );
};
