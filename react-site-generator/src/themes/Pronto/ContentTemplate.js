// src/themes/Pronto/ContentTemplate.js
import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Components/Button";

/**
 * ContentTemplate Component
 *
 * Acts as a layout template for content sections.
 * Ensures consistent heading hierarchy and accessible buttons.
 *
 * Props:
 * - data: Data object containing section information.
 * - title: Title text for the section.
 * - heading: Heading text for the section.
 * - paragraphs: Array of paragraph texts.
 * - showParagraphs: Whether to display paragraphs.
 * - sectionSlug: Link slug for the section button.
 * - hasPage: Whether the section has an associated page.
 * - sectionButtonText: Text for the section button.
 * - className: Additional CSS classes for customization.
 * - children: Child components to render within the section.
 * - ifParagraph: Whether to display paragraphs.
 * - ifButton: Whether to display the section button.
 * - ifHero: Whether the section is a hero section (uses h1).
 * - titleClass: Additional CSS classes for the title.
 * - headingClass: Additional CSS classes for the heading.
 */

const ContentTemplate = ({
  data = {}, // Data object for default values
  title = data.title,
  heading = data.heading,
  paragraphs = [data.description],
  showParagraphs = true,
  sectionSlug = data.slug,
  hasPage = data.hasPage, // Automatically fetch `hasPage` from `data`
  sectionButtonText = `View All ${data.title}`,
  className = "",
  children,
  // New Props
  ifParagraph = true,
  ifButton = true,
  ifHero = false,
  titleClass = "",
  headingClass = "",
}) => {
  const location = useLocation();
  const currentSlug = location.pathname;

  // Determine whether to display the section button
  const displaySectionButton =
    ifHero || // Check if section is a hero
    (ifButton &&
      hasPage !== false &&
      sectionSlug && // Ensure sectionSlug exists
      (ifHero || sectionSlug !== currentSlug)); // Exclude current section

  // console.log(data);

  return (
    <div className={`content-template ${className}`}>
      
      {/* Title */}
      {title && (
        <h2 className={`${titleClass}`}>
          {title}
        </h2>
      )}

      {/* Heading */}
      {heading && (
        <>
          {ifHero ? (
            <h1 className={`${headingClass}`}>
              {heading}
            </h1>
          ) : (
            <h3 className={`${headingClass}`}>
              {heading}
            </h3>
          )}
        </>
      )}

      {/* Paragraphs */}
      {ifParagraph && showParagraphs && paragraphs.length > 0 && (
        <div>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Children */}
      <div>{children}</div>

      {/* Section Button */}
      {displaySectionButton && (
        <div className="mt-4">
          <Button to={sectionSlug}>
            {sectionButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

ContentTemplate.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    heading: PropTypes.string,
    siteDescription: PropTypes.string,
    slug: PropTypes.string,
    hasPage: PropTypes.bool, // Ensure hasPage is part of the data object
  }),
  title: PropTypes.string,
  heading: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
  showParagraphs: PropTypes.bool,
  sectionSlug: PropTypes.string,
  hasPage: PropTypes.bool, // Define hasPage as an explicit prop
  sectionButtonText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,

  // New PropTypes
  ifParagraph: PropTypes.bool,
  ifButton: PropTypes.bool,
  ifHero: PropTypes.bool,
  titleClass: PropTypes.string,
  headingClass: PropTypes.string,
};

export default ContentTemplate;
