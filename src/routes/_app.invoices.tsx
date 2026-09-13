import { createFileRoute } from "@tanstack/react-router";

import { Metric, PageHeader, Restricted } from "@/components/app/primitives";
import { clientName, db, inr, inrShort, invoiceTotal, projectByCode } from "@/lib/api";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";
import type { Invoice } from "@/lib/mock-storage";

export const Route = createFileRoute("/_app/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices — AbhiEdit Operations" },
      {
        name: "description",
        content: "GST invoices with HSN/SAC lines, tax breakdown and payment status per project.",
      },
      { property: "og:title", content: "Invoices — AbhiEdit Operations" },
      { property: "og:description", content: "GST invoices with HSN/SAC lines and payment status." },
    ],
  }),
  component: InvoicesPage,
});

const STATUS: Record<Invoice["status"], string> = {
  Draft: "border-border text-muted-foreground",
  Sent: "border-primary/50 text-primary",
  Paid: "border-emerald-400/40 text-emerald-300",
  Overdue: "border-destructive/50 text-destructive",
};

function InvoicesPage() {
  const { isAdmin } = useRole();
  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Invoices" />
        <Restricted what="Invoicing" />
      </div>
    );
  }

  const invoices = db().invoices;
  const totals = invoices.map((i) => invoiceTotal(i.lines));
  const gross = totals.reduce((s, t) => s + t.gross, 0);
  const outstanding = invoices.reduce(
    (s, inv, idx) => (inv.status === "Paid" ? s : s + (totals[idx]?.gross ?? 0)),
    0,
  );

  return (
    <div>
      <PageHeader title="Invoices" subtitle={`${invoices.length} invoices raised this quarter`} />
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <Metric label="Billed (incl. GST)" value={inrShort(gross)} />
        <Metric label="Outstanding" value={inrShort(outstanding)} hint="unpaid or overdue" />
        <Metric
          label="Paid"
          value={String(invoices.filter((i) => i.status === "Paid").length)}
          hint="of all invoices"
        />
      </div>

      <div className="space-y-3 px-4 pb-4">
        {invoices.map((inv, idx) => {
          const t = totals[idx] ?? { net: 0, tax: 0, gross: 0 };
          const project = projectByCode(inv.projectId);
          return (
            <article key={inv.id} className="rounded-lg border border-border bg-surface">
              <header className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
                <span className="font-mono text-[12px]">{inv.number}</span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-[1px] text-[10px] uppercase tracking-[0.08em]",
                    STATUS[inv.status],
                  )}
                >
                  {inv.status}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-muted-foreground">
                  {project ? `${project.code} · ${project.title}` : "—"}
                  {project ? ` · ${clientName(project.clientId)}` : ""}
                </span>
                <span className="text-[11px] text-muted-foreground">Issued {inv.issuedOn}</span>
              </header>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="px-3 py-1.5 text-left font-medium">Description</th>
                      <th className="px-3 py-1.5 text-left font-medium">HSN/SAC</th>
                      <th className="px-3 py-1.5 text-right font-medium">Qty</th>
                      <th className="px-3 py-1.5 text-right font-medium">Rate</th>
                      <th className="px-3 py-1.5 text-right font-medium">GST</th>
                      <th className="px-3 py-1.5 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {inv.lines.map((l, i) => (
                      <tr key={i}>
                        <td className="px-3 py-1.5">{l.description}</td>
                        <td className="px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                          {l.hsn}
                        </td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{l.qty}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{inr(l.rate)}</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">{l.gst}%</td>
                        <td className="px-3 py-1.5 text-right tabular-nums">
                          {inr(l.qty * l.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <footer className="flex flex-wrap justify-end gap-4 border-t border-border px-3 py-2 text-[12px] tabular-nums">
                <span className="text-muted-foreground">Net {inr(t.net)}</span>
                <span className="text-muted-foreground">GST {inr(Math.round(t.tax))}</span>
                <span className="font-semibold">Total {inr(Math.round(t.gross))}</span>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
