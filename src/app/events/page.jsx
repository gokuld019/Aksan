"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/data/events";

export default function EventsGalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null); // null = closed
  const isOpen = activeIndex !== null;

  const openAt = (index) => setActiveIndex(index);
  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + events.length) % events.length));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % events.length));
  }, []);

  // Keyboard navigation: Esc to close, arrows to move
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, goPrev, goNext]);

  // Touch swipe support for mobile lightbox navigation
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    const SWIPE_THRESHOLD = 40;

    if (delta > SWIPE_THRESHOLD) {
      goPrev();
    } else if (delta < -SWIPE_THRESHOLD) {
      goNext();
    }
    setTouchStartX(null);
  };

  return (
    <main
      className="bg-white min-h-screen mt-16 sm:mt-20 md:mt-30 lg:mt-30 xl:mt-30"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-6xl px-4 xs:px-5 sm:px-6 md:px-6 lg:px-8 py-8 xs:py-9 sm:py-10 md:py-10 lg:py-14">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-[#132A5C] mb-6 sm:mb-8 md:mb-8 lg:mb-8 text-center">
          AKSAN Events
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 xs:gap-3.5 sm:gap-4 md:gap-5 lg:gap-5">
          {events.map((event, index) => (
            <button
              key={event.id}
              type="button"
              onClick={() => openAt(index)}
              className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4475]"
            >
              <div className="relative w-full" style={{ paddingBottom: "100%" }}>
                <Image
                  src={event.image}
                  alt="AKSAN Event"
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== Full-screen lightbox ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] px-2 xs:px-3 sm:px-4"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Event image viewer"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-6 sm:right-6 z-10 flex h-9 w-9 xs:h-10 xs:w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105"
          >
            <X size={18} className="sm:hidden" />
            <X size={20} className="hidden sm:block" />
          </button>

          {/* Counter */}
          <div className="absolute top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 z-10 rounded-full bg-white/10 px-3 py-1 xs:px-3.5 xs:py-1.5 text-[11px] xs:text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md">
            {activeIndex + 1} / {events.length}
          </div>

          {/* Prev arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-1 xs:left-2 sm:left-6 z-10 flex h-9 w-9 xs:h-10 xs:w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={20} className="sm:hidden" />
            <ChevronLeft size={26} className="hidden sm:block" />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] xs:w-[88vw] sm:w-[75vw] max-w-4xl h-[55vh] xs:h-[60vh] sm:h-[70vh] mx-12 xs:mx-14 sm:mx-24 animate-[scaleIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={events[activeIndex].id}
              src={events[activeIndex].image}
              alt="AKSAN Event"
              fill
              sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, 75vw"
              className="object-contain select-none"
              priority
            />
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-1 xs:right-2 sm:right-6 z-10 flex h-9 w-9 xs:h-10 xs:w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <ChevronRight size={20} className="sm:hidden" />
            <ChevronRight size={26} className="hidden sm:block" />
          </button>

          {/* Swipe hint (mobile only) */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] xs:text-[11px] text-white/50 sm:hidden">
            Swipe to navigate
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}
      </style>
    </main>
  );
}