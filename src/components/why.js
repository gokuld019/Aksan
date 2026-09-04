"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  LineChart,
  Users,
  Smartphone,
  Plus,
  X,
  User,
  Target,
  BarChart3,
  Repeat,
  Phone,
  Mail,
  MessageSquare,
  Briefcase,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
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
    text: "29+ years of research-driven guidance",
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

const serviceOptions = [
  "IPO Consulting",
  "Rights Issue Advisory",
  "Preferential Allotment",
  "Follow-on Public Offer",
  "Merchant Banking Services",
  "Corporate Advisory",
];

const CONTACT_API_URL = "https://api.crazystory.in/api/contact";

/* ---------------------------------------------------
   Talk to an Advisor — Modal
--------------------------------------------------- */
function AdvisorModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company_name: form.company,
          service: form.service,
          message: form.message,
          agree: true,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // no JSON body
      }

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || `Request failed with status ${response.status}`
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError("");
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`${notoSans.className} fixed inset-0 z-[100] flex items-center justify-center px-4 py-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#050b1a]/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden bg-white shadow-2xl max-h-[92vh] flex flex-col"
          >
            <div
              className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-14 sm:pb-16 overflow-hidden shrink-0"
              style={{
                background:
                  "linear-gradient(120deg, #0A2A4D 0%, #0F3A66 55%, #14477E 100%)",
              }}
            >
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>

              <p className="text-orange-500 font-bold text-[10px] sm:text-xs tracking-widest mb-2">
                GET STARTED
              </p>
              <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight max-w-xs">
                Talk to an Advisor
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-sm">
                Share a few details and our advisory team will reach out to you
                shortly.
              </p>
            </div>

            <div className="relative px-5 sm:px-8 -mt-8 sm:-mt-10 pb-6 sm:pb-8 overflow-y-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <FormField
                        icon={User}
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        icon={Mail}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        icon={Phone}
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        icon={Briefcase}
                        name="company"
                        type="text"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                      />

                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/40 pointer-events-none">
                          <ClipboardList size={16} />
                        </span>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/60 pl-10 pr-3.5 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition"
                        >
                          <option value="" disabled>
                            Select a Service
                          </option>
                          {serviceOptions.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-blue-900/40">
                          <MessageSquare size={16} />
                        </span>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="Message"
                          value={form.message}
                          onChange={handleChange}
                          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/60 pl-10 pr-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-3.5 py-2.5 text-red-600 text-xs">
                          <AlertCircle size={14} className="mt-0.5 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm px-6 py-3 rounded-full transition disabled:opacity-60"
                      >
                        {submitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Request a Callback <ArrowRight size={16} />
                          </>
                        )}
                      </motion.button>

                      <p className="text-center text-[11px] text-slate-400 pt-1">
                        Or call us directly at{" "}
                        <a
                          href="tel:04440055781"
                          className="text-orange-500 font-medium"
                        >
                          044 40055781
                        </a>
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center text-center py-4 sm:py-6"
                    >
                      <span className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <CheckCircle2 size={30} />
                      </span>
                      <h4 className="text-blue-900 font-bold text-lg mb-1.5">
                        Request Received
                      </h4>
                      <p className="text-slate-500 text-sm max-w-xs mb-6">
                        Thank you, {form.name.split(" ")[0] || "there"}. One of
                        our advisors will get in touch with you shortly.
                      </p>
                      <button
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormField({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-900/40">
        <Icon size={16} />
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-200 bg-slate-50/60 pl-10 pr-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition"
      />
    </div>
  );
}

/* ---------------------------------------------------
   Why AKSAN Section
--------------------------------------------------- */
export default function WhyAksan() {
  const sectionRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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
            <div className="absolute -top-8 md:-top-10 lg:-top-62 left-1/2 -translate-x-1/2 lg:-left-16 lg:translate-x-0 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[480px]">
              <Image
                src="/handd.png"
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
              onClick={() => setModalOpen(true)}
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

      <AdvisorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}