// themes/Pronto/Components/Button.js
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Button Component
 *
 * Renders a button that can act as a standard button or a React Router Link based on props.
 * Enforces consistent styling across all buttons.
 *
 * Props:
 * - to: (Optional) The path to navigate to using React Router's Link. If provided, renders as a <Link>.
 * - onClick: (Optional) Click handler for the button.
 * - children: The content inside the button.
 * - variant: (Optional) The style variant of the button (e.g., 'primary', 'secondary'). Defaults to 'primary'.
 * - type: (Optional) The type attribute for <button> elements (e.g., 'button', 'submit').
 * - disabled: (Optional) Disables the button if true.
 * - ...rest: Any other props to pass to the element.
 */

const Button = ({
  to,
  onClick,
  children,
  type = "button",
  disabled = false,
  ...rest
}) => {
  // Define base styles
  const baseClasses =
    "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";


  // Combine base and variant classes
  const buttonClasses = `${baseClasses} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  if (to) {
    return (
      <Link to={to} className={`${buttonClasses} hover:underline`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClasses} hover:underline`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  to: PropTypes.string, // Path for React Router Link
  onClick: PropTypes.func, // Click handler for button
  children: PropTypes.node.isRequired, // Content inside the button
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]), // Button variants
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Button types
  disabled: PropTypes.bool, // Disable state
};

export default Button;