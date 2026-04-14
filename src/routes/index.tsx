import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TeamSection } from "@/components/TeamSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { BlogSection } from "@/components/BlogSection";
import { FooterSection } from "@/components/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MUNA'SPHERE-RCA — Agence de Communication & Marketing Digital" },
      { name: "description", content: "Agence leader en marketing et communication digitale en République Centrafricaine." },
      { property: "og:title", content: "MUNA'SPHERE-RCA — Agence de Communication & Marketing Digital" },
      { property: "og:description", content: "Agence leader en marketing et communication digitale." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsSection />
      <TeamSection />
      <TestimonialSection />
      <BlogSection />
      <FooterSection />
    </div>
  );
}
