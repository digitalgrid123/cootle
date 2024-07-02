import React from "react";
import Chart from "react-apexcharts";

const LineGraph = ({ data }) => {
  console.log("🚀 ~ LineGraph ~ data:", data);

  // Extract series names and data
  const seriesNames = Object.keys(data);
  const chartData = seriesNames.map((seriesName, index) => ({
    name: seriesName, // This will be used in the legend
    data: data[seriesName].map((item) => ({
      x: new Date(item.date),
      y: item.count,
    })),
  }));

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6, // Adjust the number of X-axis ticks
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          const quarter = Math.floor((date.getMonth() + 3) / 3);
          const year = date.getFullYear().toString().slice(-2);
          return `Q${quarter} - ${year}`;
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
      tickAmount: 6, // Adjust the number of Y-axis ticks
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5, // Size of the markers on data points
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    colors: ["#C4C4C4", "#E27DDE", "#8E7BEA", "#1ABCFE", "#1A007F"],
  };

  return (
    <div id="chart" className="effort-count-container">
      <Chart options={options} series={chartData} type="line" height={350} />
    </div>
  );
};

export default LineGraph;
