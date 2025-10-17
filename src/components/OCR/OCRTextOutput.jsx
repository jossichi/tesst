import React from "react";

const OCRTextOutput = ({ text }) => (
  <textarea
    readOnly
    value={text || ""}
    className="raw-text-area"
    placeholder="Văn bản trích xuất sẽ xuất hiện ở đây..."
  />
);

export default OCRTextOutput;
