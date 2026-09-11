"use client";

import Image from "next/image";
import Link from "next/link";
import { events } from "@/data/events";

/**
 * /events
 * -------------------------------------------------------------------------
 * "AKSAN Events" gallery page — reuses the exact layout of the award
 * detail page (app/awards/[slug]/page.js): a light info card with
 * eyebrow label, title, description, and a DATE / ADVISOR / PHOTOS meta
 * row, followed by a "Gallery" heading and a 3-column photo grid, then a
 * Previous / Next footer nav.
 * -------------------------------------------------------------------------
 */

export default function EventsGalleryPage() {
  return (
    <main className="bg-white min-h-screen" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ===== Info card ===== */}
        <div className="rounded-2xl bg-slate-100/80 border border-slate-200 p-6 sm:p-8 md:p-10">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#E8622C] mb-3">
            Listing Ceremony
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-tight text-[#132A5C] mb-4 max-w-2xl">
            AKSAN Events
          </h1>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#3A4A6B] max-w-2xl mb-6">
            A look back at the listing ceremonies and milestone moments AKSAN
            Capital Advisory has been proud to be part of — captured across
            every IPO we have advised.
          </p>

          <div className="border-t border-slate-300/70 pt-5 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Date
              </p>
              <p className="text-sm font-semibold text-[#132A5C]">All Ceremonies</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Advisor
              </p>
              <p className="text-sm font-semibold text-[#132A5C]">AKSAN Capital Advisory</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Photos
              </p>
              <p className="text-sm font-semibold text-[#132A5C]">{events.length}</p>
            </div>
          </div>
        </div>

        {/* ===== Gallery ===== */}
        <h2 className="mt-10 sm:mt-12 mb-5 sm:mb-6 text-base sm:text-lg font-bold text-[#132A5C]">
          Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <div className="relative w-full" style={{ paddingBottom: "100%" }}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain sm:object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ===== Previous / Next nav ===== */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/awards"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-100 transition-colors"
          >
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Previous
              </p>
              <p className="text-sm sm:text-[15px] font-semibold text-[#132A5C]">
                Awards &amp; Recognitions
              </p>
            </div>
            <span className="text-slate-400">‹</span>
          </Link>

          <Link
            href="/#awards"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 sm:px-6 py-4 sm:py-5 hover:bg-slate-100 transition-colors sm:text-right"
          >
            <div className="sm:ml-auto">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Next
              </p>
              <p className="text-sm sm:text-[15px] font-semibold text-[#132A5C]">
                Celebrated Equity and IPO Advisors
              </p>
            </div>
            <span className="text-slate-400 sm:order-first">›</span>
          </Link>
        </div>
      </div>
    </main>
  );
}