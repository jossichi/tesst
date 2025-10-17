// src/services/ocrService.js
import { API_URL } from '../constants'; // Giả định bạn đã định nghĩa API_URL

export const processFileOCR = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/api/ocr`, {
      method: 'POST',
      body: formData, // ✅ body phải là formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OCR request failed: ${errorText}`);
    }

    const data = await response.json();
    return data; // ✅ trả JSON đã parse
  } catch (error) {
    console.error('Error calling OCR API:', error);
    throw error;
  }
};
