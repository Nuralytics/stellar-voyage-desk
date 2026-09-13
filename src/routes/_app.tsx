import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/app/AppLayout";
import { RoleProvider } from "@/lib/role";

export const Route = createFileRoute("/_app")({
  ssr: false,
  component: AppShell,
});

function AppShell() {
  return (
    <RoleProvider>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RoleProvider>
  );
}
