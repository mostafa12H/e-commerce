import React from "react";
import ContactForm from "../../Components/Forms/ContactForm";
import "./ContactUs.css";
const ContactUs = () => {
  const handleSuccess = () => {};

  const handleError = () => {};

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Please fill out the form below or reach us
        through the contact details provided.
      </p>

      <ContactForm onSuccess={handleSuccess} onError={handleError} />

      <div className="contact-details mt-5">
        <h3>Contact Information</h3>
        <p>
          <strong>Address:</strong> iefnwfneifpnwfoeqwnf
        </p>
        <p>
          <strong>Phone:</strong> (020)1002299532
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:mostafa317hamada@gmail.com">
            mostafa317hamada@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
