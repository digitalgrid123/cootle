import React from "react";
import { useSetting } from "@/hooks";

const ThemeMode = () => {
  const { onToggleMode, isDark } = useSetting();

  return (
    <li className="nav-item dark-mode d-none d-sm-flex">
      <a className="nav-link dark-mode-icon" href="#" onClick={onToggleMode}>
        <i className={`bx ${isDark ? "bx-sun" : "bx-moon"}`}></i>
      </a>
    </li>
  );
};

export default ThemeMode;
