"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import { getPublishedBlogs } from "@/components/blogService";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Helper functions
function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '');
}

function readTime(content = '') {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getCategory(blog) {
  return blog.meta_data?.tags?.[0] || 'INSIGHT';
}

function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
}

const fallbackInsights = [
  {
    id: '1',
    category: "MARKET OUTLOOK",
    date: "May 20, 2024",
    title: "2024 Market Outlook: Key Trends to Watch",
    desc: "An overview of key market trends and investment opportunities in the coming year.",
    image: "/b-1.webp",
    slug: "market-outlook-2024",
    readTime: 3,
  },
  {
    id: '2',
    category: "INVESTMENT STRATEGY",
    date: "May 13, 2024",
    title: "The Power of Long-Term Investing",
    desc: "Why long-term investing remains the most effective way to build wealth.",
    image: "/b-2.webp",
    slug: "long-term-investing",
    readTime: 4,
  },
  {
    id: '3',
    category: "ECONOMY",
    date: "May 10, 2024",
    title: "India's Economic Growth Story",
    desc: "Key factors driving India's economic growth and its impact on global investors.",
    image: "/b-3.webp",
    slug: "india-economic-growth",
    readTime: 5,
  },
];

export default function MarketInsights() {
  const sectionRef = useRef(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    async function fetchInsights() {
      try {
        setLoading(true);
        setError(false);
        
        const result = await getPublishedBlogs({ page: 1, per_page: 6 });
        
        if (result.success && Array.isArray(result.data)) {
          const blogList = result.data.filter(b => b.status === 'published');
          
          if (blogList.length > 0) {
            const mappedInsights = blogList.map(blog => ({
              id: blog.id,
              category: getCategory(blog).toUpperCase(),
              date: formatDate(blog.published_at || blog.created_at),
              title: blog.title,
              desc: blog.description || stripHtml(blog.content).slice(0, 120) + '...',
              image: resolveImageUrl(blog.featured_image) || '/default-blog.jpg',
              slug: blog.slug,
              readTime: readTime(blog.content),
            }));
            
            setInsights(mappedInsights);
          } else {
            setInsights(fallbackInsights);
          }
        } else {
          setInsights(fallbackInsights);
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching insights:', err);
        setInsights(fallbackInsights);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-12 sm:py-16 md:py-20 lg:py-24 ${notoSans.className}`}
      style={{
        background: "linear-gradient(120deg, #0B2A4D 0%, #0F3A66 55%, #12457A 100%)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Left: Heading + CTA */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-1"
          >
            <div className="text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-orange-500 font-semibold text-xs sm:text-sm tracking-widest mb-2 sm:mb-3"
              >
                MARKET INSIGHTS
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white mb-4 sm:mb-6"
              >
                Stay Informed.
                <br className="hidden sm:block" />
                Stay Ahead.
              </motion.h2>

              <Link href="/BlogsPage">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-slate-100 transition w-full sm:w-auto"
                >
                  VIEW ALL INSIGHTS <span aria-hidden="true">→</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Insight cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg animate-pulse"
                  >
                    <div className="h-40 sm:h-44 md:h-48 bg-gray-300" />
                    <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
                      <div className="h-3 bg-gray-300 rounded w-1/3" />
                      <div className="h-5 bg-gray-300 rounded w-4/5" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-full" />
                        <div className="h-3 bg-gray-300 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                insights.slice(0, 3).map((insight, i) => (
                  <Link href={`/blog/${insight.slug}`} key={insight.id || i}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                      whileHover={{ y: -6 }}
                      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer h-full"
                    >
                      <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden">
                        <Image
                          src={insight.image || '/default-blog.jpg'}
                          alt={insight.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/default-blog.jpg';
                          }}
                        />
                        <span className="absolute left-3 top-3 bg-white/90 text-blue-900 font-bold text-[10px] tracking-wider px-2.5 py-1 rounded">
                          {insight.category}
                        </span>
                      </div>

                      <div className="flex flex-col flex-1 p-4 sm:p-5">
                        <p className="text-slate-400 text-[10px] sm:text-xs mb-1.5 sm:mb-2">
                          {insight.date}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1.5 sm:mb-2 line-clamp-2">
                          {insight.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                          {insight.desc}
                        </p>
                        {insight.readTime && (
                          <p className="text-[10px] sm:text-xs text-slate-400 mt-2">
                            {insight.readTime} min read
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Show error message if API failed but we're using fallback */}
        {error && !loading && (
          <div className="text-center mt-4 text-white/50 text-xs">
            Showing sample insights while we fetch the latest updates.
          </div>
        )}
      </div>
    </section>
  );
}