// Footer.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
      role="contentinfo"
    >
      {/* Footer Navigation */}
      <nav aria-label="Footer Navigation" className="mb-2">
        <ul className="flex flex-wrap justify-center space-x-4">
          {footerMenu.map((item, index) => (
            <li key={index}>
              {item.slug ? (
                <Link to={item.slug} className="hover:underline">
                  {item.title}
                </Link>
              ) : (
                <a href={item.link} className="hover:underline">
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Media Links */}
      <nav aria-label="Social Media Links" className="mb-2">
        <ul className="flex space-x-4">
          {socialMenu.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title} // Descriptive aria-label
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Text */}
      <p className="text-sm">{siteSettings.Copyright}</p>
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
