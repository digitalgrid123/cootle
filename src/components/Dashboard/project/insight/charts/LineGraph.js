import React from "react";
import ApexCharts from "react-apexcharts";
import PropTypes from "prop-types";
import { Loader } from "@/components/shared/loader";
import { getCategoryColor } from "@/utils/colorMapping";
import { getISOWeek, getYear } from "date-fns";

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

  const activePeriod = period || "quarterly";

  const getCategory = (date) => {
    const d = new Date(date);
    const month = d.getMonth();
    const year = getYear(d).toString().slice(-2);

    if (activePeriod === "monthly") {
      return `${periods.monthly[month]}-${year}`;
    } else if (activePeriod === "quarterly") {
      return `${periods.quarterly[Math.floor(month / 3)]}-${year}`;
    } else if (activePeriod === "weekly") {
      const weekNumber = getISOWeek(d);
      return `Week ${weekNumber}-${year}`;
    }
  };

  const aggregateData = (data) => {
    const aggregatedData = {};

    Object.keys(data).forEach((key) => {
      const categoryData = data[key];

      categoryData.forEach((entry) => {
        const category = getCategory(entry.date);
        if (!aggregatedData[category]) {
          aggregatedData[category] = 0;
        }
        aggregatedData[category] += entry.count;
      });
    });

    return Object.keys(aggregatedData).map((category) => ({
      category,
      count: aggregatedData[category],
    }));
  };

  const aggregatedData = Object.keys(data).reduce((acc, key) => {
    acc[key] = aggregateData({ [key]: data[key] });
    return acc;
  }, {});

  // Determine current month, quarter, and week
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentQuarter = Math.floor(currentMonth / 3);
  const currentWeek = getISOWeek(currentDate) - 1;

  let categories = [];
  if (activePeriod === "monthly") {
    categories = periods.monthly.slice(0, currentMonth + 1);
  } else if (activePeriod === "quarterly") {
    categories = periods.quarterly.slice(0, currentQuarter + 1);
  } else if (activePeriod === "weekly") {
    categories = periods.weekly.slice(0, currentWeek + 1);
  }

  const series = Object.keys(aggregatedData).map((key) => {
    const data = categories.map((cat) => {
      const entry = aggregatedData[key].find((e) => {
        const entryCategory = e.category.split("-")[0].trim();
        return entryCategory === cat;
      });

      return entry ? entry.count : 0;
    });

    return {
      name: key,
      data,
    };
  });

  const colors = Object.keys(aggregatedData).map((key) =>
    getCategoryColor(key)
  );

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
      enabled: true,
      theme: "dark",
      x: {
        show: true,
        format: "dd MMM",
      },
      y: {
        formatter: (value) => `${value} count`,
      },
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
