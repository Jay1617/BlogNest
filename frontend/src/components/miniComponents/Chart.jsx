import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Chart = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/blog/myblogs",
        { withCredentials: true }
      );
      setMyBlogs(data.blogs);
    };
    fetchMyBlogs();
  }, []);

  const categoryCounts = myBlogs.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {});

  const dynamicColors = () => {
    const colors = [];
    for (let i = 0; i < Object.keys(categoryCounts).length; i++) {
      colors.push(`hsl(${(i * 360) / Object.keys(categoryCounts).length}, 70%, 50%)`);
    }
    return colors;
  };

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Blog Categories",
        data: Object.values(categoryCounts),
        backgroundColor: dynamicColors(),
        hoverBackgroundColor: dynamicColors().map(color => color.replace("50%", "60%")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "whitesmoke",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
        backgroundColor: "#333",
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <section className="chart-container" style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>BLOG CATEGORY ANALYTICS</h3>
      <Doughnut data={data} options={options} style={styles.chart} />
    </section>
  );
};

const styles = {
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    // backgroundColor: "#f8f9fa",
    color: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "600px",
  },
  chartTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "whitesmoke",
  },
  chart: {
    width: "100%",
    height: "100%",
    maxWidth: "500px",
  },
};

export default Chart;
