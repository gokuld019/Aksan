"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Landmark,
  TrendingUp,
  Scale,
  Target,
  Trophy,
  Briefcase,
  ArrowRight,
  Award,
} from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={14}
      height={14}
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

const features = [
  { icon: ShieldCheck, label: "SEBI Registered" },
  { icon: Landmark, label: "Merchant Banking" },
  { icon: TrendingUp, label: "Capital Expertise" },
  { icon: Award, label: "Regulatory Excellence" },
];

const values = [
  {
    icon: Scale,
    title: "Integrity",
    description:
      "We uphold the highest standards of integrity and transparency in every engagement, ensuring trust and long-term relationships.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Our decisions are backed by rigorous analysis, meticulous planning, and a detail-oriented approach to deliver the best outcomes.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "We are committed to delivering high-quality merchant banking solutions through expertise, innovation, and dedication.",
  },
];

// Leadership cards — same tag set (Leadership / Capital Markets / Strategy) for each person.
// Swap the bio placeholder for Savitha once you have real copy.
const leadershipTags = [
  { icon: Briefcase, label: "Leadership" },
  { icon: TrendingUp, label: "Capital Markets" },
  { icon: Target, label: "Strategy" },
];

const leadership = [
  {
    name: "Rajinikanth E S",
    role: "Managing Director | CEO | Principal Officer",
    bio: "Visionary leader with deep expertise in capital markets and strategic advisory. Driving responsible growth and long-term value creation for our clients and stakeholders.",
    tags: leadershipTags,
    linkedin: "#",
    photo: "/team/CEO3.png",
  },
  {
    name: "Savitha",
    role: "Director",
    bio: "Add a short bio describing this leader's expertise, focus areas, and the value they bring to AKSAN.",
    tags: leadershipTags,
    linkedin: "#",
    photo: "/team/savitha.webp",
  },
];

const coreTeam = [
  { name: "Nirmal K", role: "Senior-Financial Analyst", linkedin: "#", photo: "/team/nirmal-k.png" },

  { name: "Vidit Madhusudan Gupta", role: "Principal Consultant", linkedin: "#", photo: "/team/viddit.png" },

  { name: "Natarajan B", role: "Sr.Executive-CS-Trainee", linkedin: "#", photo: "/team/natarajan-b.png" },

  { name: "Badrinarayan S", role: "Jr.Financial Analyst", linkedin: "#", photo: "/team/badrinarayan-s.png" },

  { name: "Jhanani M", role: "Jr. Exe-CS-Trainee", linkedin: "#", photo: "/team/jhanani-m.png" },
  { name: "Viduthalai S", role: "GM - Financial Analyst", linkedin: "#", photo: "/team/vidu.png" },
  { name: "Shajathali S", role: "Associate Company Secretary", linkedin: "#", photo: "/team/shajathali-s.png" },
  { name: "Pinky Naveen H", role: "AGM - Financial Analyst", linkedin: "#", photo: "/team/pinky-naveen-h.png" },
  { name: "Narayanan G", role: "Senior GM - Financial Analyst", linkedin: "#", photo: "/team/nara.jpeg" },
  { name: "Pugazhendhi P", role: "Senior - Financial Analyst", linkedin: "#", photo: "/team/pugazhendhi-p.png" },
  { name: "Indira AK", role: "AGM - Accounts & Finance", linkedin: "#", photo: "/team/indira-ak.png" },
  { name: "Satheesh Srinivasan", role: "Jr.Financial Analyst", linkedin: "#", photo: "/team/satheesh-srinivasan.png" },
  { name: "Sudarsana Rao K", role: "Admin Assistant", linkedin: "#", photo: "/team/sudarsana-rao-k.png" },
  { name: "Preeti Ankit Dedhiya", role: "Associate Vice President", linkedin: "#", photo: "/team/preeti.png" },
  { name: "Khushboo", role: "Company Secretary & Compliance Officer", linkedin: "#", photo: "/team/kushboo.png" },

  { name: "Piyush", role: "Associate Vice President ", linkedin: "#", photo: "/team/piyush.png" },

  { name: "Nesapriyan", role: "Sr.Manager-Finance & Accounts", linkedin: "#", photo: "/team/nesapriyan.png" },

  { name: "Aishwarya", role: "Executive Assistant - MD", linkedin: "#", photo: "/team/aishu.png" },
  { name: "Sai Krishna", role: "AGM - Company Secretary", linkedin: "#", photo: "/team/sai-krishna.png" },
  { name: "Narendran", role: "Sr.Exe-CS-Trainee", linkedin: "#", photo: "/team/narendran.png" },
  { name: "Santhosh Kumar", role: "Manager - IT & Admin", linkedin: "#", photo: "/team/santhosh.png" },
];

// ---------- Animation variants ----------
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Splits a string into animated word spans (per-word reveal)
function AnimatedWords({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span variants={wordItem} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.08]);

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaImageY = useTransform(ctaProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div className={`${notoSans.className} overflow-hidden bg-[#0b1a3a]`}>
      {/* Section 1: About Hero */}
      <section
        ref={heroRef}
        className="w-full bg-white min-h-[560px] sm:min-h-[600px] lg:min-h-[700px] flex items-stretch relative overflow-hidden mt-12 sm:mt-10"
      >
        <div className="w-full flex items-stretch">
          <div className="max-w-[1400px] mx-auto w-full flex items-stretch px-4 xs:px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch w-full">
              <div className="flex items-center py-10 xs:py-12 sm:py-16 lg:py-20 xl:py-24">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 mb-4 sm:mb-5"
                  >
                    <span className="text-orange-600 font-semibold text-[11px] xs:text-xs sm:text-sm tracking-[0.1em] uppercase">
                      About Aksan
                    </span>
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      className="h-px bg-orange-600"
                    />
                  </motion.div>

                  <h2 className="text-[24px] leading-[1.3] xs:text-[27px] xs:leading-[1.25] sm:text-4xl sm:leading-[1.18] lg:text-5xl lg:leading-[1.12] font-extrabold tracking-tight mb-5 sm:mb-6">
                    <AnimatedWords
                      text="Building Trust."
                      className="text-[#152249]"
                    />
                    <br className="hidden xs:block" />
                    <AnimatedWords
                      text="Driving Capital Growth."
                      className="text-orange-600"
                    />
                  </h2>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="space-y-3.5 xs:space-y-4 text-gray-600 text-[13.5px] xs:text-[14px] sm:text-[15px] leading-[1.7] xs:leading-[1.75] sm:leading-[1.8] tracking-[0.005em]"
                  >
                    <motion.p variants={fadeUp} custom={0}>
                      At AKSAN, we are a{" "}
                      <span className="font-semibold text-gray-900">
                        SEBI Registered Category-II Merchant Banker
                      </span>{" "}
                      committed to delivering strategic, compliant, and
                      execution-focused capital market solutions.
                    </motion.p>
                    <motion.p variants={fadeUp} custom={1}>
                      Built on the principles of integrity, precision, and
                      regulatory excellence, we provide comprehensive merchant
                      banking services including issue management, capital
                      structuring, mergers &amp; acquisitions, valuation advisory,
                      and end-to-end regulatory support.
                    </motion.p>
                    <motion.p variants={fadeUp} custom={2}>
                      Every business has a distinct growth journey. Our approach is
                      tailored, detail-oriented, and driven by rigorous due
                      diligence—ensuring agility without compromising governance
                      standards.
                    </motion.p>
                    <motion.p variants={fadeUp} custom={3}>
                      Backed by a dynamic team and seasoned industry professionals,
                      we combine strategic foresight with technical depth to
                      create long-term value.
                    </motion.p>
                    <motion.p variants={fadeUp} custom={4}>
                      AKSAN stands as a trusted partner for businesses navigating
                      India&apos;s evolving capital markets landscape.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 mt-7 xs:mt-8 sm:mt-10"
                  >
                    {features.map(({ icon: Icon, label }, i) => (
                      <motion.div
                        key={label}
                        variants={fadeUp}
                        custom={i}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 border border-gray-200 rounded-xl px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 min-w-0"
                      >
                        <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-orange-50 text-orange-600">
                          <Icon size={16} className="sm:hidden" strokeWidth={2} />
                          <Icon size={18} className="hidden sm:block" strokeWidth={2} />
                        </span>
                        <span className="text-[12px] xs:text-[13px] sm:text-sm font-semibold text-gray-900 leading-snug">
                          {label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full min-h-[220px] xs:min-h-[260px] sm:min-h-[360px] lg:min-h-full overflow-hidden rounded-2xl lg:rounded-none mb-7 xs:mb-8 lg:mb-0 lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full"
              >
                <motion.div
                  style={{ y: heroImageY, scale: heroImageScale }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/aiff.png"
                    alt="Modern skyscrapers representing AKSAN's capital market expertise"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent lg:bg-gradient-to-l lg:from-white/10 lg:to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What Drives Us */}
      <section className="w-full bg-slate-50 py-12 xs:py-14 sm:py-20 px-4 xs:px-5 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-9 xs:mb-10 sm:mb-14"
          >
            <span className="text-orange-600 font-semibold text-[11px] xs:text-xs sm:text-sm tracking-[0.1em] uppercase">
              What Drives Us
            </span>
            <h2 className="text-[22px] leading-[1.3] xs:text-[26px] xs:leading-[1.25] sm:text-4xl sm:leading-tight font-extrabold text-[#152249] mt-3 mb-4 px-2 xs:px-4">
              <AnimatedWords text="The Principles Behind Our Success" />
            </h2>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="block h-1 bg-orange-600 mx-auto rounded-full"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
          >
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -12px rgba(21,34,73,0.15)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 xs:px-7 sm:px-8 py-7 xs:py-8 sm:py-10 flex flex-col items-center text-center"
              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-13 h-13 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-[#152249] mb-5 sm:mb-6"
                >
                  <Icon size={22} className="text-orange-500 sm:hidden" strokeWidth={2} />
                  <Icon size={28} className="text-orange-500 hidden sm:block" strokeWidth={2} />
                </motion.span>
                <h3 className="text-[15px] xs:text-base sm:text-lg font-bold text-[#152249] mb-2.5 sm:mb-3">
                  {title}
                </h3>
                <p className="text-[13px] xs:text-[13.5px] sm:text-sm text-gray-500 leading-[1.65] xs:leading-[1.7]">
                  {description}
                </p>
                <span className="block h-0.5 w-8 bg-orange-600 rounded-full mt-5 sm:mt-6" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: Meet Our Leadership */}
      <section className="w-full bg-slate-50 py-12 xs:py-14 sm:py-20 px-4 xs:px-5 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-9 xs:mb-10 sm:mb-14"
          >
            <span className="text-orange-600 font-semibold text-[11px] xs:text-xs sm:text-sm tracking-[0.1em] uppercase">
              Our Leadership
            </span>
            <h2 className="text-[22px] leading-[1.3] xs:text-[26px] xs:leading-[1.25] sm:text-4xl sm:leading-tight font-extrabold text-[#152249] mt-3 mb-4 px-2 xs:px-4">
              <AnimatedWords text="Experience. Expertise. Responsible Growth." />
            </h2>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="block h-1 bg-orange-600 mx-auto rounded-full"
            />
          </motion.div>

          {/* Leadership Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 max-w-6xl mx-auto mb-12 xs:mb-14"
          >
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 60px -15px rgba(21,34,73,0.18)",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(21,34,73,0.15)] border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/3.2] min-h-[260px] xs:min-h-[300px] sm:min-h-[340px]">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center px-6 xs:px-7 sm:px-8 py-7 xs:py-8">
                  <h3 className="text-xl xs:text-2xl font-extrabold text-[#152249] mb-1.5 tracking-tight leading-[1.25]">
                    {person.name}
                  </h3>
                  <p className="text-orange-600 font-semibold text-[12.5px] xs:text-[13.5px] sm:text-sm mb-4 leading-snug">
                    {person.role}
                  </p>
                  <span className="block h-px w-14 bg-orange-500/60 mb-5" />
                  <p className="text-gray-600 text-[13px] xs:text-[13.5px] sm:text-sm leading-[1.65] xs:leading-[1.7] mb-6 xs:mb-7 max-w-xs">
                    {person.bio}
                  </p>

                  <div className="flex flex-wrap justify-center gap-5 xs:gap-6 mb-6 xs:mb-7">
                    {person.tags.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-2">
                        <span className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-[#152249]/[0.04] border border-[#152249]/10 text-[#152249]">
                          <Icon size={18} className="xs:hidden" strokeWidth={1.8} />
                          <Icon size={19} className="hidden xs:block" strokeWidth={1.8} />
                        </span>
                        <span className="text-[10.5px] xs:text-[11px] sm:text-xs font-medium text-gray-500 whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#152249] hover:bg-[#0b1a3a] text-white font-semibold text-[12.5px] xs:text-[13px] sm:text-sm w-fit px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors"
                  >
                    <LinkedinIcon />
                    View on LinkedIn
                    <ArrowRight size={15} />
                  </motion.a> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0b1a3a] rounded-2xl sm:rounded-3xl px-4 xs:px-6 sm:px-8 py-8 xs:py-9 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-4 xs:gap-x-6 sm:gap-4 mb-12 xs:mb-14 sm:mb-20"
          >
            {[
              { icon: Briefcase, value: "25+", label: "Years of Experience" },
              { icon: TrendingUp, value: "8500+ Cr", label: "Capital Raised" },
              { icon: ShieldCheck, value: "150+", label: "Transactions Executed" },
              { icon: Trophy, value: "100+", label: "Happy Clients" },
            ].map(({ icon: Icon, value, label }, i) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5 xs:gap-2 relative px-2">
                {i !== 0 && i !== 2 && (
                  <span className="lg:hidden absolute left-[-8px] xs:left-[-12px] top-1/2 -translate-y-1/2 h-9 w-px bg-white/10" />
                )}
                {i !== 0 && (
                  <span className="hidden lg:block absolute left-[-8px] top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
                )}
                <Icon size={20} className="text-orange-500 mb-1 xs:hidden" strokeWidth={1.8} />
                <Icon size={22} className="text-orange-500 mb-1 hidden xs:block" strokeWidth={1.8} />
                <span className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white leading-tight">{value}</span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide leading-snug">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Core Team Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-9 xs:mb-10 sm:mb-14"
          >
            <span className="text-orange-600 font-semibold text-[11px] xs:text-xs sm:text-sm tracking-[0.1em] uppercase">
              Our Core Team
            </span>
            <h2 className="text-[22px] leading-[1.3] xs:text-[26px] xs:leading-[1.25] sm:text-4xl sm:leading-tight font-extrabold text-[#152249] mt-3 mb-4 px-2 xs:px-4">
              <AnimatedWords text="Driven by Expertise. United by Purpose." />
            </h2>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="block h-1 bg-orange-600 mx-auto rounded-full"
            />
          </motion.div>

          {/* Core Team Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 xs:gap-4 sm:gap-6"
          >
            {coreTeam.map(({ name, role, linkedin, photo }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                custom={i % 4}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -12px rgba(21,34,73,0.15)",
                  transition: { duration: 0.25 },
                }}
                className="group bg-white border border-gray-100 rounded-xl xs:rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="px-3 xs:px-3.5 sm:px-4 py-3 xs:py-3.5 sm:py-4 flex flex-col flex-1">
                  <h3 className="text-[12.5px] xs:text-[13px] sm:text-[15px] font-bold text-[#152249] leading-[1.35] break-words mb-1">
                    {name}
                  </h3>
                  <p className="text-orange-600 text-[10.5px] xs:text-[11px] sm:text-xs font-semibold leading-snug mb-2.5 min-h-[2.2em]">
                    {role}
                  </p>
                  <span className="block h-px w-6 bg-gray-200 mb-2.5 mt-auto" />

                  {/* <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#152249] text-[10.5px] xs:text-[11px] sm:text-xs font-semibold hover:text-orange-600 transition-colors"
                    aria-label={`${name} on LinkedIn`}
                  >
                    <LinkedinIcon />
                    View LinkedIn
                    <ArrowRight size={12} />
                  </a> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Section 4: CTA Banner */}
      <section
        ref={ctaRef}
        className="w-full bg-white py-10 xs:py-12 sm:py-16 px-4 xs:px-5 sm:px-6 lg:px-8"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0b1a3a] min-h-[220px] xs:min-h-[240px] sm:min-h-[220px] flex items-center"
          >
            <motion.div
              style={{ y: ctaImageY }}
              className="absolute inset-0 scale-125"
            >
              <Image
                src="/CTA.png"
                alt="Financial growth"
                fill
                className="object-cover opacity-60"
              />
            </motion.div>

            <div className="relative z-10 px-5 xs:px-6 sm:px-10 lg:px-14 py-9 xs:py-10 sm:py-12 max-w-xl">
              <h2 className="text-[21px] leading-[1.3] xs:text-2xl xs:leading-[1.28] sm:text-3xl sm:leading-tight font-extrabold mb-3 xs:mb-3.5 sm:mb-4">
                <AnimatedWords
                  text="Let's Build Your"
                  className="text-white"
                />
                <br />
                <AnimatedWords
                  text="Financial Growth Story."
                  className="text-orange-500"
                />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[13px] xs:text-[13.5px] sm:text-[15px] text-slate-300 leading-[1.65] xs:leading-[1.7] mb-6 xs:mb-7 sm:mb-8"
              >
                Partner with AKSAN for reliable merchant banking services,
                regulatory expertise, and strategic financial advisory
                tailored to your business.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-2.5 xs:gap-3 sm:gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[12.5px] xs:text-[13.5px] sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-colors"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-[12.5px] xs:text-[13.5px] sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-colors"
                >
                  Our Services
                  <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}