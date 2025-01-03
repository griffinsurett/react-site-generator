// src/themes/Pronto/CMSDisplayTheme.js
import React, { Suspense } from "react";
import { useCMSContext } from "../../CMS/CMSContext";
import MenuManager from "./Components/Menu/MenuManager";
import Header from "./Sections/Header/Header";
import Footer from "./Sections/Footer";
import Loader from "./Components/Loader";

// Lazy load sections
const HomeHero = React.lazy(() => import("./Sections/Hero/Hero"));
const GenericHero = React.lazy(() => import("./Sections/Hero/Hero2"));

const sectionComponents = {
  about: React.lazy(() => import("./Sections/About/About")),
  services: React.lazy(() => import("./Sections/Services")),
  contact: React.lazy(() => import("./Sections/Contact")),
  testimonials: React.lazy(() => import("./Sections/Testimonials")),
  projects: React.lazy(() => import("./Sections/Projects")),
  faq: React.lazy(() => import("./Sections/FAQ")),
  aboutInfo: React.lazy(() => import("./Sections/About/AboutInfo")),
  purpose: React.lazy(() => import("./Sections/About/AboutPurpose")),
  process: React.lazy(() => import("./Sections/Process")),
  whyChooseUs: React.lazy(() => import("./Sections/About/WhyChooseUs")),
  benefits: React.lazy(() => import("./Sections/About/Benefits")),
};

const CMSDisplayTheme = React.memo(() => {
  const { loading, pageStructure, siteSettings, pageId } = useCMSContext();

  if (loading || !pageStructure) {
    return <Loader />;
  }

  const menuManager = new MenuManager(siteSettings);
  const { title, description, sections } = pageStructure;

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuManager={menuManager} siteSettings={siteSettings} />

      <Suspense fallback={<Loader />}>
        {pageId === "home" ? (
          <HomeHero data={siteSettings} />
        ) : (
          <GenericHero title={title} description={description} />
        )}
      </Suspense>

      <main className="flex-grow" role="main">
        <Suspense fallback={<Loader />}>
          {sections
            .filter(({ key }) => key !== "hero")
            .map(({ key, data }) => {
              const SectionComponent = sectionComponents[key];
              return SectionComponent ? (
                <SectionComponent key={key} data={data} />
              ) : (
                <p key={key} role="alert">
                  Content unavailable for section: {key}
                </p>
              );
            })}
        </Suspense>
      </main>

      <Footer menuManager={menuManager} siteSettings={siteSettings} />
    </div>
  );
});

export default CMSDisplayTheme;
