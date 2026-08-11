"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { coreServices } from "@/app/data/services";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={`inline-block ${className}`}
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

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={fadeUp}
      custom={index % 3}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -12px rgba(21,34,73,0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center flex flex-col"
    >
      {/* Brighter number text */}
      <span className="absolute top-4 left-4 sm:top-5 sm:left-6 text-2xl sm:text-3xl font-extrabold text-gray-300 select-none">
        {service.number}
      </span>

      <motion.span
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#152249] mb-4 sm:mb-5"
      >
        <Icon size={24} className="text-orange-500" strokeWidth={2} />
      </motion.span>

      {/* Brighter title */}
      <h3 className="text-base sm:text-lg font-bold text-[#1a2a4a] mb-2">
        {service.title}
      </h3>
      <span className="block h-0.5 w-8 bg-orange-500 rounded-full mx-auto mb-3 sm:mb-4" />

      {/* Brighter description */}
      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 sm:mb-5">
        {service.description}
      </p>

      {/* Brighter list items */}
      <ul className="text-left space-y-2 mb-4 sm:mb-6">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800">
            <CheckCircle2
              size={14}
              className="text-orange-500 shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a href={`/services/${service.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1a2a4a] hover:text-orange-600 transition"
      >
        Learn More
        <ArrowRight size={14} />
      </a>
    </motion.div>
  );
}

export default function Services() {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaImageY = useTransform(ctaProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className={`${notoSans.className} overflow-hidden`}>
      {/* HERO BANNER */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[380px] sm:min-h-[450px] md:min-h-[520px] flex items-end overflow-hidden"
      >
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src="/HomeBanner.png"
            alt="AKSAN financial services — skyscrapers and market growth"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-[#0b1a3a]/20 -z-10" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-3 sm:mb-4"
            >
              <span className="text-orange-500 font-medium text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                Our Services
              </span>
              <span className="w-8 sm:w-10 h-[2px] bg-orange-500/60"></span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] mb-3 sm:mb-4">
              <span className="text-white">Comprehensive Financial</span>
              <br />
              <span className="text-orange-500">Solutions. Lasting Impact.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-[15px] text-slate-300/90 leading-relaxed max-w-xl mb-5 sm:mb-8"
            >
              At Aksan, we offer end-to-end merchant banking and financial
              advisory services designed to help businesses raise capital,
              optimize value, and achieve sustainable growth.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 group"
            >
              Talk To Our Experts
              <ArrowRight size={14} className="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* INTRO PARAGRAPH */}
      <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5 text-sm sm:text-[15px] text-[#152249] leading-relaxed"
        >
          <motion.p variants={fadeUp} custom={0}>
            At AKSAN, we are a{" "}
            <span className="font-semibold">SEBI Registered Category-I Merchant Banker</span>{" "}
            committed to delivering strategic, compliant, and execution-focused
            capital market solutions.
          </motion.p>
          <motion.p variants={fadeUp} custom={1}>
            Built on the principles of integrity, precision, and regulatory
            excellence, we provide{" "}
            <span className="font-semibold">comprehensive merchant banking services</span>{" "}
            tailored to support every stage of your financial growth.
          </motion.p>
          <motion.p variants={fadeUp} custom={2}>
            Our solutions are designed to create long-term value through
            expertise, diligence, and a deep understanding of India&apos;s
            evolving capital markets.
          </motion.p>
          <motion.p variants={fadeUp} custom={3}>
            With a dynamic team and strong domain knowledge, we stand as a{" "}
            <span className="font-semibold">trusted partner</span> for
            businesses aiming higher.
          </motion.p>
        </motion.div>
      </section>

      {/* CORE SERVICES */}
      <section className="w-full bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#152249] mt-2 sm:mt-3 mb-3 sm:mb-4">
              <AnimatedWords text="Our Core Services" />
            </h2>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="block h-1 bg-orange-500 mx-auto rounded-full"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6"
          >
            {coreServices.slice(0, 3).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[calc(2*20rem+1.5rem)] mx-auto"
          >
            {coreServices.slice(3).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section ref={ctaRef} className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1350px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-visible min-h-[200px] sm:min-h-[220px] flex items-center bg-[#0b1a3a] rounded-2xl sm:rounded-3xl"
          >
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
              <motion.div
                style={{ y: ctaImageY }}
                className="relative w-full h-full"
              >
                <Image
                  src="/CTA.png"
                  alt="AKSAN financial success partnership"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/90 to-transparent rounded-2xl sm:rounded-3xl -z-10" />

            <div className="relative z-10 px-4 sm:px-6 lg:px-14 py-8 sm:py-10 lg:py-12 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-orange-500 font-semibold text-xs sm:text-sm tracking-wide uppercase block mb-2 sm:mb-3"
              >
                Partner With Aksan
              </motion.span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight mb-3 sm:mb-4">
                <AnimatedWords text="Let's Build Your" className="text-white" />
                <br />
                <AnimatedWords text="Financial Success Together." className="text-orange-500" />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed mb-5 sm:mb-8"
              >
                From fundraising to restructuring, we provide the expertise,
                insights, and execution support you need to grow with
                confidence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-colors"
                >
                  Contact Us
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/strategy"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-colors"
                >
                  Explore Our Strategy
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}