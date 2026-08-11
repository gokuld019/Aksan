"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Download, Info } from "lucide-react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const NAVY = "#0F2A5C";
const NAVY_DARK = "#0A1F45";
const ORANGE = "#F2622E";

// Replace logo with your actual company logo image path, and documentUrl with the real PDF link
const rhpDocuments = [
  {
    number: "01",
    name: "Phantom Digital Effects Limited",
    logo: "/rhp/phantom-logo.png",
    listingDate: "31-10-2022",
    listingExchange: "NSE Emerge",
    ipoSize: "29.10",
    ipoPrice: "375.00",
    documentUrl: "#",
  },
  {
    number: "02",
    name: "Krishca Strapping Solutions Limited",
    logo: "/rhp/krishca-logo.png",
    listingDate: "26-05-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "17.93",
    ipoPrice: "98.00",
    documentUrl: "#",
  },
  {
    number: "03",
    name: "Basilic Fly Studio Limited",
    logo: "/rhp/basilic-logo.png",
    listingDate: "11-09-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "66.35",
    ipoPrice: "395.00",
    documentUrl: "#",
  },
  {
    number: "04",
    name: "Fox Rin Hi-tech Limited",
    logo: "/rhp/fox-logo.png",
    listingDate: "16-11-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "54.49",
    ipoPrice: "135.00",
    documentUrl: "#",
  },
  {
    number: "05",
    name: "Supreme Power Equipment Limited",
    logo: "/rhp/supreme-logo.png",
    listingDate: "29-12-2023",
    listingExchange: "NSE Emerge",
    ipoSize: "46.67",
    ipoPrice: "94.00",
    documentUrl: "#",
  },
  {
    number: "06",
    name: "Thaai Casting Limited",
    logo: "/rhp/thaai-logo.png",
    listingDate: "23-02-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "47.20",
    ipoPrice: "185.00",
    documentUrl: "#",
  },
  {
    number: "07",
    name: "AVP Infracon Limited",
    logo: "/rhp/avp-logo.png",
    listingDate: "28-03-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "52.34",
    ipoPrice: "79.00",
    documentUrl: "#",
  },
  {
    number: "08",
    name: "ABS Marine Limited",
    logo: "/rhp/abs-logo.png",
    listingDate: "21-05-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "56.29",
    ipoPrice: "294.00",
    documentUrl: "#",
  },
  {
    number: "09",
    name: "Sathlokar Synergys E & C Global Limited",
    logo: "/rhp/sathlokar-logo.png",
    listingDate: "06-08-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "92.93",
    ipoPrice: "260.00",
    documentUrl: "#",
  },
  {
    number: "10",
    name: "Afcom Holdings Limited",
    logo: "/rhp/afcom-logo.png",
    listingDate: "09-08-2024",
    listingExchange: "BSE Emerge",
    ipoSize: "22.15",
    ipoPrice: "205.00",
    documentUrl: "#",
  },
  {
    number: "11",
    name: "Freshara Agro Exports Limited",
    logo: "/rhp/freshara-logo.png",
    listingDate: "24-10-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "73.83",
    ipoPrice: "125.00",
    documentUrl: "#",
  },
  {
    number: "12",
    name: "Emerald Tyre Manufacturers Limited",
    logo: "/rhp/emerald-logo.png",
    listingDate: "12-12-2024",
    listingExchange: "NSE Emerge",
    ipoSize: "49.26",
    ipoPrice: "180.00",
    documentUrl: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
};

function DocumentCard({ doc, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index % 6}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, boxShadow: "0 16px 32px -10px rgba(15,42,92,0.18)" }}
      className="relative bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col"
    >
      {/* Number badge */}
      <span
        className="absolute -top-3 -left-3 flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-bold"
        style={{ backgroundColor: NAVY }}
      >
        {doc.number}
      </span>

      {/* Logo + name */}
      <div className="flex items-center gap-3 mb-4 mt-1">
        <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden bg-slate-50 flex items-center justify-center">
          <Image
            src={doc.logo}
            alt={doc.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <h3
          className="text-sm font-bold leading-tight"
          style={{ color: NAVY, fontFamily: "'Noto Sans', sans-serif" }}
        >
          {doc.name}
        </h3>
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs text-slate-500 mb-5" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
        <div className="flex items-center justify-between">
          <span>Listing Date:</span>
          <span className="font-medium text-slate-700">{doc.listingDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Listing Exchange:</span>
          <span className="font-medium text-slate-700">{doc.listingExchange}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>IPO Size (in Cr.):</span>
          <span className="font-medium text-slate-700">{doc.ipoSize}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>IPO Price:</span>
          <span className="font-medium text-slate-700">{doc.ipoPrice}</span>
        </div>
      </div>

      {/* View document button */}
      <a href={doc.documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: NAVY, fontFamily: "'Noto Sans', sans-serif" }}
      >
        View Document
        <Download size={14} />
      </a>
    </motion.div>
  );
}

export default function RHPPage() {
  return (
    <main className="w-full bg-white" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, " +
              NAVY_DARK +
              " 40%, rgba(15,42,92,0.55) 75%, rgba(15,42,92,0.35) 100%)",
          }}
        />
        <img
          src="/rhp.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-40"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-xs text-slate-300"
          >
            Home <span className="mx-1.5">›</span> RHP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Red Herring{" "}
            <span style={{ color: ORANGE }}>Prospectus (RHP)</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-slate-300 md:text-base"
          >
            Access the Red Herring Prospectus documents of companies managed by
            AKSAN Capital. These documents contain the final offer details
            with SEBI and are made available for investor reference before
            the IPO opens for subscription.
          </motion.p>
        </div>
      </section>

      {/* Understanding RHP */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8 flex gap-5 items-start"
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FDEDE7", color: ORANGE }}
          >
            <FileText size={20} />
          </span>
          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: NAVY }}>
              Understanding RHP
            </h2>
            <p className="text-sm leading-relaxed text-slate-500">
              The Red Herring Prospectus (RHP) is the final offer document
              filed with SEBI after incorporating all regulatory observations.
              It contains comprehensive information about the company, its
              financials, business model, risk factors, and the terms of the
              public issue. Investors may review the RHP before subscribing
              to an IPO.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Documents Grid */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold md:text-3xl mb-2" style={{ color: NAVY }}>
            Our RHP Documents
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Browse and download the Red Herring Prospectus documents of
            companies advised by AKSAN Capital
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-3">
          {rhpDocuments.map((doc, i) => (
            <DocumentCard key={doc.number} doc={doc} index={i} />
          ))}
        </div>
      </section>

      {/* Investor Information Notice */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-100 p-6 flex items-start gap-4"
          style={{ backgroundColor: "#F4F7FC" }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: NAVY }}
          >
            <Info size={16} />
          </span>
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: NAVY }}>
              Investor Information
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">
              These documents are published for informational and regulatory
              reference only. Investors are encouraged to read the respective
              Red Herring Prospectus carefully before making any investment
              decisions. Availability of an RHP does not constitute an
              invitation to invest or a confirmation of issue approval.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}