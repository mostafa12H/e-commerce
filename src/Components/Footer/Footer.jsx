import React from "react";
import Newsletter from "../NewsLetter/NewsLetter";
import ShoppingCategories from "../shoppingCategoriesFooter/ShoppingCategories";
import FooterInfo from "./../FooterInfo/FooterInfo";
import "./Footer.css";

const Footer = () => (
  <footer>
    <div className="footer-content">
      <ShoppingCategories />
      <Newsletter />
    </div>
    <FooterInfo />
  </footer>
);

export default Footer;
