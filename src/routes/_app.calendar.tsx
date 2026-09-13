import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/calendar")({
  component: () => (
    <OperationsPlaceholder
      title="Operational calendar"
      subtitle="Shoots, deadlines, meetings, and team availability."
    />
  ),
});
