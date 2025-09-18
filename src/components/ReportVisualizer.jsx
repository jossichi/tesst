// ReportVisualizer.jsx
import React from "react";
import "../assets/styles/ReportVisualizer.scss";

const EMOJI_TITLES = ["📌", "📊", "🔎", "⚠️", "💡", "📑"];

const ReportVisualizer = ({ report }) => {
  if (!report) return <p>No report available.</p>;

  // Tách sections theo emoji header
  const sections = report.split(new RegExp(`\\n(?=${EMOJI_TITLES.join("|")})`));

  return (
    <div className="report-visualizer">
      {sections.map((sec, idx) => {
        const lines = sec.split("\n").filter(Boolean); // loại bỏ dòng trống
        const titleLine = lines[0]; // dòng đầu là tiêu đề
        const contentLines = lines.slice(1); // các dòng còn lại

        return (
          <section key={idx} className="report-section">
            <h3 className="report-title">{titleLine}</h3>
            <ul className="report-content">
              {contentLines.map((line, i) => (
                <li key={i} className="report-line">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default ReportVisualizer;
