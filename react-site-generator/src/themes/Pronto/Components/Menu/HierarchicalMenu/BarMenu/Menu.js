// src/themes/Pronto/Components/Menu/HierarchicalMenu/BarMenu/Menu.js
import React from "react";
import MenuList from "./MenuList";
import PropTypes from "prop-types";

const Menu = ({ menuItems }) => (
  <ul className="flex space-x-6" role="menubar" aria-label="Main menu">
    <MenuList items={menuItems} />
  </ul>
);

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Menu;
