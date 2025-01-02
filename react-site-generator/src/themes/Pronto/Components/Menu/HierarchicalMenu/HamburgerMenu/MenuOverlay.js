// MenuOverlay.js
import React from "react";
import PropTypes from "prop-types";

const MenuOverlay = ({ toggleMenu }) => (
  <div
    className="inset-0 z-40"
    onClick={toggleMenu}
    role="button"
    tabIndex="0"
    aria-label="Close menu"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        toggleMenu();
      }
    }}
  ></div>
);

MenuOverlay.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuOverlay;
