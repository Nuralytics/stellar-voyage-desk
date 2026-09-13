import { FilePlus2, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/primitives";
export function OperationsPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
            <Plus className="size-3" /> New
          </button>
        }
      />
      <div className="p-4">
        <div className="rounded-lg border border-dashed border-border bg-surface/50 py-16 text-center">
          <FilePlus2 className="mx-auto size-6 text-primary" />
          <h2 className="mt-3 text-[13px] font-medium">{title} workspace</h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Your production operations will appear here as activity is added.
          </p>
          <button className="mt-4 rounded border border-border px-3 py-1.5 text-[11px] hover:bg-surface">
            Create first item
          </button>
        </div>
      </div>
    </div>
  );
}
