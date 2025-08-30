import React from "react";
import CallLogs from "./components/CallLogs";
import Charts from "./components/Charts";
import Alerts from "./components/Alerts";
import CallFlowDiagram from "./components/CallFlowDiagram";
import GraphView from "./components/graphView";
import Sidebar from "./components/sideBar";
import './App.css';

function App() {
  // Dummy data for testing
  const calls = [
    { caller: "1001", callee: "2001", duration: 2 },
    { caller: "1002", callee: "2002", duration: 450 },
    { caller: "1001", callee: "2003", duration: 10 },
    { caller: "1001", callee: "2004", duration: 15 },
    { caller: "1001", callee: "2005", duration: 3 },
    { caller: "2001", callee: "1001", duration: 50 },
    { caller: "2002", callee: "3001", duration: 120 },
    { caller: "2002", callee: "3002", duration: 240 },
    { caller: "3001", callee: "3001", duration: 5 },
    { caller: "3003", callee: "4001", duration: 180 },
    { caller: "3003", callee: "4002", duration: 60 },
    { caller: "3003", callee: "4003", duration: 90 },
    { caller: "3003", callee: "4004", duration: 75 },
    { caller: "4001", callee: "5001", duration: 20 },
    { caller: "4002", callee: "5002", duration: 25 },
    { caller: "4003", callee: "5003", duration: 30 },
    { caller: "5001", callee: "6001", duration: 200 },
    { caller: "5001", callee: "6002", duration: 5 },
    { caller: "6001", callee: "7001", duration: 310 },
    { caller: "7002", callee: "8001", duration: 1 }
  ];

  const stats = [
    { metric: "Avg Duration", value: 150 },
    { metric: "Packet Loss (%)", value: 5 },
    { metric: "Jitter (ms)", value: 20 },
  ];

  const alerts = [
    "Caller 1001 made 10 failed attempts",
    "High jitter detected in call 1003",
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <header>
          <h1>VoIP Trace</h1>
          <div className="stats">
            <div className="stat">
              <h3>42 Active Tasks</h3>
              <button>View details</button>
            </div>
            <div className="stat">
              <h3>21 Client Reviews</h3>
              <button>View details</button>
            </div>
            <div className="stat">
              <h3>68 Completed Tasks</h3>
              <button>View details</button>
            </div>
          </div>
        </header>

        <div className="grids">
          <div className="gridBox"><Charts stats={stats} /></div>
          <div className="gridBox"><GraphView calls={calls} /></div>
          <div className="gridBox"><CallFlowDiagram calls={calls} /></div>
          <div className="gridBox"><Alerts calls={alerts} /></div>
        </div>  
        <div className="callLogs"> <CallLogs calls={calls} /></div>
      </div>
    </div>
  );
}

export default App;
