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
} from "lucide-react";

// Icon + accent per top-level topic / nav chip. Falls back to Sparkles
// for any reply label that isn't a known topic (individual FAQ
// questions render as plain text chips without an icon).
const REPLY_META = {
  "About Aksan": { icon: Building2, tint: "from-sky-500 to-sky-600" },
  Fundraising: { icon: TrendingUp, tint: "from-emerald-500 to-emerald-600" },
  "IPO Advisory": { icon: Rocket, tint: "from-violet-500 to-violet-600" },
  Valuation: { icon: Calculator, tint: "from-amber-500 to-amber-600" },
  "Due Diligence": { icon: SearchCheck, tint: "from-cyan-500 to-cyan-600" },
  "M&A & Compliance": { icon: Handshake, tint: "from-rose-500 to-rose-600" },
  "Grievance / Complaint": { icon: AlertTriangle, tint: "from-orange-500 to-orange-600" },
  "Our services": { icon: ArrowLeft, tint: "from-slate-500 to-slate-600" },
};

/* ============================================================
  Accessibility settings live here so BOTH the fab button and
  the panel can read/write them, and so `document.documentElement`
  actually gets the classes/vars applied to the real page.

  NOTE ON FONT SCALING: this now uses literal pixel offsets
  (e.g. "+3" means +3px added to whatever an element's base
  font-size already is), applied via calc(1em + Npx). This is
  deliberately NOT a percentage/em multiplier — multiplying em
  values compounds unpredictably on deeply nested elements,
  and the UI label promises "px", so the behavior needs to
  actually be px.
  ============================================================ */
const FONT_PX_STEPS = { "-2": -2, "-1": -1, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };
const LINE_HEIGHTS = { "-2": 1.15, "-1": 1.3, 0: 1.5, 1: 1.65, 2: 1.8, 3: 1.95, 4: 2.1 };

// How long the "typing…" indicator shows before the bot's answer
// appears, scaled a bit by reply length so short answers don't
// linger and long answers don't feel instant/fake.
function typingDelayFor(flow) {
  const chars = (flow.text || []).reduce((n, l) => n + (l.text?.length || 0), 0);
  return Math.min(1400, Math.max(550, chars * 12));
}

export default function VoiceWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);

  // accessibility state, applied globally via useEffect below
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [readableFont, setReadableFont] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(false);
  const [lightContrast, setLightContrast] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [monochrome, setMonochrome] = useState(false);

  const [targetMissing, setTargetMissing] = useState(false);

  // Resolves the real page container. NEVER falls back to document.body —
  // the widget is portaled onto document.body too, so scaling/recoloring
  // body would also scale/recolor the widget itself (this was the root
  // cause of "+1 font size only grew the button"). If #page-content is
  // missing, settings simply won't apply — fix that on the layout side
  // rather than working around it here.
  //
  // IMPORTANT: your root layout MUST wrap page children like this:
  //   <body>
  //     <div id="page-content">{children}</div>
  //     <VoiceWidget />
  //   </body>
  // If High Contrast / Font Size / etc. visibly do nothing, check the
  // browser console for the warning below — it means #page-content
  // isn't in the DOM yet.
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

  // Apply all accessibility settings in a single effect to ensure consistency
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

  const speakPage = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const page = getTarget() || document.body;
    const text = page.innerText.slice(0, 800);
    if (!text.trim()) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handleSpeak = () => speakPage();
  const handlePause = () => {
    if (typeof window === "undefined") return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };
  const handlePlayResume = () => {
    if (typeof window === "undefined") return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (!isSpeaking) {
      speakPage();
    }
  };
  const handleStop = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleResetA11y = () => {
    setFontSize(0);
    setLineHeight(0);
    setReadableFont(false);
    setLetterSpacing(false);
    setLightContrast(false);
    setHighContrast(false);
    setMonochrome(false);
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
        }

        #page-content {
          transition: all 0.3s ease;
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
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-msg-in {
          animation: chatBubbleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .typing-dot {
          animation: typingDot 1.1s ease-in-out infinite;
        }
      `}</style>

      {/* Bottom-left accessibility icon - Exact size from screenshot */}
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
          toolbarVisible={toolbarVisible}
          setToolbarVisible={setToolbarVisible}
          onReset={handleResetA11y}
        />
      )}

      <div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-2 sm:gap-3 voice-widget"
        style={{ display: toolbarVisible ? "flex" : "none", zIndex: 2147483000 }}
      >
        {/* Speak / Pause / Play / Stop control bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0f3a66]/95 backdrop-blur-md rounded-2xl pl-1.5 sm:pl-2 pr-1.5 sm:pr-2 py-1.5 sm:py-2 shadow-[0_8px_30px_-8px_rgba(15,58,102,0.55)] ring-1 ring-white/10">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1 sm:gap-1.5 bg-white text-slate-900 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-xl hover:bg-slate-50 active:scale-95 transition"
          >
            <Volume2 size={14} strokeWidth={2.25} className="text-orange-500 sm:w-[16px] sm:h-[16px]" />
            Speak
          </button>

          <button
            onClick={handlePause}
            className={`flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full transition active:scale-95 ${
              isPaused ? "bg-orange-500 text-white" : "bg-white text-[#0f3a66] hover:bg-slate-50"
            }`}
            aria-label="Pause"
          >
            <Pause size={13} strokeWidth={2.25} fill="currentColor" className="sm:w-[15px] sm:h-[15px]" />
          </button>

          <button
            onClick={handlePlayResume}
            className={`flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full transition active:scale-95 ${
              isSpeaking && !isPaused ? "bg-orange-500 text-white" : "bg-white text-[#0f3a66] hover:bg-slate-50"
            }`}
            aria-label="Play"
          >
            <Play size={13} strokeWidth={2.25} fill="currentColor" className="sm:w-[15px] sm:h-[15px]" />
          </button>

          <button
            onClick={handleStop}
            className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-[#0f3a66] hover:bg-slate-50 active:scale-95 transition"
            aria-label="Stop"
          >
            <Square size={11} strokeWidth={2.25} fill="currentColor" className="sm:w-[13px] sm:h-[13px]" />
          </button>
        </div>

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
            <Image
              src="/chatbot.webp"
              alt="Chat with Aksan AI"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      </div>
    </>,
    document.body
  );
}

/* ============================================================
  BOT FLOW — built directly from the client's approved FAQ
  list. Structure is: a root "menu" of topic categories, each
  category shows its questions as quick replies, each question
  shows its exact approved answer plus a "Back to Topics" reply
  so the user can keep browsing without retyping.
  ============================================================ */
const TOPICS = [
  "About Aksan",
  "Fundraising",
  "IPO Advisory",
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

  "IPO Advisory": {
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
    replies: ["IPO Advisory", "Our services"],
  },
  "What is an SME IPO?": {
    text: [{ text: "It enables eligible SMEs to raise capital through SME exchanges. For guidance, email info@aksan.in." }],
    replies: ["IPO Advisory", "Our services"],
  },
  "How do I know if my company is IPO ready?": {
    text: [{ text: "We conduct an IPO readiness assessment. Contact info@aksan.in." }],
    replies: ["IPO Advisory", "Our services"],
  },
  "How long does an IPO take?": {
    text: [{ text: "It depends on readiness and approvals. Email info@aksan.in." }],
    replies: ["IPO Advisory", "Our services"],
  },
  "Can you assist after listing?": {
    text: [{ text: "Yes. Contact info@aksan.in." }],
    replies: ["IPO Advisory", "Our services"],
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
  ACCESSIBILITY PANEL — modernized visual treatment:
  glass/blur panel, layered elevation shadow, gradient hero
  with ambient glow accents, uppercase tracked section labels,
  card-style module groups with hover/active micro-interactions,
  and a gradient CTA for Reset Settings.
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
  toolbarVisible,
  setToolbarVisible,
  onReset,
}) {
  const [visible, setVisible] = useState(false);
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
        {/* Top bar */}
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

        {/* Hero banner */}
        <div
          className="relative mx-4 sm:mx-5 mt-3 sm:mt-4 rounded-[20px] sm:rounded-[24px] px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center text-center overflow-hidden shrink-0"
          style={{
            background: "linear-gradient(135deg, #0a2440 0%, #0f3a66 50%, #164f8a 100%)",
          }}
        >
          {/* subtle radial glow accents */}
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

        {/* Body */}
        <div className="px-4 sm:px-5 py-4 sm:py-5 overflow-y-auto flex-1 [scrollbar-width:thin]">
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

function ChatPanel({ onClose }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const timeoutRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      from: "ai",
      lines: [
        { bold: true, text: "Hi! I'm Aksan AI 👋" },
        { text: "How can I help you today? Pick a topic below to get started." },
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
      const aiMsg = {
        id: `ai-${Date.now()}`,
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
    setMessages((prev) => prev.slice(0, 1));
  };

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] sm:h-[620px] max-w-[380px] rounded-2xl sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(10,42,77,0.45)] ring-1 ring-black/5 overflow-hidden flex flex-col relative bg-white voice-widget">
      {/* Background pattern image behind the message thread */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <Image src="/chatbot-bg.webp" alt="" fill className="object-cover object-bottom" />
      </div>

      {/* Header */}
      <div
        className="relative z-10 px-4 py-3.5 flex items-center justify-between shrink-0"
        style={{
          background:
            "linear-gradient(120deg, var(--primary-blue-dark, #0a2a4d), var(--primary-blue, #0f3a66) 55%, var(--navy-700, #12457a) 120%)",
        }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleRefresh}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0 transition"
            aria-label="Restart chat"
          >
            <RotateCcw size={14} strokeWidth={2.25} />
          </button>
          <div className="relative h-7 sm:h-9 w-[100px] sm:w-[130px] shrink-0">
            <Image
              src="/aksan-logo.webp"
              alt="AKSAN Capital Advisory Private Limited"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1.5 text-white/90 text-[10px] sm:text-xs whitespace-nowrap">
            <span className="relative flex w-1.5 h-1.5 sm:w-2 sm:h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400" />
            </span>
            Online now
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0 transition"
            aria-label="Close chat"
          >
            <X size={14} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="relative z-10 bg-slate-50/70 px-3.5 sm:px-5 py-4 sm:py-5 flex-1 overflow-y-auto flex flex-col gap-3.5 sm:gap-4"
      >
        {messages.map((msg) =>
          msg.from === "ai" ? (
            <div key={msg.id} className="chat-msg-in">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#12457a] to-[#0a2a4d] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 ring-1 ring-white/20">
                  AI
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md px-3.5 sm:px-4 py-2.5 sm:py-3 max-w-[250px] sm:max-w-[290px] shadow-[0_2px_12px_-2px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
                  {msg.lines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.bold
                          ? "text-slate-900 text-xs sm:text-sm font-semibold"
                          : `text-slate-600 text-xs sm:text-sm leading-relaxed ${i > 0 ? "mt-1.5 sm:mt-2" : ""}`
                      }
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-xs mt-1.5 sm:mt-2 ml-9 sm:ml-11">{msg.time}</p>

              {msg.replies && msg.replies.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 ml-9 sm:ml-11 max-w-[260px] sm:max-w-[300px]">
                  {msg.replies.map((reply) => {
                    const meta = REPLY_META[reply];
                    const Icon = meta?.icon || Sparkles;
                    const isNav = Boolean(meta);
                    return (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        disabled={isTyping}
                        className={`group relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-left transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none ${
                          isNav
                            ? "bg-white ring-1 ring-slate-200 hover:ring-transparent hover:shadow-md"
                            : "col-span-2 bg-white ring-1 ring-slate-200 hover:ring-blue-900/40 hover:bg-blue-50/60"
                        }`}
                      >
                        {isNav && (
                          <span
                            className={`flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br ${meta.tint} text-white shrink-0 group-hover:scale-105 transition`}
                          >
                            <Icon size={13} strokeWidth={2.25} />
                          </span>
                        )}
                        <span className="text-[11px] sm:text-xs font-medium text-slate-700 leading-snug group-hover:text-slate-900">
                          {reply}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div key={msg.id} className="flex flex-col items-end chat-msg-in">
              <div className="bg-gradient-to-br from-[#12457a] to-[#0a2a4d] text-white rounded-2xl rounded-tr-md px-3.5 sm:px-4 py-2.5 sm:py-3 max-w-[230px] sm:max-w-[270px] shadow-sm">
                <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-xs mt-1.5 sm:mt-2 mr-1 flex items-center gap-1">
                {msg.time}
                <span className="text-blue-900" aria-hidden="true">✓</span>
              </p>
            </div>
          )
        )}

        {/* Typing indicator — shown while the bot "composes" its reply */}
        {isTyping && (
          <div className="flex items-start gap-2 sm:gap-3 chat-msg-in">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#12457a] to-[#0a2a4d] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 ring-1 ring-white/20">
              AI
            </div>
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="relative z-10 px-3.5 sm:px-4 py-3 border-t border-slate-100 flex items-center gap-2 shrink-0 bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          disabled={isTyping}
          className="flex-1 border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 transition disabled:bg-slate-50 disabled:text-slate-400"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isTyping}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#12457a] to-[#0a2a4d] text-white shrink-0 disabled:opacity-40 active:scale-90 transition"
          aria-label="Send message"
        >
          <Send size={16} strokeWidth={2.25} />
        </button>
      </div>

      <p className="relative z-10 text-center text-[10px] sm:text-xs text-slate-400 pb-2.5 sm:pb-3 bg-white shrink-0">
        Powered by <span className="text-orange-500 font-medium">Aksan AI</span> ⚡
      </p>
    </div>
  );
}