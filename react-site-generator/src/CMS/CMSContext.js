// src/CMS/CMSContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/DynamicContent/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import useMeta from "./Utils/SEO/UseMeta"; // Import the custom hook
import Content from "./Content"; 

const CMSContext = createContext(null);

// Lazy load the Pronto theme
const Pronto = React.lazy(() => import("../themes/Pronto/CMSDisplayTheme"));

export const CMSProvider = ({ children }) => {
  const location = useLocation();

  // The "current pageId" we want to display; default to "home" or any fallback
  const [pageId, setPageId] = useState("home");

  // Internal state that mirrors what we had in useThemeContent
  const [cmsData, setCmsData] = useState({
    loading: true,
    pageStructure: null,
    siteSettings: null,
  });

  // New state to track if it's the initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Utilize the useMeta hook here
  useMeta({
    title: cmsData.pageStructure?.title || "",
    description: cmsData.pageStructure?.description || "",
    keywords: [
      ...(cmsData.pageStructure?.keywords || []),
      ...(cmsData.siteSettings?.keywords || []),
    ],
    siteTitle: cmsData.siteSettings?.siteTitle || "",
    author: cmsData.siteSettings?.businessOwner || "",
    image: cmsData.pageStructure?.featuredImage || cmsData.siteSettings?.siteLogo || null,
    url: window.location.href,
  });

  useEffect(() => {
    // Function to load CMS data
    const loadCMSData = () => {
      const pageStructure = getPageStructure(pageId);
      const siteSettings = { ...getSiteSettings(), queries: Content.queries };

      setCmsData({
        loading: false,
        pageStructure,
        siteSettings,
      });

      // If it's the initial load, mark it as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    };

    if (isInitialLoad) {
      // Only set loading to true during the initial load
      setCmsData((prev) => ({ ...prev, loading: true }));
      loadCMSData();
    } else {
      // For client-side navigations, do not set loading to true
      loadCMSData();
    }
  }, [location, pageId, isInitialLoad]);

  // Combine everything we want to expose to the rest of the app
  const contextValue = {
    ...cmsData,             // loading, pageStructure, siteSettings
    pageId,                 // current page
    setPageId,              // function to switch page
    ThemeComponent: Pronto, // the chosen theme component (lazy loaded)
    isInitialLoad,         // expose isInitialLoad
  };

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMSContext = () => useContext(CMSContext);
