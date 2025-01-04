// src/CMS/CMSContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/DynamicContent/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import useMeta from "./Utils/SEO/UseMeta"; // Import the custom hook
import Content from "./Content"; 
import Pronto from "../themes/Pronto/CMSDisplayTheme"; 

const CMSContext = createContext(null);

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

  // You can store the chosen theme in state if you anticipate theme switching
  // For now, we only have "Pronto":
  const [ThemeComponent] = useState(() => Pronto);

  useEffect(() => {
    // Similar to the old "fetchContent" from useThemeContent
    const loadCMSData = () => {
      const pageStructure = getPageStructure(pageId);
      const siteSettings = { ...getSiteSettings(), queries: Content.queries };

      // If valid, set meta tags just like before
      if (pageStructure && siteSettings) {
        const keywords = [
          ...(pageStructure.keywords || []),
          ...(siteSettings.keywords || []),
        ];

        // Metadata is now managed by the useMeta hook
        // Pass all necessary metadata to the hook below
      }

      setCmsData({
        loading: false,
        pageStructure,
        siteSettings,
      });
    };

    // Reset to loading true each time location or pageId changes
    setCmsData((prev) => ({ ...prev, loading: true }));
    loadCMSData();
  }, [location, pageId]);

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

  // Combine everything we want to expose to the rest of the app
  const contextValue = {
    ...cmsData,         // loading, pageStructure, siteSettings
    pageId,             // current page
    setPageId,          // function to switch page
    ThemeComponent,     // the chosen theme component
  };

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMSContext = () => useContext(CMSContext);
