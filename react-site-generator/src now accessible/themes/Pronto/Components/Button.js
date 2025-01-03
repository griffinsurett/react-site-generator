// src/themes/Pronto/Components/Button.js
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Button Component
 *
 * Renders a button that can act as:
 * - A standard <button>
 * - A React Router <Link> for internal navigation
 * - A standard <a> for external links
 * Enforces consistent styling across all buttons.
 *
 * Props:
 * - to: (Optional) The internal path to navigate to using React Router's Link. If provided, renders as a <Link>.
 * - href: (Optional) The external URL to navigate to using an <a> tag. If provided, renders as an <a>.
 * - onClick: (Optional) Click handler for the button.
 * - children: The content inside the button.
 * - variant: (Optional) The style variant of the button (e.g., 'primary', 'secondary'). Defaults to 'primary'.
 * - type: (Optional) The type attribute for <button> elements (e.g., 'button', 'submit').
 * - disabled: (Optional) Disables the button if true.
 * - ariaLabel: (Optional) Accessible label for the button.
 * - ...rest: Any other props to pass to the element.
 */

const Button = ({
  to,
  href,
  onClick,
  children,
  type = "button",
  disabled = false,
  variant = "primary",
  ariaLabel,
  ...rest
}) => {
  // Define base styles
  const baseClasses =
    "px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600";

  // Define variant styles
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  // Combine base and variant classes
  const buttonClasses = `${baseClasses} ${
    variantClasses[variant] || variantClasses.primary
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <a
        href={href}
        className={`${buttonClasses} inline-block`}
        {...rest}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${buttonClasses} inline-block`}
        {...rest}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClasses}`}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  to: PropTypes.string, // Internal path for React Router Link
  href: PropTypes.string, // External URL for <a> tag
  onClick: PropTypes.func, // Click handler for button
  children: PropTypes.node.isRequired, // Content inside the button
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]), // Button variants
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Button types
  disabled: PropTypes.bool, // Disable state
  ariaLabel: PropTypes.string, // Accessible label for the button
};

export default Button;
