"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, IndianRupee, UserCheck, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "25+", label: "Years of Experience" },
  { icon: IndianRupee, value: "₹8,500 Cr+", label: "Assets Under Advisory" },
  { icon: UserCheck, value: "150+", label: "Happy Investors" },
  { icon: Target, value: "100+", label: "Successful Investments" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[700px] xs:h-[600px] sm:h-[680px] md:h-[780px] lg:h-[870px] flex flex-col justify-center overflow-hidden"
    >
      {/* BACKGROUND VIDEO - MOBILE (below md) */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y: videoY }}
        className="md:hidden absolute inset-0 w-full h-full object-cover object-center -z-20 scale-110 brightness-[0.75]"
      >
        <source src="/mobbanner.mp4" type="video/mp4" />
      </motion.video>

      {/* BACKGROUND VIDEO - WEB (md and up) */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y: videoY }}
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center -z-20 scale-110 "
      >
        <source src="/webbanner.mp4" type="video/mp4" />
      </motion.video>

      {/* BLUE OVERLAY */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to right, rgb(8 15 35 / 89%) 0%, rgb(10 20 45 / 72%) 25%, rgb(12 25 55 / 24%) 45%, rgb(15 30 60 / 0%) 60%, rgb(10 20 45 / 0%) 75%, transparent 100%)`,
        }}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-[1400px] mx-auto pt-0 xs:pt-24 sm:pt-28 md:pt-32 pb-10 xs:pb-12 sm:pb-16 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 relative z-10"
      >
        <motion.p
          variants={item}
          className="text-orange-500 font-semibold tracking-wide text-[10px] xs:text-[11px] sm:text-[13px] md:text-[14px] mb-2 xs:mb-2.5 sm:mb-3 uppercase"
        >
          SEBI-registered Merchant Banker
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[32px] xs:text-[30px] sm:text-[36px] md:text-[45px] lg:text-[56px] xl:text-[67px] font-bold text-white leading-[1.15] max-w-xl break-words"
        >
          Guidance That Grows{" "}
          <span className="text-orange-500">Wealth</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white text-[13px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-medium mt-3 xs:mt-4 max-w-md leading-normal xs:whitespace-normal sm:whitespace-nowrap"
        >
          Strategic Investment. Sustainable Growth.<br /> Trusted Advisory.
        </motion.p>

        <motion.p
          variants={item}
          className="text-slate-300 text-xs xs:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-2.5 xs:mt-3 max-w-[480px] w-[300px] sm:w-full leading-relaxed"
        >
          For over two decades we've partnered with investors and
          businesses to build resilient portfolios — backed by independent
          research, transparent advice, and a client-first philosophy at
          every step.
        </motion.p>

        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 xs:mt-5 sm:mt-6 inline-flex items-center gap-2 bg-white text-slate-900 text-[12px] xs:text-[13px] sm:text-[14px] md:text-[16px] font-semibold px-4 xs:px-4.5 sm:px-5 py-2 xs:py-2.5 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
          Explore Our Services
          <span aria-hidden="true">→</span>
        </motion.button>

        {/* Stats box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-18 xs:mt-7 sm:mt-20 w-full"
        >
          <div className="bg-slate-900/75 backdrop-blur-sm rounded-lg grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20 border border-white/20 w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.06 }}
                className="flex items-center gap-2 xs:gap-2.5 px-3 xs:px-4 sm:px-5 md:px-6 py-3.5 xs:py-4 sm:py-5 md:py-6"
              >
                <span className="flex items-center justify-center w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500/20 text-orange-400 shrink-0">
                  <stat.icon size={13} strokeWidth={2} className="xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-white font-bold text-[13px] xs:text-[14px] sm:text-[15px] md:text-[17px] leading-none whitespace-nowrap">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] mt-1 xs:mt-1.5 leading-none whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}