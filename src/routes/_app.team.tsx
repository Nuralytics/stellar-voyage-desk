import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/team")({
  component: () => (
    <OperationsPlaceholder
      title="Agency roster"
      subtitle="Studio crew, departments, and reporting relationships."
    />
  ),
});
