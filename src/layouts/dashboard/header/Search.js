import React from "react";

const Search = () => {
  return (
    <li
      className="nav-item mobile-search-icon d-flex d-lg-none"
      data-bs-toggle="modal"
      data-bs-target="#SearchModal"
    >
      <a className="nav-link" href="#">
        <i className="bx bx-search"></i>
      </a>
    </li>
  );
};

export default Search;
