import { useAuth } from "@/hooks";
import { useState, useEffect, useRef } from "react";

let globalState = {
  selectedCompany: null,
  listeners: [],
};

export const setSelectedCompany = (company) => {
  // Check if the company is already set to avoid redundant updates
  if (globalState.selectedCompany?.id === company?.id) return;

  globalState.selectedCompany = company;
  globalState.listeners.forEach((listener) => listener(company));
};

export const useGlobalCompany = () => {
  const [company, setCompany] = useState(globalState.selectedCompany);
  const { companyset, checkmember } = useAuth();
  const isCurrentCompanyUpdated = useRef(false);

  // Add a listener to global state for updates
  useEffect(() => {
    const listener = (newCompany) => setCompany(newCompany);
    globalState.listeners.push(listener);

    return () => {
      globalState.listeners = globalState.listeners.filter(
        (l) => l !== listener
      );
    };
  }, []);

  // Reset the ref when company ID changes
  useEffect(() => {
    isCurrentCompanyUpdated.current = false;
  }, [company?.id]);

  // Fetch company data and member details if needed
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (company && company.id && !isCurrentCompanyUpdated.current) {
        try {
          const res = await companyset(company.id);
          if (res && res.data) {
            const updatedCompany = { ...company };
            await fetchMember(); // Ensure fetchMember is an async function
            setSelectedCompany(updatedCompany);
            isCurrentCompanyUpdated.current = true;
          }
        } catch (error) {
          console.error("API call failed:", error);
        }
      }
    };

    fetchCompanyData();
  }, [company, companyset]);

  // Fetch member details
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
    if (company) {
      const intervalId = setInterval(fetchMember, 15000);
      return () => clearInterval(intervalId); // Clear interval on component unmount or company change
    }
  }, [company]);

  return company;
};
