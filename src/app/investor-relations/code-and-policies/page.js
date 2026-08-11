"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const policies = [
  {
    title: "Chinese Wall Policy",
    description:
      "Safeguarding confidential information and preventing conflicts of interest through strict information barriers.",
    href: "/investor-relations/code-and-policies/chinese-wall-policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    ),
  },
  {
    title: "Investor Grievance Redressal Policy",
    description:
      "Ensuring fair and timely resolution of investor grievances with transparency and accountability.",
    href: "/investor-relations/code-and-policies/investor-grievance-redressal-policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c-4-2.5-8-5.5-8-10.5A5 5 0 0 1 12 7a5 5 0 0 1 8 3.5c0 5-4 8-8 10.5z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Cyber Security & Cyber Resilience Policy",
    description:
      "Protecting our digital assets and systems through robust security measures and resilience practices.",
    href: "/investor-relations/code-and-policies/cyber-security-policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </svg>
    ),
  },
  {
    title: "Code for Executive Directors and Managerial Personnel",
    description:
      "Defining ethical standards and responsibilities for our leadership to promote integrity and good governance.",
    href: "/investor-relations/code-and-policies/code-for-executive-directors",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="2.6" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M3.5 20c.4-3.2 2.7-5.2 5.5-5.2s5.1 2 5.5 5.2" />
        <path d="M14.8 15.2c2.1.2 3.7 1.9 4 4.3" />
      </svg>
    ),
  },
  {
    title: "Data Back-up Policy",
    description:
      "Ensuring the safety, integrity, and availability of data through regular back-ups and disaster recovery protocols.",
    href: "/investor-relations/code-and-policies/data-back-up-policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="7" ry="2.6" />
        <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
        <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
      </svg>
    ),
  },
  {
    title: "Investment Policy",
    description:
      "Establishing principles and guidelines for prudent investment decisions aligned with our strategic objectives.",
    href: "/investor-relations/code-and-policies/investment-policy",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V10" />
        <path d="M10 19V6" />
        <path d="M16 19v-8" />
        <path d="M4 19h16" />
      </svg>
    ),
  },
  {
    title: "Mandate Acceptance Criteria",
    description:
      "Ensuring that mandates are accepted based on a thorough evaluation of suitability, capability, and risk.",
    href: "/investor-relations/code-and-policies/mandate-acceptance-criteria",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="17" rx="1.5" />
        <path d="M9 3.2h6a1 1 0 0 1 1 1v1.2H8V4.2a1 1 0 0 1 1-1z" />
        <path d="M8.5 11.5h7" />
        <path d="M8.5 15h7" />
      </svg>
    ),
  },
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

export default function CodeAndPoliciesPage() {
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
            src="/codepolicy.png"
            alt="Stacked policy and compliance binders on a desk"
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
              <AnimatedWords text="Code and Policies" />
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
              At Vatsa Capital Venture, we are committed to the highest standards
              of governance, transparency, and accountability.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="w-6 h-[2px] bg-orange-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#0e4980]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
            Our Commitments
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl mb-8 sm:mb-10"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Our policies and codes are designed to uphold ethical conduct, ensure regulatory
          compliance, protect stakeholder interests, and promote a culture of integrity across
          the organization. These documents guide our actions and strengthen the trust placed
          in us by our investors, partners, and the communities we serve.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="rounded-xl border border-slate-100 shadow-[0_2px_20px_-8px_rgba(15,42,92,0.12)] divide-y divide-slate-100 overflow-hidden"
        >
          {policies.map((policy, i) => (
            <motion.div key={policy.title} variants={fadeUp} custom={i}>
              <Link
                href={policy.href}
                className="group flex items-center justify-between gap-4 px-4 sm:px-6 py-5 sm:py-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-blue-50 text-[#0e4980]"
                  >
                    {policy.icon}
                  </motion.span>
                  <div className="min-w-0">
                    <h3 className="text-[#0e4980] font-semibold text-sm sm:text-[15px]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                      {policy.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1 max-w-xl" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                      {policy.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1.5 text-[#0e4980] font-semibold text-xs sm:text-sm whitespace-nowrap" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  View Policy
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}