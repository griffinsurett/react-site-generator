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
 * - ariaLabel: (Optional) ARIA label for accessibility.
 * - decorative: (Optional) If true, the icon is purely decorative.
 * - ...rest: Any other props to pass to the FontAwesomeIcon component.
 */

const Icon = ({ icon, className = "", size, color, ariaLabel, decorative = false, ...rest }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${className}`}
      size={size}
      color={color}
      aria-label={!decorative ? ariaLabel : undefined}
      role={!decorative ? "img" : undefined}
      focusable={!decorative} // Prevent keyboard focus if decorative
      {...rest}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.object.isRequired, // FontAwesome icon object
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  ariaLabel: PropTypes.string, // ARIA label for accessibility
  decorative: PropTypes.bool, // If the icon is decorative
};

export default Icon;
