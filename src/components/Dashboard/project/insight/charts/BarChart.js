import React from "react";

const BarChart = ({ data }) => {
  // Define fixed colors
  const colors = ["#C4C4C4", "#E27DDE", "#8E7BEA", "#1ABCFE", "#1A007F"];

  // Transform data with fixed colors
  const transformedData = data.map((item, index) => ({
    label: item.value || item.objective,
    value: item.ratio,
    color: colors[index % colors.length], // Cycle through colors
  }));

  return (
    <div className="effort-count-container">
      <h2 className="value-text mb-16">
        Value driven product activities ratio
      </h2>
      {transformedData.map((item, index) => (
        <div className="d-flex align-items-center justify-content-between">
          <div key={index} className="bar-container mb-16 ">
            <div
              className="bar-ratio"
              style={{ width: `${20}%`, backgroundColor: item.color }}
            ></div>
            <span className="bar-label text-left">{`${item.value}%`}</span>
          </div>
          <div>
            <span className="bar-label">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
