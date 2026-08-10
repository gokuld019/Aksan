import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Draft Red Herring Prospectus (DRHP) | AKSAN Capital",
  description:
    "Access Draft Red Herring Prospectus documents of companies managed by AKSAN Capital.",
};

// Replace `href` values with the real document / view-page links.
// href values point at the PDFs already sitting in /public — adjust the
// leading path (e.g. "/documents/...") if you move them into a subfolder.
const drhpDocuments = [
  { id: 1, name: "ABS Marine Services Limited", href: "/ABSMarine_DRHP.pdf" },
  {
    id: 2,
    name: "Basilic Fly Studio Limited",
    href: "/Draft-red-herring-prospectus-Basilic-Fly-Studio-Limited.pdf",
  },
  { id: 3, name: "AFCOM Holdings Limited", href: "/DRHP AFCOM final_20240326113515.pdf" },
  { id: 4, name: "AVP Infracon Limited", href: "/DRHP_AVP-Infracon-limited_final.pdf" },
  { id: 5, name: "Emerald Tyre Manufacturers Limited", href: "/DRHP_Emerald_Final.pdf" },
  { id: 6, name: "Freshara Agro Exports Limited", href: "/FresharaAgroExportsLimited_DRHP.pdf" },
  { id: 7, name: "Krishca Strapping Solutions Limited", href: "/KrishcaStrapping_DRHP.pdf" },
  { id: 8, name: "Phantom Digital Effects Limited", href: "/PhantomDigital_DRHP.pdf" },
  {
    id: 9,
    name: "Happy Square Outsourcing Services Limited",
    href: "/Registration_30012025182411_DRHP_HappySquare.pdf",
  },
  { id: 10, name: "ROX Hi-Tech Limited", href: "/ROX Hi-Tech Limited DRHP.pdf" },
  { id: 11, name: "Sathlokhar Synergys E&C Global Limited", href: "/SathlokharSynergys_DRHP.pdf" },
];

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0B1B3A]">
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12h6M9 15h6M9 18h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-600">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function DocumentCard({ index, name, href }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-l-4 border-slate-100 border-l-orange-500 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blue-50">
          <DocumentIcon />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#0B1B3A] sm:text-[15px]">
            {index}. {name}
          </p>
          <p className="mt-1 text-sm text-slate-500">Draft Red Herring Prospectus</p>
          <p className="text-xs text-slate-400">Published for Investor Reference</p>
        </div>
      </div>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-none rounded-md border border-[#0B1B3A] px-4 py-1.5 text-sm font-medium text-[#0B1B3A] transition hover:bg-[#0B1B3A] hover:text-white"
      >
        VIEW
      </Link>
    </div>
  );
}

export default function DRHPPage() {
  return (
    <main style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* ===== Hero ===== */}
      <section className="relative w-full min-h-[420px] sm:min-h-[520px] flex items-end overflow-hidden bg-[#0B1B3A]">
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 mb-10">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-semibold text-sm tracking-[0.15em] uppercase block mb-3">
              Offer Documents
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white leading-[1.08] mb-4">
              Draft Red Herring
              <br />
              <span className="text-orange-500">Prospectus (DRHP)</span>
            </h1>
            <span className="block h-1 w-14 bg-orange-500 rounded-full mb-5" />
            <p className="text-sm sm:text-[15px] text-slate-300/90 leading-relaxed max-w-xl">
              Access the Draft Red Herring Prospectus documents of companies
              managed by AKSAN Capital. These documents provide preliminary
              information submitted during the IPO process and are made
              available for investor reference.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Understanding DRHP ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152249]">
              Understanding DRHP
            </h2>
            <span className="mx-auto mt-3 block h-1 w-14 bg-orange-500 rounded-full" />

            <p className="mt-6 text-sm leading-relaxed text-slate-500 sm:text-base">
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

      {/* ===== Available DRHP Documents ===== */}
      <section className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1350px] mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152249]">
              Available DRHP Documents
            </h2>
            <span className="mx-auto mt-3 block h-1 w-14 bg-orange-500 rounded-full" />
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 sm:text-base">
              Browse and download the available Draft Red Herring Prospectus
              documents published for companies advised by AKSAN Capital.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {drhpDocuments.map((doc) => (
              <DocumentCard key={doc.id} index={doc.id} name={doc.name} href={doc.href} />
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-lg border border-blue-100 bg-blue-50 p-6">
            <span className="mt-0.5 flex-none">
              <InfoIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0B1B3A]">Investor Information</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
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