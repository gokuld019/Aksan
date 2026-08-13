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
  { name: "PhantomFX", logo: "/client/phantom.jpg" },
  { name: "Krishca", logo: "/client/whiteforce.jpg" },
  { name: "Basilic Fly", logo: "/client/basilicfly.jpg" },
  { name: "Rox", logo: "/client/rox.jpg" },
  { name: "SPEL", logo: "/client/spel.jpg" },
  { name: "Thai Casting Limited", logo: "/client/thaicasting.jpg" },
  { name: "Avp", logo: "/client/avp.jpg" },
  { name: "Abs", logo: "/client/abs.jpg" },
  { name: "Sathlokar", logo: "/client/sathlokar.jpg" },
  { name: "Afcom", logo: "/client/afcom.jpg" },
  { name: "Freshara", logo: "/client/freshara.jpg" },
  { name: "Emerald", logo: "/client/emerald.jpg" },
  { name: "White Force", logo: "/client/whiteforce.jpg" },
  { name: "Rk steels", logo: "/client/rksteel.jpg" },
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
      className={`bg-slate-50 py-4 sm:py-5 ${notoSans.className}`}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">

          {/* Left: Our Partners - 60% */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-full lg:w-[60%] bg-white rounded-xl shadow-sm p-3 sm:p-4 h-auto"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-orange-500 font-semibold text-xs sm:text-sm tracking-widest mb-2 sm:mb-3"
            >
              OUR PARTNERS
            </motion.p>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-center aspect-square w-[calc(25%-6px)] sm:w-[calc(25%-8px)] border border-slate-200 rounded-md p-1.5 sm:p-2 hover:border-orange-300 hover:shadow-sm transition-[border-color,box-shadow] duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={130}
                    height={70}
                    className="max-w-full max-h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Testimonial - 40% */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex flex-col w-full lg:w-[40%] rounded-xl overflow-hidden h-auto min-h-[200px] sm:min-h-[220px]"
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(11,42,77,0.92) 0%, rgba(11,42,77,0.75) 45%, rgba(11,42,77,0.25) 100%)",
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full p-3.5 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col flex-1 justify-center"
                >
                  <span className="text-orange-500 text-3xl sm:text-4xl font-serif leading-none">
                    &rdquo;
                  </span>

                  <p className="text-orange-400 font-semibold text-xs sm:text-sm mt-1.5 sm:mt-2 mb-1 sm:mb-1.5">
                    {testimonial.tag}
                  </p>
                  <p className="text-slate-100 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {testimonial.quote}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-end justify-between mt-2 sm:mt-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <p className="text-white font-bold text-xs sm:text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-300 text-[10px] sm:text-xs mt-0.5">
                      {testimonial.role}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          aria-label={`Go to testimonial ${i + 1}`}
                          className={`h-1 rounded-full transition-all ${
                            i === active
                              ? "w-5 sm:w-6 bg-orange-500"
                              : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-1.5 sm:gap-2">
                  <motion.button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    aria-label="Next testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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