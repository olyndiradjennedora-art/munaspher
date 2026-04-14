import { motion } from "framer-motion";

const stats = [
  { value: "24K", label: "COMPLETED PROJECTS" },
  { value: "9K", label: "HAPPY CUSTOMERS" },
  { value: "13", label: "YEARS EXPERIENCE" },
  { value: "44", label: "AWARDS ACHIEVEMENT" },
];

export function StatsSection() {
  return (
    <section className="py-16 px-8 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'var(--font-body)' }}>
              {stat.value}
            </span>
            <p className="text-[0.65rem] font-bold tracking-widest text-muted-foreground mt-2 uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
