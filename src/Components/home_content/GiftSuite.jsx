// GiftSuite.js
import React from "react";
import "./GiftSuite.css";
import { Link } from "react-router-dom";
//
const GiftSuite = () => {
  return (
    <div className="container-gift">
      <div className="content-gift">
        <h2 className="heading2">New Collection</h2>
        <h1 className="heading1">The Gift Suite</h1>
        <p className="paragraph">Our latest collection of essential basics.</p>
        <Link to="/Products" className="g-home-link">
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default GiftSuite;
