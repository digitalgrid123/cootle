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
  const { companyset, checkmember } = useAuth();
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
          if (res && res.data) {
            fetchMember();
            const updatedCompany = { ...company };
            setSelectedCompany(updatedCompany);
            isCurrentCompanyUpdated.current = true; // Mark as updated
          }
        })
        .catch((error) => {
          console.error("API call failed:", error);
        });
    }
  }, [company, companyset]);

  const fetchMember = async () => {
    try {
      const res = await checkmember(company.id);

      if (res.is_admin || res.is_owner) {
        isCurrentCompanyUpdated.current = true;
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchMember, 15000);

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, [company]);

  return company;
};
