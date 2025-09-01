import React, { useRef, useState, useEffect } from "react";
import CallLogs from "./components/CallLogs";
import Charts from "./components/Charts";
import Alerts from "./components/Alerts";
import CallFlowDiagram from "./components/CallFlowDiagram";
import GraphView from "./components/graphView";
import Sidebar from "./components/sideBar";

import "./App.css";

function App() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const dummyCalls = [
  //   { id: 1, caller: "1001", callerIP: "192.168.0.2", callerPort: 5060, callee: "2001", calleeIP: "192.168.0.3", calleePort: 5060, duration: 12, timestamp: "10:00:01" },
  //   { id: 2, caller: "1002", callerIP: "192.168.0.4", callerPort: 5061, callee: "2002", calleeIP: "192.168.0.5", calleePort: 5061, duration: 5, timestamp: "10:00:05" },
  //   { id: 3, caller: "1003", callerIP: "192.168.0.6", callerPort: 5062, callee: "2003", calleeIP: "192.168.0.7", calleePort: 5062, duration: 30, timestamp: "10:00:10" }
  // ];

  // ✅ Fetch call logs from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/rtp/")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Handle case: API may return {results: [...] } or just [...]
        const callArray = Array.isArray(data) ? data : data.results || [];

        const mappedCalls = callArray.map((item, index) => ({
          id: index + 1,
          caller: item.caller || "Unknown",
          callerIP: item.src_ip || "-",
          callerPort: item.src_port || "-",
          callee: item.callee || "Unknown",
          calleeIP: item.dst_ip || "-",
          calleePort: item.dst_port || "-",
          duration: item.duration || 0,
          timestamp: item.timestamp || "-",
        }));

        setCalls(mappedCalls);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching call logs:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const stats = [
    { metric: "Avg Duration", value: 150 },
    { metric: "Packet Loss (%)", value: 5 },
    { metric: "Jitter (ms)", value: 20 },
  ];

  const alerts = [
    "Caller 1001 made 10 failed attempts",
    "High jitter detected in call 1003",
  ];

  const tasksRef = useRef(null);
  const reviewsRef = useRef(null);
  const completedRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <header>
          <h1>VoIP Trace</h1>
          <div className="stats">
            <div className="stat">
              <h3>42 Active Tasks</h3>
              <button onClick={() => scrollToSection(tasksRef)}>View details</button>
            </div>
            <div className="stat">
              <h3>21 Client Reviews</h3>
              <button onClick={() => scrollToSection(reviewsRef)}>View details</button>
            </div>
            <div className="stat">
              <h3>68 Completed Tasks</h3>
              <button onClick={() => scrollToSection(completedRef)}>View details</button>
            </div>
          </div>
        </header>

        {/* Loading/Error state */}
        {loading && <p>Loading call logs...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* Call Logs */}
        {!loading && !error && (
          <div className="callLogs" ref={tasksRef}>
            <CallLogs calls={calls} />
          </div>
        )}

        {/* Other widgets */}
        <div className="grids">
          <div className="gridBox" ref={reviewsRef}><Charts stats={stats} /></div>
          <div className="gridBox"><GraphView calls={calls} /></div>
          <div className="gridBox"><CallFlowDiagram calls={calls} /></div>
          <div className="gridBox" ref={completedRef}><Alerts calls={alerts} /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
