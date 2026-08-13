"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className={`bg-slate-50 py-6 sm:py-8 ${notoSans.className}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">

          {/* Left: Our Partners - 3 columns x 2 rows */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col w-full lg:w-[48%] bg-white rounded-2xl shadow-sm p-4 sm:p-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="text-orange-500 font-bold text-center text-xs sm:text-sm tracking-widest mb-3 sm:mb-4"
            >
              OUR PARTNERS
            </motion.p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-center aspect-[3/2] border border-slate-200 rounded-lg p-3 sm:p-4 hover:border-orange-300 hover:shadow-sm transition-[border-color,box-shadow] duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Testimonial - 52% */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex flex-col w-full lg:w-[52%] rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[280px]"
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(11,42,77,0.94) 0%, rgba(11,42,77,0.82) 45%, rgba(11,42,77,0.35) 100%)",
              }}
            />

            <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6">
              <div className="flex flex-col flex-1 justify-center">
                <span className="text-orange-500 text-4xl sm:text-5xl font-serif leading-none mb-1">
                  &rdquo;
                </span>

                <div>
                  <p className="text-orange-400 font-bold text-sm sm:text-base mb-2">
                    {testimonial.tag}
                  </p>
                  <p className="text-slate-100 text-sm sm:text-[15px] leading-relaxed line-clamp-5">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4">
                  <p className="text-white font-bold text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5">
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

                <div className="flex gap-2">
                  <motion.button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    aria-label="Next testimonial"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
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