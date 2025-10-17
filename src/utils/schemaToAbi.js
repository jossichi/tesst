// src/utils/schemaToAbi.js
export function convertSchemaToAbi(schema) {
  if (!schema || !schema.properties) return [];

  const typeMap = {
    string: "string",
    number: "uint256",
    integer: "int256",
    boolean: "bool",
  };

  const abi = Object.entries(schema.properties).map(([fieldName, fieldSchema]) => {
    const solidityType = typeMap[fieldSchema.type] || "string";
    const safeName = fieldName.replace(/\s+/g, "_").replace(/[^\w_]/g, "");

    return {
      type: "function",
      name: `get_${safeName}`,
      stateMutability: "view",
      inputs: [
        { name: safeName, type: solidityType }
      ],
      outputs: [
        { name: `${safeName}_output`, type: solidityType }
      ]
    };
  });

  return abi;
}
