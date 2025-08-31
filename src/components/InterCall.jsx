// src/components/InternationalCallsMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Example call data (Caller → Callee)
const calls = [
  {
    caller: "India",
    callerCoords: [28.6139, 77.2090], // New Delhi
    callee: "USA",
    calleeCoords: [40.7128, -74.0060], // New York
  },
  {
    caller: "Germany",
    callerCoords: [52.52, 13.405], // Berlin
    callee: "Australia",
    calleeCoords: [-33.8688, 151.2093], // Sydney
  },
];

const InternationalCallsMap = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {calls.map((call, index) => (
          <React.Fragment key={index}>
            {/* Caller Marker */}
            <Marker position={call.callerCoords}>
              <Popup>{`Caller: ${call.caller}`}</Popup>
            </Marker>

            {/* Callee Marker */}
            <Marker position={call.calleeCoords}>
              <Popup>{`Callee: ${call.callee}`}</Popup>
            </Marker>

            {/* Line connecting caller & callee */}
            <Polyline
              positions={[call.callerCoords, call.calleeCoords]}
              pathOptions={{ color: "cyan", weight: 3 }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default InternationalCallsMap;
