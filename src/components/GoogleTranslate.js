"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";

export default function GoogleTranslate() {
  const initialized = useRef(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isClient || initialized.current) return;
    initialized.current = true;

    const addScript = () => {
      if (document.getElementById("google-translate-script")) {
        if (window.google && window.google.translate) {
          initWidget();
        } else {
          pollForGoogleTranslate();
        }
        return;
      }
      window.googleTranslateElementInit = initWidget;
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    const pollForGoogleTranslate = () => {
      let attempts = 0;
      const check = setInterval(() => {
        attempts++;
        if (window.google && window.google.translate) {
          clearInterval(check);
          initWidget();
        } else if (attempts > 40) {
          clearInterval(check);
        }
      }, 200);
    };

    const restoreSavedLanguage = () => {
      const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
      if (match && match[1]) {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = match[1];
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    };

    const initWidget = () => {
      const container = document.getElementById("google_translate_element");
      if (!container || container.childElementCount > 0) {
        return;
      }

      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ta,hi",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        setTimeout(restoreSavedLanguage, 500);
      } catch (error) {
        console.error("Failed to initialize Google Translate:", error);
      }
    };

    setTimeout(addScript, 200);
  }, [isClient]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    window.dispatchEvent(new CustomEvent("closeSpeakWidget"));

    const possibleSelectors = [
      "#speak-widget",
      ".speak-widget",
      "[data-widget='speak']",
    ];
    possibleSelectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.setProperty("display", "none", "important");
      });
    });

    const fixMenuFrame = () => {
      const frame = document.querySelector(".goog-te-menu-frame");
      if (frame) {
        frame.style.setProperty("visibility", "visible", "important");
        frame.style.setProperty("display", "block", "important");
        frame.style.setProperty("position", "fixed", "important");
        frame.style.setProperty("top", "auto", "important");
        frame.style.setProperty("bottom", "80px", "important");
        frame.style.setProperty("left", "16px", "important");
        frame.style.setProperty("right", "16px", "important");
        frame.style.setProperty("width", "calc(100vw - 32px)", "important");
        frame.style.setProperty("max-width", "320px", "important");
        frame.style.setProperty("z-index", "2147483647", "important");
      }
    };

    fixMenuFrame();
    const interval = setInterval(fixMenuFrame, 150);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open]);

  const positionStyle = isMobile
    ? {
        position: "fixed",
        bottom: "148px",
        left: "16px",
        zIndex: 999998,
      }
    : {
        position: "fixed",
        bottom: "28px",
        left: "80px",
        zIndex: 999999,
      };

  return (
    <div
      ref={wrapperRef}
      style={isClient ? positionStyle : { display: "none" }}
      suppressHydrationWarning
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
          window.dispatchEvent(new CustomEvent("closeSpeakWidget"));
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#0B1B3A",
          color: "#fff",
          border: "none",
          borderRadius: "9999px",
          padding: isMobile ? "8px 14px" : "10px 16px",
          fontSize: isMobile ? "13px" : "14px",
          fontWeight: 500,
          fontFamily: "'Noto Sans', sans-serif",
          boxShadow: "0 4px 14px rgba(11, 27, 58, 0.35)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#152249";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#0B1B3A";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <Languages size={16} color="#F2622E" />
        Translate
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: 0,
          maxHeight: open ? "300px" : "0px",
          maxWidth: "min(220px, calc(100vw - 40px))",
          opacity: open ? 1 : 0,
          overflow: open ? "visible" : "hidden",
          transition: "all 0.25s ease",
          background: "#fff",
          borderRadius: "14px",
          boxShadow: open ? "0 10px 30px rgba(11, 27, 58, 0.18)" : "none",
          padding: open ? "10px" : "0px",
          minWidth: "170px",
          border: open ? "1px solid #e2e8f0" : "none",
          zIndex: 999999,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div id="google_translate_element" style={{ position: "relative", zIndex: 999999 }} />
      </div>
    </div>
  );
}