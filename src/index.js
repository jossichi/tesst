// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./assets/styles/global.scss";

window.addEventListener("error", (e) => {
  console.error("🌋 Global Error:", e.error?.stack || e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("💥 Unhandled Promise Rejection:", e.reason);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
