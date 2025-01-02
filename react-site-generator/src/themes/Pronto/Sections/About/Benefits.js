// src/themes/Pronto/Sections/About/Benefits.js
import React from "react";
import Section from "../../Components/Section";
import ContentTemplate from "../../ContentTemplate";
import ItemsTemplate from "../../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../../GetItems";

const Benefits = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="benefits" ariaLabel="Our Benefits">
      <ContentTemplate data={data} sectionButtonText="View All Benefits">
        <ItemsTemplate
          items={items}
          ItemComponent={({ icon, title, description, hasPage, slug }) => (
            <ListItem
              icon={icon}
              title={title}
              description={description}
              hasPage={hasPage}
              slug={slug}
              linkText={`See ${title || "Benefit"} details`}
              titleClass="text-xl font-semibold"
            />
          )}
          containerClass="flex flex-col"
          layout="flex flex-col"
        />
      </ContentTemplate>
    </Section>
  );
};

Benefits.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Benefits;
