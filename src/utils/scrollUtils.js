// utils/scrollUtils.js

export const toggleBodyScroll = (isLocked) => {
  if (isLocked) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};
