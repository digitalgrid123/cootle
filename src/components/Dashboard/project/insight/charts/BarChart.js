import React from "react";

const BarChart = ({ data }) => {
  // Define fixed colors
  const colors = ["#C4C4C4", "#E27DDE", "#8E7BEA", "#1ABCFE", "#1A007F"];

  // Transform data with fixed colors and rounded values
  const transformedData = data.map((item, index) => ({
    label: item.value || item.objective,
    value: Math.round(item.ratio), // Round the value to the nearest integer
    color: colors[index % colors.length], // Cycle through colors
  }));

  return (
    <>
      {transformedData.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center justify-content-between mb-16"
        >
          <div className="bar-container">
            <div
              className="bar-ratio"
              style={{ width: `${item.value}%`, backgroundColor: item.color }}
            ></div>
            <span className="bar-label text-left">{`${item.value}%`}</span>
          </div>
          <div
            style={{ width: "40%", paddingBottom: "10px" }}
            className="d-flex justify-content-end"
          >
            <span className="bar-label text-left">{item.label}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default BarChart;
