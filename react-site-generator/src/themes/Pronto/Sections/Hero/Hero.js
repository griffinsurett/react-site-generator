// src/themes/Pronto/Sections/Hero/HomeHero.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const HomeHero = ({ data }) => {
  return (
    <Section id="home-hero" className="h-screen flex items-center justify-center">
      <ContentTemplate
        title={data.siteTitle}
        heading={data.siteTagline}
        ifHero={true}
        sectionSlug={data.CTALink}
        sectionButtonText={data.CTAButton}
        paragraphs={[data.siteDescription]}
        titleClass="text-4xl font-bold text-center mb-4"
        headingClass="text-2xl text-center mb-6"
      >
        {/* No additional children needed as the button is handled by ContentTemplate */}
      </ContentTemplate>
    </Section>
  );
};

HomeHero.propTypes = {
  data: PropTypes.shape({
    siteTitle: PropTypes.string.isRequired,
    siteTagline: PropTypes.string.isRequired,
    siteDescription: PropTypes.string.isRequired,
    CTALink: PropTypes.string.isRequired, // Ensure CTALink is provided
    CTAButton: PropTypes.string, // Optional, handled by ContentTemplate
  }).isRequired,
};

export default HomeHero;
