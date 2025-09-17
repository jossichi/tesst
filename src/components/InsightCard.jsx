import React from "react";
import { motion } from "framer-motion";
import "../assets/styles/InsightCard.scss";

// Tái định nghĩa các biểu tượng bằng SVG để dễ dàng tùy chỉnh CSS
const icons = {
  warning: (
    <svg
      className="icon warning"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor">
      <path d="M10.29 3.86L1.86 18a2 2 0 0 0 1.74 2h16.8a2 2 0 0 0 1.74-2l-8.43-14.14a2 2 0 0 0-3.48 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  success: (
    <svg
      className="icon success"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg
      className="icon info"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="12" y1="5" x2="12" y2="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  error: (
    <svg
      className="icon error"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const InsightCard = ({ type = "info", title, message }) => {
  return (
    <motion.div
      className={`cyber-insight-card ${type}`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}>
      <div className="card-border-glow"></div>
      <div className="icon-wrapper">{icons[type]}</div>
      <div className="content">
        {title && <h4 className="insight-title">{title}</h4>}
        <p className="insight-message">{message}</p>
      </div>
    </motion.div>
  );
};

export default InsightCard;
