import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryBar } from "./CategoryBar";
import serviceBrand from "@/assets/service-brand.jpg";

const services = [
  { num: "01.", name: "INTERNET APPS", desc: "Driven and attentive team offering creative talent, expert eros luctus vehicula." },
  { num: "02.", name: "BRAND IDENTITY", desc: "Experience, Genesis are a passionate, driven and attentive team offering creative luctus.", bold: true },
  { num: "03.", name: "STRATEGY", desc: "Offering creative talent, expert eros luctus vehicula in meus eu massa." },
  { num: "04.", name: "CREATIVE IDENTITY", desc: "Creative talent, expert eros luctus vehicula in sed diam Mauris a meus eu massa." },
  { num: "05.", name: "WEBDIGITAL PLATFORMS", desc: "Driven and attentive team offering creative talent, expert eros luctus vehicula in sed diam Mauris." },
];

export function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(1);

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SERVICES
        </motion.h2>
        <CategoryBar />

        <div className="mt-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-row group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                {service.num}
              </span>
              <span
                className={`text-lg tracking-wider ${service.bold || hovered === i ? 'font-black' : 'font-medium'}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {service.name}
              </span>
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  {service.desc}
                </p>
                {hovered === i && (
                  <motion.img
                    src={serviceBrand}
                    alt="Service"
                    className="w-24 h-16 object-cover rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    loading="lazy"
                    width={600}
                    height={512}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
