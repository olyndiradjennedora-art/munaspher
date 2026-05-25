import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import client from "@/lib/sanity";

type Sector = { _id: string; name: string };

type ClientEntry = { _id: string; name: string; sectorId?: string };

const placeholderSectors: Array<{ id: string; title: string; companies: string[] }> = [];

const placeholderServices: string[] = [];

export function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [sectors, setSectors] = useState<Array<{ id: string; title: string; companies: string[] }>>(placeholderSectors);
  const [services, setServices] = useState<string[]>(placeholderServices);
  const [loading, setLoading] = useState(true);

  const sectorObj = sectors.find((s) => s.id === sector) ?? sectors[0] ?? { id: "", title: "", companies: [] };

  function resetForm() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setSector(sectors[0]?.id ?? "");
    setCompany(sectors[0]?.companies?.[0] ?? "");
    setService(services[0] ?? "");
    setMessage("");
  }

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        // Fetch sectors
        const sectorResults: Sector[] = await client.fetch('*[_type=="sector"] | order(order asc) { _id, name }');
        // Fetch clients
        const clientResults: ClientEntry[] = await client.fetch('*[_type=="client"] | order(order asc) { _id, name, "sectorId": sector._ref }');
        // Fetch services
        const serviceResults: Array<{ title: string }> = await client.fetch('*[_type=="service"]{title}');

        const sectorsMapped = sectorResults.map((s) => ({ id: s._id, title: s.name, companies: clientResults.filter((c) => c.sectorId === s._id).map((c) => c.name) }));
        const servicesMapped = serviceResults.map((s) => s.title);

        if (!mounted) return;
        setSectors(sectorsMapped);
        setServices(servicesMapped.length ? servicesMapped : ["Autre"]);

        // set defaults
        setSector(sectorsMapped[0]?.id ?? "");
        setCompany(sectorsMapped[0]?.companies?.[0] ?? "");
        setService((servicesMapped[0]) ?? "");
      } catch (err) {
        console.error("Error fetching Sanity data", err);
        toast.error("Erreur en récupérant les données du formulaire. Utilisez les valeurs par défaut.");
        // fallback to empty
        setSectors([{ id: 'other', title: 'Autre', companies: [] }]);
        setServices(["Autre"]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, []);

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
            <select value={sector} onChange={(e) => { const val = e.target.value; setSector(val); const s = sectors.find((x) => x.id === val); setCompany(s?.companies?.[0] ?? ""); }} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" disabled={loading}>
              {sectors.map((s) => (
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
            <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--color-border)] p-3 bg-background" disabled={loading}>
              {services.map((s) => (
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
