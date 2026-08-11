"use client";

import Image from "next/image";

/**
 * AwardsRecognition
 * -------------------------------------------------------------------------
 * Replicates the "Celebrated Equity and IPO Advisors — List of Awards and
 * Recognitions" grid: a 2-column (1-column on mobile) set of navy cards,
 * each with a listing-ceremony photo, an NSE badge, a garland/medallion
 * graphic, company name, ceremony date, and a "VIEW" pill button.
 *
 * Drop this file in e.g. src/components/AwardsRecognition.jsx and use:
 *   <AwardsRecognition />
 *
 * Replace the `awards` array below with your real data + image paths
 * (e.g. images placed in /public/awards/*.jpg).
 * -------------------------------------------------------------------------
 */

const awards = [
  {
    id: 1,
    company: "Phantom Digital Effects Limited",
    date: "Listing Ceremony: 21 October 2022",
    image: "/gallery/aksangallery1.webp",
  },
  {
    id: 2,
    company: "Krischa Strapping Solutions Limited",
    date: "Listing Ceremony: 26 May 2023",
    image: "/gallery/aksangallery2.webp",
  },
  {
    id: 3,
    company: "ROX-Hi Tech limited",
    date: "Listing Ceremony: 16 November 2023",
    image: "/gallery/aksangallery3.webp",
  },
  {
    id: 4,
    company: "Basilio Fly Studio Ltd",
    date: "Listing Ceremony: September 2023",
    image: "/gallery/aksangallery4.webp",
  },
  {
    id: 5,
    company: "Supreme Power Equipment Limited",
    date: "Listing Ceremony: 29 December 2023",
    image: "/gallery/aksangallery5.webp",
  },
  {
    id: 6,
    company: "Thaai Casting Limited",
    date: "Listing Ceremony: 23 February 2024",
    image: "/gallery/aksangallery6.webp",
  },
  {
    id: 7,
    company: "AVP Infracon Limited",
    date: "Listing Ceremony: 20 March 2024",
    image: "/gallery/aksangallery7.webp",
  },
  {
    id: 8,
    company: "ABS Marine Services Limited",
    date: "Listing Ceremony: 21 May 2024",
    image: "/gallery/aksangallery8.webp",
  },
  {
    id: 9,
    company: "Sathlokhar Synergys E&C Global Ltd",
    date: "Listing Ceremony: 06 August 2024",
    image: "/gallery/aksangallery9.webp",
  },
  {
    id: 10,
    company: "Afcom Holdings Ltd",
    date: "Listing Ceremony: 09 August 2024",
    image: "/gallery/aksangallery10.webp",
  },
  {
    id: 11,
    company: "Freshara Agro Exports Ltd",
    date: "Listing Ceremony: 24 October 2024",
    image: "/gallery/aksangallery11.webp",
  },
  {
    id: 12,
    company: "Emerald Tyre Manufacturers Ltd",
    date: "Listing Ceremony: 12 December 2024",
    image: "/gallery/aksangallery12.webp",
  },
];

export default function AwardsRecognition() {
  return (
    <section 
      className="bg-white py-12 sm:py-16 md:py-20" 
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
        {/* Heading */}
        <h2 
          className="text-center text-xl sm:text-2xl md:text-[28px] lg:text-3xl font-bold text-[#132A5C] mb-2 sm:mb-3" 
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          Celebrated Equity and IPO Advisors
        </h2>

        <p 
          className="text-center text-xs sm:text-sm font-semibold tracking-wide text-[#E8622C] mb-2 sm:mb-3" 
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          List of Awards and Recognitions
        </p>

        <p 
          className="mx-auto max-w-2xl px-4 text-center text-xs sm:text-sm text-[#3A4A6B] leading-relaxed mb-8 sm:mb-10 md:mb-12" 
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          AKSAN and Aradhya have been honored with the Industry Excellence
          Award for their outstanding performance and unwavering dedication
          to providing top-notch equity advisory services.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({ award }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-[#0E1F45] shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Photo Container */}
      <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
        <Image
          src={award.image}
          alt={award.company}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center"
          priority={false}
        />

        {/* NSE badge, top-left */}
        <div className="absolute left-3 top-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#F7931E] text-[8px] sm:text-[10px] font-bold text-white shadow-lg" 
             style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          NSE
        </div>

        {/* Dark gradient overlay for text readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0E1F45] via-[#0E1F45]/80 to-transparent" />
      </div>

      {/* Text block */}
      <div className="relative -mt-1 px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-2 sm:pt-3 text-center">
        <h3 
          className="text-sm sm:text-base md:text-lg font-semibold text-white leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]" 
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          {award.company}
        </h3>
        
        <p 
          className="mt-1 text-[10px] sm:text-xs text-white/70" 
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          {award.date}
        </p>

        <button
          type="button"
          className="mt-3 sm:mt-4 rounded-full border border-white/40 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium tracking-wide text-white transition-all duration-300 hover:bg-white hover:text-[#0E1F45] hover:border-white active:scale-95"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
          VIEW
        </button>
      </div>
    </div>
  );
}