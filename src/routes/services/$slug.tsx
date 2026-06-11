import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import serviceBrand from "@/assets/service-brand.jpg";
import client, { imageUrlFor } from "@/lib/sanity";

type ServiceDetail = {
  _id?: string;
  title: string;
  category?: string;
  description?: string;
  detailedDescription?: string;
  features?: string[];
  image?: { asset?: { _ref?: string; url?: string }; alt?: string } | string;
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
        `*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{
          _id, title, category, description, detailedDescription, features,
          "image": coalesce(image, icon)
        }`,
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
          <div className="h-72 rounded-xl bg-muted-foreground/10 animate-pulse" />
          <div className="mt-6 h-8 w-1/2 rounded bg-muted-foreground/10 animate-pulse" />
          <div className="mt-4 h-4 w-full rounded bg-muted-foreground/10 animate-pulse" />
          <div className="mt-2 h-4 w-2/3 rounded bg-muted-foreground/10 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Service introuvable</h1>
          <p className="mt-4 text-muted-foreground">Le service demandé est introuvable.</p>
          <Link to="/services" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-95 transition">
            <ArrowLeft className="w-4 h-4" /> Retour aux services
          </Link>
        </div>
      </section>
    );
  }

  const imgSrc = (service.image ? imageUrlFor(service.image) : null) || serviceBrand;
  // La description détaillée est saisie en texte ; on la découpe en paragraphes.
  const paragraphs = (service.detailedDescription || service.description || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Tous les services
        </Link>

        <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
          <div className="relative w-full h-64 md:h-80 bg-muted-foreground/5">
            <img src={imgSrc} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              {service.category && (
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-primary text-primary-foreground rounded-full">
                  {service.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">{service.title}</h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {paragraphs.length > 0 ? (
              <div className="space-y-4 text-base leading-relaxed text-foreground/90">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune description détaillée pour le moment.</p>
            )}

            {service.features && service.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Nos prestations</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 shrink-0 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-4">
              <p className="text-sm text-muted-foreground">Intéressé par ce service ?</p>
              <Link to="/contact" className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-95 transition shadow">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
