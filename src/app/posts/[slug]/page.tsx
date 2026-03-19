import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="pb-4">
      <header className="mb-10">
        <p className="font-sans text-xs tracking-[0.35em] uppercase text-ink/60">
          {post.date}
        </p>
        <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty font-sans text-[1.02rem] leading-7 text-ink/75">
          {post.excerpt}
        </p>
      </header>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-rule/60 lg:block" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <section className="space-y-6 text-ink/85">
          <h2 className="font-serif text-2xl tracking-tight text-ink">
            Why notebooks still win
          </h2>
          <p className="font-sans text-[1.02rem] leading-8">
            A notebook forces a useful constraint: you can’t open ten tabs at
            once. You pick a thought, give it space, and let it become legible.
          </p>
          <p className="font-sans text-[1.02rem] leading-8">
            This blog borrows that feeling—warm paper, simple rules, and a
            layout that privileges reading over interaction.
          </p>
          <h3 className="pt-2 font-serif text-xl tracking-tight text-ink">
            What I’m optimizing for
          </h3>
          <ul className="list-disc space-y-2 pl-5 font-sans text-[1.02rem] leading-8">
            <li>Clarity over cleverness</li>
            <li>Simple navigation that never competes with content</li>
            <li>Pages that feel like objects</li>
          </ul>
        </section>

        <section className="space-y-6 text-ink/85">
          <h2 className="font-serif text-2xl tracking-tight text-ink">
            How I’ll write here
          </h2>
          <p className="font-sans text-[1.02rem] leading-8">
            Posts are short and edited. I’ll keep drafts honest and ship them as
            artifacts—complete enough to be useful, imperfect enough to stay
            human.
          </p>
          <blockquote className="border-l-2 border-rule/80 pl-4 font-serif text-xl leading-8 text-ink/80">
            “Write what you’re learning, not what you already know.”
          </blockquote>
          <p className="font-sans text-[1.02rem] leading-8">
            When a post needs structure, I’ll use lists. When it needs breath,
            I’ll leave more white space.
          </p>
          <h3 className="pt-2 font-serif text-xl tracking-tight text-ink">
            Next
          </h3>
          <p className="font-sans text-[1.02rem] leading-8">
            The next step is adding real markdown content and a simple index per
            category. For now, this page establishes the open-notebook editorial
            rhythm.
          </p>
        </section>
      </div>
      </div>

      <div className="mt-12 hidden h-px bg-rule/60 lg:block" />
    </article>
  );
}

