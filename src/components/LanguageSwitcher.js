"use client";

import { useState, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिन्दी" },
];

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setGoogTransCookie(langCode) {
  const value = langCode === "en" ? "" : `/en/${langCode}`;
  const domain = window.location.hostname;
  if (value) {
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=${domain}`;
  } else {
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  }
}

function triggerGoogleTranslate(langCode) {
  setGoogTransCookie(langCode);

  const applySelect = () => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    return false;
  };

  if (!applySelect()) {
    let attempts = 0;
    const retry = setInterval(() => {
      attempts++;
      if (applySelect() || attempts > 15) clearInterval(retry);
    }, 200);
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = getCookie("googtrans");
    if (saved) {
      const parts = saved.split("/").filter(Boolean);
      const lang = parts[1];
      if (lang && languageOptions.some((l) => l.code === lang)) {
        setCurrent(lang);
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Google Translate mutates the DOM in ways that can desync
    // React's virtual DOM from the real DOM, which makes Next.js
    // client-side <Link> navigation silently do nothing while a
    // non-English language is active. Force a real browser
    // navigation for in-app link clicks in that case, which
    // sidesteps the corrupted tree entirely.
    const handleClick = (e) => {
      if (current === "en") return;

      const anchor = e.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      window.location.assign(href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isClient, current]);

  const handleSelect = (code) => {
    setCurrent(code);
    setOpen(false);
    triggerGoogleTranslate(code);
  };

  const label = languageOptions.find((l) => l.code === current)?.label;

  // IMPORTANT: always render the wrapper (never `return null`).
  // Unmounting conditionally on `isClient` shifts hydration
  // boundaries for sibling components using <style jsx> elsewhere
  // on the page, causing unrelated hydration mismatches. We hide it
  // visually instead until the client is ready.
  return (
    <div
      className="relative notranslate"
      style={!isClient ? { visibility: "hidden" } : undefined}
      suppressHydrationWarning
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-orange-600 transition px-2 py-1.5 rounded-md"
      >
        <Globe size={16} />
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-20 overflow-hidden">
            {languageOptions.map((opt) => (
              <button
                key={opt.code}
                onClick={() => handleSelect(opt.code)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition ${
                  opt.code === current ? "text-orange-600 font-semibold bg-orange-50/50" : "text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}