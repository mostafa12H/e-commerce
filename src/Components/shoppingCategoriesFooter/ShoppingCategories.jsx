import React from "react";
import { Link } from "react-router-dom";
import categories from "../../Contexts/categories";
//
const ShoppingCategories = () => (
  <div className="shopping-categories">
    <h3>OUR SHOPPING CATEGORIES</h3>
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          <Link to={`/${category.toLowerCase()}`} activeClassName="active-link">
            {category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ShoppingCategories;
