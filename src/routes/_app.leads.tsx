import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/leads")({
  component: () => (
    <OperationsPlaceholder
      title="Leads & inquiry pipeline"
      subtitle="Qualify new work and convert promising briefs into productions."
    />
  ),
});
