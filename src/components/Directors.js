"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const directors = [
  {
    name: "Rajinikanth",
    role: "MANAGING DIRECTOR",
    image: "/team/rajiniganth-es.jpeg",
    accent: "border-orange-500 bg-slate-900/90",
  },
  {
    name: "Savitha",
    role: "DIRECTOR",
    image: "/team1.webp",
    accent: "border-blue-800 bg-[#0F3A66]/90",
  },
];

export default function BoardOfDirectors() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-slate-50 py-8 xs:py-10 sm:py-14 md:py-20 lg:py-24 xl:py-28 overflow-hidden ${notoSans.className}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
        {/* Left: Text content */}
        <motion.div style={{ y: textY }} className="text-center lg:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 flex justify-center lg:justify-start"
          >
            <Image
              src="/3d.webp"
              alt="AKSAN logo"
              width={96}
              height={96}
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-orange-500 font-semibold text-[10px] xs:text-[11px] sm:text-xs md:text-sm tracking-[0.15em] uppercase mb-2 xs:mb-2.5 sm:mb-3"
          >
            Board of Directors
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-[28px] xl:text-4xl 2xl:text-[42px] font-bold text-slate-900 leading-tight mb-3 xs:mb-4 sm:mb-5 md:mb-6 break-words"
          >
            People Behind Our Promise of{" "}
            <span className="text-orange-500">Progress.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-slate-500 text-xs xs:text-[13px] sm:text-sm md:text-base leading-relaxed mb-6 xs:mb-7 sm:mb-8 md:mb-10 max-w-md mx-auto lg:mx-0"
          >
            Our strength lies in our people. A team of seasoned professionals
            working together with a shared vision to deliver the best
            outcomes for every project we undertake.
          </motion.p>

          {/* Modern Stats Section - Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex gap-8 xs:gap-10 sm:gap-12 md:gap-16 mb-6 xs:mb-7 sm:mb-8 md:mb-10 justify-center lg:justify-start"
          >
            {/* Stat 1 */}
            <div className="relative">
              <div className="flex items-baseline gap-0.5">
                <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold text-blue-900 leading-none tracking-tight">
                  20
                </p>
                <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold text-orange-500 leading-none">
                  +
                </span>
              </div>
              <div className="mt-1.5 xs:mt-2 sm:mt-2.5">
                <p className="text-slate-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                  Years of Combined
                </p>
                <p className="text-slate-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                  Experience
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-orange-200/60 self-stretch"></div>

            {/* Stat 2 */}
            <div className="relative">
              <div className="flex items-baseline gap-0.5">
                <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold text-blue-900 leading-none tracking-tight">
                  100
                </p>
                <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold text-orange-500 leading-none">
                  +
                </span>
              </div>
              <div className="mt-1.5 xs:mt-2 sm:mt-2.5">
                <p className="text-slate-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                  Projects Delivered
                </p>
                <p className="text-slate-600 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium leading-tight">
                  Successfully
                </p>
              </div>
            </div>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="border-l-4 border-orange-500 pl-3 xs:pl-4 italic text-slate-700 text-xs xs:text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0"
          >
            <span className="text-orange-500 text-lg xs:text-xl sm:text-2xl align-top mr-1">
              &ldquo;
            </span>
            Great things in business are never done by one person. They&apos;re
            done by a team of people.
          </motion.blockquote>
        </motion.div>

        {/* Right: Director photo cards */}
        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 w-full max-w-[380px] sm:max-w-none mx-auto lg:mx-0">
          {directors.map((director, i) => (
            <motion.div
              key={director.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-md xs:shadow-lg sm:shadow-xl hover:shadow-2xl bg-white aspect-[3/4] transition-shadow duration-300"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  sizes="(max-width: 480px) 45vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className={`absolute left-1.5 xs:left-2 sm:left-3 md:left-4 bottom-1.5 xs:bottom-2 sm:bottom-3 md:bottom-4 right-1.5 xs:right-2 sm:right-3 md:right-4 border-l-4 rounded-md px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 backdrop-blur-sm ${director.accent}`}
              >
                <p className="text-white font-bold text-[11px] xs:text-xs sm:text-sm md:text-base leading-tight break-words">
                  {director.name}
                </p>
                <p className="text-orange-400 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                  {director.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}