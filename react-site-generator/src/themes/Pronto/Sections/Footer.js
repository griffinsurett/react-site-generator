// Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

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
      aria-label="Footer"
    >
      {/* Footer Menu */}
      <nav aria-label="Footer menu">
        <ul className="flex flex-wrap mb-2" role="menubar">
          {footerMenu.map((item, index) => (
            <li key={index} className="mx-2" role="none">
              <a href={item.link || item.slug} className="hover:underline" role="menuitem">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Menu */}
      <nav aria-label="Social media links">
        <ul className="flex" role="menubar">
          {socialMenu.map((item, index) => (
            <li key={index} role="none">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
                aria-label={`Visit our ${item.title} page`}
                role="menuitem"
              >
                <FontAwesomeIcon icon={item.icon} size="lg" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Text */}
      <p className="text-sm" role="contentinfo">
        {siteSettings.Copyright}
      </p>
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
