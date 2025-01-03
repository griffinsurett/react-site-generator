// src/themes/Pronto/Components/ItemsTemplate.js
import React from "react";
import PropTypes from "prop-types";

/**
 * ItemsTemplate Component
 *
 * Renders a list of items using a specified ItemComponent.
 * Handles empty item arrays by displaying a default or custom message/component.
 *
 * Props:
 * - items: Array of item objects to render.
 * - ItemComponent: The component used to render each item.
 * - containerClass: Additional classes for the container wrapping all items.
 * - layout: Optional layout specification (e.g., 'grid', 'flex-col').
 * - emptyComponent: Optional component or message to display when items are empty.
 * - ...rest: Any additional props to pass to the container and ItemComponent.
 */

const ItemsTemplate = ({
  items,
  ItemComponent,
  containerClass = "",
  layout = "flex flex-col",
  emptyComponent = null,
  ...rest
}) => {

  if (items.length === 0) {
    return emptyComponent ? (
      <div className={containerClass} {...rest} role="alert">
        {emptyComponent}
      </div>
    ) : (
      <div className={containerClass} {...rest} role="alert">
        <p>No items available at this time.</p>
      </div>
    );
  }

  return (
    <div className={`items-template-container ${layout} ${containerClass}`} {...rest}>
      {items.map((item, index) => (
        <ItemComponent
          key={index}
          // Spread the individual item data
          {...item}
          // Pass down the index as a prop
          itemIndex={index}
          // Spread any additional props
          {...rest}
        />
      ))}
    </div>
  );
};

ItemsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
  containerClass: PropTypes.string,
  layout: PropTypes.string,
  emptyComponent: PropTypes.node,
};

ItemsTemplate.defaultProps = {
  containerClass: "",
  layout: "flex flex-col",
  emptyComponent: null,
};

export default ItemsTemplate;
