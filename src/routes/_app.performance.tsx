import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/performance")({
  component: () => (
    <OperationsPlaceholder
      title="Performance"
      subtitle="Production throughput, quality, and team contribution trends."
    />
  ),
});
