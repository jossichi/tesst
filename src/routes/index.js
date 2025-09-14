// src/routes/index.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadSchemaPage from "../pages/UploadSchemaPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/upload" />} />
        <Route path="/upload" element={<UploadSchemaPage />} />
        {/* sau này thêm Dashboard, Login ... */}
      </Routes>
    </BrowserRouter>
  );
}
