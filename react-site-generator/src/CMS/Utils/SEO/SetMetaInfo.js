/**
 * setMetaInfo.js
 * Dynamically sets the document's main meta tags.
 */

import Content from "../../Content"; // Import your CMS content

/**
 * Generates metadata based on the current page slug.
 * @param {string} pageSlug - The slug of the current page.
 */
const generateMetadata = (pageSlug) => {
  const siteSettings = Content.siteSettings;
  const page =
    Content.pages.find((p) => p.slug === pageSlug) ||
    Content.pages.find((p) => p.id === "home");

  return {
    title: page?.title || siteSettings.siteTitle,
    description: page?.description || siteSettings.siteDescription,
    keywords: siteSettings.keywords || [],
    author: siteSettings.businessOwner,
    url: `${window.location.origin}${page?.slug || "/"}`,
    image: page?.featuredImage || siteSettings.siteLogo,
  };
};

/**
 * Injects metadata into the HTML <head>.
 * @param {object} metadata - The metadata object.
 */
const injectMetadata = ({ title, description, keywords, author, url, image }) => {
  // Set document title
  document.title = title;

  // Define metadata fields
  const metaTags = {
    description,
    keywords: keywords.join(", "),
    author,
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:image": image,
    "og:type": "website",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:card": "summary_large_image",
    canonical: url,
  };

  // Add or update meta tags dynamically
  Object.entries(metaTags).forEach(([name, content]) => {
    let element;

    if (name === "canonical") {
      // Handle canonical links separately
      element = document.querySelector(`link[rel="canonical"]`);
      if (!element) {
        element = document.createElement("link");
        element.rel = "canonical";
        document.head.appendChild(element);
      }
    } else if (name.startsWith("og:") || name.startsWith("twitter:")) {
      // Handle Open Graph and Twitter meta tags
      element = document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", name);
        document.head.appendChild(element);
      }
    } else {
      // Handle regular meta tags
      element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
    }

    element.setAttribute("content", content);
  });
};

/**
 * Handles metadata generation and injection based on the current page slug.
 * @param {string} pageSlug - The slug of the current page.
 */
const SetMetaInfo = (pageSlug) => {
  const metadata = generateMetadata(pageSlug);
  injectMetadata(metadata);
};

// Export the metadata handling functions for reuse
export default SetMetaInfo;
