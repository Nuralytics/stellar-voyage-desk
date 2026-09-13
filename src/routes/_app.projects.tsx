import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { HealthPill, PageHeader, RevisionChip, TrackDot } from "@/components/app/primitives";
import { clientName, employeeName, inrShort, projectTrack, visibleProjects } from "@/lib/api";
import { STAGES, type Project } from "@/lib/mock-storage";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects")({
  head: () => ({
    meta: [
      { title: "Projects — AbhiEdit Operations" },
      {
        name: "description",
        content:
          "Dual-track project board covering pre-production through delivery, with health, revisions and budget.",
      },
      { property: "og:title", content: "Projects — AbhiEdit Operations" },
      {
        property: "og:description",
        content: "Dual-track board from pre-production through delivery.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { isAdmin } = useRole();
  const [view, setView] = useState<"grid" | "swimlane">("grid");
  const projects = visibleProjects(isAdmin ? "admin" : "employee");

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle={`${projects.length} project${projects.length === 1 ? "" : "s"} in flight`}
        actions={
          <div className="flex rounded-md border border-border p-[2px]">
            {(["grid", "swimlane"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded px-2.5 py-1 text-[11px] capitalize",
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />

      {view === "grid" ? (
        <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} showMoney={isAdmin} />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto p-4">
          {STAGES.map((stage) => {
            const inStage = projects.filter((p) => p.stage === stage);
            return (
              <div key={stage} className="w-64 shrink-0">
                <div className="mb-2 flex items-center gap-2 px-1">
                  <TrackDot track={stage === "Delivered" ? "digital" : projectTrackOfStage(stage)} />
                  <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stage}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {inStage.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {inStage.map((p) => (
                    <ProjectCard key={p.id} project={p} showMoney={isAdmin} compact />
                  ))}
                  {inStage.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border px-2 py-4 text-center text-[11px] text-muted-foreground">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {projects.length === 0 && (
        <p className="px-4 pb-6 text-[12px] text-muted-foreground">
          No projects on your track are assigned to you yet.
        </p>
      )}
    </div>
  );
}

function projectTrackOfStage(stage: (typeof STAGES)[number]) {
  return stage === "Pre-Production" || stage === "Shooting" || stage === "Ingest & Sync"
    ? ("physical" as const)
    : ("digital" as const);
}

function ProjectCard({
  project: p,
  showMoney,
  compact,
}: {
  project: Project;
  showMoney: boolean;
  compact?: boolean;
}) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center gap-2">
        <TrackDot track={projectTrack(p)} />
        <span className="font-mono text-[11px] text-muted-foreground">{p.code}</span>
        {p.delayed && <AlertTriangle className="size-3.5 text-destructive" aria-label="Delayed" />}
        <span className="ml-auto">
          <HealthPill health={p.health} />
        </span>
      </div>
      <h3 className="mt-1.5 truncate text-[13.5px] font-medium">{p.title}</h3>
      <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
        {showMoney ? clientName(p.clientId) : p.type} · {p.stage}
      </p>
      {!compact && (
        <p className="mt-1 truncate text-[11.5px] text-muted-foreground">
          {p.assignees.map(employeeName).join(", ")}
        </p>
      )}
      <div className="mt-2 flex items-center gap-2 border-t border-border pt-2 text-[11px] text-muted-foreground">
        <RevisionChip used={p.revisions} cap={p.revisionCap} />
        <span>Due {p.deadline}</span>
        {showMoney && (
          <span className="ml-auto tabular-nums">
            {inrShort(p.budget)} · inv {inrShort(p.invoiced)}
          </span>
        )}
      </div>
    </article>
  );
}
