import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Health, Track } from "@/lib/mock-storage";
import { healthLabel } from "@/lib/api";

/** Small dot that identifies the physical vs digital track. Never a full badge fill. */
export function TrackDot({ track, className }: { track: Track; className?: string }) {
  return (
    <span
      title={track === "physical" ? "Physical track" : "Digital track"}
      className={cn(
        "inline-block size-[7px] shrink-0 rounded-full",
        track === "physical" ? "bg-[var(--track-physical)]" : "bg-[var(--track-digital)]",
        className,
      )}
    />
  );
}

const HEALTH_STYLE: Record<Health, string> = {
  queued: "border-border text-muted-foreground",
  "in-progress": "border-[var(--track-digital)]/40 text-[var(--track-digital)]",
  delivered: "border-emerald-400/40 text-emerald-300",
  "needs-attention": "border-destructive/50 text-destructive",
};

export function HealthPill({ health }: { health: Health }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-[2px] text-[10px] font-medium uppercase tracking-[0.08em]",
        HEALTH_STYLE[health],
      )}
    >
      {healthLabel(health)}
    </span>
  );
}

export function RevisionChip({ used, cap }: { used: number; cap: number }) {
  const over = used > cap;
  return (
    <span
      title={`${used} of ${cap} included revisions used`}
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-[1px] font-mono text-[10px]",
        over ? "border-destructive/50 text-destructive" : "border-border text-muted-foreground",
      )}
    >
      R{used}/{cap}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-4 py-3">
      <div>
        <h1 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-[13px] text-foreground/80">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-[22px] font-semibold leading-none tabular-nums">{value}</div>
      {hint ? <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

export function Restricted({ what }: { what: string }) {
  return (
    <div className="m-4 rounded-lg border border-dashed border-border bg-surface/60 p-6 text-center">
      <p className="text-[13px] font-medium">{what} is limited to admins</p>
      <p className="mt-1 text-[12px] text-muted-foreground">
        Rates, client contacts and billing figures stay hidden for employee accounts.
      </p>
    </div>
  );
}
