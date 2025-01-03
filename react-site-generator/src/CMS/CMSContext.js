// src/CMS/CMSContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { getPageStructure } from "./Utils/DynamicContent/GetPageStructure";
import { getSiteSettings } from "./Utils/GetContent/GetSettings";
import { setMetaInfo } from "./Utils/SEO/SetMetaInfo";
import Content from "./Content";

// Lazy-load the "Pronto" theme using React.lazy
const ProntoTheme = lazy(() => import("../themes/Pronto/CMSDisplayTheme"));

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

  useEffect(() => {
    const loadCMSData = async () => {
      setCmsData((prev) => ({ ...prev, loading: true }));
      const pageStructure = getPageStructure(pageId);
      const siteSettings = { ...getSiteSettings(), queries: Content.queries };

      // If valid, set meta tags just like before
      if (pageStructure && siteSettings) {
        setMetaInfo({
          title: pageStructure.title,
          description: pageStructure.description,
          keywords: [
            ...(pageStructure.keywords || []),
            ...(siteSettings.keywords || []),
          ],
          siteTitle: siteSettings.siteTitle,
          author: siteSettings.businessOwner,
          image:
            pageStructure.featuredImage || siteSettings.siteLogo || null,
          url: window.location.href,
        });
      }

      setCmsData({
        loading: false,
        pageStructure,
        siteSettings,
      });
    };

    loadCMSData();
  }, [location, pageId]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      ...cmsData, // loading, pageStructure, siteSettings
      pageId, // current page
      setPageId, // function to switch page
      ThemeComponent: ProntoTheme, // the chosen theme component
    }),
    [cmsData, pageId]
  );

  return (
    <CMSContext.Provider value={contextValue}>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </CMSContext.Provider>
  );
};

export const useCMSContext = () => useContext(CMSContext);

// Reusable Loader Component for Suspense
const Loader = React.memo(() => (
  <div className="loader">
    <h2>Loading...</h2>
  </div>
));
