// Submenu.js
import React from "react";
import MenuList from "./MenuList";
import PropTypes from "prop-types";

const Submenu = ({ items, isVisible }) => (
  <ul
    className={`absolute left-0 top-full bg-white border border-gray-200 shadow-lg rounded-md transition-all duration-300 ${
      isVisible ? "block opacity-100" : "hidden opacity-0"
    }`}
    role="menu"
    aria-hidden={!isVisible}
    aria-label="Submenu"
  >
    <MenuList items={items} />
  </ul>
);

Submenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Submenu;
