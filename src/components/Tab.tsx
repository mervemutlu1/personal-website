"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabProps = {
  href: string;
  label: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Tab({ href, label }: TabProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "group relative flex h-20 w-14 items-center justify-center px-4 md:w-16",
        "rounded-l-xl border border-r-0 border-rule/60",
        "bg-paper/95 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.45)]",
        "transition-colors",
        active
          ? "bg-paper-2 ring-1 ring-ink/10"
          : "hover:bg-paper-2/80 hover:ring-1 hover:ring-ink/10",
      ].join(" ")}
      style={{
        boxShadow: active
          ? "0 10px 26px -18px rgba(0,0,0,0.55)"
          : undefined,
      }}
    >
      <span
        className={[
          "vertical-tab-text select-none",
          "whitespace-nowrap",
          "text-[0.72rem] tracking-[0.25em] uppercase",
          active ? "text-ink font-semibold" : "text-ink/75 font-medium",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

