"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AwardDetailClient({ award, prevAward, nextAward }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const gallery = award.gallery && award.gallery.length > 0 ? award.gallery : [award.image];

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, gallery.length]);

  return (
    <main className="min-h-screen bg-white pt-20" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Top gap */}
      <div className="h-8 sm:h-12 lg:h-16" />

      {/* Header card */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="rounded-2xl bg-[#0f4475]/[0.04] border border-[#0f4475]/10 px-6 sm:px-10 py-8 sm:py-10">
          <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F7931E] mb-3">
            Listing Ceremony
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#0f4475] leading-tight tracking-tight mb-4 max-w-2xl">
            {award.company}
          </h1>
          <p className="text-[#3A4A6B] text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
            {award.description}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-[#0f4475]/10">
            <div>
              <p className="text-[#0f4475]/50 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">Date</p>
              <p className="text-[#0f4475] text-sm font-medium">{award.date}</p>
            </div>
            <div>
              <p className="text-[#0f4475]/50 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">Advisor</p>
              <p className="text-[#0f4475] text-sm font-medium">AKSAN Capital Advisory</p>
            </div>
            <div>
              <p className="text-[#0f4475]/50 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">Photos</p>
              <p className="text-[#0f4475] text-sm font-medium">{gallery.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Uniform grid gallery */}
      <section className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14">
        <h2 className="text-[#0f4475] text-base sm:text-lg font-semibold mb-5 sm:mb-6 tracking-tight">
          Gallery
        </h2>
       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
  {gallery.map((img, i) => (
    <button
      key={i}
      type="button"
      onClick={() => setLightboxIndex(i)}
      className="group relative aspect-square rounded-xl overflow-hidden bg-[#0f4475]/5 border border-[#0f4475]/10 focus:outline-none focus:ring-2 focus:ring-[#F7931E]/60"
    >
      <Image
        src={img}
        alt={`${award.company} photo ${i + 1}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0f4475]/0 group-hover:bg-[#0f4475]/30 transition-colors duration-300" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </span>
    </button>
  ))}
</div> 
      </section>

      {/* Prev / Next */}
      <section className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-10 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link
            href={`/awards/${prevAward.slug}`}
            className="group flex items-center gap-3 rounded-xl bg-[#0f4475]/[0.04] border border-[#0f4475]/10 px-5 py-4 hover:bg-[#0f4475]/[0.08] hover:border-[#0f4475]/20 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f4475]/50 group-hover:text-[#F7931E] shrink-0 transition-colors">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <div className="min-w-0">
              <p className="text-[#0f4475]/50 text-[10px] uppercase tracking-widest font-semibold mb-0.5">Previous</p>
              <p className="text-[#0f4475] text-sm font-medium truncate">{prevAward.company}</p>
            </div>
          </Link>

          <Link
            href={`/awards/${nextAward.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl bg-[#0f4475]/[0.04] border border-[#0f4475]/10 px-5 py-4 hover:bg-[#0f4475]/[0.08] hover:border-[#0f4475]/20 transition-all text-right"
          >
            <div className="min-w-0">
              <p className="text-[#0f4475]/50 text-[10px] uppercase tracking-widest font-semibold mb-0.5">Next</p>
              <p className="text-[#0f4475] text-sm font-medium truncate">{nextAward.company}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f4475]/50 group-hover:text-[#F7931E] shrink-0 transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Lightbox (stays dark for image contrast) */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm px-4 py-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative flex items-center gap-3 sm:gap-6 w-full max-w-5xl">
            {gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + gallery.length) % gallery.length); }}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shrink-0"
                aria-label="Previous image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div
              className="relative flex-1 aspect-[4/3] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[lightboxIndex]}
                alt={`${award.company} photo ${lightboxIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain bg-black"
              />
            </div>

            {gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % gallery.length); }}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors shrink-0"
                aria-label="Next image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Filmstrip thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 mt-5 sm:mt-6 max-w-full overflow-x-auto px-2" onClick={(e) => e.stopPropagation()}>
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-[#F7931E] opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}