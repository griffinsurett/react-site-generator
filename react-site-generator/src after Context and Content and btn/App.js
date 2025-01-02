// App.js
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import DynamicRoutes from "./CMS/Utils/Routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; 
import { CMSProvider } from "./CMS/CMSContext"; // Import the provider
import { initializeAnalyticsHead } from "./CMS/Headers-Footers/Headers";
import { initializeAnalyticsFooter } from "./CMS/Headers-Footers/Footers";

const App = () => {
  useEffect(() => {
    // Initialize analytics and SDKs for <head> and <footer>
    initializeAnalyticsHead();
    initializeAnalyticsFooter();
  }, []);

  return (
    <BrowserRouter>
    <CMSProvider> {/* Wrap your app in the provider */}
      <ScrollToTop /> {/* Ensure ScrollToTop is included here */}
      <DynamicRoutes />
    </CMSProvider>
    </BrowserRouter>
  );
};

export default App;
