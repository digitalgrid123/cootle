import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import BarChart from "./charts/BarChart";
import { useAuth } from "@/hooks";
import CategoryByCountChart from "./charts/CategoryByCountChart";
import Activity from "./charts/Activity";
import LineGraph from "./charts/LineGraph";

const Insight = ({ isAdmin }) => {
  const params = useParams();
  const {
    valueratio,
    objectiveratio,
    effortbycategory,
    latestobjective,
    latestvalue,
    effortgraph,
  } = useAuth(); // Destructuring latestvalue and effortgraph from useAuth hook

  const [data, setData] = useState({
    valueRatio: [],
    objectiveRatio: [],
    effortCategories: {},
    latestObjective: null,
    latestValue: null,
    effortGraphData: [],
  });
  const [error, setError] = useState(null);

  const project_id = params.id;

  const fetchData = useCallback(async () => {
    try {
      if (!project_id) return;

      setError(null);

      const [
        valueRatioResult,
        objectiveRatioResult,
        effortCategoriesResult,
        latestObjectiveResult,
        latestValueResult,
        effortGraphDataResult,
      ] = await Promise.all([
        valueratio(project_id),
        objectiveratio(project_id),
        effortbycategory(project_id),
        latestobjective(project_id),
        latestvalue(project_id),
        effortgraph(project_id),
      ]);

      setData({
        valueRatio: valueRatioResult.status ? valueRatioResult.data : [],
        objectiveRatio: objectiveRatioResult.status
          ? objectiveRatioResult.data
          : [],
        effortCategories: effortCategoriesResult.status
          ? effortCategoriesResult.data
          : {},
        latestObjective: latestObjectiveResult.status
          ? latestObjectiveResult.data
          : null,
        latestValue: latestValueResult.status ? latestValueResult.data : null,
        effortGraphData: effortGraphDataResult.status
          ? effortGraphDataResult.data
          : [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  }, [
    project_id,
    valueratio,
    objectiveratio,
    effortbycategory,
    latestobjective,
    latestvalue,
    effortgraph,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = Object.entries(data.effortCategories);

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

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
          <h3 className="Design_effort_text mb-16 ">
            Value driven product activities ratio
          </h3>
          <div className="col-lg-6">
            {data.valueRatio.length > 0 ? (
              <BarChart data={data.valueRatio} />
            ) : (
              <p>No value ratio data available.</p>
            )}
          </div>
          <div className="col-lg-6">
            {data.objectiveRatio.length > 0 ? (
              <BarChart data={data.objectiveRatio} />
            ) : (
              <p>No objective ratio data available.</p>
            )}
          </div>
          <div className="col-lg-6">
            <h3 className="Design_effort_text mb-16 ">
              Design efforts focused Ratio
            </h3>
            <div className="row">
              {categories.map(([category, count], index) => (
                <div key={index} className="col-lg-6 mb-24">
                  <div className="effort-count-container">
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
          <div className="col-lg-6">
            <h3 className="Design_effort_text mb-16 ">Effort Graph</h3>
            <div className="row">
              <LineGraph data={data.effortGraphData} />
            </div>
          </div>
          <div className="col-lg-6">
            <h3 className="Design_effort_text mb-16 ">Effort Graph</h3>
            <div className="row">
              <Activity activities={data.latestObjective} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
