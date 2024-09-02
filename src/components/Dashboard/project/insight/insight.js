import React, { useEffect, useState } from "react";
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

const monthOffsets = {
  Jan: 11,
  Feb: 10,
  Mar: 9,
  Apr: 8,
  May: 7,
  Jun: 6,
  Jul: 5,
  Aug: 4,
  Sep: 3,
  Oct: 2,
  Nov: 1,
  Dec: 0,
};
const weekOffsets = Object.fromEntries(
  Array.from({ length: 52 }, (_, i) => [`Week ${52 - i}`, i])
);

const quarterOffsets = {
  Q1: 3,
  Q2: 2,
  Q3: 1,
  Q4: 0,
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
  const [selectedOptionItem, setSelectedOptionItem] = useState(null);

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
  useEffect(() => {
    if (effortsListData) {
      if (selectedOption === "Quarterly") {
        const filteredEfforts = effortsListData.filter(
          (effort) =>
            new Date(effort.created_at).getFullYear() ===
            new Date().getFullYear()
        );

        const availableQuarters = filteredEfforts.map(
          (effort) =>
            `Q${Math.ceil((new Date(effort.created_at).getMonth() + 1) / 3)}`
        );

        if (availableQuarters.includes(getCurrentQuarter())) {
          setSelectedOptionItem(getCurrentQuarter());
        } else {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-${
              availableQuarters[availableQuarters.length - 1]
            }`
          );
        }
      }
    }
  }, [effortsListData, selectedOption]);

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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentWeek = `Week ${getISOWeek(currentDate)}`;
    const currentQuarter = `Q${Math.ceil((currentDate.getMonth() + 1) / 3)}`;

    // Organize efforts by year
    const years = new Set();
    const yearWiseData = {};

    effortsListData?.forEach((effort) => {
      const createdDate = new Date(effort.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      if (!yearWiseData[year]) {
        yearWiseData[year] = {
          monthsSet: new Set(),
          weeksSet: new Set(),
          quartersSet: new Set(),
        };
      }

      yearWiseData[year].monthsSet.add(month);
      yearWiseData[year].weeksSet.add(week);
      yearWiseData[year].quartersSet.add(quarter);

      years.add(year);
    });

    // Convert sets to arrays for easier manipulation
    const uniqueYears = Array.from(years);

    const uniqueMonthsByYear = {};
    const uniqueWeeksByYear = {};
    const uniqueQuartersByYear = {};

    uniqueYears.forEach((year) => {
      uniqueMonthsByYear[year] = Array.from(yearWiseData[year].monthsSet);
      uniqueWeeksByYear[year] = Array.from(yearWiseData[year].weeksSet);
      uniqueQuartersByYear[year] = Array.from(yearWiseData[year].quartersSet);
    });

    // Identify missing values with the current date consideration
    const identifyMissingValues = (
      dataArray,
      predefinedArray,
      isCurrentYear,
      currentPeriod
    ) => {
      const filteredPredefinedArray = isCurrentYear
        ? predefinedArray.slice(0, predefinedArray.indexOf(currentPeriod) + 1)
        : predefinedArray;

      return filteredPredefinedArray.filter(
        (item) => !dataArray.includes(item)
      );
    };

    // Calculate missing options for the current year
    const missingMonthsCurrentYear = identifyMissingValues(
      uniqueMonthsByYear[currentYear] || [],
      months,
      true,
      months[currentMonthIndex]
    );
    const missingWeeksCurrentYear = identifyMissingValues(
      uniqueWeeksByYear[currentYear] || [],
      weeks,
      true,
      currentWeek
    );
    const missingQuartersCurrentYear = identifyMissingValues(
      uniqueQuartersByYear[currentYear] || [],
      quarters,
      true,
      currentQuarter
    );

    // Calculate missing options for previous years
    const missingMonthsPreviousYears = uniqueYears.reduce((acc, year) => {
      if (year !== currentYear) {
        acc[year] = identifyMissingValues(
          uniqueMonthsByYear[year] || [],
          months,
          false
        );
      }
      return acc;
    }, {});

    const missingWeeksPreviousYears = uniqueYears.reduce((acc, year) => {
      if (year !== currentYear) {
        acc[year] = identifyMissingValues(
          uniqueWeeksByYear[year] || [],
          weeks,
          false
        );
      }
      return acc;
    }, {});

    const missingQuartersPreviousYears = uniqueYears.reduce((acc, year) => {
      if (year !== currentYear) {
        acc[year] = identifyMissingValues(
          uniqueQuartersByYear[year] || [],
          quarters,
          false
        );
      }
      return acc;
    }, {});

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

      let optionsArray = [];
      let offsetCalculationFn;

      switch (selectedOption) {
        case "Monthly":
          period = "monthly";
          optionsArray = uniqueMonthsByYear[year] || months;
          offsetCalculationFn =
            year === currentYear
              ? (array, index) =>
                  calculateCurrentYearOffset(
                    array,
                    index,
                    missingMonthsCurrentYear,
                    period
                  )
              : (array, index) =>
                  calculatePreviousYearOffset(
                    array,
                    index,
                    missingMonthsPreviousYears[year],
                    period
                  );
          break;
        case "Weekly":
          period = "weekly";
          optionsArray = uniqueWeeksByYear[year] || weeks;
          offsetCalculationFn =
            year === currentYear
              ? (array, index) =>
                  calculateCurrentYearOffset(
                    array,
                    index,
                    missingWeeksCurrentYear,
                    period
                  )
              : (array, index) =>
                  calculatePreviousYearOffset(
                    array,
                    index,
                    missingWeeksPreviousYears[year],
                    period
                  );
          break;
        case "Quarterly":
          period = "quarterly";
          optionsArray = uniqueQuartersByYear[year] || quarters;
          offsetCalculationFn =
            year === currentYear
              ? (array, index) =>
                  calculateCurrentYearOffset(
                    array,
                    index,
                    missingQuartersCurrentYear,
                    period
                  )
              : (array, index) =>
                  calculatePreviousYearOffset(
                    array,
                    index,
                    missingQuartersPreviousYears[year],
                    period
                  );
          break;
        default:
          break;
      }

      if (optionsArray.length > 0) {
        const itemIndex = optionsArray.indexOf(item);
        offset = offsetCalculationFn(optionsArray, itemIndex);
      }
    }

    return { year, period, offset };
  };

  const calculateCurrentYearOffset = (
    optionsArray,
    currentIndex,
    missingOptionCurrentYear,
    offsetType = "monthly"
  ) => {
    // Combine optionsArray with missingOptionCurrentYear and sort them in sequence
    const combinedOptions = [...optionsArray, ...missingOptionCurrentYear].sort(
      (a, b) => {
        if (offsetType === "monthly") {
          return months.indexOf(a) - months.indexOf(b);
        } else if (offsetType === "weekly") {
          return weeks.indexOf(a) - weeks.indexOf(b);
        } else if (offsetType === "quarterly") {
          return quarters.indexOf(a) - quarters.indexOf(b);
        }
        return 0;
      }
    );

    // Get the updated index of the selected option in the combined array
    const updatedCurrentIndex = combinedOptions.indexOf(
      optionsArray[currentIndex]
    );

    // Calculate the offset based on the combined array
    if (updatedCurrentIndex === -1) return 0;

    const totalOptions = combinedOptions.length;
    const offset = totalOptions - 1 - updatedCurrentIndex;

    return offset;
  };

  const calculatePreviousYearOffset = (
    optionsArray,
    currentIndex,
    missingOptionPreviousYear,
    offsetType = "monthly" // Default to "monthly" if not specified
  ) => {
    let offsetMap;
    switch (offsetType) {
      case "monthly":
        offsetMap = monthOffsets;
        break;
      case "weekly":
        offsetMap = weekOffsets;
        break;
      case "quarterly":
        offsetMap = quarterOffsets;
        break;
      default:
        throw new Error("Invalid offset type");
    }

    if (currentIndex === -1) return 0;

    const currentOption = optionsArray[currentIndex];
    const offset = offsetMap[currentOption] || 0;

    return offset;
  };

  useEffect(() => {
    fetchEffortData();
    fetchData();
  }, [project_id, selectedOption, selectedOptionItem, lifetime]);

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

    setLifetime(false); // Reset the lifetime click state
    setIsLifetimeClicked(false); // Reset the lifetime click state
    setIsDropdownOpen(false);

    // Update selectedOption and selectedOptionItem based on the selected option
    setSelectedOption(option);

    switch (option) {
      case "Monthly":
        const availableMonths = effortsListData
          .filter(
            (effort) =>
              new Date(effort.created_at).getFullYear() ===
              new Date().getFullYear()
          )
          .map((effort) => months[new Date(effort.created_at).getMonth()]);
        if (availableMonths.includes(`${months[new Date().getMonth()]}`)) {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-${months[new Date().getMonth()]}`
          );
        } else {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-${
              availableMonths[availableMonths.length - 1]
            }`
          );
        }
        break;

      case "Weekly":
        const availableWeeks = effortsListData
          .filter(
            (effort) =>
              new Date(effort.created_at).getFullYear() ===
              new Date().getFullYear()
          )
          .map((effort) => `Week ${getISOWeek(new Date(effort.created_at))}`);
        if (availableWeeks.includes(`Week ${getISOWeek(new Date())}`)) {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-Week ${getISOWeek(new Date())}`
          );
        } else {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-${
              availableWeeks[availableWeeks.length - 1]
            }`
          );
        }
        break;

      case "Quarterly":
        let availableQuarters = effortsListData
          .filter(
            (effort) =>
              new Date(effort.created_at).getFullYear() ===
              new Date().getFullYear()
          )
          .map(
            (effort) =>
              `Q${Math.ceil((new Date(effort.created_at).getMonth() + 1) / 3)}`
          );
        if (availableQuarters.includes(getCurrentQuarter())) {
          setSelectedOptionItem(getCurrentQuarter());
        } else {
          setSelectedOptionItem(
            `${new Date().getFullYear()}-${
              availableQuarters[availableQuarters.length - 1]
            }`
          );
        }
        break;

      default:
        setSelectedOptionItem(null);
        break;
    }
  };

  // Function to check if an option is active
  const isActive = (year, option) => {
    if (lifetime) {
      return "";
    }
    return selectedOptionItem === `${year}-${option}` ? "active" : "";
  };

  // Function to handle date click
  const handleDateClick = (year, option) => {
    setSelectedOptionItem(`${year}-${option}`);
    setIsLifetimeClicked(false); // If a specific date is clicked, it's not lifetime anymore
    setLifetime(false); // Reset lifetime
  };

  const renderDates = () => {
    const activeDates = new Set();
    const years = new Set();

    effortsListData?.forEach((effort) => {
      const createdDate = new Date(effort.created_at);
      const year = createdDate.getFullYear();
      const month = months[createdDate.getMonth()];
      const week = `Week ${getISOWeek(createdDate)}`;
      const quarter = `Q${Math.ceil((createdDate.getMonth() + 1) / 3)}`;

      years.add(year);

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

    const sortedYears = Array.from(years).sort((a, b) => b - a);

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
                      className={`cursor-pointer ${isActive(year, month)}`}
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
                      className={`cursor-pointer ${isActive(year, week)}`}
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
                      className={`cursor-pointer ${isActive(year, quarter)}`}
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
    setLifetime(true);
    setIsLifetimeClicked(true);
    setIsDropdownOpen(false);

    // Ensure selectedOptionItem is set to the current period
    switch (selectedOption) {
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
        setSelectedOptionItem(getCurrentQuarter());
        break;
    }
  };

  const handleDefinitionsClick = () => {
    window.open(
      "https://ritzy-time-de0.notion.site/Cootle-Definitions-638ecf0682544a3382e8b43a91688ddc",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="d-flex flex-row gap-3 h-100  justify-content-between">
      <div className="wrapper-company w-100 d-flex flex-column">
        <div className="insight-sidebar w-100 d-flex flex-column gap-4">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between mb-16 ">
              <h1 className="main-insight-text">
                Value proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
              <h2
                className="define-text cursor-pointer"
                onClick={handleDefinitionsClick}
              >
                Definitions
                <span className="question-mark">?</span>
              </h2>
            </div>

            <div className="effort-list">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  OV:DE Ratio™ Organisation value to design efforts ratio
                </h2>
                <BarChart data={data.valueRatio} />
              </div>

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
              <h1 className="main-insight-text mb-16 ">
                Design efforts focused Ratio
              </h1>
            </div>

            <div className="effort-list">
              <div className="effort-list">
                {Object.entries(data.effortCategories).map(
                  ([category, count], index) => (
                    <div key={index}>
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
              <h1 className="main-insight-text mb-16 ">
                Business objectives proportion analysis
                <span className="tm-symbol">™</span>
              </h1>
            </div>

            <div className="effort-list">
              <div className="effort-count-container">
                <h2 className="value-text mb-16">
                  BO:DE Ratio™ Business objectives to design effort ratio
                </h2>
                <BarChart data={data.objectiveRatio} />
              </div>

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
