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
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
        y: -8,
        boxShadow: "0 20px 40px -12px rgba(21,34,73,0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 px-8 pt-8 pb-7 text-center flex flex-col"
    >
      <span className="absolute top-5 left-6 text-3xl font-extrabold text-gray-100 select-none">
        {service.number}
      </span>

      <motion.span
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-[#152249] mb-5"
      >
        <Icon size={28} className="text-orange-500" strokeWidth={2} />
      </motion.span>

      <h3 className="text-lg font-bold text-[#152249] mb-2">
        {service.title}
      </h3>
      <span className="block h-0.5 w-8 bg-orange-500 rounded-full mx-auto mb-4" />

      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        {service.description}
      </p>

      <ul className="text-left space-y-2 mb-6">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2
              size={16}
              className="text-orange-500 shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a href={`/services/${service.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#152249] hover:text-orange-600 transition"
      >
        Learn More
        <ArrowRight size={15} />
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
      {/* Section 1: Services Hero Banner */}
      <section
  ref={heroRef}
  className="relative w-full min-h-[420px] sm:min-h-[520px] flex items-end overflow-hidden"
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

  <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="text-orange-500 font-medium text-[11px] tracking-[0.2em] uppercase">
          Our Services
        </span>
        <span className="w-10 h-[2px] bg-orange-500/60"></span>
      </motion.div>

      <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] mb-4">
        <span className="text-white">Comprehensive Financial</span>
        <br />
        <span className="text-orange-500">Solutions. Lasting Impact.</span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-sm sm:text-[15px] text-slate-300/90 leading-relaxed max-w-xl mb-8"
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
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 group"
      >
        Talk To Our Experts
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </motion.a>
    </div>
  </div>
</section>

      {/* Section 2: Intro paragraph */}
      <section className="w-full bg-white  py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto text-center space-y-5 text-[15px] text-[#152249] leading-relaxed"
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

      {/* Section 3: Our Core Services */}
      <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152249] mt-3 mb-4">
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
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
            className="grid sm:grid-cols-2 gap-6 max-w-[calc(2*20rem+1.5rem)] mx-auto"
          >
            {coreServices.slice(3).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: CTA Banner */}
      <section ref={ctaRef} className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1350px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-visible min-h-[220px] flex items-center bg-[#0b1a3a] rounded-3xl"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
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

            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/90 to-transparent rounded-3xl -z-10" />

            <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-orange-500 font-semibold text-sm tracking-wide uppercase block mb-3"
              >
                Partner With Aksan
              </motion.span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
                <AnimatedWords text="Let's Build Your" className="text-white" />
                <br />
                <AnimatedWords text="Financial Success Together." className="text-orange-500" />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-8"
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
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/strategy"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                >
                  Explore Our Strategy
                  <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}