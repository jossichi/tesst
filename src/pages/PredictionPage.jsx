import React, { useState } from "react";
import PredictionResultPanel from "../components/PredictionResultPanel";
import { fetchPrediction } from "../services/predictionService";

export default function PredictionPage() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedFile) return;

    const result = await fetchPrediction(selectedFile, selectedTarget);
    setPredictionResult(result);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv,.json,.xlsx,.xls"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit">Run Prediction</button>
      </form>

      {predictionResult && (
        <PredictionResultPanel
          data={predictionResult}
          onTargetSelect={(col) => {
            setSelectedTarget(col);
            // re-run ngay khi user chọn target khác
            if (selectedFile) {
              fetchPrediction(selectedFile, col).then(setPredictionResult);
            }
          }}
        />
      )}
    </div>
  );
}
