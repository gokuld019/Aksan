"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Volume2,
  Pause,
  Play,
  Square,
  X,
  Send,
  RotateCcw,
  Building2,
  TrendingUp,
  Rocket,
  Calculator,
  SearchCheck,
  Handshake,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  AudioLines,
  Type,
  Check,
} from "lucide-react";
import {
  Inter,
  Plus_Jakarta_Sans,
  Manrope,
  Sora,
  Outfit,
  Space_Grotesk,
  DM_Sans,
  Lexend,
} from "next/font/google";

/* ============================================================
  SITE FONT OPTIONS
  Each is preloaded statically (next/font/google requirement),
  exposed as a CSS variable, and swapped in via a class on
  #page-content. Add/remove entries here to change the shortlist.
  ============================================================ */
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sora" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-dm-sans" });
const lexend = Lexend({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-lexend" });

// Whitney font as default
const WHITNEY_FONT = '"Whitney", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';

const FONT_OPTIONS = [
  { id: "default", label: "Default (Whitney)", className: "", cssVar: WHITNEY_FONT, preview: "Aa" },
  { id: "inter", label: "Inter", className: inter.variable, cssVar: "var(--font-inter)", preview: "Aa" },
  { id: "jakarta", label: "Plus Jakarta Sans", className: jakarta.variable, cssVar: "var(--font-jakarta)", preview: "Aa" },
  { id: "manrope", label: "Manrope", className: manrope.variable, cssVar: "var(--font-manrope)", preview: "Aa" },
  { id: "sora", label: "Sora", className: sora.variable, cssVar: "var(--font-sora)", preview: "Aa" },
  { id: "outfit", label: "Outfit", className: outfit.variable, cssVar: "var(--font-outfit)", preview: "Aa" },
  { id: "spaceGrotesk", label: "Space Grotesk", className: spaceGrotesk.variable, cssVar: "var(--font-space-grotesk)", preview: "Aa" },
  { id: "dmSans", label: "DM Sans", className: dmSans.variable, cssVar: "var(--font-dm-sans)", preview: "Aa" },
  { id: "lexend", label: "Lexend", className: lexend.variable, cssVar: "var(--font-lexend)", preview: "Aa" },
];

const FONT_VARIABLE_CLASSES = FONT_OPTIONS.map((f) => f.className).filter(Boolean).join(" ");
const SITE_FONT_STORAGE_KEY = "aksan-site-font";

const REPLY_META = {
  "About Aksan": { icon: Building2, tint: "from-sky-500 to-sky-600" },
  Fundraising: { icon: TrendingUp, tint: "from-emerald-500 to-emerald-600" },
  "ipo": { icon: Rocket, tint: "from-violet-500 to-violet-600" },
  Valuation: { icon: Calculator, tint: "from-amber-500 to-amber-600" },
  "Due Diligence": { icon: SearchCheck, tint: "from-cyan-500 to-cyan-600" },
  "M&A & Compliance": { icon: Handshake, tint: "from-rose-500 to-rose-600" },
  "Grievance / Complaint": { icon: AlertTriangle, tint: "from-orange-500 to-orange-600" },
  "Our services": { icon: ArrowLeft, tint: "from-slate-500 to-slate-600" },
};

const FONT_PX_STEPS = { "-2": -2, "-1": -1, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
const LINE_HEIGHTS = { "-2": 1.15, "-1": 1.3, 0: 1.5, 1: 1.65, 2: 1.8, 3: 1.95, 4: 2.1 };

function typingDelayFor(flow) {
  const chars = (flow.text || []).reduce((n, l) => n + (l.text?.length || 0), 0);
  return Math.min(1400, Math.max(550, chars * 12));
}

/* ============================================================
  GLOBAL SPEECH ENGINE
  A single shared controller so "speak page", "speak selection",
  and "speak this message" all drive the same Pause/Play/Stop bar.
  ============================================================ */
function useSpeechEngine() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSourceId, setActiveSourceId] = useState(null); // "page" | "selection" | message id | null
  const utterRef = useRef(null);

  const speak = useCallback((text, sourceId) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSourceId(null);
    };
    utter.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSourceId(null);
    };
    utterRef.current = utter;

    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
    setIsPaused(false);
    setActiveSourceId(sourceId);
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveSourceId(null);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isSpeaking, isPaused, activeSourceId, speak, pause, resume, stop };
}

export default function VoiceWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [voiceBarVisible, setVoiceBarVisible] = useState(true);

  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [readableFont, setReadableFont] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(false);
  const [lightContrast, setLightContrast] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [monochrome, setMonochrome] = useState(false);
  const [siteFont, setSiteFont] = useState("default");

  const [targetMissing, setTargetMissing] = useState(false);

  const speech = useSpeechEngine();

  const getTarget = useCallback(() => {
    const el = document.getElementById("page-content");
    if (!el && !targetMissing) {
      console.warn(
        '[VoiceWidget] No element with id="page-content" found. Wrap your ' +
          'page content in <div id="page-content">...</div> in your root ' +
          "layout so accessibility settings have something to target."
      );
      setTargetMissing(true);
    }
    return el;
  }, [targetMissing]);

  // Restore saved font choice on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SITE_FONT_STORAGE_KEY);
      if (saved && FONT_OPTIONS.some((f) => f.id === saved)) {
        setSiteFont(saved);
      }
    } catch {
      // localStorage unavailable — ignore, default stands
    }
  }, []);

  // Apply accessibility settings
  useEffect(() => {
    const target = getTarget();
    if (!target) return;

    document.documentElement.style.setProperty(
      "--a11y-font-scale",
      `${FONT_PX_STEPS[fontSize]}px`
    );
    document.documentElement.style.setProperty("--a11y-line-height", LINE_HEIGHTS[lineHeight]);
    document.documentElement.style.setProperty("--a11y-letter-spacing", letterSpacing ? "0.06em" : "normal");

    target.classList.toggle("a11y-font-scaled", fontSize !== 0);
    target.classList.toggle("a11y-line-height", lineHeight !== 0);
    target.classList.toggle("a11y-letter-spacing", letterSpacing);
    target.classList.toggle("a11y-readable", readableFont);
    target.classList.toggle("a11y-light", lightContrast);
    target.classList.toggle("a11y-high", highContrast);
    target.classList.toggle("a11y-mono", monochrome);
  }, [fontSize, lineHeight, readableFont, letterSpacing, lightContrast, highContrast, monochrome, getTarget]);

  // Apply chosen site font - UPDATED with proper font application
  useEffect(() => {
    const target = getTarget();
    if (!target) return;

    const option = FONT_OPTIONS.find((f) => f.id === siteFont) || FONT_OPTIONS[0];

    // Remove ALL previous font classes from html element
    document.documentElement.classList.remove(
      ...FONT_VARIABLE_CLASSES.split(" ").filter(Boolean)
    );
    
    // Remove site font class from target
    target.classList.remove("a11y-site-font");
    
    // Reset font properties
    document.documentElement.style.removeProperty("--site-font");
    target.style.fontFamily = "";
    
    // Apply the selected font
    if (option.className) {
      document.documentElement.classList.add(option.className);
    }
    
    if (option.cssVar) {
      // Set CSS variable
      document.documentElement.style.setProperty("--site-font", option.cssVar);
      target.classList.add("a11y-site-font");
      
      // Apply directly to target for immediate effect
      if (option.id === "default") {
        target.style.fontFamily = WHITNEY_FONT;
      } else {
        target.style.fontFamily = option.cssVar;
      }
    } else {
      // If no CSS var, use the font family directly
      if (option.id === "default") {
        target.style.fontFamily = WHITNEY_FONT;
      }
    }

    // Save preference
    try {
      window.localStorage.setItem(SITE_FONT_STORAGE_KEY, siteFont);
    } catch {
      // ignore
    }
  }, [siteFont, getTarget]);

  // "Speak" button -> speaks selected text if any, otherwise reads the whole page
  const handleSpeakPage = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && selectedText.length > 0) {
      speech.speak(selectedText, "selection");
      return;
    }

    const page = getTarget() || document.body;
    const text = page.innerText.slice(0, 1600);
    speech.speak(text, "page");
  };

  const handlePause = () => speech.pause();
  const handlePlayResume = () => {
    if (speech.isPaused) {
      speech.resume();
    } else if (!speech.isSpeaking) {
      handleSpeakPage();
    }
  };
  const handleStop = () => speech.stop();

  const handleDismissVoiceBar = () => {
    speech.stop();
    setVoiceBarVisible(false);
  };

  const handleResetA11y = () => {
    setFontSize(0);
    setLineHeight(0);
    setReadableFont(false);
    setLetterSpacing(false);
    setLightContrast(false);
    setHighContrast(false);
    setMonochrome(false);
    setSiteFont("default");
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <style jsx global>{`
        :root {
          --a11y-line-height: 1.5;
          --a11y-letter-spacing: normal;
          --a11y-font-scale: 0px;
          --site-font: ${WHITNEY_FONT};
        }

        /* Ensure the page content uses the font */
        #page-content {
          font-family: var(--site-font, ${WHITNEY_FONT}) !important;
          transition: all 0.3s ease;
        }

        /* Ensure all children inherit the font */
        #page-content * {
          font-family: inherit !important;
        }

        /* When custom font is applied */
        #page-content.a11y-site-font {
          font-family: var(--site-font, ${WHITNEY_FONT}) !important;
        }
        
        #page-content.a11y-site-font * {
          font-family: inherit !important;
        }

        #page-content.a11y-font-scaled,
        #page-content.a11y-font-scaled * {
          font-size: calc(1em + var(--a11y-font-scale)) !important;
        }
        #page-content.a11y-line-height,
        #page-content.a11y-line-height * {
          line-height: var(--a11y-line-height) !important;
        }
        #page-content.a11y-letter-spacing,
        #page-content.a11y-letter-spacing * {
          letter-spacing: var(--a11y-letter-spacing) !important;
        }
        #page-content.a11y-readable,
        #page-content.a11y-readable * {
          font-family: "Atkinson Hyperlegible", Verdana, Arial, sans-serif !important;
        }
      
        #page-content.a11y-light {
          filter: brightness(1.12) contrast(0.95);
        }
        #page-content.a11y-high {
          filter: brightness(0.82) contrast(1.15);
        }
        #page-content.a11y-mono {
          filter: grayscale(1) !important;
        }
        #page-content.a11y-mono img {
          filter: grayscale(1) !important;
        }

        @keyframes a11yPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ---- Chat widget motion & typing indicator ---- */
        @keyframes chatBubbleIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes panelReveal {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes barIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes speakBars {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        .chat-msg-in {
          animation: chatBubbleIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .typing-dot {
          animation: typingDot 1.1s ease-in-out infinite;
        }
        .chat-panel-in {
          animation: panelReveal 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .voice-bar-in {
          animation: barIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .speak-bar {
          animation: speakBars 0.9s ease-in-out infinite;
        }
        .chat-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 58, 102, 0.15);
          border-radius: 999px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 58, 102, 0.28);
        }
        .speakable-msg {
          cursor: pointer;
        }
      `}</style>

      {/* Bottom-left accessibility icon */}
      <button
        onClick={() => setAccessibilityOpen((v) => !v)}
        className="group fixed bottom-6 left-6 flex items-center justify-center w-[50px] h-[50px] rounded-[14px] hover:rounded-full bg-[linear-gradient(150deg,var(--primary-blue),var(--navy-950))] shadow-lg hover:shadow-[0_8px_30px_rgba(10,42,77,0.5)] hover:scale-105 transition-all duration-300 ease-in-out voice-widget"
        aria-label="Accessibility options"
        aria-expanded={accessibilityOpen}
        style={{ display: toolbarVisible ? "flex" : "none", zIndex: 2147483000 }}
      >
        <svg
          className="w-[22px] h-[22px] text-white transition-transform duration-300 ease-in-out group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.5" r="1.7" fill="currentColor" stroke="none" />
          <path d="M4.5 8.2c2.4.95 5 1.4 7.5 1.4s5.1-.45 7.5-1.4M12 9.6v4.1M12 13.7l-3.4 6.6M12 13.7l3.4 6.6M8.8 13.2L6 16M15.2 13.2L18 16" />
        </svg>
      </button>

      {accessibilityOpen && (
        <AccessibilityPanel
          onClose={() => setAccessibilityOpen(false)}
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          readableFont={readableFont}
          setReadableFont={setReadableFont}
          letterSpacing={letterSpacing}
          setLetterSpacing={setLetterSpacing}
          lightContrast={lightContrast}
          setLightContrast={setLightContrast}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          monochrome={monochrome}
          setMonochrome={setMonochrome}
          siteFont={siteFont}
          setSiteFont={setSiteFont}
          toolbarVisible={toolbarVisible}
          setToolbarVisible={setToolbarVisible}
          onReset={handleResetA11y}
        />
      )}

      {/* Chatbot launcher + voice bar — single stack, bottom-right.
          Voice bar sits directly ABOVE the chatbot launcher, and both
          move together (no clumsy independent jumping) when chat opens. */}
      <div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-2.5 sm:gap-3 voice-widget"
        style={{ display: toolbarVisible && !chatOpen ? "flex" : chatOpen ? "none" : "flex", zIndex: 2147483000 }}
      >
        {voiceBarVisible && (
          <VoiceControlBar
            compact={chatOpen}
            isSpeaking={speech.isSpeaking}
            isPaused={speech.isPaused}
            activeSourceId={speech.activeSourceId}
            onSpeak={handleSpeakPage}
            onPause={handlePause}
            onPlay={handlePlayResume}
            onStop={handleStop}
            onDismiss={handleDismissVoiceBar}
          />
        )}

        {/* Chatbot launcher + callout */}
        <div className="flex items-center gap-2">
          {showCallout && !chatOpen && (
            <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_-8px_rgba(15,58,102,0.35)] ring-1 ring-black/5 pl-4 pr-3 py-3">
              <span className="text-slate-800 text-sm font-semibold whitespace-nowrap">
                Grow your wealth — ask AKSAN AI
              </span>
              <div className="w-px h-4 bg-slate-200 shrink-0" />
              <button
                onClick={() => setShowCallout(false)}
                className="flex items-center justify-center text-slate-400 hover:text-slate-600 transition shrink-0"
                aria-label="Dismiss"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setChatOpen(true);
              setShowCallout(false);
            }}
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[linear-gradient(145deg,#12457a,#0a2a4d)] shadow-[0_10px_30px_-8px_rgba(10,42,77,0.6)] hover:scale-105 active:scale-95 transition overflow-hidden p-0 shrink-0 ring-1 ring-white/10"
            aria-label="Open chatbot"
          >
            <span
              className="absolute inset-0 rounded-full ring-2 ring-orange-400/40"
              style={{ animation: "pulseGlow 2.4s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <Image
              src="/chatbot.webp"
              alt="Chat with Aksan AI"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {chatOpen && (
        <ChatPanel
          onClose={() => setChatOpen(false)}
          speech={speech}
        />
      )}
    </>,
    document.body
  );
}

/* ============================================================
  VOICE CONTROL BAR — modern floating pill with Cancel button
  Collapses to icon-only ("compact") once chat is open, so it
  stays slim and docked neatly above the chat launcher/panel.
  ============================================================ */
function VoiceControlBar({ compact, isSpeaking, isPaused, activeSourceId, onSpeak, onPause, onPlay, onStop, onDismiss }) {
  const active = isSpeaking || isPaused;
  const readingPage =
    activeSourceId === "page" || activeSourceId === "selection" || activeSourceId === "chat-all";

  return (
    <div
      className={`voice-bar-in flex items-center gap-1 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_10px_34px_-10px_rgba(15,58,102,0.45)] ring-1 ring-slate-200/70 transition-all duration-300 ${
        compact ? "px-1.5 py-1.5" : "px-2 py-2"
      }`}
    >
      {!compact && (
        <button
          onClick={onSpeak}
          className={`flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold px-3 sm:px-3.5 py-2 rounded-full transition-all active:scale-95 ${
            readingPage && active
              ? "bg-[#0f3a66] text-white shadow-inner"
              : "bg-slate-100 text-[#0f3a66] hover:bg-slate-200"
          }`}
          title="Read page (or selected text)"
        >
          {readingPage && active ? (
            <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
              <span className="w-[2.5px] bg-orange-400 rounded-full speak-bar" style={{ animationDelay: "0ms" }} />
              <span className="w-[2.5px] bg-orange-400 rounded-full speak-bar" style={{ animationDelay: "150ms" }} />
              <span className="w-[2.5px] bg-orange-400 rounded-full speak-bar" style={{ animationDelay: "300ms" }} />
            </span>
          ) : (
            <Volume2 size={14} strokeWidth={2.25} className="text-orange-500" />
          )}
          Speak
        </button>
      )}

      <div className={`flex items-center gap-1 ${!compact ? "border-l border-slate-200 pl-1.5 ml-0.5" : ""}`}>
        {compact && (
          <button
            onClick={onSpeak}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition active:scale-95 ${
              readingPage && active ? "bg-[#0f3a66] text-white" : "bg-slate-100 text-[#0f3a66] hover:bg-slate-200"
            }`}
            aria-label="Read page"
            title="Read page (or selected text)"
          >
            <Volume2 size={13} strokeWidth={2.25} className={readingPage && active ? "text-orange-300" : "text-orange-500"} />
          </button>
        )}

        <button
          onClick={onPause}
          disabled={!isSpeaking || isPaused}
          className={`flex items-center justify-center rounded-full transition active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed ${
            compact ? "w-8 h-8" : "w-8 h-8 sm:w-9 sm:h-9"
          } ${
            isPaused ? "bg-orange-500 text-white" : "bg-slate-100 text-[#0f3a66] hover:bg-slate-200"
          }`}
          aria-label="Pause"
          title="Pause"
        >
          <Pause size={13} strokeWidth={2.4} fill="currentColor" />
        </button>

        <button
          onClick={onPlay}
          disabled={isSpeaking && !isPaused}
          className={`flex items-center justify-center rounded-full transition active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed ${
            compact ? "w-8 h-8" : "w-8 h-8 sm:w-9 sm:h-9"
          } ${
            isSpeaking && !isPaused ? "bg-orange-500 text-white" : "bg-slate-100 text-[#0f3a66] hover:bg-slate-200"
          }`}
          aria-label="Play"
          title={isPaused ? "Resume" : "Play"}
        >
          <Play size={13} strokeWidth={2.4} fill="currentColor" />
        </button>

        <button
          onClick={onStop}
          disabled={!active}
          className={`flex items-center justify-center rounded-full bg-slate-100 text-[#0f3a66] hover:bg-slate-200 transition active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed ${
            compact ? "w-8 h-8" : "w-8 h-8 sm:w-9 sm:h-9"
          }`}
          aria-label="Stop"
          title="Stop"
        >
          <Square size={11} strokeWidth={2.4} fill="currentColor" />
        </button>

        <button
          onClick={onDismiss}
          className={`flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition active:scale-95 ${
            compact ? "w-8 h-8" : "w-8 h-8 sm:w-9 sm:h-9"
          }`}
          aria-label="Close voice controls"
          title="Close voice controls"
        >
          <X size={13} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
  BOT FLOW — unchanged from client-approved FAQ content
  ============================================================ */
const TOPICS = [
  "About Aksan",
  "Fundraising",
  "ipo",
  "Valuation",
  "Due Diligence",
  "M&A & Compliance",
  "Grievance / Complaint",
];

const BOT_FLOWS = {
  "Our services": {
    text: [
      { bold: true, text: "Here's what I can help you with:" },
      { text: "Pick a topic below, or ask me anything about Aksan Capital Advisory." },
    ],
    replies: TOPICS,
  },
  default: {
    text: [
      { bold: true, text: "Here's what I can help you with:" },
      { text: "Pick a topic below, or ask me anything about Aksan Capital Advisory." },
    ],
    replies: TOPICS,
  },

  "About Aksan": {
    text: [{ text: "Select a question:" }],
    replies: [
      "What is Aksan Capital Advisory?",
      "What industries do you serve?",
      "Why should I choose Aksan?",
      "Where are you located?",
      "How can I contact your team?",
      "Our services",
    ],
  },
  "What is Aksan Capital Advisory?": {
    text: [
      {
        text: "Aksan Capital Advisory is a Category II Merchant Banker offering capital markets, corporate advisory, valuation, due diligence and transaction support. For more information, write to us at info@aksan.in.",
      },
    ],
    replies: ["About Aksan", "Our services"],
  },
  "What industries do you serve?": {
    text: [
      {
        text: "We serve businesses across multiple industries. To discuss your sector-specific requirements, write to info@aksan.in.",
      },
    ],
    replies: ["About Aksan", "Our services"],
  },
  "Why should I choose Aksan?": {
    text: [
      { text: "We provide tailored advisory, regulatory expertise and end-to-end transaction support. Contact us at info@aksan.in." },
    ],
    replies: ["About Aksan", "Our services"],
  },
  "Where are you located?": {
    text: [{ text: "Please visit our Contact Us page or email info@aksan.in." }],
    replies: ["About Aksan", "Our services"],
  },
  "How can I contact your team?": {
    text: [{ text: "Please write to info@aksan.in and our team will assist you." }],
    replies: ["About Aksan", "Our services"],
  },

  Fundraising: {
    text: [{ text: "Select a question:" }],
    replies: [
      "Can you help us raise funds?",
      "What types of funding do you assist with?",
      "What documents are required?",
      "How long does fundraising take?",
      "Do you work with startups?",
      "Our services",
    ],
  },
  "Can you help us raise funds?": {
    text: [
      { text: "Yes. We assist with equity, debt and structured finance. Email info@aksan.in to discuss your requirements." },
    ],
    replies: ["Fundraising", "Our services"],
  },
  "What types of funding do you assist with?": {
    text: [{ text: "We assist with equity, debt and strategic investments. Contact info@aksan.in." }],
    replies: ["Fundraising", "Our services"],
  },
  "What documents are required?": {
    text: [{ text: "Business profile, audited financials and other documents may be required. Email info@aksan.in for the checklist." }],
    replies: ["Fundraising", "Our services"],
  },
  "How long does fundraising take?": {
    text: [{ text: "Timelines vary. Please contact info@aksan.in for an assessment." }],
    replies: ["Fundraising", "Our services"],
  },
  "Do you work with startups?": {
    text: [{ text: "Yes, subject to eligibility. Write to info@aksan.in." }],
    replies: ["Fundraising", "Our services"],
  },

  "ipo": {
    text: [{ text: "Select a question:" }],
    replies: [
      "Can you help with an IPO?",
      "What is an SME IPO?",
      "How do I know if my company is IPO ready?",
      "How long does an IPO take?",
      "Can you assist after listing?",
      "Our services",
    ],
  },
  "Can you help with an IPO?": {
    text: [{ text: "Yes. Contact info@aksan.in to schedule an IPO readiness discussion." }],
    replies: ["ipo", "Our services"],
  },
  "What is an SME IPO?": {
    text: [{ text: "It enables eligible SMEs to raise capital through SME exchanges. For guidance, email info@aksan.in." }],
    replies: ["ipo", "Our services"],
  },
  "How do I know if my company is IPO ready?": {
    text: [{ text: "We conduct an IPO readiness assessment. Contact info@aksan.in." }],
    replies: ["ipo", "Our services"],
  },
  "How long does an IPO take?": {
    text: [{ text: "It depends on readiness and approvals. Email info@aksan.in." }],
    replies: ["ipo", "Our services"],
  },
  "Can you assist after listing?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["ipo", "Our services"],
  },

  Valuation: {
    text: [{ text: "Select a question:" }],
    replies: [
      "Why do I need a valuation?",
      "What valuation methods do you use?",
      "How long does a valuation take?",
      "What information is required?",
      "Will I receive a report?",
      "Our services",
    ],
  },
  "Why do I need a valuation?": {
    text: [{ text: "Valuation supports fundraising, M&A and compliance. Contact info@aksan.in." }],
    replies: ["Valuation", "Our services"],
  },
  "What valuation methods do you use?": {
    text: [{ text: "Methods depend on the purpose and company profile. Email info@aksan.in." }],
    replies: ["Valuation", "Our services"],
  },
  "How long does a valuation take?": {
    text: [{ text: "It varies by engagement. Contact info@aksan.in." }],
    replies: ["Valuation", "Our services"],
  },
  "What information is required?": {
    text: [{ text: "Financials, projections and business details. Email info@aksan.in." }],
    replies: ["Valuation", "Our services"],
  },
  "Will I receive a report?": {
    text: [{ text: "Yes, where applicable. Contact info@aksan.in." }],
    replies: ["Valuation", "Our services"],
  },

  "Due Diligence": {
    text: [{ text: "Select a question:" }],
    replies: [
      "What is due diligence?",
      "Who requires due diligence?",
      "Can you perform vendor due diligence?",
      "What documents are reviewed?",
      "Is information kept confidential?",
      "Our services",
    ],
  },
  "What is due diligence?": {
    text: [{ text: "It is a detailed review before a transaction. Contact info@aksan.in." }],
    replies: ["Due Diligence", "Our services"],
  },
  "Who requires due diligence?": {
    text: [{ text: "Investors, lenders and companies. Email info@aksan.in." }],
    replies: ["Due Diligence", "Our services"],
  },
  "Can you perform vendor due diligence?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["Due Diligence", "Our services"],
  },
  "What documents are reviewed?": {
    text: [{ text: "Corporate, financial, legal and operational records. Email info@aksan.in." }],
    replies: ["Due Diligence", "Our services"],
  },
  "Is information kept confidential?": {
    text: [{ text: "Yes. We maintain confidentiality. For concerns write to ig@aksan.in." }],
    replies: ["Due Diligence", "Our services"],
  },

  "M&A & Compliance": {
    text: [{ text: "Select a question:" }],
    replies: [
      "Do you advise on mergers and acquisitions?",
      "Can you assist in restructuring?",
      "Do you help with business planning?",
      "Do you assist with SEBI compliance?",
      "How do I book a consultation?",
      "Our services",
    ],
  },
  "Do you advise on mergers and acquisitions?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["M&A & Compliance", "Our services"],
  },
  "Can you assist in restructuring?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["M&A & Compliance", "Our services"],
  },
  "Do you help with business planning?": {
    text: [{ text: "Yes. Email info@aksan.in." }],
    replies: ["M&A & Compliance", "Our services"],
  },
  "Do you assist with SEBI compliance?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["M&A & Compliance", "Our services"],
  },
  "How do I book a consultation?": {
    text: [{ text: "Please email info@aksan.in to schedule a meeting." }],
    replies: ["M&A & Compliance", "Our services"],
  },

  "Grievance / Complaint": {
    text: [{ text: "Select a question:" }],
    replies: [
      "I have a complaint or investor grievance.",
      "I am not satisfied with the services.",
      "Our services",
    ],
  },
  "I have a complaint or investor grievance.": {
    text: [
      { text: "Please write to ig@aksan.in with complete details. We are committed to resolving concerns promptly and fairly." },
    ],
    replies: ["Grievance / Complaint", "Our services"],
  },
  "I am not satisfied with the services.": {
    text: [{ text: "We regret the inconvenience. Please escalate your concern to ig@aksan.in." }],
    replies: ["Grievance / Complaint", "Our services"],
  },
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/* ============================================================
  ACCESSIBILITY PANEL — includes Site Font picker
  ============================================================ */
function AccessibilityPanel({
  onClose,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  readableFont,
  setReadableFont,
  letterSpacing,
  setLetterSpacing,
  lightContrast,
  setLightContrast,
  highContrast,
  setHighContrast,
  monochrome,
  setMonochrome,
  siteFont,
  setSiteFont,
  toolbarVisible,
  setToolbarVisible,
  onReset,
}) {
  const [visible, setVisible] = useState(false);
  const [fontPickerOpen, setFontPickerOpen] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const contentModules = [
    {
      key: "readableFont",
      label: "Readable Font",
      active: readableFont,
      onClick: () => setReadableFont((v) => !v),
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 18h4M6 18V7l4 11M6 7h0M10 18l4-11M14 18h6M17 6v12M14.5 9h5" />
        </svg>
      ),
    },
    {
      key: "letterSpacing",
      label: "Letter Spacing",
      active: letterSpacing,
      onClick: () => setLetterSpacing((v) => !v),
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 18L10 6l4 12M7.2 14h5.6M15 18l3.5-9M21 18l-3.5-9" />
        </svg>
      ),
    },
  ];

  const colorModules = [
    {
      key: "lightContrast",
      label: "Light Contrast",
      active: lightContrast,
      onClick: () => {
        setLightContrast((v) => !v);
        if (!lightContrast) setHighContrast(false);
      },
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ),
    },
    {
      key: "highContrast",
      label: "High Contrast",
      active: highContrast,
      onClick: () => {
        setHighContrast((v) => !v);
        if (!highContrast) setLightContrast(false);
      },
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 000 18z" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      key: "monochrome",
      label: "Monochrome",
      active: monochrome,
      onClick: () => setMonochrome((v) => !v),
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8" />
          <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
        </svg>
      ),
    },
  ];

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 160);
  };

  const activeFontOption = FONT_OPTIONS.find((f) => f.id === siteFont) || FONT_OPTIONS[0];

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ zIndex: 2147483000, opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      <div
        className={`fixed bottom-20 sm:bottom-24 left-4 sm:left-6 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] max-h-[72vh] sm:max-h-[76vh] bg-white/95 backdrop-blur-xl rounded-[26px] sm:rounded-[30px] shadow-[0_30px_80px_-20px_rgba(10,42,77,0.35),0_0_0_1px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col origin-bottom-left transition-all duration-300 ease-out ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
        style={{ zIndex: 2147483001 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 shrink-0">
          <button className="flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 text-xs sm:text-[13px] font-semibold rounded-full px-3.5 sm:px-4 py-2 transition-colors">
            English
            <svg viewBox="0 0 24 24" width="12" height="12" className="opacity-60" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200/80 hover:text-slate-700 transition-colors"
            aria-label="Close accessibility panel"
          >
            <X size={15} strokeWidth={2.25} />
          </button>
        </div>

        <div
          className="relative mx-4 sm:mx-5 mt-3 sm:mt-4 rounded-[20px] sm:rounded-[24px] px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center text-center overflow-hidden shrink-0"
          style={{
            background: "linear-gradient(135deg, #0a2440 0%, #0f3a66 50%, #164f8a 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 blur-2xl"
            style={{ background: "radial-gradient(circle, #fb923c, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-8 w-36 h-36 rounded-full opacity-20 blur-2xl"
            style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
          />

          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center mb-3 shadow-lg">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8">
              <circle cx="12" cy="4.5" r="1.7" fill="white" stroke="none" />
              <path d="M4.5 8.2c2.4.95 5 1.4 7.5 1.4s5.1-.45 7.5-1.4M12 9.6v4.1M12 13.7l-3.4 6.6M12 13.7l3.4 6.6M8.8 13.2L6 16M15.2 13.2L18 16" />
            </svg>
          </div>
          <h2 className="relative text-white font-bold text-lg sm:text-xl tracking-tight mb-1.5">
            Accessibility Adjustments
          </h2>
          <p className="relative text-white/60 text-xs sm:text-[13px]">
            Powered by AKSAN{" "}
            <button
              onClick={() => setToolbarVisible((v) => !v)}
              className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-2 decoration-orange-400/40 transition-colors"
            >
              {toolbarVisible ? "Hide Toolbar" : "Show Toolbar"}
            </button>
          </p>
        </div>

        <div className="px-4 sm:px-5 py-4 sm:py-5 overflow-y-auto flex-1 [scrollbar-width:thin]">
          {/* Site Font picker */}
          <div className="bg-slate-50/70 rounded-2xl p-3.5 sm:p-4 mb-3.5 sm:mb-4 ring-1 ring-slate-100">
            <h3 className="text-slate-400 font-bold text-[10px] sm:text-[11px] tracking-widest uppercase mb-2.5 sm:mb-3 px-0.5">
              Site Font
            </h3>
            <button
              onClick={() => setFontPickerOpen((v) => !v)}
              className="w-full flex items-center justify-between bg-white rounded-xl px-3.5 sm:px-4 py-3 shadow-sm ring-1 ring-slate-100 hover:ring-slate-200 transition-all"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0f3a66]/10 text-[#0f3a66]">
                  <Type size={15} strokeWidth={2.1} />
                </span>
                <span
                  className="text-slate-700 text-[13px] sm:text-sm font-medium"
                  style={activeFontOption.cssVar ? { fontFamily: activeFontOption.cssVar } : undefined}
                >
                  {activeFontOption.label}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                className={`text-slate-400 transition-transform ${fontPickerOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {fontPickerOpen && (
              <div className="mt-2 sm:mt-2.5 grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-0.5 [scrollbar-width:thin]">
                {FONT_OPTIONS.map((opt) => {
                  const isActive = opt.id === siteFont;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSiteFont(opt.id);
                        setFontPickerOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-all text-left ${
                        isActive
                          ? "bg-[#0f3a66] text-white"
                          : "bg-white text-slate-600 ring-1 ring-slate-100 hover:ring-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`text-base font-semibold w-6 shrink-0 ${isActive ? "text-orange-300" : "text-[#0f3a66]"}`}
                          style={opt.cssVar ? { fontFamily: opt.cssVar } : undefined}
                        >
                          {opt.preview}
                        </span>
                        <span
                          className="text-[12.5px] sm:text-[13px] font-medium truncate"
                          style={opt.cssVar ? { fontFamily: opt.cssVar } : undefined}
                        >
                          {opt.label}
                        </span>
                      </span>
                      {isActive && <Check size={14} strokeWidth={2.5} className="shrink-0 text-orange-300" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-3.5 sm:p-4 mb-3.5 sm:mb-4 ring-1 ring-slate-100">
            <h3 className="text-slate-400 font-bold text-[10px] sm:text-[11px] tracking-widest uppercase mb-2.5 sm:mb-3 px-0.5">
              Content Modules
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="bg-white rounded-xl px-3 sm:px-4 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 shadow-sm ring-1 ring-slate-100">
                <span className="text-slate-500 text-[11px] sm:text-xs font-medium">Font Size</span>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <button
                    onClick={() => setFontSize((v) => Math.max(v - 1, -2))}
                    disabled={fontSize <= -2}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0f3a66] text-white flex items-center justify-center disabled:opacity-30 text-sm font-medium hover:bg-[#12457a] active:scale-90 transition-all"
                    aria-label="Decrease font size"
                  >
                    −
                  </button>
                  <span className="text-slate-500 text-[10px] sm:text-[11px] w-11 sm:w-12 text-center font-medium tabular-nums">
                    {fontSize === 0 ? "Default" : `${fontSize > 0 ? "+" : ""}${FONT_PX_STEPS[fontSize]}px`}
                  </span>
                  <button
                    onClick={() => setFontSize((v) => Math.min(v + 1, 4))}
                    disabled={fontSize >= 4}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0f3a66] text-white flex items-center justify-center disabled:opacity-30 text-sm font-medium hover:bg-[#12457a] active:scale-90 transition-all"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={contentModules[0].onClick}
                className={`rounded-xl px-3 sm:px-4 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 transition-all shadow-sm ${
                  readableFont
                    ? "bg-[#0f3a66] text-white ring-1 ring-[#0f3a66]"
                    : "bg-white text-slate-600 ring-1 ring-slate-100 hover:ring-slate-200"
                }`}
              >
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                    readableFont ? "bg-white/15" : "bg-slate-50"
                  }`}
                >
                  {contentModules[0].icon}
                </span>
                <span className="text-[11px] sm:text-xs font-medium">Readable Font</span>
              </button>

              <div className="bg-white rounded-xl px-3 sm:px-4 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 shadow-sm ring-1 ring-slate-100">
                <span className="text-slate-500 text-[11px] sm:text-xs font-medium">Line Height</span>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <button
                    onClick={() => setLineHeight((v) => Math.max(v - 1, -2))}
                    disabled={lineHeight <= -2}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0f3a66] text-white flex items-center justify-center disabled:opacity-30 text-sm font-medium hover:bg-[#12457a] active:scale-90 transition-all"
                    aria-label="Decrease line height"
                  >
                    −
                  </button>
                  <span className="text-slate-500 text-[10px] sm:text-[11px] w-11 sm:w-12 text-center font-medium tabular-nums">
                    {lineHeight === 0 ? "Default" : lineHeight > 0 ? `+${lineHeight}` : lineHeight}
                  </span>
                  <button
                    onClick={() => setLineHeight((v) => Math.min(v + 1, 4))}
                    disabled={lineHeight >= 4}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0f3a66] text-white flex items-center justify-center disabled:opacity-30 text-sm font-medium hover:bg-[#12457a] active:scale-90 transition-all"
                    aria-label="Increase line height"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={contentModules[1].onClick}
                className={`rounded-xl px-3 sm:px-4 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 transition-all shadow-sm ${
                  letterSpacing
                    ? "bg-[#0f3a66] text-white ring-1 ring-[#0f3a66]"
                    : "bg-white text-slate-600 ring-1 ring-slate-100 hover:ring-slate-200"
                }`}
              >
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                    letterSpacing ? "bg-white/15" : "bg-slate-50"
                  }`}
                >
                  {contentModules[1].icon}
                </span>
                <span className="text-[11px] sm:text-xs font-medium">Letter Spacing</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-2xl p-3.5 sm:p-4 mb-4 sm:mb-5 ring-1 ring-slate-100">
            <h3 className="text-slate-400 font-bold text-[10px] sm:text-[11px] tracking-widest uppercase mb-2.5 sm:mb-3 px-0.5">
              Color Modules
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {colorModules.map((mod) => (
                <button
                  key={mod.key}
                  onClick={mod.onClick}
                  className={`rounded-xl px-2 sm:px-3 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 transition-all shadow-sm ${
                    mod.active
                      ? "bg-[#0f3a66] text-white ring-1 ring-[#0f3a66]"
                      : "bg-white text-slate-600 ring-1 ring-slate-100 hover:ring-slate-200"
                  }`}
                >
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors ${
                      mod.active ? "bg-white/15" : "bg-slate-50"
                    }`}
                  >
                    {mod.icon}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-center leading-tight">{mod.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-sm sm:text-[15px] rounded-full py-3 sm:py-3.5 shadow-[0_10px_25px_-8px_rgba(249,115,22,0.5)] hover:shadow-[0_14px_32px_-8px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
          >
            Reset Settings
          </button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
  CHAT PANEL
  - Clicking a message bubble selects it and speaks ONLY that text.
  - Re-clicking the same bubble toggles pause/resume.
  - On mobile it opens as a near-full-screen sheet anchored to the
    viewport (safe-area aware) instead of a small floating card,
    so the header, transcript and composer are all comfortably
    legible on a phone.
  ============================================================ */
function ChatPanel({ onClose, speech }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMsgId, setSelectedMsgId] = useState(null);
  const scrollRef = useRef(null);
  const timeoutRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "ai",
      lines: [
        { bold: true, text: "Welcome to Aksan AI" },
        { text: "I can help with fundraising, ipo, valuation, due diligence and more. Pick a topic to get started." },
      ],
      time: getTime(),
      replies: TOPICS,
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const getMsgText = (m) =>
    m.from === "ai" ? m.lines.map((l) => l.text).join(". ") : m.text;

  const sendUserMessage = (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      from: "user",
      text,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    const flow = BOT_FLOWS[text] || BOT_FLOWS.default;
    const delay = typingDelayFor(flow);

    timeoutRef.current = setTimeout(() => {
      const aiId = `ai-${Date.now()}`;
      const aiMsg = {
        id: aiId,
        from: "ai",
        lines: flow.text,
        time: getTime(),
        replies: flow.replies,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, delay);
  };

  const handleQuickReply = (reply) => sendUserMessage(reply);
  const handleSend = () => sendUserMessage(message);

  const handleRefresh = () => {
    clearTimeout(timeoutRef.current);
    setIsTyping(false);
    speech.stop();
    setSelectedMsgId(null);
    setMessages((prev) => prev.slice(0, 1));
  };

  // Click a message bubble: select it AND speak only that message's text
  const selectAndSpeakMessage = (id, text) => {
    if (selectedMsgId === id && speech.activeSourceId === id) {
      if (speech.isSpeaking && !speech.isPaused) {
        speech.pause();
        return;
      } else if (speech.isPaused) {
        speech.resume();
        return;
      }
    }
    setSelectedMsgId(id);
    speech.speak(text, id);
  };

  return (
    <div
      className="chat-panel-in fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-24 sm:right-6 w-full sm:w-[400px] h-[92dvh] sm:h-[640px] max-h-[820px] sm:max-h-[640px] rounded-t-[24px] sm:rounded-[26px] shadow-[0_-8px_40px_-15px_rgba(6,20,38,0.35),0_30px_70px_-15px_rgba(6,20,38,0.55)] sm:shadow-[0_30px_70px_-15px_rgba(6,20,38,0.55)] ring-1 ring-black/[0.06] overflow-hidden flex flex-col relative bg-[#f7f9fc] voice-widget"
      style={{ zIndex: 2147483000 }}
    >
      <div
        className="relative z-10 px-4 sm:px-5 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-5 pb-4 sm:pb-5 flex items-center justify-between shrink-0 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #081b32 0%, #0d3462 48%, #12457a 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-16 -right-10 w-44 h-44 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #fb923c, transparent 70%)" }}
        />

        <div className="relative flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/chatbot.webp"
              alt="Aksan AI"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-[14px] sm:text-[15px] leading-tight tracking-tight truncate">
                Aksan AI Advisor
              </p>
              <ShieldCheck size={13} className="text-sky-300 shrink-0" strokeWidth={2.4} />
            </div>
            <span className="flex items-center gap-1.5 text-emerald-300/90 text-[10.5px] sm:text-[11px] font-medium leading-snug">
              <span className="relative flex w-1.5 h-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400" />
              </span>
              Online — typically replies instantly
            </span>
          </div>
        </div>

        <div className="relative flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white/90 transition"
            aria-label="Restart chat"
            title="Restart conversation"
          >
            <RotateCcw size={14} strokeWidth={2.25} />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white/90 transition"
            aria-label="Close chat"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="chat-scrollbar relative z-10 px-3.5 sm:px-5 py-4 sm:py-5 flex-1 overflow-y-auto flex flex-col gap-4 sm:gap-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 8%, rgba(18,69,122,0.05), transparent 45%), radial-gradient(circle at 85% 92%, rgba(249,115,22,0.04), transparent 40%)",
        }}
      >
        {messages.map((msg) => {
          const isSelected = selectedMsgId === msg.id;
          const isActiveHere = speech.activeSourceId === msg.id;
          const speaking = isActiveHere && speech.isSpeaking && !speech.isPaused;

          if (msg.from === "ai") {
            const fullText = getMsgText(msg);
            return (
              <div key={msg.id} className="chat-msg-in">
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#164f8a] to-[#081b32] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 ring-1 ring-black/5 shadow-sm">
                    AI
                  </div>
                  <button
                    onClick={() => selectAndSpeakMessage(msg.id, fullText)}
                    className={`speakable-msg group relative text-left bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-[78%] sm:max-w-[290px] shadow-[0_4px_20px_-6px_rgba(15,23,42,0.10)] ring-1 transition-all ${
                      isSelected ? "ring-[#12457a]/50 shadow-[0_4px_20px_-4px_rgba(18,69,122,0.3)]" : "ring-slate-100 hover:ring-slate-200"
                    }`}
                    title="Tap to select and hear only this message"
                  >
                    {msg.lines.map((line, i) => (
                      <p
                        key={i}
                        className={
                          line.bold
                            ? "text-slate-900 text-[13.5px] sm:text-sm font-semibold leading-snug tracking-tight pr-5"
                            : `text-slate-600 text-[13.5px] sm:text-sm leading-[1.55] pr-5 ${i > 0 ? "mt-1.5 sm:mt-2" : ""}`
                        }
                      >
                        {line.text}
                      </p>
                    ))}
                    <span
                      className={`absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full transition-all ${
                        isActiveHere
                          ? "bg-[#0f3a66] text-white opacity-100"
                          : isSelected
                          ? "bg-[#0f3a66]/20 text-[#0f3a66] opacity-100"
                          : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {speaking ? (
                        <AudioLines size={11} strokeWidth={2.4} />
                      ) : (
                        <Volume2 size={11} strokeWidth={2.4} />
                      )}
                    </span>
                  </button>
                </div>
                <p className="text-slate-400 text-[10.5px] sm:text-[11px] mt-1.5 ml-9 sm:ml-[42px] font-medium leading-none">
                  {msg.time}
                </p>

                {msg.replies && msg.replies.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3 ml-9 sm:ml-[42px] max-w-[calc(100%-2.5rem)] sm:max-w-[300px]">
                    {msg.replies.map((reply) => {
                      const meta = REPLY_META[reply];
                      const Icon = meta?.icon || Sparkles;
                      const isNav = Boolean(meta);
                      return (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          disabled={isTyping}
                          className={`group relative flex items-center gap-2 rounded-[14px] px-2.5 py-2.5 min-h-[44px] text-left transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none ${
                            isNav
                              ? "bg-white ring-1 ring-slate-200/80 hover:ring-[#12457a]/30 hover:shadow-[0_6px_16px_-4px_rgba(15,58,102,0.18)]"
                              : "col-span-2 bg-gradient-to-r from-orange-50 to-white ring-1 ring-orange-200/70 hover:ring-orange-300 hover:shadow-[0_6px_16px_-4px_rgba(249,115,22,0.18)]"
                          }`}
                        >
                          {isNav ? (
                            <span
                              className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-[10px] bg-gradient-to-br ${meta.tint} text-white shrink-0 shadow-sm group-hover:scale-105 transition`}
                            >
                              <Icon size={13} strokeWidth={2.25} />
                            </span>
                          ) : (
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white shrink-0 shadow-sm">
                              <Icon size={12} strokeWidth={2.5} />
                            </span>
                          )}
                          <span className="text-[12px] sm:text-xs font-medium text-slate-700 leading-[1.35] group-hover:text-slate-900">
                            {reply}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex flex-col items-end chat-msg-in">
              <button
                onClick={() => selectAndSpeakMessage(msg.id, msg.text)}
                className={`group relative text-left bg-gradient-to-br from-[#164f8a] to-[#081b32] text-white rounded-2xl rounded-tr-md px-4 py-2.5 sm:py-3 max-w-[75%] sm:max-w-[270px] shadow-[0_6px_18px_-6px_rgba(8,27,50,0.5)] transition-all ${
                  isSelected ? "ring-2 ring-orange-400/70" : ""
                }`}
                title="Tap to select and hear only this message"
              >
                <p className="text-[13.5px] sm:text-sm leading-[1.55] pr-5">{msg.text}</p>
                <span
                  className={`absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full transition-all ${
                    isActiveHere
                      ? "bg-white/20 text-white opacity-100"
                      : isSelected
                      ? "bg-white/15 text-white opacity-100"
                      : "bg-white/10 text-white/70 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {speaking ? (
                    <AudioLines size={11} strokeWidth={2.4} />
                  ) : (
                    <Volume2 size={11} strokeWidth={2.4} />
                  )}
                </span>
              </button>
              <p className="text-slate-400 text-[10.5px] sm:text-[11px] mt-1.5 mr-1 flex items-center gap-1 font-medium leading-none">
                {msg.time}
                <span className="text-sky-600" aria-hidden="true">✓✓</span>
              </p>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2 sm:gap-2.5 chat-msg-in">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#164f8a] to-[#081b32] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 ring-1 ring-black/5 shadow-sm">
              AI
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.10)] ring-1 ring-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 px-3.5 sm:px-4 pt-3 sm:pt-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3.5 border-t border-slate-200/70 flex items-center gap-2 shrink-0 bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about fundraising, IPO, valuation..."
          disabled={isTyping}
          className="flex-1 min-w-0 border border-slate-200 bg-slate-50/70 rounded-full px-4 py-2.5 text-[13.5px] sm:text-sm outline-none focus:border-[#12457a]/50 focus:bg-white focus:ring-4 focus:ring-[#12457a]/[0.08] transition-all disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isTyping}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#164f8a] to-[#081b32] text-white shrink-0 disabled:opacity-40 hover:shadow-[0_6px_18px_-4px_rgba(8,27,50,0.5)] active:scale-90 transition-all"
          aria-label="Send message"
        >
          <Send size={16} strokeWidth={2.25} />
        </button>
      </div>

      <p className="relative z-10 text-center text-[10px] sm:text-[11px] text-slate-400 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-3 pt-1 bg-white shrink-0 font-medium">
        Secured &amp; Powered by <span className="text-orange-500 font-semibold">Aksan AI</span>
      </p>
    </div>
  );
}