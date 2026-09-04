"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  BarChart3,
  AlertTriangle,
  Users,
  FileText,
  Target,
  Star,
  ArrowUpRight,
  FileSearch,
} from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Combined documents with all three document types
const offerDocuments = [
  {
    id: 1,
    name: "Phantom Digital Effects Limited",
    logo: "/client/phantom.jpg",
    listingDate: "31-10-2022",
    listingExchange: "NSE Emerge",
    ipoSize: "29.10",
    ipoPrice: "375.00",
    drhpUrl: "/PhantomDigital_DRHP.pdf",
    rhpUrl: "/rhp/phantom.pdf",
    prospectusUrl: "/prospectus/Phantom_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 2,
    name: "Krishca Strapping Solutions Limited",
    logo: "/client/krishca.jpg",
    listingDate: "26-05-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "17.93",
    ipoPrice: "98.00",
    drhpUrl: "/KrishcaStrapping_DRHP.pdf",
    rhpUrl: "/rhp/krishca.pdf",
    prospectusUrl: "/prospectus/krishca-rhp.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 3,
    name: "Basilic Fly Studio Limited",
    logo: "/client/basilicfly.jpg",
    listingDate: "11-09-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "66.35",
    ipoPrice: "395.00",
    drhpUrl: "/Draft-red-herring-prospectus-Basilic-Fly-Studio-Limited.pdf",
    rhpUrl: "/rhp/basilic.pdf",
    prospectusUrl: "/prospectus/Basilic-prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 4,
    name: "ROX Hi-Tech Limited",
    logo: "/client/rox.jpg",
    listingDate: "16-11-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "54.49",
    ipoPrice: "135.00",
    drhpUrl: "/ROX Hi-Tech Limited DRHP.pdf",
    rhpUrl: "/rhp/rox.pdf",
    prospectusUrl: "/prospectus/Rox Hi-Tech - Prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 5,
    name: "Supreme Power Equipment Limited",
    logo: "/client/spel.jpg",
    listingDate: "29-12-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "46.67",
    ipoPrice: "94.00",
    drhpUrl: "/spel-drhp.pdf",
    rhpUrl: "/rhp/supreme.pdf",
    prospectusUrl: "/prospectus/Supreme_Prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 6,
    name: "Thaai Casting Limited",
    logo: "/client/thaicasting.jpg",
    listingDate: "23-02-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "47.20",
    ipoPrice: "185.00",
    drhpUrl: "/thaaicasting-drhp.pdf",
    rhpUrl: "/rhp/thaaicasting.pdf",
    prospectusUrl: "/prospectus/Thaai csting_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 7,
    name: "AVP Infracon Limited",
    logo: "/client/avp.jpg",
    listingDate: "28-03-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "52.34",
    ipoPrice: "79.00",
    drhpUrl: "/DRHP_AVP-Infracon-limited_final.pdf",
    rhpUrl: "/rhp/avp.pdf",
    prospectusUrl: "/prospectus/Prospectus_AVP-Infracon.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 8,
    name: "ABS Marine Services Limited",
    logo: "/client/abs.jpg",
    listingDate: "21-05-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "56.29",
    ipoPrice: "294.00",
    drhpUrl: "/ABSMarine_DRHP.pdf",
    rhpUrl: "/rhp/abs.pdf",
    prospectusUrl: "/prospectus/ABS_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 9,
    name: "Sathlokhar Synergys E&C Global Limited",
    logo: "/client/sathlokar.jpg",
    listingDate: "06-08-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "92.93",
    ipoPrice: "260.00",
    drhpUrl: "/SathlokharSynergys_DRHP.pdf",
    rhpUrl: "/rhp/sathlokar.pdf",
    prospectusUrl: "/prospectus/Sathlokar_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 10,
    name: "AFCOM Holdings Limited",
    logo: "/client/afcom.jpg",
    listingDate: "09-08-2024",
    listingExchange: "BSE Emerge",
    ipoSize: "22.15",
    ipoPrice: "205.00",
    drhpUrl: "/DRHP AFCOM final_20240326113515.pdf",
    rhpUrl: "/rhp/afcom.pdf",
    prospectusUrl: "/prospectus/Afcom_Prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 11,
    name: "Freshara Agro Exports Limited",
    logo: "/client/freshara.jpg",
    listingDate: "24-10-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "73.83",
    ipoPrice: "125.00",
    drhpUrl: "/FresharaAgroExportsLimited_DRHP.pdf",
    rhpUrl: "/rhp/freshara.pdf",
    prospectusUrl: "/prospectus/Freshara_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 12,
    name: "Emerald Tyre Manufacturers Limited",
    logo: "/client/emerald.jpg",
    listingDate: "12-12-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "49.26",
    ipoPrice: "180.00",
    drhpUrl: "/DRHP_Emerald_Final.pdf",
    rhpUrl: "/rhp/emerald.pdf",
    prospectusUrl: "/prospectus/Emerald_Prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 13,
    name: "Happy Square Outsourcing Services Limited (White Force)",
    logo: "/client/whiteforce.jpg",
    listingDate: "10-07-2025",
    listingExchange: "NSE Emerge",
    ipoSize: "24.24",
    ipoPrice: "77.00",
    drhpUrl: "/Registration_30012025182411_DRHP_HappySquare.pdf",
    rhpUrl: "/rhp/happysquare.pdf",
    prospectusUrl: "/prospectus/HappySquare_prospectus.pdf",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 14,
    name: "Taiyo Feed Mill Limited",
    logo: "/client/taiyo.jpg",
    listingDate: "TBD - To Be Disclosed",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD - To Be Disclosed",
    ipoPrice: "TBD - To Be Disclosed",
    drhpUrl: "/Taiyo-DRHP.pdf",
    rhpUrl: "#",
    prospectusUrl: "#",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 15,
    name: "Sri Priyanka Enterprises Limited",
    logo: "/client/spgcl.jpg",
    listingDate: "TBD - To Be Disclosed",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD - To Be Disclosed",
    ipoPrice: "TBD - To Be Disclosed",
    drhpUrl: "/Sri_priyanka_DRHP.pdf",
    rhpUrl: "/sprhp.pdf",
    prospectusUrl: "#",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
  },
  {
    id: 16,
    name: "RK Steel & Infrastructure Limited",
    logo: "/client/rksteel.jpg",
    listingDate: "TBD - To Be Disclosed",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD - To Be Disclosed",
    ipoPrice: "TBD - To Be Disclosed",
    drhpUrl: "/RK-steel-DRHP.pdf",
    rhpUrl: "#",
    prospectusUrl: "#",
    qipUrl: "#",
    ncdUrl: "#",
    ccdUrl: "#",
    yetToFile: true,
  },
];

// Updated to match PDF content exactly
const drhpContents = [
  {
    icon: Building2,
    title: "Company & Business Overview",
    desc: "Information about the company, its business model, industry, operations, and competitive position.",
  },
  {
    icon: BarChart3,
    title: "Financial Information",
    desc: "Key financial statements, historical performance, and relevant financial information.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Factors",
    desc: "Important risks and uncertainties associated with the company, industry, and proposed offering.",
  },
  {
    icon: Users,
    title: "Management & Promoter Details",
    desc: "Information about the company's management team, promoters, and their relevant background.",
  },
  {
    icon: FileText,
    title: "IPO / Offer Details",
    desc: "Details relating to the proposed issue, including issue structure, size, price band, and other offer-related information.",
  },
  {
    icon: Target,
    title: "Objects of the Issue",
    desc: "Details on how the company proposes to utilise the funds raised through the offering.",
  },
];

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600 flex-none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] text-slate-600 flex-none">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] text-slate-600 flex-none">
      <path
        d="M4 7h13M17 7l-3-3M17 7l-3 3M20 17H7M7 17l3-3M7 17l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] text-slate-600 flex-none">
      <path
        d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] text-slate-600 flex-none">
      <path
        d="M12 3v18M16.5 6.5H9.75a2.75 2.75 0 0 0 0 5.5h4.5a2.75 2.75 0 0 1 0 5.5H7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-slate-700 font-semibold whitespace-nowrap text-[13px]">
        {icon}
        {label}
      </span>
      <span className="font-bold text-slate-800 text-right text-[14px]">{value}</span>
    </div>
  );
}

// SINGLE BUTTON COMPONENT - All buttons use the same style
function DocButton({ href, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/btn relative flex items-center gap-2.5 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 transition-all duration-300 hover:bg-[#0B1B3A] hover:border-[#0B1B3A] hover:text-white"
    >
      <FileText size={13} className="relative z-10 flex-none opacity-70 transition-opacity duration-300 group-hover/btn:opacity-100" />
      <span className="relative z-10 flex-1">{label}</span>
      <span className="relative z-10 flex items-center gap-1 text-[9px] font-medium normal-case tracking-normal opacity-60 transition-opacity duration-300 group-hover/btn:opacity-100">
        View
        <ArrowUpRight
          size={13}
          className="-translate-x-0.5 transition-all duration-300 group-hover/btn:translate-x-0"
        />
      </span>
    </Link>
  );
}

// COMPACT VARIANT — used for the 3-across QIP / NCD / CCD row where
// space is tighter than the full-width buttons above it.
function DocButtonCompact({ href, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/btn relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/60 px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 transition-all duration-300 hover:bg-[#0B1B3A] hover:border-[#0B1B3A] hover:text-white"
    >
      <FileText size={13} className="relative z-10 flex-none opacity-70 transition-opacity duration-300 group-hover/btn:opacity-100" />
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function DocumentCard({ doc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4, boxShadow: "0 16px 32px -10px rgba(15,42,92,0.18)" }}
      className="relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition"
    >
      {/* Filing stage star badge */}
      {doc.yetToFile && (
        <span className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-blue-500 to-blue-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_6px_16px_-4px_rgba(59,130,246,0.6)]">
          <Star size={11} fill="currentColor" strokeWidth={0} />
          Yet to File
        </span>
      )}

      {/* Logo — LARGER size */}
      <div className="flex h-[180px] w-full items-center justify-center">
        {doc.logo ? (
          <div className="relative h-[170px] w-[320px]">
            <Image
              src={doc.logo}
              alt={doc.name}
              fill
              className="object-contain"
              sizes="320px"
              priority={index < 4}
            />
          </div>
        ) : (
          <span className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-50 text-4xl font-bold text-[#0B1B3A]">
            {doc.name.charAt(0)}
          </span>
        )}
      </div>

      <p className="mt-3 flex min-h-[40px] items-center justify-center text-center text-[13px] font-semibold leading-snug text-[#0B1B3A]">
        {doc.name}
      </p>

      <div className="mt-4 space-y-3 border-t border-slate-100 pt-3.5">
        <DetailRow icon={<CalendarIcon />} label="Listing Date" value={doc.listingDate} />
        <DetailRow icon={<ExchangeIcon />} label="Listing Exchange" value={doc.listingExchange} />
        <DetailRow icon={<SizeIcon />} label="IPO Size (in Crs.)" value={doc.ipoSize} />
        <DetailRow icon={<PriceIcon />} label="IPO Price (₹)" value={doc.ipoPrice} />
      </div>

      {/* Section label */}
      <div className="mt-5 mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        <FileSearch size={13} className="flex-none" />
        View Documents
      </div>

      {/* Main doc buttons stacked, QIP/NCD/CCD split into 3 buttons in one row */}
      <div className="flex flex-col gap-1.5">
        <DocButton href={doc.drhpUrl} label="DRHP" />
        <DocButton href={doc.rhpUrl} label="RHP" />
        <DocButton href={doc.prospectusUrl} label="Prospectus" />
        <div className="grid grid-cols-3 gap-1.5">
          <DocButtonCompact href={doc.qipUrl || "#"} label="QIP" />
          <DocButtonCompact href={doc.ncdUrl || "#"} label="NCD" />
          <DocButtonCompact href={doc.ccdUrl || "#"} label="CCD" />
        </div>
      </div>
    </motion.div>
  );
}

export default function OfferDocumentsPage() {
  return (
    <main className={`w-full bg-white ${notoSans.className}`}>
      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[420px] w-full items-center overflow-hidden bg-[#0B1B3A] sm:min-h-[520px]">
        <div className="absolute inset-0">
          <Image
            src="/offerdoc.png"
            alt=""
            fill
            priority
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3A]/85 via-[#0B1B3A]/65 to-[#0B1B3A]/15" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 mt-20">
          <div className="max-w-2xl">
            <span className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-orange-500 sm:text-sm">
              Offer Documents
              <span className="h-px w-8 bg-orange-500/70" />
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.5rem]">
              Offer
              <br />
              <span className="text-orange-500">Documents</span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-[15px] mb-8 sm:mb-10">
              Access Draft Red Herring Prospectus, Red Herring Prospectus, and
              Prospectus documents of companies managed by AKSAN Capital.
              These documents provide comprehensive information about the
              company, its financials, and the proposed public issue.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Understanding Offer Documents ===== */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 items-start">
            {/* Left: Understanding Offer Documents */}
            <div>
              <span className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-orange-500">
                Offer Documents
                <span className="h-px w-8 bg-orange-500/70" />
              </span>
              <h2 className="text-2xl font-bold leading-snug text-[#152249] sm:text-3xl">
                Understanding Offer Documents
              </h2>
              <span className="mt-3 block h-1 w-14 rounded-full bg-orange-500" />

              <p className="mt-5 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                Offer Documents provide detailed information about a company and its proposed public offering. They help investors understand the company's business, financial performance, offer structure, risk factors, and the proposed use of funds.
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                AKSAN Capital Advisory provides access to relevant offer documents of companies advised by us, enabling investors and stakeholders to review important information associated with each offering.
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                These documents are made available for informational purposes and should be reviewed carefully before making any investment decision.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <InfoIcon />
                <div>
                  <p className="text-sm font-semibold text-[#0B1B3A]">
                    Please Note
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Offer Documents contain important information and risk factors relating to the respective offering. Investors should read the complete document carefully and consider all applicable disclosures before making an investment decision.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: What does an Offer Document contain? */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#152249] sm:text-lg">
                What does an Offer Document contain?
              </h3>
              <span className="mt-2 block h-1 w-10 rounded-full bg-orange-500" />

              <div className="mt-5 divide-y divide-slate-200">
                {drhpContents.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white text-[#0B1B3A] shadow-sm">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold leading-snug text-[#152249] sm:text-sm">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500 sm:text-[13px]">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Offer Documents Grid ===== */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.15em] text-orange-500">
              Documents
            </span>
            <h2 className="text-2xl font-bold leading-snug text-[#152249] sm:text-3xl">
              Available Offer Documents
            </h2>
            <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-orange-500" />
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Browse and download the DRHP, RHP, and Prospectus documents
              of companies advised by AKSAN Capital.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offerDocuments.map((doc, i) => (
              <DocumentCard key={doc.id} doc={doc} index={i} />
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <InfoIcon />
            <div>
              <p className="text-sm font-semibold leading-snug text-[#0B1B3A]">
                Investor Information
              </p>
              <p className="mt-1.5 text-sm leading-[1.8] text-slate-500">
                These documents are published for informational and regulatory
                reference only. Investors are encouraged to read the respective
                offer documents carefully before making any investment
                decisions. Availability of these documents does not constitute
                an invitation to invest or a confirmation of issue approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}