import React from "react";
import { Chart } from "primereact/chart";

export const BarChart = (props) => {
  const { chartData } = props;
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.7,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  return (
    <>
      <Chart
        type="bar"
        data={chartData}
        options={basicOptions}
        className="bg-light border"
      />
    </>
  );
};
