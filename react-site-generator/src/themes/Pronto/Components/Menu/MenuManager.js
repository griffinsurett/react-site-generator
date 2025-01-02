// Theme/Components/Menus/MenuManager.js
export default class MenuManager {
  constructor(siteSettings) {
    this.siteSettings = siteSettings;
    this.menus = this.initializeMenus();
  }

  /**
   * Initializes menus from CMS queries.
   * @returns {Object} A map of menu names to their respective menu items.
   */
  initializeMenus() {
    const { queries } = this.siteSettings;
    if (!queries || !Array.isArray(queries)) {
      console.error("MenuManager: Invalid queries data");
      return {};
    }

    // Process queries into a key-value menu map
    return queries.reduce((menus, query) => {
      menus[query.name] = this.processMenuItems(query.items);
      return menus;
    }, {});
  }

  /**
   * Recursively processes menu items to handle hierarchical structures.
   * @param {Array} items - The menu items to process.
   * @returns {Array} The processed menu items.
   */
  processMenuItems(items) {
    return items.map((item) => ({
      ...item,
      items: item.items ? this.processMenuItems(item.items) : [],
    }));
  }

  /**
   * Retrieves a menu by its name.
   * @param {string} menuName - The name of the menu to retrieve.
   * @returns {Array} The menu items.
   */
  getMenu(menuName) {
    return this.menus[menuName] || [];
  }

  /**
   * Retrieves a hierarchical menu, marking items that have submenus.
   * @param {string} menuName - The name of the menu to retrieve.
   * @returns {Array} The hierarchical menu items.
   */
  getHierarchicalMenu(menuName) {
    const menu = this.getMenu(menuName);
    return menu.map((item) => ({
      ...item,
      isParent: item.items && item.items.length > 0,
    }));
  }

  /**
   * Retrieves a flat menu, excluding items that have submenus.
   * @param {string} menuName - The name of the menu to retrieve.
   * @returns {Array} The flat menu items.
   */
  getFlatMenu(menuName) {
    const menu = this.getMenu(menuName);
    return menu.filter((item) => !item.items || item.items.length === 0);
  }
}
