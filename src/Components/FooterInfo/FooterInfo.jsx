import React from "react";
import {
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
//
const FooterInfo = () => (
  <div className="footer-info">
    <ul>
      <li>
        <FaTruck className="icon" /> Free delivery
      </li>
      <li>
        <FaShieldAlt className="icon" /> Non-contact shipping
      </li>
      <li>
        <FaCheckCircle className="icon" /> Money-back guarantee
      </li>
      <li>
        <FaCreditCard className="icon" /> Secure payments
      </li>
    </ul>
    <p>© 2024 E-commerce. Design & Develop with ❤️ by Moustafa.</p>
  </div>
);

export default FooterInfo;
