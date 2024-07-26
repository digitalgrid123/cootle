import React from "react";
import Chart from "react-apexcharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const quarters = ["Q1", "Q2", "Q3", "Q4"];

const LineGraph = ({ data = {}, loading }) => {
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        Loading...
      </div>
    );
  }

  if (!data || typeof data !== "object") {
    return <div>No data available</div>;
  }

  const labelType = "monthly"; // Assuming monthly for simplicity

  const generateLabels = () => {
    const labels = [];
    const now = new Date();
    const currentYear = now.getFullYear();

    if (labelType === "monthly") {
      for (let i = 0; i < 12; i++) {
        labels.push(`${months[i]} ${currentYear}`);
      }
    } else if (labelType === "quarterly") {
      for (let i = 0; i < 4; i++) {
        labels.push(`Q${i + 1} ${currentYear}`);
      }
    } else if (labelType === "weekly") {
      const startOfYear = new Date(currentYear, 0, 1);
      let currentDate = startOfYear;
      while (currentDate.getFullYear() === currentYear) {
        const weekNumber = Math.ceil(
          ((currentDate - startOfYear) / 86400000 + 1) / 7
        );
        labels.push(`W${weekNumber}`);
        currentDate.setDate(currentDate.getDate() + 7);
      }
    }

    return labels;
  };

  const labels = generateLabels();

  const transformedData = Object.keys(data).map((category) => {
    return {
      name: category,
      data: data[category].map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.count,
      })),
    };
  });

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      title: {
        text: "Date",
      },
      categories: labels,
      labels: {
        formatter: function (value) {
          return labels[0] || value; // Display the label for all x-axis values
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
      min: 0,
      max: 40,
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          return value.toFixed(0);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: "dd MMM",
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          // Return the category name for the hovered data point
          const categoryName = w.config.series[seriesIndex].name;
          return `${categoryName}: ${value}`;
        },
      },
      style: {
        fontSize: "14px",
        color: "#000000", // Set tooltip text color to black
      },
    },
  };

  const series = transformedData;

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineGraph;
