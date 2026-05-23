import { useEffect, useState } from 'react';
import { Logo } from "./Logo";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('lang') || i18n.language || 'fr' : 'fr'));

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang).catch(() => {});
    }
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // Ignore storage failures in restricted browser contexts.
    }
  }, [lang, i18n]);

  // Use direct route links so navbar navigates to dedicated pages while keeping anchors on homepage
  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.clients'), href: '/clients' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.pubs'), href: '/pubs' },
    { label: t('nav.team'), href: '/team' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  function handleLangChange(next: string) {
    setLang(next);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur bg-background/90 border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo className="text-[var(--color-foreground)]" />

        <nav className="hidden md:flex items-center gap-4 flex-nowrap">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.78rem] font-semibold text-[var(--color-foreground)]/90 hover:text-[var(--color-foreground)] transition-colors uppercase whitespace-nowrap"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-md p-1">
            <button
              aria-label="Switch to French"
              onClick={() => handleLangChange('fr')}
              className={`px-2 py-1 text-xs rounded ${lang === 'fr' ? 'bg-[var(--lime)] text-[var(--lime-foreground)]' : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'}`}
            >
              FR
            </button>
            <button
              aria-label="Switch to English"
              onClick={() => handleLangChange('en')}
              className={`px-2 py-1 text-xs rounded ${lang === 'en' ? 'bg-[var(--lime)] text-[var(--lime-foreground)]' : 'text-[var(--color-foreground)]/70 hover:text-[var(--color-foreground)]'}`}
            >
              EN
            </button>
          </div>

          <a href="/contact" className="lime-btn px-4 py-2 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            {t('footer.contact_cta')}
          </a>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-background/95 backdrop-blur rounded-full px-3 py-2 shadow-lg flex gap-3 items-center">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs font-semibold text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)] px-2 py-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
