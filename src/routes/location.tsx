import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/pages/location-page";

export const Route = createFileRoute("/location")({ component: LocationPage });
