import { useContext } from "react";
import { SettingsContext } from "@/contexts/SettingContext";

const useSetting = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("Setting context must be use inside SettingProvider");
  return context;
};

export default useSetting;
