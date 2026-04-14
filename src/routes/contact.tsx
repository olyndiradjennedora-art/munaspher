import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — PODMO" }] }),
  component: Contact,
});

function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Contact (placeholder)</h1>
        <p className="text-muted-foreground mb-6">Contact form or booking widget goes here.</p>
        <Link to="/" className="lime-btn px-6 py-3">Back to home</Link>
      </div>
    </main>
  );
}
