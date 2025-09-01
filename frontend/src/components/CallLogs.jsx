import React, { useState, useMemo } from "react";
import "../App.css";

const CallLogs = ({ calls }) => {
  const [search, setSearch] = useState("");

  // ✅ Convert incoming JSON (raw) into the "calls" format
  const mappedCalls = useMemo(() => {
    return calls.map((json) => ({
      caller: json.sequence_number || "Unknown",
      callee: json.payload_type || "Unknown",
      duration: json.timestamp ? json.timestamp % 500 : 0, // fake duration for now
      callerIP: json.from_ip || "-",
      callerPort: json.from_port || "-",
      calleeIP: json.to_ip || "-",
      calleePort: json.to_port || "-",
    }));
  }, [calls]);

  // ✅ Filter mapped calls
  const filteredCalls = mappedCalls.filter(
    (call) =>
      call.caller.toString().includes(search) ||
      call.callee.toString().includes(search) ||
      call.duration.toString().includes(search) ||
      call.callerIP.toString().includes(search) ||
      call.calleeIP.toString().includes(search) ||
      call.callerPort.toString().includes(search) ||
      call.calleePort.toString().includes(search)
  );

  return (
    <div className="call-logs">
      <h2>Call Logs</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by caller, callee, IP, port, or duration..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <table className="call-logs-table">
        <thead>
          <tr>
            <th>Caller</th>
            <th>Caller IP</th>
            <th>Caller Port</th>
            <th>Callee</th>
            <th>Callee IP</th>
            <th>Callee Port</th>
            <th>Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalls.length > 0 ? (
            filteredCalls.map((call, i) => (
              <tr key={i}>
                <td>{call.caller}</td>
                <td>{call.callerIP}</td>
                <td>{call.callerPort}</td>
                <td>{call.callee}</td>
                <td>{call.calleeIP}</td>
                <td>{call.calleePort}</td>
                <td>{call.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No matching calls found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CallLogs;
