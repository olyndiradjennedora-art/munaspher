import { useState } from "react";
// Local fallback type for Sanity images to avoid requiring @types/sanity during dev type-checks
// Use 'unknown' to avoid eslint rule against explicit 'any'
type SanityImageAsset = { asset?: { _ref?: string; _type?: string }; alt?: string };

interface CompanyCardProps {
  name: string;
  logo?: SanityImageAsset;
  index?: number;
}

export function CompanyCard({ name, logo, index = 0 }: CompanyCardProps) {
  const [imageError, setImageError] = useState(false);

  // Simplified image handling to avoid external dependencies in dev
  const getImageUrl = (logoObj?: SanityImageAsset | undefined) => {
    const ref = logoObj?.asset?._ref;
    if (!ref) return null;
    // If we receive a full URL (unlikely), return as-is
    if (ref.startsWith("http")) return ref;
    // Otherwise avoid constructing fragile Sanity CDN URLs here; return null so fallback avatar is used
    return null;
  };

  const imageUrl = getImageUrl(logo);

  return (
    <div className="group relative min-h-[64px] bg-var-card text-var-card-foreground rounded-lg border border-var-color-border shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center p-2 overflow-hidden">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-var-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
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
            <div className="w-14 h-14 rounded-lg bg-blue-400 flex items-center justify-center border border-blue-400 group-hover:border-blue-500 transition-colors">
              <span className="text-base font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Company Name */}
        <p className="text-sm font-medium text-var-muted-foreground text-center line-clamp-2 group-hover:text-var-color-foreground transition-colors">
          {name}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-400 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
