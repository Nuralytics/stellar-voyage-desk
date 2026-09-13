import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Restricted } from "@/components/app/primitives";
import { db, inr } from "@/lib/api";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/_app/rate-cards")({
  head: () => ({
    meta: [
      { title: "Rate Cards — AbhiEdit Operations" },
      {
        name: "description",
        content:
          "Reusable billing rates with unit, HSN/SAC code and GST percentage, ready to drop into invoices.",
      },
      { property: "og:title", content: "Rate Cards — AbhiEdit Operations" },
      { property: "og:description", content: "Reusable billing rates with HSN/SAC codes and GST." },
    ],
  }),
  component: RateCardsPage,
});

function RateCardsPage() {
  const { isAdmin } = useRole();
  if (!isAdmin) {
    return (
      <div>
        <PageHeader title="Rate Cards" />
        <Restricted what="Rate cards" />
      </div>
    );
  }

  const cards = db().rateCards;

  return (
    <div>
      <PageHeader
        title="Rate Cards"
        subtitle={`${cards.length} reusable rates used to build invoice lines`}
      />
      <div className="p-4">
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-[12.5px]">
            <thead className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left font-medium">Service</th>
                <th className="px-3 py-2 text-left font-medium">Unit</th>
                <th className="px-3 py-2 text-left font-medium">HSN/SAC</th>
                <th className="px-3 py-2 text-right font-medium">GST</th>
                <th className="px-3 py-2 text-right font-medium">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cards.map((c) => (
                <tr key={c.id}>
                  <td className="px-3 py-2">{c.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{c.unit}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{c.hsn}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{c.gst}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">{inr(c.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
