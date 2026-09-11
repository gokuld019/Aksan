"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Plus,
  X,
  User,
  Target,
  ShieldCheck,
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

const faqs = [
  {
    question: "How does AKSAN Capital support investment planning?",
    answer:
      "AKSAN Capital considers financial objectives, investment preferences and market factors to help establish a clear direction for investment decisions.",
  },
  {
    question: "Can an existing investment portfolio be reviewed?",
    answer:
      "Yes. Current investments can be assessed to understand portfolio allocation, existing exposure and whether they remain aligned with financial priorities.",
  },
  {
    question: "How are investment opportunities evaluated?",
    answer:
      "Investment decisions are supported by market research, financial analysis and careful consideration of factors that may influence potential outcomes.",
  },
  {
    question: "How are changing market conditions considered?",
    answer:
      "Market developments are reviewed in context to provide perspective on changing conditions and support disciplined decision-making over short-term reactions.",
  },
  {
    question: "What value does professional investment expertise bring?",
    answer:
      "Professional expertise adds analytical depth and market perspective, helping investors assess opportunities and make more considered financial decisions.",
  },
];

const features = [
  { icon: Target, label: "Goal Based Investing" },
  { icon: ShieldCheck, label: "Risk Management" },
  { icon: BarChart3, label: "Research Driven" },
  { icon: Repeat, label: "Trusted Advisory" },
];

const serviceOptions = [
  "IPO",
  "Rights Issue",
  "Preferential Allotment",
  "Follow-on Public Offer",
  "Merchant Banking Services",
  "Corporate Advisory",
];

const CONTACT_API_URL = "https://api.crazystory.in/api/contact";

/* ---------------------------------------------------
   Get Expert Guidance — Modal
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        <div
          className={`${notoSans.className} fixed inset-0 z-[100] flex items-center justify-center px-4 py-6`}
        >
          {/* Backdrop blurring all background elements across the page */}
          <motion.div
            className="fixed inset-0 bg-[#050b1a]/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden bg-white shadow-2xl max-h-[92vh] flex flex-col"
          >
            {/* Header */}
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
                Get Expert Guidance
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-sm">
                Share a few details and our experts will reach out to you shortly.
              </p>
            </div>

            {/* Floating form panel */}
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
    className="text-orange-500 font-medium hover:text-orange-400 transition-colors"
  >
    044 40055781
  </a>
  <span className="text-slate-400"> / </span>
  <a
    href="tel:02240040874"
    className="text-orange-500 font-medium hover:text-orange-400 transition-colors"
  >
    022 40040874
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
        </div>
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
   FAQ Section
--------------------------------------------------- */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
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
      {/* MAIN CONTENT - Blur all background elements when modal is open */}
      <div
        className={`transition-all duration-300 ease-out mt-30 ${
          modalOpen ? "blur-md pointer-events-none select-none" : ""
        }`}
      >


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
                  background:
                    "linear-gradient(90deg, rgba(10,42,77,0.95) 0%, rgba(10,42,77,0.85) 45%, rgba(10,42,77,0.55) 100%)",
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
                     Let’s Turn Your Goals Into a Clear Strategy
                  </h3>
                  <p className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                    Book a complimentary consultation with our expert team and discover strategies tailored to your goals.
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
                    onClick={() => setModalOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold text-[11px] xs:text-xs sm:text-sm px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full hover:bg-slate-100 transition whitespace-nowrap"
                  >
                    Get Expert Guidance <span aria-hidden="true">→</span>
                  </motion.button>

                 <span className="inline-flex items-center gap-2 text-white font-semibold text-[11px] xs:text-xs sm:text-sm whitespace-nowrap">
  <Phone
    size={11}
    className="text-orange-500 fill-orange-500 xs:w-3 xs:h-3 sm:w-[14px] sm:h-[14px]"
  />
  <a href="tel:04440055781" className="hover:text-orange-400 transition-colors">
    044 40055781
  </a>
  <span className="text-slate-400">/</span>
  <a href="tel:02240040874" className="hover:text-orange-400 transition-colors">
    022 40040874
  </a>
</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <AdvisorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}