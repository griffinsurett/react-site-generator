// Section.js
import React from "react";
import PropTypes from "prop-types";

const Section = ({
  className = "h-screen",
  id = "",
  style = {},
  children,
  ...restProps
}) => {
  return (
    <section
      className={`${className} flex flex-col justify-center items-center text-center`}
      id={id}
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
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Section;
