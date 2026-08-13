"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Lodge Your Complaint",
    description:
      "You may submit your grievance in writing through email, letter, or by using the contact details provided below.",
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
    number: "02",
    title: "Acknowledgement",
    description: "We will acknowledge receipt of your grievance within 2 working days.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="M3.5 6.5L12 13l8.5-6.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Review & Resolution",
    description: "Your grievance will be reviewed and investigated by the concerned team.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M16.2 16.2L21 21" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Response",
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
  "Please provide accurate details to help us resolve your grievance faster.",
  "We maintain confidentiality of your information.",
  "We are committed to fair treatment and complete transparency.",
  "Your feedback helps us improve our services.",
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function AnimatedSection({ children, className = "", variants = fadeInUp }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function InvestorGrievanceRedressalPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <main className="bg-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero with Parallax - Full Width Dark Banner */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[600px] lg:min-h-[520px] flex items-center bg-[#0b1a3a]">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: heroImageY }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/IG.png"
            alt="Desk with a laptop showing charts and a card reading 'Your concerns. Our priority.'"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-[#0b1a3a]/30 z-0" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            {/* Breadcrumb
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              aria-label="Breadcrumb" 
              className="mb-5"
            >
              <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm text-white/70" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link
                    href="/investor-relations"
                    className="hover:text-white transition-colors"
                  >
                    Investor Relations
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li className="text-orange-400 font-medium">Investor Grievance Redressal</li>
              </ol>
            </motion.nav> */}

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

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              Investor Grievance <br className="hidden sm:block" />
              Redressal
            </motion.h1>
            
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block h-[3px] bg-orange-500 mt-4 mb-5" 
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}
            >
              We are committed to addressing investor grievances promptly and fairly
              through a transparent and structured redressal mechanism.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <hr className="border-slate-200 mt-4" />
      </div>

      {/* Investor Grievances / Grievance Redressal Mechanism */}
      <AnimatedSection className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-4">
        <motion.p 
          variants={fadeInUp}
          className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Investor Grievances
        </motion.p>
        <motion.span 
          variants={fadeInUp}
          className="block w-12 h-[3px] bg-orange-500 mb-4" 
        />
        <motion.h2 
          variants={fadeInUp}
          className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Grievance Redressal Mechanism
        </motion.h2>
        <motion.p 
          variants={fadeInUp}
          className="text-slate-500 text-sm mb-6 sm:mb-7"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Investors can lodge their grievances through the following channels:
        </motion.p>

        <motion.div 
          variants={staggerContainer}
          className="rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] overflow-hidden hover:shadow-[0_8px_30px_-12px_rgba(15,42,92,0.2)] transition-shadow duration-500"
        >
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <motion.div 
              variants={fadeInLeft}
              className="flex items-start gap-4 p-5 sm:p-6 hover:bg-slate-50/50 transition-colors duration-300"
            >
              <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-blue-50 text-[#0e4980]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <path d="M3.5 6.5L12 13l8.5-6.5" />
                </svg>
              </span>
              <div>
                <p className="text-slate-900 font-semibold text-sm sm:text-[15px] mb-1.5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  1. Email
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  Send a detailed email to our dedicated grievances cell at{" "}
                  <a
                    href="mailto:investors.grievances@vatsacapitalventure.com"
                    className="text-[#0e4980] font-medium hover:underline break-all transition-colors"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  >
                    info@aksan.in
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="flex items-start gap-4 p-5 sm:p-6 hover:bg-slate-50/50 transition-colors duration-300"
            >
              <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-blue-50 text-[#0e4980]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <path d="M3.5 6.5L12 13l8.5-6.5" />
                </svg>
              </span>
              <div>
                <p className="text-slate-900 font-semibold text-sm sm:text-[15px] mb-1.5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  2. Letter
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  Mail your grievance to the Compliance Officer at our registered office address.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="flex items-start gap-3 bg-slate-50 border-t border-slate-100 px-5 sm:px-6 py-4"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-slate-400">
              <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
              <path d="M14 3v4h4" />
              <path d="M8.5 12h6" />
              <path d="M8.5 15h6" />
            </svg>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Please ensure you provide your full name, contact details, and a clear description of
              your grievance to help us resolve it efficiently. We aim to acknowledge all grievances
              within 48 hours and resolve them within 30 days.
            </p>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Key Contacts for Grievances */}
      <AnimatedSection className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-16">
        <motion.div 
          variants={staggerContainer}
          className="rounded-xl bg-[#0e2a4e] text-white p-6 sm:p-8 relative overflow-hidden group"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700" />
          
          <motion.h3 
            variants={fadeInUp}
            className="font-bold text-base sm:text-lg mb-1 relative z-10"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Key Contacts for Grievances
          </motion.h3>
          <motion.span 
            variants={fadeInUp}
            className="block w-10 h-[3px] bg-orange-500 mb-6 relative z-10" 
          />

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            <motion.div 
              variants={fadeInLeft}
              className="flex items-start gap-4"
            >
              <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 text-white group-hover:bg-white/20 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-sm sm:text-[15px] mb-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Compliance Officer</p>
                <a href="mailto:compliance@aksan.in" className="block text-white/80 text-sm hover:text-white hover:underline transition-colors" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  info@aksan.in
                </a>
                <a href="tel:+912269178000" className="block text-white/80 text-sm hover:text-white hover:underline transition-colors" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  +91 22 6917 8000
                </a>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="flex items-start gap-4 sm:pl-8 sm:border-l sm:border-white/15"
            >
              <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 text-white group-hover:bg-white/20 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.4" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-sm sm:text-[15px] mb-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Registered Office Address</p>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
28/27, Parvathy Apartments, 2nd Floor,
Damodaran Street, T.Nagar,
Chennai - 600 017, Tamil Nadu, India.                    </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Our Commitment */}
      <AnimatedSection className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-14 text-center">
        <motion.h2 
          variants={fadeInUp}
          className="text-xl sm:text-2xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Our Commitment
        </motion.h2>
        <motion.span 
          variants={fadeInUp}
          className="inline-block w-14 h-[3px] bg-orange-500 mt-4 mb-5" 
        />
        <motion.p 
          variants={fadeInUp}
          className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          At Aksan Capital, we value your trust and are committed to ensuring that your concerns
          are heard, acknowledged, and resolved in a fair, transparent, and timely manner.
        </motion.p>
      </AnimatedSection>

      {/* Our Grievance Redressal Process */}
      <AnimatedSection className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-16">
        <motion.h2 
          variants={fadeInUp}
          className="text-lg sm:text-xl font-bold text-[#0e4980]"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Our Grievance Redressal Process
        </motion.h2>
        <motion.span 
          variants={fadeInUp}
          className="block w-12 h-[3px] bg-orange-500 mt-3 mb-7 sm:mb-8" 
        />

        <motion.div 
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={step.number} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                  },
                },
              }}
              className="relative flex items-start group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-1 rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-5 sm:p-6 h-full group-hover:shadow-[0_8px_30px_-12px_rgba(15,42,92,0.25)] group-hover:border-orange-200 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <motion.span 
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white text-xs font-bold"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.number}
                  </motion.span>
                  <span className="text-[#0e4980] group-hover:text-orange-500 transition-colors duration-300">{step.icon}</span>
                </div>
                <h3 className="text-[#0e4980] font-semibold text-sm sm:text-[15px] mb-2" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  {step.description}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <span
                  className="hidden lg:flex items-center justify-center absolute top-1/2 -right-3 -translate-y-1/2 text-slate-300 z-10 group-hover:text-orange-400 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* Where to Contact Us & Important Notes */}
      <AnimatedSection className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {/* Where to Contact Us */}
          <motion.div 
            variants={fadeInLeft}
            className="rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-6 sm:p-8 hover:shadow-[0_8px_30px_-12px_rgba(15,42,92,0.2)] transition-shadow duration-500"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-[#0e4980] font-bold text-base sm:text-lg mb-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Where to Contact Us
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-6" />

            <div className="flex flex-col gap-5">
              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980] group-hover:bg-[#0e4980] group-hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="1.5" />
                    <path d="M3.5 6.5L12 13l8.5-6.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Email</p>
                  <a
                    href="mailto:investorgrievances@aksan.in"
                    className="text-[#0e4980] font-medium text-sm sm:text-[15px] hover:text-orange-500 transition-colors"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  >
                    info@aksan.in
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980] group-hover:bg-[#0e4980] group-hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.25 1L6.6 10.8z" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Phone</p>
                  <a
                    href="tel:+914440055781"
                    className="text-[#0e4980] font-medium text-sm sm:text-[15px] hover:text-orange-500 transition-colors"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  >
                    +91 44400 55781
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-[#0e4980] group-hover:bg-[#0e4980] group-hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.4" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500 text-xs sm:text-sm" style={{ fontFamily: "'Noto Sans', sans-serif" }}>Address</p>
                  <p className="text-[#0e4980] font-medium text-sm sm:text-[15px] leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    28/27, Parvathy Apartments, 2nd Floor,

Damodaran Street, T.Nagar,

Chennai - 600 017, Tamil Nadu, India.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div 
            variants={fadeInRight}
            className="rounded-xl border border-slate-100 shadow-[0_2px_16px_-8px_rgba(15,42,92,0.14)] p-6 sm:p-8 hover:shadow-[0_8px_30px_-12px_rgba(15,42,92,0.2)] transition-shadow duration-500"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-[#0e4980] font-bold text-base sm:text-lg mb-1" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Important Notes
            </h3>
            <span className="block w-10 h-[3px] bg-orange-500 mt-3 mb-6" />

            <div className="flex flex-col gap-4">
              {importantNotes.map((note, idx) => (
                <motion.div 
                  key={note} 
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span 
                    className="shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.span>
                  <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900 transition-colors duration-300" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                    {note}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </main>
  );
}