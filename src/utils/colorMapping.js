// utils/colorMapping.js

const getBrightColor = (category) => {
  // Simple hash function to generate a numeric value from the category name
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB values
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Ensure the color is bright
  const brightnessFactor = 0.7 + (Math.abs(hash) % 30) / 100; // Randomize the brightness
  const brightR = Math.min(Math.round(r * brightnessFactor), 255);
  const brightG = Math.min(Math.round(g * brightnessFactor), 255);
  const brightB = Math.min(Math.round(b * brightnessFactor), 255);

  return `rgb(${brightR}, ${brightG}, ${brightB})`;
};

const categoryColors = {};

const getCategoryColor = (category) => {
  if (!categoryColors[category]) {
    categoryColors[category] = getBrightColor(category);
  }
  return categoryColors[category];
};

export { getCategoryColor };
