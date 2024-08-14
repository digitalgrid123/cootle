import { Loader } from "@/components/shared/loader";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";

const statusDescriptions = {
  YBC: "Yet to be checked",
  UPA: "Unplanned Activity",
  REA: "Value Realised",
  VUR: "Unrealised",
  UCH: "Unchecked",
};

const statusStyles = {
  YBC: {
    backgroundColor: "#000000CC",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  UPA: {
    backgroundColor: "#723D46",
    color: "black",
    padding: "6px 12px",
    borderRadius: "8px",
  },
  REA: {
    backgroundColor: "#128E5E",
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
  UCH: {
    backgroundColor: "#F24E1E",
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
  UCH: {
    backgroundColor: "#F24E1E1A",
    padding: "7px 7px 7px 20px",
    borderRadius: "16px",
  },
};

const Activity = ({ activities }) => {
  const { designEffort } = useAuth();
  const [loading, setLoading] = useState(true);
  const [designData, setDesignData] = useState([]);

  useEffect(() => {
    const fetchDesignEffort = async () => {
      try {
        const res = await designEffort();

        if (res?.status) {
          setDesignData(res.data);
        } else {
          console.error("Failed to fetch design effort:", res);
        }
      } catch (err) {
        console.error("Error fetching design effort:", err);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchDesignEffort();
  }, [designEffort]);

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
          const matchedDesign = designData.find(
            (design) => design.id === activity.project_effort?.design_effort
          );

          return (
            <div
              key={key}
              style={{ ...activityStyle }}
              className="d-flex align-items-center justify-content-between mb-16"
            >
              <div className="d-flex flex-column gap-1">
                <h1 className="objective-text">
                  {matchedDesign ? matchedDesign.title : ""}
                </h1>

                <ul
                  className="p-0 d-flex gap-2 align-items-center flex-wrap mb-0"
                  style={{ listStyle: "none" }}
                >
                  {activity.objectives &&
                    activity.objectives.map((objective, index) => (
                      <li key={index} className="outcomes-text f-14 p-0">
                        <span className="f-12">#</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  {activity.values &&
                    activity.values.map((value, index) => (
                      <li key={index} className="outcomes-text f-14 p-0">
                        <span className="f-12">#</span>
                        <span>{value}</span>
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
