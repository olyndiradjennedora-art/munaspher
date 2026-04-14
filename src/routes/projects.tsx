import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — PODMO" }] }),
  component: Projects,
});

function Projects() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Projects (placeholder)</h1>
        <p className="text-muted-foreground mb-6">Project list and details will live here.</p>
        <Link to="/contact" className="lime-btn px-6 py-3">Start a project</Link>
      </div>
    </main>
  );
}
