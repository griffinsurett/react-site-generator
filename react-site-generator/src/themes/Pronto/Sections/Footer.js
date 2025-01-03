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
        isSticky = false ? "sticky bottom-0" : "relative"
      } flex flex-col justify-center items-center text-center`}
      style={{
        zIndex: 1000, // Apply zIndex only if sticky
      }}
    >
      {/* Footer Menu */}
      <ul className="flex flex-wrap mb-2">
        {footerMenu.map((item, index) => (
          <li key={index} className="mx-2">
            <a href={item.link || item.slug} className="hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Social Menu */}
      <ul className="flex">
        {socialMenu.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </a>
          </li>
        ))}
      </ul>

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
