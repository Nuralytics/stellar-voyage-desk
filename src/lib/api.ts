/**
 * Thin data access layer. Today it always resolves against the in-browser
 * demo database; when a backend exists, swap the bodies for fetch() calls
 * and keep the same shapes.
 */
import {
  CURRENT_EMPLOYEE_ID,
  getDb,
  type Db,
  type Health,
  type Project,
  type Role,
  type Track,
  STAGE_TRACK,
} from "./mock-storage";

export function db(): Db {
  return getDb();
}

export function currentEmployee() {
  const d = db();
  return d.employees.find((e) => e.id === CURRENT_EMPLOYEE_ID) ?? d.employees[0];
}

export function employeeName(id: string) {
  return db().employees.find((e) => e.id === id)?.name ?? "Unassigned";
}

export function clientName(id: string) {
  return db().clients.find((c) => c.id === id)?.name ?? "Unknown client";
}

export function projectByCode(id: string) {
  return db().projects.find((p) => p.id === id);
}

export function projectLabel(id: string) {
  const p = projectByCode(id);
  return p ? `${p.code} · ${p.title}` : "—";
}

export function projectTrack(p: Project): Track {
  return STAGE_TRACK[p.stage];
}

export function visibleProjects(role: Role): Project[] {
  const all = db().projects;
  if (role === "admin") return all;
  const me = currentEmployee();
  return all.filter((p) => p.assignees.includes(me.id) && projectTrack(p) === me.track);
}

export function healthLabel(h: Health) {
  return {
    queued: "Queued",
    "in-progress": "In Progress",
    delivered: "Delivered",
    "needs-attention": "Needs Attention",
  }[h];
}

export function invoiceTotal(lines: { qty: number; rate: number; gst: number }[]) {
  const net = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
  const tax = lines.reduce((sum, l) => sum + (l.qty * l.rate * l.gst) / 100, 0);
  return { net, tax, gross: net + tax };
}

/** Storage cost attribution: demo cloud tier of ₹1,800 per TB per month. */
export const STORAGE_RATE_PER_TB = 1800;

export function storageCost(tb: number) {
  return Math.round(tb * STORAGE_RATE_PER_TB);
}

export function projectPnl(p: Project) {
  const cost = p.actual + storageCost(p.storageTb);
  return { cost, pnl: p.invoiced - cost };
}

export function inr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function inrShort(value: number) {
  if (Math.abs(value) >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (Math.abs(value) >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

/** Equipment double-booking detection. */
export function equipmentConflicts() {
  return db()
    .equipment.map((eq) => {
      const clashes: { a: string; b: string }[] = [];
      for (let i = 0; i < eq.bookings.length; i++) {
        for (let j = i + 1; j < eq.bookings.length; j++) {
          const a = eq.bookings[i];
          const b = eq.bookings[j];
          if (a.from <= b.to && b.from <= a.to) clashes.push({ a: a.projectId, b: b.projectId });
        }
      }
      return { equipment: eq, clashes };
    })
    .filter((row) => row.clashes.length > 0);
}

export function expiringLicenses(withinDays = 45, today = new Date("2026-09-12")) {
  return db().files.filter((f) => {
    if (!f.licenseExpiry) return false;
    const diff = (new Date(f.licenseExpiry).getTime() - today.getTime()) / 86400000;
    return diff <= withinDays;
  });
}
