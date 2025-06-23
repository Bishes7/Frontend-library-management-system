import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchborrowChartStatus } from "../../features/borrowStatus/borrowStatsStatus";

ChartJS.register(ArcElement, Tooltip, Legend);

const BorrowStatusDonutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchborrowChartStatus();

        setChartData({
          labels: response.labels,
          datasets: [
            {
              label: "Borrow Status",
              data: response.data,
              backgroundColor: ["#36A2EB", "#FF6384"], // You can customize
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading donut chart:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    cutout: "60%", // makes it donut
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 13 },
          boxWidth: 18,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Borrow Status",
        color: "#fff",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default BorrowStatusDonutChart;
