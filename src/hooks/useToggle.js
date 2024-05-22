"use client";

import { useState } from "react";

const useToggle = (defaultChecked) => {
  const [toggle, setToggle] = useState(defaultChecked || false);

  return {
    toggle,
    onToggle: () => setToggle(!toggle),
    onOpen: () => setToggle(true),
    onClose: () => setToggle(false),
    setToggle,
  };
};

export default useToggle;
