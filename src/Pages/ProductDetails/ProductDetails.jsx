import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  if (!product) {
    return (
      <div className="product-details-container">
        <Skeleton height={30} width={200} className="breadcrumb-skeleton" />
        <div className="product-details">
          <Skeleton height={300} width="100%" />
          <div className="product-info">
            <Skeleton height={40} width={300} />
            <Skeleton height={30} width={150} />
            <Skeleton height={20} width={200} />
            <div>
              <Skeleton height={20} width={100} />
              <Skeleton height={60} width="100%" />
            </div>
            <div>
              <div>
                <Skeleton height={30} width={100} />
                <Skeleton height={30} width={200} />
              </div>
              <div>
                <Skeleton height={30} width={100} />
                <Skeleton height={30} width={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="breadcrumb">Store {product.title}</div>
      <div className="product-details">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="product-price">
            ${product.price}{" "}
            <span className="old-price">
              ${(product.price * 1.3).toFixed(2)}
            </span>
          </div>
          <div className="product-rating">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </div>
          <div className="product-description">
            <h2>Overview:</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-options">
            <div className="product-size">
              <span>Size:</span>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <div className="product-colors">
              <span>Colors:</span>
              <button className="color-red"></button>
              <button className="color-blue"></button>
              <button className="color-gray"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
