import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/attendance")({
  component: () => (
    <OperationsPlaceholder
      title="Attendance"
      subtitle="Live studio presence and working-hours records."
    />
  ),
});
