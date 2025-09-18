import React from "react";

const BusinessInsights = ({ insights }) => {
  // Đảm bảo insights luôn là mảng
  const safeInsights = Array.isArray(insights) ? insights : [];

  return (
    <section className="business-insights">
      <h2>🔎 Business Insights</h2>
      {safeInsights.length > 0 ? (
        <ul>
          {safeInsights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p>No business insights available.</p>
      )}
    </section>
  );
};

export default BusinessInsights;
