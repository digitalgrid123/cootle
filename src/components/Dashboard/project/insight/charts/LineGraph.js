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

const LineGraph = ({ data = {}, start, end, loading }) => {
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

  const getLabelType = () => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Add 1 to include the end day

    if (diffInDays <= 7) return "weekly"; // Less than or equal to 7 days
    if (diffInDays <= 31) return "monthly"; // Less than or equal to 31 days
    return "quarterly"; // More than 31 days
  };

  const labelType = getLabelType();

  const generateLabels = () => {
    const labels = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let currentDate = startDate;

    const getISOWeek = (date) => {
      const januaryFourth = new Date(date.getFullYear(), 0, 4);
      const dayOfYear = (date - januaryFourth) / 86400000 + 1;
      return Math.ceil(dayOfYear / 7);
    };

    while (currentDate <= endDate) {
      if (labelType === "monthly") {
        labels.push(months[currentDate.getMonth()]);
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (labelType === "quarterly") {
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        labels.push(`Q${quarter}`);
        currentDate.setMonth(currentDate.getMonth() + 3);
      } else if (labelType === "weekly") {
        const weekNumber = getISOWeek(currentDate);
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
    <div id="chart" className="effort-count-container">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineGraph;
