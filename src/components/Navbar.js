"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/About" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Capital Markets", href: "/services/capital-markets" },
      { label: "Corporate Restructuring", href: "/services/corporate-restructuring" },
      { label: "Valuation", href: "/services/valuation" },
    ],
  },
  { label: "Offer documents", href: "/offer-documents" },
  {
    label: "Investor relations",
    href: "/investor-relations",
    children: [
      { label: "Code and Policies", href: "/investor-relations/code-and-policies" },
      { label: "Investor Charter", href: "/investor-relations/investor-charter" },
      { label: "Investor Grievance Redressal", href: "/investor-relations/investor-grievance-redressal" },
    ],
  },
  { label: "Gallery", href: "/Gallery" },
  // { label: "Blogs", href: "/BlogsPage" },
  { label: "Contact Us", href: "/contactus" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Add Gallery to pages with static blue background
  const isAboutPage = pathname === "/About";
  const isGalleryPage = pathname === "/Gallery";
  const isAwardSlugPage = pathname.startsWith("/awards/");
  const isprivacypolicy = pathname === "/Privacypolicy";
  const terms = pathname === "/Termsandcondition";
  const events = pathname === "/events"
  const showSolidBg = scrolled || isAboutPage || isGalleryPage || isAwardSlugPage || isprivacypolicy || terms || events;

  // Determine which logo to show
  const logoSrc = showSolidBg ? "/aksanlogod.png" : "/White-logo.png";

  // Gradient style for text
  const gradientStyle = {
    background: "linear-gradient(135deg, #0B1A33 0%, #10254A 40%, #0F3A66 75%, #0E4A7A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  // Check if current path is a service subpage
  const isServiceSubpage = pathname.startsWith("/services/");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        showSolidBg ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: showSolidBg ? "#ffffff" : "transparent",
        fontFamily: "Whitney, sans-serif",
      }}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-6 py-2.5 sm:py-3 lg:py-3.5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={logoSrc}
            alt="AKSAN Capital Advisory Private Limited — Guidance that Grows Wealth"
            width={320}
            height={100}
            className="w-auto h-10 sm:h-12 lg:h-20"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(link.label)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-[18px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    servicesOpen === link.label || (link.href && pathname.startsWith(link.href))
                      ? "text-[#F2622E]"
                      : showSolidBg
                      ? "text-[#0B1A33] hover:text-[#F2622E]"
                      : "text-white/90 hover:text-[#F2622E]"
                  }`}
                >
                  <span
                    style={
                      showSolidBg && servicesOpen !== link.label && !(link.href && pathname.startsWith(link.href))
                        ? gradientStyle
                        : {}
                    }
                  >
                    {link.label}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${
                      servicesOpen === link.label ? "rotate-180" : ""
                    }`}
                    style={
                      showSolidBg && servicesOpen !== link.label
                        ? {
                            stroke: "url(#navGradient)",
                          }
                        : {
                            stroke: showSolidBg ? "#0B1A33" : "white",
                          }
                    }
                  >
                    <defs>
                      <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0B1A33" />
                        <stop offset="40%" stopColor="#10254A" />
                        <stop offset="75%" stopColor="#0F3A66" />
                        <stop offset="100%" stopColor="#0E4A7A" />
                      </linearGradient>
                    </defs>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div
                  className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
                    servicesOpen === link.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <ul className="w-64 sm:w-72 bg-white rounded-lg shadow-[0_16px_40px_-12px_rgba(15,42,92,0.28)] ring-1 ring-slate-900/5 overflow-hidden">
                    {link.children.map((child, idx) => (
                      <li key={child.label} className={idx > 0 ? "border-t border-slate-100" : ""}>
                        <Link
                          href={child.href}
                          className="group flex items-center px-5 py-3.5 text-[12px] font-medium text-slate-600 hover:text-[#F2622E] hover:bg-slate-50 transition-colors relative"
                        >
                          <span className="absolute left-0 top-0 h-full w-[3px] bg-[#F2622E] scale-y-0 group-hover:scale-y-100 transition-transform duration-150 origin-center" />
                          <span className="pl-2">{child.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-[18px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    link.href === pathname
                      ? "text-[#F2622E]"
                      : showSolidBg
                      ? "text-[#0B1A33] hover:text-[#F2622E]"
                      : "text-white/90 hover:text-[#F2622E]"
                  }`}
                  style={
                    showSolidBg && link.href !== pathname
                      ? gradientStyle
                      : {}
                  }
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile menu toggle — animated hamburger to X */}
        <button
          className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center -mr-1.5 sm:-mr-2 rounded-full active:bg-white/10 transition-colors"
          onClick={() => {
            setMobileOpen((prev) => !prev);
            setMobileServicesOpen(false);
          }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`absolute h-[2px] w-5 sm:w-6 rounded-full transition-all duration-300 ${
              showSolidBg ? "bg-[#0B1A33]" : "bg-white"
            } ${mobileOpen ? "rotate-45" : "-translate-y-[6px]"}`}
          />
          <span
            className={`absolute h-[2px] w-5 sm:w-6 rounded-full transition-all duration-300 ${
              showSolidBg ? "bg-[#0B1A33]" : "bg-white"
            } ${mobileOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-[2px] w-5 sm:w-6 rounded-full transition-all duration-300 ${
              showSolidBg ? "bg-[#0B1A33]" : "bg-white"
            } ${mobileOpen ? "-rotate-45" : "translate-y-[6px]"}`}
          />
        </button>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 28 }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile nav panel — slide-in card, not full width */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[82%] max-w-[360px] transform transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          zIndex: 29,
          background: "linear-gradient(180deg, #0a1c44 0%, #0f4475 100%)",
          boxShadow: mobileOpen ? "-8px 0 32px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
            <Image
              src="/White-logo.png"
              alt="AKSAN Capital Advisory"
              width={314}
              height={100}
              className="w-auto h-9"
            />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-white">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links with dividers */}
          <ul className="flex flex-col px-3 pt-3 pb-2 divide-y divide-white/10">
            {navLinks.map((link) => (
              <li key={link.label} className="py-0.5">
                {link.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setMobileServicesOpen((prev) => (prev === link.label ? false : link.label))
                      }
                      className={`w-full flex items-center justify-between text-[13px] font-semibold tracking-wide py-3.5 px-3 rounded-xl active:bg-white/5 transition-colors ${
                        link.href && pathname.startsWith(link.href)
                          ? "text-[#F2622E]"
                          : "text-white/90"
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-white/60 transform transition-transform duration-200 ${
                          mobileServicesOpen === link.label ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileServicesOpen === link.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ml-3 mt-0.5 mb-2 flex flex-col gap-0.5 border-l-2 border-[#F2622E]/30 pl-3">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={`block text-[12.5px] font-medium py-2.5 px-3 rounded-lg active:bg-white/5 transition-colors ${
                                child.href === pathname
                                  ? "text-[#F2622E]"
                                  : "text-white/60 hover:text-[#F2622E] active:text-[#F2622E]"
                              }`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center text-[13px] font-semibold tracking-wide py-3.5 px-3 rounded-xl transition-colors relative ${
                      link.href === pathname
                        ? "text-[#F2622E] bg-[#F2622E]/10"
                        : "text-white/90 active:bg-white/5"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.href === pathname && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-[#F2622E]" />
                    )}
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}