"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const rights = [
  "Receive timely, accurate, and complete information.",
  "Fair and equitable treatment in all dealings.",
  "Access information on our performance and governance.",
  "Be informed about material developments.",
  "Have your queries and grievances addressed promptly.",
  "Participate and vote in general meetings.",
];

const promises = [
  "Provide clear, accurate, and relevant information.",
  "Ensure compliance with all applicable laws and regulations.",
  "Maintain the confidentiality of your information.",
  "Offer easy access to information and channels of communication.",
  "Act in your best interests and protect your rights.",
  "Continuously improve our services and investor experience.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const wordItem = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedWords({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={wordContainer}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span variants={wordItem} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function InvestorCharterPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <main className="bg-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero — full-width fill banner */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[420px] sm:min-h-[520px] lg:min-h-[520px] flex items-center overflow-hidden bg-[#0b1a3a]"
      >
        <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 z-0">
          <Image
            src="/IC.png"
            alt="Investor Charter book on a desk beside a laptop showing charts"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-[#0b1a3a]/20 z-0" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-[2px] bg-orange-500" />
              <span
                className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
              >
                Investor Relations
              </span>
            </motion.div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              <AnimatedWords text="Investor Charter" />
            </h1>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="block h-[3px] bg-orange-500 mt-4 mb-5"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-md"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              Our Investor Charter reflects our commitment to uphold the
              highest standards of transparency, fairness, and accountability
              in all our interactions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Commitment to Investors */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 pt-14 sm:pt-16 pb-10 sm:pb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Our Commitment to Investors
        </motion.h2>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="inline-block h-[3px] bg-orange-500 mt-4 mb-5"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          We are committed to fostering trust and building long-term relationships by ensuring
          that our investors are treated fairly and provided with timely, accurate, and relevant
          information.
        </motion.p>
      </section>

      {/* Rights & Promises */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl bg-[#eef1f7] p-6 sm:p-8"
          >
            <h3 className="text-[#0e4980] font-semibold text-base sm:text-lg" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Your Rights as an Investor
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-4" />
            <p className="text-slate-600 text-sm mb-5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              As our valued investor, you have the right to:
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col"
            >
              {rights.map((item, idx) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={idx}
                  className={`flex items-start gap-3 py-3 text-sm text-slate-700 ${
                    idx > 0 ? "border-t border-slate-200" : ""
                  }`}
                  style={{ fontFamily: "'Noto Sans', sans-serif" }}
                >
                  <span className="mt-0.5 text-orange-500 shrink-0" aria-hidden="true">
                    &gt;
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Our Promises */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl bg-[#fdf4ec] p-6 sm:p-8"
          >
            <h3 className="text-[#0e4980] font-semibold text-base sm:text-lg" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Our Promises to You
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-4" />
            <p className="text-slate-600 text-sm mb-5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              We are committed to:
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col"
            >
              {promises.map((item, idx) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={idx}
                  className={`flex items-start gap-3 py-3 text-sm text-slate-700 ${
                    idx > 0 ? "border-t border-slate-200" : ""
                  }`}
                  style={{ fontFamily: "'Noto Sans', sans-serif" }}
                >
                  <span className="mt-0.5 text-orange-500 shrink-0" aria-hidden="true">
                    &gt;
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8 rounded-xl border border-slate-200 p-6 sm:p-7 flex items-start gap-4 sm:gap-5"
        >
          <motion.span
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0e2a4e] text-orange-400"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              <path d="M9.5 12l1.8 1.8L15 10" />
            </svg>
          </motion.span>
          <div>
            <p className="text-[#0e4980] font-semibold text-sm sm:text-base" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Your trust inspires us to excel. Your success is our success.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mt-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              At Aksan Capital Venture, we are dedicated to creating sustainable value for our
              investors and building a future of shared growth and prosperity.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}