import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-foreground mb-4">{sector.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sector.companies.map((company) => {
          const slug = company
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          const logoSrc = `/logos/${slug}.png`;

          return (
            <div
              key={company}
              className="flex items-center gap-3 p-2 bg-background rounded border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 relative overflow-hidden flex-shrink-0">
                <img src={logoSrc} alt={company} className="object-cover w-full h-full" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-base font-bold text-primary">{CompanyInitial(company)}</span>
              </div>

              <span className="text-sm font-medium text-foreground line-clamp-2">
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
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Clients</h1>
          <p className="text-lg text-muted-foreground">
            Ils nous font confiance — Découvrez les secteurs d'activités avec lesquels nous travaillons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <SectorCard key={sector.key} sector={sector} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/clients")({
  head: () => ({ meta: [{ title: "Clients — MUNA'SPHERE-RCA" }] }),
  component: ClientsPage,
});
