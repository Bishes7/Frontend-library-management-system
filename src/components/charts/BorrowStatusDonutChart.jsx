import React from "react";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BorrowStatusDonutChart = () => {
  const data = {
    labels: ["Returned", "Overdue"],
    datasets: [
      {
        lebel: "Borrow Status",
        data: [75, 25],
        backgroundColor: ["#198754", "#dc3545"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    cutout: "70%", // creates donut hole
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
      titlle: {
        display: true,
        text: "Book Return Status",
        color: "white",
        font: { size: 18 },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default BorrowStatusDonutChart;
