import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Charts = ({ stats }) => (
  <div className="charts-container">
    <h2 className="charts-title">Analytics</h2>
    <BarChart width={600} height={300} data={stats} margin={{ top: 10, right: 30, left: 30, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="metric" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip contentStyle={{ backgroundColor: "#333", borderColor: "#444" }} />
      <Legend wrapperStyle={{ color: "#fff" }} />
      <Bar dataKey="value" fill="#8e44ad" radius={5} />
    </BarChart>
  </div>
);

export default Charts;
