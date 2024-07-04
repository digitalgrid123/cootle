import { Loader } from "@/components/shared/loader";
import { useAuth } from "@/hooks";
import { useEffect, useState, useCallback } from "react";

const statusDescriptions = {
  YBC: "Yet to be checked",
  UCH: "Unchecked", // This will be filtered out from the dropdown options
  UPA: "Unplanned Activity",
  REA: "Value Realised",
  VUR: "Unrealised",
};

const statusStyles = {
  YBC: {
    backgroundColor: "#000000CC",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  UCH: {
    backgroundColor: "#F24E1E",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  UPA: {
    backgroundColor: "#E0DFE3",
    color: "black",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  REA: {
    backgroundColor: "#0ACF83",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  VUR: {
    backgroundColor: "#F58E07",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
  },
};

const activityStyles = {
  YBC: {
    backgroundColor: "#0000001A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
  UCH: {
    backgroundColor: "#F24E1E1A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
  UPA: {
    backgroundColor: "#E0DFE31A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
  REA: {
    backgroundColor: "#0ACF831A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
  VUR: {
    backgroundColor: "#F58E071A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
};

const Activity = ({ activities }) => {
  const { retrieveEffort, mappingList } = useAuth();
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDesignEfforts = useCallback(
    async (designEffortIds) => {
      try {
        const response = await retrieveEffort(designEffortIds);
        if (response?.status && Array.isArray(response.data)) {
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
          const objectivesWithDesignEfforts = await Promise.all(
            objectivesData.map(async (obj) => {
              if (obj.design_efforts.length > 0) {
                const designEffortData = await fetchDesignEfforts(
                  obj.design_efforts
                );
                return { ...obj, design_efforts: designEffortData };
              }
              return obj;
            })
          );
          setObjectives(objectivesWithDesignEfforts);
        } else {
          console.error("No data found in the response");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activities && Object.keys(activities).length > 0) {
      fetchObjectives();
    } else {
      setLoading(false);
    }
  }, [activities, fetchDesignEfforts, mappingList]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {activities && Object.keys(activities).length > 0 ? (
        Object.keys(activities).map((key) => {
          const activity = activities[key];
          const activityStyle =
            activityStyles[activity.project_effort?.value_status] || {};
          const statusStyle =
            statusStyles[activity.project_effort?.value_status] || {};

          return (
            <div
              key={key}
              style={{ ...activityStyle }}
              className="d-flex align-items-center justify-content-between mb-16"
            >
              <div className="d-flex flex-column gap-1">
                <h1 className="objective-text">
                  {activity.objectives?.[0] || ""}
                </h1>
                <h1 className="objective-text">{activity.values?.[0] || ""}</h1>
                <ul
                  className="p-0 d-flex gap-2 align-items-center"
                  style={{ listStyle: "none" }}
                >
                  {activity.project_effort?.outcomes.map((outcomeId, idx) => (
                    <li key={idx} className="outcomes-text f-14 p-0">
                      <span className="f-12">#</span>
                      {objectives.find((obj) => obj.id === outcomeId)?.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="status-container" style={{ ...statusStyle }}>
                <span className="checked-insight-status">
                  {statusDescriptions[activity.project_effort?.value_status]}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p>No activities found.</p>
      )}
    </>
  );
};

export default Activity;
