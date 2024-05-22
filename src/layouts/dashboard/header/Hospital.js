import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/shared/inputs";

const Hospital = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [containerHeight, setContainerHeight] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  const { HospitalDropdown, setHospital } = useAuth();
  const { push } = useRouter();

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchDataFor = async (apiFunction, setDataFunction) => {
      try {
        const result = await apiFunction();
        if (result.status) {
          setDataFunction(result.data);
        } else {
          console.error("Failed to fetch stats data");
        }
      } catch (error) {
        console.error("Error fetching stats data", error);
      }
    };
    if (HospitalDropdown) {
      fetchDataFor(HospitalDropdown, setData);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight + "px");
    }

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [data]);

  const handleClick = (id, name) => {
    setSelectedHospital(name);
    setHospital(id);
    setIsOpen(false);
  };

  const handleSelectHospital = () => {
    setSelectedHospital(null);
    setHospital(null);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedHospital(null);
    setHospital(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data
    ? data.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <li
        className="nav-item mobile-search-icon d-flex"
        data-bs-toggle="modal"
        data-bs-target="#SearchModal"
      >
        <Link
          className="nav-link fs-14 hos-drop"
          href={PATH_DASHBOARD.hospitals.add}
        >
          Add Hospital
        </Link>
      </li>
      <div className="nav-item dropdown relative">
        <div
          className="nav-link dropdown-toggle fs-14 hos-drop"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
        >
          {selectedHospital || "Select Hospital"}
        </div>
        {selectedHospital && (
          <button
            className="btn btn-outline-primary"
            onClick={handleClearSelection}
          >
            Clear
          </button>
        )}
        {isOpen && (
          <div
            className="dropdown-menu dropdown-menu-end absolute top-12 start-0 z-10 bg-white shadow-md py-2 rounded show"
            style={{
              position: "absolute",
              top: "45px",
              left: "0",
              maxHeight: "400px",
              height: containerHeight,
              overflow: "auto",
              scrollbarWidth: "thin",
              maxWidth: "400px",
              scrollbarColor: "rgb(132,213,237)",
            }}
            ref={containerRef}
          >
            <div className="px-4 w-50 pt-2">
              <SearchInput
                name="hospital"
                placeholder={"Search Hospital"}
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </div>
            <hr />

            {filteredData.length === 0 && (
              <div className="dropdown-item px-4 py-2 text-gray-800">
                No results found
              </div>
            )}
            {filteredData.map((hospital, index) => (
              <div
                key={index}
                className="dropdown-item px-4 py-2 text-gray-800"
                onClick={() => handleClick(hospital.id, hospital.name)}
                style={{ cursor: "pointer" }}
              >
                {hospital.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Hospital;
