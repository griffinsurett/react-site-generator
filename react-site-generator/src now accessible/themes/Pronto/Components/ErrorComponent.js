// src/themes/Pronto/Components/Error/ErrorComponent.js
import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ message }) => (
  <div className="flex flex-col justify-center items-center h-screen" role="alert" aria-live="assertive">
    <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
    <p className="text-lg text-gray-700">{message}</p>
  </div>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;
