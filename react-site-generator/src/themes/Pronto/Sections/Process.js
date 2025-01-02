// src/themes/Pronto/Sections/Process.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

const ProcessSection = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="process">
      <ContentTemplate data={data} sectionButtonText="Learn About Our Process">
        <ol className="flex flex-col space-y-6 list-decimal list-inside">
          <ItemsTemplate
            items={items}
            ItemComponent={({ icon, featuredImage, title, description, hasPage, slug }) => (
              <ListItem
                icon={icon}
                image={featuredImage}
                title={title}
                description={description}
                hasPage={hasPage}
                slug={slug}
                linkText={`See ${title || "Step"} details`}
                mediaClass="text-yellow-500"
                buttonClass="mt-2"
              />
            )}
            containerClass="flex flex-col space-y-6"
            layout="flex flex-col"
            emptyComponent={<p className="text-center">No process steps available.</p>}
          />
        </ol>
      </ContentTemplate>
    </Section>
  );
};

ProcessSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProcessSection;
