import { useState } from "react";
import { ArrowLeft, ArrowRight, Star, Play } from "lucide-react";
import testimonialImg from "@/assets/testimonial.jpg";
import about0 from "@/assets/about-0.png"

const testimonials = [
  {
    text: '"UT ENIM AD MINIMA VENIAM, QUIS NOSTRUM EXERCITATIONEM ULLAM CORPORIS SUSCIPIT LABORIOSAM, NISI UT ALIQUID EX EA COMMODI CONSEQUATUR. QUIS AUTEM VEL EUM IURE QUI IN EA VOLUPTATE."',
    text2: '"DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT NULLA PARIATUR. EXCEPTEUR SINT OCCAECAT CUPIDATAT NON PROIDENT, SUNT IN CULPA"',
    name: "DESMOND EAGLE",
    role: "Site Engineer",
  },
];

export function TestimonialSection() {
  const [current] = useState(0);
  const t = testimonials[current];

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={testimonialImg}
              alt="Testimonial"
              className="w-full h-[400px] object-cover"
              loading="lazy"
              width={700}
              height={700}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-foreground ml-1" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm font-bold tracking-wider leading-relaxed text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              {t.text}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4" style={{ fontFamily: 'var(--font-body)' }}>
              {t.text2}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
                  {t.name}
                </h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-lime flex items-center justify-center hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 text-lime-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
