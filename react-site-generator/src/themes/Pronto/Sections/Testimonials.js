// src/themes/Pronto/Sections/Testimonials/Testimonials.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate"; // <-- Import ItemsTemplate
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

const Testimonials = ({ data }) => {
  // Safely retrieve the items array
  const items = getItemData(data);

  return (
    <Section id="testimonials">
      <ContentTemplate data={data} sectionButtonText="View Testimonials">
        <ItemsTemplate
          items={items}
          // Define how to render each testimonial
          ItemComponent={({ quote, name, position }) => (
            <div>
              <blockquote className="italic text-lg" cite={`#testimonial-${name}`}>
                "{quote}"
              </blockquote>
              <cite id={`testimonial-${name}`} className="text-sm text-gray-700">
                <strong>{name}</strong>, {position}
              </cite>
            </div>
          )}
          // Tailwind or custom classes for styling the container of items
          containerClass="space-y-8"
          // Message/component to display when no items exist
          emptyComponent={<p>No testimonials available at this time.</p>}
        />
      </ContentTemplate>
    </Section>
  );
};

Testimonials.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Testimonials;
