// src/pages/OCRToolPage.jsx
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import OCRResultDisplay from "../components/OCRResultDisplay";
import SchemaSmartContract from "../components/SchemaSmartContract";
import { processFileOCR } from "../services/ocrService.js";
import '../assets/styles/OCRToolPage.scss'; 

const OCRToolPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [schema, setSchema] = useState(null);
  const handleFileUpload = async () => {
    if (!file) {
      setError("Vui lòng chọn một tệp để tải lên.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiResponse = await processFileOCR(file);
      console.log("✅ Schema từ backend:", apiResponse.schema_suggested);

      // ✅ Gán thẳng dữ liệu backend trả về
      setResult(apiResponse);
    } catch (err) {
      console.error("OCR API Error:", err);
      const errorMessage =
        err.response?.data?.detail || "Đã xảy ra lỗi trong quá trình xử lý OCR.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ocr-page-container">
      <h1 className="page-title">Công Cụ Smart-OCR & DeFi Schema 📄</h1>

      <div className="content-wrapper">
        {/* 1️⃣ Tải file */}
        <h2 className="section-header">1. Tải Tệp Lên & Xử Lý</h2>
        <FileUpload
          onFileChange={setFile}
          onUpload={handleFileUpload}
          loading={loading}
          error={error}
        />

        {/* 2️⃣ Loading */}
        {loading && (
          <div className="loading-indicator">
            <p>Đang phân tích tài liệu và tạo Schema... ⏳</p>
          </div>
        )}

        {/* 3️⃣ Kết quả OCR + Schema */}
        {result && (
          <>
            <h2 className="section-header">2. Kết Quả Trích Xuất OCR</h2>
            <OCRResultDisplay result={result.ocr_result} uploadedFile={file} />


            {result.schema_suggested && (
              <div className="mt-10">
                <h2 className="section-header">3. Smart Contract Schema & ABI</h2>
                <SchemaSmartContract
                  schema={schema || result.schema_suggested}
                  setSchema={setSchema}
                />
              </div>
            )}
          </>
        )}

        {/* 4️⃣ Lỗi */}
        {error && !loading && (
          <div className="error-message">
            <p className="font-bold">LỖI HỆ THỐNG:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRToolPage;
