import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 93602 67233", "+91 81221 41901", "+91 44 4005 5781"],
    type: "text",
  },
  {
    icon: MapPin,
    title: "Headquarter",
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

const socialLinks = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
      </svg>
    ),
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "#",
    label: "X",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    href: "#",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0c4172f5" }}
    >
      {/* Background image */}
      <Image
        src="/footerak.webp"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-40 pointer-events-none select-none"
      />

      {/* Color dominance overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ backgroundColor: "#0c4172", opacity: 0.85 }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8 pt-8 xs:pt-10 sm:pt-14 md:pt-16 lg:pt-16">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 mb-8 xs:mb-10 sm:mb-12 lg:mb-14">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="flex items-start gap-2.5 xs:gap-3 sm:gap-4 bg-white/5 border border-white/10 rounded-lg xs:rounded-xl px-3.5 xs:px-4 sm:px-6 py-4 xs:py-5 sm:py-6"
            >
              <span className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 flex items-center justify-center text-orange-500 shrink-0">
                <card.icon size={14} strokeWidth={2} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px]" />
              </span>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-[13px] xs:text-sm sm:text-base mb-1 xs:mb-1.5 sm:mb-2">
                  {card.title}
                </h3>
                {card.lines.map((line) =>
                  card.type === "email" ? (
                    <a
                      key={line}
                      href={`mailto:${line}`}
                      className="block text-orange-500 font-semibold text-[11px] xs:text-xs sm:text-sm break-all"
                    >
                      {line}
                    </a>
                  ) : (
                    <p
                      key={line}
                      className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-relaxed break-words"
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10" />

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 xs:gap-8 sm:gap-10 py-8 xs:py-10 sm:py-12 lg:py-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 xs:mb-4 sm:mb-5">
              <Image
                src="/aksan-logo.webp"
                alt="AKSAN Capital Advisory Private Limited"
                width={170}
                height={48}
                className="h-7 xs:h-8 sm:h-11 w-auto"
              />
            </div>
            <p className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-relaxed mb-4 xs:mb-5 sm:mb-6 max-w-xs mx-auto sm:mx-0">
              AKSAN Capital Advisory Private Limited is a SEBI-registered
              investment advisor committed to independent, research-driven
              guidance and long-term client partnerships.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition"
                >
                  <social.icon size={13} strokeWidth={2} className="xs:w-[14px] xs:h-[14px] sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Popular Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-wide mb-3 xs:mb-4 sm:mb-5">
              POPULAR QUICK LINKS
            </h4>
            <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 text-[11px] xs:text-xs sm:text-sm hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-wide mb-3 xs:mb-4 sm:mb-5">
              COMPANY
            </h4>
            <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 text-[11px] xs:text-xs sm:text-sm hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links + Work Hours */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-wide mb-3 xs:mb-4 sm:mb-5">
              USEFUL LINKS
            </h4>
            <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3 mb-5 xs:mb-6 sm:mb-8">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 text-[11px] xs:text-xs sm:text-sm hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-bold text-[11px] xs:text-xs sm:text-sm tracking-wide mb-2 xs:mb-2.5 sm:mb-3">
              WORK HOURS
            </h4>
            <p className="text-slate-300 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
              10 AM – 8 PM
              <br />
              Monday – Saturday
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 xs:gap-3 sm:gap-4 py-4 xs:py-5 sm:py-6 text-[11px] xs:text-xs sm:text-sm">
          <p className="text-slate-300 text-center md:text-left">
            © Copyright {new Date().getFullYear()} AKSAN. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/Privacypolicy" className="text-slate-300 hover:text-white transition text-[11px] xs:text-xs sm:text-sm">
              Privacy Policy
            </Link>
            <Link href="/Termsandcondition" className="text-slate-300 hover:text-white transition text-[11px] xs:text-xs sm:text-sm">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}