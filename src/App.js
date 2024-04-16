import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DatabricksTrigger from "./extenstions/databricks-trigger/DatabricksTrigger";
import { VennDiagram } from "./extenstions/venn-diagram/VennDiagram";

function App() {
  const userData = [
    { userId: 1, audience: "Display" },
    { userId: 2, audience: "Audio" },
    { userId: 3, audience: "Audio" },
    { userId: 1, audience: "Video" },
    { userId: 2, audience: "Video" },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/databricks-trigger" element={<DatabricksTrigger />} />
        <Route path="/venn-diagram" element={<VennDiagram />} />
        <Route
          path="/"
          element={
            <>
              <Link to="/databricks-trigger">
                <button>Go to Databricks Trigger</button>
              </Link>
              <Link to="/venn-diagram">
                <button>Go to Venn Diagram</button>
              </Link>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
