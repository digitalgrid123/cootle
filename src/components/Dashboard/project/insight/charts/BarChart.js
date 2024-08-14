import React, { useMemo } from "react";

// Utility function to check if a color is grey, light, black, or white
const isExcludedColor = (hex) => {
  // Convert hex to RGB
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Check if the color is grey or close to black or white
  const isGrey = r === g && g === b;
  const isLight = (r + g + b) / 3 > 192; // Adjust threshold as needed
  const isDark = (r + g + b) / 3 < 64; // Adjust threshold as needed

  return isGrey || isLight || isDark;
};

// Function to modify a color slightly
const adjustColor = (hex, factor) => {
  // Convert hex to RGB
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // Adjust color by a certain factor
  const adjust = (color, factor) => Math.min(255, Math.max(0, color + factor));

  return `#${[r, g, b]
    .map((color) => adjust(color, factor).toString(16).padStart(2, "0"))
    .join("")}`;
};

const BarChart = ({ data }) => {
  // Define fixed colors
  const baseColors = [
    "#1A007F",
    "#1ABCFE",
    "#8E7BEA",
    "#E27DDE",
    "#F24E1E",
    "#FB6F93",
    "#DBA8AC",
    "#F18585",
    "#5D36E7",
    "#857577",
    "#A6A2A2",
    "#6F46A6",
    "#FF8FAB",
    "#95B8D0",
    "#809BCE",
    "#00B4D8",
    "#8E008B",
    "#E574BC",
    "#0496FF",
    "#4E148C",
    "#B45AFF",
  ];

  // Track used colors
  const usedColors = useMemo(() => new Set(), []);

  // Function to get a unique color
  const getUniqueColor = (index) => {
    let color;
    let attempt = 0;
    const maxAttempts = baseColors.length;
    const factor = 20; // Adjust factor to increase color contrast

    // Try to find a unique base color first
    do {
      const colorIndex = (index + attempt) % baseColors.length;
      color = baseColors[colorIndex];
      attempt++;
    } while (usedColors.has(color) && attempt < maxAttempts);

    // If all base colors are used, create a modified color
    if (attempt >= maxAttempts) {
      color = adjustColor(baseColors[index % baseColors.length], factor);
    }

    usedColors.add(color);
    return color;
  };

  // Transform data with dynamic colors and rounded values
  const transformedData = data.map((item, index) => ({
    label: item.value || item.objective,
    value: Math.round(item.ratio), // Round the value to the nearest integer
    color: getUniqueColor(index), // Get a unique color
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
