"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dropdown, InputGroup } from "react-bootstrap";
import { Loader } from "@/components/shared/loader";
import { useMetaData } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";

const SearchSurgery = () => {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);

  // Hooks
  const [surgeries, isLoading, fetchSurgeries] = useMetaData(
    API_ROUTER.SEARCH_SURGERIES,
    {
      search: searchQuery?.trim(),
    }
  );
  const { push } = useRouter();

  useEffect(() => {
    fetchSurgeries({
      ...(searchQuery
        ? {
            search: searchQuery?.trim(),
          }
        : {}),
    });
  }, [searchQuery]);

  return (
    <InputGroup>
      <div
        className="position-relative search-bar d-lg-block d-none"
        data-bs-toggle="modal"
        data-bs-target="#SearchModal"
      >
        <input
          className="form-control px-5"
          placeholder="Search"
          value={searchQuery}
          onChange={({ target: { value } }) => {
            setSearchQuery(value);
            setShow(true);
          }}
        />
        <span
          className="position-absolute top-50 search-show ms-3 translate-middle-y start-0 top-50 fs-5"
          style={{ marginTop: "2px" }}
        >
          <i className="bx bx-search"></i>
        </span>
      </div>
      <Dropdown
        show={searchQuery.length > 0 && show}
        drop="end"
        autoClose
        className="d-lg-block d-none"
        onToggle={(show) => {
          setShow(show);
          setSearchQuery("");
        }}
      >
        <Dropdown.Menu style={{ width: "30%", top: 40 }}>
          {isLoading ? (
            <Loader />
          ) : surgeries && surgeries?.length > 0 ? (
            surgeries.map(({ id, surgery_name, surgery_type }) => (
              <Dropdown.Item
                key={id}
                onClick={() => {
                  setShow(false);
                  setSearchQuery("");
                  push(PATH_DASHBOARD.surgeries.view(id));
                }}
              >
                {surgery_name || surgery_type}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No Surgeries Found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </InputGroup>
  );
};

export default SearchSurgery;
