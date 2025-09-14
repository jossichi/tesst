// src/utils/schemaHelpers.js
export function dropFieldFromSchema(schema, fieldName) {
  if (!schema || !schema.properties) return schema;
  const newProperties = { ...schema.properties };
  delete newProperties[fieldName];
  return { ...schema, properties: newProperties };
}

export function generateCleanSchema(schema) {
  // remove helper keys, ensure minimal schema
  const copy = JSON.parse(JSON.stringify(schema));
  // remove nullable if present (optional)
  function removeNullable(obj) {
    if (obj && typeof obj === "object") {
      delete obj.nullable;
      Object.keys(obj).forEach((k) => removeNullable(obj[k]));
    }
  }
  removeNullable(copy);
  return copy;
}
