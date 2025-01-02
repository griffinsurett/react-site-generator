// HamburgerMenu.js
import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import PropTypes from "prop-types";

const HamburgerMenu = ({ menuItems, isMenuOpen, toggleMenu }) => {
  const [currentMenu, setCurrentMenu] = useState(menuItems);
  const [menuHistory, setMenuHistory] = useState([]);
  const menuRef = useRef(null);

  // Reset menu state when the menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setCurrentMenu(menuItems);
      setMenuHistory([]);
    }
  }, [isMenuOpen, menuItems]);

  // Close menu when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, toggleMenu]);

  // Focus trap within the menu when open
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      firstElement.focus();

      return () => {
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [isMenuOpen]);

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
          aria-label="Hamburger menu"
          ref={menuRef}
        >
          <Menu
            currentMenu={currentMenu}
            menuHistory={menuHistory}
            handleSubmenuClick={handleSubmenuClick}
            handleBackClick={handleBackClick}
            toggleMenu={toggleMenu}
          />
        </div>
      )}
    </>
  );
};

HamburgerMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;
