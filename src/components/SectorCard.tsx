import { motion, Variants } from "framer-motion";
import { CompanyCard } from "./CompanyCard";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

interface Company {
  _id: string;
  name: string;
  image?: {
    asset?: { _ref?: string; _type?: string };
    alt?: string;
  };
  order?: number;
}

interface SectorCardProps {
  title: string;
  description?: string;
  companies: Company[];
  index?: number;
}

export function SectorCard({
  title,
  description,
  companies,
  index = 0,
}: SectorCardProps) {
  // Trier les compagnies par ordre d'affichage
  const sortedCompanies = [...companies].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  return (
    <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index} className="bg-[var(--color-card)] text-[var(--color-card-foreground)] rounded-xl border border-[var(--color-border)] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="bg-[var(--color-primary)] px-3 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-xl font-bold text-[var(--color-primary-foreground)] mb-2">{title}</h3>
        {description && (
          <p className="text-[var(--color-primary-foreground)]/90 text-sm line-clamp-2">{description}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
                  <div className="w-8 h-1 bg-[var(--color-hero-foreground)]/70 rounded-full" />
                  <span className="text-xs font-semibold text-[var(--color-primary-foreground)]/90 uppercase tracking-wide">
            {sortedCompanies.length} compagnie{sortedCompanies.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        {sortedCompanies.length > 0 ? (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
            {sortedCompanies.map((company, idx) => (
              <CompanyCard
                key={company._id}
                name={company.name}
                image={company.image}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-muted-foreground)] text-sm">
              Aucune compagnie pour ce secteur
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
