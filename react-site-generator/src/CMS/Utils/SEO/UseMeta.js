// src/CMS/Utils/SEO/useMeta.js
import { useEffect, useRef } from "react";

/**
 * Custom hook to manage and set document metadata.
 * @param {object} meta - Metadata object containing title, description, keywords, etc.
 */
const useMeta = ({ title, description, keywords = [], siteTitle, author, image = null, url = window.location.href }) => {
  const prevMetaRef = useRef({});

  useEffect(() => {
    const fullTitle = title !== "Untitled Page" ? `${title} - ${siteTitle}` : siteTitle;

    // Prevent redundant updates
    if (prevMetaRef.current.title !== fullTitle) {
      document.title = fullTitle;
      prevMetaRef.current.title = fullTitle;
    }

    // Helper to set or update a meta tag
    const setMetaTag = (selector, attribute, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (attribute === "property") {
          const propertyValue = selector.match(/property=['"](.+)['"]/);
          if (propertyValue && propertyValue[1]) {
            element.setAttribute("property", propertyValue[1]);
          }
        } else if (attribute === "name") {
          const nameValue = selector.match(/name=['"](.+)['"]/);
          if (nameValue && nameValue[1]) {
            element.setAttribute("name", nameValue[1]);
          }
        }
        document.head.appendChild(element);
      }

      if (prevMetaRef.current[selector] !== contentValue) {
        element.setAttribute("content", contentValue);
        prevMetaRef.current[selector] = contentValue;
      }
    };

    // Description
    setMetaTag("meta[name='description']", "name", description);

    // Keywords
    setMetaTag("meta[name='keywords']", "name", keywords.join(", "));

    // Author
    setMetaTag("meta[name='author']", "name", author);

    // Canonical URL
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    if (prevMetaRef.current.canonical !== url) {
      canonicalLink.href = url;
      prevMetaRef.current.canonical = url;
    }

    // Open Graph Tags
    const ogTags = {
      "og:title": fullTitle,
      "og:description": description,
      "og:image": image,
      "og:url": url,
      "og:type": "website",
    };

    Object.entries(ogTags).forEach(([property, contentValue]) => {
      setMetaTag(`meta[property='${property}']`, "property", contentValue);
    });

    // Twitter Card Tags
    const twitterTags = {
      "twitter:title": fullTitle,
      "twitter:description": description,
      "twitter:image": image,
      "twitter:card": "summary_large_image",
    };

    Object.entries(twitterTags).forEach(([name, contentValue]) => {
      setMetaTag(`meta[name='${name}']`, "name", contentValue);
    });

    // Structured Data (Schema.org)
    const scriptId = "structured-data";
    let structuredDataScript = document.getElementById(scriptId);
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.id = scriptId;
      structuredDataScript.type = "application/ld+json";
      document.head.appendChild(structuredDataScript);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description: description,
      url: url,
      ...(image && { image }),
    };

    const newSchema = JSON.stringify(schemaData, null, 2);
    if (prevMetaRef.current.schema !== newSchema) {
      structuredDataScript.textContent = newSchema;
      prevMetaRef.current.schema = newSchema;
    }

  }, [title, description, keywords, siteTitle, author, image, url]);

};

export default useMeta;
