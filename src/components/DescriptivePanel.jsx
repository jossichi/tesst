import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/descriptive-panel.scss";
export default function DescriptivePanel({ descriptive }) {
  if (!descriptive) return null;

  // eslint-disable-next-line no-unused-vars
  const { numeric, categorical, remarks } = descriptive;

  return (
    <section className="mt-6 descriptive-section">
      <h2 className="text-lg font-semibold mb-4">
        Step 4: Descriptive Statistics
      </h2>
      {/* 📊 Numeric stats */}
      {numeric && Object.keys(numeric).length > 0 ? (
        <div className="numeric-section mt-4">
          <h3 className="font-semibold mb-2">Quantitative Data (Numeric)</h3>
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Column</th>
                <th className="border px-2 py-1">Count</th>
                <th className="border px-2 py-1">Min</th>
                <th className="border px-2 py-1">Max</th>
                <th className="border px-2 py-1">Mean</th>
                <th className="border px-2 py-1">Median</th>
                <th className="border px-2 py-1">Std</th>
                <th className="border px-2 py-1">Skew</th>
                <th className="border px-2 py-1">Kurtosis</th>
                <th className="border px-2 py-1">Outliers</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(numeric).map(([col, stats]) => (
                <tr key={col}>
                  <td className="border px-2 py-1 font-medium">{col}</td>
                  <td className="border px-2 py-1">{stats.count}</td>
                  <td className="border px-2 py-1">{stats.min}</td>
                  <td className="border px-2 py-1">{stats.max}</td>
                  <td className="border px-2 py-1">{stats.mean.toFixed(2)}</td>
                  <td className="border px-2 py-1">{stats.median}</td>
                  <td className="border px-2 py-1">{stats.std.toFixed(2)}</td>
                  <td className="border px-2 py-1">{stats.skew.toFixed(2)}</td>
                  <td className="border px-2 py-1">
                    {stats.kurtosis.toFixed(2)}
                  </td>
                  <td className="border px-2 py-1">{stats.outliers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Không có dữ liệu định lượng.</p>
      )}

      {/* 🔠 Categorical stats */}
      {categorical && Object.keys(categorical).length > 0 && (
        <div className="categorical-section mt-6">
          <h3 className="font-semibold mb-2">Categorical Data</h3>
          {Object.entries(categorical).map(([col, info]) => (
            <div key={col} className="mb-6">
              <h4 className="font-semibold">{col}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Total: {info.count} | Unique: {info.unique}
              </p>

              <table className="table-auto border-collapse border border-gray-300 w-full text-sm mb-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">Value</th>
                    <th className="border px-2 py-1">Count</th>
                    {/* <th className="border px-2 py-1">%</th> */}
                  </tr>
                </thead>
                <tbody>
                  {info.top_values.map((v, idx) => (
                    <tr key={idx}>
                      <td className="border px-2 py-1">{v.value}</td>
                      <td className="border px-2 py-1">{v.count}</td>
                      {/* <td className="border px-2 py-1">{v.percent}%</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Biểu đồ bar */}
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={info.top_values}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="value" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}

      {/* 📝 Remarks */}
      {/* {remarks && remarks.length > 0 && (
        <div className="remarks-section mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <h3 className="font-semibold">Nhận xét</h3>
          <ul className="list-disc list-inside">
            {remarks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )} */}
    </section>
  );
}
