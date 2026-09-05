import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroVisual from "@/assets/hero-visual.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hairline-grid opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="animate-fade-slide-in-1 font-mono text-xs tracking-[0.22em] text-primary uppercase">
            Digital product studio
          </p>
          <h1 className="animate-fade-slide-in-2 mt-6 font-display text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.035em] text-balance-tight sm:text-6xl lg:text-[4.6rem]">
            We build digital products that move businesses forward.
          </h1>
          <p className="animate-fade-slide-in-3 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We design and engineer high-performance digital experiences, platforms and
            products for ambitious businesses — from first prototype to production scale.
          </p>
          <div className="animate-fade-slide-in-4 mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start a Project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/work"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-surface"
            >
              View Our Work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="animate-fade-slide-in-3 lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={heroVisual}
              alt="Abstract layered product interface panels rendered in dark tones with a warm accent light"
              width={1408}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
