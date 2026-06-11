import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { CategoryBar } from "./CategoryBar";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import client from "@/lib/sanity";

const blogCategories = ["CREATIVE", "TEAM", "PRODUCTIVE", "TEST WORK", "IMPLEMENTATION"];

type BlogPost = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  excerpt?: string;
  mainImageUrl?: string;
  image?: string;
  day?: string;
  month?: string;
  category?: string;
  comments?: number;
  author?: string;
};

export function BlogSection() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    client
      .fetch<BlogPost[]>('*[_type == "post"] | order(publishedAt desc){_id, title, slug, publishedAt, excerpt, "mainImageUrl": mainImage.asset->url}')
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]));
  }, []);

  const list = posts.length
    ? posts
    : [
        { image: blog1, day: "28", month: "May, 25", category: "MARKETING", comments: 0, title: "Publication exemple" },
        { image: blog2, day: "18", month: "May, 25", category: "MARKETING", comments: 0, title: "Publication exemple" },
        { image: blog3, day: "30", month: "May, 25", category: "MARKETING", comments: 0, title: "Publication exemple" },
      ];

  return (
    <section id="publications" className="py-24 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          style={{fontSize : "50px"}}
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('sections.blog')}
        </motion.h2>
        <CategoryBar items={blogCategories} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((post, i) => (
            <motion.div
              key={post._id || i}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={post.mainImageUrl || post.image || blog1}
                  alt={post.title || 'Publication'}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute top-4 right-4 bg-lime text-lime-foreground px-3 py-1.5 rounded-lg text-center">
                  <span className="text-lg font-black block leading-none">{new Date(post.publishedAt || Date.now()).getDate()}</span>
                  <span className="text-[0.6rem] font-semibold">{new Date(post.publishedAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-wider">
                  <span className="lime-badge text-[0.6rem]">{post.category || 'NEWS'}</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {post.comments || 0} COMMENTS
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-base tracking-wider leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                  {post.title || 'Publication sans titre'}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted" />
                    <span className="text-xs font-semibold tracking-wider">{post.author || 'Equipe'}</span>
                  </div>
                  <a href="/publications" className="flex items-center gap-1 text-xs font-semibold tracking-wider hover:text-lime transition-colors">
                    Plus d'infos <ArrowUpRight className="w-3 h-3" />
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
