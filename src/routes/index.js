// src/routes/index.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadSchemaPage from "../pages/UploadSchemaPage";
import PredictionPage from "../pages/PredictionPage";
import OCRToolPage from "../pages/OCRToolPage"; 
// import Navbar from "../components/Navbar";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/upload" />} />
        <Route path="/upload" element={<UploadSchemaPage />} />
        <Route path="/pipeline" element={<PredictionPage />} />
        <Route path="/ocr" element={<OCRToolPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}
