// src/themes/Pronto/Components/Section.js
import React from "react";
import PropTypes from "prop-types";

/**
 * Section Component
 *
 * Renders a semantic <section> with standardized styling.
 *
 * Props:
 * - className: Additional CSS classes for customization.
 * - id: ID for the section, useful for navigation and ARIA attributes.
 * - style: Inline styles for the section.
 * - children: Child components to render within the section.
 * - ariaLabel: (Optional) ARIA label for the section.
 * - ariaLabelledby: (Optional) ID of the element that labels the section.
 * - ...restProps: Any other props to pass to the <section> tag.
 */

const Section = ({
  className = "h-screen",
  id = "",
  style = {},
  children,
  ariaLabel,
  ariaLabelledby,
  ...restProps
}) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center text-center`}
      id={id}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      {...restProps}
    >
      {children}
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
};

export default Section;
