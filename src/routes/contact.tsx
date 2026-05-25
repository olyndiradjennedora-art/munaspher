import { createFileRoute } from "@tanstack/react-router";
import ContactSection from "@/components/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — MUNA'SPHERE-RCA" }] }),
  component: ContactSection,
});
