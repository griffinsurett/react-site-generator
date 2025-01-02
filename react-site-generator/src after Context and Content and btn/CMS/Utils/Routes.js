// src/CMS/Utils/Routes.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Content from "../Content";
import CollectionRedirect from "./Redirect/CollectionRedirect";
import RedirectUtils from "./Redirect/RedirectFrom";
import { useCMSContext } from "../CMSContext"; // We can set pageId from here

const DynamicRoutes = () => {
  const { ThemeComponent, setPageId } = useCMSContext();
  // We'll still separate static vs. collection pages
  const staticPages = Content.pages.filter((page) => !page.isCollection);
  const collectionPages = Content.pages.filter((page) => page.isCollection);
  const errorPage = Content.pages.find((page) => page.id === "error");

  return (
    <Routes>
      {/* Static Page Routes */}
      {staticPages.map((page) => (
        <Route
          key={page.id}
          path={page.slug}
          element={
            <PageWrapper pageId={page.id} ThemeComponent={ThemeComponent} setPageId={setPageId} />
          }
        />
      ))}

      {/* Collection Page Routes */}
      {collectionPages.map((page) => (
        <Route
          key={page.id}
          path={page.slug}
          element={
            <PageWrapper pageId={page.id} ThemeComponent={ThemeComponent} setPageId={setPageId} />
          }
        />
      ))}

      {/* Redirects */}
      {CollectionRedirect()}
      {RedirectUtils()}

      {/* Fallback Route */}
      {errorPage && (
        <Route
          path="*"
          element={<Navigate to={errorPage.slug} replace />}
        />
      )}
    </Routes>
  );
};

/**
 * PageWrapper is a small component that:
 * 1) sets pageId in the CMSContext
 * 2) Renders the chosen Theme
 */
const PageWrapper = ({ pageId, ThemeComponent, setPageId }) => {
  useEffect(() => {
    setPageId(pageId);
  }, [pageId, setPageId]);

  return <ThemeComponent />;
};

export default DynamicRoutes;
