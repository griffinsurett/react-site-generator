// HamburgerMenu.js
import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import PropTypes from "prop-types";

const HamburgerMenu = ({ menuItems, isMenuOpen, toggleMenu }) => {
  const [currentMenu, setCurrentMenu] = useState(menuItems);
  const [menuHistory, setMenuHistory] = useState([]);
  const menuRef = useRef(null);
  const firstFocusableElement = useRef(null);
  const lastFocusableElement = useRef(null);

  // Reset menu state when the menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setCurrentMenu(menuItems);
      setMenuHistory([]);
    }
  }, [isMenuOpen, menuItems]);

  // Focus management: trap focus within the menu when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleMenu();
      }
      if (e.key === "Tab") {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // After opening, focus on the first focusable element
      setTimeout(() => {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }, 100);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, toggleMenu]);

  const handleSubmenuClick = (submenu) => {
    setMenuHistory((prevHistory) => [...prevHistory, currentMenu]);
    setCurrentMenu(submenu);
  };

  const handleBackClick = () => {
    const previousMenu = menuHistory.pop();
    setCurrentMenu(previousMenu);
    setMenuHistory([...menuHistory]);
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hamburger-menu-title"
          ref={menuRef}
        >
          <div className="p-4">
            <h2 id="hamburger-menu-title" className="text-xl font-semibold mb-4">
              Menu
            </h2>
            <Menu
              currentMenu={currentMenu}
              menuHistory={menuHistory}
              handleSubmenuClick={handleSubmenuClick}
              handleBackClick={handleBackClick}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

HamburgerMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;
