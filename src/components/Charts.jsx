// src/components/Charts.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Charts = ({ stats }) => (
  <div style={{ padding: "1rem" }}>
    <h2>Call Statistics</h2>
    <BarChart width={500} height={300} data={stats}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="metric" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#1976d2" />
    </BarChart>
  </div>
);

export default Charts;
