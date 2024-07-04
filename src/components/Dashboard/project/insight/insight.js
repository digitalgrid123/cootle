import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import BarChart from "./charts/BarChart";
import { useAuth } from "@/hooks";
import CategoryByCountChart from "./charts/CategoryByCountChart";
import Activity from "./charts/Activity";
import LineGraph from "./charts/LineGraph";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);

const quarters = ["Q1", "Q2", "Q3", "Q4"];

const Insight = ({ isAdmin }) => {
  const params = useParams();
  const {
    valueratio,
    objectiveratio,
    effortbycategory,
    latestobjective,
    latestvalue,
    effortgraph,
    effortList,
  } = useAuth();

  const [data, setData] = useState({
    valueRatio: [],
    objectiveRatio: [],
    effortCategories: {},
    latestObjective: null,
    latestValue: null,
    effortGraphData: [],
  });

  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Quarterly");
  const [selectedOptionItem, setSelectedOptionItem] = useState(null);
  const [isLifetimeClicked, setIsLifetimeClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [effortsListData, setEffortsListData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const project_id = params.id;

  const fetchEffortData = async () => {
    try {
      if (params?.id) {
        const result = await effortList(params.id);
        if (result.status) {
          setEffortsListData(result.data);
        } else {
          throw new Error("Failed to fetch effort list");
        }
      }
    } catch (error) {
      console.error("Error fetching effort list:", error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      if (!project_id) return;

      setError(null);

      let start, end;

      switch (selectedOption) {
        case "Monthly":
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1; // Adding 1 to get month number (January is 1)

          // Ensure month is formatted as two digits (e.g., 01, 02, ..., 12)
          const formattedMonth = currentMonth.toString().padStart(2, "0");

          start = `${currentYear}-${formattedMonth}-01`;
          end = `${currentYear}-${formattedMonth}-31`;
          break;
        case "Weekly":
          const weekStart = new Date();
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          start = weekStart.toISOString().split("T")[0];
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          end = weekEnd.toISOString().split("T")[0];
          break;
        case "Quarterly":
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth();
          switch (month) {
            case 0:
            case 1:
            case 2:
              start = `${year}-01-01`;
              end = `${year}-03-31`;
              break;
            case 3:
            case 4:
            case 5:
              start = `${year}-04-01`;
              end = `${year}-06-30`;
              break;
            case 6:
            case 7:
            case 8:
              start = `${year}-07-01`;
              end = `${year}-09-30`;
              break;
            case 9:
            case 10:
            case 11:
              start = `${year}-10-01`;
              end = `${year}-12-31`;
              break;
            default:
              break;
          }
          break;
        default:
          start = null;
          end = null;
          break;
      }

      const [
        valueRatioResult,
        objectiveRatioResult,
        effortCategoriesResult,
        latestObjectiveResult,
        latestValueResult,
        effortGraphDataResult,
      ] = await Promise.all([
        valueratio(project_id, start, end),
        objectiveratio(project_id, start, end),
        effortbycategory(project_id, start, end),
        latestobjective(project_id, start, end),
        latestvalue(project_id, start, end),
        effortgraph(project_id, start, end),
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
    selectedOption,
  ]);
  useEffect(() => {
    setSelectedOptionItem(`${new Date().getFullYear()}-${getCurrentQuarter()}`);
  }, []);

  useEffect(() => {
    fetchEffortData();
    fetchData();
  }, [params.id, fetchData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    switch (option) {
      case "Lifetime":
        setSelectedOption("Quarterly");
        setIsLifetimeClicked(true);
        setSelectedOptionItem(null);
        break;
      case "Monthly":
        setIsLifetimeClicked(false);
        setSelectedOptionItem(
          `${new Date().getFullYear()}-${months[new Date().getMonth()]}`
        );
        break;
      case "Weekly":
        setIsLifetimeClicked(false);
        setSelectedOptionItem(
          `${new Date().getFullYear()}-Week ${getISOWeek(new Date())}`
        );
        break;
      case "Quarterly":
        setIsLifetimeClicked(false);
        setSelectedOptionItem(
          `${new Date().getFullYear()}-${getCurrentQuarter()}`
        );
        break;
      default:
        setSelectedOptionItem(null);
        break;
    }

    setIsDropdownOpen(false);
  };

  const isActive = (year, option) => {
    return selectedOptionItem === `${year}-${option}` ? "active" : "";
  };

  const handleDateClick = async (year, option) => {
    setSelectedOptionItem(`${year}-${option}`);
    setIsLifetimeClicked(false);

    let start, end;

    switch (selectedOption) {
      case "Monthly":
        const formattedMonth = months.indexOf(option) + 1; // Get month number from month name
        start = `${year}-${formattedMonth.toString().padStart(2, "0")}-01`;
        end = `${year}-${formattedMonth.toString().padStart(2, "0")}-31`;
        break;
      case "Weekly":
        // Calculate start and end of the selected week
        const weekStart = new Date(year, 0); // January 1st of the selected year
        weekStart.setDate(
          weekStart.getDate() + (parseInt(option.split(" ")[1], 10) - 1) * 7
        ); // Adjust to the selected week
        start = weekStart.toISOString().split("T")[0];

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // End of the selected week
        end = weekEnd.toISOString().split("T")[0];
        break;
      case "Quarterly":
        const quarterIndex = quarters.indexOf(option) + 1; // Get quarter index (1, 2, 3, 4)
        const quarterStartMonth = 3 * (quarterIndex - 1) + 1; // Calculate starting month of the quarter
        start = `${year}-${quarterStartMonth.toString().padStart(2, "0")}-01`;
        end = new Date(year, quarterStartMonth + 2, 0)
          .toISOString()
          .split("T")[0]; // Calculate end of the quarter
        break;
      default:
        start = null;
        end = null;
        break;
    }

    try {
      const [
        valueRatioResult,
        objectiveRatioResult,
        effortCategoriesResult,
        latestObjectiveResult,
        latestValueResult,
        effortGraphDataResult,
      ] = await Promise.all([
        valueratio(project_id, start, end),
        objectiveratio(project_id, start, end),
        effortbycategory(project_id, start, end),
        latestobjective(project_id, start, end),
        latestvalue(project_id, start, end),
        effortgraph(project_id, start, end),
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
  };

  const renderDates = () => {
    const activeDates = new Set(); // Use a set to track active dates

    // Collect active dates based on selectedOption and purposeListData
    effortsListData?.forEach((purpose) => {
      const createdDate = new Date(purpose.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      switch (selectedOption) {
        case "Monthly":
          activeDates.add(`${year}-${month}`);
          break;
        case "Weekly":
          activeDates.add(`${year}-${week}`);
          break;
        case "Quarterly":
          activeDates.add(`${year}-${quarter}`);
          break;
        default:
          break;
      }
    });

    return (
      <ul className="timeline-dates">
        {years.map((year) => (
          <React.Fragment key={year}>
            {selectedOption === "Monthly" &&
              months.map(
                (month, index) =>
                  activeDates.has(`${year}-${month}`) && (
                    <li
                      key={`${year}-${month}-${index}`}
                      className={`cursor-pointer ${isActive(year, month)} ${
                        index === months.length - 1 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, month)}
                    >
                      <span>{month}</span>
                      <span>{year}</span>
                    </li>
                  )
              )}

            {selectedOption === "Weekly" &&
              weeks.map(
                (week, index) =>
                  activeDates.has(`${year}-${week}`) && (
                    <li
                      key={`${year}-${week}-${index}`}
                      className={`cursor-pointer ${isActive(year, week)} ${
                        index === weeks.length - 1 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, week)}
                    >
                      <span className="week">{week}</span>
                      <span className="year">{year}</span>
                    </li>
                  )
              )}

            {selectedOption === "Quarterly" &&
              quarters.map(
                (quarter, index) =>
                  activeDates.has(`${year}-${quarter}`) && (
                    <li
                      key={`${year}-${quarter}-${index}`}
                      className={`cursor-pointer ${isActive(year, quarter)} ${
                        index === quarters.length - 1 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, quarter)}
                    >
                      <span>{quarter}</span>
                      <span>{year}</span>
                    </li>
                  )
              )}
          </React.Fragment>
        ))}
      </ul>
    );
  };

  const getCurrentQuarter = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    return `Q${Math.ceil(month / 3)}`;
  };

  const getISOWeek = (date) => {
    const dayOne = new Date(date.getFullYear(), 0, 1);
    const numDays = Math.floor(
      (date.getTime() - dayOne.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((date.getDay() + 1 + numDays) / 7);
  };

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="d-flex flex-row gap-3 h-100  justify-content-between">
      <div className="wrapper-company w-100 d-flex flex-column">
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between mb-16">
              <h1 className="page-title-heading weight-700">
                Value proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
              <h2 className="define-text cursor-pointer">
                Definitions
                <span className="question-mark">?</span>
              </h2>
            </div>

            <div className="col-lg-6">
              {data.valueRatio.length > 0 ? (
                <BarChart data={data.valueRatio} />
              ) : (
                <p>No value ratio data available.</p>
              )}
            </div>
            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  Latest business outcome driven product activities
                </h2>
                <Activity activities={data.latestValue} />
              </div>
            </div>
          </div>
        </div>
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-title-heading weight-700 mb-16">
                Design efforts focused Ratio
              </h1>
            </div>

            <div className="col-lg-6">
              <div className="row">
                {Object.entries(data.effortCategories).map(
                  ([category, count], index) => (
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
                  )
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <LineGraph data={data.effortGraphData} />
            </div>
          </div>
        </div>
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-title-heading weight-700 mb-16">
                Business objectives proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
            </div>

            <div className="col-lg-6">
              {data.objectiveRatio.length > 0 ? (
                <BarChart data={data.objectiveRatio} />
              ) : (
                <p>No objective ratio data available.</p>
              )}
            </div>
            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  Latest business outcome driven product activities
                </h2>
                <Activity activities={data.latestObjective} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-company h-100">
        <div className="company-sidebar bg-grey-light  w-100 d-flex flex-column gap-4 h-100">
          <div className="filter-container">
            <div className="d-flex align-items-center flex-column border_bottom_faint pb-24 ">
              <div
                className="d-flex align-items-center gap-1 justify-content-center cursor-pointer mb-24"
                onClick={toggleDropdown}
              >
                <h1 className="timeline-text">Timeline</h1>
                <img
                  src="/assets/images/mark/dropdown-icon.svg"
                  alt="dropdown-icon"
                />
              </div>
              <div
                onClick={() => handleOptionClick("Lifetime")}
                className={`cursor-pointer lifetime ${
                  isLifetimeClicked ? "active" : ""
                }`}
              >
                <h1 className="timeline-text">Lifetime</h1>
              </div>
              {isDropdownOpen && (
                <ul className="timeline-dropdown">
                  <li
                    onClick={() => handleOptionClick("Monthly")}
                    className={selectedOption === "Monthly" ? "active" : ""}
                  >
                    Monthly
                  </li>
                  <li
                    onClick={() => handleOptionClick("Weekly")}
                    className={selectedOption === "Weekly" ? "active" : ""}
                  >
                    Weekly
                  </li>
                  <li
                    onClick={() => handleOptionClick("Quarterly")}
                    className={selectedOption === "Quarterly" ? "active" : ""}
                  >
                    Quarterly
                  </li>
                </ul>
              )}
            </div>
            {renderDates()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insight;
