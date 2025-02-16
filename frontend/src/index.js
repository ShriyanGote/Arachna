import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Fix the path
import "./styles/index.css"; // ✅ Correct relative path
// import "./styles/index.css"; // ✅ Fix CSS path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
