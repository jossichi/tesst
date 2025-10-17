import { API_URL } from "../constants";

export async function fetchPrediction(file, targetCol = null) {
  const formData = new FormData();
  formData.append("file", file);
  if (targetCol) {
    formData.append("target", targetCol);
  }

  const res = await fetch(`${API_URL}/api/prediction`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prediction");
  }
  return await res.json();
}
