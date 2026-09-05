import { createFileRoute } from "@tanstack/react-router";
import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Journey Beyond Earth | Cosmic Travel" },
      {
        name: "description",
        content:
          "Experience the cosmos like never before. Advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
      },
      {
        property: "og:title",
        content: "Journey Beyond Earth | Cosmic Travel",
      },
      {
        property: "og:description",
        content:
          "Experience the cosmos like never before. Advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://cdn.21st.dev/assets/mirror/a8/a8cf38f65f7315f95eba8c803c4a80a9d78cb2ea36fbfee49828396e4a0b9737.jpg",
      },
    ],
  }),
});

function Index() {
  return (
    <ResponsiveHeroBanner
      badgeLabel="New"
      badgeText="First Commercial Flight to Mars 2026"
      title="Journey Beyond Earth"
      titleLine2="Into the Cosmos"
      description="Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable."
      primaryButtonText="Book Your Journey"
      secondaryButtonText="Watch Launch"
      ctaButtonText="Reserve Seat"
      partnersTitle="Partnering with leading space agencies worldwide"
    />
  );
}
