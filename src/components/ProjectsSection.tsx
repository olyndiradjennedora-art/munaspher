import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { CategoryBar } from "./CategoryBar";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import client from "@/lib/sanity";

const projectCategories = ["WORKS", "PROCESS", "BRAND IDENTITY", "TEST WORK", "IMPLEMENTATION"];

const fallbackProjects = [
  {
    image: project1,
    tags: ["MARKETING", "AGENCY"],
    title: "MARKETING AGENCY",
    width: 800,
    height: 900,
  },
  {
    image: project2,
    tags: ["UI/UX DESIGN", "DEVELOPMENT"],
    title: "PRODUCT DESIGN",
    width: 800,
    height: 800,
  },
  {
    image: project3,
    tags: ["BRANDING", "STRATEGY"],
    title: "BRAND STRATEGY",
    width: 800,
    height: 800,
  },
];

type Project = {
  _id?: string;
  title: string;
  client?: string;
  description?: string;
  mainImageUrl?: string;
  image: string;
  tags: string[];
  width: number;
  height: number;
};

type SanityProject = Omit<Project, "image" | "width" | "height">;

export function ProjectsSection() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    client
      .fetch<SanityProject[]>('*[_type == "project"] | order(publishedAt desc){_id, title, client, description, "mainImageUrl": mainImage.asset->url}')
      .then((data) => {
        if (data && data.length) {
          setProjects(
            data.map((p) => ({
              image: p.mainImageUrl || project1,
              tags: p.tags || [],
              title: p.title,
              width: 800,
              height: 800,
            })),
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('sections.projects')}
          </motion.h2>
          <motion.a
            href="/contact"
            className="lime-btn px-6 py-3 text-sm absolute right-0 bottom-4 -rotate-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            START A PROJECT
          </motion.a>
        </div>
        <CategoryBar items={projectCategories} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              width={projects[0].width}
              height={projects[0].height}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex gap-2 mb-2">
                {projects[0].tags.map((tag: string) => (
                  <span key={tag} className="lime-badge text-[0.6rem]">{tag}</span>
                ))}
              </div>
              <a href="/projects" className="lime-btn w-10 h-10 rounded-full flex items-center justify-center absolute -top-12 left-0">
                <span className="text-[0.5rem] font-bold">SEE →<br />PROJECT</span>
              </a>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            {projects.slice(1).map((project, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={project.width}
                  height={project.height}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex gap-2 mb-1">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="lime-badge text-[0.55rem]">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-hero-foreground font-bold text-lg tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
