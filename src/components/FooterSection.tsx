import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, LocateFixed} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Logo } from "./Logo";

const footerColumns = [
  { heading: 'footer.columns.navigation', items: ["home", "about", "services", "clients", "team"] },
  { heading: 'footer.columns.explore', items: ["projects", "blog", "contact"] },
  { heading: 'footer.columns.legal', items: ["privacy", "terms"] },
];

const bottomCategories = ["contact", "services", "projects", "team"];

const socials = [
  { Icon: Facebook, label: 'Facebook' , href: 'https://www.facebook.com/munasphere'},
  { Icon: Twitter, label: 'Twitter' , href: 'https://twitter.com/munasphere'},
  { Icon: Instagram, label: 'Instagram' , href: 'https://www.instagram.com/munasphere'},
  { Icon: Mail, label: 'Email' , href: 'mailto:njanjoedimo@gmail.com'},
];

function hrefFor(key: string) {
  switch (key) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'services': return '/services';
    case 'clients': return '/clients';
    case 'projects': return '/projects';
    case 'pubs': return '/pubs';
    case 'blog': return '/blog';
    case 'team': return '/team';
    case 'contact': return '/contact';
    case 'privacy': return '/privacy';
    case 'terms': return '/terms';
    default: return '#';
  }
}

export function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer id="site-footer" className="relative footer-gradient text-hero-foreground border-t border-hero-foreground/10">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand + contact */}
            <div className="lg:col-span-2">
              <Logo className="text-hero-foreground" />
              <p className="mt-4 max-w-sm text-sm text-hero-foreground/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {t('footer.about')}
              </p>

              <ul className="mt-6 space-y-3 text-sm text-hero-foreground/70">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-lime shrink-0" />
                  <span>{t('footer.address')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-lime shrink-0" />
                  <a href="tel:+23672267073" className="hover:text-lime transition-colors">{t('footer.phone_display')}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lime shrink-0" />
                  <a href="mailto:njanjoedimo@gmail.com" className="hover:text-lime transition-colors">{t('footer.email_display')}</a>
                </li>
                <li className="flex items-center gap-3">
                  <LocateFixed className="w-4 h-4 text-lime shrink-0" />
                  <span>{t('footer.location')}</span>
                </li>
            </ul>

              <div className="flex gap-3 mt-6">
                {socials.map(({ Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-hero-foreground/10 flex items-center justify-center hover:bg-lime hover:text-lime-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-hero-foreground/40 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                                  {t(col.heading)}
                </h4>
                <ul className="space-y-3">
                  {col.items.map((key) => {
                    const label = key === 'privacy' ? t('footer.policies') : key === 'pubs' ? t('nav.pubs') : t(`nav.${key}`);
                    return (
                      <li key={key}>
                        <a href={hrefFor(key)} className="text-sm text-hero-foreground/60 hover:text-lime transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                          {label || key}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant GET IN TOUCH */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="relative border-t border-hero-foreground/10 pt-10">
            <motion.h2
              style={{fontSize : "50px", fontFamily : 'var(--font-body)'}}
              className="font-black leading-[0.85] tracking-tight text-hero-foreground"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('footer.contact_cta').toUpperCase()}
            </motion.h2>
            <motion.a
              href="/contact"
              className="lime-btn px-6 py-3 text-sm absolute right-8 bottom-4 -rotate-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('footer.contact_cta')}
            </motion.a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="category-bar border-hero-foreground/20 text-hero-foreground/50">
            {bottomCategories.map((item) => (
              <span key={item}>{t(`nav.${item}`).toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between text-[0.65rem] tracking-widest text-hero-foreground/40 uppercase">
          <span>{t('footer.copyright')}</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="/privacy" className="hover:text-hero-foreground transition-colors">{t('footer.policies')}</a>
            <span>|</span>
            <a href="/terms" className="hover:text-hero-foreground transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
