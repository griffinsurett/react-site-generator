// src/themes/Pronto/Components/Image.js
import React from "react";
import PropTypes from "prop-types";

/**
 * Image Component
 *
 * Renders an image with standardized styling.
 *
 * Props:
 * - src: The source URL of the image.
 * - alt: Alternative text for the image.
 * - className: Additional CSS classes for customization.
 * - width: Width of the image.
 * - height: Height of the image.
 * - role: (Optional) ARIA role for the image.
 * - ...rest: Any other props to pass to the <img> tag.
 */

const Image = ({ src, alt, className = "", width, height, role, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      role={role}
      {...rest}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired, // Enforce alt text for accessibility
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  role: PropTypes.string, // Optional ARIA role
};

export default Image;
