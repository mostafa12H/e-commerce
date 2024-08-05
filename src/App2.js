// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckForm from "./CheckForm";
// import "./Apps.css";

// const stripePromise = loadStripe(
//   "pk_test_51Pk2dIK14G2uGgdHfY3Viqi90mkACmo7AC0qO2TVxeaMIvhurKJai7YhiqUQCOMxaKBngN4O9mXE2FIpFTGheSZr00MQKPGEhr"
// );

// export default function Apps() {
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
//       {clientSecret && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckForm />
//         </Elements>
//       )}
//     </div>
//   );
// }
