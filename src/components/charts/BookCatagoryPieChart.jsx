import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { fetchBookCategoryStats } from "../../features/books/bookApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const BookCatagoryPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // useEffect to render fetched data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchBookCategoryStats();
        const { labels, data } = response;

        setChartData({
          labels,
          datasets: [
            {
              label: "Books by Category",
              data,
              backgroundColor: [
                "#0d6efd",
                "#ffc107",
                "#198754",
                "dc3545",
                "6c757d",
                "6610f2",
                "#fd7e14",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading books catagory stats", error);
      }
    };
    getData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 10,
          },
          boxWidth: 9,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: "Book Categories",
        color: "#fff",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default BookCatagoryPieChart;
