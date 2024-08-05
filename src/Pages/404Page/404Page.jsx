import React from "react";
import { Link } from "react-router-dom";
import "./404Page.css";

const FourOhFourPage = () => {
  return (
    <div className="FourOhFourPage-container">
      <div className="FourOhFourPage-content">
        <h1 className="FourOhFourPage-title">404</h1>
        <p className="FourOhFourPage-message">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link to="/home" className="FourOhFourPage-home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FourOhFourPage;
