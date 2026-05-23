import { createFileRoute } from "@tanstack/react-router";
import { TeamGridSection } from "@/components/TeamGridSection";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Equipe — MUNA'SPHERE-RCA" }] }),
  component: TeamGridSection,
});
