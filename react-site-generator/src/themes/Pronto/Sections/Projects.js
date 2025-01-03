// src/themes/Pronto/Sections/Projects.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate"; // Import ItemsTemplate
import ListItem from "../Components/ListItem"; // Import ListItem
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

/**
 * Projects Section
 *
 * Renders a list of projects with links to project details or external URLs.
 *
 * Props:
 * - data: Object containing project data.
 */

const Projects = ({ data }) => {
  const items = getItemData(data);

  return (
    <Section id="projects">
      <ContentTemplate data={data}>
        <ItemsTemplate
          items={items}
          ItemComponent={({ icon, featuredImage, title, description, hasPage, slug, link }) => (
            <ListItem
              icon={icon}
              image={featuredImage}
              title={title}
              description={description}
              hasPage={hasPage}
              slug={link || slug} // Use link if provided, else slug
              linkText={`View ${title || "Project"}`}
              titleClass="text-xl font-semibold"
            />
          )}
          containerClass="flex flex-wrap justify-center items-stretch gap-6"
          layout="flex flex-wrap justify-center items-stretch gap-6"
          emptyComponent={<p className="text-center">No projects available at this time.</p>}
        />
      </ContentTemplate>
    </Section>
  );
};

Projects.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.object, // FontAwesome icon object if applicable
        image: PropTypes.string, // Image URL
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        hasPage: PropTypes.bool, // Indicates if there's an internal page
        slug: PropTypes.string, // Internal link slug
        link: PropTypes.string, // External link if no slug
      })
    ),
  }).isRequired,
};

export default Projects;
