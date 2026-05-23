import { createFileRoute } from "@tanstack/react-router";
import { ClientSection } from "@/components/ClientSection";

export const Route = createFileRoute("/clients")({  
    head: () => ({ meta: [{ title: "Clients — MUNA'SPHERE-RCA" }] }),
    component: ClientSection,
});

interface Sector {
  key: string;
  title: string;
  companies: string[];
}

const sectors: Sector[] = [
  {
    key: 'humanitarian',
    title: 'Secteur Humanitaire',
    companies: [
      'PNUD',
      'MINUSCA',
      'USAID (FROM THE AMERICAN PEOPLE)',
      'World Vision',
      'FAO',
      'AGETIP-CAF',
      'Médecins du Monde',
      'ONUSIDA',
      'Solidarités International',
      'CPS',
      'ACAMS',
      'ANE',
      'Taerfund',
      'UN',
      'Croix-Rouge Centrafrique',
      'Search for Common Ground',
      'Médecins Sans Frontières (MSF)',
      'Alliance Française Bangui',
      'Alima',
      'International Rescue Committee',
    ],
  },
  {
    key: 'assurance',
    title: 'Secteur Assurance',
    companies: ['ASCOMA Centrafrique', 'SUNU Assurances'],
  },
  {
    key: 'automobile_distribution',
    title: 'Secteur Distribution Automobile',
    companies: ['CFAO'],
  },
  {
    key: 'bois',
    title: 'Secteur Bois',
    companies: ['CENTRABOIS (La Centrafricaine des bois)'],
  },
  {
    key: 'distribution',
    title: 'Secteur Distribution',
    companies: ['QUIFEUROU', 'SF'],
  },
  {
    key: 'compagnie_aerienne',
    title: 'Secteur Compagnie Aérienne',
    companies: ['Royal Air Maroc'],
  },
  {
    key: 'bancaire',
    title: 'Secteur Bancaire',
    companies: ['Ecobank', 'Banque Populaire Maroco-Centrafricaine', 'BGFI Bank'],
  },
  {
    key: 'telephonie_mobile',
    title: 'Secteur Téléphonie Mobile',
    companies: ['Moov Africa Centrafrique', 'Orange', 'Moov (No Limit)', 'Telecel'],
  },
  {
    key: 'petrolier',
    title: 'Secteur Pétrolier',
    companies: ['Tradex', 'TotalEnergies'],
  },
  {
    key: 'agro_alimentaire_brassicole',
    title: 'Secteur Agro-alimentaire & Brassicole',
    companies: ['Nestlé', 'SUCAF Centrafrique'],
  },
];

function CompanyInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

function SectorCard({ sector }: { sector: Sector }) {
  const companyCount = sector.companies.length;
  
  // Determine grid layout based on number of companies
  let gridColsClass = 'grid-cols-1';
  
  if (companyCount > 10) {
    // More than 10: 1 card per line
    gridColsClass = 'grid-cols-1';
  } else if (companyCount === 2) {
    // 2 companies: 4 cards per line (for layout purposes, but will show 2)
    gridColsClass = 'grid-cols-2 md:grid-cols-4';
  } else if (companyCount === 3 || companyCount === 4) {
    // 3-4 companies: 2 cards per line
    gridColsClass = 'grid-cols-1 md:grid-cols-2';
  } else if (companyCount === 1) {
    // 1 company: 3 cards per line (but will show 1)
    gridColsClass = 'grid-cols-1 md:grid-cols-3';
  }

  return (
    <div className="bg-gradient-to-br from-card to-card border border-border/60 rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:border-primary/40">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        {sector.title}
      </h2>
      <div className={`grid ${gridColsClass} gap-4`}>
        {sector.companies.map((company) => {
          const slug = company
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          const logoSrc = `/logos/${slug}.png`;

          return (
            <div
              key={company}
              className="group flex items-center gap-4 p-3 bg-gradient-to-br from-background/40 to-background/20 rounded-lg border border-border/40 hover:border-secondary/60 transition-all hover:bg-background/60 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 relative overflow-hidden flex-shrink-0 flex items-center justify-center group-hover:from-primary/50 group-hover:to-secondary/40 transition-all ring-2 ring-border/50">
                <img src={logoSrc} alt={company} className="object-cover w-full h-full" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary group-hover:text-accent transition-colors">{CompanyInitial(company)}</span>
              </div>

              <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                {company}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClientsPage() {
  return (
    <section className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 font-display">
              Nos <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Clients</span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mb-6"></div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ils nous font confiance — Découvrez les secteurs d'activités avec lesquels nous travaillons et les partenaires qui ont choisi Muna'Sphere
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {sectors.map((sector) => (
            <SectorCard key={sector.key} sector={sector} />
          ))}
        </div>
      </div>
    </section>
  );
}
