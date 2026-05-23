import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { CategoryBar } from "./CategoryBar";
import serviceBrand from "@/assets/service-brand.jpg";
import service1 from "@/assets/service-1.png"
import service2 from "@/assets/service-2.png"
import service3 from "@/assets/service-3.png"
import service4 from "@/assets/service-4.png"
import service5 from "@/assets/service-5.png"
import service6 from "@/assets/service-6.png"
import service7 from "@/assets/service-7.png"
import service8 from "@/assets/service-8.png"
import service9 from "@/assets/service-9.png"
import client from "@/lib/sanity";

function slugify(s: string) {
  return encodeURIComponent(
    s
      .toLowerCase()
      .replace(/[\s/]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  );
}

type Service = {
  _id?: string;
  title: string;
  slug?: string | { current?: string };
  category?: string;
  description?: string;
  icon?: string;
};

export function ServicesGridSection() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    client
      .fetch<Service[]>('*[_type == "service"]{_id, title, slug, category, description, icon}')
      .then((data) => setServices(data || []))
      .catch(() => setServices([]));
  }, []);

  const list = services.length ? services : [
    { title: 'Création Graphic', description: 'Conception de supports visuels professionnels tels que des logos, affiches,cartes de visite et chartes graphiques pour renforcer l\'image de marque.', icon: service1 },
    { title: 'Imprimérie & Production des Gadgets', description: 'Impression des supports publicitaires et fabrication de gadgets personnalisés comme t-shirts, stylos, calendriers, kakémonos et objets promotionnels.', icon: service2 },
    { title: 'Achat d\'espace & Médias', description: 'Gestion de la diffusion publicitaire sur les médias (radio, TV, presse, web) en choississant les meilleurs canaux pour toucher la cible souhaitée.', icon: service3 },
    { title: 'Veille Concurrentielle, Pige, Média & Monitoring', description: 'Analyse des actions des concurrents suivi des retombées médiatiques et surveillance de la présence d\'une marque dans les médias.', icon: service4 },
    { title: 'Digital', description: 'Développement de la présence en ligne à travers les réseaux sociaux, le marketing digital, la création de contenu web et les compagnes publicitaires numériques.', icon: service5 },
    { title: 'Relations de Presse (RP)', description: 'Gestion des relations avec les journalistes et médias afin d\'assurer une bonne visibilité, la diffusion des informations et la valorisation de l\'image de l\'entreprise.', icon: service6 },
    { title: 'Renforcement des Capacités', description: 'Organisation de formatios, ateliers et accompagnements professionnels pour améliorer les compétences des équipes et optimiser leurs performances.', icon: service7 },
    { title: 'Expertise & Mass Market, Activation Terrain', description: 'Mise en place d\'action marketing directes sur le terrain pour promouvoir les produits, engager les consommations et accroître la visibilité de la marque.', icon: service8 },
    { title: 'Evènementiel', description: 'Conception, organisation et gestion d\'évènements professionnels ou promotionnels tels que lancements, conférences, salon et animation de marque.', icon: service9 },
  ];

  return (
    <section id="services" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.services')}
        </motion.h2>
        <CategoryBar />

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map((service, i) => {
              const slug = typeof service.slug === "string"
                ? service.slug
                : service.slug?.current || service._id || slugify(service.title || `service-${i}`);
              return (
                <a key={slug} href={`/services/${slug}`} className="block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow">
                  <div className="w-full h-44 bg-muted-foreground/5">
                    <img src={service.icon || serviceBrand} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
