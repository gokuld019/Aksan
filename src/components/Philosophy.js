"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function OurPhilosophy() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-[#0a1423] ${notoSans.className}`}
    >
      {/* Video — taller than the section so parallax never exposes the edges */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y: videoY, scale: videoScale }}
        className="absolute -top-16 -bottom-16 left-0 w-full h-[calc(100%+8rem)] object-cover"
      >
        <source src="/phil1.mp4" type="video/mp4" />
      </motion.video>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#0a1423]/70" />

      {/* Extra darkening behind the text area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(7,14,26,0.65) 0%, rgba(7,14,26,0.25) 70%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Frosted glass panel */}
        <div className="rounded-2xl sm:rounded-3xl  px-5 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-12 text-center ">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-orange-400 font-bold text-xs sm:text-sm tracking-[0.25em] mb-4 sm:mb-5"
          >
            OUR PHILOSOPHY
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-white font-medium text-base sm:text-lg md:text-xl xl:text-2xl leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
          >
            We aim to create a meaningful impact on your life with our holistic capital solutions. Our vision resonates with the idea of simplifying and assuring an ethical presence as a trusted capital guide to uplift financial awareness.
          </motion.p>

          {/* <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 bg-white text-blue-900 font-semibold text-sm px-6 py-3 rounded-md hover:bg-slate-100 transition"
          >
            Book Appointment <span aria-hidden="true">→</span>
          </motion.button> */}
        </div>
      </motion.div>
    </section>
  );
}