import React, { useState, useEffect } from "react";
import mammoth from "mammoth";

const getFileIcon = (file) => {
  if (!file) return "📁";
  if (file.type.startsWith("image/")) return "🖼️";
  if (file.type === "application/pdf") return "📜";
  if (file.name.endsWith(".docx")) return "📑";
  return "📁";
};

const FilePreview = ({ file }) => {
  const [docxPreview, setDocxPreview] = useState("");
  const [isLoadingDocx, setIsLoadingDocx] = useState(false);
  const [errorDocx, setErrorDocx] = useState("");

  useEffect(() => {
    if (file && file.name.endsWith(".docx")) {
      setIsLoadingDocx(true);
      setErrorDocx("");
      file
        .arrayBuffer()
        .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
        .then((result) => setDocxPreview(result.value))
        .catch((err) => {
          console.error("DOCX preview error:", err);
          setErrorDocx("Không thể hiển thị nội dung tệp DOCX.");
        })
        .finally(() => setIsLoadingDocx(false));
    }
  }, [file]);

  if (!file) {
    return <p className="file-note">⚠️ Chưa có tệp nguồn được tải lên.</p>;
  }

  const fileType = file.type || file.name.split(".").pop().toUpperCase();
  const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <div className="source-file-card">
      <div className="file-icon-info">
        <span className="file-icon">{getFileIcon(file)}</span>
        <div className="file-details">
          <p className="file-name" title={file.name}>
            <b>{file.name}</b>
          </p>
          <p className="file-meta">
            Loại: {fileType} • Kích thước: {fileSizeMB} MB
          </p>
        </div>
      </div>

      <div className="file-preview-area">
        <p className="preview-label">Xem trước:</p>
        <div className="preview-container">
          {file.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="uploaded-preview"
            />
          )}
          {file.type === "application/pdf" && (
            <iframe
              src={URL.createObjectURL(file)}
              title="PDF Preview"
              className="uploaded-preview-frame"
            />
          )}
          {file.name.endsWith(".docx") && (
            <div className="docx-container">
              {isLoadingDocx && (
                <div className="loading-state">
                  🔄 Đang chuyển đổi nội dung...
                </div>
              )}
              {errorDocx && <div className="error-state">⚠️ {errorDocx}</div>}
              {!isLoadingDocx && !errorDocx && (
                <div
                  className="docx-html-content"
                  dangerouslySetInnerHTML={{ __html: docxPreview }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
