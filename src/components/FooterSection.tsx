import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import heroBg from "@/assets/hero-bg.jpg";

const footerLinks = [
  { title: "", items: ["ACCUEIL", "A PROPOS", "SERVICES", "PUBLICATIONS", "NOUS CONTACTER"] },
  { title: "", items: ["A PROPOS", "FEATURES", "PORTFOLIO", "PRICING", "BLOGS"] },
  { title: "", items: ["CONTACT", "STYLE GUIDE", "CHANGELOG", "LICENSES"] },
];

const bottomCategories = ["CONTACTEZ-NOUS", "SERVICES", "PORTFOLIO", "IMPLEMENTATION"];

export function FooterSection() {
  return (
    <footer id="contact" className="relative footer-gradient text-hero-foreground overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Logo className="text-hero-foreground" />
              <p className="mt-4 text-xs text-hero-foreground/60 leading-relaxed tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                Agence de conseil en communication et marketing digitale en République Centrafricaine.
              </p>
              <div className="flex gap-3 mt-6">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="/contact" className="w-8 h-8 rounded-full bg-hero-foreground/20 flex items-center justify-center hover:bg-lime hover:text-lime-foreground transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {footerLinks.map((col, i) => (
              <div key={i}>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href={
                        item === 'HOME' ? '/' :
                        item === 'PAGES' || item === 'ABOUT US' ? '/about' :
                        item === 'PORTFOLIO' ? '/projects' :
                        item === 'SHOP' ? '/services' :
                        item === 'BLOG' || item === 'BLOGS' ? '/blog' :
                        item === 'CONTACT' ? '/contact' :
                        item === 'PRIVACY POLICY' ? '/privacy' :
                        item === 'TERM OF SERVICE' ? '/terms' :
                        '#'
                      } className="text-xs tracking-widest text-hero-foreground/60 hover:text-lime transition-colors uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant GET IN TOUCH */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="relative">
            <motion.h2
              className="font-black leading-[0.85] tracking-tight text-hero-foreground"
              style={{
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                fontFamily: 'var(--font-body)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              NOUS CONTACTER
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
              PRENDRE CONTACT
            </motion.a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="category-bar border-hero-foreground/20 text-hero-foreground/50">
            {bottomCategories.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between text-[0.65rem] tracking-widest text-hero-foreground/40 uppercase">
          <span>COPYRIGHT 2026 ALL RIGHTS RESERVED</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-hero-foreground transition-colors">PRIVACY POLICY</a>
            <span>|</span>
            <a href="/terms" className="hover:text-hero-foreground transition-colors">TERM OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
