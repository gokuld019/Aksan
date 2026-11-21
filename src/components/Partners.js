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
  { name: "PhantomFX", logo: "/client/phantom.jpg" },
  { name: "Krishca", logo: "/client/krishca.jpg" },
  { name: "Basilic Fly", logo: "/client/basilicfly.jpg" },
  { name: "Rox", logo: "/client/rox.jpg" },
  { name: "SPEL", logo: "/client/spel.jpg" },
  { name: "Thaai Casting", logo: "/client/thaicasting.jpg" },
  { name: "AVP Infracon", logo: "/client/avp.jpg" },
  { name: "ABS Marine Services Limited", logo: "/client/abs.jpg" },
  { name: "Sathlokhar", logo: "/client/sathlokar.jpg" },
  { name: "AFCOM Holdings", logo: "/client/afcom.jpg" },
  { name: "Freshara Agro", logo: "/client/freshara.jpg" },
  { name: "Emerald", logo: "/client/emerald.jpg" },
  { name: "White Force", logo: "/client/whiteforce.jpg" },
  // { name: "Taiyo Feed Mill Limited", logo: "/client/taiyo.jpg" },
  // { name: "Sri Priyanka Enterprises Limited", logo: "/client/spgcl.jpg" },
  // { name: "RK Steel & Infrastructure Limited", logo: "/client/rksteel.jpg" },
];

// `photo` = founder image (put files in /public/founders/). `logo` = company logo (shown as small badge).
// If a photo is missing or fails to load, initials are shown automatically.
const testimonials = [
  {
    tag: "Best Corporating..",
    quote:
      "I wholeheartedly endorse AKSAN Capital Advisory for their expertise, professionalism, and commitment to their clients' financial success. Their dedication and guidance have been pivotal in our journey towards financial stability and business growth.",
    name: "Bala Manikandan",
    role: "MD, Krishca Strapping",
    photo: "/founders/bala-manikandan.jpg",
    logo: "/client/krishca.jpg",
  },
  {
    tag: "Workflow Flexibility..",
    quote:
      "Their Audit & Assurance services have also provided us with the peace of mind that our financial and operational processes are robust and reliable. This has not only built trust with our stakeholders but has also enhanced our transparency and credibility.",
    name: "Bejoy Arputharaj",
    role: "Founder, Phantom VFX",
    photo: "/founders/bejoy-arputharaj.jpg",
    logo: "/client/phantom.jpg",
  },
  {
    tag: "Adaptive and Creative Collaboration..",
    quote:
      "What stood out with AKSAN was their ability to adapt to our creative workflows. They didn't just offer solutions - they listened, understood the pulse of a creative studio, and ensured all their processes aligned with our timelines and industry rhythm.",
    name: "Balakrishnan",
    role: "Founder, MD & CEO - Basilic Fly Studio Limited",
    photo: "/founders/balakrishnan.jpg",
    logo: "/client/basilicfly.jpg",
  },
  {
    tag: "Seamless Financial Guidance..",
    quote:
      "Their insights into financial controls and compliance requirements gave us the confidence to pursue long-term expansion goals.",
    name: "Anandan Sriramulu",
    role: "Chairman & Managing Director - Thaai Casting Limited",
    photo: "/founders/anandan-sriramulu.jpg",
    logo: "/client/thaicasting.jpg",
  },
  {
    tag: "Infrastructure-Focused Expertise..",
    quote:
      "In infrastructure, where precision and pace define success, AKSAN stood out with their deep sector insights and proactive approach. Their support enhanced our execution capabilities, streamlined stakeholder coordination, and ensured we were strategically positioned for a successful IPO journey.",
    name: "D. Prasanna",
    role: "Chairman, Managing Director & CEO - AVP Infracon Limited",
    photo: "/founders/d-prasanna.jpg",
    logo: "/client/avp.jpg",
  },
  {
    tag: "Strategic Support..",
    quote:
      "Their strategic support during our IPO process was invaluable. From documentation to regulatory compliance, the team ensured everything was seamless, instilling confidence among our investors and internal teams.",
    name: "G Thiyagu",
    role: "Chairman, Managing Director & CEO - Sathlokhar Synergys E&C Global Limited",
    photo: "/founders/g-thiyagu.jpg",
    logo: "/client/sathlokar.jpg",
  },
  {
    tag: "Strategic Alignment, Seamless Execution..",
    quote:
      "In the specialized off-highway tire industry, AKSAN brought clarity, structure, and sector understanding. Their seamless collaboration with our team ensured we stayed aligned internally while preparing confidently for our IPO journey.",
    name: "Chandhrasekharan Thirupathi Venkatachalam",
    role: "Chairman & Managing Director - Emerald Tyre Manufacturers Limited",
    photo: "/founders/chandhrasekharan.jpg",
    logo: "/client/emerald.jpg",
  },
  {
    tag: "Practical and Timely Advice..",
    quote:
      "From financial hygiene to governance alignment, their team played a critical role in getting us IPO-ready. Their advice was practical, timely, and always aligned with our growth objectives.",
    name: "Junaid Ahmed",
    role: "Chairman & Managing Director - Freshara Agro Exports Limited",
    photo: "/founders/junaid-ahmed.jpg",
    logo: "/client/freshara.jpg",
  },
  {
    tag: "People-Centric Financial Expertise..",
    quote:
      "As an HR services company, understanding workforce-linked compliance is vital. AKSAN's customized financial advice and risk management framework supported our scalability.",
    name: "Shraddha Rajpal",
    role: "Promoter - Happy Square Outsourcing Services Limited",
    photo: "/founders/shraddha-rajpal.jpg",
    logo: "/client/whiteforce.jpg",
  },
  {
    tag: "Strategic Support..",
    quote:
      "AKSAN's involvement brought efficiency and precision to our IPO process. Through timely follow-ups, well-organized documentation, and expert compliance handling, they ensured a seamless and hassle-free experience for both our management and our investors.",
    name: "Capt. Deepak Parasuraman",
    role: "Chairman & Managing Director - AFCOM Holdings Limited",
    photo: "/founders/deepak-parasuraman.jpg",
    logo: "/client/afcom.jpg",
  },
];

// Fills its (relative) parent with the founder photo; falls back to initials if missing/broken.
function FounderImage({ testimonial, sizes, textClass = "text-2xl" }) {
  const [failed, setFailed] = useState(false);

  const initials = testimonial.name
    .replace(/^(Capt\.|Dr\.|Mr\.|Ms\.)\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!testimonial.photo || failed) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-extrabold ${textClass}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={testimonial.photo}
      alt={testimonial.name}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover object-top"
    />
  );
}

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

        {/* Logo grid — 5 per row on desktop, last row (remainder) centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-16 lg:mb-20"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex items-center justify-center aspect-[4/3] rounded-xl sm:rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-orange-300 p-3 sm:p-4 lg:p-5 transition-all duration-300 hover:shadow-[0_20px_40px_-16px_rgba(242,98,46,0.35)] w-[calc(50%-0.3125rem)] sm:w-[calc(33.333%-0.6667rem)] lg:w-[calc(20%-0.8rem)]"
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

        {/* Testimonial spotlight — centered company logo, full-bleed founder image */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative lg:-mx-8"
        >
          <div className="relative rounded-3xl bg-white ring-1 ring-slate-200 overflow-hidden shadow-[0_30px_70px_-30px_rgba(11,42,77,0.35)]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
              >
                {/* Text side — centered, large company logo */}
                <div className="order-2 md:order-1 flex flex-col items-center justify-center text-center p-6 sm:p-8 lg:p-14 md:min-h-[500px]">
                  {/* Company logo — large & centered */}
                  <div className="flex items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-[0_12px_30px_-14px_rgba(11,42,77,0.25)] px-4 py-3 sm:px-6 sm:py-4">
                    <Image
                      src={testimonial.logo}
                      alt={`${testimonial.name} company logo`}
                      width={320}
                      height={120}
                      className="h-16 sm:h-24 lg:h-28 w-auto max-w-[240px] sm:max-w-[320px] lg:max-w-[360px] object-contain"
                    />
                  </div>

                  <span className="my-5 sm:my-6 h-px w-16 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                  <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" strokeWidth={1.5} />

                  <p className="mt-3 text-[#0b2a4d] text-xs sm:text-sm font-bold tracking-wide">
                    {testimonial.tag}
                  </p>
                  <p className="mt-2 max-w-[620px] text-slate-600 text-sm sm:text-[15px] lg:text-base leading-relaxed">
                    {testimonial.quote}
                  </p>

                  <div className="mt-5 sm:mt-6">
                    <p className="text-[#0b2a4d] font-bold text-base sm:text-lg tracking-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug max-w-[420px] mx-auto">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Photo side — full-bleed founder image */}
                <div className="order-1 md:order-2 relative min-h-[300px] sm:min-h-[360px] md:min-h-full bg-slate-100">
                  <FounderImage
                    testimonial={testimonial}
                    sizes="(max-width: 768px) 100vw, 46vw"
                    textClass="text-7xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation — arrows only */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
            <motion.button
              onClick={prev}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white ring-1 ring-slate-200 text-[#0b2a4d] hover:ring-orange-300 hover:text-orange-500 shadow-sm transition shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={next}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-[0_10px_24px_-8px_rgba(242,98,46,0.6)] transition shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}