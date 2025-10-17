import React from "react";
import OCRDetailsTable from "./OCRDetailsTable";

const OCRVisualDetails = ({ imageUrl, details }) => {
  return (
    <>
      {imageUrl && (
        <div className="annotated-image-box">
          <h3 className="section-title">📸 Ảnh Đã Chú Thích</h3>
          <div className="image-scroll-container">
            <img
              src={imageUrl}
              alt="Annotated OCR Result"
              className="annotated-image"
            />
          </div>
          {/* Sửa lại caption cho đúng với logic backend */}
          <p className="image-caption">
            Hộp{" "}
            <b style={{ color: "#00FF00", textShadow: "0 0 2px black" }}>
              Xanh lá
            </b>{" "}
            cho vùng chữ nhận diện được.
          </p>
        </div>
      )}

      <div className="details-table-box">
        <h3 className="section-title">📋 Bảng So Sánh Kết Quả OCR</h3>
        <OCRDetailsTable details={details} />
      </div>
    </>
  );
};

export default OCRVisualDetails;
