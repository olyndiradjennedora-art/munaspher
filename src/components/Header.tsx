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
    } catch {}
  }, [lang, i18n]);

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
    <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo className="text-hero-foreground" />

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold tracking-widest text-hero-foreground/70 hover:text-hero-foreground transition-colors uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Current language badge (F / E) - visible on all sizes */}
        
          <div className="flex items-center gap-1 bg-hero-foreground/5 rounded-md p-1">
            <button
              aria-label="Switch to French"
              onClick={() => handleLangChange('fr')}
              className={`px-2 py-1 text-xs rounded ${lang === 'fr' ? 'bg-lime text-black' : 'text-hero-foreground/70 hover:text-hero-foreground'}`}
            >
              F
            </button>
            <button
              aria-label="Switch to English"
              onClick={() => handleLangChange('en')}
              className={`px-2 py-1 text-xs rounded ${lang === 'en' ? 'bg-lime text-black' : 'text-hero-foreground/70 hover:text-hero-foreground'}`}
            >
              E
            </button>
          </div>

          <a href="/contact" className="lime-btn px-5 py-2.5 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            {t('footer.contact_cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
