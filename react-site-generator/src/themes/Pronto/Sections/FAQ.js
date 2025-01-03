// themes/Pronto/Sections/FAQ.js
import React from "react";
import Section from "../Components/Section";
import ContentTemplate from "../ContentTemplate";
import ItemsTemplate from "../ItemsTemplate";
import PropTypes from "prop-types";
import { getItemData } from "../GetItems";

// Import our new AccordionItem
import AccordionItem from "../Components/AccordionItem";

const FAQ = ({ data }) => {
  // Keep track of which accordion index is open (null if none are open)
  const [activeIndex, setActiveIndex] = React.useState(null);

  // Grab the array of FAQ items safely
  const items = getItemData(data);

  const toggleFAQ = (index) => {
    // If the same index is clicked, close it; otherwise open the clicked one
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <Section id="faq">
      <ContentTemplate data={data} sectionButtonText="View FAQ" ifButton={false}>
        <ItemsTemplate
          items={items}
          // Now we rely on itemIndex passed from ItemsTemplate
          ItemComponent={({ title, description, itemIndex }) => (
            <AccordionItem
              title={title}
              description={description}
              isActive={activeIndex === itemIndex}
              onClick={() => toggleFAQ(itemIndex)}
            />
          )}
          containerClass="flex flex-col"
          emptyComponent={<p>No FAQs available at this time.</p>}
        />
      </ContentTemplate>
    </Section>
  );
};

FAQ.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FAQ;
