
import React from "react";
import "../App.css";

const CallLogs = ({ calls }) => {
  return (
    <div className="call-logs">
      <h2>Call Logs</h2>
      <table className="call-logs-table">
        <thead>
          <tr>
            <th>Caller</th>
            <th>Callee</th>
            <th>Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call, i) => (
            <tr key={i}>
              <td>{call.caller}</td>
              <td>{call.callee}</td>
              <td>{call.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallLogs;
