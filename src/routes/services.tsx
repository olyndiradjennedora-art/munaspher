import { createFileRoute } from "@tanstack/react-router";
import { ServicesGridSection } from "@/components/ServicesGridSection";
export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Services — MUNA'SPHERE-RCA" }] }),
  component: ServicesGridSection,
});
