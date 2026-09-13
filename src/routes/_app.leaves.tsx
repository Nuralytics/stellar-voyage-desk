import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/leaves")({
  component: () => (
    <OperationsPlaceholder
      title="Leave management"
      subtitle="Balances, requests, and manager approvals."
    />
  ),
});
