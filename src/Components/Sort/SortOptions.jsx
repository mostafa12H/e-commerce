import React from "react";
import "./SortOptions.css";

const SortOptions = ({ onSort }) => {
  const handleSortChange = (event) => {
    const newOrder = event.target.value;
    onSort(newOrder);
  };

  return (
    <div className="sort-options-container">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortOptions;
