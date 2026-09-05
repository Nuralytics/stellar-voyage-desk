import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/contact"
      className="group flex h-full flex-col border-t border-border pt-6 transition-colors hover:border-primary focus-visible:border-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.22em] text-muted-foreground">
          {service.number}
        </span>
        <Icon className="size-5 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {service.capabilities.map((c) => (
          <li
            key={c}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {c}
          </li>
        ))}
      </ul>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
        Discuss this
        <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}

export default ServiceCard;
