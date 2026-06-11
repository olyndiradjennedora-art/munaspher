import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import serviceBrand from "@/assets/service-brand.jpg";
import client, { imageUrlFor } from "@/lib/sanity";

type ServiceDetail = {
  _id?: string;
  title: string;
  description?: string;
  icon?: { asset?: { _ref?: string; url?: string }; alt?: string } | string;
  items?: string[];
};

export const Route = createFileRoute("/services/$slug")({
  head: () => ({ meta: [{ title: "Service — MUNA'SPHERE-RCA" }] }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);
    client
      .fetch<ServiceDetail | null>(
        '*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{_id, title, description, icon, items}',
        { slug },
      )
      .then((res) => {
        if (!mounted) return;
        setService(res ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setService(null);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="h-64 rounded-lg bg-muted-foreground/10 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Service introuvable</h1>
          <p className="mt-4 text-muted-foreground">Le service demandé est introuvable.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg overflow-hidden border bg-card">
          <div className="w-full h-64 bg-muted-foreground/5">
            <img src={(service.icon ? imageUrlFor(service.icon) : null) || serviceBrand} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <p className="text-muted-foreground mb-4">{service.description}</p>

            {service.items && service.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Prestations</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {service.items.map((it: string, idx: number) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
