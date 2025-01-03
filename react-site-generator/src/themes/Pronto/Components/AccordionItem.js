// themes/Pronto/Components/AccordionItem.js
import React from "react";
import PropTypes from "prop-types";

const AccordionItem = ({ title, description, isActive, onClick }) => {
  return (
    <div className="accordion-item">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-semibold">{title || "Untitled Question"}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isActive && (
        <div className="mt-2">
          <p>{description}</p>
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
};

export default AccordionItem;
