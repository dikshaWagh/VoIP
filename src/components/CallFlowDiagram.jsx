// src/components/CallFlowDiagram.jsx
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const CallFlowDiagram = () => {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: "dark" }); // dark theme to match dashboard
    if (diagramRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  const diagram = `
    sequenceDiagram
      participant Caller as 1001
      participant Callee as 2001
      Caller->>Callee: INVITE
      Callee-->>Caller: 200 OK
      Caller->>Callee: ACK
      Caller->>Callee: RTP Stream
      Caller-->>Callee: BYE
      Callee-->>Caller: 200 OK
  `;

  return (
    <div className="gridBox" 
    style={{
      border: "1px solid #0ff",
  boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
  background: "rgba(6, 6, 6, 0.9);  margin-top: 10px"
    }}>
      <h2 className="gridTitle">CALL FLOW DIAGRAM</h2>
      <div className="mermaid diagramBox" ref={diagramRef}>
        {diagram}
      </div>
    </div>
  );
};

export default CallFlowDiagram;
