import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/logs")({
  component: () => (
    <OperationsPlaceholder
      title="Daily worksheet"
      subtitle="Track time, capture blockers, and plan tomorrow's work."
    />
  ),
});
