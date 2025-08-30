// import React from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

// const CallLogs = ({ calls }) => {
//   return (
//     <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
//       <h2>Call Logs</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Caller</TableCell>
//             <TableCell>Callee</TableCell>
//             <TableCell>Duration (s)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {calls.map((call, i) => (
//             <TableRow key={i}>
//               <TableCell>{call.caller}</TableCell>
//               <TableCell>{call.callee}</TableCell>
//               <TableCell>{call.duration}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// export default CallLogs;


// src/components/CallLogs.jsx
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
