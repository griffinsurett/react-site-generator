// src/themes/Pronto/Sections/About/About.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import PropTypes from "prop-types";

const About = ({ data }) => {

  return (
    <Section id="about">
      <ContentTemplate data={data} sectionButtonText={`Learn More ${data.title}`}>
      </ContentTemplate>
    </Section>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
