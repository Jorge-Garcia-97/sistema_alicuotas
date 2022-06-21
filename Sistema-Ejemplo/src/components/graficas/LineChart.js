import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

export const LineChart = (props) => {
  const { labels, datasets } = props;
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setChartData({ labels: labels, datasets: datasets });
    return () => {
      setChartData({});
    };
  }, []);

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
        type="line"
        data={chartData}
        options={basicOptions}
        className="bg-light border w-75"
      />
    </>
  );
};
