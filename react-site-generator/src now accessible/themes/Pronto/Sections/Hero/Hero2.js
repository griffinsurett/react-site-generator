// src/themes/Pronto/Sections/Hero/GenericHero.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const GenericHero = ({ title, description, buttonText, buttonLink }) => {
  return (
    <Section className="h-60 flex flex-col justify-center items-center text-center">
      <ContentTemplate
        title={title}
        sectionButtonText={buttonText || "Learn More"}
        paragraphs={[description]}
        titleClass="text-3xl font-bold"
        headingClass="text-xl"    
        ifButton={false}    
      >
      </ContentTemplate>
    </Section>
  );
};

GenericHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
};

export default GenericHero;
