import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';

function ClientsPage() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{t('nav.clients')}</h1>
        <p className="mt-4 text-muted-foreground">{t('sections.about')}</p>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/clients")({
  head: () => ({ meta: [{ title: "Clients — MUNA'SPHERE-RCA" }] }),
  component: ClientsPage,
});
