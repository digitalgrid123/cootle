import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import BarChart from "./charts/BarChart";
import { useAuth } from "@/hooks";
import CategoryByCountChart from "./charts/CategoryByCountChart";
import Activity from "./charts/Activity";
import LineGraph from "./charts/LineGraph";
import SidebarTimelineComponent from "@/components/shared/SidebarTimelineComponent";
import { months, weeks, quarters } from "@/utils/timeConstants";

const getCurrentQuarter = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 1 && month <= 3) {
    return `${year}-Q1`;
  } else if (month >= 4 && month <= 6) {
    return `${year}-Q2`;
  } else if (month >= 7 && month <= 9) {
    return `${year}-Q3`;
  } else {
    return `${year}-Q4`;
  }
};

const Insight = () => {
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

  // State variables
  const [data, setData] = useState({
    valueRatio: [],
    objectiveRatio: [],
    effortCategories: {},
    latestObjective: null,
    latestValue: null,
    effortGraphData: [],
  });
  const [effortsListData, setEffortsListData] = useState(null);
  const [error, setError] = useState(null);
  const [isLifetimeClicked, setIsLifetimeClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Quarterly");
  const [selectedOptionItem, setSelectedOptionItem] = useState(
    getCurrentQuarter()
  );
  const [period, setPeriod] = useState();
  const [lifetime, setLifetime] = useState(false);

  const project_id = params.id;

  // Function to fetch effort data
  const fetchEffortData = async () => {
    try {
      if (project_id) {
        const result = await effortList(project_id);
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

  // Function to fetch data based on the selected option
  const fetchData = async () => {
    try {
      if (!project_id) return;
      setError(null);

      const { year, period, offset } = getFilterParams(
        selectedOption,
        selectedOptionItem,
        effortsListData
      );
      setPeriod(period);

      const [
        valueRatioResult,
        objectiveRatioResult,
        effortCategoriesResult,
        latestObjectiveResult,
        latestValueResult,
        effortGraphDataResult,
      ] = await Promise.all([
        valueratio(project_id, year, period, offset),
        objectiveratio(project_id, year, period, offset),
        effortbycategory(project_id, year, period, offset),
        latestobjective(project_id, year, period, offset),
        latestvalue(project_id, year, period, offset),
        effortgraph(project_id, year, period, offset),
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
    }
  };

  const getFilterParams = (
    selectedOption,
    selectedOptionItem,
    effortsListData
  ) => {
    const currentYear = new Date().getFullYear();

    // Extract unique years from effortsListData
    const years = new Set();
    const monthsSet = new Set();
    const weeksSet = new Set();
    const quartersSet = new Set();

    effortsListData?.forEach((effort) => {
      const createdDate = new Date(effort.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      years.add(year);
      monthsSet.add(month);
      weeksSet.add(week);
      quartersSet.add(quarter);
    });

    const uniqueMonths = Array.from(monthsSet);
    const uniqueWeeks = Array.from(weeksSet);
    const uniqueQuarters = Array.from(quartersSet);

    // Set default values
    let year = currentYear;
    let period = "quarterly";
    let offset = 0;

    if (lifetime) {
      return { year: null, period: null, offset: null };
    }

    if (selectedOptionItem) {
      const [itemYear, item] = selectedOptionItem.split("-");
      year = parseInt(itemYear, 10);

      switch (selectedOption) {
        case "Monthly":
          period = "monthly";
          if (uniqueMonths) {
            const monthIndex = uniqueMonths.indexOf(item);
            offset = calculateOffset(
              uniqueMonths,
              monthIndex,
              year === currentYear
            );
          }
          break;
        case "Weekly":
          period = "weekly";
          if (uniqueWeeks) {
            const weekIndex = uniqueWeeks.indexOf(item);
            offset = calculateOffset(
              uniqueWeeks,
              weekIndex,
              year === currentYear
            );
          }
          break;
        case "Quarterly":
          period = "quarterly";
          if (uniqueQuarters) {
            const quarterIndex = uniqueQuarters.indexOf(item);
            offset = calculateOffset(
              uniqueQuarters,
              quarterIndex,
              year === currentYear
            );
          }
          break;
        default:
          break;
      }
    }

    return { year, period, offset };
  };

  const calculateOffset = (optionsArray, currentIndex) => {
    if (currentIndex === -1) return 0;
    const remainingOptions = optionsArray.slice(currentIndex + 1);

    if (remainingOptions.length === 0) return 0;

    let offset = 0;
    for (let i = 0; i < optionsArray.length; i++) {
      if (i > currentIndex && !remainingOptions.includes(optionsArray[i])) {
        offset += 1;
      } else if (i > currentIndex) {
        offset = remainingOptions.indexOf(optionsArray[i]) + 1;
      }
    }

    return offset;
  };

  useEffect(() => {
    fetchEffortData();
    fetchData();
  }, [project_id, selectedOption, selectedOptionItem]);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option click in the dropdown
  const handleOptionClick = (option) => {
    if (option === "Lifetime") {
      handleLifetimeClick();
      return;
    }

    setSelectedOption(option);

    switch (option) {
      case "Monthly":
        setSelectedOptionItem(
          `${new Date().getFullYear()}-${months[new Date().getMonth()]}`
        );
        break;
      case "Weekly":
        setSelectedOptionItem(
          `${new Date().getFullYear()}-Week ${getISOWeek(new Date())}`
        );
        break;
      case "Quarterly":
        setSelectedOptionItem(getCurrentQuarter());
        break;
      default:
        setSelectedOptionItem(null);
        break;
    }
    setIsLifetimeClicked(false);
    setIsDropdownOpen(false);
  };

  // Function to check if an option is active
  const isActive = (year, option) => {
    return selectedOptionItem === `${year}-${option}` ? "active" : "";
  };

  // Function to handle date click
  const handleDateClick = (year, option) => {
    setSelectedOptionItem(`${year}-${option}`);
    setIsLifetimeClicked(false);
    setLifetime(false);
  };

  const renderDates = () => {
    const activeDates = new Set();
    const years = new Set();

    // Populate activeDates and years based on effortsListData
    effortsListData?.forEach((effort) => {
      const createdDate = new Date(effort.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      years.add(year); // Add year to the set of years

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

    const sortedYears = Array.from(years).sort((a, b) => b - a); // Sort years in descending order

    const getOffset = (item, list) => {
      const index = list.indexOf(item);
      return list.length - 1 - index;
    };

    return (
      <ul className="timeline-dates">
        {sortedYears.map((year) => (
          <React.Fragment key={year}>
            {selectedOption === "Monthly" &&
              months
                .slice()
                .reverse()
                .map((month) => {
                  const item = `${year}-${month}`;
                  return activeDates.has(item) ? (
                    <li
                      key={item}
                      className={`cursor-pointer ${isActive(year, month)} ${
                        getOffset(month, months) === 0 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, month)}
                    >
                      <span>{month}</span>
                      <span>{year}</span>
                    </li>
                  ) : null;
                })}

            {selectedOption === "Weekly" &&
              weeks
                .slice()
                .reverse()
                .map((week) => {
                  const item = `${year}-${week}`;
                  return activeDates.has(item) ? (
                    <li
                      key={item}
                      className={`cursor-pointer ${isActive(year, week)} ${
                        getOffset(week, weeks) === 0 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, week)}
                    >
                      <span className="week">{week}</span>
                      <span className="year">{year}</span>
                    </li>
                  ) : null;
                })}

            {selectedOption === "Quarterly" &&
              quarters
                .slice()
                .reverse()
                .map((quarter) => {
                  const item = `${year}-${quarter}`;
                  return activeDates.has(item) ? (
                    <li
                      key={item}
                      className={`cursor-pointer ${isActive(year, quarter)} ${
                        getOffset(quarter, quarters) === 0 ? "last-item" : ""
                      }`}
                      onClick={() => handleDateClick(year, quarter)}
                    >
                      <span className="quarter">{quarter}</span>
                      <span className="year">{year}</span>
                    </li>
                  ) : null;
                })}

            <div
              className="border_bottom_soft-lavender  w-100"
              key={`border-${year}`}
            />
          </React.Fragment>
        ))}
      </ul>
    );
  };

  // Function to get the ISO week number
  const getISOWeek = (date) => {
    const time = new Date(date.getTime());
    time.setHours(0, 0, 0, 0);
    time.setDate(time.getDate() + 3 - ((time.getDay() + 6) % 7));
    const week1 = new Date(time.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((time.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  // Function to handle lifetime click
  const handleLifetimeClick = () => {
    setIsLifetimeClicked(true);
    setSelectedOption("Quarterly");
    setLifetime(true);
    setSelectedOptionItem(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex flex-row gap-3 h-100  justify-content-between">
      <div className="wrapper-company w-100 d-flex flex-column">
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between mb-20 ">
              <h1 className="main-insight-text">
                Value proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
              <h2 className="define-text cursor-pointer">
                Definitions
                <span className="question-mark">?</span>
              </h2>
            </div>

            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  OV:DE Ratio™ Organisation value to design efforts ratio
                </h2>
                <BarChart data={data.valueRatio} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  Latest org. values-focused design efforts
                </h2>
                <Activity activities={data.latestValue} />
              </div>
            </div>
          </div>
        </div>
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="main-insight-text mb-20 ">
                Design efforts focused Ratio
              </h1>
            </div>

            <div className="col-lg-6">
              <div className="row">
                {Object.entries(data.effortCategories).map(
                  ([category, count], index) => (
                    <div key={index} className="col-lg-6 mb-24">
                      <div className="effort-count-container">
                        <h3 className="value-text mb-24">{category}</h3>
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="d-flex flex-column gap-1">
                            <h2 className="effort-complete">Efforts done</h2>
                            <h2 className="count-text">{count}</h2>
                          </div>
                          <CategoryByCountChart
                            count={count}
                            category={category}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">Design efforts comparison</h2>
                <LineGraph data={data?.effortGraphData} period={period} />
              </div>
            </div>
          </div>
        </div>
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="main-insight-text mb-20 ">
                Business objectives proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
            </div>

            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  BO:DE Ratio™ Business objectives to design effort ratio
                </h2>
                <BarChart data={data.objectiveRatio} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  Latest business objectives-focused design efforts
                </h2>
                <Activity activities={data.latestObjective} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarTimelineComponent
        isLifetimeClicked={isLifetimeClicked}
        isDropdownOpen={isDropdownOpen}
        selectedOption={selectedOption}
        toggleDropdown={toggleDropdown}
        handleOptionClick={handleOptionClick}
        renderDates={renderDates}
      />
    </div>
  );
};

export default Insight;
