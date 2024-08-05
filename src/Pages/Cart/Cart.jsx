import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeItemFromCart,
  removeAllOfItemFromCart,
  clearCart,
} from "../../Features/cartSlice";
import "./Cart.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button
            className="shop-now-button"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-category">{item.category}</p>
                <div className="item-info">
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="item-actions">
                  <button
                    className="remove-item"
                    onClick={() =>
                      dispatch(removeItemFromCart({ id: item.id }))
                    }
                  >
                    Remove One
                  </button>
                  <button
                    className="remove-all-item"
                    onClick={() =>
                      dispatch(removeAllOfItemFromCart({ id: item.id }))
                    }
                  >
                    Remove All
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <button
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <button
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
