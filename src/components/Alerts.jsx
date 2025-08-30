// // src/components/Alerts.jsx
// import React from "react";
// import { Paper, List, ListItem, ListItemText } from "@mui/material";

// const generateAlerts = (calls) => {
//   const alerts = [];
//   const callerCount = {};

//   calls.forEach((call) => {
//     // Rule 1: Very short calls
//     if (call.duration < 5) {
//       alerts.push(`Short call detected: ${call.caller} → ${call.callee} (${call.duration}s)`);
//     }

//     // Rule 2: Very long calls
//     if (call.duration > 300) {
//       alerts.push(`Unusually long call: ${call.caller} → ${call.callee} (${call.duration}s)`);
//     }

//     // Rule 3: Count calls per caller
//     callerCount[call.caller] = (callerCount[call.caller] || 0) + 1;

//     // Rule 5: Self-calls (loop/spoof)
//     if (call.caller === call.callee) {
//       alerts.push(`Loop call detected: ${call.caller} called themselves`);
//     }
//   });

//   // Rule 4: High frequency caller
//   Object.keys(callerCount).forEach((caller) => {
//     if (callerCount[caller] > 3) {
//       alerts.push(`High call frequency: ${caller} made ${callerCount[caller]} calls`);
//     }
//   });

//   return alerts;
// };

// const Alerts = ({ calls }) => {
//   const alerts = generateAlerts(calls);

//   return (
//     <Paper style={{ padding: "1rem", backgroundColor: "#fff3f3" }}>
//       <h2>Suspicious Alerts</h2>
//       {alerts.length === 0 ? (
//         <p>No suspicious activity detected ✅</p>
//       ) : (
//         <List>
//           {alerts.map((alert, i) => (
//             <ListItem key={i}>
//               <ListItemText primary={`⚠️ ${alert}`} />
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Paper>
//   );
// };

// export default Alerts;




// src/components/Alerts.jsx
import React from "react";
import { List } from "@mui/material";
import "../App.css";

const generateAlerts = (calls) => {
  const alerts = [];
  const callerCount = {};

  calls.forEach((call) => {
    if (call.duration < 5) {
      alerts.push(`Short call detected: ${call.caller} → ${call.callee} (${call.duration}s)`);
    }
    if (call.duration > 300) {
      alerts.push(`Unusually long call: ${call.caller} → ${call.callee} (${call.duration}s)`);
    }
    callerCount[call.caller] = (callerCount[call.caller] || 0) + 1;
    if (call.caller === call.callee) {
      alerts.push(`Loop call detected: ${call.caller} called themselves`);
    }
  });

  Object.keys(callerCount).forEach((caller) => {
    if (callerCount[caller] > 3) {
      alerts.push(`High call frequency: ${caller} made ${callerCount[caller]} calls`);
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
            <li key={i} className="alert-item">
              {alert}
            </li>
          ))}
        </List>
      )}
    </div>
  );
};

export default Alerts;
