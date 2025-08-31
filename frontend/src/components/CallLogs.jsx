import React, { useState } from "react";
import "../App.css";

const CallLogs = ({ calls }) => {
  const [search, setSearch] = useState("");

  // Filter calls based on search query
  const filteredCalls = calls.filter(
    (call) =>
      call.caller.toString().includes(search) ||
      call.callee.toString().includes(search) ||
      call.duration.toString().includes(search)
  );

  return (
    <div className="call-logs">
      <h2>Call Logs</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by caller, callee, or duration..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <table className="call-logs-table">
        <thead>
          <tr>
            <th>Caller</th>
            <th>Callee</th>
            <th>Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalls.length > 0 ? (
            filteredCalls.map((call, i) => (
              <tr key={i}>
                <td>{call.caller}</td>
                <td>{call.callee}</td>
                <td>{call.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
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
