// src/themes/Pronto/Sections/CTASection.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import ItemsTemplate from "../../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../../GetItems";

/**
 * CTASection Component
 *
 * Renders the Call-to-Action section with actionable items.
 *
 * Props:
 * - data: Object containing CTA items data.
 */

const CTASection = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="cta">
      <ContentTemplate data={data} sectionButtonText="Get Started">
        <ItemsTemplate
          items={items}
          ItemComponent={({ icon, image, title, description, hasPage, link }) => (
            <ListItem
              icon={icon}
              image={image}
              title={title}
              description={description || ""}
              hasPage={hasPage}
              slug={link || ""} // Use link if provided, else slug
              linkText={title ? `Learn More about ${title}` : "Learn More"}
              titleClass="text-xl font-semibold"
              ariaLabel={`Learn more about ${title}`}
            />
          )}
          containerClass="flex flex-col"
          layout="flex flex-col"
          emptyComponent={<p className="text-center">No call-to-action items available.</p>}
        />
      </ContentTemplate>
    </Section>
  );
};

CTASection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CTASection;
