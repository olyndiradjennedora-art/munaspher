import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — PODMO" }] }),
  component: Blog,
});

function Blog() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Blog (placeholder)</h1>
        <p className="text-muted-foreground mb-6">Blog index and posts will be added here.</p>
        <Link to="/blog" className="lime-btn px-6 py-3">View posts</Link>
      </div>
    </main>
  );
}
