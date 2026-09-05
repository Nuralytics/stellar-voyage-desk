import { differentiators } from "@/content/process";
import { Reveal } from "./Reveal";

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
            Why teams choose us
          </p>
          <h2
            id="why-us-heading"
            className="mt-4 font-display text-3xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance-tight sm:text-4xl md:text-5xl"
          >
            A senior team that owns the outcome, not just the ticket.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            We work in small, senior teams with direct access to the people making
            decisions. That keeps scope honest, timelines real and quality high.
          </p>
        </Reveal>

        <ol className="lg:col-span-7">
          {differentiators.map((item, i) => (
            <Reveal as="li" key={item.number} delay={i * 50}>
              <div className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-border py-6 transition-colors hover:border-primary md:grid-cols-[4rem_1fr] md:py-7">
                <span className="font-mono text-xs tracking-[0.22em] text-primary">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default WhyUs;
