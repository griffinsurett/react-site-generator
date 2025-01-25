// src/components/Loader/Loader.js
import React from "react";
import PropTypes from "prop-types";

/**
 * Loader Component
 *
 * Displays a full-screen loader with an optional message.
 *
 * Props:
 * - message: Optional loading message to display.
 * - className: Additional CSS classes for customization.
 */
const Loader = ({ message = "Loading...", className = "" }) => (
  <div
    className={`flex flex-col justify-center items-center fixed inset-0 bg-white z-50 ${className}`}
    role="status"
    aria-live="polite"
    aria-label={message}
  >
    {/* Spinner */}
    <svg
      className="animate-spin h-12 w-12 text-blue-600 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
    {/* Message */}
    <span className="text-lg">{message}</span>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Loader;
