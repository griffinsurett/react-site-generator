// HierarchicalMenu.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HamburgerIcon from "./HamburgerMenu/HamburgerIcon";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";
import Menu from "./BarMenu/Menu";
import PropTypes from "prop-types";

const HierarchicalMenu = ({
  menuItems,
  isResponsive = true,
  hamburgerOnly = false,
  breakpoint = 768,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= breakpoint;
      setIsHamburgerVisible(hamburgerOnly || (isResponsive && isMobile));
      if (!isMobile) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint, hamburgerOnly, isResponsive]);

  useEffect(() => {
    if (isResponsive && window.innerWidth <= breakpoint) {
      setIsMenuOpen(false);
    }
  }, [location.pathname, isResponsive, breakpoint]);

  return (
    <>
      {isHamburgerVisible && <HamburgerIcon isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
      {!isHamburgerVisible && (
        <nav className="flex space-x-6" aria-label="Navigation Menu">
          <Menu menuItems={menuItems} />
        </nav>
      )}
      {isHamburgerVisible && (
        <HamburgerMenu menuItems={menuItems} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      )}
    </>
  );
};

HierarchicalMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  isResponsive: PropTypes.bool,
  hamburgerOnly: PropTypes.bool,
  breakpoint: PropTypes.number,
};

HierarchicalMenu.defaultProps = {
  isResponsive: true,
  hamburgerOnly: false,
  breakpoint: 768,
};

export default HierarchicalMenu;
