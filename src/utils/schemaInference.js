// src/utils/schemaInference.js
// đơn giản nhưng hiệu quả: scan sample rows, detect types
export function inferSchemaFromRows(rows = []) {
  // rows: array of objects (mapped by column name)
  if (!rows || rows.length === 0) {
    return {
      title: "GeneratedSchema",
      type: "object",
      properties: {},
    };
  }

  const columns = Object.keys(rows[0]);
  const stats = {};

  columns.forEach((col) => {
    stats[col] = {
      types: new Set(),
      samples: new Set(),
      maxLen: 0,
      values: [],
    };
  });

  const sampleN = Math.min(rows.length, 500);
  for (let i = 0; i < sampleN; i++) {
    const row = rows[i];
    columns.forEach((col) => {
      const v = row[col];
      if (
        v === null ||
        v === undefined ||
        (typeof v === "string" && v.trim() === "")
      ) {
        stats[col].types.add("null");
        return;
      }
      stats[col].values.push(v);
      stats[col].samples.add(String(v).slice(0, 100));
      stats[col].maxLen = Math.max(stats[col].maxLen, String(v).length);

      // Try number
      if (typeof v === "number") {
        stats[col].types.add(Number.isInteger(v) ? "integer" : "number");
      } else if (typeof v === "boolean") {
        stats[col].types.add("boolean");
      } else {
        // string heuristics
        const s = String(v).trim();
        // datetime
        if (isIsoDateString(s)) {
          stats[col].types.add("string");
          stats[col].format = "date-time";
        } else if (/^[0-9]+$/.test(s) && s.length <= 10) {
          // possibly integer string
          stats[col].types.add("integer");
        } else if (/^[0-9]*\.[0-9]+$/.test(s)) {
          stats[col].types.add("number");
        } else if (s.toLowerCase() === "true" || s.toLowerCase() === "false") {
          stats[col].types.add("boolean");
        } else if (s.includes(";") || s.includes("|") || s.includes(",")) {
          // possibly multi-select; leave as string but mark
          stats[col].types.add("string");
          stats[col].multi = true;
        } else {
          stats[col].types.add("string");
        }
      }
    });
  }

  const properties = {};
  columns.forEach((col) => {
    const info = stats[col];
    // decide final type
    let type = "string";
    if (
      info.types.has("integer") &&
      !info.types.has("string") &&
      !info.types.has("number")
    ) {
      type = "integer";
    } else if (info.types.has("number") && !info.types.has("string")) {
      type = "number";
    } else if (info.types.has("boolean") && !info.types.has("string")) {
      type = "boolean";
    } else {
      type = "string";
    }

    const prop = { type };
    if (info.format) prop.format = info.format;
    if (info.multi) {
      // represent as array of strings
      prop.type = "array";
      prop.items = { type: "string" };
      prop.description = "multi-select (inferred)";
    } else {
      prop.description = `sample: ${Array.from(info.samples)
        .slice(0, 3)
        .join(" | ")}`;
    }

    // Add nullable if null observed
    if (info.types.has("null")) {
      prop.nullable = true;
    }

    properties[col] = prop;
  });

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "GeneratedSchema",
    type: "object",
    properties,
    required: [], // we do not infer required automatically for safety
  };
}

function isIsoDateString(s) {
  // quick ISO date-time detection
  // matches patterns like 2020-01-01 or 2020-01-01T12:34:56
  return /^\d{4}-\d{2}-\d{2}(T|\s)?\d{0,2}:?\d{0,2}:?\d{0,2}/.test(s);
}
