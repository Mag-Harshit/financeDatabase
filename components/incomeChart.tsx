// components/IncomeChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IncomeChartProps {
  data: {
    id: number;
    source: string;
    income: number;
    month: number;
    date: number;
  }[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((row) => row.month + "/" + row.date),
    datasets: [
      {
        label: "Income by Date",
        data: data.map((row) => row.income),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1, // Adjust for line smoothness
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // Adjust based on your needs
        },
      },
      y: {
        title: {
          display: true,
          text: "Income",
        },
        ticks: {
          callback: function (value: number) {
            return `$${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "400px",
        minWidth: "333px",
        maxWidth: "1000px",
        margin: "0 auto",
        marginLeft: "50px",
      }}
    >
      <Line data={chartData} />
    </div>
  );
};

export default IncomeChart;
