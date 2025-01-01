// ContentTemplate.js
import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "./Components/Button";

const ContentTemplate = ({
  data = {}, // Data object for default values
  title = data.title,
  heading = data.heading,
  paragraphs = [data.description],
  showParagraphs = true,
  sectionSlug = data.slug,
  hasPage = data.hasPage, // Automatically fetch `hasPage` from `data`
  sectionButtonText = "Learn More",
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
    ifButton && // Check if button should be displayed
    hasPage && // Section must have a page
    sectionSlug && // Section slug must exist
    (ifHero || sectionSlug !== currentSlug); // Allow button for hero sections or when slug differs

  console.log("Display Section Button:", displaySectionButton); // Debugging

  return (
    <div className={`content-template ${className}`}>
      
      {/* Title */}
      {title && (
        <h5 className={`${titleClass}`}>
          {title}
        </h5>
      )}

      {/* Heading */}
      {heading && (
        <>
          {ifHero ? (
            <h1 className={`${headingClass}`}>
              {heading}
            </h1>
          ) : (
            <h2 className={`${headingClass}`}>
              {heading}
            </h2>
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
