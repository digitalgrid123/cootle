import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import { getCategoryColor } from "@/utils/colorMapping";

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

const CategoryByCountChart = ({ count, category }) => {
  const dataSets = useRef([]);

  const getDataForCount = (count) => {
    if (!dataSets.current[count]) {
      const data = Array.from({ length: 18 }, () =>
        Math.floor(Math.random() * 50)
      );
      const colors = Array(18).fill(getCategoryColor(category));

      dataSets.current[count] = {
        data: data,
        colors: colors,
      };
    }
    return dataSets.current[count];
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
      grid: {
        show: false,
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
  }, [count, category]);

  if (count === 0) {
    return (
      <div
        className="relative"
        style={{ width: "80px", height: "80px", bottom: "33px" }}
      >
        <div className="linechart">
          <img
            src="/assets/images/mark/line.svg"
            alt="Line Chart Placeholder"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{ width: "80px", height: "80px", bottom: "33px" }}
    >
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={85}
          width={85}
        />
      </div>
      <div className="linechart">
        <img src="/assets/images/mark/line.svg" alt="Line Chart Placeholder" />
      </div>
    </div>
  );
};

CategoryByCountChart.propTypes = {
  count: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryByCountChart;
