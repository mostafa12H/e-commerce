// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import ProtectedRoute from "./Utilities/ProtectedRoute";
// import CheckForm from "./Components/CheckForm";
// import { CheckoutPage, Cart, ContactUs, Home, Products, ProductDetails, LoginPage, FourOhFourPage } from "./Pages";
// import "./App.css";

// const stripePromise = loadStripe("pk_test_51Pk2dIK14G2uGgdHfY3Viqi90mkACmo7AC0qO2TVxeaMIvhurKJai7YhiqUQCOMxaKBngN4O9mXE2FIpFTGheSZr00MQKPGEhr");

// function App() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:4242/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 2000 }] }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => setClientSecret(data.clientSecret))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/contactUs" element={<ContactUs />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
//         <Route path="/checkout" element={
//           clientSecret && (
//             <Elements options={options} stripe={stripePromise}>
//               <CheckForm />
//             </Elements>
//           )
//         } />
//         <Route path="*" element={<FourOhFourPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Utilities/ProtectedRoute";

import {
  CheckoutPage,
  Cart,
  ContactUs,
  Home,
  Products,
  ProductDetails,
  LoginPage,
  FourOhFourPage,
} from "./Pages";
import "./App.css";
import ScrollToTopButton from "./Components/Scroll/ScrollToBottomButton";

const stripePromise = loadStripe(
  "pk_test_51Pk2dIK14G2uGgdHfY3Viqi90mkACmo7AC0qO2TVxeaMIvhurKJai7YhiqUQCOMxaKBngN4O9mXE2FIpFTGheSZr00MQKPGEhr"
);

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 2000 }] }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error:", error));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/checkout"
          element={
            clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            )
          }
        />
        c
        <Route path="*" element={<FourOhFourPage />} />
      </Routes>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
