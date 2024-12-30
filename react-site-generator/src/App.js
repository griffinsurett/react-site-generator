// App.js
import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import DynamicRoutes from "./CMS/Utils/Routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { initializeAnalyticsHead } from "./CMS/Headers-Footers/Headers";
import { initializeAnalyticsFooter } from "./CMS/Headers-Footers/Footers";
import SetMetaInfo from "./CMS/Utils/SEO/SetMetaInfo"; // Import metadata handler
import "./App.css";

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Update metadata dynamically on route change
    const pageSlug = location.pathname === "/" ? "/" : location.pathname;
    SetMetaInfo(pageSlug);
  }, [location]);

  return (
    <>
      <ScrollToTop /> {/* Ensure ScrollToTop is included here */}
      <DynamicRoutes />
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize analytics and SDKs for <head> and <footer>
    initializeAnalyticsHead();
    initializeAnalyticsFooter();
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
