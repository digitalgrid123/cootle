import { useState, useEffect } from "react";

let globalState = {
  selectedCompany: null,
  listeners: [],
};

export const setSelectedCompany = (company) => {
  globalState.selectedCompany = company;
  globalState.listeners.forEach((listener) => listener(company));
};

export const useGlobalCompany = () => {
  const [company, setCompany] = useState(globalState.selectedCompany);

  useEffect(() => {
    const listener = (newCompany) => setCompany(newCompany);
    globalState.listeners.push(listener);
    return () => {
      globalState.listeners = globalState.listeners.filter(
        (l) => l !== listener
      );
    };
  }, []);

  return company;
};
