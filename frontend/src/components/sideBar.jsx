// src/components/Sidebar.jsx
import { useState } from "react";
import { BarChart2, Network, List, AlertCircle } from "lucide-react";
// import { Link } from 'react-router-dom'
// import InternationalCallsMap from "./InterCall";

import '../App.css';
import { Alert } from "@mui/material";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("graph");

  const menuItems = [
    { id: "graph", label: "Graph View", icon: <Network size={20} /> },
    { id: "logs", label: "Call Logs", icon: <List size={20} /> },
    { id: "charts", label: "Charts", icon: <BarChart2 size={20} /> },
    { id: "Alerts", label: "Alerts", icon: <AlertCircle size={20} /> },

  ];

  const handleSelect = (id) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="sidebar">
      <h2>Task</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
         {/* <Link to='/InternationalCalls' className="navlinks">International Call Trace</Link> */}

        </ul>
      </nav>
    </div>
  );
}
