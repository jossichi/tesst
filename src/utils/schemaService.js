// src/services/schemaService.js
export async function uploadFileToServer(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("http://localhost:8000/api/parse-file", {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Upload failed: " + text);
  }

  return res.json(); // { schema, preview }
}
