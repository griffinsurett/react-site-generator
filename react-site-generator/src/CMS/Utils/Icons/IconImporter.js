// src/CMS/Utils/Icons/IconImporter.js
// Icon library mapping with dynamic imports
const iconLibraries = {
  fa: () => import("@fortawesome/free-solid-svg-icons"),
  fab: () => import("@fortawesome/free-brands-svg-icons"),
  // Add other libraries here
};

/**
 * Dynamically imports an icon from the specified library.
 * @param {string} libraryKey - The library key (e.g., "fa", "fab").
 * @param {string} iconName - The name of the icon (e.g., "Truck", "Facebook").
 * @returns {object|null} - The icon object if found, or null if not.
 */
export const getIcon = async (libraryKey, iconName) => {
  const importLibrary = iconLibraries[libraryKey];
  if (!importLibrary) {
    console.error(`Icon library "${libraryKey}" not found.`);
    return null;
  }

  try {
    const library = await importLibrary();
    const icon = library[`fa${iconName}`] || library[`fab${iconName}`];
    if (!icon) {
      console.error(`Icon "${iconName}" not found in library "${libraryKey}".`);
      return null;
    }
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}" from library "${libraryKey}":`, error);
    return null;
  }
};
