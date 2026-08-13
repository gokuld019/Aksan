"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, LineChart, Users, Smartphone } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const features = [
  {
    icon: ShieldCheck,
    text: "SEBI-registered, fully transparent advisory",
  },
  {
    icon: LineChart,
    text: "25+ years of research-driven guidance",
  },
  {
    icon: Users,
    text: "150+ happy investors across India",
  },
  {
    icon: Smartphone,
    text: "Track your portfolio anytime, anywhere",
  },
];

export default function WhyAksan() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax drift for the text column only
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white py-16 sm:py-20 md:py-28 lg:py-42 overflow-visible ${notoSans.className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6">
        <div
          className="relative rounded-xl sm:rounded-2xl overflow-visible grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 items-center px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-20"
          style={{
            background: "linear-gradient(135deg, #0B2A4D 0%, #0F3A66 60%, #12457A 100%)",
          }}
        >
          {/* Left: Phone mockup — hidden on mobile, visible from md up */}
          <div className="relative order-2 lg:order-1 hidden md:block md:h-[280px] lg:h-full">
            <div className="absolute -top-8 md:-top-10 lg:-top-65 left-1/2 -translate-x-1/2 lg:-left-16 lg:translate-x-0 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[480px]">
              <Image
                src="/hand.webp"
                alt="AKSAN mobile app held in hand"
                width={840}
                height={1040}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Right: Text content */}
          <motion.div style={{ y: textY }} className="relative z-10 order-1 lg:order-2 md:col-span-1 col-span-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-orange-500 font-semibold text-[10px] xs:text-xs sm:text-xs lg:text-xs tracking-widest mb-3"
            >
              WHY AKSAN
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-6 sm:mb-8 lg:mb-8"
            >
              Why People Choose{" "}<br />
              <span className="text-orange-500">AKSAN Capital</span>
            </motion.h2>

            <ul className="space-y-3 sm:space-y-4 lg:space-y-5 mb-8 sm:mb-10 lg:mb-10">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-3"
                >
                  <feature.icon
                    size={18}
                    strokeWidth={2}
                    className="text-orange-500 shrink-0 sm:w-[20px] sm:h-[20px] lg:w-[20px] lg:h-[20px]"
                  />
                  <span className="text-slate-200 text-sm sm:text-base lg:text-base">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold text-xs sm:text-sm lg:text-sm px-5 sm:px-6 lg:px-6 py-2.5 sm:py-3 lg:py-3 rounded-md hover:bg-slate-100 transition"
            >
              Talk to an Advisor <span aria-hidden="true">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}