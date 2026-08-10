"use client";

import { useRef } from "react";
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-[6vw] sm:py-16 md:py-20 lg:py-24 overflow-hidden ${notoSans.className}`}
      style={{
        background:
          "linear-gradient(135deg, #FDE9D9 0%, #F7F1EC 35%, #EEF1F5 65%, #E3E7EE 100%)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-[4vw] sm:px-6 lg:px-6 relative z-10">
        <motion.div style={{ y: textY }} className="text-center mb-[8vw] sm:mb-16 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-orange-500 font-semibold text-[2.8vw] sm:text-xs tracking-widest mb-[3vw] sm:mb-4"
          >
            OUR PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[6.5vw] sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight mb-0 max-w-3xl mx-auto"
          >
            A Proven Approach to Your Financial Success
          </motion.h2>
        </motion.div>

        {/* Mobile & Tablet: Modern Card Timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-[6vw] sm:left-8 top-[1vw] bottom-[1vw] w-0.5 bg-gradient-to-b from-orange-300 via-blue-300 to-slate-300" />

          <div className="space-y-[4vw] sm:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                whileHover={{ x: 4 }}
                className="relative pl-[13vw] sm:pl-16"
              >
                <div className="absolute left-[4vw] sm:left-[30px] top-[5.5vw] sm:top-6 -translate-x-1/2 w-[3.2vw] h-[3.2vw] sm:w-4 sm:h-4 rounded-full border-2 border-white bg-white shadow-md z-10">
                  <div className="absolute inset-1 rounded-full bg-orange-500" />
                </div>

                <div className="bg-white rounded-2xl p-[4.5vw] sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-[3.5vw] sm:gap-4 mb-[2.5vw] sm:mb-3">
                    <span className="shrink-0 w-[11vw] h-[11vw] sm:w-14 sm:h-14 rounded-xl bg-white border border-blue-900/20 shadow-sm flex items-center justify-center text-blue-900">
                      <step.icon className="w-[5vw] h-[5vw] sm:w-6 sm:h-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-blue-900 font-bold text-[4vw] sm:text-lg">
                      <span className="text-orange-500 mr-1">{step.number}.</span>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-[3.4vw] sm:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
                className="flex flex-col items-center w-[10vw] min-w-[130px] xl:min-w-[150px]"
              >
                <span className="w-[4.5vw] h-[4.5vw] min-w-[56px] min-h-[56px] rounded-full bg-white border border-blue-900/20 shadow-sm flex items-center justify-center text-blue-900 mb-[1.2vw] transition-shadow duration-300 hover:shadow-lg hover:border-orange-300">
                  <step.icon className="w-[1.7vw] h-[1.7vw] min-w-[22px] min-h-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="text-blue-900 font-bold text-[0.95vw] min-text-base mb-[0.6vw] whitespace-nowrap">
                  {step.number}. {step.title}
                </h3>
                <p className="text-slate-500 text-[0.85vw] leading-snug text-center">
                  {step.desc}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                  className="flex items-center pt-[1.5vw] mx-[0.3vw] xl:mx-3"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-300 w-[1.4vw] h-[1.4vw] min-w-[18px] min-h-[18px]">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}