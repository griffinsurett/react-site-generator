// src/themes/Pronto/Components/Button.js
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = React.memo(
  ({
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
    const baseClasses = "px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600";
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

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
  }
);

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Button;
