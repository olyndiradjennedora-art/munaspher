import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — PODMO" }] }),
  component: Terms,
});

function Terms() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Terms of Service (placeholder)</h1>
        <p className="text-muted-foreground">Terms copy goes here.</p>
        <Link to="/contact" className="lime-btn px-6 py-3 mt-6">Contact</Link>
      </div>
    </main>
  );
}
