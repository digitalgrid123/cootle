import { useAuth } from "@/hooks";
import { useEffect, useState, useCallback } from "react";

const Activity = ({ activities }) => {
  const { retrieveEffort, mappingList } = useAuth();
  const [objectives, setObjectives] = useState([]);

  const fetchDesignEfforts = useCallback(
    async (designEffortIds) => {
      try {
        const response = await retrieveEffort(designEffortIds);

        if (response.status) {
          return response.data;
        } else {
          throw new Error("Failed to fetch design efforts");
        }
      } catch (error) {
        console.error("Error fetching design efforts:", error);
        return [];
      }
    },
    [retrieveEffort]
  );

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await mappingList("OUT");
        if (res?.status && Array.isArray(res.data) && res.data.length > 0) {
          const objectivesData = res.data;
          const designEffortPromises = objectivesData.map(async (obj) => {
            if (obj.design_efforts.length > 0) {
              const designEffortData = await fetchDesignEfforts(
                obj.design_efforts
              );
              return { ...obj, design_efforts: designEffortData };
            }
            return obj;
          });
          const objectivesWithDesignEfforts = await Promise.all(
            designEffortPromises
          );
          setObjectives(objectivesWithDesignEfforts);
        } else {
          console.error("No data found in the response");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchObjectives();
  }, [fetchDesignEfforts, mappingList]);

  return (
    <div className="effort-count-container">
      <h2 className="value-text mb-16">
        Latest value driven product activities
      </h2>
      {/* Render the objectives with design efforts here */}
    </div>
  );
};

export default Activity;
