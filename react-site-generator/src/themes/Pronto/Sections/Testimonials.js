// src/themes/Pronto/Sections/Testimonials/Testimonials.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

const Testimonials = ({ data }) => {
  // Safely retrieve the items array
  const items = getItemData(data);

  return (
    <Section id="testimonials">
      <ContentTemplate data={data} sectionButtonText="View Testimonials">
        <div className="space-y-8">
          {items.map((testimonial, index) => (
            <div key={index}>
              <blockquote className="italic text-lg">
                "{testimonial.quote}"
              </blockquote>
              <p>
                <strong>{testimonial.name}</strong>, {testimonial.position}
              </p>
            </div>
          ))}
        </div>
      </ContentTemplate>
    </Section>
  );
};

Testimonials.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Testimonials;
