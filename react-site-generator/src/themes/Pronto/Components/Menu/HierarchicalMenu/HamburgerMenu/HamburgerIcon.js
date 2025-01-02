// HamburgerIcon.js
import React from "react";
import PropTypes from "prop-types";

const HamburgerIcon = ({ isMenuOpen, toggleMenu }) => (
  <button
    className="flex flex-col justify-between w-6 h-6 cursor-pointer bg-gray-800 focus:outline-none"
    onClick={toggleMenu}
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    aria-expanded={isMenuOpen}
  >
    <span
      className={`block h-0.5 bg-gray-800 transform transition-transform duration-300 ${
        isMenuOpen ? "rotate-45 translate-y-1.5" : ""
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-800 transition-opacity duration-300 ${
        isMenuOpen ? "opacity-0" : "opacity-100"
      }`}
    ></span>
    <span
      className={`block h-0.5 bg-gray-800 transform transition-transform duration-300 ${
        isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
      }`}
    ></span>
  </button>
);

HamburgerIcon.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerIcon;
