import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import serviceBrand from "@/assets/service-brand.jpg";
import client from "@/lib/sanity";

type ServiceDetail = {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  items?: string[];
};

const servicesData = [
  { id: 'creative-design', title: "Création & Design", description: "Création de logos, design graphique et identités visuelles.", image: serviceBrand },
  { id: 'media-production', title: "Média & Production", description: "Impression, production de gadgets promotionnels et achat d'espace publicitaire.", image: serviceBrand },
  { id: 'digital', title: "Digital", description: "Stratégie de marketing digital, exécution de campagnes et analytics.", image: serviceBrand },
  { id: 'public-relations', title: "Relations Publiques & Stratégie", description: "Relations presse, veille médiatique et stratégie de communication.", image: serviceBrand },
  { id: 'events-field', title: "Terrain & Événementiel", description: "Activation de marque, organisation d'événements et opérations terrain.", image: serviceBrand },
  { id: 'capacity-building', title: "Renforcement des capacités", description: "Formations spécialisées et ateliers pour équipes.", image: serviceBrand },
 ] satisfies ServiceDetail[];

export const Route = createFileRoute("/services/$slug")({
  head: () => ({ meta: [{ title: "Service — MUNA'SPHERE-RCA" }] }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    if (!slug) return;
    // try to fetch from Sanity first
    client
      .fetch<ServiceDetail | null>(
        '*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{_id, title, description, icon, items}',
        { slug },
      )
      .then((res) => {
        if (res && (res.title || res.description)) {
          setService(res);
        } else {
          const local = servicesData.find((s) => s.id === slug || slug === s.title?.toLowerCase().replace(/\s+/g, '-'));
          setService(local || null);
        }
      })
      .catch(() => {
        const local = servicesData.find((s) => s.id === slug || slug === s.title?.toLowerCase().replace(/\s+/g, '-'));
        setService(local || null);
      });
  }, [slug]);

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
            <img src={service.icon || (service.image ?? serviceBrand)} alt={service.title} className="w-full h-full object-cover" />
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
