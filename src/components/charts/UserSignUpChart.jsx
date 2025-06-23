import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  scales,
  plugins,
} from "chart.js";
import { fetchWeeklyUserStats } from "../../features/user/userApi";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  LineElement,
  Legend
);

export const UserSignUpChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // useEffect to fetch the data
  useEffect(() => {
    const getData = async () => {
      try {
        const { labels, data } = await fetchWeeklyUserStats();

        setChartData({
          labels,
          datasets: [
            {
              label: "User Signups",
              data,
              fill: true,
              borderColor: "#ffc107",
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading signup stats", error);
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
        text: "Weekly User Signups",
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

  return <Line data={chartData} options={options} />;
};

export default UserSignUpChart;
