// Section.js
import React from "react";
import PropTypes from "prop-types";

const Section = ({
  className = "h-screen",
  id = "",
  ariaLabel,
  ariaLabelledby,
  style = {},
  children,
  ...restProps
}) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center text-center`}
      id={id}
      aria-label={ariaLabel ? ariaLabel : undefined}
      aria-labelledby={ariaLabelledby ? ariaLabelledby : undefined}
      style={style}
      {...restProps}
    >
      {children}
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Section;
