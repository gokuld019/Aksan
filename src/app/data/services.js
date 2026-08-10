import {
  BarChart3,
  Network,
  FileText,
  PieChart,
  ShieldCheck,
  Users,
  ClipboardList,
  FileSearch,
  ShieldAlert,
  Gavel,
  FileCheck2,
  Award,
  Landmark,
} from "lucide-react";

export const coreServices = [
  {
    slug: "capital-markets",
    number: "01",
    icon: BarChart3,
    title: "Capital Markets",
    // --- UNIQUE BANNER FOR THIS SERVICE ---
    banner: {
      tag: "Our Services",
      title: "Capital Markets",
      subtitle: "End-to-end capital market solutions tailored to your business goals.",
      image: "/HomeBanner.png", // Change to your actual banner image path
    },
    heroSubtitle:
      "End-to-end capital market solutions tailored to your business goals. We help you access the right capital, at the right time, through the right structure.",
    description:
      "Empowering businesses to raise capital through equity and debt markets with strategic structuring and end-to-end execution support.",
    points: [
      "IPO & FPO Advisory",
      "QIP, Rights Issue & Preferential Issue",
      "Debt Syndication",
      "Private Placement",
    ],
    subServices: [
      {
        title: "IPO Management",
        description:
          "We provide end-to-end advisory for SME and Mainboard IPOs and FPOs, managing the entire process from structuring and due diligence to regulatory filings, investor outreach, and successful listing.",
        extra:
          "Our team ensures regulatory compliance and continues to support clients with post-listing advisory and strategic financial solutions.",
        image: "/IPO.png",
      },
      {
        title: "Rights Issue",
        description:
          "We act as Lead Manager to Rights Issues, handling structuring, documentation, regulatory filings, and coordination to ensure maximum shareholder participation and successful completion.",
        extra:
          "Our focus is on regulatory compliance and achieving the company's capital-raising objectives efficiently.",
        image: "/RightsIssue.png",
      },
      {
        title: "Private Placement Consulting",
        description:
          "We assist in structuring and executing private placements, including preferential allotments and institutional issuances, ensuring timely capital infusion and compliance with regulatory requirements.",
        extra:
          "Our process covers documentation, approvals, filings, allotment, and post-issue compliances.",
        image: "/private.png",
      },
      {
        title: "Qualified Institutional Placement (QIP) Support",
        description:
          "We act as Lead Manager to QIPs, overseeing structuring, pricing, documentation, and regulatory filings to facilitate efficient capital mobilization from QIBs.",
        extra:
          "Our approach ensures streamlined execution, compliance, and strengthening of the company's institutional investor base.",
        image: "/QIP.png",
      },
      {
        title: "Debt Syndication",
        description:
          "We help companies raise structured debt through term loans, working capital facilities, and credit instruments, aligned with their business and financial goals.",
        extra:
          "Our services include structuring, lender engagement, negotiation, and documentation for seamless disbursement.",
        image: "/DebtSyndication.png",
      },
      {
        title: "Delisting",
        description:
          "We advise and execute voluntary delisting in compliance with SEBI regulations, ensuring fair price discovery, shareholder approval, and smooth settlement.",
        extra:
          "Our expertise ensures a transparent process that protects shareholder interests and supports strategic business realignment.",
        image: "/Delisting.png",
      },
    ],
  },
  {
    slug: "corporate-restructuring",
    number: "02",
    icon: Network,
    title: "Corporate Restructuring",
    // --- UNIQUE BANNER FOR THIS SERVICE ---
    banner: {
      tag: "Our Services",
      title: "Corporate Restructuring",
      subtitle: "Strategic restructuring solutions to enhance performance, unlock value, and drive long-term sustainable growth.",
      image: "/serviceb.png", // Change to your actual banner image path
    },
    heroSubtitle:
      "Strategic restructuring solutions to enhance performance, unlock value, and drive long-term sustainable growth.",
    description:
      "Helping businesses optimize their structure, improve efficiency, and unlock value through strategic restructuring solutions.",
    points: [
      "Mergers & Acquisitions (M&A)",
      "Demerger & Amalgamation",
      "Business Reorganization",
      "Turnaround Advisory",
    ],
    subServices: [
      {
        title: "Merger & Acquisition Planning",
        description:
          "Our M&A practice is built on deep expertise in executing exclusive mandates across acquisitions, divestitures, mergers, joint ventures, strategic alliances, and takeover advisory.",
        extra:
          "We provide end-to-end transaction support, combining strategic insight with robust execution capabilities.",
        image: "/merger.png",
      },
      {
        title: "Buybacks",
        description:
          "As a SEBI Registered Category I Merchant Banker, we act as Manager to Buyback offers through tender offer or open market routes, providing complete advisory and execution support in compliance with SEBI regulations and the Companies Act.",
        image: "/BuyBacks.png",
      },
      {
        title: "Public Offers",
        description:
          "As a SEBI Registered Category I Merchant Banker, we act as Manager to Open Offers under SEBI (SAST) Regulations, managing the entire regulatory and execution process with precision and transparency.",
        image: "/Publicoffer.png",
      },
      {
        title: "ESOP Advisory",
        description:
          "Employee Stock Option Plans (ESOPs) are structured equity-based incentive mechanisms that enable companies to align employee interests with long-term shareholder value creation and drive organizational growth.",
        image: "/ESOP.png",
      },
      {
        title: "Debt Restructuring Advisory",
        description:
          "We help companies restructure their debt obligations through strategic solutions tailored to their financial position and business goals, ensuring liquidity stability and long-term sustainability.",
        image: "/RestructuringPlan.png",
      },
    ],
  },
  {
    slug: "esop-advisory",
    number: "03",
    icon: FileText,
    title: "ESOP Advisory",
    // --- UNIQUE BANNER FOR THIS SERVICE ---
    banner: {
      tag: "Our Services",
      title: "ESOP Advisory",
      subtitle: "Strategic ESOP solutions to attract, retain, and motivate talent while creating long-term value.",
      image: "/banner.png", // Change to your actual banner image path
    },
    heroSubtitle:
      "Strategic ESOP solutions to attract, retain, and motivate talent while creating long-term value.",
    description:
      "Designing and implementing ESOP plans that align employee interests with business growth and long-term value creation.",
    points: [
      "ESOP Structuring",
      "Valuation & Pricing",
      "Implementation Support",
      "Compliance Advisory",
    ],
    hideIncludedList: true,
    subServices: [
      {
        title: "ESOP Advisory",
        description:
          "Employee Stock Option Plans (ESOPs) are structured equity-based incentive mechanisms that enable companies to align employee interests with long-term shareholder value creation. A well-designed ESOP framework supports talent retention, performance-linked rewards, and capital structuring objectives while complying with applicable provisions of the Companies Act, SEBI (Share Based Employee Benefits and Sweat Equity) Regulations (for listed entities), and relevant accounting standards.",
        bullets: [
          "Align employee interests with long-term shareholder value creation",
          "Drive talent retention and performance-linked rewards",
          "Support capital structuring and ownership alignment",
          "Ensure compliance with Companies Act, SEBI regulations, and Ind AS",
          "Strengthen corporate governance and transparency",
        ],
        image: "/ESOPADVISORY.png",
      },
      {
        title: "Our ESOP Advisory Services",
        description:
          "As a SEBI Registered Category I Merchant Banker, Vatsa Capital Venture provides comprehensive ESOP advisory services, including scheme structuring, determination of exercise pricing and valuation, preparation and vetting of scheme documents, assistance with board and shareholder approvals, and regulatory filings with stock exchanges where applicable.",
        bullets: [
          "Scheme structuring and plan design",
          "Valuation and exercise pricing assistance",
          "Drafting and vetting of ESOP scheme documents",
          "Support with board and shareholder approvals",
          "Regulatory filings with stock exchanges (where applicable)",
          "Compliance with disclosures and accounting under Ind AS",
          "Ongoing compliance management and advisory support",
        ],
        image: "/Esopp.png",
      },
    ],
  },
  {
    slug: "valuation",
    number: "04",
    icon: PieChart,
    title: "Valuation",
    // --- UNIQUE BANNER FOR THIS SERVICE ---
    banner: {
      tag: "Our Services",
      title: "Valuation",
      subtitle: "Independent Valuation. Informed Decisions. Stronger Outcomes.",
      image: "/valuebanner.png", // Change to your actual banner image path
    },
    heroSubtitle:
      "Independent Valuation. Informed Decisions. Stronger Outcomes.",
    description:
      "Providing independent and reliable valuation services to support informed decision-making and regulatory compliance.",
    points: [
      "Business Valuation",
      "Share Valuation",
      "Intangible Asset Valuation",
      "Valuation for M&A & Fundraising",
    ],
    hideIncludedList: true,
    intro: {
      title: "Valuations",
      paragraphs: [
        "As a SEBI Registered Category I Merchant Banker, Vatsa Capital Venture provides comprehensive valuation services to support capital market transactions, corporate restructuring, and regulatory compliance requirements. Our valuation framework is driven by rigorous financial analysis, sector benchmarking, and internationally accepted methodologies such as Discounted Cash Flow (DCF), Comparable Companies Multiple (CCM), and Precedent Transaction Analysis.",
        "We deliver independent valuation reports and fairness opinions in accordance with applicable SEBI regulations, the Companies Act, Income Tax provisions, and other statutory frameworks—ensuring transparency, defensibility, and regulatory robustness.",
      ],
      image: "/valueiii.png",
      checklist: [
        "DCF Valuation",
        "ESOP Valuation",
        "SEBI Valuation",
        "Ind AS Valuation",
        "Convertible Instrument Valuation",
        "Business Valuation Consultants",
        "RBI / FEMA Valuation",
        "Sweat Equity Valuation",
        "Merger Valuation & Swap Ratio Consultants",
        "Income Tax Valuation",
        "Intangible Asset Valuation",
        "Fairness Opinion Consultants",
      ],
    },
    ctaBanner: {
      title: "Trusted Valuations.",
      highlight: "Confident Decisions.",
      subtitle: "Accurate insights. Stronger strategies. Long-term value creation.",
      image: "/CTA.png",
    },
  },
  {
    slug: "aif-compliances",
    number: "05",
    icon: ShieldCheck,
    title: "AIF Compliances",
    // --- UNIQUE BANNER FOR THIS SERVICE ---
    banner: {
      tag: "Our Services",
      title: "AIF Compliances",
      subtitle: "Ensuring regulatory alignment and disclosure integrity for Alternative Investment Funds.",
      image: "/aif.png", // Change to your actual banner image path
    },
    heroSubtitle:
      "Ensuring regulatory alignment and disclosure integrity for Alternative Investment Funds.",
    description:
      "Ensuring complete regulatory compliance for Alternative Investment Funds (AIFs) with seamless advisory and reporting.",
    points: [
      "AIF Registration Support",
      "Compliance & Reporting",
      "SEBI Filing & Disclosures",
      "Periodic Compliance Management",
    ],
    hideIncludedList: true,
    highlights: {
      image: "/aifs.png",
      items: [
        {
          icon: Users,
          text: "Alternative Investment Funds (AIFs) are privately pooled investment vehicles that raise capital from Indian and foreign investors for deployment in accordance with a defined investment strategy under the SEBI (Alternative Investment Funds) Regulations.",
        },
        {
          icon: FileText,
          text: "Pursuant to SEBI requirements, the draft Placement Memorandum of an AIF or a new scheme is required to be filed through a SEBI Registered Merchant Banker. The Merchant Banker is mandated to independently conduct due diligence on the disclosures made in the Placement Memorandum, examine the adequacy, consistency, and regulatory compliance of such disclosures, and issue a Due Diligence Certificate in the prescribed format.",
        },
        {
          icon: ShieldCheck,
          text: "As a SEBI Registered Category I Merchant Banker, Vatsa Capital Venture undertakes an independent review of the AIF's structure, investment strategy, risk factors, governance framework, and statutory disclosures. Upon satisfactory examination, the prescribed due diligence report and certificate are issued and submitted at the time of filing the draft Placement Memorandum with SEBI or prior to the launch of a new scheme through the SEBI Intermediary Portal, ensuring regulatory alignment and disclosure integrity.",
        },
      ],
    },
    serviceGrid: {
      title: "Our AIF Compliance Services Include",
      items: [
        { icon: ClipboardList, label: "Review of AIF Structure and Investment Strategy" },
        { icon: FileSearch, label: "Examination of Placement Memorandum Disclosures" },
        { icon: ShieldAlert, label: "Assessment of Risk Factors and Mitigation Measures" },
        { icon: Users, label: "Review of Governance and Operational Framework" },
        { icon: Gavel, label: "Regulatory Compliance Evaluation" },
        { icon: FileCheck2, label: "Verification of Financial and Legal Disclosures" },
        { icon: Award, label: "Issuance of Due Diligence Certificate" },
        { icon: Landmark, label: "Filing Support via SEBI Intermediary Portal" },
      ],
    },
    ctaBanner: {
      title: "Partner with Confidence.",
      highlight: "Comply with Excellence.",
      subtitle:
        "Our expertise ensures your AIF complies with SEBI regulations and upholds the highest standards of transparency and integrity.",
      image: "/CTA.png",
    },
  },
];