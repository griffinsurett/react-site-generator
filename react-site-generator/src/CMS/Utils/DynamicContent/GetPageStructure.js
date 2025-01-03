// Utils/DynamicContent/GetPageStructure.js
import Content from "../../Content";
import { getCollection } from "../GetContent/GetCollection";
import RelationalUtil from "../Relationships/RelationsUtil";
import HierarchyUtil from "../Relationships/HierarchyUtil";

const relationalUtil = new RelationalUtil(Content);
const hierarchyUtil = new HierarchyUtil(Content);

/**
 * Constructs the page structure based on the pageId.
 * @param {string} pageId
 * @returns {object|null}
 */
export const getPageStructure = (pageId) => {
  const page = Content.pages.find((p) => p.id === pageId);

  if (!page) {
    console.error(`[getPageStructure] Page '${pageId}' not found in CMS.`);
    return null;
  }

  const isCollectionPage = page.isCollection;
  const collection = isCollectionPage ? getCollection(pageId) : null;

  const isItemPage =
    collection &&
    collection.items &&
    Array.isArray(collection.items.data) &&
    collection.items.data.some((item) => item.slug === pageId);

  const item = isItemPage
    ? collection.items.data.find((i) => i.slug === pageId)
    : null;

  const featuredImage =
    item?.featuredImage || collection?.featuredImage || page.featuredImage;

  // **Title and Description Assignments**
  const title =
    item?.title ||
    item?.name ||
    collection?.title ||
    page.title ||
    "Untitled Page";

  const description =
    item?.description ||
    collection?.description ||
    page.description ||
    "";

  const content = page.content || item?.content || "";

  let sections = [];

  const objectSectionsMap = {};
  Content.collections.forEach((col) => {
    for (const key in col) {
      if (col[key]?.makeObjectSection) {
        objectSectionsMap[key] = col[key];
      }
    }
  });

  const aggregateCrossRelations = (items) => {
    const aggregatedRelations = {};
    items?.forEach((itm) => {
      Object.keys(itm).forEach((relationKey) => {
        if (relationKey.startsWith("relatedTo")) {
          const relatedCollectionName = relationKey
            .replace("relatedTo", "")
            .toLowerCase();
          const relatedSlugs = itm[relationKey] || [];
          const relatedItems = relatedSlugs
            .map((slug) =>
              relationalUtil.findEntityBySlug(relatedCollectionName, slug)
            )
            .filter(Boolean);

          aggregatedRelations[relatedCollectionName] =
            aggregatedRelations[relatedCollectionName] || [];
          aggregatedRelations[relatedCollectionName].push(...relatedItems);
        }
      });
    });

    // Remove duplicates
    Object.keys(aggregatedRelations).forEach((key) => {
      aggregatedRelations[key] = [
        ...new Map(
          aggregatedRelations[key].map((i) => [i.slug, i])
        ).values(),
      ];
    });

    return aggregatedRelations;
  };

  if (isCollectionPage && !isItemPage && collection) {
    // COLLECTION-LEVEL PAGE
    if (
      collection.items?.isHeirarchical &&
      collection.onlyParentsOnCollection
    ) {
      const parents = hierarchyUtil.getParents(collection.collection);
      const crossRels = aggregateCrossRelations(collection.items.data);

      sections = page.sections.map((sectionKey) => {
        let sectionData;

        if (sectionKey === collection.collection) {
          sectionData = { ...collection, items: parents };
        } else if (sectionKey in collection) {
          sectionData = collection[sectionKey];
        } else if (objectSectionsMap[sectionKey]) {
          sectionData = objectSectionsMap[sectionKey];
        } else {
          sectionData = {
            ...(getCollection(sectionKey) || {}),
            items: crossRels[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    } else {
      // NON-HIERARCHICAL
      const crossRels = aggregateCrossRelations(collection.items?.data);
      sections = page.sections.map((sectionKey) => {
        let sectionData;

        if (sectionKey === collection.collection) {
          sectionData = collection;
        } else if (sectionKey in collection) {
          sectionData = collection[sectionKey];
        } else if (objectSectionsMap[sectionKey]) {
          sectionData = objectSectionsMap[sectionKey];
        } else {
          sectionData = {
            ...(getCollection(sectionKey) || {}),
            items: crossRels[sectionKey] || [],
          };
        }

        return { key: sectionKey, data: sectionData };
      });
    }
  } else if (isItemPage && collection && item) {
    // ITEM-LEVEL PAGE
    const crossRels = aggregateCrossRelations([item]);

    sections = page.sections.map((sectionKey) => {
      let sectionData;

      if (
        sectionKey === collection.collection &&
        collection.items?.isHeirarchical
      ) {
        if (hierarchyUtil.isParent(item)) {
          const children = hierarchyUtil.getChildren(
            collection.collection,
            item.slug
          );
          sectionData = {
            title: collection.title,
            heading: collection.heading, // Retain heading if exists
            items: children,
            slug: collection.slug,
            hasPage: collection.hasPage,
          };
        } else {
          const parentSlug = item.parentItem;
          if (parentSlug) {
            const siblings = hierarchyUtil.getSiblings(
              collection.collection,
              parentSlug,
              item.slug
            );
            sectionData = {
              title: collection.title || collection.heading,
              heading: collection.heading, // Retain heading if exists
              items: siblings,
              slug: collection.slug,
              hasPage: collection.hasPage,
            };
          } else {
            sectionData = { title: "No Related Items", heading: "", items: [] };
          }
        }
      } else if (
        sectionKey === collection.collection &&
        !collection.items?.isHeirarchical
      ) {
        // NON-HIERARCHICAL ITEM PAGE LOGIC
        const currentRelations = Object.keys(item)
          .filter((key) => key.startsWith("relatedTo"))
          .reduce((acc, relationKey) => {
            acc[relationKey] = item[relationKey] || [];
            return acc;
          }, {});

        const candidates = collection.items.data.filter(
          (i) => i.slug !== item.slug
        );
        const scoredCandidates = candidates.map((candidate) => {
          let score = 0;
          Object.keys(currentRelations).forEach((relationKey) => {
            const candidateRelations = candidate[relationKey] || [];
            const overlapCount = candidateRelations.filter((slug) =>
              currentRelations[relationKey].includes(slug)
            ).length;
            score += overlapCount;
          });
          return { ...candidate, score };
        });

        const relatedItems = scoredCandidates
          .filter((c) => c.score > 0)
          .sort((a, b) => b.score - a.score);

        if (relatedItems.length > 0) {
          sectionData = {
            title: collection.title || collection.heading,
            heading: collection.heading || "", // Retain heading if exists
            items: relatedItems,
            slug: collection.slug,
            hasPage: collection.hasPage,
          };
        } else {
          sectionData = { title: "No Related Items", heading: "", items: [] };
        }
      } else if (sectionKey in collection) {
        sectionData = {
          ...collection[sectionKey],
          title: collection[sectionKey].title || "",
          heading: collection[sectionKey].heading || "",
        };
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = {
          ...objectSectionsMap[sectionKey],
          title: objectSectionsMap[sectionKey].title || "",
          heading: objectSectionsMap[sectionKey].heading || "",
        };
      } else if (crossRels[sectionKey]) {
        // If the sectionKey matches a related collection
        const relatedCollection = getCollection(sectionKey);
        sectionData = {
          title: relatedCollection?.title || sectionKey,
          heading: relatedCollection?.heading || "",
          items: crossRels[sectionKey],
          slug: relatedCollection?.slug || "",
          hasPage: relatedCollection?.hasPage || false,
        };
      } else {
        sectionData = getCollection(sectionKey, pageId) || null;
      }

      // Ensure sectionData has both title and heading
      if (sectionData) {
        sectionData.title = sectionData.title || "";
        sectionData.heading = sectionData.heading || "";
      }

      return { key: sectionKey, data: sectionData };
    });
  } else {
    // STATIC OR HOMEPAGE
    sections = page.sections.map((sectionKey) => {
      let sectionData;
      const targetCollection = getCollection(sectionKey);

      if (
        targetCollection?.items?.isHeirarchical &&
        targetCollection.onlyParentsOnCollection
      ) {
        const parents = hierarchyUtil.getParents(targetCollection.collection);
        sectionData = {
          ...targetCollection,
          items: parents,
          title: targetCollection.title || "",
          heading: targetCollection.heading || "",
        };
      } else if (objectSectionsMap[sectionKey]) {
        sectionData = {
          ...objectSectionsMap[sectionKey],
          title: objectSectionsMap[sectionKey].title || "",
          heading: objectSectionsMap[sectionKey].heading || "",
        };
      } else {
        sectionData = {
          ...(targetCollection || {}),
          title: targetCollection?.title || "",
          heading: targetCollection?.heading || "",
        };
      }

      return { key: sectionKey, data: sectionData };
    });
  }

  const pageStructure = { title, description, content, sections, featuredImage };

  return pageStructure;
};
