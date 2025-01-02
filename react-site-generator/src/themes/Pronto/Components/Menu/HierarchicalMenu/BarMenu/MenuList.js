// MenuList.js
import React from "react";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

const MenuList = ({ items }) => (
  <>
    {items.map((item, index) => (
      <MenuItem key={item.slug || index} item={item} id={`menuitem-${index}`} />
    ))}
  </>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MenuList;
