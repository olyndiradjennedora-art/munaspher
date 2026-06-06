import { createFileRoute } from "@tanstack/react-router";
import { ClientSection } from "@/components/ClientSection";

export const Route = createFileRoute("/clients")({  
    head: () => ({ meta: [{ title: "Clients — MUNA'SPHERE-RCA" }] }),
    component: ClientSection,
});


