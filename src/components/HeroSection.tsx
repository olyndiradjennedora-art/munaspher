import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden flex items-end pb-20">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-hero-bg/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-8">
        <div className="flex items-start gap-4 mb-12">
          <a href="/team" className="lime-badge flex items-center gap-1">
            {t('nav.team')} <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="/about" className="lime-badge flex items-center gap-1">
            {t('nav.about')} <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-hero-foreground font-black leading-[0.85] tracking-tight"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {t('hero.title')}
            </h1>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-hero-foreground/80">{t('hero.description')}</p>
            <a href="/services" className="lime-btn px-6 py-3 mt-4 inline-flex items-center gap-2">{t('hero.cta')} <ArrowUpRight className="w-4 h-4" /></a>

            <div className="pt-8 flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="var(--lime)" stroke="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <span className="text-hero-foreground text-sm font-bold tracking-wider uppercase">
                {t('hero.tagline')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
