// src/constants/timeConstants.js
export const months = [
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

export const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);

export const quarters = ["Q1", "Q2", "Q3", "Q4"];

export const getCurrentQuarter = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) {
    return `${year}-Q1`;
  } else if (month >= 4 && month <= 6) {
    return `${year}-Q2`;
  } else if (month >= 7 && month <= 9) {
    return `${year}-Q3`;
  } else {
    return `${year}-Q4`;
  }
};


export const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
