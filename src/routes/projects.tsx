import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/ProjectsSection";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Realisations — MUNA'SPHERE-RCA" }] }),
  component: ProjectsSection,
});
