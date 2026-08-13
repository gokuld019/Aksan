"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Submit Your Complaint",
    description: "Share your complaint in writing through email or letter with relevant details and documents.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3.5 6.5L12 13l8.5-6.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Acknowledgement",
    description: "We will acknowledge receipt of your complaint within 2 working days.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M16.2 16.2L21 21" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Review & Investigation",
    description: "Your complaint will be reviewed and investigated by our designated team.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v4h4" />
        <path d="M8.5 12h6" />
        <path d="M8.5 15h6" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Resolution",
    description: "We will provide a response within 21 working days with an appropriate resolution.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.3 2.3L16 10" />
      </svg>
    ),
  },
];

const importantNotes = [
  "Please provide accurate details to help us resolve your complaint faster.",
  "We maintain confidentiality of your information.",
  "We are committed to fair treatment and complete transparency.",
  "Your feedback helps us improve our services.",
];

// Update this list each month — filename should point to the actual PDF in /public/documents/
const reports = [
  { label: "Investor Complaints – July 31, 2026", file: "/documents/investor-complaints-2026-07-31.pdf" },
  { label: "Investor Complaints – April 30, 2026", file: "/documents/investor-complaints-2026-04-30.pdf" },
  { label: "Investor Complaints – February 28, 2026", file: "/documents/investor-complaints-2026-02-28.pdf" },
  { label: "Investor Complaints – June 30, 2026", file: "/documents/investor-complaints-2026-06-30.pdf" },
  { label: "Investor Complaints – March 31, 2026", file: "/documents/investor-complaints-2026-03-31.pdf" },
  { label: "Investor Complaints – May 31, 2026", file: "/documents/investor-complaints-2026-05-31.pdf" },
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

export default function InvestorComplaintsPage() {
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
            src="/Icom.png"
            alt="Desk with a laptop and a card reading 'We value your trust'"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-[#0b1a3a]/20 z-0" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            {/* <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
              className="mb-5"
            >
              <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-300/80" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                <li>
                  <Link href="/" className="hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">&rsaquo;</li>
                <li>
                  <Link href="/investor-relations" className="hover:text-orange-400 transition-colors">
                    Investor Relations
                  </Link>
                </li>
                <li aria-hidden="true">&rsaquo;</li>
                <li className="text-orange-400 font-medium">Investor Complaints</li>
              </ol>
            </motion.nav> */}

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              <AnimatedWords text="Investor Complaints" />
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
              At Aksan Capital, we are committed to addressing your concerns with
              transparency, fairness, and in a timely manner.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-md mt-4"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              We have established multiple channels to help you raise your
              complaints or grievances conveniently.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <hr className="border-slate-200 mt-4" />
      </div>

      {/* Monthly Reports */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-10 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="flex items-start gap-4 mb-6 sm:mb-8"
        >
          <span className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-blue-50 text-[#0e4980]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
              <path d="M14 3v4h4" />
              <path d="M8.5 12h6" />
              <path d="M8.5 15h6" />
              <path d="M8.5 18h4" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Monthly Investor Complaints Reports
            </h2>
            <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Download the monthly investor complaints disclosure reports for regulatory reference.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {reports.map((report, i) => (
            <motion.a
              key={report.label}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              href={report.file}
              download
              className="group flex items-center justify-between gap-3 bg-[#0e4980] hover:bg-[#0c3d6b] text-white rounded-lg px-4 sm:px-5 py-3.5 sm:py-4 transition-colors"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              <span className="flex items-center gap-3 min-w-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                  <path d="M14 3v4h4" />
                </svg>
                <span className="text-xs sm:text-sm font-medium truncate">{report.label}</span>
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M12 4v12" />
                <path d="M6 12l6 6 6-6" />
                <path d="M5 21h14" />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 sm:mt-6 flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-lg px-4 sm:px-5 py-3.5 sm:py-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-slate-400">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 8h.01" />
          </svg>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
            These reports are published periodically in accordance with applicable SEBI regulations
            and disclosure requirements.
          </p>
        </motion.div>
      </section>

      {/* Our Commitment */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Our Commitment
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
          At Aksan Capital, we value your trust and are committed to resolving investor complaints
          efficiently and fairly. We have a structured process in place to ensure that your concerns
          are heard and addressed promptly.
        </motion.p>
      </section>

      {/* How to Raise a Complaint */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          How to Raise a Complaint
        </motion.h2>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="block h-[3px] bg-orange-500 mt-3 mb-7 sm:mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {steps.map((step, idx) => (
            <motion.div key={step.number} variants={fadeUp} custom={idx} className="relative flex items-start">
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 16px 32px -10px rgba(15,42,92,0.2)" }}
                transition={{ duration: 0.25 }}
                className="flex-1 rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-5 sm:p-6 h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white text-xs font-bold" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    {step.number}
                  </span>
                  <span className="text-[#0e4980]">{step.icon}</span>
                </div>
                <h3 className="text-[#0e4980] font-semibold text-sm sm:text-[15px] mb-2" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {step.description}
                </p>
              </motion.div>
              {idx < steps.length - 1 ? (
                <span
                  className="hidden lg:flex items-center justify-center absolute top-1/2 -right-3 -translate-y-1/2 text-slate-300 z-10"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Us & Escalation Matrix */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-6 sm:p-8"
          >
            <h3 className="text-[#0e4980] font-bold text-base sm:text-lg" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Where to Contact Us
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-6" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="1.5" />
                    <path d="M3.5 6.5L12 13l8.5-6.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Email</p>
                  <a href="mailto:investorgrievances@aksan.in" className="text-[#0e4980] font-medium text-sm sm:text-[15px] hover:underline" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    investorgrievances@aksan.in
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1L6.6 10.8z" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Phone</p>
                  <a href="tel:+912269178000" className="text-[#0e4980] font-medium text-sm sm:text-[15px] hover:underline" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    +91 22 6917 8000
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={2} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.4" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Address</p>
                  <p className="text-[#0e4980] font-medium text-sm sm:text-[15px] leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    A-601, One BKC, Bandra Kurla Complex, Bandra (E), Mumbai – 400051, India
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-6 sm:p-8"
          >
            <h3 className="text-[#0e4980] font-bold text-base sm:text-lg" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Escalation Matrix
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-6" />

            <p className="text-slate-600 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              If you are not satisfied with the resolution, you may escalate your complaint to our
              Compliance Officer.
            </p>

            <div className="flex items-start gap-4 bg-blue-50 rounded-lg p-4 sm:p-5 mb-5">
              <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#0e4980]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6" />
                </svg>
              </span>
              <div>
                <p className="text-[#0e4980] font-semibold text-sm sm:text-[15px]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  Compliance Officer
                </p>
                <a href="mailto:compliance@aksan.in" className="block text-slate-600 text-sm hover:underline" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  compliance@aksan.in
                </a>
                <a href="tel:+912269178000" className="block text-slate-600 text-sm hover:underline" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  +91 22 6917 8000
                </a>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              As a last resort, you may also approach SEBI&apos;s SCORES platform.
            </p>
            
              <a href="https://scores.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0e4980] font-medium text-sm hover:underline break-all"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              https://scores.sebi.gov.in
            </a>
          </motion.div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Important Notes
        </motion.h2>
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="block h-[3px] bg-orange-500 mt-3 mb-6 sm:mb-7"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl bg-[#fdf1e8] px-5 sm:px-8 py-6 sm:py-7"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 gap-x-8 gap-y-4"
          >
            {importantNotes.map((note, i) => (
              <motion.div key={note} variants={fadeUp} custom={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-slate-700 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {note}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}