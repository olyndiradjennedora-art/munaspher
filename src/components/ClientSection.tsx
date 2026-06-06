import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CategoryBar } from "./CategoryBar";
import { SectorCard } from "./SectorCard";
import { useSectors } from "@/lib/content";

const revealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.6, delay: i * 0.08 } }),
};

// Largeur de carte adaptée au nombre de compagnies, pour un agencement équilibré.
function spanClass(companyCount: number): string {
  if (companyCount >= 10) return "md:col-span-12";
  if (companyCount >= 3) return "md:col-span-6";
  return "md:col-span-4";
}

export function ClientSection() {
  const { t } = useTranslation();
  const { sectors, loading } = useSectors();

  const categories = useMemo(() => sectors.map((s) => s.name), [sectors]);

  return (
    <section id="clients" className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.clients')}
        </motion.h2>
        {categories.length > 0 && <CategoryBar items={categories} />}

        <div className="h-1 w-8 rounded-full mt-1" />
        <p className="text-lg max-w-4xl mx-auto text-center mt-6">
          Ils nous ont fait confiance — Découvrez les différents secteurs
          d'activités et compagnies avec lesquels nous travaillons
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <div className="h-1 w-8 bg-secondary rounded-full" />
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="md:col-span-6 h-48 rounded-xl bg-muted-foreground/10 animate-pulse" />
              ))}
            </div>
          ) : sectors.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Aucun secteur disponible pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {sectors.map((sector, index) => (
                <div key={sector._id} className={`col-span-1 ${spanClass(sector.companies.length)}`}>
                  <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index}>
                    <SectorCard
                      title={sector.name}
                      description={sector.description}
                      companies={sector.companies}
                      index={index}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Vous souhaitez rejoindre nos clients satisfaits ?
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl">
            Nous Contacter
          </a>
        </div>
      </div>
    </section>
  );
}

export default ClientSection;
