// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import "./CheckoutPage.css";
// import CheckoutForm from "../CheckoutForm/CheckoutForm";

// const stripePromise = loadStripe(
//   "pk_test_51Pk2dIK14G2uGgdHfY3Viqi90mkACmo7AC0qO2TVxeaMIvhurKJai7YhiqUQCOMxaKBngN4O9mXE2FIpFTGheSZr00MQKPGEhr"
// );

// export default function CheckoutPage() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);

//   // const options = {
//   //   // passing the client secret obtained from the server
//   //   clientSecret:
//   //     "sk_test_51Pk2dIK14G2uGgdHwDK9C8qY3vovH1c7NpJFpAUlepbauZEZy4s8H8WxTFJFY1myCLd2kaD0RcdbB4UaO0kriq6l00Z3HITwlj",
//   // }

//   const options = {
//     mode: "payment",
//     amount: 1099,
//     currency: "usd",
//     clientSecret:
//       "sk_test_51Pk2dIK14G2uGgdHwDK9C8qY3vovH1c7NpJFpAUlepbauZEZy4s8H8WxTFJFY1myCLd2kaD0RcdbB4UaO0kriq6l00Z3HITwlj",
//     // Fully customizable with appearance API.
//     appearance: {
//       /*...*/
//     },
//   };
//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleApplyPromoCode = () => {
//     if (promoCode === "SAVE10") {
//       setDiscount(totalAmount * 0.1);
//     } else {
//       setDiscount(0);
//     }
//   };

//   return (
//     <div className="checkout-page-container">
//       <div className="checkout-page-header">
//         <h1>Checkout</h1>
//       </div>
//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         {cartItems.map((item) => (
//           <div key={item.id} className="order-item">
//             <img src={item.image} alt={item.title} className="item-image" />
//             <div className="item-details">
//               <h3>{item.title}</h3>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
//             </div>
//           </div>
//         ))}
//         <div className="promo-code-section">
//           <input
//             type="text"
//             placeholder="Promo Code"
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value)}
//           />
//           <button onClick={handleApplyPromoCode}>Apply</button>
//         </div>
//         <div className="total-amount">
//           <h3>
//             Total: ${(totalAmount - discount).toFixed(2)}{" "}
//             {discount > 0 && <span>(Discount applied!)</span>}
//           </h3>
//         </div>
//       </div>
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm totalAmount={totalAmount - discount} />
//       </Elements>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutPage.css";

export default function CheckForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Payment successful!");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
