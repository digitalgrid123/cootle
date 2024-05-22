import moment from "moment";

export const getRole = (user) => {
  if (!user) return "";

  if (user.is_superuser) {
    return "superAdmin";
  } else if (user.is_hospital && !user.is_surgeon) {
    return "hospital";
  }

  return "surgeon";
};

export const getDateRange = (month, type = "month") => {
  if (month === 0) {
    return {
      start_date: moment().startOf(type).format("DD/MM/YYYY"),
      end_date: moment().endOf(type).format("DD/MM/YYYY"),
    };
  } else if (month > 0) {
    return {
      start_date: moment().add(month, type).startOf(type).format("DD/MM/YYYY"),
      end_date: moment().add(month, type).endOf(type).format("DD/MM/YYYY"),
    };
  } else {
    return {
      start_date: moment()
        .subtract(month * -1, type)
        .startOf(type)
        .format("DD/MM/YYYY"),
      end_date: moment()
        .subtract(month * -1, type)
        .endOf(type)
        .format("DD/MM/YYYY"),
    };
  }
};

export const getLabelFromValue = (key, array) => {
  if (!key) return "";
  return array.find((item) => item.value === key).label;
};

export const convertToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const paddedHours = hours.toString().padStart(2, "0");

  const remainingMinutes = minutes % 60;
  const paddedMinutes = remainingMinutes.toString().padStart(2, "0");

  const hoursText = hours > 0 ? `${paddedHours} hr${hours > 1 ? "s" : ""}` : "";
  const minutesText =
    remainingMinutes > 0
      ? `${paddedMinutes} min${remainingMinutes > 1 ? "s" : ""}`
      : "";

  return `${hoursText} ${minutesText}`.trim();
};

export const generateRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomHexColorArray = (count) => {
  const colorArray = [];
  for (let i = 0; i < count; i++) {
    colorArray.push(generateRandomHexColor());
  }
  return colorArray;
};

export const getFullName = (firstName, lastName) => {
  let fullName = "";
  if (firstName) fullName += firstName;
  if (lastName) fullName += ` ${lastName}`;
  return fullName;
};
