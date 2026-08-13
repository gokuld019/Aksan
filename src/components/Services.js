"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Target,
  BarChart3,
  ShieldCheck,
  Clock,
  User,
  IndianRupee,
  Users,
  Crosshair,
  TrendingUp,
  PieChart,
  Building2,
  Shield,
  Handshake,
  Globe,
} from "lucide-react";

const highlightServices = [
  { icon: Target, title: "IPO", desc: "Unlocking growth through public markets for SME companies." },
  { icon: BarChart3, title: "Rights Issue", desc: "Capital infusion without debt for listed companies." },
  { icon: ShieldCheck, title: "Preferential Allotment", desc: "Efficient, targeted capital raising for listed companies." },
  { icon: Clock, title: "Follow-on Public Offer", desc: "Leveraging public markets for continued growth." },
];

const stats = [
  { icon: User, value: "25+", label: "Years of Experience" },
  { icon: IndianRupee, value: "₹8,500 Cr+", label: "Assets Under Advisory" },
  { icon: Users, value: "150+", label: "Happy Investors" },
  { icon: Crosshair, value: "100+", label: "Successful Investments" },
];

const services = [
  { icon: Target, title: "IPO", desc: "We guide SME companies through every stage of the IPO journey — from assessing readiness and structuring the offering to due diligence, regulatory compliance, and post-listing advisory." },
  { icon: TrendingUp, title: "Rights Issue Advisory", desc: "We help listed companies raise capital through Rights Issues with regulatory precision — from strategic planning and SEBI documentation to underwriting and compliance management." },
  { icon: Shield, title: "Preferential Allotment", desc: "We guide listed companies through Preferential Allotments — from valuation and investor identification to due diligence, documentation, and post-allotment compliance." },
  { icon: PieChart, title: "Follow-on Public Offer", desc: "We support listed companies raising capital through FPOs — covering business assessment, due diligence, capital structuring, DRHP documentation, and investor outreach." },
  { icon: BarChart3, title: "Merchant Banking Services", desc: "One of our core areas of expertise, covering end-to-end capital markets execution for SME and Main Board companies across India." },
  { icon: Building2, title: "Corporate Advisory", desc: "Advisory support across mergers and acquisitions, business valuation, fund raising, and takeover advisory for growing companies." },
];

const usps = [
  { icon: User, title: "Independent Advice", desc: "Unbiased solutions aligned with your best interests." },
  { icon: Shield, title: "Research Driven", desc: "Data-backed insights for smarter investment decisions." },
  { icon: BarChart3, title: "Risk-Adjusted Approach", desc: "We balance risk and reward to protect your wealth." },
  { icon: Clock, title: "Proven Track Record", desc: "Delivering consistent results across market cycles." },
  { icon: Handshake, title: "Long-Term Partnership", desc: "We grow with you through every financial milestone." },
  { icon: Globe, title: "Global Perspective", desc: "Access to global opportunities with local expertise." },
];

const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const aboutRef = useRef(null);

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const aboutImageY = useTransform(aboutProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="bg-white">
      {/* Highlight bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 relative z-20">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0B1A33 0%, #10254A 40%, #0F3A66 75%, #0E4A7A 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Services Grid - 4 columns */}
            <div className="md:col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
                {highlightServices.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={revealItem}
                    whileHover={{ y: -4 }}
                    className="p-5 sm:p-6 lg:p-7 transition-shadow"
                  >
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-orange-500 text-orange-500 mb-3 sm:mb-4">
                        <item.icon className="w-5 h-5 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
                      </span>
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3">
                        {item.desc}
                      </p>
                      <a href="#" className="text-orange-500 text-xs sm:text-sm font-medium inline-flex items-center gap-1 hover:text-orange-400 transition">
                        Learn More <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Column - Fixed Alignment */}
            <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-slate-700">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-4 p-5 sm:p-6">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={revealItem}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-orange-500 text-orange-500 shrink-0">
                      <stat.icon className="w-4 h-4 sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm sm:text-base leading-tight">
                        {stat.value}
                      </p>
                      <p className="text-slate-400 text-[10px] sm:text-xs leading-tight mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What we do */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ">
          {/* Left Column - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
          >
            <div className="text-center lg:text-left">
              <p className="text-orange-500 font-semibold text-xs sm:text-sm tracking-wide mb-2 sm:mb-3">
                WHAT WE DO
              </p>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 sm:mb-4"
                style={{ color: "#1E2A5E" }}
              >
                Comprehensive Solutions Tailored for You
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0">
                We offer a wide range of financial advisory services to help you
                achieve your financial goals with confidence.
              </p>
              <button className=" hidden sm:inline-flex md:inline-flex items-center justify-center gap-2 border border-slate-300 font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-slate-50 transition w-full sm:w-auto" style={{ color: "#1E2A5E" }}>
                VIEW ALL SERVICES <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column - Service Cards */}
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={revealItem}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(15,23,42,0.08)" }}
                  className="border border-slate-200 rounded-xl p-5 sm:p-6 transition-all flex flex-col h-full"
                >
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 text-blue-900 mb-3 sm:mb-4">
                      <service.icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2" style={{ color: "#1E2A5E" }}>
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                      {service.desc}
                    </p>
                    <a href="#" className="text-orange-500 text-[10px] sm:text-xs font-semibold tracking-wide inline-flex items-center gap-1 hover:text-orange-600 transition mt-auto">
                      LEARN MORE <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className=" mt-[30px] sm:hidden md:hidden inline-flex items-center justify-center gap-2 border border-slate-300 font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-slate-50 transition w-full sm:w-auto" style={{ color: "#1E2A5E" }}>
                VIEW ALL SERVICES <span aria-hidden="true">→</span>
              </button>
          </motion.div>
        </div>
      </div>

      {/* About / USP */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div
          ref={aboutRef}
          className="rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left: About card */}
          <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[480px] overflow-hidden">
            <motion.div style={{ y: aboutImageY }} className="absolute inset-[-6%]">
              <Image
                src="/about-bg.webp"
                alt="AKSAN office"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(15,42,79,0.92) 0%, rgba(15,42,79,0.82) 45%, rgba(15,42,79,0.35) 100%)",
              }}
            />

            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="relative z-10"
            >
              <div className="text-left lg:text-left">
                <motion.p variants={revealItem} className="text-slate-300 text-xs font-semibold tracking-wide mb-2 sm:mb-3">
                  ABOUT AKSAN
                </motion.p>
                <motion.h3 variants={revealItem} className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug mb-3 sm:mb-4">
                  Your Trusted Partner in Financial Growth
                </motion.h3>
                <motion.p variants={revealItem} className="text-slate-200 text-sm leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0">
                  AKSAN Capital Advisory Private Limited is a dedicated team of
                  finance and capital market professionals providing
                  comprehensive advisory services across Merchant Banking,
                  Corporate Advisory, and Investment Banking solutions.
                </motion.p>

                <motion.ul variants={revealItem} className="space-y-2 mb-4 sm:mb-6">
                  {["Client-Centric Approach", "Expertise & Experience", "Transparent & Ethical"].map(
                    (point) => (
                      <li key={point} className="flex items-center justify-left lg:justify-start gap-2 text-white text-sm font-medium">
                        <span className="text-orange-500" aria-hidden="true">✓</span>
                        {point}
                      </li>
                    )
                  )}
                </motion.ul>

                <motion.button
                  variants={revealItem}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-slate-100 transition w-full sm:w-auto"
                >
                  KNOW MORE ABOUT US <span aria-hidden="true">→</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right: USP grid */}
          <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="text-left sm:text-left">
              <p className="text-orange-500 font-bold text-sm tracking-wide mb-2 sm:mb-3">
                OUR USP
              </p>
              <h3
                className="text-[16px] sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-10"
                style={{ color: "#1E2A5E" }}
              >
                Why Investors Choose Aksan
              </h3>
            </div>

            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-6 "
            >
              {usps.map((usp) => (
                <motion.div key={usp.title} variants={revealItem} className="flex items-start gap-3 text-left sm:text-left">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EEF0F7] text-[#1E2A5E] shrink-0 mx-auto sm:mx-0">
                    <usp.icon className="w-[17px] h-[17px]" strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 sm:mb-1" style={{ color: "#1E2A5E" }}>
                      {usp.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {usp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}