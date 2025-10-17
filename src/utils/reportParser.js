// utils/reportParser.js
export const extractBusinessInsights = (report) => {
  if (!report || typeof report !== "string") return [];

  // Tìm vị trí bắt đầu và kết thúc của section "Business Insights"
  const startMarker = "🔎 Business Insights";
  const endMarker = "⚠️ Risks & Opportunities";

  const startIdx = report.indexOf(startMarker);
  if (startIdx === -1) return [];

  // Nếu không tìm thấy endMarker thì lấy tới cuối chuỗi
  const endIdx = report.indexOf(endMarker, startIdx);
  const sectionText =
    endIdx !== -1 ? report.slice(startIdx, endIdx) : report.slice(startIdx);

  // Tách dòng và lọc bỏ dòng trống
  return sectionText.split("\n").map((line) => line.trim()).filter(Boolean);
};
