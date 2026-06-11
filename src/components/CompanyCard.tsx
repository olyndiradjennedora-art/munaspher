import { useState } from "react";
import { imageUrlFor } from "@/lib/sanity";
// Local fallback type for Sanity images to avoid requiring @types/sanity during dev type-checks
// Use 'unknown' to avoid eslint rule against explicit 'any'
type SanityImageAsset = { asset?: { _ref?: string; _type?: string }; alt?: string };

interface CompanyCardProps {
  name: string;
  image?: SanityImageAsset;
  index?: number;
}

export function CompanyCard({ name, image, index = 0 }: CompanyCardProps) {
  const [imageError, setImageError] = useState(false);

  // Build image URL from Sanity asset reference
  const getImageUrl = (imageObj?: SanityImageAsset | undefined) => {
    const ref = imageObj?.asset?._ref;
    if (!ref) return null;
    // If we already have an absolute URL, return as-is
    if (ref.startsWith("http")) return ref;
    // Use central helper to construct a stable CDN URL
    return imageUrlFor(ref);
  };

  const imageUrl = getImageUrl(image);

  return (
    <div className="group relative bg-[var(--color-card)] text-[var(--color-card-foreground)] rounded-lg border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Image principale (vraie image, object-cover) */}
      <div className="relative w-full h-28 bg-[var(--color-muted)]">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-primary)] flex items-center justify-center">
            <span className="text-2xl font-bold text-[var(--color-primary-foreground)]">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Company Name */}
      <p className="px-2 py-2 text-sm font-medium text-center text-[var(--color-foreground)] line-clamp-2">
        {name}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300" />
    </div>
  );
}
