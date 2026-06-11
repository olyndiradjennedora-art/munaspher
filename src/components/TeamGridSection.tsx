import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CategoryBar } from "./CategoryBar";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import client from "@/lib/sanity";

const teamCategories = ["LEADERSHIP", "FINANCE", "SALES", "DIGITAL", "CREATIVE", "LOGISTICS", "DESIGN", "SUPPORT"];

const fallbackMembers = [
  { name: "NJANJO EDIMO", role: "Directeur Général", image: team1 },
  { name: "Carine MBOUNGANG", role: "Responsable Financière", image: team2 },
  { name: "Jackie BAMENGUE", role: "Responsable Commercial", image: team3 },
  { name: "Cecy Cédric LOUTOMO", role: "Responsable Digital", image: team4 },
  { name: "Fallone DJEPENO", role: "Chef de PUB", image: team4 },
  { name: "Brice", role: "Responsable Logistique", image: team3 },
  { name: "Junior MAIMO", role: "Graphiste Designer", image: team2 },
  { name: "Ella KOUNHOUA", role: "Infographiste", image: team1 },
  { name: "Castella GOMBO", role: "Technicienne de Surface", image: team3 },
];

type TeamMember = {
  _id?: string;
  name: string;
  role: string;
  image: string;
  photoUrl?: string;
};

type SanityTeamMember = Omit<TeamMember, "image">;

export function TeamGridSection() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<TeamMember[]>(fallbackMembers);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    client
      .fetch<SanityTeamMember[]>('*[_type == "teamMember"]{_id, name, role, "photoUrl": photo.asset->url}')
      .then((data) => {
        if (data && data.length) {
          setMembers(
            data.map((m) => ({ name: m.name, role: m.role, image: m.photoUrl || team1 })),
          );
        }
      })
      .catch(() => {});
  }, []);

  const firstRow = members.slice(0, 4);
  const secondRow = members.slice(4, 8);
  const last = members.slice(8);

  return (
    <section id="team" className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          style={{fontSize : "50px"}}
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.team')}
        </motion.h2>
        <CategoryBar items={teamCategories} />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {firstRow.map((member, i) => (
            <motion.div key={member.name + i} className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <div className="relative overflow-hidden aspect-square rounded-lg">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="mt-3">
                <h3 className="font-bold text-sm tracking-wider">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {secondRow.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {secondRow.map((member, i) => (
              <motion.div key={member.name + i} className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="relative overflow-hidden aspect-square rounded-lg">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-sm tracking-wider">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {last.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="w-80">
              {last.map((member, i) => (
                <motion.div key={member.name + i} className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className="relative overflow-hidden aspect-square rounded-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-bold text-sm tracking-wider">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
