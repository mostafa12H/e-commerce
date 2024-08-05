import React, { useState } from "react";
import "./ContactForm.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const ContactForm = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setSubmitted(true);
    setError(null);
    if (onSuccess) onSuccess(data);
  };

  const onErrorHandler = (errors) => {
    setError("All fields are required.");
    if (onError) onError(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrorHandler)}
      className="contact-form"
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="form-control"
        />
        {errors.name && (
          <div className="alert alert-danger">Name is required.</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address.",
            },
          })}
          className="form-control"
        />
        {errors.email && (
          <div className="alert alert-danger">{errors.email.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register("message", { required: true })}
          className="form-control"
          rows="5"
        />
        {errors.message && (
          <div className="alert alert-danger">Message is required.</div>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary">
        Send Message
      </button>

      {submitted && !error && (
        <div className="alert alert-success mt-3">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      )}

      <DevTool control={control} />
    </form>
  );
};

export default ContactForm;
