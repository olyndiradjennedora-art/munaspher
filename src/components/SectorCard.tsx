import { motion } from "framer-motion";
import { CompanyCard } from "./CompanyCard";

interface Company {
  _id: string;
  name: string;
  logo?: {
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
    <motion.div
      className="bg-[var(--color-card)] text-[var(--card-foreground)] rounded-xl border border-[var(--color-border)] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-3 py-3 border-b border-[var(--sidebar-border)]/20">
        <h3 className="text-xl font-bold text-[var(--primary-foreground)] mb-2">{title}</h3>
        {description && (
          <p className="text-[var(--secondary-foreground)] text-sm line-clamp-2">{description}</p>
        )}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-1 bg-[var(--secondary)] rounded-full" />
          <span className="text-xs font-semibold text-[var(--secondary-foreground)] uppercase tracking-wide">
            {sortedCompanies.length} compagnie{sortedCompanies.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        {sortedCompanies.length > 0 ? (
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}>
            {sortedCompanies.map((company, idx) => (
              <CompanyCard
                key={company._id}
                name={company.name}
                logo={company.logo}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              Aucune compagnie pour ce secteur
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
