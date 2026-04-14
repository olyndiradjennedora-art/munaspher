import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/AboutSection";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "A Propos — MUNA'SPHERE-RCA" }] }),
  component: AboutSection,
});
