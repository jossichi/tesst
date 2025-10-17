// src/components/FileUploader.jsx
import React from "react";
import { uploadFileToServer } from "../services/schemaService.js";
import "../assets/styles/fileUploader.scss";

export default function FileUploader({ onSchema }) {
  const fileRef = React.useRef();
  const [isDragging, setIsDragging] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // ✅ Thêm trạng thái isLoading
  const [error, setError] = React.useState(null); // ✅ Thêm trạng thái lỗi

  const handleFile = async (file) => {
    if (!file) return;
    setIsLoading(true); 
    setError(null);
    try {
      const data = await uploadFileToServer(file);
      onSchema(
        data.schema,
        data.preview,
        data.understanding,
        data.inspection,
        data.cleaning,
        data.descriptive,
        data.visualizations,
        data.relationships,
        data.advanced,
        data.insights,
        data.business_report,
        data.prediction_result,
        data.advanced_analysis,
        data.analysis_timing 
      );
    } catch (err) {
      console.error("Lỗi khi upload:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false); // ✅ Tắt trạng thái isLoading
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div
      className={`file-uploader ${isDragging ? "dragging" : ""} ${
        isLoading ? "loading" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}>
      <label className="drop-zone" htmlFor="file-input">
        <input
          id="file-input"
          ref={fileRef}
          type="file"
          accept=".csv,.json,.xlsx,.xls"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {/* ✅ Hiển thị nội dung dựa trên trạng thái */}
        {isLoading ? (
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Processing data...</p>
          </div>
        ) : (
          <div className="content-wrapper">
            <span className="upload-icon">
              {/* ✅ Icon đám mây có thể thay thế bằng SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M4.545 10.146a.5.5 0 0 1 .708 0L7 11.854V4.5a.5.5 0 0 1 1 0v7.354l1.747-1.747a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0z" />
                <path d="M4.545 10.146a.5.5 0 0 1 .708 0L7 11.854V4.5a.5.5 0 0 1 1 0v7.354l1.747-1.747a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0z" />
              </svg>
            </span>
            <strong>Drag and drop file here</strong>
            <button type="button" onClick={handleClick}>
              Select a file
            </button>
            <small>Supports CSV, JSON, XLSX</small>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </label>
    </div>
  );
}
