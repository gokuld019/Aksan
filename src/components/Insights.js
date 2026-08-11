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

// Format date to match the insight card format
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Get category from meta_data or default
function getCategory(blog) {
  return blog.meta_data?.tags?.[0] || 'INSIGHT';
}

// Get thumbnail from multiple sources
function getThumbnail(blog) {
  // If featured_image exists, use it
  if (blog.featured_image) {
    return blog.featured_image;
  }
  
  // Fallback to manual mapping
  const THUMBNAIL_MAP = {
    'sme-ipo-vs-mainboard-ipo-which-one-fits-your-business': '/blog/b1.png',
    'common-financial-challenges-faced-by-smes-and-how-to-overcome-them': '/blog/b2.png',
    'what-is-an-sme-ipo-everything-you-need-to-know-1786428769': '/blog/b3.png',
  };
  
  return THUMBNAIL_MAP[blog.slug] || '/default-blog.jpg';
}

// Fallback insights in case API fails
const fallbackInsights = [
  {
    id: '1',
    category: "MARKET OUTLOOK",
    date: "May 20, 2024",
    title: "2024 Market Outlook: Key Trends to Watch",
    desc: "An overview of key market trends and investment opportunities in the coming year.",
    image: "/b-1.webp",
    slug: "market-outlook-2024",
  },
  {
    id: '2',
    category: "INVESTMENT STRATEGY",
    date: "May 13, 2024",
    title: "The Power of Long-Term Investing",
    desc: "Why long-term investing remains the most effective way to build wealth.",
    image: "/b-2.webp",
    slug: "long-term-investing",
  },
  {
    id: '3',
    category: "ECONOMY",
    date: "May 10, 2024",
    title: "India's Economic Growth Story",
    desc: "Key factors driving India's economic growth and its impact on global investors.",
    image: "/b-3.webp",
    slug: "india-economic-growth",
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
        
        if (result.success && result.data && result.data.data) {
          const blogList = result.data.data.filter(b => b.status === 'published');
          
          if (blogList.length > 0) {
            // Map API data to insight format
            const mappedInsights = blogList.map(blog => ({
              id: blog.id,
              category: getCategory(blog).toUpperCase(),
              date: formatDate(blog.published_at || blog.created_at),
              title: blog.title,
              desc: blog.description || stripHtml(blog.content).slice(0, 120) + '...',
              image: getThumbnail(blog),
              slug: blog.slug,
              readTime: readTime(blog.content),
            }));
            
            setInsights(mappedInsights);
          } else {
            // No blogs found, use fallback
            setInsights(fallbackInsights);
          }
        } else {
          // API failed, use fallback
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
      className={`w-full py-[clamp(2.5rem,6vw,5rem)] ${notoSans.className}`}
      style={{
        background: "linear-gradient(120deg, #0B2A4D 0%, #0F3A66 55%, #12457A 100%)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-center gap-[clamp(2rem,4vw,2.5rem)] lg:grid-cols-3"
        style={{
          maxWidth: "min(1400px, 96vw)",
          paddingLeft: "clamp(1rem, 3vw, 1.5rem)",
          paddingRight: "clamp(1rem, 3vw, 1.5rem)",
        }}
      >
        {/* Left: Heading + CTA */}
        <motion.div
          style={{ y: textY }}
          className="text-center lg:col-span-1 lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-semibold tracking-wide text-orange-500"
            style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
          >
            MARKET INSIGHTS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-6 font-bold leading-tight text-white sm:mb-8"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)" }}
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
              className="inline-flex items-center gap-2 rounded-md bg-white font-semibold text-blue-900 transition hover:bg-slate-100"
              style={{
                fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                padding: "clamp(0.625rem, 1.5vw, 0.75rem) clamp(1.25rem, 2.5vw, 1.5rem)",
              }}
            >
              VIEW ALL INSIGHTS <span aria-hidden="true">→</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Right: Insight cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3"
          style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <div className="animate-pulse">
                  <div
                    className="bg-gray-300"
                    style={{ height: "clamp(7.5rem, 16vw, 9.5rem)" }}
                  />
                  <div
                    className="flex flex-1 flex-col space-y-3"
                    style={{ padding: "clamp(1rem, 2vw, 1.25rem)" }}
                  >
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                    <div className="h-6 bg-gray-300 rounded w-4/5" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-full" />
                      <div className="h-4 bg-gray-300 rounded w-2/3" />
                    </div>
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
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
                >
                  <div
                    className="group relative w-full overflow-hidden"
                    style={{ height: "clamp(7.5rem, 16vw, 9.5rem)" }}
                  >
                    <Image
                      src={insight.image || '/default-blog.jpg'}
                      alt={insight.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.src = '/default-blog.jpg';
                      }}
                    />
                    <span
                      className="absolute left-2 top-2 rounded bg-white/90 font-bold tracking-wide text-blue-900 sm:left-3 sm:top-3"
                      style={{
                        fontSize: "clamp(0.5625rem, 0.9vw, 0.625rem)",
                        padding: "clamp(0.125rem, 0.4vw, 0.25rem) clamp(0.5rem, 1vw, 0.625rem)",
                      }}
                    >
                      {insight.category}
                    </span>
                  </div>

                  <div
                    className="flex flex-1 flex-col"
                    style={{ padding: "clamp(1rem, 2vw, 1.25rem)" }}
                  >
                    <p
                      className="mb-1.5 text-slate-400 sm:mb-2"
                      style={{ fontSize: "clamp(0.625rem, 0.9vw, 0.75rem)" }}
                    >
                      {insight.date}
                    </p>
                    <h3
                      className="mb-1.5 font-bold leading-snug text-slate-900 sm:mb-2 line-clamp-2"
                      style={{ fontSize: "clamp(0.8125rem, 1vw, 0.875rem)" }}
                    >
                      {insight.title}
                    </h3>
                    <p
                      className="leading-relaxed text-slate-500 line-clamp-2"
                      style={{ fontSize: "clamp(0.6875rem, 1vw, 0.75rem)" }}
                    >
                      {insight.desc}
                    </p>
                    {insight.readTime && (
                      <p
                        className="mt-2 text-slate-400"
                        style={{ fontSize: "clamp(0.5625rem, 0.7vw, 0.625rem)" }}
                      >
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

      {/* Show error message if API failed but we're using fallback */}
      {error && !loading && (
        <div className="text-center mt-4 text-white/50 text-xs">
          Showing sample insights while we fetch the latest updates.
        </div>
      )}
    </section>
  );
}