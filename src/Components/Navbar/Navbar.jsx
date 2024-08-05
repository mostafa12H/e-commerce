import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, clearUser } from "../../Features/userSlice";
import "./Navbar.css";
import ScrollToBottomButton from "../../Components/Scroll/ScrollToBottomButton";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar sticky-top">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/home">
            <img
              src="https://i.pinimg.com/originals/ab/ca/4c/abca4c51c7e166b2980105b5e98b7ac2.jpg"
              alt="Logo"
              className="logo"
            />
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link
            to="/home"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/contactUs"
            className="nav-item"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          {/* <ScrollToBottomButton /> */}
        </nav>
        <div className="social-icons">
          <FontAwesomeIcon icon={faFacebookF} className="icon" />
          <FontAwesomeIcon icon={faTwitter} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faYoutube} className="icon" />
          <div
            className="user-dropdown"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <img src="/favicon-32x32.png" className="user-image" alt="User" />
            <div
              className="dropdown-menu"
              style={{ display: dropdownOpen ? "flex" : "none" }}
            >
              <span className="dropdown-item-text">
                Welcome {user.username || "Guest"}
              </span>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/account">
                Account
              </Link>
              <Link className="dropdown-item" to="/helpcenter">
                Helpcenter
              </Link>
              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
