// NavMenu.js
import React from "react";
import HierarchicalMenu from "../../Components/Menu/HierarchicalMenu/HierarchicalMenu";
import PropTypes from "prop-types";

const NavMenu = ({ menuManager }) => {
  const navMenuItems = menuManager?.getHierarchicalMenu("Primary") || [];
  return (
    <HierarchicalMenu
      menuItems={navMenuItems}
      hamburgerOnly={false}
      breakpoint={1068}
    />
  );
};

NavMenu.propTypes = {
  menuManager: PropTypes.object.isRequired,
};

export default NavMenu;
