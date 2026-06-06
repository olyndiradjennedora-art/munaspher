import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CategoryBar } from "./CategoryBar";
import { toast } from "sonner";
import { useSectors, useServices } from "@/lib/content";

export function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { t } = useTranslation();
  const { sectors, loading: sectorsLoading } = useSectors();
  const { services, loading: servicesLoading } = useServices();
  const loading = sectorsLoading || servicesLoading;

  // Barre de catégories dérivée des secteurs Sanity (plus de liste codée en dur).
  const categories = useMemo(() => sectors.map((s) => s.name), [sectors]);
  const sectorObj = sectors.find((s) => s._id === sector) ?? sectors[0];

  // Initialise les sélections dès que les données Sanity sont disponibles.
  useEffect(() => {
    if (!sectors.length) return;
    setSector((prev) => prev || sectors[0]._id);
    setCompany((prev) => prev || sectors[0].companies[0]?.name || "");
  }, [sectors]);

  useEffect(() => {
    if (!services.length) return;
    setService((prev) => prev || services[0].title);
  }, [services]);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setSector(sectors[0]?._id ?? "");
    setCompany(sectors[0]?.companies[0]?.name ?? "");
    setService(services[0]?.title ?? "");
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      toast.error("Veuillez renseigner votre nom, prénom et téléphone.");
      return;
    }

    setSubmitting(true);
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
    <section id="contact" className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.contact')}
        </motion.h2>
        {categories.length > 0 && <CategoryBar items={categories} />}
        <br /> <br />
        <div className="max-w-4xl mx-auto bg-blue-300 bg-var-color-card p-8 rounded-2xl shadow-lg border border-var-color-border">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>Contactez MUNA'SPHERE</h1>
            <p className="text-sm text-var-muted-foreground mt-2">Parlez-nous de votre projet — choisissez votre secteur, compagnie et le service souhaité.</p>
          </header>
          <br />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Prénom</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required className="mt-1 w-full rounded-lg border border-color-border p-3 bg-background" />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Nom</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required className="mt-1 w-full rounded-lg border border-color-border p-3 bg-background" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Téléphone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+236 7X XX XX XX" required className="mt-1 w-full rounded-lg border border-color-border p-3 bg-background" />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Secteur d'activité</label>
              <select value={sector} onChange={(e) => { const val = e.target.value; setSector(val); const s = sectors.find((x) => x._id === val); setCompany(s?.companies[0]?.name ?? ""); }} className="mt-1 w-full rounded-lg border border-var-color-border p-3 bg-background" disabled={loading}>
                {loading && <option>Chargement…</option>}
                {sectors.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Compagnie</label>
              <select value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-lg border border-var-color-border p-3 bg-background" disabled={loading || !sectorObj?.companies.length}>
                {(sectorObj?.companies ?? []).map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Type de service souhaité</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-lg border border-var-color-border p-3 bg-background" disabled={loading}>
                {loading && <option>Chargement…</option>}
                {services.map((s) => (
                  <option key={s._id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase text-var-muted-foreground">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Décrivez votre projet, brief ou question..." rows={6} className="mt-1 w-full rounded-lg border border-var-color-border p-3 bg-background" />
            </div>

            <div className="md:col-span-2 flex items-center justify-between gap-4">
              <div className="text-sm text-var-muted-foreground">Nous sommes disponibles 24h/24h.</div>
              <button type="submit" disabled={submitting} className="lime-btn px-6 py-3 rounded-lg font-semibold">
                {submitting ? "Envoi..." : "Envoyer la demande"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
