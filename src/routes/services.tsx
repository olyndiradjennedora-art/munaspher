import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection } from "@/components/ServicesSection";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Services — MUNA'SPHERE-RCA" }] }),
  component: ServicesSection,
});
