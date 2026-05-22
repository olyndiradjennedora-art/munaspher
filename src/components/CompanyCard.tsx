import { motion } from "framer-motion";
import { useState } from "react";
// Local fallback type for Sanity images to avoid requiring @types/sanity during dev type-checks
type SanityImageAsset = { _ref?: string } | any;

interface CompanyCardProps {
  name: string;
  logo?: {
    asset?: SanityImageAsset;
    alt?: string;
  };
  index?: number;
}

export function CompanyCard({ name, logo, index = 0 }: CompanyCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fonction pour construire l'URL de l'image Sanity
  const getImageUrl = (asset: { asset?: { _ref: string; _type?: string } }) => {
    if (!asset?.asset?._ref) return null;
    const ref = asset.asset._ref;
    const parts = ref.split('-');
    const format = parts[parts.length - 1];
    return `https://cdn.sanity.io/images/project-id/dataset/${ref}.${format}`;
  };

  const imageUrl = logo?.asset ? getImageUrl(logo) : null;

  return (
    <motion.div
      className="group relative min-h-[80px] bg-[var(--card)] text-[var(--card-foreground)] rounded-lg border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-3 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3">
        {/* Logo Container */}
        <div className="h-16 flex items-center justify-center mb-1">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={name}
              className="max-h-full max-w-[90%] object-contain group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--primary)] transition-colors">
              <span className="text-base font-bold text-[var(--section-light)]">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Company Name */}
        <p className="text-sm font-medium text-[var(--muted-foreground)] text-center line-clamp-2 group-hover:text-[var(--color-foreground)] transition-colors">
          {name}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}
