// src/themes/Pronto/Sections/Contact.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import Icon from "../Components/Icon";  // If you want to display an icon
import Button from "../Components/Button"; // We'll use Button in place of <a>
import PropTypes from "prop-types";

const Contact = ({ data }) => {
  return (
    <Section id="contact" ariaLabel="Contact Information">
      <ContentTemplate data={data} sectionButtonText="Contact Us" ifButton={false}>
        <div className="flex flex-col">
          {data.contactInfo.map((info, index) => (
            <div key={index} className="flex items-center mb-2">
              <Button 
                to={info.href} 
                variant="secondary" 
                className="hover:underline flex items-center"
                ariaLabel={`Contact via ${info.value}`}
              >
                <Icon icon={info.icon} className="w-6 h-6 mr-2" ariaLabel={`${info.value} icon`} />
                {info.value}
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
        href: PropTypes.string,  // e.g., "tel:5555555555" or "/contact"
      })
    ).isRequired,
  }).isRequired,
};

export default Contact;
