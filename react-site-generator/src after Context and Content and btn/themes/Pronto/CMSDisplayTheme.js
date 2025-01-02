// src/themes/Pronto/CMSDisplayTheme.js
import React from "react";
import { useCMSContext } from "../../CMS/CMSContext"; // Import our context
import MenuManager from "./Components/Menu/MenuManager";
import HomeHero from "./Sections/Hero/Hero";
import GenericHero from "./Sections/Hero/Hero2";
import About from "./Sections/About/About";
import Services from "./Sections/Services";
import Contact from "./Sections/Contact";
import Testimonials from "./Sections/Testimonials";
import Projects from "./Sections/Projects";
import FAQ from "./Sections/FAQ";
import Header from "./Sections/Header/Header";
import Footer from "./Sections/Footer";
import AboutInfo from "./Sections/About/AboutInfo";
import AboutPurpose from "./Sections/About/AboutPurpose";
import Process from "./Sections/Process";
import WhyChooseUs from "./Sections/About/WhyChooseUs";
import Benefits from "./Sections/About/Benefits";

// Map section keys to components
const sectionComponents = {
  about: About,
  services: Services,
  contact: Contact,
  testimonials: Testimonials,
  projects: Projects,
  faq: FAQ,
  aboutInfo: AboutInfo,
  purpose: AboutPurpose,
  process: Process,
  whyChooseUs: WhyChooseUs,
  benefits: Benefits,
};

const CMSDisplayTheme = () => {
  // Instead of using a prop-based approach, we read from CMSContext
  const { loading, pageStructure, siteSettings, pageId } = useCMSContext();

  if (loading || !pageStructure) {
    return <p>Loading...</p>;
  }

  // Build a menu manager from siteSettings (which has queries)
  const menuManager = new MenuManager(siteSettings);

  const { title, description, sections } = pageStructure;

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuManager={menuManager} siteSettings={siteSettings} />

      {pageId === "home" ? (
        <HomeHero data={siteSettings} />
      ) : (
        <GenericHero title={title} description={description} />
      )}

      {/* Replace <div> with <main> for semantic HTML */}
      <main className="flex-grow" role="main">
        {sections
          .filter(({ key }) => key !== "hero") // Exclude hero
          .map(({ key, data }) => {
            const SectionComponent = sectionComponents[key];
            return SectionComponent ? (
              <SectionComponent key={key} data={data} />
            ) : (
              <p key={key}>Content unavailable for section: {key}</p>
            );
          })}
      </main>

      <Footer menuManager={menuManager} siteSettings={siteSettings} />
    </div>
  );
};

export default CMSDisplayTheme;
