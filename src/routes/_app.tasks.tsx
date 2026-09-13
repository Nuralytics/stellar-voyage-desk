import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, TrackDot } from "@/components/app/primitives";
import { currentEmployee, db, employeeName, projectByCode, projectLabel, projectTrack } from "@/lib/api";
import type { Task } from "@/lib/mock-storage";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — AbhiEdit Operations" },
      {
        name: "description",
        content: "Task queue grouped by status, scoped to the signed-in editor or the whole studio.",
      },
      { property: "og:title", content: "Tasks — AbhiEdit Operations" },
      { property: "og:description", content: "Task queue grouped by status across the studio." },
    ],
  }),
  component: TasksPage,
});

const COLUMNS: Task["status"][] = ["Queued", "In Progress", "Blocked", "Done"];

const PRIORITY: Record<Task["priority"], string> = {
  High: "border-destructive/50 text-destructive",
  Medium: "border-primary/50 text-primary",
  Low: "border-border text-muted-foreground",
};

function TasksPage() {
  const { isAdmin } = useRole();
  const me = currentEmployee();
  const tasks = isAdmin ? db().tasks : db().tasks.filter((t) => t.assigneeId === me?.id);

  return (
    <div>
      <PageHeader
        title={isAdmin ? "All Tasks" : "My Tasks"}
        subtitle={
          isAdmin
            ? `${tasks.length} tasks across the studio`
            : `${tasks.filter((t) => t.status !== "Done").length} open for you`
        }
      />
      <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map((col) => {
          const list = tasks.filter((t) => t.status === col);
          return (
            <section key={col}>
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {col}
                </span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                  {list.length}
                </span>
              </div>
              <ul className="space-y-2">
                {list.map((t) => {
                  const project = projectByCode(t.projectId);
                  return (
                    <li key={t.id} className="rounded-lg border border-border bg-surface p-3">
                      <div className="flex items-center gap-2">
                        {project && <TrackDot track={projectTrack(project)} />}
                        <span
                          className={cn(
                            "rounded border px-1.5 py-[1px] text-[10px] uppercase tracking-[0.08em]",
                            PRIORITY[t.priority],
                          )}
                        >
                          {t.priority}
                        </span>
                        <span className="ml-auto text-[11px] text-muted-foreground">{t.due}</span>
                      </div>
                      <p className="mt-1.5 text-[13px]">{t.title}</p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        {projectLabel(t.projectId)}
                      </p>
                      {isAdmin && (
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {employeeName(t.assigneeId)}
                        </p>
                      )}
                    </li>
                  );
                })}
                {list.length === 0 && (
                  <li className="rounded-lg border border-dashed border-border px-2 py-4 text-center text-[11px] text-muted-foreground">
                    Nothing here
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
