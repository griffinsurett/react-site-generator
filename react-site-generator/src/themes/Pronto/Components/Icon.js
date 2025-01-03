// themes/Pronto/Components/Icon.js
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Icon Component
 *
 * Renders a FontAwesome icon with standardized styling.
 *
 * Props:
 * - icon: The FontAwesome icon object.
 * - className: Additional CSS classes for customization.
 * - size: Size of the icon (e.g., 'lg', '2x').
 * - color: Color of the icon.
 * - ...rest: Any other props to pass to the FontAwesomeIcon component.
 */

const Icon = ({ icon, className = "", size, color, ...rest }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${className}`}
      size={size}
      color={color}
      {...rest}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired, // FontAwesome icon object
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
