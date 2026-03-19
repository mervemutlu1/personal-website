import type { ReactNode } from "react";
import Link from "next/link";
import { TabsNav } from "@/components/TabsNav";

export function NotebookShell({ children }: { children: ReactNode }) {
  return (
    <div className="paper-bg min-h-svh">
      <div className="mx-auto w-full max-w-[1100px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="relative">
          <TabsNav />

          <div
            className={[
              "relative overflow-hidden",
              "rounded-[22px] border border-rule/60 bg-paper/85",
              "shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]",
            ].join(" ")}
          >
            <div className="absolute inset-y-0 left-0 w-[18px] bg-gradient-to-r from-ink/10 to-transparent" />
            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(800px_500px_at_25%_10%,rgba(255,255,255,0.45),transparent_60%)]" />

            <header className="flex items-center justify-between gap-6 px-7 py-6 sm:px-10">
              <Link
                href="/"
                className="font-sans text-xs tracking-[0.35em] uppercase text-ink/70 hover:text-ink"
              >
                Notebook
              </Link>
              <div className="hidden h-px flex-1 bg-rule/60 sm:block" />
              <div className="font-sans text-xs tracking-[0.22em] text-ink/55">
                2026
              </div>
            </header>

            <div className="px-7 pb-12 sm:px-10">{children}</div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-rule/60" />
          </div>
        </div>
      </div>
    </div>
  );
}

