import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesGridSection } from "@/components/ServicesGridSection";
import { ClientSection } from "@/components/ClientSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TeamGridSection } from "@/components/TeamGridSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { BlogSection } from "@/components/BlogSection";
import { FooterSection } from "@/components/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MUNA'SPHERE-RCA — Agence de Communication & Marketing Digital" },
      { name: "description", content: "Agence de Conseil en Communication & Marketing Digitale en République Centrafricaine." },
      { property: "og:title", content: "MUNA'SPHERE-RCA — Agence de Communication & Marketing Digital" },
      { property: "og:description", content: "Agence de Conseil en Communication & Marketing Digitale." },
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
      <ServicesGridSection />
      <ClientSection />
      <StatsSection />
      <ProjectsSection />
      <TeamGridSection />
      <TestimonialSection />
      <BlogSection />
      <FooterSection />
    </div>
  );
}
