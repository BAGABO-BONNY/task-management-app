import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";

import App from "./App.jsx";
import "./index.css";

ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
