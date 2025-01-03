// src/themes/Pronto/Components/Icon.js
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = React.memo(({ icon, className = "", size, color, ariaLabel, ...rest }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${className}`}
      size={size}
      color={color}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      {...rest}
    />
  );
});

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Icon;
