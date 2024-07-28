import React from "react";
import ApexCharts from "react-apexcharts";
import PropTypes from "prop-types";
import { Loader } from "@/components/shared/loader";
import { getCategoryColor } from "@/utils/colorMapping";

const periods = {
  monthly: [
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
  ],
  quarterly: ["Q1", "Q2", "Q3", "Q4"],
  weekly: Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`),
};

const LineGraph = ({ data = {}, period, height = 500 }) => {
  if (!data) {
    return <Loader />;
  }

  const getCategory = (date) => {
    const month = new Date(date).getMonth();
    if (period === "monthly") {
      return periods.monthly[month];
    } else if (period === "quarterly") {
      return periods.quarterly[Math.floor(month / 3)];
    } else if (period === "weekly") {
      const startOfYear = new Date(new Date(date).getFullYear(), 0, 1);
      const pastDaysOfYear = (new Date(date) - startOfYear) / 86400000;
      return `Week ${Math.ceil(
        (pastDaysOfYear + startOfYear.getDay() + 1) / 7
      )}`;
    }
  };

  let categories =
    period === null
      ? Array.from({ length: 4 }, () => periods.quarterly).flat()
      : Object.keys(data)
          .flatMap((category) =>
            data[category].map((entry) => getCategory(entry.date))
          )
          .sort();

  // Repeat the categories 4 times if all labels are the same
  const allSame = categories.every((label) => label === categories[0]);
  if (allSame) {
    categories = Array.from({ length: 4 }, () => categories).flat();
  }

  const series = Object.keys(data).map((key) => ({
    name: key,
    data: data[key].map((item) => item.count),
  }));

  const colors = Object.keys(data).map((key) => getCategoryColor(key));

  const options = {
    chart: {
      type: "line",
      height,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories,
      title: {
        style: {
          color: "#00000099",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
        },
      },
      labels: {
        show: true,
        style: {
          colors: "#00000099",
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
        rotate: 0,
        trim: false,
      },
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        style: {
          color: "#00000099",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
        },
      },
      labels: {
        style: {
          colors: "#00000099",
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
      },
      tickAmount: 5,
      min: 0,
      max: 40,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      markers: {
        width: 10,
        height: 10,
        radius: 50,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      borderColor: "#e0e0e0",
    },
    colors,
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height={height}
      />
    </div>
  );
};

LineGraph.propTypes = {
  data: PropTypes.object.isRequired,
  period: PropTypes.oneOf(["monthly", "quarterly", "weekly", null]),
  height: PropTypes.number,
};

export default LineGraph;
