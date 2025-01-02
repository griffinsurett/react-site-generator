// Menu.js
import React from "react";
import MenuItem from "./MenuItem";
import BackButton from "./BackButton";
import PropTypes from "prop-types";

const Menu = ({
  currentMenu,
  menuHistory,
  handleSubmenuClick,
  handleBackClick,
  toggleMenu,
}) => (
  <ul
    className="flex flex-col items-center justify-center min-h-full space-y-4"
    role="menu"
    aria-label="Hamburger menu"
  >
    {menuHistory.length > 0 && <BackButton handleBackClick={handleBackClick} />}
    {currentMenu.map((item, index) => (
      <MenuItem
        key={index}
        item={item}
        handleSubmenuClick={handleSubmenuClick}
        toggleMenu={toggleMenu}
      />
    ))}
  </ul>
);

Menu.propTypes = {
  currentMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuHistory: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  handleSubmenuClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Menu;
