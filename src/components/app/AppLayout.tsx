import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutGrid,
  ListChecks,
  Receipt,
  Search,
  Tag,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { currentEmployee } from "@/lib/api";
import { useRole } from "@/lib/role";

interface NavItem {
  to: "/" | "/projects" | "/tasks" | "/invoices" | "/rate-cards";
  label: string;
  icon: typeof LayoutGrid;
  adminOnly?: boolean;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Workspace",
    items: [
      { to: "/", label: "Home", icon: LayoutGrid },
      { to: "/tasks", label: "My Tasks", icon: ListChecks },
    ],
  },
  {
    group: "Projects & Sales",
    items: [{ to: "/projects", label: "Projects", icon: FileText }],
  },
  {
    group: "Billing",
    items: [
      { to: "/invoices", label: "Invoices", icon: Receipt, adminOnly: true },
      { to: "/rate-cards", label: "Rate Cards", icon: Tag, adminOnly: true },
    ],
  },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role, setRole, isAdmin } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const me = useMemo(() => currentEmployee(), []);
  const title = useMemo(() => {
    const all = NAV.flatMap((g) => g.items);
    return all.find((i) => i.to === pathname)?.label ?? "Workspace";
  }, [pathname]);

  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-background p-3 text-[13px]">
      <aside
        className={cn(
          "flex shrink-0 flex-col rounded-xl border border-border bg-surface transition-[width] duration-200",
          collapsed ? "w-16" : "w-56",
        )}
      >
        <div className="flex h-11 items-center gap-2 border-b border-border px-3">
          <span className="grid size-6 shrink-0 place-items-center rounded bg-primary text-[11px] font-bold text-primary-foreground">
            A
          </span>
          {!collapsed && (
            <span className="truncate text-[12px] font-semibold uppercase tracking-[0.14em]">
              AbhiEdit
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {NAV.map((group) => {
            const items = group.items.filter((i) => !i.adminOnly || isAdmin);
            if (items.length === 0) return null;
            return (
              <div key={group.group} className="mb-3">
                {!collapsed && (
                  <div className="px-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {group.group}
                  </div>
                )}
                <ul className="space-y-[2px]">
                  {items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/" }}
                        title={item.label}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground data-[status=active]:bg-surface-strong data-[status=active]:text-foreground"
                      >
                        <item.icon className="size-4 shrink-0" aria-hidden />
                        {!collapsed && <span className="truncate text-[12.5px]">{item.label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-2">
          {!collapsed && (
            <div className="mb-2 flex rounded-md border border-border p-[2px]">
              {(["admin", "employee"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex-1 rounded px-2 py-1 text-[11px] capitalize transition-colors",
                    role === r
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground hover:bg-surface-strong hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex h-11 shrink-0 items-center gap-3 rounded-xl border border-border bg-surface px-3">
          <div className="flex min-w-0 items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>AbhiEdit</span>
            <span className="opacity-50">/</span>
            <span className="truncate text-foreground">{title}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground sm:flex">
              <Search className="size-3.5" aria-hidden />
              <span>Search</span>
              <kbd className="rounded border border-border px-1 font-mono text-[10px]">Ctrl K</kbd>
            </div>
            <button
              aria-label="Notifications"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-surface-strong hover:text-foreground"
            >
              <Bell className="size-4" aria-hidden />
            </button>
            <div className="flex items-center gap-2 border-l border-border pl-2">
              <span className="grid size-6 place-items-center rounded-full bg-surface-strong text-[10px] font-semibold">
                {(isAdmin ? "Arpan Chakraborty" : me?.name ?? "Employee")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="hidden text-[12px] md:inline">
                {isAdmin ? "Arpan Chakraborty" : me?.name}
              </span>
            </div>
          </div>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
