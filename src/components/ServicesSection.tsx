import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CategoryBar } from "./CategoryBar";
import serviceBrand from "@/assets/service-brand.jpg";
import client from "@/lib/sanity";

export function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch('*[_type == "service"]{_id, title, slug, category, description, icon}')
      .then((data: any[]) => setServices(data || []))
      .catch(() => setServices([]));
  }, []);

  const list = services.length ? services : [
    { title: 'Création & Design', description: 'Création de logos, design graphique' },
    { title: 'Média & Production', description: 'Impression, gadgets, achat d\'espace' },
    { title: 'Digital', description: 'Stratégie et exécution de campagnes digitales' },
  ];

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SERVICES
        </motion.h2>
        <CategoryBar />

        <div className="mt-8">
          {list.map((service, i) => (
            <div
              key={service._id || i}
              className="service-row group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                {i < 9 ? `0${i + 1}.` : `${i + 1}.`}
              </span>
              <span
                className={`text-lg tracking-wider ${service.bold || hovered === i ? 'font-black' : 'font-medium'}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {service.title}
              </span>
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  {service.description}
                </p>
                {hovered === i && (
                  <motion.img
                    src={serviceBrand}
                    alt="Service"
                    className="w-24 h-16 object-cover rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    loading="lazy"
                    width={600}
                    height={512}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

