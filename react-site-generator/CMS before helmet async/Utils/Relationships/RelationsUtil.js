/* RelationsUtil.js */
export class RelationalUtil {
  constructor(content) {
    this.content = content;
    // 1) Build explicit relations from item props:
    this.buildRelationsFromItemProps();
    // 2) Then infer indirect relationships (if you’re still using that):
    this.inferIndirectRelationships();
  }

  /**
   * NEW METHOD: Loop over all collections -> items -> item.relations
   * and call this.relate(...) for each declared relationship.
   * 
   * We now expect an object like:
   *   { collection: "projects", value: "/kitchen-remodel" }
   * or { collection: "faq", value: 2 }
   */
  buildRelationsFromItemProps() {
    const collections = this.content.collections || [];
    collections.forEach((sourceCollection) => {
      const items = sourceCollection.items?.data || sourceCollection.items;
      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        // If the item has a "relations" array, process each relation
        if (Array.isArray(item.relations)) {
          item.relations.forEach(({ collection: targetCollection, value: targetIdentifier }) => {
            // "relate" requires (fromCollection, fromIdentifier, toCollection, toIdentifier)
            this.relate(
              sourceCollection.collection,  // e.g. "services"
              item.slug,                    // e.g. "/construction"
              targetCollection,            // e.g. "projects"
              targetIdentifier             // e.g. "/kitchen-remodel" or 2
            );
          });
        }
      });
    });
  }

  /**
   * Main entry point to relate two entities by ID, index, or slug.
   */
  relate(fromCollection, fromIdentifier, toCollection, toIdentifier) {
    const fromEntity = this.findEntityByIdentifier(fromCollection, fromIdentifier);
    const toEntity   = this.findEntityByIdentifier(toCollection,   toIdentifier);

    if (!fromEntity || !toEntity) {
      console.error(
        `Failed to create relationship: Invalid entities. 
        fromCollection=${fromCollection} identifier=${fromIdentifier} 
        toCollection=${toCollection} identifier=${toIdentifier}`
      );
      return;
    }

    const fromRelationKey = `relatedTo${this.capitalize(toCollection)}`;
    const toRelationKey   = `relatedTo${this.capitalize(fromCollection)}`;

    // Add the slug to fromEntity’s relatedToX array
    fromEntity[fromRelationKey] = fromEntity[fromRelationKey] || [];
    if (!fromEntity[fromRelationKey].includes(toEntity.slug)) {
      fromEntity[fromRelationKey].push(toEntity.slug);
    }

    // Add the slug to toEntity’s relatedToX array
    toEntity[toRelationKey] = toEntity[toRelationKey] || [];
    if (!toEntity[toRelationKey].includes(fromEntity.slug)) {
      toEntity[toRelationKey].push(fromEntity.slug);
    }
  }

  /**
   * Flexible find: handles numeric ID, numeric index, or string-based slug.
   */
  findEntityByIdentifier(collectionName, identifier) {
    const collection = this.content.collections.find(
      (col) => col.collection === collectionName
    );
    if (!collection) {
      console.error(`Collection '${collectionName}' not found.`);
      return null;
    }

    const items = collection.items?.data || collection.items || [];
    if (!Array.isArray(items)) {
      console.error(`Collection '${collectionName}' has no 'items.data' array.`);
      return null;
    }

    // 1) If number => try item.id or index
    if (typeof identifier === "number") {
      let found = items.find((item) => item.id === identifier);
      if (found) return found;

      if (identifier >= 0 && identifier < items.length) {
        found = items[identifier];
        if (found) return found;
      }
      console.error(`No item in '${collectionName}' for numeric identifier = ${identifier}`);
      return null;
    }

    // 2) If string => match by slug
    if (typeof identifier === "string") {
      const cleanedSlug = identifier.replace(/^\//, ""); // remove leading slash
      const found = items.find(
        (item) =>
          item.slug === identifier ||
          item.slug === `/${cleanedSlug}` ||
          item.slug.endsWith(`/${cleanedSlug}`)
      );
      if (!found) {
        console.error(
          `No item found in '${collectionName}' for slug/partial slug = '${identifier}'`
        );
      }
      return found || null;
    }

    // 3) Otherwise
    console.error(`Identifier of type '${typeof identifier}' not supported.`);
    return null;
  }

  /**
   * Overhaul your old "findEntityBySlug" calls to use findEntityByIdentifier.
   */
  findEntityBySlug(collectionName, maybeSlug) {
    return this.findEntityByIdentifier(collectionName, maybeSlug);
  }

  /**
   * This attempts to discover "indirect" relationships, etc.
   * You can keep or remove it, but typically it helps unify
   * relations from "relatedToX" keys across items.
   */
  inferIndirectRelationships() {
    const collections = this.content.collections;

    collections.forEach((sourceCollection) => {
      const items = sourceCollection.items?.data || sourceCollection.items;
      if (!Array.isArray(items)) return;

      items.forEach((entity) => {
        Object.keys(entity).forEach((relationKey) => {
          if (relationKey.startsWith("relatedTo")) {
            const targetCollectionName = relationKey
              .replace("relatedTo", "")
              .toLowerCase();

            const relatedSlugs = entity[relationKey] || [];

            relatedSlugs.forEach((identifier) => {
              // Use findEntityByIdentifier
              const relatedEntity = this.findEntityByIdentifier(
                targetCollectionName,
                identifier
              );
              if (relatedEntity) {
                // That relatedEntity might have "relatedToXYZ" keys
                Object.keys(relatedEntity).forEach((relatedRelationKey) => {
                  if (relatedRelationKey.startsWith("relatedTo")) {
                    const indirectTarget = relatedRelationKey
                      .replace("relatedTo", "")
                      .toLowerCase();

                    const indirectSlugs = relatedEntity[relatedRelationKey] || [];
                    const indirectRelationKey = `relatedTo${this.capitalize(indirectTarget)}`;

                    entity[indirectRelationKey] = entity[indirectRelationKey] || [];
                    // Add any missing slugs
                    indirectSlugs.forEach((indirectSlug) => {
                      if (!entity[indirectRelationKey].includes(indirectSlug)) {
                        entity[indirectRelationKey].push(indirectSlug);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
  }

  /**
   * Simple helper for capitalizing, e.g., "projects" -> "Projects".
   */
  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default RelationalUtil;
