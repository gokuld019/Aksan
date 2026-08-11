import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Draft Red Herring Prospectus (DRHP) | AKSAN Capital",
  description:
    "Access Draft Red Herring Prospectus documents of companies managed by AKSAN Capital.",
};

// Replace `href` values with the real document links (PDFs in /public).
// Replace `logo` values with actual logo image paths in /public/logos/ (or set to null to show initials).
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
    logo: "/logos/supreme.png",
    listingDate: "29-12-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "46.67",
    ipoPrice: "98.00",
    href: "/SupremePower_DRHP.pdf",
  },
  {
    id: 6,
    name: "Thaai Casting Limited",
    logo: "/logos/thaai.png",
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
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Index badge */}
      <div className="flex items-center justify-between">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#0B1B3A] text-xs font-semibold text-white">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Logo — fixed, uniform box for every card */}
      <div className="mt-4 flex h-16 w-full items-center justify-center">
        {doc.logo ? (
          <div className="relative h-full w-full max-w-[140px]">
            <Image
              src={doc.logo}
              alt={doc.name}
              fill
              className="object-contain"
              sizes="140px"
            />
          </div>
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-base font-bold text-[#0B1B3A]">
            {doc.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Company name — fixed height so cards line up regardless of name length */}
      <p className="mt-4 flex min-h-[44px] items-center justify-center text-center text-sm font-semibold leading-snug text-[#0B1B3A]">
        {doc.name}
      </p>

      {/* Details */}
      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-600">
        <DetailRow icon={<CalendarIcon />} label="Listing Date" value={doc.listingDate} />
        <DetailRow icon={<ExchangeIcon />} label="Listing Exchange" value={doc.listingExchange} />
        <DetailRow icon={<SizeIcon />} label="IPO Size (in Crs.)" value={doc.ipoSize} />
        <DetailRow icon={<PriceIcon />} label="IPO Price (₹)" value={doc.ipoPrice} />
      </div>

      {/* CTA pinned to bottom via mt-auto so buttons align across the row */}
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
      <section className="relative flex min-h-[420px] w-full items-end overflow-hidden bg-[#0B1B3A] sm:min-h-[520px]">
        <div className="absolute inset-0">
          <Image
            src="/drhp.png"
            alt=""
            fill
            priority
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3A]/80 via-[#0B1B3A]/60 to-[#0B1B3A]/10" />
        </div>

        <div className="relative z-10 mx-auto mb-10 w-full max-w-[1400px] px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="max-w-2xl">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.15em] text-orange-500">
              Offer Documents
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.5rem]">
              Draft Red Herring
              <br />
              <span className="text-orange-500">Prospectus (DRHP)</span>
            </h1>
            <span className="mb-5 block h-1 w-14 rounded-full bg-orange-500" />
            <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-[15px]">
              Access the Draft Red Herring Prospectus documents of companies
              managed by AKSAN Capital. These documents provide preliminary
              information submitted during the IPO process and are made
              available for investor reference.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Understanding DRHP ===== */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-snug text-[#152249] sm:text-3xl">
              Understanding DRHP
            </h2>
            <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-orange-500" />

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-[1.8] text-slate-500 sm:text-base">
              The Draft Red Herring Prospectus (DRHP) is a preliminary offer
              document filed with SEBI before launching an Initial Public
              Offering (IPO). It contains essential information about the
              company, its business operations, financial performance, risk
              factors, management details, and the proposed public issue.
              Investors may review these documents for informational purposes
              prior to the approval and publication of the final prospectus.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Our DRHP Documents ===== */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold leading-snug text-[#152249] sm:text-3xl">
              Our DRHP Documents
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
        </div>
      </section>
    </main>
  );
}