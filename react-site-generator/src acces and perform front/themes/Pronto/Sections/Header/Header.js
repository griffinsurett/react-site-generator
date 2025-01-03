// src/themes/Pronto/Sections/Header/Header.js
import React from "react";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "../../Components/Image";

/**
 * Header Component
 *
 * Renders the site header with logo and navigation menu.
 *
 * Props:
 * - siteSettings: Object containing siteLogo and siteTitle.
 * - menuManager: Object to manage menus.
 * - isSticky: Boolean to determine if the header is sticky.
 */

const Header = ({ siteSettings, menuManager, isSticky }) => {
  return (
    <header
      className={`py-4 px-5 ${
        isSticky ? "sticky top-0" : "relative"
      } shadow-md bg-white`}
      style={{
        zIndex: isSticky ? 1000 : "auto", // Apply zIndex only if sticky
      }}
    >
      <div className="flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label={`Navigate to ${siteSettings.siteTitle} homepage`}>
            <Image
              src={siteSettings.siteLogo}
              alt={`${siteSettings.siteTitle} Logo`}
              className="w-16 mr-3"
            />
            <span className="text-xl font-semibold">{siteSettings.siteTitle}</span>
          </Link>
        </div>
        {/* Right section */}
        <nav aria-label="Primary Navigation">
          <NavMenu menuManager={menuManager} />
        </nav>
      </div>
    </header>
  );
};

// Define PropTypes for better type checking
Header.propTypes = {
  siteSettings: PropTypes.shape({
    siteLogo: PropTypes.string.isRequired,
    siteTitle: PropTypes.string.isRequired,
  }).isRequired,
  menuManager: PropTypes.object.isRequired, // Adjust based on actual shape
  isSticky: PropTypes.bool, // Define isSticky as a boolean
};

// Define default props in case isSticky is not provided
Header.defaultProps = {
  isSticky: false,
};

export default Header;
