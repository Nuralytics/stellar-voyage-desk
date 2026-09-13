import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/settings")({
  component: () => (
    <OperationsPlaceholder
      title="Settings"
      subtitle="Studio preferences, notifications, access, and storage."
    />
  ),
});
