"use client";

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/keywords";
import { getData, saveData } from "@/utils/storage";

const defaultSettings = { themeMode: "light" };

const initialState = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const localMode = getData(STORAGE_KEYS.SETTINGS);

  const [settings, setSettings] = useState({
    themeMode: localMode || initialState.themeMode,
  });

  useEffect(() => {
    if (window !== undefined) {
      if (settings.themeMode === "dark") {
        document.documentElement.classList.add("dark-theme");
        document.documentElement.classList.remove("light-theme");
      } else {
        document.documentElement.classList.add("light-theme");
        document.documentElement.classList.remove("dark-theme");
      }
      saveData(STORAGE_KEYS.SETTINGS, settings.themeMode);
    }
  }, [settings.themeMode]);

  const onChangeMode = (mode) => {
    setSettings({
      ...settings,
      themeMode: mode,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        isDark: settings.themeMode === "dark",
        onChangeMode,
        onToggleMode,
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
