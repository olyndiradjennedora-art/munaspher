import { Logo } from "./Logo";
import { ArrowUpRight } from "lucide-react";

const navItems = ["HOME", "PAGES", "PORTFOLIO", "SHOP", "BLOG", "CONTACT"];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo className="text-hero-foreground" />
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-semibold tracking-widest text-hero-foreground/70 hover:text-hero-foreground transition-colors uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item}
            </a>
          ))}
        </nav>
        <a href="#contact" className="lime-btn px-5 py-2.5 text-sm">
          <ArrowUpRight className="w-4 h-4" />
          LET'S TALK
        </a>
      </div>
    </header>
  );
}
