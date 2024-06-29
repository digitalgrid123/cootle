import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import BarChart from "./charts/BarChart";
import { useAuth } from "@/hooks";
import CategoryByCountChart from "./charts/CategoryByCountChart";

const Insight = ({ isAdmin }) => {
  const params = useParams();
  const {
    valueratio,
    objectiveratio,
    effortbycategory,
    latestobjective,
    latestvalue,
  } = useAuth(); // Destructuring latestvalue from useAuth hook
  //   const [valueRatio, setValueRatio] = useState([]);
  //   const [objectiveRatio, setObjectiveRatio] = useState([]);
  const [effortCategories, setEffortCategories] = useState([]);
  const [latestObjective, setLatestObjective] = useState(null);
  console.log("🚀 ~ Insight ~ latestObjective:", latestObjective);
  const [latestValue, setLatestValue] = useState(null);
  const project_id = params.id;

  //   const fetchValueRatio = useCallback(async () => {
  //     try {
  //       if (project_id) {
  //         const result = await valueratio(project_id);
  //         if (result.status) {
  //           setValueRatio(result.data);
  //         } else {
  //           throw new Error("Failed to fetch value ratio data");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching value ratio data:", error);
  //     }
  //   }, [project_id, valueratio]);

  //   const fetchObjectiveRatio = useCallback(async () => {
  //     try {
  //       if (project_id) {
  //         const result = await objectiveratio(project_id);
  //         if (result.status) {
  //           setObjectiveRatio(result.data);
  //         } else {
  //           throw new Error("Failed to fetch objective ratio data");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching objective ratio data:", error);
  //     }
  //   }, [project_id, objectiveratio]);

  const fetchEffortCategories = useCallback(async () => {
    try {
      // Example usage of effortbycategory assuming it fetches categories data
      const result = await effortbycategory(project_id);
      if (result.status) {
        setEffortCategories(result.data);
      } else {
        throw new Error("Failed to fetch effort categories data");
      }
    } catch (error) {
      console.error("Error fetching effort categories data:", error);
    }
  }, [effortbycategory]);

  const fetchLatestObjective = useCallback(async () => {
    try {
      // Example usage of latestobjective assuming it fetches latest objective data
      const result = await latestobjective(project_id);
      if (result.status) {
        setLatestObjective(result.data);
      } else {
        throw new Error("Failed to fetch latest objective data");
      }
    } catch (error) {
      console.error("Error fetching latest objective data:", error);
    }
  }, [latestobjective]);

  const fetchLatestValue = useCallback(async () => {
    try {
      // Example usage of latestvalue assuming it fetches latest value data
      const result = await latestvalue(project_id);
      if (result.status) {
        setLatestValue(result.data);
      } else {
        throw new Error("Failed to fetch latest value data");
      }
    } catch (error) {
      console.error("Error fetching latest value data:", error);
    }
  }, [latestvalue]);

  useEffect(() => {
    // fetchValueRatio();
    // fetchObjectiveRatio();
    fetchEffortCategories();
    fetchLatestObjective();
    fetchLatestValue(); // Call the fetch function for latest value
  }, [
    // fetchValueRatio,
    // fetchObjectiveRatio,
    fetchEffortCategories,
    fetchLatestObjective,
    fetchLatestValue,
  ]);
  const categories = Object.entries(effortCategories);

  return (
    <div className="wrapper-company w-100">
      <div className="company-sidebar w-100 d-flex flex-column gap-4">
        <div className="row">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="page-title-heading weight-700">
              Harris
              <span className="tm-symbol">™</span>
            </h1>
            <h2 className="define-text cursor-pointer">
              Definitions
              <span className="question-mark">?</span>
            </h2>
          </div>
          {/* <div>
          <h3>Value Ratio</h3>
          {valueRatio.length > 0 ? (
            <BarChart data={valueRatio} />
          ) : (
            <p>Loading value ratio data...</p>
          )}
        </div>
        <div>
          <h3>Objective Ratio</h3>
          {objectiveRatio.length > 0 ? (
            <BarChart data={objectiveRatio} />
          ) : (
            <p>Loading objective ratio data...</p>
          )}
        </div> */}
          <div className="col-lg-6">
            <h3 className="Design_effort_text mb-16 ">
              Design efforts focused Ratio
            </h3>
            <div className="row">
              {categories.map(([category, count], index) => (
                <div className="col-lg-6 mb-24">
                  <div key={index} className="effort-count-container">
                    <h3 className="category-text mb-24">{category}</h3>
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex flex-column gap-1">
                        <h2 className="effort-complete">Efforts done</h2>
                        <h2 className="count-text">{count}</h2>
                      </div>

                      <CategoryByCountChart count={count} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
          <h3>Latest Objective</h3>
          {latestObjective ? (
            <p>{latestObjective.title}</p>
          ) : (
            <p>Loading latest objective data...</p>
          )}
        </div>
        <div>
          <h3>Latest Value</h3>
          {latestValue ? (
            <p>{latestValue.value}</p>
          ) : (
            <p>Loading latest value data...</p>
          )}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Insight;
