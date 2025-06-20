import React, { useState } from "react";
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
} from "chart.js";

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

  return <Line data={data} options={options} />;
};

export default UserSignUpChart;
