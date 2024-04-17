import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DatabricksTrigger from "./extenstions/databricks-trigger/DatabricksTrigger";
import { VennDiagram } from "./extenstions/venn-diagram/VennDiagram";
import { Button } from "@tableau/tableau-ui";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/databricks-trigger" element={<DatabricksTrigger />} />
        <Route path="/venn-diagram" element={<VennDiagram />} />
        <Route
          path="/"
          element={
            <div
              style={{
                position: "absolute",
                margin: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to="/databricks-trigger">
                <Button>Go to Databricks Trigger Extension</Button>
              </Link>
              <Link
                style={{
                  marginTop: "15px",
                }}
                to="/venn-diagram"
              >
                <Button>Go to Venn Diagram Extension</Button>
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
