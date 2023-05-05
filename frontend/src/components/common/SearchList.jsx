import React from "react";

const SearchList = ({ handleSearch, searchText = "Search by name" }) => {
  return (
    <div style={{ maxWidth: "250px" }}>
      <div className="input-group has-validation border rounded">
        <span className="input-group-text border-0 bg-light">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="search"
          placeholder={`${searchText}...`}
          className="form-control border-0"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchList;
