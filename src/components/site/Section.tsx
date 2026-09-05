import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  headingClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-border py-20 md:py-28", className)}>
      <div className="container-x">
        {(eyebrow || title || intro) && (
          <Reveal className={cn("max-w-3xl", headingClassName)}>
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 font-display text-3xl leading-[1.05] font-semibold tracking-[-0.02em] text-balance-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </p>
            )}
          </Reveal>
        )}
        <div className={cn(eyebrow || title ? "mt-12 md:mt-16" : "")}>{children}</div>
      </div>
    </section>
  );
}

export default Section;
