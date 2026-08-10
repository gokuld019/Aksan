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
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.14, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-[8vw] sm:py-20 md:py-24 lg:py-24 overflow-hidden ${notoSans.className}`}
    >
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/phil.mp4" type="video/mp4" />
      </motion.video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,20,35,0.55) 0%, rgba(10,20,35,0.45) 50%, rgba(10,20,35,0.55) 100%)",
        }}
      />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-4xl mx-auto px-[5vw] sm:px-6 lg:px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-orange-500 font-semibold text-[2.6vw] sm:text-sm lg:text-sm tracking-widest mb-[3.5vw] sm:mb-5 lg:mb-6"
        >
          OUR PHILOSOPHY
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-white text-[4.4vw] sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed mb-[6vw] sm:mb-10 lg:mb-10"
        >
          We aim to create a meaningful impact on your life with our holistic
          financial solution. Our vision resonates with the idea of
          simplifying and assuring ethical presence as a financial guide to
          uplift financial awareness.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-[1.5vw] bg-white text-blue-900 font-semibold text-[3vw] sm:text-sm lg:text-sm px-[5vw] sm:px-6 lg:px-6 py-[3vw] sm:py-3 lg:py-3 rounded-md hover:bg-slate-100 transition"
        >
          Book Appointment <span aria-hidden="true">→</span>
        </motion.button>
      </motion.div>
    </section>
  );
}