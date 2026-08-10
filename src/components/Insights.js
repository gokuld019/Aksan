"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const insights = [
  {
    category: "MARKET OUTLOOK",
    date: "May 20, 2024",
    title: "2024 Market Outlook: Key Trends to Watch",
    desc: "An overview of key market trends and investment opportunities in the coming year.",
    image: "/b-1.webp",
  },
  {
    category: "INVESTMENT STRATEGY",
    date: "May 13, 2024",
    title: "The Power of Long-Term Investing",
    desc: "Why long-term investing remains the most effective way to build wealth.",
    image: "/b-2.webp",
  },
  {
    category: "ECONOMY",
    date: "May 10, 2024",
    title: "India's Economic Growth Story",
    desc: "Key factors driving India's economic growth and its impact on global investors.",
    image: "/b-3.webp",
  },
];

export default function MarketInsights() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax drift for the heading column
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

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
        </motion.div>

        {/* Right: Insight cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3"
          style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <div
                className="group relative w-full overflow-hidden"
                style={{ height: "clamp(7.5rem, 16vw, 9.5rem)" }}
              >
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                  className="mb-1.5 font-bold leading-snug text-slate-900 sm:mb-2"
                  style={{ fontSize: "clamp(0.8125rem, 1vw, 0.875rem)" }}
                >
                  {insight.title}
                </h3>
                <p
                  className="leading-relaxed text-slate-500"
                  style={{ fontSize: "clamp(0.6875rem, 1vw, 0.75rem)" }}
                >
                  {insight.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}