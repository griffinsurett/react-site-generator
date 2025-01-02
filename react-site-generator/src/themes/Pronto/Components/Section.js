// Section.js
import React from "react";
import PropTypes from "prop-types";

const Section = ({
  className = "h-screen",
  id = "",
  style = {},
  children,
  ariaLabel,
  ...restProps
}) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center text-center`}
      id={id}
      style={style}
      aria-label={ariaLabel}
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
  ariaLabel: PropTypes.string, // ARIA label for the section
};

export default Section;
