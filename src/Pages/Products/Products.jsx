import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import "./Products.css";
import FilterCategory from "../../Components/Filter/FilterCategory";
import SortOptions from "../../Components/Sort/SortOptions";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Features/cartSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const productsPerPage = 4;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [location.search]);

  function fetchProducts() {
    return fetch(`${process.env.REACT_APP_PUBLIC_URL}/products`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setQuantities(
          json.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);

    fetchProducts();
  }, [sortOrder]);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleCategorySelect = (category) => {
    navigate(`/products?category=${category === "All" ? "" : category}`);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(prevQuantities[id] + delta, 1);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    dispatch(addItemToCart({ ...product, quantity }));

    toast.success(`${quantity} ${product.title} has been added to the cart!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      {loading ? (
        <>
          <SortOptions disabled />
          <FilterCategory disabled />
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            disabled
          />
          <div className="products-list">
            {[...Array(productsPerPage)].map((_, index) => (
              <div key={index} className="product-card">
                <Skeleton circle={true} width={100} height={100} />
                <Skeleton width={150} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={0}
            paginate={() => {}}
            currentPage={currentPage}
            disabled
          />
        </>
      ) : (
        <>
          <SortOptions onSort={handleSort} />
          <FilterCategory
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery || ""}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <ul className="products-list">
            {currentProducts.map((product) => (
              <li
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-card-content">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={(e) => {
                        // e.stopPropagation();
                        handleQuantityChange(product.id, -1);
                      }}
                      disabled={quantities[product.id] <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {quantities[product.id]}
                    </span>
                    <button
                      className="quantity-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="product-buttons">
                    <button
                      className="add-to-cart-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="view-details-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
