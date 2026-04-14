import { createFileRoute } from "@tanstack/react-router";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Equipe — MUNA'SPHERE-RCA" }] }),
  component: TeamSection,
});
