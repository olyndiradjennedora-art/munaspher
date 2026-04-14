import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — PODMO" }] }),
  component: Team,
});

function Team() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Team (placeholder)</h1>
        <p className="text-muted-foreground mb-6">Meet the team page placeholder.</p>
        <Link to="/contact" className="lime-btn px-6 py-3">Contact a team member</Link>
      </div>
    </main>
  );
}
