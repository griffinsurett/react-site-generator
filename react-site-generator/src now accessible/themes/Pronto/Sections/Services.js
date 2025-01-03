// Services.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

const Services = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="services">
      <ContentTemplate
        data={data}
        sectionSlug={data.slug}
      >
        <ItemsTemplate
          items={items}
          ItemComponent={({ icon, title, description, hasPage, slug }) => (
            <ListItem
              icon={icon}
              title={title}
              description={description}
              hasPage={hasPage}
              slug={slug}
            />
          )}
          containerClass="flex flex-col"
          layout="flex flex-col"
        />
      </ContentTemplate>
    </Section>
  );
};

Services.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Services;