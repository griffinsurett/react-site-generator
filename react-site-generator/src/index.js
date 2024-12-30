// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SetMetaInfo from "./CMS/Utils/SEO/SetMetaInfo"; // Import metadata handler
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Get the current page slug from the URL
const pageSlug = window.location.pathname === "/" ? "/" : window.location.pathname;

// Pre-render metadata before the app loads
SetMetaInfo(pageSlug);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
