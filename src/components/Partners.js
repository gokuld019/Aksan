"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const partners = [
  { name: "Rox", logo: "/ak1.webp" },
  { name: "Emerald", logo: "/ak2.webp" },
  { name: "White Force", logo: "/ak3.webp" },
  { name: "PhantomFX", logo: "/ak4.webp" },
  { name: "SPEL", logo: "/ak5.webp" },
  { name: "Basilic Fly", logo: "/ak6.webp" },
];

const testimonials = [
  {
    tag: "Seamless Financial Guidance",
    quote:
      "Their insights into financial controls and compliance requirements gave us the confidence to pursue long-term expansion goals.",
    name: "Anandan Sriramulu",
    role: "Chairman & MD – Thaai Casting Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Trusted Growth Partner",
    quote:
      "AKSAN's team helped us navigate a complex fundraising round with clarity and precision, delivering results ahead of schedule.",
    name: "Priya Menon",
    role: "CFO – Vertex Industries",
    image: "/bggg.avif",
  },
  {
    tag: "Reliable Market Expertise",
    quote:
      "Their deep understanding of SME listing requirements made what seemed like a daunting process feel completely manageable.",
    name: "Karthik Iyer",
    role: "Founder & CEO – Nova Textiles",
    image: "/bggg.avif",
  },
];

export default function PartnersAndTestimonial() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const prev = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () =>
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const testimonial = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className={`bg-slate-50 py-[6vw] sm:py-16 md:py-20 lg:py-24 ${notoSans.className}`}
    >
      <div className="max-w-[1400px] mx-auto px-[4vw] sm:px-6 lg:px-6 grid grid-cols-1 lg:grid-cols-5 gap-[4vw] sm:gap-8 lg:gap-8">
        {/* Left: Our Partners */}
        <motion.div
          style={{ y: leftY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 bg-white rounded-[3vw] sm:rounded-2xl lg:rounded-2xl shadow-sm p-[4.5vw] sm:p-6 md:p-8 lg:p-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-orange-500 font-semibold text-[2.4vw] sm:text-xs lg:text-xs tracking-widest mb-[3.5vw] sm:mb-5 lg:mb-6"
          >
            OUR PARTNERS
          </motion.p>

          <div className="grid grid-cols-3 gap-[2.8vw] sm:gap-4 lg:gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="aspect-square border border-slate-200 rounded-[1.8vw] sm:rounded-lg lg:rounded-lg flex items-center justify-center p-[2vw] sm:p-3 lg:p-4 hover:border-orange-300 hover:shadow-md transition-[border-color,box-shadow] duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={130}
                  height={130}
                  className="max-w-full max-h-full object-contain scale-125"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Testimonial */}
        <motion.div
          style={{ y: rightY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-3 relative rounded-[3vw] sm:rounded-2xl lg:rounded-2xl overflow-hidden min-h-[80vw] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[420px]"
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(11,42,77,0.92) 0%, rgba(11,42,77,0.75) 45%, rgba(11,42,77,0.25) 100%)",
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between p-[4.5vw] sm:p-6 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-orange-500 text-[7vw] sm:text-3xl md:text-4xl lg:text-4xl font-serif leading-none">
                  &rdquo;
                </span>

                <p className="text-orange-400 font-semibold text-[3.4vw] sm:text-base lg:text-base mt-[1.4vw] sm:mt-2 lg:mt-2 mb-[2vw] sm:mb-3 lg:mb-3">
                  {testimonial.tag}
                </p>
                <p className="text-slate-100 text-[3.4vw] sm:text-base lg:text-base leading-relaxed max-w-md">
                  {testimonial.quote}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-end justify-between mt-[5vw] sm:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white font-bold text-[3.4vw] sm:text-base lg:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-300 text-[2.8vw] sm:text-sm lg:text-sm mt-[0.4vw]">
                    {testimonial.role}
                  </p>

                  <div className="flex items-center gap-[1.2vw] sm:gap-1.5 mt-[2.5vw] sm:mt-4 lg:mt-4">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className={`h-[1.2vw] sm:h-1.5 rounded-full transition-all ${
                          i === active
                            ? "w-[5vw] sm:w-6 bg-orange-500"
                            : "w-[1.2vw] sm:w-1.5 bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-[1.8vw] sm:gap-3 lg:gap-3">
                <motion.button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-[7vw] h-[7vw] sm:w-9 sm:h-9 lg:w-9 lg:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition"
                >
                  <ChevronLeft className="w-[3vw] h-[3vw] sm:w-4 sm:h-4" />
                </motion.button>
                <motion.button
                  onClick={next}
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-[7vw] h-[7vw] sm:w-9 sm:h-9 lg:w-9 lg:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition"
                >
                  <ChevronRight className="w-[3vw] h-[3vw] sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}