import React from "react";
import { List, ListItem, ListItemText, Tooltip } from "@mui/material";
import "../App.css";

// Sample structure for threat type and IP address
const generateAlerts = (calls) => {
  const alerts = [];
  const callerCount = {};

  calls.forEach((call) => {
    const alert = {
      type: "",
      message: "",
      ipAddress: "192.168.1.1",  // Example IP address, should be dynamic based on your use case
    };

    if (call.duration < 5) {
      alert.type = "Short Duration";
      alert.message = `Short call detected: ${call.caller} → ${call.callee} (${call.duration}s)`;
    }
    if (call.duration > 300) {
      alert.type = "Long Duration";
      alert.message = `Unusually long call: ${call.caller} → ${call.callee} (${call.duration}s)`;
    }
    callerCount[call.caller] = (callerCount[call.caller] || 0) + 1;

    if (call.caller === call.callee) {
      alert.type = "Loop Call";
      alert.message = `${call.caller} called themselves`;
    }

    // High frequency alert
    if (callerCount[call.caller] > 3) {
      alert.type = "High Frequency";
      alert.message = `${call.caller} made ${callerCount[call.caller]} calls`;
    }

    if (alert.message) {
      alerts.push(alert);
    }
  });

  return alerts;
};

const Alerts = ({ calls }) => {
  const alerts = generateAlerts(calls);

  return (
    <div className="alerts">
      <h2>Suspicious Alerts</h2>
      {alerts.length === 0 ? (
        <p>No suspicious activity detected ✅</p>
      ) : (
        <List>
          {alerts.map((alert, i) => (
            <ListItem key={i} className="alert-item">
              <Tooltip title={`IP Address: ${alert.ipAddress}`} arrow>
                <ListItemText
                  primary={<span className={`alert-${alert.type.toLowerCase().replace(' ', '-')}`}>{alert.message}</span>}
                  secondary={`Type: ${alert.type}`}
                />
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Alerts;
