import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative rounded-2xl border border-rule/60 bg-paper/70 px-6 py-5 shadow-[0_18px_42px_-38px_rgba(0,0,0,0.55)]">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-balance font-serif text-2xl leading-tight text-ink">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <div className="shrink-0 font-sans text-xs tracking-[0.22em] text-ink/55">
          {post.date}
        </div>
      </div>
      <p className="mt-2 text-pretty font-sans text-[0.98rem] leading-7 text-ink/75">
        {post.excerpt}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.28em] uppercase text-ink/60 group-hover:text-ink">
        Read
        <span className="inline-block h-px w-10 bg-rule/60 transition-all group-hover:w-12 group-hover:bg-rule/90" />
      </div>
    </article>
  );
}

