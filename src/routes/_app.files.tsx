import { createFileRoute } from "@tanstack/react-router";
import { OperationsPlaceholder } from "@/components/app/OperationsPlaceholder";
export const Route = createFileRoute("/_app/files")({
  component: () => (
    <OperationsPlaceholder
      title="Digital assets"
      subtitle="Project footage, documents, AI generations, and delivery files."
    />
  ),
});
