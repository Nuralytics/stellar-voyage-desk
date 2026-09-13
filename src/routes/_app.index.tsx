import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import {
  HealthPill,
  Metric,
  PageHeader,
  RevisionChip,
  TrackDot,
} from "@/components/app/primitives";
import {
  clientName,
  currentEmployee,
  db,
  inrShort,
  projectPnl,
  projectTrack,
  visibleProjects,
} from "@/lib/api";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Workspace Home — AbhiEdit Operations" },
      {
        name: "description",
        content:
          "Daily operating picture for the AbhiEdit studio: live projects by track, health, revisions and margin.",
      },
      { property: "og:title", content: "Workspace Home — AbhiEdit Operations" },
      {
        property: "og:description",
        content: "Live projects by track, health, revisions and margin for the studio.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { isAdmin } = useRole();
  const data = db();
  const me = currentEmployee();
  const projects = visibleProjects(isAdmin ? "admin" : "employee");
  const attention = projects.filter((p) => p.health === "needs-attention" || p.delayed);
  const myTasks = data.tasks.filter((t) => t.assigneeId === me?.id && t.status !== "Done");
  const invoiced = projects.reduce((s, p) => s + p.invoiced, 0);
  const margin = projects.reduce((s, p) => s + projectPnl(p).pnl, 0);

  return (
    <div>
      <PageHeader
        title="Workspace Home"
        subtitle={
          isAdmin
            ? "Everything in flight across the studio."
            : `Your ${me?.track} track work, ${me?.name?.split(" ")[0]}.`
        }
      />

      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Active projects" value={String(projects.length)} />
        <Metric label="Open tasks" value={String(myTasks.length)} hint="assigned to you" />
        <Metric label="Needs attention" value={String(attention.length)} hint="delayed or flagged" />
        {isAdmin ? (
          <Metric label="Invoiced" value={inrShort(invoiced)} hint={`margin ${inrShort(margin)}`} />
        ) : (
          <Metric
            label="Hours this month"
            value={String(me?.hoursThisMonth ?? 0)}
            hint="from your worksheets"
          />
        )}
      </div>

      <section className="px-4 pb-4">
        <h2 className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Pipeline
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-2 px-3 py-2">
              <TrackDot track={projectTrack(p)} />
              <span className="font-mono text-[11px] text-muted-foreground">{p.code}</span>
              <span className="min-w-0 flex-1 truncate">{p.title}</span>
              {isAdmin && (
                <span className="hidden text-[12px] text-muted-foreground md:inline">
                  {clientName(p.clientId)}
                </span>
              )}
              <span className="text-[11px] text-muted-foreground">{p.stage}</span>
              <RevisionChip used={p.revisions} cap={p.revisionCap} />
              {p.delayed && (
                <AlertTriangle className="size-3.5 text-destructive" aria-label="Delayed" />
              )}
              <HealthPill health={p.health} />
            </li>
          ))}
          {projects.length === 0 && (
            <li className="px-3 py-6 text-center text-[12px] text-muted-foreground">
              Nothing assigned to your track right now.
            </li>
          )}
        </ul>
        <div className="mt-3 flex gap-2">
          <Link
            to="/projects"
            className="rounded-md border border-border px-3 py-1.5 text-[12px] hover:bg-surface"
          >
            Open projects
          </Link>
          <Link
            to="/tasks"
            className="rounded-md border border-border px-3 py-1.5 text-[12px] hover:bg-surface"
          >
            My tasks
          </Link>
        </div>
      </section>
    </div>
  );
}
