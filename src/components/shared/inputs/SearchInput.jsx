import React from "react";

const SearchInput = ({
  name,
  placeholder = "Search....",
  id = "search",
  style = {},
  value,
  onChange,
  isIcon = true,
}) => {
  return (
    <div className="isearch me-sm-2 mb-1">
      {isIcon ? <i className="bx bx-search"></i> : ""}
      <input
        type="search"
        name={name}
        className="form-control"
        placeholder={placeholder}
        style={{ minWidth: "250px", ...style }}
        value={value}
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
