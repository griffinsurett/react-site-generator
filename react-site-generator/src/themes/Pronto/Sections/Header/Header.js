// src/themes/Pronto/Sections/Header/Header.js
import React from "react";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "../../Components/Image";

const Header = ({ siteSettings, menuManager, isSticky }) => {
  return (
    <header
      className={`py-4 px-5 ${
        isSticky ? "sticky top-0" : "relative"
      } shadow-md bg-white`}
      style={{
        zIndex: isSticky ? 1000 : "auto", // Apply zIndex only if sticky
      }}
      role="banner"
    >
      <div className="flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label="Navigate to Home Page">
            <Image
              src={siteSettings.siteLogo}
              alt={`${siteSettings.siteTitle} logo`}
              className="w-16 mr-3"
            />
            <h1 className="text-xl font-semibold">{siteSettings.siteTitle}</h1>
          </Link>
        </div>
        {/* Right section */}
        <nav className="flex items-center" aria-label="Primary Navigation">
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
