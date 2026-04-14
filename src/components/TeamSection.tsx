import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { CategoryBar } from "./CategoryBar";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import client from "@/lib/sanity";

const teamCategories = ["CREATIVE", "TEAM", "PRODUCTIVE", "TEST WORK", "IMPLEMENTATION"];

const fallbackMembers = [
  { name: "NJANJO EDIMO", role: "Directeur Général", image: team1 },
  { name: "Jackie BAMENGUE", role: "Responsable Commercial", image: team2 },
  { name: "Cecy Cédric LOUTOMO", role: "Responsable Digital", image: team3 },
  { name: "Junior MAIMO", role: "Graphiste", image: team4 },
];

export function TeamSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [members, setMembers] = useState<any[]>(fallbackMembers);

  useEffect(() => {
    client
      .fetch('*[_type == "teamMember"]{_id, name, role, "photoUrl": photo.asset->url}')
      .then((data: any[]) => {
        if (data && data.length) {
          setMembers(
            data.map((m) => ({ name: m.name, role: m.role, image: m.photoUrl || team1 })),
          );
        }
      })
      .catch(() => {});
  }, []);

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
          EQUIPE
        </motion.h2>
        <CategoryBar items={teamCategories} />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <motion.div
              key={member.name + i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="relative overflow-hidden aspect-square rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={700}
                  height={800}
                />
                {hoveredIdx === i && (
                  <motion.div
                    className="absolute bottom-4 left-4 flex gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {[Share2, Facebook, Twitter, Linkedin].map((Icon, j) => (
                      <a
                        key={j}
                        href="/contact"
                        className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-lime-foreground hover:scale-110 transition-transform"
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-sm tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground tracking-wider">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
