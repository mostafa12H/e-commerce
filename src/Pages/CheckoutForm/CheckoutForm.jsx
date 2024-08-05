// import React, { useState } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import "./CheckoutPage.css";

// const CheckoutForm = ({ totalAmount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const [billingInfo, setBillingInfo] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//   });

//   const handleBillingChange = (e) => {
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsProcessing(true);

//   //   if (!stripe || !elements) {
//   //     setMessage("Stripe has not loaded yet.");
//   //     setIsProcessing(false);
//   //     return;
//   //   }

//   //   try {
//   //     const { error, paymentMethod } = await stripe.createPaymentMethod({
//   //       type: "card",
//   //       card: elements.getElement(CardElement),
//   //       billing_details: {
//   //         name: billingInfo.name,
//   //         email: billingInfo.email,
//   //         address: {
//   //           line1: billingInfo.address,
//   //           city: billingInfo.city,
//   //           state: billingInfo.state,
//   //           postal_code: billingInfo.zip,
//   //         },
//   //       },
//   //     });

//   //     if (error) {
//   //       setMessage(error.message);
//   //       setIsProcessing(false);
//   //       return;
//   //     }

//   //     const response = await fetch("/api/create-payment-intent", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ amount: totalAmount }),
//   //     });

//   //     const { clientSecret } = await response.json();

//   //     const confirmResult = await stripe.confirmCardPayment(clientSecret, {
//   //       payment_method: paymentMethod.id,
//   //     });

//   //     if (confirmResult.error) {
//   //       setMessage(confirmResult.error.message);
//   //     } else {
//   //       setMessage("Payment successful!");
//   //     }
//   //   } catch (err) {
//   //     setMessage(`Error: ${err.message}`);
//   //   }

//   //   setIsProcessing(false);
//   // };

//   const handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//       },
//     });

//     if (result.error) {
//       // Show error to your customer (for example, payment details incomplete)
//       console.log(result.error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={!stripe}>Submit</button>
//     </form>

//     // <form onSubmit={handleSubmit} className="checkout-form">
//     //   <h3>Billing Information</h3>
//     //   <input
//     //     type="text"
//     //     name="name"
//     //     placeholder="Name"
//     //     value={billingInfo.name}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />
//     //   <input
//     //     type="email"
//     //     name="email"
//     //     placeholder="Email"
//     //     value={billingInfo.email}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />
//     //   <input
//     //     type="text"
//     //     name="address"
//     //     placeholder="Address"
//     //     value={billingInfo.address}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />
//     //   <input
//     //     type="text"
//     //     name="city"
//     //     placeholder="City"
//     //     value={billingInfo.city}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />
//     //   <input
//     //     type="text"
//     //     name="state"
//     //     placeholder="State"
//     //     value={billingInfo.state}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />
//     //   <input
//     //     type="text"
//     //     name="zip"
//     //     placeholder="Zip Code"
//     //     value={billingInfo.zip}
//     //     onChange={handleBillingChange}
//     //     required
//     //   />

//     //   <h3>Payment Information</h3>
//     //   <CardElement className="CardElement" />
//     //   <button type="submit" disabled={isProcessing || !stripe || !elements}>
//     //     {isProcessing ? "Processing..." : "Pay"}
//     //   </button>
//     //   {message && <p>{message}</p>}
//     // </form>
//   );
// };

// export default CheckoutForm;
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./CheckoutPage.css";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

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

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(PaymentElement),
        billing_details: {
          name: billingInfo.name,
          email: billingInfo.email,
          address: {
            line1: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            postal_code: billingInfo.zip,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        setIsProcessing(false);
        return;
      }

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { clientSecret } = await response.json();

      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        setMessage(confirmResult.error.message);
      } else {
        setMessage("Payment successful!");
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Billing Information</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={billingInfo.name}
        onChange={handleBillingChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={billingInfo.email}
        onChange={handleBillingChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={billingInfo.address}
        onChange={handleBillingChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={billingInfo.city}
        onChange={handleBillingChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={billingInfo.state}
        onChange={handleBillingChange}
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip Code"
        value={billingInfo.zip}
        onChange={handleBillingChange}
        required
      />

      <h3>Payment Information</h3>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
