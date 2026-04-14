import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { CategoryBar } from "./CategoryBar";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogCategories = ["CREATIVE", "TEAM", "PRODUCTIVE", "TEST WORK", "IMPLEMENTATION"];

const posts = [
  { image: blog1, day: "28", month: "May, 25", category: "MARKETING", comments: 3 },
  { image: blog2, day: "18", month: "May, 25", category: "MARKETING", comments: 3 },
  { image: blog3, day: "30", month: "May, 25", category: "MARKETING", comments: 3 },
];

export function BlogSection() {
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
          NEWS & BLOG
        </motion.h2>
        <CategoryBar items={blogCategories} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt="Blog post"
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute top-4 right-4 bg-lime text-lime-foreground px-3 py-1.5 rounded-lg text-center">
                  <span className="text-lg font-black block leading-none">{post.day}</span>
                  <span className="text-[0.6rem] font-semibold">{post.month}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-wider">
                  <span className="lime-badge text-[0.6rem]">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {post.comments} COMMENTS
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-base tracking-wider leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                  COVERING DURABILITY & INNOVATION IN CONSTRUCTION.
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted" />
                    <span className="text-xs font-semibold tracking-wider">JACKSON POT</span>
                  </div>
                  <a href="#" className="flex items-center gap-1 text-xs font-semibold tracking-wider hover:text-lime transition-colors">
                    More Details <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-3">
          <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-lime flex items-center justify-center hover:scale-105 transition-transform">
            <ArrowRight className="w-4 h-4 text-lime-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
