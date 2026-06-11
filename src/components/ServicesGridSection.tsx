import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { CategoryBar } from "./CategoryBar";
import serviceBrand from "@/assets/service-brand.jpg";
import s1 from "@/assets/service-1.png";
import s2 from "@/assets/service-2.png";
import s3 from "@/assets/service-3.png";
import s4 from "@/assets/service-4.png";
import s5 from "@/assets/service-5.png";
import s6 from "@/assets/service-6.png";
import s7 from "@/assets/service-7.png";
import s8 from "@/assets/service-8.png";
import s9 from "@/assets/service-9.png";
import { useServices, serviceSlug } from "@/lib/content";
import { imageUrlFor } from "@/lib/sanity";

const localServiceImgs = [s1, s2, s3, s4, s5, s6, s7, s8, s9];

export function ServicesGridSection() {
  const { t } = useTranslation();
  const { services, loading } = useServices();

  return (
    <section id="services" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          style={{fontSize : "50px"}}
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-lg bg-muted-foreground/10 animate-pulse" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Aucun service disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                  const slug = serviceSlug(service);
                  const iconUrl = service.icon ? imageUrlFor(service.icon) : null;
                  const fallbackLocal = localServiceImgs[idx % localServiceImgs.length] || serviceBrand;
                  const imgSrc = iconUrl || fallbackLocal || serviceBrand;
                  return (
                    <a key={slug} href={`/services/${slug}`} className="block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow">
                      <div className="w-full h-44 bg-muted-foreground/5">
                        <img src={imgSrc} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-base">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
