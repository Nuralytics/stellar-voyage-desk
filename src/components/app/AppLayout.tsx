import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Files,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Search,
  Settings,
  Users,
  UserRoundCheck,
  BriefcaseBusiness,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentEmployee } from "@/lib/api";
import { useRole } from "@/lib/role";

type AppPath =
  | "/"
  | "/tasks"
  | "/logs"
  | "/calendar"
  | "/leads"
  | "/projects"
  | "/clients"
  | "/files"
  | "/team"
  | "/performance"
  | "/attendance"
  | "/leaves"
  | "/settings";
interface NavItem {
  to: AppPath;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
}
const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Workspace",
    items: [
      { to: "/", label: "Home", icon: LayoutDashboard },
      { to: "/tasks", label: "My Tasks", icon: ListChecks },
      { to: "/logs", label: "Worksheet", icon: ClipboardList },
      { to: "/calendar", label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    group: "Projects & Sales",
    items: [
      { to: "/leads", label: "Leads", icon: BriefcaseBusiness, adminOnly: true },
      { to: "/projects", label: "Projects", icon: Files },
      { to: "/clients", label: "Clients", icon: Users, adminOnly: true },
    ],
  },
  { group: "Assets", items: [{ to: "/files", label: "Files", icon: Files }] },
  {
    group: "People",
    items: [
      { to: "/team", label: "Employees", icon: Users },
      { to: "/performance", label: "Performance", icon: Gauge },
      { to: "/attendance", label: "Attendance", icon: Clock3 },
      { to: "/leaves", label: "Leave", icon: UserRoundCheck },
    ],
  },
  { group: "System", items: [{ to: "/settings", label: "Settings", icon: Settings }] },
];
function Sidebar({
  collapsed,
  setCollapsed,
  mobile,
  onNavigate,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { role, setRole, isAdmin } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border border-border bg-[var(--sidebar-background)]",
        mobile ? "w-72 rounded-none border-y-0 border-l-0" : "rounded-xl",
        collapsed && !mobile ? "w-16" : "w-52",
      )}
    >
      <div className="flex h-12 items-center gap-2 border-b border-border px-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary font-display text-[13px] font-bold text-primary-foreground">
          A
        </span>
        {(!collapsed || mobile) && (
          <div>
            <b className="block text-[12px] tracking-wide">AbhiEdit</b>
            <span className="text-[9px] uppercase tracking-[.18em] text-muted-foreground">
              Media Operations
            </span>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV.map((group) => {
          const items = group.items.filter((i) => !i.adminOnly || isAdmin);
          return (
            <section key={group.group} className="mb-4">
              {(!collapsed || mobile) && (
                <p className="px-2 pb-1.5 text-[9px] font-semibold uppercase tracking-[.17em] text-muted-foreground">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={onNavigate}
                    activeOptions={{ exact: item.to === "/" }}
                    title={item.label}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition hover:bg-white/[.05] hover:text-foreground data-[status=active]:bg-primary/15 data-[status=active]:text-primary"
                  >
                    <item.icon className="size-4 shrink-0" />
                    {(!collapsed || mobile) && <span className="text-[12px]">{item.label}</span>}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </nav>
      <div className="border-t border-border p-2">
        {(!collapsed || mobile) && (
          <>
            <div className="mb-2 rounded-md border border-border p-0.5">
              <div className="grid grid-cols-2 gap-0.5">
                {(["admin", "employee"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded px-1 py-1 text-[10px] capitalize",
                      role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <p className="px-1 text-[10px] text-muted-foreground">Previewing {role} access</p>
          </>
        )}{" "}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-2 flex w-full items-center justify-center rounded-md py-1.5 text-muted-foreground hover:bg-white/[.05]"
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <>
                <ChevronLeft className="size-4" />
                <span className="ml-1 text-[10px]">Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </aside>
  );
}
export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { isAdmin } = useRole();
  const me = useMemo(() => currentEmployee(), []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = useMemo(
    () => NAV.flatMap((g) => g.items).find((i) => i.to === pathname)?.label ?? "Workspace",
    [pathname],
  );
  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-background p-3 text-[13px]">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      {mobile && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
          <div className="h-full w-72">
            <Sidebar
              collapsed={false}
              setCollapsed={setCollapsed}
              mobile
              onNavigate={() => setMobile(false)}
            />
          </div>
          <button
            onClick={() => setMobile(false)}
            className="absolute left-74 top-3 rounded bg-surface p-2"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <header className="flex h-11 shrink-0 items-center gap-3 rounded-xl border border-border bg-surface/90 px-3">
          <button className="md:hidden" onClick={() => setMobile(true)}>
            <Menu className="size-4" />
          </button>
          <div className="min-w-0 text-[11px] text-muted-foreground">
            <span className="hidden sm:inline">
              Workspace <i className="mx-1 not-italic opacity-40">/</i>
            </span>
            <span className="text-foreground">{title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground sm:flex">
              <Search className="size-3.5" /> Search{" "}
              <kbd className="ml-2 rounded border border-border px-1 text-[9px]">⌘ K</kbd>
            </button>
            <button className="relative rounded p-1.5 text-muted-foreground hover:bg-surface-strong">
              <Bell className="size-4" />
              <i className="absolute right-1 top-1 size-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 border-l border-border pl-2">
              <span className="grid size-6 place-items-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
                {isAdmin
                  ? "AC"
                  : me?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
              </span>
              <span className="hidden text-[11px] md:block">
                {isAdmin ? "Arpan Chakraborty" : me?.name}
              </span>
            </div>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
