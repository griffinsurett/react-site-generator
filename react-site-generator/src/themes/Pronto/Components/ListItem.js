// ListItem.js
import React from "react";
import PropTypes from "prop-types";
import Image from "./Image"; // Import the Image component
import Icon from "./Icon"; // Import the Icon component
import Button from "./Button"; // Import the Button component

/**
 * ListItem Component
 *
 * Renders a list item with either an icon or an image, along with title, description, and an optional button.
 *
 * Props:
 * - icon: The FontAwesome icon object.
 * - image: The source URL for the image.
 * - title: The title text.
 * - description: The description text.
 * - hasPage: Boolean indicating if a page exists for the item.
 * - slug: The internal link slug for navigation.
 * - linkText: The text for the button (default: "Learn More").
 * - titleClass: Additional CSS classes for the title.
 * - descriptionClass: Additional CSS classes for the description.
 * - mediaClass: Additional CSS classes for the icon/image.
 * - buttonClass: Additional CSS classes for the button.
 */
const ListItem = ({
  icon,
  image,
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
          alt="" // Mark as decorative if the title already describes the content
          className={`w-24 h-24 ${mediaClass}`}
          decorative={true}
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
  titleClass: "text-lg font-semibold",
  descriptionClass: "text-gray-600",
  mediaClass: "",
  buttonClass: "mt-2",
};

export default ListItem;
