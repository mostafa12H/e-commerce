import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductCategories.css";
import useFetch from "../useFetch";

const ProductCategories = () => {
  const navigate = useNavigate();
  const { error, data } = useFetch(
    `${process.env.REACT_APP_PUBLIC_URL}/products`
  );

  if (error) {
    console.error("Fetch error:", error);
    return (
      <div className="container-product-categories product-categories__alert">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-product-categories">
        <h2 className="product-categories__page-title">
          <Skeleton width={200} />
        </h2>
        <div className="row-product-categories">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="col-2-product-categories">
              <div className="product-categories__item">
                <div className="product-categories__image-container">
                  <Skeleton circle={true} height={200} width={200} />
                </div>
                <h5 className="product-categories__title">
                  <Skeleton width={100} />
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const uniqueCategories = new Set();
  const products = data.filter((product) => {
    if (!uniqueCategories.has(product.category)) {
      uniqueCategories.add(product.category);
      return true;
    }
    return false;
  });

  const handleProductClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="text-center-product-categories my-5-product-categories">
      <div className="container-product-categories">
        <h2 className="product-categories__page-title">Shop The Collections</h2>
        <h3 className="product-categories__page-title">
          Shop the latest products from the most popular collections
        </h3>
      </div>
      <div className="row-product-categories">
        {products.map((product) => (
          <div key={product.id} className="col-2-product-categories">
            <div
              className="product-categories__item"
              onClick={() => handleProductClick(product.category)}
            >
              <div className="product-categories__image-container">
                <img
                  src={product.image}
                  alt={product.category || "Product"}
                  className="product-categories__image"
                />
              </div>
              <h5 className="product-categories__title">{product.category}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
