"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Send,
  ShieldCheck,
  Users,
  TrendingUp,
  Handshake,
  ChevronRight,
} from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 93602 67233", "+91 81221 41901", "+91 44 4005 5781"],
    type: "text",
  },
  {
    icon: MapPin,
    title: "Headquarter / Registered Office",
    lines: [
      "28/27, Parvathy Apartments, 2nd Floor,",
      "Damodaran Street, T.Nagar,",
      "Chennai - 600 017, Tamil Nadu, India.",
    ],
    type: "text",
  },
  {
    icon: MapPin,
    title: "Branch Office",
    lines: [
      "Office No. 104, 1st Floor, The Summit",
      "Business Bay, Off Western Express Highway,",
      "Andheri (East), Mumbai - 400093.",
    ],
    type: "text",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@aksan.in"],
    type: "email",
  },
];

const quickLinks = [
  { label: "IPO Advisory", href: "#" },
  { label: "Rights Issue", href: "#" },
  { label: "Preferential Allotment", href: "#" },
  { label: "Follow-on Public Offer (FPO)", href: "#" },
  { label: "Merchant Banking Services", href: "#" },
  { label: "Corporate Advisory", href: "#" },
];

const companyLinks = [
  { label: "Company", href: "#" },
  { label: "Board of Directors", href: "#" },
  { label: "Core Team", href: "#" },
  { label: "Awards & Recognition", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
];

const usefulLinks = [
  { label: "Live Stock", href: "#" },
  { label: "Videos", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const trustBadges = [
  { icon: ShieldCheck, title: "SEBI Registered", desc: "Category-I Merchant Banker" },
  { icon: Users, title: "Independent Advice", desc: "Unbiased. Research Driven." },
  { icon: TrendingUp, title: "Client Focused", desc: "Your Growth. Our Priority." },
  { icon: Handshake, title: "Trust & Integrity", desc: "Built on Transparency." },
];

const socialLinks = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
      </svg>
    ),
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "#",
    label: "X",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    href: "#",
    label: "Instagram",
  },
];

function FooterLinkList({ title, links }) {
  return (
    <div className="text-left">
      <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-[0.08em] uppercase mb-2.5 xs:mb-3 sm:mb-4">
        {title}
      </h4>
      <span className="block h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full mb-3.5 xs:mb-4 sm:mb-5" />
      <ul className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center gap-1.5 text-slate-300 text-[11px] xs:text-xs sm:text-sm hover:text-orange-400 transition-colors"
            >
              <ChevronRight
                size={12}
                className="text-orange-500/70 shrink-0 -ml-0.5 transition-transform group-hover:translate-x-0.5"
              />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0c4172f5" }}
    >
      {/* Background image — unchanged */}
      <Image
        src="/footerak.webp"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-40 pointer-events-none select-none"
      />

      {/* Color dominance overlay — unchanged */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundColor: "#0c4172", opacity: 0.85 }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8 pt-8 xs:pt-10 sm:pt-14 md:pt-16">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 mb-8 xs:mb-10 sm:mb-12 lg:mb-14 bg-white/[0.04] border border-white/10 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5">
          {contactCards.map((card, i) => (
            <div
              key={card.title}
              className={`flex items-start gap-2.5 xs:gap-3 sm:gap-3.5 px-2.5 xs:px-3 sm:px-4 py-2.5 xs:py-3 sm:py-3.5 text-left ${
                i !== 0 ? "sm:border-l sm:border-white/10" : ""
              } ${i === 2 ? "border-t sm:border-t-0 border-white/10 pt-4 sm:pt-3.5" : ""} ${
                i === 3 ? "lg:border-t-0" : ""
              }`}
            >
              <span className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-500 shrink-0">
                <card.icon size={14} strokeWidth={2} className="xs:w-4 xs:h-4" />
              </span>
              <div className="min-w-0 text-left">
                <h3 className="text-white font-semibold text-[12.5px] xs:text-sm sm:text-[15px] mb-1 xs:mb-1.5 leading-tight">
                  {card.title}
                </h3>
                {card.lines.map((line) =>
                  card.type === "email" ? (
                    <a
                      key={line}
                      href={`mailto:${line}`}
                      className="block text-orange-400 font-medium text-[11px] xs:text-xs sm:text-sm break-all hover:text-orange-300 transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p
                      key={line}
                      className="text-slate-400 text-[11px] xs:text-[11.5px] sm:text-[13px] leading-[1.55] break-words"
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr] gap-8 xs:gap-9 sm:gap-10 lg:gap-8 pb-10 xs:pb-12 sm:pb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 text-left">
            <Image
              src="/aksan-logo.webp"
              alt="AKSAN Capital Advisory Private Limited"
              width={180}
              height={50}
              className="h-8 xs:h-9 sm:h-11 w-auto mb-4 xs:mb-5"
            />
            <p className="text-slate-300 text-[11.5px] xs:text-xs sm:text-sm leading-[1.7] mb-5 xs:mb-6 max-w-xs">
              AKSAN Capital Advisory Private Limited is a SEBI-registered
              investment advisor committed to independent, research-driven
              guidance and long-term client partnerships.
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 xs:w-9 xs:h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-colors"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkList title="Popular Quick Links" links={quickLinks} />
          <FooterLinkList title="Company" links={companyLinks} />
          <FooterLinkList title="Useful Links" links={usefulLinks} />

          {/* Work Hours + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1 text-left flex flex-col gap-6 xs:gap-7">
            <div>
              <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-[0.08em] uppercase mb-2.5 xs:mb-3 sm:mb-4">
                Work Hours
              </h4>
              <span className="block h-[2px] w-6 sm:w-8 bg-orange-500 rounded-full mb-3.5 xs:mb-4" />
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3.5 py-3">
                <span className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-500 shrink-0">
                  <Clock size={15} strokeWidth={2} />
                </span>
                <p className="text-slate-300 text-[11.5px] xs:text-xs sm:text-sm leading-snug">
                  10 AM – 8 PM
                  <br />
                  Monday – Saturday
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-[0.08em] uppercase mb-2.5 xs:mb-3">
                Stay Updated
              </h4>
              <p className="text-slate-400 text-[11px] xs:text-[11.5px] sm:text-xs leading-[1.6] mb-3.5">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-white/5 border border-white/15 rounded-lg overflow-hidden focus-within:border-orange-500/60 transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-transparent text-white placeholder:text-slate-500 text-[12px] xs:text-[13px] px-3.5 py-2.5 xs:py-3 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 bg-orange-500 hover:bg-orange-600 text-white shrink-0 transition-colors"
                >
                  <Send size={15} strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Trust badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 xs:gap-6 py-8 xs:py-9 sm:py-10">
          {trustBadges.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 text-left ${
                i !== 0 ? "lg:pl-6 lg:border-l lg:border-white/10" : ""
              }`}
            >
              <span className="w-10 h-10 xs:w-11 xs:h-11 rounded-full border border-orange-500/40 flex items-center justify-center text-orange-500 shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <h5 className="text-white font-bold text-[11.5px] xs:text-xs sm:text-sm leading-tight mb-0.5">
                  {title}
                </h5>
                <p className="text-slate-400 text-[10.5px] xs:text-[11px] sm:text-xs leading-tight">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4 py-5 xs:py-6 text-[11px] xs:text-xs sm:text-sm">
          <p className="text-slate-400 text-center sm:text-left order-2 sm:order-1">
            © Copyright {new Date().getFullYear()} AKSAN Capital Advisory Private Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 flex-wrap justify-center order-1 sm:order-2">
            <Link href="/Privacypolicy" className="text-slate-400 hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/Termsandcondition" className="text-slate-400 hover:text-orange-400 transition-colors">
              Terms and Conditions
            </Link>
            <span className="hidden sm:inline text-slate-600">|</span>
            <Link href="/Disclaimer" className="hidden sm:inline text-slate-400 hover:text-orange-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}