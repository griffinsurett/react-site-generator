// Submenu.js
import React from "react";
import MenuList from "./MenuList";
import PropTypes from "prop-types";

const Submenu = ({ items, isVisible, parentId }) => (
  <ul
    className={`absolute left-0 top-full bg-white border border-gray-200 shadow-lg rounded-md transition-all duration-300 ${
      isVisible ? "block opacity-100" : "hidden opacity-0"
    }`}
    role="menu"
    aria-labelledby={parentId}
  >
    <MenuList items={items} />
  </ul>
);

Submenu.propTypes = {
  items: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  parentId: PropTypes.string.isRequired, // ID of the parent menu item for ARIA association
};

export default Submenu;
