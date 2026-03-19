import type { Category } from "@/lib/categories";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category["slug"];
  date: string;
};

export const POSTS: Post[] = [
  {
    slug: "designing-for-clarity",
    title: "Designing for clarity",
    excerpt:
      "A few heuristics I use when the interface looks “fine” but still feels hard to use.",
    category: "product-design",
    date: "Mar 2026",
  },
  {
    slug: "a-small-system-that-works",
    title: "A small system that works",
    excerpt:
      "Less discipline, more defaults: a lightweight routine for staying consistent.",
    category: "self-improvement",
    date: "Mar 2026",
  },
  {
    slug: "tiny-weekend-experiment",
    title: "A tiny weekend experiment",
    excerpt:
      "A low-stakes build to learn something new—without turning it into a project.",
    category: "experiments",
    date: "Mar 2026",
  },
  {
    slug: "notes-from-a-train-window",
    title: "Notes from a train window",
    excerpt:
      "Travel notes: patterns, colors, signage, and the quiet joy of noticing.",
    category: "travel",
    date: "Mar 2026",
  },
];

export function postsByCategory(category: Category["slug"]) {
  return POSTS.filter((p) => p.category === category);
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

