// src/themes/Pronto/Sections/Contact.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import Icon from "../Components/Icon";  // If you want to display an icon
import Button from "../Components/Button"; // We'll use Button in place of <a>
import PropTypes from "prop-types";

/**
 * Contact Section
 *
 * Renders contact information with accessible links and icons.
 *
 * Props:
 * - data: Object containing contact information data.
 */

const Contact = ({ data }) => {
  return (
    <Section id="contact">
      <ContentTemplate data={data} sectionButtonText="Contact Us" ifButton={false}>
        <div className="flex flex-col space-y-4">
          {data.contactInfo.map((info, index) => (
            <div key={index} className="flex items-center">
              <Button 
                href={info.href} 
                variant="secondary" 
                className="flex items-center space-x-2 hover:underline"
                ariaLabel={`Contact via ${info.value}`}
              >
                {info.icon && <Icon icon={info.icon} className="w-6 h-6" ariaLabel="" />}
                <span>{info.value}</span>
              </Button>
            </div>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

Contact.propTypes = {
  data: PropTypes.shape({
    contactInfo: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.object,
        value: PropTypes.string,
        href: PropTypes.string,  // e.g., "tel:5555555555" or "mailto:email@example.com"
      })
    ).isRequired,
  }).isRequired,
};

export default Contact;
