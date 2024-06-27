import { useAuth } from "@/hooks";
import { useState, useEffect, useRef } from "react";

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
  const { companyset } = useAuth();
  const isCurrentCompanyUpdated = useRef(false);

  useEffect(() => {
    const listener = (newCompany) => setCompany(newCompany);
    globalState.listeners.push(listener);

    return () => {
      globalState.listeners = globalState.listeners.filter(
        (l) => l !== listener
      );
    };
  }, []);

  useEffect(() => {
    // Reset the ref if the company ID changes
    isCurrentCompanyUpdated.current = false;
  }, [company?.id]);

  useEffect(() => {
    if (company && company.id && !isCurrentCompanyUpdated.current) {
      companyset(company.id)
        .then((res) => {
          if (res && res.data && res.data.is_admin !== undefined) {
            const updatedCompany = { ...company, is_admin: res.data.is_admin };
            setSelectedCompany(updatedCompany);
            isCurrentCompanyUpdated.current = true; // Mark as updated
          }
        })
        .catch((error) => {
          console.error("API call failed:", error);
        });
    }
  }, [company, companyset]);

  return company;
};
