// useSharedState.js
import { useState, useCallback } from "react";

export const useSharedState = () => {
  const [trigger, setTrigger] = useState(false);

  const triggerFetch = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  return { trigger, triggerFetch };
};
