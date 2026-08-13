import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  BarChart3,
  AlertTriangle,
  Users,
  FileText,
  Target,
  Info,
  Download,
  ShieldCheck,
  Lock,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Draft Red Herring Prospectus (DRHP) | AKSAN Capital",
  description:
    "Access Draft Red Herring Prospectus documents of companies managed by AKSAN Capital.",
};

const drhpDocuments = [
  {
    id: 1,
    name: "Phantom Digital Effects Limited",
    logo: "/client/phantom.png",
    listingDate: "21-10-2022",
    listingExchange: "NSE Emerge",
    ipoSize: "29.10",
    ipoPrice: "315.00",
    href: "/PhantomDigital_DRHP.pdf",
  },
  {
    id: 2,
    name: "Krishca Strapping Solutions Limited",
    logo: "/client/krishca.png",
    listingDate: "26-05-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "17.93",
    ipoPrice: "118.00",
    href: "/KrishcaStrapping_DRHP.pdf",
  },
  {
    id: 3,
    name: "Basilic Fly Studio Limited",
    logo: "/client/basilicfly.png",
    listingDate: "11-09-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "66.35",
    ipoPrice: "295.00",
    href: "/Draft-red-herring-prospectus-Basilic-Fly-Studio-Limited.pdf",
  },
  {
    id: 4,
    name: "ROX Hi-Tech Limited",
    logo: "/client/rox.png",
    listingDate: "16-11-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "54.49",
    ipoPrice: "135.00",
    href: "/ROX Hi-Tech Limited DRHP.pdf",
  },
  {
    id: 5,
    name: "Supreme Power Equipment Limited",
    logo: "/client/spel.jpg",
    listingDate: "29-12-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "46.67",
    ipoPrice: "98.00",
    href: "/SupremePower_DRHP.pdf",
  },
  {
    id: 6,
    name: "Thaai Casting Limited",
    logo: "/client/thaicasting.jpg",
    listingDate: "23-02-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "47.20",
    ipoPrice: "185.90",
    href: "/ThaaiCasting_DRHP.pdf",
  },
  {
    id: 7,
    name: "AVP Infracon Limited",
    logo: "/client/avp.png",
    listingDate: "20-03-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "52.34",
    ipoPrice: "79.00",
    href: "/DRHP_AVP-Infracon-limited_final.pdf",
  },
  {
    id: 8,
    name: "ABS Marine Services Limited",
    logo: "/client/abs.png",
    listingDate: "21-05-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "96.29",
    ipoPrice: "294.00",
    href: "/ABSMarine_DRHP.pdf",
  },
  {
    id: 9,
    name: "Sathlokhar Synergys E&C Global Limited",
    logo: "/client/sathlokar.png",
    listingDate: "06-08-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "92.93",
    ipoPrice: "260.00",
    href: "/SathlokharSynergys_DRHP.pdf",
  },
  {
    id: 10,
    name: "AFCOM Holdings Limited",
    logo: "/client/afcom.png",
    listingDate: "09-08-2024",
    listingExchange: "BSE Emerge",
    ipoSize: "73.83",
    ipoPrice: "205.00",
    href: "/DRHP AFCOM final_20240326113515.pdf",
  },
  {
    id: 11,
    name: "Freshara Agro Exports Limited",
    logo: "/client/freshara.png",
    listingDate: "24-10-2024",
    listingExchange: "BSE Emerge",
    ipoSize: "73.83",
    ipoPrice: "135.00",
    href: "/FresharaAgroExportsLimited_DRHP.pdf",
  },
  {
    id: 12,
    name: "Emerald Tyre Manufacturers Limited",
    logo: "/client/emerald.png",
    listingDate: "12-12-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "49.26",
    ipoPrice: "180.00",
    href: "/DRHP_Emerald_Final.pdf",
  },
  {
    id: 13,
    name: "Happy Square Outsourcing Services Limited (White Force)",
    logo: "/client/whiteforce.png",
    listingDate: "10-07-2025",
    listingExchange: "NSE Emerge",
    ipoSize: "24.24",
    ipoPrice: "77.00",
    href: "/Registration_30012025182411_DRHP_HappySquare.pdf",
  },
  // New 3 cards
  {
    id: 14,
    name: "Taiyo Global Infratech Limited",
    logo: "/client/taiyo.jpg",
    listingDate: "TBD",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD",
    ipoPrice: "TBD",
    href: "/Taiyo-DRHP.pdf",
  },
  {
    id: 15,
    name: "Sri Priyanka Enterprises Limited",
    logo: "/client/spgcl.jpg",
    listingDate: "TBD",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD",
    ipoPrice: "TBD",
    href: "/Sri_priyanka_DRHP.pdf",
  },
  {
    id: 16,
    name: "RK Steel & Infrastructure Limited",
    logo: "/client/rksteel.jpg",
    listingDate: "TBD",
    listingExchange: "NSE Emerge",
    ipoSize: "TBD",
    ipoPrice: "TBD",
    href: "/RK-steel-DRHP.pdf",
  },
];

const drhpContents = [
  {
    icon: Building2,
    title: "Company & Business Overview",
    desc: "Details about the company, industry, and business model.",
  },
  {
    icon: BarChart3,
    title: "Financial Information",
    desc: "Historical financials and key performance indicators.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Factors",
    desc: "Potential risks associated with the business and industry.",
  },
  {
    icon: Users,
    title: "Management & Promoter Details",
    desc: "Information about management team and promoters.",
  },
  {
    icon: FileText,
    title: "IPO / Offer Details",
    desc: "Issue size, price band, structure, and offer details.",
  },
  {
    icon: Target,
    title: "Objects of the Issue",
    desc: "Purpose and utilization of the proceeds.",
  },
];

const heroFeatures = [
  {
    icon: ShieldCheck,
    title: "SEBI Compliant",
    desc: "All documents filed as per SEBI guidelines.",
  },
  {
    icon: Lock,
    title: "Investor Access",
    desc: "Transparent access to preliminary offer information.",
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px] text-slate-400 flex-none">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px] text-slate-400 flex-none">
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
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px] text-slate-400 flex-none">
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
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px] text-slate-400 flex-none">
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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600 flex-none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-slate-400 whitespace-nowrap">
        {icon}
        {label}
      </span>
      <span className="font-medium text-slate-700 text-right">{value}</span>
    </div>
  );
}

function DocumentCard({ index, doc }) {
  // Check if this is one of the new cards (id 14, 15, or 16)
  const isNewCard = doc.id === 14 || doc.id === 15 || doc.id === 16;
  
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#0B1B3A] text-xs font-semibold text-white">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 flex h-[72px] w-full items-center justify-center">
        {doc.logo ? (
          <div className={`relative ${isNewCard ? 'h-[80px] w-[160px]' : 'h-[60px] w-[120px]'}`}>
            <Image
              src={doc.logo}
              alt={doc.name}
              fill
              className="object-contain"
              sizes={isNewCard ? "160px" : "120px"}
            />
          </div>
        ) : (
          <span className={`flex items-center justify-center rounded-full bg-blue-50 text-base font-bold text-[#0B1B3A] ${isNewCard ? 'h-16 w-16 text-lg' : 'h-14 w-14'}`}>
            {doc.name.charAt(0)}
          </span>
        )}
      </div>

      <p className="mt-4 flex min-h-[44px] items-center justify-center text-center text-sm font-semibold leading-snug text-[#0B1B3A]">
        {doc.name}
      </p>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-600">
        <DetailRow icon={<CalendarIcon />} label="Listing Date" value={doc.listingDate} />
        <DetailRow icon={<ExchangeIcon />} label="Listing Exchange" value={doc.listingExchange} />
        <DetailRow icon={<SizeIcon />} label="IPO Size (in Crs.)" value={doc.ipoSize} />
        <DetailRow icon={<PriceIcon />} label="IPO Price (₹)" value={doc.ipoPrice} />
      </div>

      <Link
        href={doc.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 rounded-md border border-[#0B1B3A] py-2.5 text-xs font-semibold uppercase tracking-wide text-[#0B1B3A] transition hover:bg-[#0B1B3A] hover:text-white"
      >
        <DownloadIcon />
        View Document
      </Link>
    </div>
  );
}

export default function DRHPPage() {
  return (
    <main style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[420px] w-full items-center overflow-hidden bg-[#0B1B3A] sm:min-h-[520px]">
        <div className="absolute inset-0">
          <Image
            src="/drhp.png"
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
              Draft Red Herring
              <br />
              <span className="text-orange-500">Prospectus (DRHP)</span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-[15px] mb-8 sm:mb-10">
              Access the Draft Red Herring Prospectus documents of companies
              managed by AKSAN Capital. These documents provide preliminary
              information submitted during the IPO process and are made
              available for investor reference.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Understanding DRHP + What does a DRHP contain? ===== */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 items-start">
            {/* Left: Understanding DRHP */}
            <div>
              <span className="mb-2.5 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-orange-500">
                About DRHP
                <span className="h-px w-8 bg-orange-500/70" />
              </span>
              <h2 className="text-2xl font-bold leading-snug text-[#152249] sm:text-3xl">
                Understanding DRHP
              </h2>
              <span className="mt-3 block h-1 w-14 rounded-full bg-orange-500" />

              <p className="mt-5 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                The Draft Red Herring Prospectus (DRHP) is a preliminary offer
                document filed with SEBI before launching an Initial Public
                Offering (IPO).
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                It contains essential information about the company, its
                business operations, financial performance, risk factors,
                management details, and the proposed public issue.
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                Investors may review these documents for informational
                purposes prior to the approval and publication of the final
                prospectus.
              </p>
              <p className="mt-4 text-sm leading-[1.8] text-slate-500 sm:text-[15px]">
                It contains essential information about the company, its
                business operations, financial performance, risk factors,
                management details, and the proposed public issue.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <InfoIcon />
                <div>
                  <p className="text-sm font-semibold text-[#0B1B3A]">
                    Please Note
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    DRHP is a preliminary document and is subject to changes.
                    It is not a final offer document.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: What does a DRHP contain? */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <h3 className="text-base font-bold text-[#152249] sm:text-lg">
                What does a DRHP contain?
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

      {/* ===== Our DRHP Documents ===== */}
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
              Browse and download the Draft Red Herring Prospectus documents
              of companies advised by AKSAN Capital.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {drhpDocuments.map((doc, i) => (
              <DocumentCard key={doc.id} index={i + 1} doc={doc} />
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
                Draft Red Herring Prospectus carefully before making any
                investment decisions. Availability of a DRHP does not
                constitute an invitation to invest or a confirmation of issue
                approval.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl bg-[#0B1B3A] p-6 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white/10 text-orange-500">
                <Download size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-base font-bold text-white sm:text-lg">
                  Looking for specific offer documents?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Explore the latest DRHP and investor-related documents
                  managed by AKSAN Capital.
                </p>
              </div>
            </div>

            <Link
              href="/investor-relations"
              className="inline-flex flex-none items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-xs font-semibold text-white transition hover:bg-orange-600 sm:text-sm"
            >
              Explore Investor Relations
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}