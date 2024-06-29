import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

const CategoryByCountChart = ({ count }) => {
  // Initialize an array to store data sets for each count
  const dataSets = useRef([]);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const isLightColor = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const getDataForCount = (count) => {
    // Check if data for this count already exists in the array
    if (!dataSets.current[count]) {
      const data = [];
      const colors = [];

      for (let i = 0; i < 18; i++) {
        const value = Math.floor(Math.random() * 50);
        data.push(value);

        let randomColor = generateRandomColor();

        while (isLightColor(randomColor)) {
          randomColor = generateRandomColor();
        }

        colors.push(randomColor);
      }

      // Store generated data and colors for this count
      dataSets.current[count] = {
        data: data,
        colors: colors,
      };
    }

    return dataSets.current[count];
  };

  const generateCategories = (count) => {
    const startDate = new Date("2000-01-01");
    const categories = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      categories.push(date.toLocaleDateString());
    }
    return categories;
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
        name: "Series 1",
      },
    ],
    options: {
      chart: {
        width: 80,
        height: 80,
        type: "line",
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: generateCategories(18),
        tickAmount: 5,
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      colors: [],
    },
  });

  useEffect(() => {
    const { data, colors } = getDataForCount(count);
    setChartData((prevData) => ({
      ...prevData,
      series: [
        {
          data: data,
          name: "Series 1",
        },
      ],
      options: {
        ...prevData.options,
        colors: colors,
      },
    }));
  }, [count]);

  // If count is zero, render only the linechart <div>
  if (count === 0) {
    return (
      <div className="relative" style={{ width: "80px", height: "80px" }}>
        <div className="linechart">
          <img
            src="/assets/images/mark/line.svg"
            alt="Line Chart Placeholder"
          />
        </div>
      </div>
    );
  }

  // If count is not zero, render the chart and the linechart <div>
  return (
    <div className="relative" style={{ width: "80px", height: "80px" }}>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={80}
          width={80}
        />
      </div>
      <div className="linechart">
        <img src="/assets/images/mark/line.svg" alt="Line Chart Placeholder" />
      </div>
    </div>
  );
};

export default CategoryByCountChart;
