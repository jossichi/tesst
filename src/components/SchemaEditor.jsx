// src/components/SchemaEditor.jsx
import React from "react";
// import Form from "@rjsf/core";
import ReactJson from "react-json-view";
import { saveAs } from "file-saver";
import {
  generateCleanSchema,
  dropFieldFromSchema,
} from "../utils/schemaHelpers";
// import "../assets/styles/schema-editor.scss";
// import validator from "@rjsf/validator-ajv8";
import "../assets/styles/schema-editor.scss";
// const validator = AJV8Validator();
export default function SchemaEditor({
  schema,
  setSchema,
  uiSchema,
  setUiSchema,
  previewRows,
}) {
  const [excludedFields, setExcludedFields] = React.useState({});
  React.useEffect(() => {
    setExcludedFields({});
  }, [schema]);

  if (!schema) {
    return null;
  }

  const onToggleField = (fieldName) => {
    const next = { ...excludedFields, [fieldName]: !excludedFields[fieldName] };
    setExcludedFields(next);
    let newSchema = { ...schema };
    Object.keys(next).forEach((k) => {
      if (next[k]) newSchema = dropFieldFromSchema(newSchema, k);
    });
    setSchema(newSchema);
  };

  const onExport = () => {
    const clean = generateCleanSchema(schema);
    const blob = new Blob([JSON.stringify(clean, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "generated-schema.json");
  };

  return (
    <div className="schema-editor">
      <div className="schema-top">
        <h3>Schema (editable)</h3>
        <div className="actions">
          <button onClick={onExport}>Export schema (.json)</button>
        </div>
      </div>

      <div className="schema-body">
        <div className="left-panel">
          <h4>Fields (remove/keep)</h4>
          <ul className="field-list">
            {schema &&
              schema.properties &&
              Object.keys(schema.properties).map((k) => (
                <li key={k}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!excludedFields[k]}
                      onChange={() => onToggleField(k)}
                    />
                    <span className="field-name">{k}</span>
                    <small className="field-type">
                      {schema.properties[k].type || "unknown"}
                    </small>
                  </label>
                </li>
              ))}
          </ul>
        </div>

        {/* <div className="center-panel">
          <h4>RJFS Preview</h4>
          <div className="rjsf-preview">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              onSubmit={({ formData }) => {
                console.log("submit", formData);
              }}>
              <div />
            </Form>
          </div>

          <h4>Sample rows</h4>
          <pre className="sample-rows">
            {JSON.stringify(previewRows, null, 2)}
          </pre>
        </div> */}

        <div className="right-panel">
          <h4>Schema JSON </h4>
          <div className="json-view">
            <ReactJson
              src={schema}
              name={false}
              collapsed={2}
              enableClipboard={false}
              theme="monokai" // Thêm thuộc tính này
              onEdit={(e) => setSchema(e.updated_src)}
              onAdd={(e) => setSchema(e.updated_src)}
              onDelete={(e) => setSchema(e.updated_src)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
