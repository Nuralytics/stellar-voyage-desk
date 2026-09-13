import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Northform | Digital Product Studio" },
      {
        name: "description",
        content:
          "Northform is a product studio building fast, considered digital experiences for ambitious brands.",
      },
      { property: "og:title", content: "Northform | Digital Product Studio" },
      {
        property: "og:description",
        content:
          "Northform is a product studio building fast, considered digital experiences for ambitious brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6 py-24">
        <span className="w-fit rounded-full border border-border px-3 py-1 text-xs tracking-widest uppercase text-muted-foreground">
          Northform Studio
        </span>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          Considered digital
          <br />
          products, built fast.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          We design and ship interfaces, brands, and platforms for teams who care
          about the details.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
          <a
            href="#work"
            className="rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            See our work
          </a>
        </div>
      </section>
    </main>
  );
}
