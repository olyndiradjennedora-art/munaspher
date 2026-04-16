import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';

function PubsPage() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{t('nav.pubs')}</h1>
        <p className="mt-4 text-muted-foreground">{t('footer.about')}</p>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/pubs")({
  head: () => ({ meta: [{ title: "Publications — MUNA'SPHERE-RCA" }] }),
  component: PubsPage,
});
