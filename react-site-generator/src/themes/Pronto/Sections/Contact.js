// src/themes/Pronto/Sections/Contact.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import Icon from "../Components/Icon";  // If you want to display an icon
import Button from "../Components/Button"; // We'll use Button in place of <a>
import PropTypes from "prop-types";

const Contact = ({ data }) => {
  return (
    <Section id="contact">
      <ContentTemplate data={data} sectionButtonText="Contact Us" ifButton={false}>
        <address className="flex flex-col space-y-4 not-italic">
          {data.contactInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-3">
              {info.icon && (
                <Icon
                  icon={info.icon}
                  className="w-6 h-6 text-gray-700"
                  ariaLabel={`${info.type} icon`}
                  decorative={false}
                />
              )}
              <Button 
                to={info.href} 
                variant="secondary" 
                className="hover:underline"
                ariaLabel={`Contact via ${info.type}`}
              >
                {info.value}
              </Button>
            </div>
          ))}
        </address>
      </ContentTemplate>
    </Section>
  );
};

Contact.propTypes = {
  data: PropTypes.shape({
    contactInfo: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.object,
        value: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,  // e.g., "tel:5555555555" or "/contact"
        type: PropTypes.string, // e.g., "Phone", "Email"
      })
    ).isRequired,
  }).isRequired,
};

export default Contact;
