// AccordionItem.js
import React from "react";
import PropTypes from "prop-types";

const AccordionItem = ({ title, description, isActive, onClick, id }) => {
  return (
    <div className="accordion-item border-b border-gray-200">
      {/* Accessible Hidden Checkbox */}
      <input
        type="checkbox"
        id={`accordion-checkbox-${id}`}
        className="accordion-checkbox sr-only"
        checked={isActive}
        onChange={onClick}
        aria-hidden="true" // Corrected to hide from assistive technologies
      />

      {/* Label Acting as Toggle Button */}
      <label
        htmlFor={`accordion-checkbox-${id}`}
        className="flex items-center justify-between w-full p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600"
        aria-controls={`accordion-content-${id}`}
        aria-expanded={isActive}
        id={`accordion-header-${id}`}
      >
        <span className="font-semibold text-lg">{title || "Untitled Question"}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </label>

      {/* Accordion Content */}
      {isActive && (
        <div
          className="mt-2 px-4 pb-4"
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
        >
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, // Unique identifier for ARIA
};

export default AccordionItem;
