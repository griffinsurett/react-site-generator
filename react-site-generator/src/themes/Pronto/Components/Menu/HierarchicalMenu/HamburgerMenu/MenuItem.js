// MenuItem.js
import React from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../ArrowIcon";
import PropTypes from "prop-types";

const MenuItem = ({ item, handleSubmenuClick, toggleMenu }) => {
  const hasSubmenu = item.items && item.items.length > 0;

  return (
    <li className="w-full" role="none">
      <div className="flex items-center justify-between w-full px-4 py-2">
        <Link
          to={item.slug}
          className="hover:underline"
          onClick={toggleMenu}
          role="menuitem"
        >
          {item.title}
        </Link>
        {hasSubmenu && (
          <button
            className="focus:outline-none"
            onClick={() => handleSubmenuClick(item.items)}
            aria-haspopup="true"
            aria-expanded="false" // Initial state; can be managed if submenu is dynamic
            aria-label={`Open submenu for ${item.title}`}
          >
            <ArrowIcon direction="left" size={16} ariaLabel={`Arrow indicating submenu for ${item.title}`} />
          </button>
        )}
      </div>
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleSubmenuClick: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuItem;
