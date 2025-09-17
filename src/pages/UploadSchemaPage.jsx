// UploadSchemaPage.jsx
import React from "react";
import FileUploader from "../components/FileUploader.jsx";
import SchemaEditor from "../components/SchemaEditor.jsx";
import DataInspectionPanel from "../components/DataInspectionPanel.jsx";
import DataCleaningPanel from "../components/DataCleaningPanel.jsx";
import DescriptivePanel from "../components/DescriptivePanel.jsx";
import VisualizationPanel from "../components/VisualizationPanel.jsx";
import RelationshipsPanel from "../components/RelationshipsPanel.jsx";
import AdvancedAnalysisPanel from "../components/AdvancedAnalysisPanel.jsx";
import MongoDBPreview from "../components/MongoDBPreview.jsx";
import Tabs from "../components/Tabs.jsx";
import InsightCard from "../components/InsightCard.jsx";

import "../assets/styles/upload.scss";

export default function UploadSchemaPage() {
  const [schema, setSchema] = React.useState(null);
  const [uiSchema, setUiSchema] = React.useState({});
  const [rawPreviewRows, setRawPreviewRows] = React.useState([]);
  const [understanding, setUnderstanding] = React.useState([]);
  const [inspection, setInspection] = React.useState(null);
  const [cleaning, setCleaning] = React.useState(null);
  const [descriptive, setDescriptive] = React.useState(null);
  const [visualizations, setVisualizations] = React.useState(null);
  const [relationships, setRelationships] = React.useState(null);
  const [advanced, setAdvanced] = React.useState(null);
  const [insights, setInsights] = React.useState([]);

  const tabs = React.useMemo(() => {
    const panels = [];

    if (understanding?.length > 0) {
      panels.push({
        id: "understanding",
        title: "Data Understanding",
        content: (
          <section className="data-understanding-section">
            <table className="data-understanding">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Data Type</th>
                  <th>Example</th>
                  <th>Statistics</th>
                </tr>
              </thead>
              <tbody>
                {understanding.map((col, idx) => (
                  <tr key={idx}>
                    <td>{col.name}</td>
                    <td>{col.inferred_type}</td>
                    <td>{col.example?.join(", ")}</td>
                    <td>
                      <pre>{JSON.stringify(col.stats, null, 2)}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ),
      });
    }

    if (rawPreviewRows?.length > 0) {
      panels.push({
        id: "sample-data",
        title: "Sample Data",
        content: <MongoDBPreview data={rawPreviewRows} />,
      });
    }

    if (inspection) {
      panels.push({
        id: "inspection",
        title: "Data Inspection",
        content: <DataInspectionPanel inspection={inspection} />,
      });
    }

    if (cleaning) {
      panels.push({
        id: "cleaning",
        title: "Data Cleaning",
        content: <DataCleaningPanel cleaning={cleaning} />,
      });
    }

    if (descriptive) {
      panels.push({
        id: "descriptive",
        title: "Descriptive Statistics",
        content: <DescriptivePanel descriptive={descriptive} />,
      });
    }

    if (visualizations) {
      panels.push({
        id: "visualizations",
        title: "Visualizations",
        content: <VisualizationPanel visualizations={visualizations} />,
      });
    }

    if (relationships) {
      panels.push({
        id: "relationships",
        title: "Relationships",
        content: <RelationshipsPanel relationships={relationships} />,
      });
    }

    if (advanced) {
      panels.push({
        id: "advanced",
        title: "Advanced Analysis",
        content: <AdvancedAnalysisPanel advanced={advanced} />,
      });
    }

    if (insights?.length > 0) {
      panels.push({
        id: "insights",
        title: "Insights",
        content: (
          <section className="insights-section">
            {insights.map((ins, idx) => {
              let type = "info";
              if (ins.includes("❗") || ins.includes("⚠️")) type = "warning";
              if (ins.includes("✅")) type = "success";
              if (ins.includes("🚨")) type = "error";
              return (
                <InsightCard
                  key={idx}
                  type={type}
                  title={`Insight ${idx + 1}`}
                  message={ins}
                />
              );
            })}
          </section>
        ),
      });
    }

    return panels;
  }, [
    understanding,
    rawPreviewRows,
    inspection,
    cleaning,
    descriptive,
    visualizations,
    relationships,
    advanced,
    insights,
  ]);

  return (
    <div className="page-upload-schema">
      <header className="upload-header">
        <h1>Upload Your Dataset for Analysis</h1>
        <p>
          Supported formats: CSV, XLSX, JSON. The system will automatically
          detect data types and generate schema metadata.
        </p>
      </header>

      <div className="upload-grid">
        <div className="left-col">
          <FileUploader
            onSchema={(
              generatedSchema,
              previewRows,
              analysis,
              inspectionResult,
              cleaningResult,
              descriptiveResult,
              visualizationResult,
              relationshipsResult,
              advancedResult,
              insightsResult
            ) => {
              setSchema(generatedSchema);
              setRawPreviewRows(previewRows || []);
              setUnderstanding(analysis || []);
              setInspection(inspectionResult || null);
              setCleaning(cleaningResult || null);
              setDescriptive(descriptiveResult || null);
              setVisualizations(visualizationResult || null);
              setRelationships(relationshipsResult || null);
              setAdvanced(advancedResult || null);
              setInsights(insightsResult || []);
            }}
          />
        </div>

        <div className="right-col">
          <SchemaEditor
            schema={schema}
            setSchema={setSchema}
            uiSchema={uiSchema}
            setUiSchema={setUiSchema}
            previewRows={rawPreviewRows}
          />
        </div>

        {tabs.length > 0 && (
          <div className="analysis-tabs">
            <Tabs tabs={tabs} />
          </div>
        )}
      </div>
    </div>
  );
}
