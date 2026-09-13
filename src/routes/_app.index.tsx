import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  MapPin,
  Play,
  Plus,
  Timer,
} from "lucide-react";
import { HealthPill, PageHeader, TrackDot } from "@/components/app/primitives";
import { currentEmployee, db, projectTrack, visibleProjects } from "@/lib/api";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/_app/")({ component: HomePage });
function HomePage() {
  const { isAdmin } = useRole();
  const data = db();
  const me = currentEmployee();
  const projects = visibleProjects(isAdmin ? "admin" : "employee");
  const tasks = (isAdmin ? data.tasks : data.tasks.filter((t) => t.assigneeId === me?.id)).filter(
    (t) => t.status !== "Done",
  );
  const upcoming = projects.slice(0, 4);
  const metrics = [
    {
      label: "Active shoots",
      value: String(projects.filter((p) => p.stage === "Shooting").length || 2),
      note: "this week",
      color: "text-primary",
    },
    {
      label: "Pending delivery",
      value: String(projects.filter((p) => p.stage === "Client Review").length || 3),
      note: "awaiting approval",
      color: "text-rose-400",
    },
    {
      label: "Open tasks",
      value: String(tasks.length),
      note: "across your queue",
      color: "text-sky-400",
    },
    {
      label: "Team attendance",
      value: "92%",
      note: "18 of 20 clocked in",
      color: "text-emerald-400",
    },
  ];
  return (
    <div>
      <PageHeader
        title="Good morning, Arpan"
        subtitle="Monday, 13 September · Your studio is in motion."
        actions={
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
            <Plus className="size-3.5" /> New project
          </button>
        }
      />
      <div className="grid divide-x divide-border border-b border-border sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="px-4 py-3">
            <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-muted-foreground">
              {m.label}
            </p>
            <div className="mt-1 flex items-end gap-2">
              <b className="text-[25px] font-medium leading-none">{m.value}</b>
              <span className={`mb-0.5 text-[10px] ${m.color}`}>● {m.note}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 p-4 xl:grid-cols-[1.6fr_.9fr]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-white/[.025] px-3 py-2">
              <div>
                <h2 className="text-[11px] font-semibold">Production timeline</h2>
                <p className="text-[10px] text-muted-foreground">
                  Upcoming studio moments and delivery checkpoints
                </p>
              </div>
              <Link to="/calendar" className="text-[10px] text-primary">
                View calendar <ArrowUpRight className="inline size-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {upcoming.map((p, i) => (
                <div className="flex items-center gap-3 px-3 py-3" key={p.id}>
                  <div className="w-10 text-center">
                    <b className="block text-[14px] leading-none">{14 + i}</b>
                    <span className="text-[9px] uppercase text-muted-foreground">Sep</span>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <TrackDot track={projectTrack(p)} className="size-2" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium">{p.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {i === 0
                        ? "Principal photography · Studio A"
                        : i === 1
                          ? "Fine cut review · Edit Suite 02"
                          : "Delivery checkpoint · Client review"}
                    </p>
                  </div>
                  <HealthPill health={p.health} />
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <div>
                <h2 className="text-[11px] font-semibold">Priority queue</h2>
                <p className="text-[10px] text-muted-foreground">Work needing a decision today</p>
              </div>
              <Link to="/tasks" className="text-[10px] text-primary">
                Open tasks
              </Link>
            </div>
            <div className="grid divide-y divide-border">
              {tasks.slice(0, 3).map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-3 py-2.5">
                  <CircleDot className="size-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-[12px]">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Due {t.due} · {t.priority} priority
                    </p>
                  </div>
                  <button className="rounded border border-border px-2 py-1 text-[10px] text-muted-foreground">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <section className="overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-primary/15 to-surface">
            <div className="flex items-center justify-between border-b border-primary/15 px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-primary">
                Studio station
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" /> Live
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Clock3 className="size-4" />
                </div>
                <div>
                  <p className="text-[14px] font-medium">Clocked in</p>
                  <p className="text-[10px] text-muted-foreground">Since 09:18 · Editing Suite</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1 rounded-md border border-border bg-black/10 p-1 text-[9px]">
                <button className="rounded bg-primary px-1 py-1.5 text-primary-foreground">
                  Studio Floor
                </button>
                <button className="text-muted-foreground">Edit Suite</button>
                <button className="text-muted-foreground">Remote</button>
              </div>
              <button className="mt-3 w-full rounded-md border border-primary/50 py-1.5 text-[11px] text-primary">
                Clock out
              </button>
            </div>
          </section>
          <section className="rounded-lg border border-border bg-surface">
            <div className="border-b border-border px-3 py-2">
              <h2 className="text-[11px] font-semibold">Today at the studio</h2>
            </div>
            <div className="space-y-3 p-3 text-[11px]">
              <div className="flex gap-2">
                <MapPin className="size-3.5 text-primary" />
                <div>
                  <p>Studio A · Principal shoot</p>
                  <p className="text-[10px] text-muted-foreground">
                    10:00 – 18:00 · Terra Campaign
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Play className="size-3.5 text-[var(--track-digital)]" />
                <div>
                  <p>Client review session</p>
                  <p className="text-[10px] text-muted-foreground">15:30 · Amara Films</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Timer className="size-3.5 text-emerald-400" />
                <div>
                  <p>Daily wrap standup</p>
                  <p className="text-[10px] text-muted-foreground">18:15 · All production</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
