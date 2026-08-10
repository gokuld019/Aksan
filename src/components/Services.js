"use client";

import { useRef } from "react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
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

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const highlightServices = [
  { icon: Target, title: "IPO Advisory", desc: "Unlocking growth through public markets for SME companies." },
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
  { icon: Target, title: "IPO Advisory", desc: "We guide SME companies through every stage of the IPO journey — from assessing readiness and structuring the offering to due diligence, regulatory compliance, and post-listing advisory." },
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
    <section className={`bg-white ${notoSans.className}`}>
      {/* Highlight bar */}
      <div className="max-w-[1400px] mx-auto px-[4vw] sm:px-6 pt-[6vw] sm:pt-16 relative z-20">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-[3vw] sm:rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5"
          style={{ background: "linear-gradient(90deg, var(--navy-900), var(--navy-950))" }}
        >
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
            {highlightServices.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                className="p-[4.5vw] sm:p-6 lg:border-r lg:border-slate-700 transition-shadow"
              >
                <span className="w-[8vw] h-[8vw] sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-orange-500 text-orange-500 mb-[2.5vw] sm:mb-4">
                  <item.icon className="w-[4vw] h-[4vw] sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
                </span>
                <h3 className="text-white font-semibold text-[3.6vw] sm:text-base mb-[1vw] sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-[3.2vw] sm:text-sm leading-relaxed mb-[2vw] sm:mb-3">
                  {item.desc}
                </p>
                <a href="#" className="text-orange-500 text-[3vw] sm:text-sm font-medium inline-flex items-center gap-1">
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="md:col-span-1 flex flex-row md:flex-col justify-center gap-[3.5vw] sm:gap-6 p-[4.5vw] sm:p-6 flex-wrap">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={revealItem} className="flex items-center gap-[2vw] sm:gap-3">
                <span className="w-[6.5vw] h-[6.5vw] sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-orange-500 text-orange-500 shrink-0">
                  <stat.icon className="w-[3vw] h-[3vw] sm:w-[14px] sm:h-[14px]" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-white font-bold text-[3.6vw] sm:text-base leading-none">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[2.6vw] sm:text-xs mt-[0.5vw] sm:mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What we do */}
      <div className="max-w-[1400px] mx-auto px-[4vw] sm:px-6 py-[8vw] sm:py-24 grid grid-cols-1 lg:grid-cols-3 gap-[5vw] lg:gap-0">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-1 text-center lg:text-left"
        >
          <p className="text-orange-500 font-semibold text-[3vw] sm:text-sm tracking-wide mb-[1.5vw] sm:mb-3">
            WHAT WE DO
          </p>
          <h2
            className="text-[6vw] sm:text-3xl md:text-4xl font-bold leading-tight mb-[2.5vw] sm:mb-4"
            style={{ color: "#1E2A5E" }}
          >
            Comprehensive Solutions Tailored for You
          </h2>
          <p className="text-slate-500 text-[3.4vw] sm:text-base leading-relaxed mb-[4vw] sm:mb-6 max-w-lg lg:max-w-none mx-auto lg:mx-0">
            We offer a wide range of financial advisory services to help you
            achieve your financial goals with confidence.
          </p>
          <button className="inline-flex items-center gap-[1.5vw] border border-slate-300 font-semibold text-[3vw] sm:text-sm px-[4vw] sm:px-5 py-[2.5vw] sm:py-3 rounded-md hover:bg-slate-50 transition" style={{ color: "#1E2A5E" }}>
            VIEW ALL SERVICES <span aria-hidden="true">→</span>
          </button>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:col-span-2 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-[3.5vw] sm:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={revealItem}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(15,23,42,0.08)" }}
              className="border border-slate-200 rounded-[2.5vw] sm:rounded-xl p-[4vw] sm:p-6 transition-colors"
            >
              <span className="w-[8vw] h-[8vw] sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-slate-100 text-blue-900 mb-[2.5vw] sm:mb-4">
                <service.icon className="w-[4vw] h-[4vw] sm:w-5 sm:h-5" strokeWidth={2} />
              </span>
              <h3 className="font-semibold text-[3.6vw] sm:text-base mb-[1vw] sm:mb-2" style={{ color: "#1E2A5E" }}>
                {service.title}
              </h3>
              <p className="text-slate-500 text-[3.2vw] sm:text-sm leading-relaxed mb-[2.5vw] sm:mb-4">
                {service.desc}
              </p>

              <a href="#" className="text-orange-500 text-[2.8vw] sm:text-xs font-semibold tracking-wide inline-flex items-center gap-1">
                LEARN MORE <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* About / USP */}
      <div className="max-w-[1400px] mx-auto px-[4vw] sm:px-6 pb-[8vw] sm:pb-24">
        <div
          ref={aboutRef}
          className="rounded-[3vw] sm:rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left: About card with parallax background image */}
          <div className="relative p-[5vw] sm:p-10 flex flex-col justify-center min-h-[100vw] sm:min-h-[480px] overflow-hidden">
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
              className="relative z-10 text-center lg:text-left"
            >
              <motion.p variants={revealItem} className="text-slate-300 text-[2.6vw] sm:text-xs font-semibold tracking-wide mb-[1.5vw] sm:mb-3">
                ABOUT AKSAN
              </motion.p>
              <motion.h3 variants={revealItem} className="text-[5vw] sm:text-2xl md:text-3xl font-bold text-white leading-snug mb-[2.5vw] sm:mb-4">
                Your Trusted Partner in Financial Growth
              </motion.h3>
              <motion.p variants={revealItem} className="text-slate-200 text-[3.2vw] sm:text-sm leading-relaxed mb-[3.5vw] sm:mb-6 max-w-md mx-auto lg:mx-0">
                AKSAN Capital Advisory Private Limited is a dedicated team of
                finance and capital market professionals providing
                comprehensive advisory services across Merchant Banking,
                Corporate Advisory, and Investment Banking solutions.
              </motion.p>

              <motion.ul variants={revealItem} className="space-y-[1.2vw] sm:space-y-2 mb-[4vw] sm:mb-6 inline-block lg:block text-left">
                {["Client-Centric Approach", "Expertise & Experience", "Transparent & Ethical"].map(
                  (point) => (
                    <li key={point} className="flex items-center gap-[1.8vw] sm:gap-2 text-white text-[3.2vw] sm:text-sm font-medium">
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
                className="inline-flex items-center gap-[1.5vw] bg-white text-slate-900 font-semibold text-[3vw] sm:text-sm px-[4vw] sm:px-5 py-[2.5vw] sm:py-3 rounded-md hover:bg-slate-100 transition"
              >
                KNOW MORE ABOUT US <span aria-hidden="true">→</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: USP grid */}
          <div className="bg-white p-[6vw] sm:p-12 lg:p-14 flex flex-col justify-center">
            <p className="text-orange-500 font-bold text-[3vw] sm:text-sm tracking-wide mb-[1.5vw] sm:mb-3 text-left">
              OUR USP
            </p>
            <h3
              className="text-[5.5vw] sm:text-3xl font-bold mb-[6vw] sm:mb-10 text-left"
              style={{ color: "#1E2A5E" }}
            >
              Why Investors Choose Aksan
            </h3>

            <motion.div
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-x-[5vw] sm:gap-x-12 gap-y-[4vw] sm:gap-y-8"
            >
              {usps.map((usp) => (
                <motion.div key={usp.title} variants={revealItem} className="flex items-start gap-[2.2vw] sm:gap-3">
                  <span className="w-[8vw] h-[8vw] sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#EEF0F7] text-[#1E2A5E] shrink-0">
                    <usp.icon className="w-[3.8vw] h-[3.8vw] sm:w-[17px] sm:h-[17px]" strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="font-bold text-[3.4vw] sm:text-sm mb-[0.8vw] sm:mb-1" style={{ color: "#1E2A5E" }}>
                      {usp.title}
                    </h4>
                    <p className="text-slate-500 text-[2.9vw] sm:text-xs leading-relaxed">
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