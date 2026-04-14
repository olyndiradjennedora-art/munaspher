import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";

export function AboutSection() {
  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Clover image grid */}
        <div className="grid grid-cols-2 gap-1 max-w-md">
          <div className="rounded-tl-[50%] overflow-hidden aspect-square">
            <img src={about1} alt="Team meeting" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
          <div className="rounded-tr-[50%] overflow-hidden aspect-square">
            <img src={about2} alt="Team brainstorming" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
          <div className="rounded-bl-[50%] overflow-hidden aspect-square">
            <img src={about2} alt="Team work" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
          <div className="rounded-br-[50%] overflow-hidden aspect-square">
            <img src={about1} alt="Office scene" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
        </div>

        {/* Text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="lime-badge mb-6 inline-block">WHO ARE WE?</span>
            <h2
              className="text-foreground font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mt-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              WE NARRATE THE DISTINCTIVE & STORIES SOME BRAND WITH SHAPING THEIR TARGET.
            </h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <a href="/team" className="lime-btn w-32 h-32 rounded-full flex flex-col items-center justify-center text-xs">
              GET TO <ArrowUpRight className="w-4 h-4" /> KNOW US
            </a>
            <div>
              <p className="text-xs font-bold tracking-wider text-muted-foreground mb-2">©2025 · BASED IN CALIFORNIA</p>
              <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                With over 8 years of experience, Genesis are a passionate, driven and
                attentive team offering creative talent, expert eros luctus vehicula in sed
                diam Mauris a meus magna ultrices bibendum eu massa.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                Attentive team offering creative talent, expert eros luctus vehicula in sed
                diam Mauris a meus magna ultrices bibendum eu massa...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
