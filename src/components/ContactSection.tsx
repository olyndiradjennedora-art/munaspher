import React, { useState } from "react";
import { toast } from "sonner";

const defaultSectors = [
  { id: "humanitarian", title: "Secteur Humanitaire", companies: ["PNUD","MINUSCA","USAID (FROM THE AMERICAN PEOPLE)","World Vision","FAO"] },
  { id: "assurance", title: "Secteur Assurance", companies: ["ASCOMA Centrafrique","SUNU Assurances"] },
  { id: "automobile_distribution", title: "Secteur Distribution Automobile", companies: ["CFAO"] },
  { id: "bois", title: "Secteur Bois", companies: ["CENTRABOIS (La Centrafricaine des bois)"] },
  { id: "distribution", title: "Secteur Distribution", companies: ["QUIFEUROU","SF"] },
  { id: "compagnie_aerienne", title: "Secteur Compagnie Aérienne", companies: ["Royal Air Maroc"] },
  { id: "bancaire", title: "Secteur Bancaire", companies: ["Ecobank","Banque Populaire Maroco-Centrafricaine","BGFI Bank"] },
  { id: "telephonie_mobile", title: "Secteur Téléphonie Mobile", companies: ["Moov Africa Centrafrique","Orange","Moov (No Limit)","Telecel"] },
  { id: "petrolier", title: "Secteur Pétrolier", companies: ["Tradex","TotalEnergies"] },
  { id: "agro_alimentaire_brassicole", title: "Secteur Agro-alimentaire & Brassicole", companies: ["Nestlé","SUCAF Centrafrique"] },
];

const serviceTypes = [
  "Stratégie de communication",
  "Identité visuelle / Branding",
  "Digital / Site web",
  "Production audiovisuelle",
  "Relations presse / RP",
  "Conseil & formation",
  "Autre",
];

export function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState<string>(defaultSectors[0].id);
  const [company, setCompany] = useState<string>(defaultSectors[0].companies[0]);
  const [service, setService] = useState<string>(serviceTypes[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sectorObj = defaultSectors.find((s) => s.id === sector) ?? defaultSectors[0];

  function resetForm() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setSector(defaultSectors[0].id);
    setCompany(defaultSectors[0].companies[0]);
    setService(serviceTypes[0]);
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      toast.error("Veuillez renseigner votre nom, prénom et téléphone.");
      return;
    }

    setSubmitting(true);
    // Simuler envoi — ici on log et affiche un message de succès
    try {
      const payload = { firstName, lastName, phone, sector, company, service, message };
      console.log("Contact submit", payload);
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Message envoyé — Nous vous contacterons bientôt.");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi. Réessayez plus tard.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen py-20 px-6 bg-background text-[var(--color-foreground)]">
      <div className="max-w-4xl mx-auto bg-[var(--color-card)] p-8 rounded-2xl shadow-lg border border-[var(--color-border)]">
        <header className="mb-6">
          <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>Contactez MUNA'SPHERE</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Parlez-nous de votre projet — choisissez votre secteur, compagnie et le service souhaité.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Prénom</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" />
          </div>

          <div className="col-span-1">
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Nom</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Téléphone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+236 7X XX XX XX" required className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Secteur d'activité</label>
            <select value={sector} onChange={(e) => { setSector(e.target.value); const s = defaultSectors.find((x) => x.id === e.target.value); setCompany(s?.companies[0] ?? ""); }} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background">
              {defaultSectors.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Compagnie</label>
            <select value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background">
              {(sectorObj?.companies ?? []).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Type de service souhaité</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background">
              {serviceTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre projet, brief ou question..." rows={6} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" />
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <div className="text-sm text-[var(--muted-foreground)]">Nous répondrons sous 48h.</div>
            <button type="submit" disabled={submitting} className="lime-btn px-6 py-3 rounded-lg font-semibold">
              {submitting ? "Envoi..." : "Envoyer la demande"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ContactSection;
