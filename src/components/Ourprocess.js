"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Compass, Wrench, Gauge, Sprout } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const steps = [
  {
    icon: Heart,
    number: "01",
    title: "Understand",
    desc: "We analyze your goals and financial needs.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Strategize",
    desc: "We create a customized investment strategy.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Implement",
    desc: "We execute the strategy with precision.",
  },
  {
    icon: Gauge,
    number: "04",
    title: "Monitor",
    desc: "We continuously track and optimise.",
  },
  {
    icon: Sprout,
    number: "05",
    title: "Grow",
    desc: "We help you achieve sustainable growth.",
  },
];

export default function OurProcess() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Track which mobile card is centered, to drive the progress rail + counter
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll("[data-process-card]"));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      {
        root: track,
        threshold: 0.6,
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll("[data-process-card]")[idx];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden ${notoSans.className}`}
      style={{
        background: "linear-gradient(135deg, #F0F4F8 0%, #E3EAF2 35%, #D6E2EE 65%, #C9D9E8 100%)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div style={{ y: textY }} className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-blue-600 font-semibold text-xs sm:text-xs tracking-widest mb-3 sm:mb-4"
          >
            OUR PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-4xl font-bold text-slate-900 leading-tight mb-0 max-w-3xl mx-auto"
          >
            A Proven Approach to Your Financial Success
          </motion.h2>
        </motion.div>

        {/* Mobile & Tablet: Sleek snap-scroll carousel */}
        <div className="lg:hidden">
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                data-process-card
                data-index={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className="relative shrink-0 snap-center w-[78%] xs:w-[72%] sm:w-[46%] first:ml-0"
              >
                <div className="relative h-full rounded-[28px] bg-white border border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(15,42,86,0.18)] px-6 py-7 sm:px-7 sm:py-8 overflow-hidden">
                  {/* Oversized ghost numeral */}
                  <span
                    className="pointer-events-none absolute -top-3 -right-2 text-[88px] sm:text-[100px] font-bold leading-none select-none"
                    style={{
                      WebkitTextStroke: "1px rgba(30,64,120,0.14)",
                      color: "transparent",
                    }}
                  >
                    {step.number}
                  </span>

                  <div className="relative z-10">
                    <span className="inline-flex w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-md items-center justify-center text-white mb-5">
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
                    </span>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-orange-500 font-bold text-xs tracking-wider">
                        STEP {step.number}
                      </span>
                    </div>

                    <h3 className="text-blue-900 font-bold text-xl sm:text-2xl mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress rail */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Go to step ${index + 1}: ${step.title}`}
                onClick={() => scrollToIndex(index)}
                className="group py-2 -my-2 px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-blue-900"
                      : "w-1.5 bg-blue-900/20 group-hover:bg-blue-900/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center text-slate-400 text-xs mt-3 tracking-wide">
            Swipe to explore &middot; {activeIndex + 1} / {steps.length}
          </p>
        </div>

        {/* Desktop: Original Horizontal Flow */}
        <div className="hidden lg:flex flex-wrap items-start justify-center">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.12,
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center w-[130px] xl:w-[150px]"
              >
                <span className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-white border border-blue-900/20 shadow-sm flex items-center justify-center text-blue-900 mb-3 transition-shadow duration-300 hover:shadow-lg hover:border-blue-300">
                  <step.icon className="w-6 h-6 min-w-[22px] min-h-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="text-blue-900 font-bold text-base mb-1.5 whitespace-nowrap">
                  <span className="text-blue-500">{step.number}.</span> {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-snug text-center">
                  {step.desc}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                  className="flex items-center pt-4 mx-2 xl:mx-3"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-300 w-5 h-5 min-w-[18px] min-h-[18px]">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}