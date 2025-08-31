import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const GraphView = ({ calls }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...calls.flatMap((call) => [
          { data: { id: call.caller, label: call.caller } },
          { data: { id: call.callee, label: call.callee } },
          {
            data: {
              id: `${call.caller}-${call.callee}`,
              source: call.caller,
              target: call.callee,
              label: `${call.duration}s`,
            },
          },
        ]),
      ],
      style: [
        // 🔹 Node styling
        {
          selector: "node",
          style: {
            "background-color": "#4cafef",
            "border-width": 2,
            "border-color": "#ffffff",
            "border-opacity": 0.8,
            "text-outline-color": "#1e1e1e",
            "text-outline-width": 2,
            label: "data(label)",
            color: "#fff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "13px",
            "font-weight": "600",
            "transition-property": "background-color, border-color",
            "transition-duration": "0.3s",
          },
        },
        // 🔹 Node hover effect
        {
          selector: "node:hover",
          style: {
            "background-color": "#00c853", // green on hover
            "border-color": "#ffeb3b",
            "cursor": "pointer",
          },
        },
        // 🔹 Edge styling
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#bbb",
            "target-arrow-color": "#bbb",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            "font-size": "10px",
            color: "#eee",
            "text-background-color": "#333",
            "text-background-opacity": 0.8,
            "text-background-shape": "round-rectangle",
            "text-background-padding": "2px 4px",
          },
        },
        // 🔹 Edge hover effect
        {
          selector: "edge:hover",
          style: {
            "line-color": "#ff9800",
            "target-arrow-color": "#ff9800",
            "width": 3,
          },
        },
      ],
      layout: { name: "cose", animate: true }, // more natural layout
    });

    // Show node stats on click
    cy.on("tap", "node", (evt) => {
      const node = evt.target;
      alert(`📞 Node: ${node.id()}\nTotal Calls: TBD\nAvg Duration: TBD`);
    });

    return () => cy.destroy();
  }, [calls]);

  return (
    <div 
    className="graph-view-container">
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
        Graph View
      </h2>
      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl shadow-md"
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #444",
          background: "linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
};

export default GraphView;
