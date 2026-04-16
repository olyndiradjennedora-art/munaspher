# 🌐 MUNA'SPHERE-RCA Corporate Website

## 🧭 Project Overview

**Brand Name:** MUNA'SPHERE-RCA  
**Also Known As:** MUNA SPHERE-RCA / MUNAS'PHERE  
**Tagline:** DARE TO TAKE ACTION  

**Description:**
MUNA'SPHERE-RCA est une agence leader en marketing et communication digitale
basée en République Centrafricaine. Fondée en 2013, elle accompagne les entreprises
et organisations dans la création de stratégies innovantes et impactantes.

**Brand Attributes:**
- Professionnelle
- Créative
- Multiculturelle
- Dynamique

---

## 🗺️ Sitemap

- Home
- About Us
- Our Expertise (Services)
- Clients
- Team
- Contact 

---

## 🏠 Home

```yaml
home:
  title: "MUNA'SPHERE-RCA"
  tagline: "DARE TO TAKE ACTION"
  hero_description: >
    Agence leader en marketing et communication digitale en République Centrafricaine.
  vision: >
    Être un acteur incontournable de la communication en Afrique centrale en offrant
    des solutions créatives, innovantes et adaptées aux réalités locales.
  cta:
    label: "Découvrir nos services"
    link: "/services"

---
about:
  founded: 2013
  location: "République Centrafricaine (RCA)"
  position: "Agence leader en marketing et communication digitale"
  description: >
    Depuis sa création en 2013, MUNA'SPHERE-RCA s’est imposée comme un acteur majeur
    de la communication en RCA. L’agence conçoit et met en œuvre des stratégies
    innovantes pour accompagner ses clients dans leur croissance.
  identity:
    - Professionnelle
    - Créative
    - Multiculturelle
    - Dynamique
    
---
services:
  - id: "creative-design"
    category: "Création & Design"
    items:
      - "Création de logos"
      - "Design graphique"

  - id: "media-production"
    category: "Média & Production"
    items:
      - "Impression"
      - "Production de gadgets promotionnels"
      - "Achat d’espace publicitaire"

  - id: "digital"
    category: "Digital"
    items:
      - "Stratégie de marketing digital"
      - "Exécution de campagnes digitales"

  - id: "public-relations"
    category: "Relations Publiques & Stratégie"
    items:
      - "Relations presse (RP)"
      - "Veille médiatique"
      - "Veille concurrentielle"

  - id: "events-field"
    category: "Terrain & Événementiel"
    items:
      - "Activation de marque"
      - "Organisation d’événements"
      - "Opérations terrain"

  - id: "capacity-building"
    category: "Renforcement des capacités"
    items:
      - "Formations spécialisées"

---
team:
  executive:
    - name: "NJANJO EDIMO"
      role: "Directeur Général"

  commercial_finance:
    - name: "Jackie BAMENGUE"
      role: "Responsable Commercial"
    - name: "Carine MBOUNGANG"
      role: "Responsable Financière"

  digital_creative:
    - name: "Cecy Cédric LOUTOMO"
      role: "Responsable Digital"
    - name: "Fallone DJEPENO"
      role: "Chef de Publicité"
    - name: "Junior MAIMO"
      role: "Graphiste"
    - name: "Ella KOUNHOUA"
      role: "Infographiste"

  support:
    - name: "Brice"
      role: "Responsable Logistique"
    - name: "Castella GOMBO"
      role: "Technicienne de Surface"

---
clients:
  title: "Ils nous font confiance"
  display: "logo-cloud"
  sectors:
    humanitarian:
      title: "Secteur Humanitaire"
      companies:
        - "PNUD"
        - "MINUSCA"
        - "USAID (FROM THE AMERICAN PEOPLE)"
        - "World Vision"
        - "FAO"
        - "AGETIP-CAF"
        - "Médecins du Monde"
        - "ONUSIDA"
        - "Solidarités International"
        - "CPS"
        - "ACAMS"
        - "ANE"
        - "Taerfund"
        - "UN"
        - "Croix-Rouge Centrafrique"
        - "Search for Common Ground"
        - "Médecins Sans Frontières (MSF)"
        - "Alliance Française Bangui"
        - "Alima"
        - "International Rescue Committee"

    assurance:
      title: "Secteur Assurance"
      companies:
        - "ASCOMA Centrafrique"
        - "SUNU Assurances"

    automobile_distribution:
      title: "Secteur Distribution Automobile"
      companies:
        - "CFAO"

    bois:
      title: "Secteur Bois"
      companies:
        - "CENTRABOIS (La Centrafricaine des bois)"

    distribution:
      title: "Secteur Distribution"
      companies:
        - "QUIFEUROU"
        - "SF"

    compagnie_aerienne:
      title: "Secteur Compagnie Aérienne"
      companies:
        - "Royal Air Maroc"

    bancaire:
      title: "Secteur Bancaire"
      companies:
        - "Ecobank"
        - "Banque Populaire Maroco-Centrafricaine"
        - "BGFI Bank"

    telephonie_mobile:
      title: "Secteur Téléphonie Mobile"
      companies:
        - "Moov Africa Centrafrique"
        - "Orange"
        - "Moov (No Limit)"
        - "Telecel"

    petrolier:
      title: "Secteur Pétrolier"
      companies:
        - "Tradex"
        - "TotalEnergies"

    agro_alimentaire_brassicole:
      title: "Secteur Agro-alimentaire & Brassicole"
      companies:
        - "Nestlé"
        - "SUCAF Centrafrique" 

---
social_media:
  - name: "Facebook"
    icon: "facebook"
    url: "#"

  - name: "Instagram"
    icon: "instagram"
    url: "#"

  - name: "Twitter"
    icon: "twitter"
    url: "#"

  - name: "WhatsApp"
    icon: "whatsapp"
    url: "#"
---
design:
  language: "Français"
  tone: "Professionnel, dynamique, orienté action"
  theme: "Dare to Take Action"
  ui_style:
    - Moderne
    - Épuré
    - Visuel impactant
    - Responsive design
---
implementation:
  architecture: "SPA ou Multi-pages"
  recommended_stack:
    - React / Next.js
    - Tailwind CSS
    - Node.js (backend optionnel)

  components:
    - HeroSection
    - ServiceCard
    - TeamCard
    - ClientLogo
    - Navbar
    - Footer

  features:
    - Section Hero avec Call-To-Action
    - Grille responsive pour services et équipe
    - Carousel ou logo cloud pour clients
    - Footer avec réseaux sociaux
    - Navigation fluide (scroll ou routes)

  seo:
    - Meta tags optimisés
    - Structure sémantique (h1, h2, etc.)
