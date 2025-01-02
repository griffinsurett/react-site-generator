// BackButton.js
import React from "react";
import ArrowIcon from "../../ArrowIcon";
import PropTypes from "prop-types";

const BackButton = ({ handleBackClick }) => (
  <li className="w-full">
    <button
      type="button"
      className="flex items-center px-4 py-2 text-gray-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600"
      onClick={handleBackClick}
      aria-label="Go back to previous menu"
    >
      <ArrowIcon direction="left" size={16} decorative ariaLabel="Back" />
      <span className="ml-2">Back</span>
    </button>
  </li>
);

BackButton.propTypes = {
  handleBackClick: PropTypes.func.isRequired,
};

export default BackButton;
