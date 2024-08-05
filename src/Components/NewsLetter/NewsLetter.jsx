import React, { useState } from "react";
//
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const simulatedResponse = { ok: true };

      if (simulatedResponse.ok) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(
          "There was an issue with your subscription. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("There was an error. Please try again later.");
    }
  };

  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <p>Sign up and receive the latest tips via email.</p>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Write your email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Newsletter;
