import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { SectorCard } from "./SectorCard";

// Types pour les données Sanity
interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface Client {
  _id: string;
  name: string;
  logo?: SanityImage;
  sector: {
    _id: string;
    name: string;
    description?: string;
    order?: number;
  };
  order?: number;
}

interface ClientSectionProps {
  clients?: Client[];
}

// Données par défaut pour affichage initial (avant intégration Sanity complète)
const defaultSectors = [
  {
    id: "humanitarian",
    title: "Secteur Humanitaire",
    description: "Organisations humanitaires et de développement",
    companies: [
      "PNUD",
      "MINUSCA",
      "USAID (FROM THE AMERICAN PEOPLE)",
      "World Vision",
      "FAO",
      "AGETIP-CAF",
      "Médecins du Monde",
      "ONUSIDA",
      "Solidarités International",
      "CPS",
      "ACAMS",
      "ANE",
      "Taerfund",
      "UN",
      "Croix-Rouge Centrafrique",
      "Search for Common Ground",
      "Médecins Sans Frontières (MSF)",
      "Alliance Française Bangui",
      "Alima",
      "International Rescue Committee",
    ],
  },
  {
    id: "assurance",
    title: "Secteur Assurance",
    description: "Compagnies d'assurance et services financiers",
    companies: ["ASCOMA Centrafrique", "SUNU Assurances"],
  },
  {
    id: "automobile_distribution",
    title: "Secteur Distribution Automobile",
    description: "Distribution et services automobiles",
    companies: ["CFAO"],
  },
  {
    id: "bois",
    title: "Secteur Bois",
    description: "Exploitation et traitement du bois",
    companies: ["CENTRABOIS (La Centrafricaine des bois)"],
  },
  {
    id: "distribution",
    title: "Secteur Distribution",
    description: "Commerce et distribution générale",
    companies: ["QUIFEUROU", "SF"],
  },
  {
    id: "compagnie_aerienne",
    title: "Secteur Compagnie Aérienne",
    description: "Transport aérien",
    companies: ["Royal Air Maroc"],
  },
  {
    id: "bancaire",
    title: "Secteur Bancaire",
    description: "Services bancaires et financiers",
    companies: ["Ecobank", "Banque Populaire Maroco-Centrafricaine", "BGFI Bank"],
  },
  {
    id: "telephonie_mobile",
    title: "Secteur Téléphonie Mobile",
    description: "Télécommunications et services mobiles",
    companies: ["Moov Africa Centrafrique", "Orange", "Moov (No Limit)", "Telecel"],
  },
  {
    id: "petrolier",
    title: "Secteur Pétrolier",
    description: "Secteur énergétique et pétrolier",
    companies: ["Tradex", "TotalEnergies"],
  },
  {
    id: "agro_alimentaire_brassicole",
    title: "Secteur Agro-alimentaire & Brassicole",
    description: "Agroalimentaire, brasserie et production agricole",
    companies: ["Nestlé", "SUCAF Centrafrique"],
  },
];

export function ClientSection({ clients }: ClientSectionProps) {
  // Organiser les clients par secteur si les données Sanity sont fournies
  const { t } = useTranslation();
  const sectors = clients
    ? organizeBySector(clients)
    : defaultSectors.map((sector) => ({
        _id: sector.id,
        name: sector.title,
        description: sector.description,
        companies: sector.companies.map((name, idx) => ({
          _id: `${sector.id}-${idx}`,
          name,
          order: idx,
        })),
        order: defaultSectors.indexOf(sector),
      }));

  const sortedSectors = [...sectors].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  return (
    <section id="clients" className="py-24 px-4 bg-[var(--hero-bg)] text-[var(--color-foreground)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.clients')}
        </motion.h2>
          <div className="h-1 w-8  rounded-full mt-1" />
          <p className="text-lg max-w-2xl mx-auto">
            Ils nous ont fait confiance — Découvrez les différents secteurs
            d'activités avec lesquels nous travaillons
          </p>
          
          <div className="mt-6 flex justify-center gap-3">
            <div className="h-1 w-12 bg-[var(--primary)] rounded-full" />
            <div className="h-1 w-8 bg-[var(--secondary)] rounded-full" />
            <br />
          </div>

        {/* Sectors Grid - explicit layout rows for better presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6">
          {/* Build a lookup for quick access */}
          {(() => {
            const sectorById = new Map(sortedSectors.map((s) => [s._id, s]));

            // Desired layout by rows (explicit order)
            const layout: Array<{ ids: string[]; spanClass: string }> = [
              // Row 1: Humanitarian - full width
              { ids: ["humanitarian"], spanClass: "md:col-span-12 lg:col-span-12" },
              // Row 2: Banking + Mobile - two columns
              { ids: ["bancaire", "telephonie_mobile"], spanClass: "md:col-span-6 lg:col-span-6" },
              // Row 3: Three single-company cards - three columns
              { ids: ["automobile_distribution", "compagnie_aerienne", "bois"], spanClass: "md:col-span-4 lg:col-span-4" },
              // Row 4: Four cards with two companies each - four columns
              { ids: ["assurance", "distribution", "petrolier", "agro_alimentaire_brassicole"], spanClass: "md:col-span-3 lg:col-span-3" },
            ];

            const nodes: ReactElement[] = [];
            let index = 0;

            // Render sectors in the explicit layout order if they exist
            for (const row of layout) {
              for (const id of row.ids) {
                const sector = sectorById.get(id);
                if (sector) {
                  nodes.push(
                    <div key={sector._id} className={`col-span-1 ${row.spanClass}`}>
                      <SectorCard
                        title={sector.name}
                        description={sector.description}
                        companies={sector.companies}
                        index={index}
                      />
                    </div>
                  );
                  index += 1;
                  sectorById.delete(id);
                }
              }
            }

            // Render any remaining sectors (fall back to two-columns)
            for (const sector of sectorById.values()) {
              nodes.push(
                <div key={sector._id} className={`col-span-1 md:col-span-6 lg:col-span-6`}>
                  <SectorCard
                    title={sector.name}
                    description={sector.description}
                    companies={sector.companies}
                    index={index}
                  />
                </div>
              );
              index += 1;
            }

            return nodes;
          })()}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[var(--muted-foreground)] text-lg mb-6">
            Vous souhaitez rejoindre nos clients satisfaits ?
          </p>
          <button className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl">
            Nous Contacter
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Fonction utilitaire pour organiser les clients par secteur
function organizeBySector(clients: Client[]) {
  const sectorMap = new Map<
    string,
    {
      _id: string;
      name: string;
      description?: string;
      companies: Array<{
        _id: string;
        name: string;
        logo?: SanityImage;
        order?: number;
      }>;
      order?: number;
    }
  >();

  clients.forEach((client) => {
    const sectorId = client.sector._id;
    if (!sectorMap.has(sectorId)) {
      sectorMap.set(sectorId, {
        _id: sectorId,
        name: client.sector.name,
        description: client.sector.description,
        companies: [],
        order: client.sector.order,
      });
    }
    sectorMap.get(sectorId)!.companies.push({
      _id: client._id,
      name: client.name,
      logo: client.logo,
      order: client.order,
    });
  });

  return Array.from(sectorMap.values());
}

