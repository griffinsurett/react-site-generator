// ListItem.js
import React from "react";
import PropTypes from "prop-types";
import Image from "./Image"; // Import the Image component
import Icon from "./Icon"; // Import the Icon component
import Button from "./Button"; // Import the Button component

const ListItem = ({
  icon,
  image,
  imageAltText, // New prop for dynamic alt text
  isDecorative, // New prop to mark image as decorative
  title,
  description,
  hasPage,
  slug,
  linkText = "Learn More",
  titleClass = "text-lg font-semibold",
  descriptionClass = "text-gray-600",
  mediaClass,
  buttonClass = "mt-2",
}) => {
  return (
    <article className="flex flex-col items-start mb-6" aria-labelledby={`listitem-title-${slug || title}`}>
      {/* Icon or Image */}
      {image ? (
        <Image
          src={image}
          alt={!isDecorative ? imageAltText : ""}
          className={`w-24 h-24 ${mediaClass}`}
          decorative={isDecorative}
        />
      ) : (
        icon && (
          <Icon
            icon={icon}
            className={`text-2xl ${mediaClass}`}
            ariaLabel={`${title} icon`}
          />
        )
      )}

      {/* Title */}
      {title && (
        <h3 id={`listitem-title-${slug || title}`} className={`font-semibold ${titleClass}`}>
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className={`${descriptionClass}`}>{description}</p>
      )}

      {/* Button */}
      {hasPage && slug && (
        <Button
          to={slug}
          className={`${buttonClass} hover:underline`}
          ariaLabel={`Learn more about ${title}`}
        >
          {`See ${title || "Item"} details`}
        </Button>
      )}
    </article>
  );
};

ListItem.propTypes = {
  icon: PropTypes.object, // FontAwesome icon object
  image: PropTypes.string, // Image URL
  imageAltText: PropTypes.string, // Dynamic alt text for image
  isDecorative: PropTypes.bool, // If the image is decorative
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hasPage: PropTypes.bool, // Indicates if the item has an associated page
  slug: PropTypes.string, // Internal link slug
  linkText: PropTypes.string,
  titleClass: PropTypes.string,
  descriptionClass: PropTypes.string,
  mediaClass: PropTypes.string, // Class for icon/image
  buttonClass: PropTypes.string,
};

ListItem.defaultProps = {
  hasPage: false,
  slug: "",
  linkText: "Learn More",
  imageAltText: "", // Default empty alt text
  isDecorative: true, // Default to decorative
  titleClass: "text-lg font-semibold",
  descriptionClass: "text-gray-600",
  mediaClass: "",
  buttonClass: "mt-2",
};

export default ListItem;
