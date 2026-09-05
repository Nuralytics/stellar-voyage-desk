import { stats } from "@/content/site";
import { Reveal } from "./Reveal";

export function TrustBar() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-border bg-surface/40">
      <div className="container-x py-10 md:py-12">
        <h2
          id="trust-heading"
          className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase"
        >
          Trusted by ambitious teams
        </h2>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-8 text-xs text-muted-foreground">
          *Indicative figures shown as placeholders until verified metrics are supplied.
        </p>
      </div>
    </section>
  );
}

export default TrustBar;
