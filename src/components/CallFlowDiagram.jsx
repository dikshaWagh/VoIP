// src/components/CallFlowDiagram.jsx
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const CallFlowDiagram = () => {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (diagramRef.current) {
      mermaid.contentLoaded(); // Render diagram
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
    <div>
      <h2>Call Flow Diagram</h2>
      <div className="mermaid" ref={diagramRef}>
        {diagram}
      </div>
    </div>
  );
};

export default CallFlowDiagram;
