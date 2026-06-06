/**
 * Amorçage (seed) du dataset Sanity pour MUNA'SPHERE.
 *
 * Idempotent : chaque document a un `_id` déterministe, donc relancer le script
 * met à jour les documents existants au lieu d'en créer des doublons.
 *
 * Usage (PowerShell) :
 *   $env:SANITY_WRITE_TOKEN = "<ton-token-editor>"; bun scripts/seed-sanity.ts
 * Usage (bash) :
 *   SANITY_WRITE_TOKEN=<ton-token-editor> bun scripts/seed-sanity.ts
 *
 * Génère le token sur https://www.sanity.io/manage → projet vt6o5liv → API → Tokens (rôle Editor).
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("✗ SANITY_WRITE_TOKEN manquant. Définis-le avant de lancer le script.");
  process.exit(1);
}

const client = createClient({
  projectId: "vt6o5liv",
  dataset: "production",
  apiVersion: "2024-04-01",
  token,
  useCdn: false,
});

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface SeedSector {
  id: string;
  name: string;
  description: string;
  companies: string[];
}

const sectors: SeedSector[] = [
  {
    id: "humanitarian",
    name: "Secteur Humanitaire",
    description: "Organisations humanitaires et de développement",
    companies: [
      "PNUD", "MINUSCA", "USAID (FROM THE AMERICAN PEOPLE)", "World Vision", "FAO",
      "AGETIP-CAF", "Médecins du Monde", "ONUSIDA", "Solidarités International", "CPS",
      "ACAMS", "ANE", "Taerfund", "UN", "Croix-Rouge Centrafrique",
      "Search for Common Ground", "Médecins Sans Frontières (MSF)", "Alliance Française Bangui",
      "Alima", "International Rescue Committee",
    ],
  },
  {
    id: "assurance",
    name: "Secteur Assurance",
    description: "Compagnies d'assurance et services financiers",
    companies: ["ASCOMA Centrafrique", "SUNU Assurances"],
  },
  {
    id: "automobile_distribution",
    name: "Secteur Distribution Automobile",
    description: "Distribution et services automobiles",
    companies: ["CFAO"],
  },
  {
    id: "bois",
    name: "Secteur Bois",
    description: "Exploitation et traitement du bois",
    companies: ["CENTRABOIS (La Centrafricaine des bois)"],
  },
  {
    id: "distribution",
    name: "Secteur Distribution",
    description: "Commerce et distribution générale",
    companies: ["QUIFEUROU", "SF"],
  },
  {
    id: "compagnie_aerienne",
    name: "Secteur Compagnie Aérienne",
    description: "Transport aérien",
    companies: ["Royal Air Maroc"],
  },
  {
    id: "bancaire",
    name: "Secteur Bancaire",
    description: "Services bancaires et financiers",
    companies: ["Ecobank", "Banque Populaire Maroco-Centrafricaine", "BGFI Bank"],
  },
  {
    id: "telephonie_mobile",
    name: "Secteur Téléphonie Mobile",
    description: "Télécommunications et services mobiles",
    companies: ["Moov Africa Centrafrique", "Orange", "Moov (No Limit)", "Telecel"],
  },
  {
    id: "petrolier",
    name: "Secteur Pétrolier",
    description: "Secteur énergétique et pétrolier",
    companies: ["Tradex", "TotalEnergies"],
  },
  {
    id: "agro_alimentaire_brassicole",
    name: "Secteur Agro-alimentaire & Brassicole",
    description: "Agroalimentaire, brasserie et production agricole",
    companies: ["Nestlé", "SUCAF Centrafrique"],
  },
];

interface SeedService {
  title: string;
  description: string;
}

const services: SeedService[] = [
  { title: "Création Graphic", description: "Conception de supports visuels professionnels tels que des logos, affiches, cartes de visite et chartes graphiques pour renforcer l'image de marque." },
  { title: "Imprimérie & Production des Gadgets", description: "Impression des supports publicitaires et fabrication de gadgets personnalisés comme t-shirts, stylos, calendriers, kakémonos et objets promotionnels." },
  { title: "Achat d'espace & Médias", description: "Gestion de la diffusion publicitaire sur les médias (radio, TV, presse, web) en choisissant les meilleurs canaux pour toucher la cible souhaitée." },
  { title: "Veille Concurrentielle, Pige, Média & Monitoring", description: "Analyse des actions des concurrents, suivi des retombées médiatiques et surveillance de la présence d'une marque dans les médias." },
  { title: "Digital", description: "Développement de la présence en ligne à travers les réseaux sociaux, le marketing digital, la création de contenu web et les campagnes publicitaires numériques." },
  { title: "Relations de Presse (RP)", description: "Gestion des relations avec les journalistes et médias afin d'assurer une bonne visibilité, la diffusion des informations et la valorisation de l'image de l'entreprise." },
  { title: "Renforcement des Capacités", description: "Organisation de formations, ateliers et accompagnements professionnels pour améliorer les compétences des équipes et optimiser leurs performances." },
  { title: "Expertise & Mass Market, Activation Terrain", description: "Mise en place d'actions marketing directes sur le terrain pour promouvoir les produits, engager les consommateurs et accroître la visibilité de la marque." },
  { title: "Evènementiel", description: "Conception, organisation et gestion d'évènements professionnels ou promotionnels tels que lancements, conférences, salons et animation de marque." },
];

async function run() {
  const tx = client.transaction();

  sectors.forEach((sector, sectorIdx) => {
    const sectorId = `sector.${sector.id}`;
    tx.createOrReplace({
      _id: sectorId,
      _type: "sector",
      name: sector.name,
      slug: { _type: "slug", current: slugify(sector.name) },
      description: sector.description,
      order: sectorIdx,
    });

    sector.companies.forEach((companyName, companyIdx) => {
      tx.createOrReplace({
        _id: `client.${sector.id}.${slugify(companyName)}`,
        _type: "client",
        name: companyName,
        slug: { _type: "slug", current: slugify(companyName) },
        sector: { _type: "reference", _ref: sectorId },
        order: companyIdx,
      });
    });
  });

  services.forEach((service, idx) => {
    tx.createOrReplace({
      _id: `service.${slugify(service.title)}`,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: slugify(service.title) },
      description: service.description,
      order: idx,
    });
  });

  const result = await tx.commit();
  const companyCount = sectors.reduce((n, s) => n + s.companies.length, 0);
  console.log(
    `✓ Seed terminé : ${sectors.length} secteurs, ${companyCount} compagnies, ${services.length} services ` +
      `(${result.results.length} documents écrits).`
  );
}

run().catch((err) => {
  console.error("✗ Échec du seed :", err.message ?? err);
  process.exit(1);
});
