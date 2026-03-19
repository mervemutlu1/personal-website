export type Category = {
  slug: "product-design" | "self-improvement" | "experiments" | "travel";
  label: string;
};

export const CATEGORIES: Category[] = [
  { slug: "product-design", label: "Product Design" },
  { slug: "self-improvement", label: "Self Improvement" },
  { slug: "experiments", label: "Experiments" },
  { slug: "travel", label: "Travel" },
];

export function categoryHref(slug: Category["slug"]) {
  return `/${slug}`;
}

