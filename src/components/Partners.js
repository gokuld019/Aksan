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
      className={`bg-slate-50 py-12 sm:py-16 md:py-20 lg:py-24 ${notoSans.className}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8">
          
          {/* Left: Our Partners */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 sm:p-6 md:p-8 lg:p-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-orange-500 font-semibold text-xs tracking-widest mb-4 sm:mb-5 lg:mb-6"
            >
              OUR PARTNERS
            </motion.p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="aspect-square border border-slate-200 rounded-lg flex items-center justify-center p-3 sm:p-3 lg:p-4 hover:border-orange-300 hover:shadow-md transition-[border-color,box-shadow] duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={130}
                    height={130}
                    className="max-w-full max-h-full object-contain"
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
            className="lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[420px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[420px]"
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

            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-6 md:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <span className="text-orange-500 text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-serif leading-none">
                    &rdquo;
                  </span>

                  <p className="text-orange-400 font-semibold text-sm sm:text-base lg:text-base mt-2 sm:mt-2 lg:mt-2 mb-2 sm:mb-3 lg:mb-3">
                    {testimonial.tag}
                  </p>
                  <p className="text-slate-100 text-sm sm:text-base lg:text-base leading-relaxed max-w-md">
                    {testimonial.quote}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mt-4 sm:mt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <p className="text-white font-bold text-sm sm:text-base lg:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-sm mt-0.5 sm:mt-1">
                      {testimonial.role}
                    </p>

                    <div className="flex items-center gap-1.5 mt-3 sm:mt-4 lg:mt-4">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          aria-label={`Go to testimonial ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === active
                              ? "w-6 bg-orange-500"
                              : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 sm:gap-3 lg:gap-3">
                  <motion.button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 sm:w-9 sm:h-9 lg:w-9 lg:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    aria-label="Next testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 sm:w-9 sm:h-9 lg:w-9 lg:h-9 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}