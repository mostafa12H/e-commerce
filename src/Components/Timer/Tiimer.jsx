import React, { useState, useEffect } from "react";
import "./Timer.css";
import { Link } from "react-router-dom";
import { calculateTimeLeft } from "../../Utilities/calculateTimeLeft";
import FormComponent from "../common/FormComponent";
//
const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const FormList = [
  //   {
  //     id: 1,
  //     type: "text",
  //     placeholder: "Enter your email",
  //     label: "Email",
  //   },
  //   {
  //     id: 2,
  //     type: "date",
  //     placeholder: "Enter your date",
  //     label: "date",
  //   },
  //   {
  //     id: 3,
  //     type: "number",
  //     placeholder: "Enter your age",
  //     label: "age",
  //   },
  // ];

  return (
    <div className="timer-container">
      <h1 className="timer-header">End of Season Clearance</h1>
      <h2 className="timer-subheader">Sale up to 30%</h2>

      <div className="timer-content">
        <div className="timer-countdown-wrapper">
          <div className="timer-countdown">
            <div>
              <h3>{timeLeft.days}</h3>
              <p>Days</p>
            </div>
            <div>
              <h3>{timeLeft.hours}</h3>
              <p>Hours</p>
            </div>
            <div>
              <h3>{timeLeft.minutes}</h3>
              <p>Mins</p>
            </div>
            <div>
              <h3>{timeLeft.seconds}</h3>
              <p>Secs</p>
            </div>
          </div>
        </div>
        <Link to="/Products" className="g-home-link">
          Shop now
        </Link>
      </div>

      {/* <FormComponent FormList={FormList} /> */}
    </div>
  );
};

export default Timer;
