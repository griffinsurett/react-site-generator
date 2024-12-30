// src/themes/Pronto/Sections/About/AboutPurpose.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import ItemsTemplate from "../../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../../GetItems";

const AboutPurpose = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="about-purpose">
      <ContentTemplate data={data}>
        <ItemsTemplate
          items={items}
          ItemComponent={({ icon, image, title, description, hasPage, slug }) => (
            <ListItem
              icon={icon}
              title={title}
              description={description}
              hasPage={hasPage}
              slug={slug}
              linkText={`See ${title || "Purpose"} details`}
              titleClass="text-xl"
            />
          )}
          containerClass="flex flex-col space-y-6"
          layout="flex flex-col"
        />
      </ContentTemplate>
    </Section>
  );
};

AboutPurpose.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPurpose;
