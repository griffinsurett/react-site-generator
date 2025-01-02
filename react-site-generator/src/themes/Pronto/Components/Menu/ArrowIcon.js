// ArrowIcon.js
import React from "react";
import PropTypes from "prop-types";

const ArrowIcon = ({ direction = "down", size = 16, ariaLabel }) => {
  const rotationMap = {
    down: "rotate-0",
    up: "rotate-180",
    right: "rotate-90",
    left: "-rotate-90",
  };

  const rotationClass = rotationMap[direction] || "rotate-0";

  return (
    <svg
      className={`inline-block transition-transform duration-300 ${rotationClass}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-label={ariaLabel ? ariaLabel : undefined}
      aria-hidden={ariaLabel ? "false" : "true"}
      role={ariaLabel ? "img" : undefined}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(["down", "up", "right", "left"]),
  size: PropTypes.number,
  ariaLabel: PropTypes.string, // Accessible label if needed
};

export default ArrowIcon;
