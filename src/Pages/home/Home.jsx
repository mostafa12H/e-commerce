import React from "react";
import GiftSuite from "../../Components/home_content/GiftSuite";
import ProductCategories from "../../Components/ProductCategories/ProductCategories";
import Footer from "../../Components/Footer/Footer";
import Timer from "./../../Components/Timer/Tiimer";

export default function Home() {
  return (
    <div>
      <GiftSuite />
      <ProductCategories />
      <Timer />
      <Footer />
    </div>
  );
}
