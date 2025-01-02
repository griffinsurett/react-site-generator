// MenuItem.js
import React, { useState, useEffect } from "react";
import Submenu from "./Submenu";
import ArrowIcon from "../../ArrowIcon";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    // Close submenu on click
    setIsHovered(false);
  };

  // Reset hover state on route change
  useEffect(() => {
    setIsHovered(false);
  }, [location]);

  return (
    <li
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="none"
    >
      <div className="flex items-center space-x-2">
        <Link
          to={item.slug}
          className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
          onClick={handleClick} // Close submenu on click
          role="menuitem"
        >
          {item.title}
        </Link>
        {item.items && item.items.length > 0 && (
          <button
            className="focus:outline-none"
            aria-label={isHovered ? "Close submenu" : "Open submenu"}
            aria-haspopup="true"
            aria-expanded={isHovered}
            onClick={(e) => { e.preventDefault(); setIsHovered(!isHovered); }}
          >
            <ArrowIcon direction={isHovered ? "up" : "down"} size={12} />
          </button>
        )}
      </div>
      {item.items && item.items.length > 0 && (
        <Submenu items={item.items} isVisible={isHovered} />
      )}
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
  }).isRequired,
};

export default MenuItem;
