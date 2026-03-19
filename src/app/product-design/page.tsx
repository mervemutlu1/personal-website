import { PostCard } from "@/components/PostCard";
import { postsByCategory } from "@/lib/posts";

export default function ProductDesignPage() {
  const posts = postsByCategory("product-design");

  return (
    <section>
      <header className="mb-10">
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-ink/60">
          Category
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Product Design
        </h1>
        <div className="mt-6 h-px bg-rule/60" />
      </header>

      <div className="grid gap-5">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

