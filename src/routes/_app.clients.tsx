import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/clients")({
  component: () => (
    <OperationsPlaceholder
      title="Clients directory"
      subtitle="Brand contacts, production history, and active engagements."
    />
  ),
});
