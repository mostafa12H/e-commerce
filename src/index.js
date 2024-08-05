import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import store from "./Features/store";
import { Provider } from "react-redux";
import Apps from "./App2";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
        {/* <Apps /> */}
      </Router>
    </React.StrictMode>
  </Provider>
);
