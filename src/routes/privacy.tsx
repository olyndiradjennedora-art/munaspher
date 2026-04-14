import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — PODMO" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy (placeholder)</h1>
        <p className="text-muted-foreground">Legal copy goes here.</p>
        <Link to="/contact" className="lime-btn px-6 py-3 mt-6">Contact</Link>
      </div>
    </main>
  );
}
