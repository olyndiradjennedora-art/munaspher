import { createFileRoute } from "@tanstack/react-router";
import { BlogSection } from "@/components/BlogSection";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Publications — MUNA'SPHERE-RCA" }] }),
  component: BlogSection,
});
