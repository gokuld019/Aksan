"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const stats = [
  {
    value: "13",
    suffix: "+",
    label: "Companies",
    sub: "Listed on SME till date",
    highlighted: true,
  },
  {
    value: "1",
    suffix: "+",
    label: "Companies",
    sub: "DRHP filed – Mainboard",
  },
  {
    value: "3",
    suffix: "+",
    label: "Companies",
    sub: "DRHP filed – SME",
  },
  {
    value: "6.00",
    suffix: "+",
    label: "Lakhs",
    sub: "Investors Network",
  },
  {
    value: "725",
    suffix: "+",
    label: "Crores",
    sub: "Raised on SME Platform",
  },
  {
    value: "7,275",
    suffix: "+",
    label: "Crores",
    sub: "Market Capitalisation",
  },
];

const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Counts up from 0 to the stat's target value once it scrolls into view
function StatNumber({ value }) {
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const target = parseFloat(value.replace(/,/g, ""));
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : "0");
  const hasAnimated = useRef(false);

  const handleEnter = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString("en-IN")
      );
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(decimals > 0 ? target.toFixed(decimals) : target.toLocaleString("en-IN"));
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span onViewportEnter={handleEnter} viewport={{ once: true, amount: 0.6 }}>
      {display}
    </motion.span>
  );
}

export default function TrackRecord() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbAY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const orbBY = useTransform(scrollYProgress, [0, 1], ["10%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden ${notoSans.className}`}
      style={{
        background:
          "linear-gradient(135deg, #0B1A33 0%, #10254A 40%, #0F3A66 75%, #0E4A7A 100%)",
      }}
    >
      {/* Animated background orbs */}
      <motion.div
        style={{ y: orbAY }}
        className="pointer-events-none absolute -top-10 sm:-top-16 md:-top-20 -left-10 sm:-left-16 md:-left-20 w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-orange-500/10 blur-[50px] xs:blur-[60px] sm:blur-[80px] md:blur-[100px] -z-0"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: orbBY }}
        className="pointer-events-none absolute -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 -right-10 sm:-right-16 md:-right-20 w-[220px] h-[220px] xs:w-[280px] xs:h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full bg-sky-400/10 blur-[55px] xs:blur-[70px] sm:blur-[90px] md:blur-[110px] -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="font-semibold text-[10px] xs:text-xs sm:text-sm tracking-widest mb-3 sm:mb-4"
          style={{ color: "#FA7B20" }}
        >
          TRACK RECORD
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-white leading-tight mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-3xl mx-auto px-2"
        >
          Largest ipo Network in South India&apos;s SME Segment
        </motion.h2>

        {/* Stats Grid */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-6 md:gap-7 justify-items-center"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label + stat.sub}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className={`relative rounded-xl p-4 xs:p-5 sm:p-7 md:p-8 flex flex-col items-center text-center border transition-colors h-full w-full min-h-[140px] xs:min-h-[160px] sm:min-h-[190px] max-w-[220px] sm:max-w-[240px] ${
                stat.highlighted
                  ? "border-orange-500 bg-slate-900/40"
                  : "border-slate-600/40 bg-white/5"
              }`}
            >
              {stat.highlighted && (
                <span
                  className="absolute inset-0 rounded-xl -z-10 animate-pulse"
                  style={{ boxShadow: "0 0 0 1px rgba(249,115,22,0.35), 0 0 30px rgba(249,115,22,0.15)" }}
                  aria-hidden="true"
                />
              )}

              {/* Value with suffix */}
              <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-2 xs:mb-3 sm:mb-4 tabular-nums">
                <StatNumber value={stat.value} />
                <span style={{ color: "#FA7B20" }}>{stat.suffix}</span>
              </p>

              {/* Label */}
              <p className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl mb-1.5 xs:mb-2">
                {stat.label}
              </p>

              {/* Sub-label - single line */}
              <p className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-snug whitespace-nowrap">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}