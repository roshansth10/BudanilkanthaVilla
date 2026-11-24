import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Budhanilkantha Villa | Luxury Living in Kathmandu" },
      {
        name: "description",
        content:
          "Discover private luxury living, sweeping hill views, and modern comfort at Budhanilkantha Villa in Kathmandu.",
      },
      { property: "og:title", content: "Budhanilkantha Villa | Luxury Living" },
      {
        property: "og:description",
        content: "A private luxury villa surrounded by nature in Budhanilkantha, Kathmandu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
