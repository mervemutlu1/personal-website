"use client";

import { CATEGORIES, categoryHref } from "@/lib/categories";
import { Tab } from "@/components/Tab";

export function TabsNav() {
  return (
    <nav
      aria-label="Categories"
      className={[
        "pointer-events-auto absolute right-0 top-24 z-20",
        "flex flex-col gap-3 pr-0",
      ].join(" ")}
    >
      {CATEGORIES.map((c) => (
        <div
          key={c.slug}
          className="translate-x-[1.05rem] md:translate-x-[1.25rem]"
        >
          <Tab href={categoryHref(c.slug)} label={c.label} />
        </div>
      ))}
    </nav>
  );
}

