// src/CMS/CMSContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/DynamicContent/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import { setMetaInfo } from "./Utils/SEO/SetMetaInfo";
import Content from "./Content"; 
import Pronto from "../themes/Pronto/CMSDisplayTheme"; 
// ^ We import the "Pronto" theme as the default theme for now

/**
 * CMSContext
 * It holds:
 *   - loading state
 *   - pageStructure (sections, etc.)
 *   - siteSettings
 *   - ThemeComponent (which theme to use, here "Pronto")
 *   - setPageId() to change the current page dynamically
 */

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

        setMetaInfo({
          title: pageStructure.title,
          description: pageStructure.description,
          keywords,
          siteTitle: siteSettings.siteTitle,
          author: siteSettings.businessOwner,
          image: pageStructure.featuredImage || siteSettings.siteLogo,
        });
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
