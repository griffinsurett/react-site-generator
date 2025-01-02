// themes/Pronto/Components/Image.js
import React from "react";
import PropTypes from "prop-types";

/**
 * Image Component
 *
 * Renders an image with standardized styling.
 *
 * Props:
 * - src: The source URL of the image.
 * - alt: Alternative text for the image. If decorative, set decorative=true and omit alt.
 * - className: Additional CSS classes for customization.
 * - width: Width of the image.
 * - height: Height of the image.
 * - srcSet: (Optional) Source sets for responsive images.
 * - sizes: (Optional) Sizes attribute for responsive images.
 * - decorative: (Optional) If true, the image is purely decorative.
 * - ...rest: Any other props to pass to the <img> tag.
 */

const Image = ({ src, alt, className = "", width, height, srcSet, sizes, decorative = false, ...rest }) => {
  return (
    <img
      src={src}
      alt={!decorative ? alt : ""}
      className={`object-cover ${className}`}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading="lazy"
      aria-hidden={decorative}
      {...rest}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string, // Make alt optional if decorative
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  decorative: PropTypes.bool, // If the image is decorative
};

Image.defaultProps = {
  alt: "",
  srcSet: "",
  sizes: "",
  decorative: false,
};

export default Image;
