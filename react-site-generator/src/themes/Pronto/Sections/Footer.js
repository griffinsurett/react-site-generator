// src/themes/Pronto/Sections/Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

/**
 * Footer Component
 *
 * Renders the site footer with navigation menus and social media links.
 *
 * Props:
 * - menuManager: Object to manage footer and social menus.
 * - siteSettings: Object containing site settings like copyright.
 * - isSticky: Boolean to determine if the footer is sticky.
 */

const Footer = ({ menuManager, siteSettings, isSticky }) => {
  const footerMenu = menuManager.getFlatMenu("Footer");
  const socialMenu = menuManager.getFlatMenu("Social Media");

  return (
    <footer
      className={`py-4 px-5 ${
        isSticky ? "sticky bottom-0" : "relative"
      } flex flex-col justify-center items-center text-center`}
      style={{
        zIndex: isSticky ? 1000 : "auto", // Apply zIndex only if sticky
      }}
    >
      {/* Footer Navigation Menu */}
      <nav aria-label="Footer Navigation">
        <ul className="flex flex-wrap mb-2">
          {footerMenu.map((item, index) => (
            <li key={index} className="mx-2">
              <a href={item.link || item.slug} className="hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Media Links */}
      <nav aria-label="Social Media">
        <ul className="flex space-x-4">
          {socialMenu.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title} // Assuming item.title is the platform name
                className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
              >
                <FontAwesomeIcon icon={item.icon} size="lg" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Text */}
      <p className="text-sm mt-2">{siteSettings.Copyright}</p>
    </footer>
  );
};

// Define PropTypes for better type checking
Footer.propTypes = {
  menuManager: PropTypes.shape({
    getFlatMenu: PropTypes.func.isRequired,
  }).isRequired,
  siteSettings: PropTypes.shape({
    Copyright: PropTypes.string,
  }).isRequired,
  isSticky: PropTypes.bool, // Define isSticky as a boolean
};

// Define default props in case isSticky is not provided
Footer.defaultProps = {
  isSticky: false,
};

export default Footer;
