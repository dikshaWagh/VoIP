


import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Charts = ({ stats }) => (
  <div className="charts-container">
    <h2 className="charts-title">Analytics</h2>
    <BarChart
      width={600}
      height={300}
      data={stats}
      margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
    >
      {/* Gradient definition */}
      <defs>
  <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
    {/* Bottom transparent */}
    <stop offset="0%" stopColor="transparent" stopOpacity={0} />
    {/* Middle softer cyan */}
    <stop offset="60%" stopColor="#00eaff" stopOpacity={0.6} />
    {/* Top solid blue glow */}
    <stop offset="100%" stopColor="#0077ff" stopOpacity={0.95} />
  </linearGradient>
</defs>


      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
      <XAxis dataKey="metric" stroke="#00eaff" />
      <YAxis stroke="#00eaff" />
      <Tooltip cursor={{ fill: "rgba(0,255,255,0.1)" }} />
      <Legend wrapperStyle={{ color: "#fff" }} />

      {/* Apply gradient + custom CSS */}
      <Bar
        dataKey="value"
        fill="url(#barGradient)"
        radius={[10, 10, 0, 0]}
        className="bar-shade"
      />
    </BarChart>
  </div>
);

export default Charts;
