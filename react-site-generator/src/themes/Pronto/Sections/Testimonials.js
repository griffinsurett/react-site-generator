// src/themes/Pronto/Sections/Testimonials.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate"; // Import ItemsTemplate
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

/**
 * Testimonials Section
 *
 * Renders a list of client testimonials with quotes and attribution.
 *
 * Props:
 * - data: Object containing testimonials data.
 */

const Testimonials = ({ data }) => {
  // Safely retrieve the items array
  const items = getItemData(data);

  return (
    <Section id="testimonials">
      <ContentTemplate data={data}>
        <ItemsTemplate
          items={items}
          // Define how to render each testimonial
          ItemComponent={({ quote, name, position }) => (
            <div className="testimonial">
              <blockquote className="italic text-lg" cite={`https://${name.replace(/\s+/g, '').toLowerCase()}.com`}>
                "{quote}"
              </blockquote>
              <p>
                <strong>{name}</strong>, {position}
              </p>
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
