import React, { useEffect, useState } from "react";
import "./FilterCategory.css";

const FilterCategory = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/products/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data])); // Include "All" option
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="categories-container">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        Filter by Category: {selectedCategory}
      </div>
      <ul className={`categories-list ${isDropdownOpen ? "show" : ""}`}>
        {categories.map((category) => (
          <li key={category} className="category-item">
            <button onClick={() => handleCategorySelect(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
