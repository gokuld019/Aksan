"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  User,
  Building2,
} from "lucide-react";

const NAVY = "#0F2A5C";
const NAVY_DARK = "#0A1F45";
const ORANGE = "#F2622E";

const OFFICES = [
  {
    label: "Headquarters / Registered Office",
    icon: Building2,
    address: "28/27, Parvathy Apartments, 2nd Floor, Damodaran Street, T.Nagar, Chennai - 600 017, Tamil Nadu, India",
    phone: "+91 93602 67233",
    email: "info@aksan.in",
    mapQuery: "28/27 Parvathy Apartments, Damodaran Street, T Nagar, Chennai",
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Investment Advisory",
  "Portfolio Management",
  "Partnership Opportunity",
  "Other",
];

function ContactItem({ icon: Icon, label, lines }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
          {label}
        </p>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-slate-300" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) return;
    setStatus("submitting");
    try {
      await new Promise((res) => setTimeout(res, 900));
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        agree: false,
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="w-full bg-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(115deg, " + NAVY_DARK + " 40%, rgba(15,42,92,0.55) 75%, rgba(15,42,92,0.35) 100%)",
          }}
        />
        <img
          src="/contactus.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-40"
        />
       

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-widest"
            style={{ color: ORANGE, fontFamily: "'Noto Sans', sans-serif" }}
          >
            CONTACT US
            <span className="inline-block h-px w-10" style={{ backgroundColor: ORANGE }} />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Let&apos;s Build Financial{" "}
            <span style={{ color: ORANGE }}>Success Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-slate-300 md:text-base"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Have a question or looking for expert financial advisory? We&apos;re
            here to help you navigate your capital market journey with confidence.
          </motion.p>

          <motion.a
            href="#contact-form"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0F2A5C] transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
          >
            Talk To Our Experts
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <ArrowRight size={14} />
            </span>
          </motion.a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative z-20 mx-auto -mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-20 md:-mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 md:col-span-2 md:p-8"
          >
            <h2 className="text-xl font-bold" style={{ color: NAVY, fontFamily: "'Noto Sans', sans-serif" }}>
              Send Us a Message
            </h2>
            <p className="mt-1 text-sm text-slate-500" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  />
                  <User className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  />
                  <Mail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  />
                  <Phone className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  />
                  <Building2 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              </div>

              <div className="relative">
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                  style={{ fontFamily: "'Noto Sans', sans-serif" }}
                >
                  <option value="" disabled>
                    Subject *
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message *"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition focus:border-[#0F2A5C] focus:bg-white focus:ring-2 focus:ring-[#0F2A5C]/10"
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
              />

              <label className="flex items-start gap-2 text-xs text-slate-500" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0F2A5C] focus:ring-[#0F2A5C]"
                />
                I agree to the{" "}
                <a href="/privacy-policy" className="font-medium text-[#0F2A5C] underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="font-medium text-[#0F2A5C] underline underline-offset-2">
                  Terms &amp; Conditions
                </a>
              </label>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                style={{ backgroundColor: NAVY, fontFamily: "'Noto Sans', sans-serif" }}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                <ArrowRight size={16} />
              </button>

              {status === "success" && (
                <p className="text-sm font-medium text-emerald-600" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  Thanks — your message has been sent. We&apos;ll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-600" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 text-white shadow-xl md:p-8"
            style={{ background: "linear-gradient(160deg, " + NAVY + " 0%, " + NAVY_DARK + " 100%)" }}
          >
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Get in Touch
            </h2>
            <p className="mt-1 text-sm text-slate-300" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
              Reach out to us through any of the following channels.
            </p>

            <div className="mt-8 space-y-6">
              <ContactItem
                icon={MapPin}
                label="Our Office"
                lines={["28/27, Parvathy Apartments, 2nd Floor,", "Damodaran Street, T.Nagar,", "Chennai - 600 017, Tamil Nadu, India"]}
              />
              <ContactItem
                icon={Phone}
                label="Phone"
                lines={["+91 93602 67233", "+91 81221 41901", "+91 44 4005 5781"]}
              />
              <ContactItem icon={Mail} label="Email" lines={["info@aksan.in"]} />
              <ContactItem
                icon={Clock}
                label="Business Hours"
                lines={["Monday - Friday", "9:30 AM - 6:30 PM"]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest" style={{ color: ORANGE, fontFamily: "'Noto Sans', sans-serif" }}>
            OUR OFFICES
          </p>
          <h2 className="text-2xl font-bold md:text-3xl" style={{ color: NAVY, fontFamily: "'Noto Sans', sans-serif" }}>
            Our Offices
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFICES.map((office) => (
            <motion.div
              key={office.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-slate-900/5"
            >
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#FDEDE7", color: ORANGE }}
                  >
                    <office.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-semibold" style={{ color: NAVY, fontFamily: "'Noto Sans', sans-serif" }}>
                      {office.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                      {office.address}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                  <span className="flex items-center gap-2">
                    <Phone size={14} style={{ color: NAVY }} />
                    {office.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail size={14} style={{ color: NAVY }} />
                    {office.email}
                  </span>
                </div>

                
                  <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(office.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: NAVY, fontFamily: "'Noto Sans', sans-serif" }}
                >
                  Get Directions
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="h-40 w-full">
                <iframe
                  title={office.label}
                  src={"https://www.google.com/maps?q=" + encodeURIComponent(office.mapQuery) + "&output=embed"}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}