"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus, X, User, Target, ShieldCheck, BarChart3, Repeat, Phone } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const faqs = [
  {
    question: "Is AKSAN Capital Advisory SEBI-registered?",
    answer:
      "Yes. AKSAN is a SEBI-registered investment advisor, and every recommendation we make follows the disclosure and conduct standards set by the regulator.",
  },
  {
    question: "Who does AKSAN typically work with?",
    answer:
      "We work with individual investors, family offices, and SME/Main Board companies seeking ipo, fund raising, and portfolio guidance.",
  },
  {
    question: "Is there a minimum portfolio size to get started?",
    answer:
      "We work with investors at different stages of their journey. Book a complimentary consultation and our team will let you know what fits your goals best.",
  },
  {
    question: "How are your advisory fees structured?",
    answer:
      "Fees are transparent and typically structured as a flat advisory fee or a percentage of assets under advisory, disclosed upfront before engagement.",
  },
  {
    question: "How do I get started with AKSAN?",
    answer:
      "Simply book a consultation with our team. We'll understand your goals, review your current portfolio, and recommend a suitable path forward.",
  },
];

const features = [
  { icon: Target, label: "Goal Based Investing" },
  { icon: ShieldCheck, label: "Risk Management" },
  { icon: BarChart3, label: "Research Driven" },
  { icon: Repeat, label: "Trusted Advisory" },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(2);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className={notoSans.className}>
    <section ref={sectionRef} className="relative bg-white py-8 xs:py-10 sm:py-14 md:py-20 lg:py-24 xl:py-28 overflow-hidden">
      <Image
        src="/faq-bg.webp"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-left pointer-events-none select-none -z-0"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 xs:gap-x-8 lg:gap-x-12 gap-y-8 xs:gap-y-10 lg:gap-y-0 items-start">
          {/* Left column */}
          <motion.div style={{ y: textY }} className="text-center lg:text-left w-full">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-orange-500 font-semibold text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-widest mb-2 xs:mb-3 sm:mb-4"
            >
              FAQs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-[28px] xl:text-4xl 2xl:text-[42px] font-bold text-blue-900 leading-tight mb-3 xs:mb-4 sm:mb-6 break-words"
            >
              Answers Before You Ask
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="text-slate-500 text-xs xs:text-[13px] sm:text-sm md:text-base leading-relaxed mb-4 xs:mb-5 sm:mb-6 max-w-sm mx-auto lg:mx-0"
            >
              Can&apos;t find what you&apos;re looking for? Our advisory team is
              happy to walk you through it directly.
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="inline-flex items-center gap-2 text-blue-900 font-semibold text-[11px] xs:text-xs sm:text-sm underline underline-offset-4 decoration-orange-500 mb-6 xs:mb-8 sm:mb-10"
            >
              Contact Us <span aria-hidden="true">→</span>
            </motion.a>

            {/* Need Personal Assistance card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-100 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-3.5 xs:p-4 sm:p-6 max-w-sm mx-auto lg:mx-0 mb-8 xs:mb-10 sm:mb-14"
            >
              <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4 mb-2.5 xs:mb-3 sm:mb-4">
                <span className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-slate-100 flex items-center justify-center text-blue-900 shrink-0">
                  <User size={14} strokeWidth={2} className="xs:w-4 xs:h-4 sm:w-[20px] sm:h-[20px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-blue-900 font-bold text-[13px] xs:text-sm sm:text-base mb-0.5 xs:mb-1">
                    Need Personal Assistance?
                  </h3>
                  <p className="text-slate-500 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                    Our experts are here to help you make confident financial
                    decisions.
                  </p>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 border border-orange-500 text-orange-500 font-semibold text-[11px] xs:text-xs sm:text-sm px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-md hover:bg-orange-500 hover:text-white transition whitespace-nowrap">
                Talk to an Advisor <span aria-hidden="true">→</span>
              </button>
            </motion.div>

            {/* Feature icons row */}
            <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 max-w-sm mx-auto lg:mx-0">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-900 mb-1 xs:mb-1.5 sm:mb-2 transition-colors duration-300 hover:bg-orange-50">
                    <feature.icon size={13} strokeWidth={2} className="xs:w-[14px] xs:h-[14px] sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <p className="text-slate-700 text-[8px] xs:text-[9px] sm:text-xs font-medium leading-snug break-words">
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Accordion */}
          <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 w-full">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-lg sm:rounded-xl border transition ${
                    isOpen
                      ? "border-blue-900 bg-white shadow-md"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-2.5 xs:gap-3 sm:gap-4 px-3.5 xs:px-4 sm:px-6 py-3 xs:py-3.5 sm:py-5 text-left"
                  >
                    <span className="text-slate-900 font-semibold text-[13px] xs:text-sm sm:text-base pr-2 break-words">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-blue-900 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isOpen ? <X size={12} className="xs:w-[13px] xs:h-[13px] sm:w-4 sm:h-4" /> : <Plus size={12} className="xs:w-[13px] xs:h-[13px] sm:w-4 sm:h-4" />}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3.5 xs:px-4 sm:px-6 pb-3.5 xs:pb-4 sm:pb-6">
                          <p className="text-slate-500 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* Bottom CTA banner */}
    <section className="bg-white pb-8 xs:pb-10 sm:pb-14 md:pb-20 lg:pb-24 xl:pb-28">
      <div className="w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #0A2A4D 0%, #0F3A66 60%, #14477E 100%)",
          }}
        >
          <Image
            src="/faa.jpg"
            alt=""
            fill
            aria-hidden="true"
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: "linear-gradient(90deg, rgba(10,42,77,0.95) 0%, rgba(10,42,77,0.85) 45%, rgba(10,42,77,0.55) 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 xs:gap-6 sm:gap-8 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 py-6 xs:py-8 sm:py-10 lg:py-12 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-orange-500 font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-widest mb-1.5 xs:mb-2 sm:mb-3">
                GET STARTED
              </p>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight mb-1.5 xs:mb-2 sm:mb-3 break-words">
                Let&apos;s Build Your Financial Roadmap Together
              </h3>
              <p className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                Book a complimentary consultation with our advisory team and
                discover strategies tailored to your goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold text-[11px] xs:text-xs sm:text-sm px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full hover:bg-slate-100 transition whitespace-nowrap"
              >
                Talk to an Advisor <span aria-hidden="true">→</span>
              </motion.button>

              <a href="tel:+919360267233"
                className="inline-flex items-center gap-2 text-white font-semibold text-[11px] xs:text-xs sm:text-sm whitespace-nowrap"
              >
                <Phone size={11} className="text-orange-500 fill-orange-500 xs:w-3 xs:h-3 sm:w-[14px] sm:h-[14px]" />
                +91 93602 67233
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  );
}