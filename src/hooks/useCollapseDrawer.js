import { useContext } from "react";
import { CollapseDrawerContext } from "@/contexts/CollapseDrawerContext";

const useCollapseDrawer = () => {
    const context = useContext(CollapseDrawerContext)
    if (!context) throw new Error("CollapseDrawer context must be use inside CollapseDrawerProvider");
  return context;
};

export default useCollapseDrawer;
