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

const leadership = [
  { name: "Nirmal K", role: "Senior - Financial Analyst", experience: "Team", linkedin: "#", photo: "/team/nirmal-k.png" },
  { name: "Vidit Madhusudan Gupta", role: "Principal Consultant", experience: "Leadership", linkedin: "#", photo: "/team/vidit-madhusudan-gupta.png" },
  { name: "Natarajan B", role: "Sr. Exe - CS - Trainee", experience: "Team", linkedin: "#", photo: "/team/natarajan-b.png" },
  { name: "Badrinarayan S", role: "Jr. Financial Analyst", experience: "Team", linkedin: "#", photo: "/team/badrinarayan-s.png" },
  { name: "Jhanani M", role: "Jr. Exe - CS - Trainee", experience: "Team", linkedin: "#", photo: "/team/jhanani-m.png" },
  { name: "Viduthalai S", role: "GM - Financial Analyst", experience: "Management", linkedin: "#", photo: "/team/viduthalai-s.png" },
  { name: "Shajathali S", role: "Associate Company Secretary", experience: "Team", linkedin: "#", photo: "/team/shajathali-s.png" },
  { name: "Pinky Naveen H", role: "AGM - Financial Analyst", experience: "Management", linkedin: "#", photo: "/team/pinky-naveen-h.png" },
  { name: "Narayanan G", role: "Senior GM - Financial Analyst", experience: "Management", linkedin: "#", photo: "/team/narayanan-g.png" },
  { name: "Pugazhendhi P", role: "Senior - Financial Analyst", experience: "Team", linkedin: "#", photo: "/team/pugazhendhi-p.png" },
  { name: "Indira AK", role: "AGM - Accounts & Finance", experience: "Management", linkedin: "#", photo: "/team/indira-ak.png" },
  { name: "Satheesh Srinivasan", role: "Jr. Financial Analyst", experience: "Team", linkedin: "#", photo: "/team/satheesh-srinivasan.png" },
  { name: "Sudarsana Rao K", role: "Admin Assistant", experience: "Support", linkedin: "#", photo: "/team/sudarsana-rao-k.png" },
  { name: "Rajinikanth E S", role: "Managing Director | CEO | Principal Officer", experience: "Leadership", linkedin: "#", photo: "/team/rajinikanth-e-s.png" },

  // { name: "Piyush Chandra Srivastava", role: "Associate Vice President", experience: "Leadership", linkedin: "#", photo: "/team/piyush-chandra-srivastava.jpg" },
  // { name: "Preeti Ankit Dedhiya", role: "Associate Vice President", experience: "Leadership", linkedin: "#", photo: "/team/preeti-ankit-dedhiya.jpg" },

  // { name: "Sai Krishna S", role: "AGM - Company Secretary", experience: "Management", linkedin: "#", photo: "/team/sai-krishna-s.jpg" },
  // { name: "Khushboo Hanswal", role: "CS cum Compliance Officer", experience: "Management", linkedin: "#", photo: "/team/khushboo-hanswal.jpg" },
  // { name: "Nesapriyan A", role: "Chief Financial Officer", experience: "Management", linkedin: "#", photo: "/team/nesapriyan-a.jpg" },

  // { name: "Santhoshkumar K", role: "Manager - IT & Admin", experience: "Team", linkedin: "#", photo: "/team/santhoshkumar-k.jpg" },
  // { name: "Narendran C", role: "Sr. Exe - CS - Trainee", experience: "Team", linkedin: "#", photo: "/team/narendran-c.jpg" },
  // { name: "Thanuja U", role: "Executive - Finance and Accounts", experience: "Team", linkedin: "#", photo: "/team/thanuja-u.jpg" },
  // { name: "Aishwarya S", role: "Executive Assistant - MD", experience: "Team", linkedin: "#", photo: "/team/aishwarya-s.jpg" },
  // { name: "Manikandan K", role: "Driver", experience: "Support", linkedin: "#", photo: "/team/manikandan-k.jpg" },
  // { name: "Vijayalakshmi", role: "Housekeeper", experience: "Support", linkedin: "#", photo: "/team/vijayalakshmi.jpg" },
  // { name: "Vanitha", role: "Housekeeper", experience: "Support", linkedin: "#", photo: "/team/vanitha.jpg" },
];

// ---------- Animation variants ----------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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
    <div className={`${notoSans.className} overflow-hidden`}>
      {/* Section 1: About Hero */}
      <section
        ref={heroRef}
        className="w-full bg-white min-h-[600px] lg:min-h-[700px] flex items-stretch relative overflow-hidden mt-20"
      >
        <div className="w-full flex items-stretch">
          <div className="max-w-[1400px] mx-auto w-full flex items-stretch px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch w-full">
              <div className="flex items-center py-16 lg:py-20 xl:py-24">
                <div className="max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 mb-5"
                  >
                    <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
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

                  <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                    <AnimatedWords
                      text="Building Trust."
                      className="text-[#152249]"
                    />
                    <br />
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
                    className="space-y-4 text-gray-600 text-[15px] leading-relaxed"
                  >
                    <motion.p variants={fadeUp} custom={0}>
                      At AKSAN, we are a{" "}
                      <span className="font-semibold text-gray-900">
                        SEBI Registered Category-I Merchant Banker
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
                    className="flex flex-wrap gap-4 mt-10"
                  >
                    {features.map(({ icon: Icon, label }, i) => (
                      <motion.div
                        key={label}
                        variants={fadeUp}
                        custom={i}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-w-[150px]"
                      >
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-50 text-orange-600">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <span className="text-sm font-semibold text-gray-900 leading-tight">
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
                className="relative w-full min-h-[400px] lg:min-h-full overflow-hidden lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full"
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
      <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152249] mt-3 mb-4">
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
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 flex flex-col items-center text-center"
              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-[#152249] mb-6"
                >
                  <Icon size={28} className="text-orange-500" strokeWidth={2} />
                </motion.span>
                <h3 className="text-lg font-bold text-[#152249] mb-3">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {description}
                </p>
                <span className="block h-0.5 w-8 bg-orange-600 rounded-full mt-6" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: Meet Our Leadership */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">
              Our Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152249] mt-3 mb-4">
              <AnimatedWords text="Meet Our Leadership" />
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
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {leadership.map(({ name, role, experience, linkedin, photo }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                custom={i % 3}
                whileHover={{
                  y: -5,
                  boxShadow: "0 16px 32px -10px rgba(21,34,73,0.15)",
                  transition: { duration: 0.25 },
                }}
                className="flex bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Photo */}
                <div className="relative w-32 sm:w-36 shrink-0 bg-gray-200 self-stretch min-h-[180px]">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center gap-1.5 px-5 py-4">
                  <h3 className="text-base font-bold text-[#152249] leading-tight">
                    {name}
                  </h3>
                  <p className="text-xs font-semibold text-orange-600">
                    {role}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Briefcase size={13} strokeWidth={2} />
                    <span>{experience}</span>
                  </div>

                  <a href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center justify-center w-7 h-7 rounded-md border border-gray-200 text-[#152249] hover:bg-gray-50 transition"
                    aria-label={`${name} on LinkedIn`}
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: CTA Banner */}
      <section
        ref={ctaRef}
        className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-[#0b1a3a] min-h-[220px] flex items-center"
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

            <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4">
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
                className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-8"
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
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
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