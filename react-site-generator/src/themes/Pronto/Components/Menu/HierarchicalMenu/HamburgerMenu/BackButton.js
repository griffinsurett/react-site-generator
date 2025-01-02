// BackButton.js
import React from "react";
import ArrowIcon from "../../ArrowIcon";
import PropTypes from "prop-types";

const BackButton = ({ handleBackClick }) => (
  <li className="w-full" role="none">
    <button
      className="flex items-center px-4 py-2 hover:underline focus:outline-none"
      onClick={handleBackClick}
      aria-label="Go back to previous menu"
    >
      <ArrowIcon direction="left" size={16} ariaLabel="Back arrow" />
      <span className="ml-2">Back</span>
    </button>
  </li>
);

BackButton.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default BackButton;
