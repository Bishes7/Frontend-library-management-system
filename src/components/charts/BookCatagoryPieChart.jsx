import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BookCatagoryPieChart = () => {
  const data = {
    labels: ["Fiction", "Technology", "History", "Science", "Other"],
    datasets: [
      {
        label: "Books by Category",
        data: [20, 35, 15, 10, 5],
        backgroundColor: ["#0d6efd", "ffc107", "#198754", "dc3545", "#6c757d"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
      title: {
        display: true,
        text: "Book Categories",
        color: "white",
        font: { size: 18 },
      },
    },
  };
  return <Pie data={data} options={options} />;
};

export default BookCatagoryPieChart;
