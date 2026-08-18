"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const partners = [
  { name: "Rox", logo: "/client/rox.jpg" },
  { name: "Emerald", logo: "/client/emerald.jpg" },
  { name: "White Force", logo: "/client/whiteforce.jpg" },
  { name: "PhantomFX", logo: "/client/phantom.jpg" },
  { name: "SPEL", logo: "/client/spel.jpg" },
  { name: "Basilic Fly", logo: "/client/basilicfly.jpg" },
  { name: "Thaai Casting", logo: "/client/thaicasting.jpg" },
  { name: "AVP Infracon", logo: "/client/avp.jpg" },
  { name: "Sathlokhar", logo: "/client/sathlokar.jpg" },
  { name: "Freshara Agro", logo: "/client/freshara.jpg" },
  { name: "Happy Square", logo: "/client/whiteforce.jpg" },
  { name: "AFCOM Holdings", logo: "/client/afcom.jpg" },
];

const testimonials = [
  {
    tag: "Best Corporating..",
    quote:
      "I wholeheartedly endorse AKSAN Capital Advisory for their expertise, professionalism, and commitment to their clients' financial success. Their dedication and guidance have been pivotal in our journey towards financial stability and business growth.",
    name: "Bala Manikandan",
    role: "MD, Krishca Strapping",
    image: "/bggg.avif",
  },
  {
    tag: "Workflow Flexibility..",
    quote:
      "Their Audit & Assurance services have also provided us with the peace of mind that our financial and operational processes are robust and reliable. This has not only built trust with our stakeholders but has also enhanced our transparency and credibility.",
    name: "Bejoy Arputharaj",
    role: "Founder, Phantom VFX",
    image: "/bggg.avif",
  },
  {
    tag: "Adaptive and Creative Collaboration..",
    quote:
      "What stood out with AKSAN was their ability to adapt to our creative workflows. They didn't just offer solutions - they listened, understood the pulse of a creative studio, and ensured all their processes aligned with our timelines and industry rhythm.",
    name: "Balakrishnan",
    role: "Founder, MD & CEO - Basilic Fly Studio Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Seamless Financial Guidance..",
    quote:
      "Their insights into financial controls and compliance requirements gave us the confidence to pursue long-term expansion goals.",
    name: "Anandan Sriramulu",
    role: "Chairman & Managing Director - Thaai Casting Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Infrastructure-Focused Expertise..",
    quote:
      "In infrastructure, where precision and pace define success, AKSAN stood out with their deep sector insights and proactive approach. Their support enhanced our execution capabilities, streamlined stakeholder coordination, and ensured we were strategically positioned for a successful IPO journey.",
    name: "D. Prasanna",
    role: "Chairman, Managing Director & CEO - AVP Infracon Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Strategic Support..",
    quote:
      "Their strategic support during our IPO process was invaluable. From documentation to regulatory compliance, the team ensured everything was seamless, instilling confidence among our investors and internal teams.",
    name: "G Thiyagu",
    role: "Chairman, Managing Director & CEO - Sathlokhar Synergys E&C Global Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Strategic Alignment, Seamless Execution..",
    quote:
      "In the specialized off-highway tire industry, AKSAN brought clarity, structure, and sector understanding. Their seamless collaboration with our team ensured we stayed aligned internally while preparing confidently for our IPO journey.",
    name: "Chandhrasekharan Thirupathi Venkatachalam",
    role: "Chairman & Managing Director - Emerald Tyre Manufacturers Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Practical and Timely Advice..",
    quote:
      "From financial hygiene to governance alignment, their team played a critical role in getting us IPO-ready. Their advice was practical, timely, and always aligned with our growth objectives.",
    name: "Junaid Ahmed",
    role: "Chairman & Managing Director - Freshara Agro Exports Limited",
    image: "/bggg.avif",
  },
  {
    tag: "People-Centric Financial Expertise..",
    quote:
      "As an HR services company, understanding workforce-linked compliance is vital. AKSAN's customized financial advice and risk management framework supported our scalability.",
    name: "Shraddha Rajpal",
    role: "Promoter - Happy Square Outsourcing Services Limited",
    image: "/bggg.avif",
  },
  {
    tag: "Strategic Support..",
    quote:
      "AKSAN's involvement brought efficiency and precision to our IPO process. Through timely follow-ups, well-organized documentation, and expert compliance handling, they ensured a seamless and hassle-free experience for both our management and our investors.",
    name: "Capt. Deepak Parasuraman",
    role: "Chairman & Managing Director - AFCOM Holdings Limited",
    image: "/bggg.avif",
  },
];

export default function PartnersAndTestimonial() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const prev = () => {
    setDirection(-1);
    setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  };
  const next = () => {
    setDirection(1);
    setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1));
  };
  const goTo = (i) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const testimonial = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className={`relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden ${notoSans.className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(242,98,46,0.06), transparent 40%), radial-gradient(circle at 90% 80%, rgba(11,42,77,0.05), transparent 45%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-orange-500 text-[11px] sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em]">
            <span className="w-4 sm:w-6 h-px bg-orange-400" />
            TRUSTED BY INDUSTRY LEADERS
            <span className="w-4 sm:w-6 h-px bg-orange-400" />
          </span>
          <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-[#0b2a4d] tracking-tight leading-tight px-2">
            Backed by Growth. <span className="text-orange-500">Proven</span> in Results.
          </h2>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 mb-10 sm:mb-16 lg:mb-20"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex items-center justify-center aspect-[4/3] rounded-xl sm:rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-orange-300 p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:shadow-[0_20px_40px_-16px_rgba(242,98,46,0.35)]"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={90}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial spotlight — compact & responsive */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-[640px] mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-[24px] bg-gradient-to-br from-[#0b2a4d] to-[#081b32] px-5 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-10 overflow-hidden shadow-[0_20px_50px_-20px_rgba(11,42,77,0.45)]">
            <div
              className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 rounded-full opacity-25 blur-3xl"
              style={{ background: "radial-gradient(circle, #f2622e, transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <span className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/15 ring-1 ring-orange-400/30 mx-auto mb-4 sm:mb-5">
              <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="currentColor" />
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <p className="text-orange-400 font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 tracking-wide">
                  {testimonial.tag}
                </p>
                <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed font-medium line-clamp-5 sm:line-clamp-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-5 sm:mt-7 flex flex-col items-center gap-2 sm:gap-2.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm ring-4 ring-white/10">
                    {testimonial.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="relative flex items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8">
              <motion.button
                onClick={prev}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 ring-1 ring-white/15 text-white hover:bg-white/10 transition shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[160px] sm:max-w-none px-1 [scrollbar-width:none]">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all shrink-0 ${
                      i === active ? "w-6 bg-orange-500" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                aria-label="Next testimonial"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-[0_10px_24px_-8px_rgba(242,98,46,0.6)] transition shrink-0"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}