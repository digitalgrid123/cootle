import React from "react";

const BarChart = () => {
  const data = [
    { label: "functional value", value: 76, color: "#3498db" },
    { label: "follow value", value: 65, color: "#2ecc71" },
    { label: "text value", value: 30, color: "#e74c3c" },
  ];

  return (
    <div className="bar-chart">
      {data.map((item, index) => (
        <div key={index} className="bar-container">
          <div
            className="bar"
            style={{ width: `${item.value}%`, backgroundColor: item.color }}
          ></div>
          <span className="bar-value">{`${item.value}%`}</span>
          <span className="bar-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
