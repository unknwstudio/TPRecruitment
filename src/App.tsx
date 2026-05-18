import { useEffect, useRef, useState } from "react";

// ── Assets ────────────────────────────────────────────────────────────────────
const imgImage30 = "/assets/imgImage30.png";
const imgImage31 = "/assets/imgImage31.png";
const imgImage32 = "/assets/imgImage32.png";
const imgImage33 = "/assets/imgImage33.png";
const imgImage36 = "/assets/imgImage36.png";
const imgImage34 = "/assets/imgImage34.png";
const imgImage35 = "/assets/imgImage35.png";
const imgImage37 = "/assets/imgImage37.png";
const imgImage38 = "/assets/imgImage38.png";
const imgImage39 = "/assets/imgImage39.png";
const imgImage40 = "/assets/imgImage40.png";
const imgImage41 = "/assets/imgImage41.png";
const imgImage42 = "/assets/imgImage42.png";
const imgImage43 = "/assets/imgImage43.png";
const imgImage44 = "/assets/imgImage44.png";
const imgImage45 = "/assets/imgImage45.svg";
const imgLinkedInIcon = "/assets/imgLinkedInIcon.svg";

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT_DISPLAY = "'GT Canon Trial'";
const FONT_MONO    = "'GT Pressura Mono'";

const STYLE_DISPLAY: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  letterSpacing: "-0.05em",
  lineHeight: "1.1",
};
const STYLE_MONO: React.CSSProperties = {
  fontFamily: FONT_MONO,
  lineHeight: "1.08",
};

// Card hover shadow: #EFD7BA @ 35% opacity
const CARD_SHADOW = "0 8px 32px rgba(239,215,186,0.35)";
const CARD_TRANSITION = "transform 0.22s ease, box-shadow 0.22s ease";

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

// ── Scroll-reveal hook + wrapper ──────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Card hover wrapper ────────────────────────────────────────────────────────
function HoverCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={className}
      style={{
        ...style,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? CARD_SHADOW : "none",
        transition: CARD_TRANSITION,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function CheckIcon()  { return <img src="/CheckedBox.svg"   alt="" className="shrink-0 w-[24px] h-[24px]" />; }
function CrossIcon()  { return <img src="/crossedBox.svg"   alt="" className="shrink-0 w-[24px] h-[24px]" />; }

function OrangeCheckbox() {
  return (
    <div className="shrink-0 bg-[#fb8349] rounded-[2px] w-[18px] h-[18px] mt-[3px] flex items-center justify-center">
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
        <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DarkMinusIcon() {
  return (
    <div className="shrink-0 bg-[#4d453b] rounded-[2px] w-[18px] h-[18px] mt-[3px] flex items-center justify-center">
      <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
        <path d="M1 1H9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Orange arrow button (for Roles rows)
function ArrowBtn({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: "#fb8349", width: 24, height: 24, flexShrink: 0, position: "relative", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ position: "absolute", inset: 0, border: "0.4px solid black", borderRadius: "4px" }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ position: "relative" }}>
        <path d="M2 5H8M6 3L8 5L6 7" stroke="black" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function CheckItem({ text, icon = "check" }: { text: string; icon?: "check" | "cross" }) {
  return (
    <div className="flex gap-[14px] items-start w-full">
      <div className="shrink-0 mt-[1px]">
        {icon === "cross" ? <CrossIcon /> : <CheckIcon />}
      </div>
      <p className="flex-1 text-black text-[18px] md:text-[20px]" style={STYLE_MONO}>{text}</p>
    </div>
  );
}

function SectionCard({ title, children, expanded = true }: { title: string; children: React.ReactNode; expanded?: boolean }) {
  return (
    <div className="bg-white flex flex-col items-start p-[10px] w-full">
      <div className="flex items-start w-full" style={{ marginBottom: expanded ? "-1.372px" : "0" }}>
        <div
          className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] w-full"
          style={{ borderRadius: expanded ? "8px 8px 0 0" : "8px", transition: "border-radius 0.05s" }}
        >
          <p className="text-[22px] md:text-[32px] text-black" style={STYLE_DISPLAY}>{title}</p>
        </div>
      </div>
      <div
        className="w-full"
        style={{ maxHeight: expanded ? "800px" : "0", overflow: "hidden", transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div className="border-[1.372px] border-black flex flex-1 flex-col items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// Orange CTA button with hover colour change
function OrangeBtn({ onClick, children, className = "" }: { onClick?: () => void; children: React.ReactNode; className?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex flex-col items-start p-[6px] w-fit self-start"
      style={{ backgroundColor: hov ? "#FF9A6A" : "#fb8349", transition: "background-color 0.2s ease" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <button
        onClick={onClick}
        className={`border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer ${className}`}
        style={{ backgroundColor: "transparent" }}
      >
        {children}
      </button>
    </div>
  );
}

// ── Intro animation ───────────────────────────────────────────────────────────
// Phase 0 (0ms):    Rectangle border + dot appear
// Phase 1 (700ms):  Arrow-burst SVG grows from centre (clip-path reveal)
// Phase 2 (2200ms): Corner text labels appear
// Phase 3 (4200ms): Labels fade, burst slides to hero illustration position (desktop)
//                   OR whole overlay fades out (mobile)
// onComplete (5000ms): overlay unmounts, hero illustration already in place
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [burstTransform, setBurstTransform] = useState<string>("none");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 4200),
      setTimeout(onComplete, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // At phase 3 on desktop: compute hero illustration position and slide burst there
  useEffect(() => {
    if (phase !== 3) return;
    if (window.innerWidth < 1020) return; // mobile just fades

    const anchor = document.getElementById("hero-illustration-anchor");
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const targetCX = rect.left + rect.width / 2;
    const targetCY = rect.top + rect.height / 2;

    const containerW = Math.min(687, window.innerWidth * 0.9);
    const vCX = window.innerWidth / 2;
    const vCY = window.innerHeight / 2;

    const dX = targetCX - vCX;
    const dY = targetCY - vCY;
    const sc = rect.width / containerW;

    setBurstTransform(`translate(${dX}px, ${dY}px) scale(${sc})`);
  }, [phase]);

  const labels = [
    { text: "Higher",    style: { left: "17.19%", top: "18.32%" },                              delay: 0   },
    { text: "Standard",  style: { left: "63.22%", top: "18.32%" },                              delay: 100 },
    { text: "In hiring", style: { left: "17.19%", top: "84.87%" },                              delay: 200 },
    { text: "People",    style: { right: "14.83%", top: "84.87%", textAlign: "right" as const }, delay: 300 },
  ];

  // Mobile: overlay opacity 0; Desktop: burst slides, overlay stays solid until unmount
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1020;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: "#ffedd7",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: phase === 3 && isMobile ? 0 : 1,
      transition: phase === 3 ? "opacity 0.8s ease" : "none",
      pointerEvents: phase === 3 ? "none" : "auto",
    }}>
      <div style={{
        position: "relative",
        width: "min(687px, 90vw)",
        height: "min(756px, 90vh)",
        transform: phase === 3 ? burstTransform : "none",
        transition: phase === 3 ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        transformOrigin: "center center",
      }}>
        {/* Rect placeholder — visible only in phase 0 */}
        <div style={{
          position: "absolute",
          left: "17.26%", top: "22.43%", width: "67.03%", height: "63.4%",
          border: "0.635px solid #4d453b",
          opacity: phase === 0 ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }} />
        {/* Center dot */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 5, height: 5, backgroundColor: "#4d453b", borderRadius: "50%",
          opacity: phase === 0 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />
        {/* Arrow burst SVG */}
        <img
          src="/intro-burst.svg"
          alt=""
          className={phase >= 1 ? "animate-burst-grow" : ""}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            clipPath: phase >= 1 ? undefined : "circle(0% at 51.09% 53.93%)",
          }}
        />
        {/* Corner labels — fade out at phase 3 */}
        {labels.map(({ text, style, delay }) => (
          <p key={text} style={{
            ...STYLE_DISPLAY,
            fontSize: "clamp(16px, 3.7vw, 25.4px)",
            color: "black",
            position: "absolute",
            ...style,
            opacity: phase >= 2 && phase < 3 ? 1 : 0,
            transform: phase >= 2 && phase < 3 ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
          }}>{text}</p>
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "How I work",    href: "working" },
  { label: "Partners",      href: "partners" },
  { label: "Roles",         href: "roles" },
  { label: "Testimonials",  href: "testimonials" },
];

function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [navHov,    setNavHov]    = useState(false);
  const [menuHov,   setMenuHov]   = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Hide the "Start a conversation" CTA when the contact form is visible
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setCtaHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const closeAndGo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between px-[16px] md:px-[30px] py-[14px] md:py-[20px] w-full">

        {/* Logo — custom SVG for all breakpoints */}
        <img
          src="/nav-logo.svg"
          alt="Higher Standard"
          className="w-auto cursor-pointer"
          style={{ height: "46px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Desktop CTA — fades out when the contact form is in view */}
        <div
          className="hidden lg:flex flex-col items-start p-[6px]"
          style={{
            backgroundColor: navHov ? "#FF9A6A" : "#fb8349",
            opacity: ctaHidden ? 0 : 1,
            pointerEvents: ctaHidden ? "none" : "auto",
            transition: "background-color 0.2s ease, opacity 0.3s ease",
          }}
          onMouseEnter={() => setNavHov(true)}
          onMouseLeave={() => setNavHov(false)}
        >
          <button
            onClick={scrollToContact}
            className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer"
          >
            <p className="text-[18px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
              Start a conversation
            </p>
          </button>
        </div>

        {/* Mobile "Menu" button — orange background, height matches 32px logo */}
        <div
          className="flex lg:hidden flex-col items-start p-[6px] ml-auto"
          style={{ backgroundColor: menuHov ? "#FF9A6A" : "#fb8349", transition: "background-color 0.2s ease" }}
          onMouseEnter={() => setMenuHov(true)}
          onMouseLeave={() => setMenuHov(false)}
        >
          <button
            onClick={() => setMenuOpen(true)}
            className="border border-black flex items-center py-[5px] px-[12px] rounded-[4px] cursor-pointer"
            aria-label="Open menu"
          >
            <p className="text-[16px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
              Menu
            </p>
          </button>
        </div>
      </div>

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-[100] flex flex-col bg-[#4d453b]"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-white/15">
          <img
            src="/TP_logo.svg"
            alt="TPRecruitment"
            className="w-auto"
            style={{ height: "28px", maxHeight: "28px", filter: "invert(1) brightness(2)" }}
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="border border-white/40 flex items-center p-[10px] rounded-[4px] cursor-pointer"
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col justify-center px-[24px]">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.href}
              onClick={() => closeAndGo(l.href)}
              className="text-left border-b border-white/15 py-[22px] group"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                transition: `opacity 0.35s ease ${i * 0.06 + 0.15}s, transform 0.35s ease ${i * 0.06 + 0.15}s`,
              }}
            >
              <p className="text-white text-[34px] md:text-[44px] group-hover:text-[#FF9A6A] transition-colors duration-200" style={STYLE_DISPLAY}>
                {l.label}
              </p>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="px-[24px] py-[28px]" style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.35s ease 0.4s" }}>
          <OrangeBtn onClick={() => { setMenuOpen(false); setTimeout(scrollToContact, 350); }}>
            <p className="text-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>Start a conversation</p>
          </OrangeBtn>
        </div>
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
// Figma 513:299 — 821px total frame (incl. nav ~86px).
// Content: left=30px, top=215px → from section top = 215-86 = 129px. w=799px h=445px.
// Illustration: centered in 821px frame → center Y=410.5px → from section top=324.5px
//   → illustration top = 324.5 - 595/2 = 27px. right=30px. w=541px h=595px.
function HeroSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">

      {/* ── Desktop (≥1020px): absolute positions matching Figma exactly ── */}
      <div className="hidden lg:block relative" style={{ minHeight: "735px" }}>
        <div className="max-w-[1440px] mx-auto px-[30px] relative" style={{ height: "735px" }}>

          {/* Left content: top=129px, w=799px, h=445px, justify-between */}
          <div
            className="absolute flex flex-col justify-between"
            style={{ left: "0px", top: "129px", width: "799px", height: "445px" }}
          >
            {/* Top group: headline + body, gap=40px */}
            <div className="flex flex-col gap-[40px]">
              <p
                className="text-black"
                style={{ ...STYLE_DISPLAY, fontSize: "60px", letterSpacing: "-3px", lineHeight: "1.1" }}
              >
                The right hire changes everything that comes after it.
              </p>
              <div style={{ ...STYLE_MONO, fontSize: "28px", lineHeight: "1.1", color: "black" }}>
                <p>I&apos;m Tiffany Philippou, founder of Higher Standard.</p>
                <p>I find the people who raise the bar for your whole company and shape the outcome, then I stay long after the offer is signed.</p>
              </div>
            </div>
            {/* CTA at bottom */}
            <OrangeBtn onClick={scrollToContact}>
              <p style={{ ...STYLE_MONO, fontSize: "24px", lineHeight: "20px", color: "black", whiteSpace: "nowrap" }}>
                Start working together
              </p>
            </OrangeBtn>
          </div>

          {/* Right illustration — anchor for the intro animation to fly into */}
          {/* top=27px matches centering within the 821px Figma frame */}
          <div
            id="hero-illustration-anchor"
            className="absolute"
            style={{ right: "0px", top: "27px", width: "541px", height: "595px" }}
          >
            {/* SVG centered inside */}
            <div className="absolute" style={{
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "540px", height: "580px",
            }}>
              <img src="/intro-burst.svg" alt="" style={{ width: "100%", height: "100%", display: "block" }} />
            </div>
            {/* Corner labels — matching Figma node 513:345 positions */}
            <p className="absolute text-[20px] text-black" style={{ ...STYLE_DISPLAY, left: "93px",  top: "109px", letterSpacing: "-0.4px" }}>Higher</p>
            <p className="absolute text-[20px] text-black" style={{ ...STYLE_DISPLAY, left: "342px", top: "109px", letterSpacing: "-0.4px" }}>Standard</p>
            <p className="absolute text-[20px] text-black" style={{ ...STYLE_DISPLAY, left: "93px",  top: "505px", letterSpacing: "-0.4px" }}>In hiring</p>
            <p className="absolute text-[20px] text-black" style={{ ...STYLE_DISPLAY, left: "461px", top: "505px", letterSpacing: "-0.4px", transform: "translateX(-100%)" }}>People</p>
          </div>

        </div>
      </div>

      {/* ── Mobile (<1020px): stacked ── */}
      <div className="lg:hidden px-[16px] md:px-[30px] pt-[60px] pb-[80px]">
        <div className="flex flex-col gap-[40px]">
          <Reveal>
            <p style={{ ...STYLE_DISPLAY, fontSize: "clamp(36px, 10vw, 48px)", letterSpacing: "-2px", lineHeight: "1.1", color: "black" }}>
              The right hire changes everything that comes after it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ ...STYLE_MONO, fontSize: "clamp(16px, 4.5vw, 20px)", lineHeight: "1.3", color: "black" }}>
              <p>I&apos;m Tiffany Philippou, founder of Higher Standard.</p>
              <p style={{ marginTop: "10px" }}>I find the people who raise the bar for your whole company and shape the outcome, then I stay long after the offer is signed.</p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <OrangeBtn onClick={scrollToContact}>
              <p style={{ ...STYLE_MONO, fontSize: "18px", lineHeight: "20px", color: "black", whiteSpace: "nowrap" }}>
                Start working together
              </p>
            </OrangeBtn>
          </Reveal>
        </div>
      </div>

    </section>
  );
}

// ── What Higher Standard means in practice ───────────────────────────────────
const WHAT_STANDARD_ITEMS = [
  "Hire through the lens of fast-moving company experience.",
  "Start with your reality, not just the brief.",
  "Work on only a handful of roles at a time to focus on quality, bring the best value to the companies I work with.",
  "Personally understand and assess every person before sharing their name.",
  "Treat everyone I work with as a person, not a profile.",
  "Handle every step from offer to acceptance with care. The most delicate part of any hire is rarely the interview.",
  "Prioritise people over pipeline, outcomes over optics.",
  "Hire for mindset, not pedigree.",
];

const WHAT_WONT_DO_ITEMS = [
  "Send 20 CVs by Friday just to fill a quota.",
  "Drop names and disappear.",
  "Place people who look right on paper but cannot survive the reality.",
  "Write generic job descriptions.",
  "Mistake activity for judgment.",
];

// Mobile cards data (sticky stacking on small screens)
const WORKING_MOBILE_CARDS = [
  { title: "Every brief I take on is held to the same bar.", items: WHAT_STANDARD_ITEMS,   icon: "check" as const },
  { title: "What I won't do",                               items: WHAT_WONT_DO_ITEMS,     icon: "dash"  as const },
];

function WhatWorkingSection() {
  return (
    <section id="working" className="bg-[#ffedd7] w-full">

      {/* ── Mobile / tablet ── */}
      <div className="lg:hidden">
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[96px] pb-[48px]">
          <Reveal>
            <div className="text-[40px] md:text-[44px] text-black" style={STYLE_DISPLAY}>
              <p>What</p>
              <p>Higher Standard</p>
              <p>means in practice</p>
            </div>
          </Reveal>
        </div>
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pb-[96px]">
          {WORKING_MOBILE_CARDS.map((card, idx) => (
            <div
              key={card.title}
              style={{
                position: "sticky",
                top: `calc(var(--stack-top) + ${idx} * var(--stack-step))`,
                marginTop: idx === 0 ? 0 : "var(--stack-gap)",
                zIndex: idx + 1,
              }}
            >
              <HoverCard>
                <div className="bg-white flex flex-col p-[10px]">
                  <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                      <p className="text-[20px] md:text-[24px] text-black" style={STYLE_DISPLAY}>{card.title}</p>
                    </div>
                  </div>
                  <div className="border-[1.372px] border-black p-[16px] md:p-[20px] rounded-bl-[8px] rounded-br-[8px] flex flex-col gap-[16px]">
                    {card.items.map((t) => (
                      <div key={t} className="flex gap-[14px] items-start">
                        {card.icon === "check" ? <OrangeCheckbox /> : <DarkMinusIcon />}
                        <p className="flex-1 text-[16px] md:text-[18px] text-black" style={STYLE_MONO}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </div>
          ))}
          <div style={{ height: "80px" }} />
        </div>
      </div>

      {/* ── Desktop: title left, two cards right ── */}
      <div
        className="hidden lg:flex max-w-[1440px] mx-auto"
        style={{ gap: "30px", padding: "96px 30px", alignItems: "flex-start" }}
      >
        {/* Left: sticky title — 675px (matches right card width exactly) */}
        <div style={{ width: "675px", maxWidth: "675px", flexShrink: 0, position: "sticky", top: "var(--stack-top)" }}>
          <Reveal>
            <div className="text-[52px] text-black" style={STYLE_DISPLAY}>
              <p>What</p>
              <p>Higher Standard</p>
              <p>means in practice</p>
            </div>
          </Reveal>
        </div>

        {/* Right: two card panels stacked */}
        <div className="flex-1 min-w-0 flex flex-col gap-[20px]">
          {/* Card 1 */}
          <Reveal>
            <HoverCard>
              <div className="bg-white flex flex-col p-[10px]">
                <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="text-[32px] text-black" style={STYLE_DISPLAY}>Every brief I take on is held to the same bar.</p>
                  </div>
                </div>
                <div className="border-[1.372px] border-black p-[30px] rounded-bl-[8px] rounded-br-[8px] flex flex-col gap-[20px]">
                  {WHAT_STANDARD_ITEMS.map((t) => (
                    <div key={t} className="flex gap-[20px] items-start">
                      <OrangeCheckbox />
                      <p className="flex-1 text-[20px] text-black" style={STYLE_MONO}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCard>
          </Reveal>

          {/* Card 2 */}
          <Reveal delay={80}>
            <HoverCard>
              <div className="bg-white flex flex-col p-[10px]">
                <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="text-[32px] text-black" style={STYLE_DISPLAY}>What I won&apos;t do</p>
                  </div>
                </div>
                <div className="border-[1.372px] border-black p-[30px] rounded-bl-[8px] rounded-br-[8px] flex flex-col gap-[20px]">
                  {WHAT_WONT_DO_ITEMS.map((t) => (
                    <div key={t} className="flex gap-[20px] items-start">
                      <DarkMinusIcon />
                      <p className="flex-1 text-[20px] text-black" style={STYLE_MONO}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCard>
          </Reveal>
        </div>
      </div>

    </section>
  );
}

// ── Partners ──────────────────────────────────────────────────────────────────
const partnerLogosRow1 = [imgImage30, imgImage31, imgImage32, imgImage33, imgImage36, imgImage34, imgImage35, imgImage37];
const partnerLogosRow2 = [imgImage38, imgImage39, imgImage40, imgImage41, imgImage42, imgImage43, imgImage44, imgImage45];

function PartnerLogo({ src, small }: { src: string; small?: boolean }) {
  const w = small ? 140 : 220;
  const h = small ? 80  : 120;
  return (
    <div className="border-r border-black flex items-center justify-center shrink-0 p-[14px] md:p-[20px] transition-opacity duration-200 hover:opacity-50"
         style={{ width: w, height: h }}>
      <div className="w-full h-full" style={{
        backgroundColor: "#4d453b",
        maskImage: `url('${src}')`, maskRepeat:"no-repeat", maskSize:"contain", maskPosition:"center",
        WebkitMaskImage: `url('${src}')`, WebkitMaskRepeat:"no-repeat", WebkitMaskSize:"contain", WebkitMaskPosition:"center",
      }} />
    </div>
  );
}

function PartnersSection() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const u = () => setSmall(window.innerWidth < 1020);
    u(); window.addEventListener("resize", u, { passive: true });
    return () => window.removeEventListener("resize", u);
  }, []);

  return (
    <section id="partners" className="bg-[#ffedd7] w-full overflow-hidden py-[40px]">
      <div className="flex border-t border-b border-black overflow-hidden mb-[-1px]">
        <div className="flex animate-marquee">
          {[...partnerLogosRow1, ...partnerLogosRow1].map((src, i) => <PartnerLogo key={i} src={src} small={small} />)}
        </div>
      </div>
      <div className="flex border-t border-b border-black overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {[...partnerLogosRow2, ...partnerLogosRow2].map((src, i) => <PartnerLogo key={i} src={src} small={small} />)}
        </div>
      </div>
    </section>
  );
}

// ── Roles ─────────────────────────────────────────────────────────────────────
const ROLES_DESCRIPTION = "Venture-backed startups, from seed to Series B. Companies where every senior hire shapes the culture and the trajectory. I know this environment from the inside, and I know what the right person looks like at every stage of growth.";

const ROLE_ACCORDION_DATA = [
  { name: "Marketing", items: "CMO, VP Marketing, Head of Marketing." },
  { name: "Growth",    items: "VP Growth, Head of Growth." },
  { name: "Product",   items: "CPO, VP Product, Head of Product, Product Lead." },
];

function RoleAccordionRow({
  role, index, isFirst, isLast, isOpen, anyOpen, onOpen, onClose,
}: {
  role: typeof ROLE_ACCORDION_DATA[0];
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isOpen: boolean;
  anyOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  // All closed → white. One open → open row = white, others = grey.
  const bg = anyOpen && !isOpen ? "#e0e0e0" : "#ffffff";

  const titleRadius = isFirst
    ? "8px 8px 0 0"
    : !isLast ? "0" : isOpen ? "0" : "0 0 8px 8px";

  return (
    <div
      style={{
        position: "relative",
        marginTop: isFirst ? 0 : "-1.372px",
        zIndex: isOpen ? 10 : (ROLE_ACCORDION_DATA.length - index),
        backgroundColor: bg,
        transition: "background-color 0.25s ease",
      }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {/* Title row */}
      <div
        className="flex items-center gap-[30px] p-[24px] md:p-[30px]"
        style={{
          border: "1.372px solid black",
          borderRadius: titleRadius,
          borderBottom: isOpen ? "none" : "1.372px solid black",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p className="flex-1 text-[24px] md:text-[28px] text-black" style={STYLE_DISPLAY}>
          {role.name}
        </p>
        {/* Arrow rotates 90° when open */}
        <div style={{
          backgroundColor: "#fb8349", width: 24, height: 24, flexShrink: 0,
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }}>
          <div style={{ position: "absolute", inset: 0, border: "0.4px solid black", borderRadius: "4px" }} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ position: "relative" }}>
            <path d="M2 5H8M6 3L8 5L6 7" stroke="black" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Sub-row — grid 0fr → 1fr slide */}
      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <div style={{ overflow: "hidden", backgroundColor: bg }}>
          <div className="p-[24px] md:p-[30px]" style={{
            border: "1.372px solid black", borderTop: "none",
            borderRadius: isLast ? "0 0 8px 8px" : "0",
            backgroundColor: bg,
          }}>
            <p className="text-[20px] md:text-[24px] text-black" style={STYLE_MONO}>
              {role.items}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RolesSection() {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <section id="roles" className="bg-[#ffedd7] w-full py-[96px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[48px] md:mb-[72px]" style={STYLE_DISPLAY}>
            Roles that I hire for
          </p>
        </Reveal>

        <div className="flex flex-col xl:flex-row gap-[30px] items-start">
          {/* Left: accordion role list */}
          <Reveal className="xl:w-[671px] xl:shrink-0 w-full">
            <div className="bg-white p-[10px]">
              {ROLE_ACCORDION_DATA.map((role, i) => (
                <RoleAccordionRow
                  key={role.name}
                  role={role}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === ROLE_ACCORDION_DATA.length - 1}
                  isOpen={openRole === role.name}
                  anyOpen={openRole !== null}
                  onOpen={() => setOpenRole(role.name)}
                  onClose={() => setOpenRole(null)}
                />
              ))}
            </div>
          </Reveal>

          {/* Right: description + CTA */}
          <Reveal delay={100} className="flex-1 flex flex-col gap-[30px] md:gap-[40px]">
            <p className="text-[18px] md:text-[24px] xl:text-[28px] text-black" style={STYLE_MONO}>
              {ROLES_DESCRIPTION}
            </p>
            <OrangeBtn onClick={scrollToContact}>
              <p className="text-[18px] md:text-[20px] xl:text-[24px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                Start working together
              </p>
            </OrangeBtn>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
// All 8 testimonials — shown in scattered grid on desktop, carousel on mobile
const TESTIMONIALS = [
  {
    name: "Tom Picarony", title: "Head of Expansion",
    photo: null as string | null, bg: "#e0ddd3",
    text: [
      "Thanks to Tiffany's invaluable assistance, we've successfully hired our UK team.",
      "Her leadership, strategic insight, and dedication were instrumental in assembling a top-notch team ready to tackle any challenge.",
    ],
  },
  {
    name: "Maria Monks", title: "Fractional CMO",
    photo: "/photo_maria.jpeg" as string | null, bg: "#edead6",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across multiple startups. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment.",
    ],
  },
  {
    name: "Ruben Tadmor", title: "Founder",
    photo: null as string | null, bg: "#d4dde0",
    text: [
      "Tiffany is by far the best experience I've had working with external support for recruitment — really felt like an extension of the hiring team.",
    ],
  },
  {
    name: "Gastón Tourn", title: "Chief Growth Officer, Oddbox",
    photo: "/photo_gaston.jpeg" as string | null, bg: "#c1c497",
    text: [
      "Tiffany is an outstanding talent professional with a thoughtful, personal approach. She spends significant time understanding candidates and ensuring opportunities align perfectly with their goals.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need. Tiffany excels at finding candidates who may not be actively seeking a change and persuading them to consider new, exciting opportunities.",
    ],
  },
  {
    name: "Govind Balakrishnan", title: "Co-founder, Gibran",
    photo: "/photo_govind.jpeg" as string | null, bg: "#ffffff",
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
      "Thanks to our collaboration, we have a phenomenal tight-knit team, investment from tier 1 Silicon Valley investors and partnerships with top media outlets. We trust her fully and will work with her again.",
    ],
  },
  {
    name: "Martin Leguay", title: "CEO, Touchnote",
    photo: null as string | null, bg: "#d0c8c0",
    text: [
      "Working with Tiffany has been great, she's helped us on multiple briefs and has been so effective in providing the right candidates within such a fast turnaround.",
      "Whether for full time or temp requirements, Tiffany has a vast network of quality candidates to reach out to.",
    ],
  },
  {
    name: "Jonathan Canizales", title: "Chief of Staff, Mindgard",
    photo: "/photo_jonathan.jpeg" as string | null, bg: "#90b0bb",
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process. I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process.",
    ],
  },
  {
    name: "Haralds Gabrans Zukovs", title: "Head of Growth, Mindgard",
    photo: null as string | null, bg: "#c8d4c8",
    text: [
      "Tiffany's expert guidance was invaluable in navigating my career transition.",
      "Her personalised advice and unwavering support empowered me to confidently land the perfect next step. I highly recommend her services to anyone seeking a career change partner.",
    ],
  },
];

// Shared card inner layout (used on both desktop grid and mobile carousel)
function TestimonialCardInner({ t }: { t: typeof TESTIMONIALS[0] }) {
  const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div style={{ backgroundColor: t.bg, padding: "6px", height: "100%" }}>
      {/* Header: photo + name/title */}
      <div style={{ display: "flex", marginBottom: "-0.823px", flexShrink: 0 }}>
        <div style={{ width: 110, height: 96, flexShrink: 0, border: "0.6px solid black", borderRadius: "4.8px 0 0 0", overflow: "hidden" }}>
          {t.photo ? (
            <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#4d453b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...STYLE_DISPLAY, fontSize: 24, color: "white" }}>{initials}</span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ border: "0.823px solid black", borderLeft: "none", borderBottom: "none", borderRadius: "0 4.8px 0 0", flex: 1, display: "flex", alignItems: "center", padding: "0 14px" }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: 15, color: "black", lineHeight: 1.1 }}>{t.name}</p>
          </div>
          <div style={{ border: "0.823px solid black", borderLeft: "none", flex: 1, display: "flex", alignItems: "center", padding: "0 14px" }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: 13, color: "black", lineHeight: 1.1 }}>{t.title}</p>
          </div>
        </div>
      </div>
      {/* Text body */}
      <div style={{ border: "0.6px solid black", borderTop: "none", borderRadius: "0 0 4.8px 4.8px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {t.text.map((para, i) => (
          <p key={i} style={{ ...STYLE_MONO, fontSize: 14, color: "black", lineHeight: 1.45 }}>{para}</p>
        ))}
      </div>
    </div>
  );
}

// Desktop: single card with hover-to-foreground
function TestimonialCard({ t, delay = 0 }: { t: typeof TESTIMONIALS[0]; delay?: number }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.05);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        position: "relative",
        zIndex: hov ? 10 : 1,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        transform: hov ? "scale(1.03) translateY(-5px)" : "scale(1)",
        boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.14)" : "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}>
        <TestimonialCardInner t={t} />
      </div>
    </div>
  );
}

// Mobile: swipeable carousel
function TestimonialsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [dragging,  setDragging]  = useState(false);
  const go = (i: number) => setActiveIdx(Math.max(0, Math.min(TESTIMONIALS.length - 1, i)));

  return (
    <div className="pb-[60px]">
      <div
        className="overflow-hidden"
        onTouchStart={(e) => { setDragStart(e.touches[0].clientX); setDragging(true); }}
        onTouchMove={(e)  => { if (dragging) setDragDelta(e.touches[0].clientX - dragStart); }}
        onTouchEnd={() => {
          if (dragDelta > 60) go(activeIdx - 1);
          else if (dragDelta < -60) go(activeIdx + 1);
          setDragDelta(0); setDragging(false);
        }}
      >
        <div style={{
          display: "flex",
          transform: `translateX(calc(-${activeIdx * 100}% + ${dragDelta}px))`,
          transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ minWidth: "100%" }}>
              <TestimonialCardInner t={t} />
            </div>
          ))}
        </div>
      </div>
      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-[8px] pt-[20px]">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className="rounded-full transition-all duration-250"
            style={{ width: i === activeIdx ? "20px" : "8px", height: "8px", backgroundColor: i === activeIdx ? "#000" : "rgba(0,0,0,0.25)" }}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#ffedd7] w-full py-[96px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[48px] md:mb-[72px]" style={STYLE_DISPLAY}>
            Testimonials
          </p>
        </Reveal>

        {/* Desktop: 4-column scattered grid, hover brings card to foreground */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-[12px] lg:gap-[16px]">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} delay={i * 80} />
          ))}
        </div>

        {/* Mobile: swipe carousel */}
        <div className="md:hidden">
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
// Subscribe button: explicitly 50px tall (matches the email input height)
function SubscribeBtn() {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex flex-col items-start p-[6px] w-fit shrink-0 h-[50px]"
      style={{ backgroundColor: hov ? "#FF9A6A" : "#fb8349", transition: "background-color 0.2s ease" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <button
        className="border border-black flex flex-1 items-center px-[14px] rounded-[4px] cursor-pointer"
        style={{ backgroundColor: "transparent" }}
      >
        <p className="text-[18px] md:text-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>Subscribe</p>
      </button>
    </div>
  );
}

const NEWSLETTER_ARTICLES = [
  {
    title: "Why great hires fail after six months",
    excerpt: "The VP Product who left, the questions worth asking first, and this week's classifieds.",
  },
  {
    title: "Good people leave quietly",
    excerpt: "On the hire that breaks startups and the kind of leader that holds them together",
  },
  {
    title: "Mindset is\nnon-negotiable",
    excerpt: "Why the unobvious hire usually wins",
  },
];

function NewsletterSection() {
  return (
    <section className="bg-[#ffedd7] w-full py-[96px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">

        {/* Centred header */}
        <Reveal className="flex flex-col items-center gap-[32px] md:gap-[40px] mb-[52px] md:mb-[60px]">
          <p className="text-[36px] md:text-[52px] text-black text-center" style={STYLE_DISPLAY}>
            Newsletter Higher
          </p>
          <p className="text-[18px] md:text-[24px] text-black text-center" style={STYLE_MONO}>
            Honest writing about growth, leadership and building<br />inside fast-moving companies.
          </p>
        </Reveal>

        {/* Email subscribe row */}
        <Reveal delay={60} className="flex flex-col sm:flex-row gap-[10px] items-stretch sm:items-center justify-center mb-[52px] md:mb-[60px]">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#949494] rounded-[4px] h-[50px] px-[20px] w-full sm:w-[403px] text-[16px] text-black bg-transparent outline-none hover:border-black/60 focus:border-[#fb8349] transition-colors duration-200 placeholder:text-[#767676]"
            style={STYLE_DISPLAY}
          />
          {/* Subscribe button — explicitly 50px tall to match the input */}
          <SubscribeBtn />
        </Reveal>

        {/* Article cards — 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
          {NEWSLETTER_ARTICLES.map((article, i) => (
            <Reveal key={article.title} delay={i * 80}>
              <HoverCard className="h-full">
                <div className="bg-white flex flex-col p-[10px] h-full">
                  <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                      <p className="text-[20px] md:text-[24px] text-black whitespace-pre-line" style={STYLE_DISPLAY}>{article.title}</p>
                    </div>
                  </div>
                  <div className="border-[1.372px] border-black flex flex-1 flex-col justify-between p-[20px] rounded-bl-[8px] rounded-br-[8px] gap-[20px]">
                    <p className="text-[16px] md:text-[20px] text-black" style={STYLE_MONO}>{article.excerpt}</p>
                    <div className="bg-[#ffedd7] p-[4px] self-start">
                      <button className="border border-black rounded-[4px] px-[12px] py-[10px] bg-[#ffedd7] cursor-pointer hover:bg-[#f0e4cf] transition-colors duration-150">
                        <p className="text-[16px] md:text-[18px] text-black whitespace-nowrap" style={STYLE_MONO}>read now</p>
                      </button>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[96px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">

        {/* TOP ROW: Headline (left) + Subtitle (right, bottom-aligned on desktop) */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-[24px] lg:gap-[35px] mb-[52px] lg:mb-[80px]">
          <Reveal className="lg:shrink-0 lg:w-[655px]">
            <div className="text-[48px] md:text-[52px] lg:text-[60px] text-black" style={STYLE_DISPLAY}>
              Let&apos;s talk
            </div>
          </Reveal>
          <Reveal delay={80} className="flex-1">
            <div className="text-[18px] lg:text-[24px] text-black" style={STYLE_MONO}>
              <p>I&apos;d love to hear what you&apos;re building</p>
              <p>or just have a good conversation with you</p>
            </div>
          </Reveal>
        </div>

        {/* BOTTOM ROW: Contacts (left) + Form (right) */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-[120px] lg:gap-[35px]">

          {/* Left: contact info */}
          <Reveal className="lg:shrink-0 lg:w-[655px] flex flex-col gap-[24px] lg:gap-[30px] text-[16px] text-black">
            <div className="flex flex-col gap-[16px]">
              <p style={STYLE_DISPLAY}>Contacts</p>
              <div className="flex flex-col gap-[10px]" style={STYLE_MONO}>
                <a href="https://higherstandard.co" className="hover:underline underline-offset-2 transition-all duration-150">higherstandard.co</a>
                <a href="mailto:tiffany@higherstandard.co" className="hover:underline underline-offset-2 transition-all duration-150">tiffany@higherstandard.co</a>
              </div>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p style={STYLE_DISPLAY}>Office</p>
              <p style={STYLE_MONO}>20-22 Wenlock Road<br />London, England, N1 7GU</p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p style={STYLE_DISPLAY}>Socials</p>
              <div className="flex flex-col gap-[6px]">
                {[
                  { href: "https://www.linkedin.com/company/higher-standard/", label: "Higher Standard" },
                  { href: "https://www.linkedin.com/in/tiffany-philippou/",    label: "Tiffany Philippou" },
                ].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="flex gap-[6px] items-center hover:opacity-60 transition-opacity duration-150" style={STYLE_MONO}>
                    <img src={imgLinkedInIcon} alt="LinkedIn" className="w-[16px] h-[16px]" />
                    <span className="text-[16px]">{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120} className="flex-1 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[30px]">

              {/* Name & Email — underline style, h-[64px] per Figma */}
              <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[30px]">
                {[{ type: "text", label: "Your Name & Surname" }, { type: "email", label: "Your Email" }].map((f) => (
                  <div key={f.label} className="flex flex-col gap-[6px] flex-1 h-[64px]">
                    <label className="text-[16px] text-black shrink-0" style={STYLE_DISPLAY}>{f.label}</label>
                    <input
                      type={f.type}
                      className="w-full flex-1 border-b border-black/40 bg-transparent outline-none text-[16px] text-black pb-[6px] transition-colors duration-200 hover:border-black focus:border-[#fb8349]"
                      style={STYLE_MONO}
                    />
                  </div>
                ))}
              </div>

              {/* Textarea — full border, gray; hover darkens, focus turns orange */}
              <div className="flex flex-col gap-[15px]">
                <label className="text-[16px] text-black" style={STYLE_DISPLAY}>Tell me about you</label>
                <textarea
                  className="w-full h-[160px] md:h-[197px] border border-[#949494] rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] text-black resize-none transition-colors duration-200 hover:border-black/50 focus:border-[#fb8349]"
                  style={STYLE_MONO}
                />
              </div>
            </div>

            <OrangeBtn>
              <p className="text-[18px] md:text-[20px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>Let&apos;s talk</p>
            </OrangeBtn>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="bg-[#4d453b] w-full overflow-hidden relative"
      style={{ minHeight: "200px", height: "clamp(200px, 28vw, 400px)" }}
    >
      {/* Large "Higher Standard" wordmark */}
      <p
        className="absolute left-[16px] md:left-[30px] top-[20px] md:top-[30px] text-[#eaeae5] whitespace-nowrap"
        style={{
          ...STYLE_DISPLAY,
          fontSize: "clamp(36px, 8.75vw, 126px)",
          letterSpacing: "clamp(-0.72px, -0.2vw, -2.52px)",
          lineHeight: 1,
        }}
      >
        Higher Standard
      </p>

      {/* Bottom bar */}
      <div
        className="absolute bottom-[16px] md:bottom-[30px] left-[16px] right-[16px] md:left-[30px] md:right-[30px] flex flex-col md:flex-row items-start md:items-end gap-[6px] text-white"
      >
        {/* Left */}
        <div className="md:flex-1">
          <p
            className="text-[11px] md:text-[14px] text-[#eaeae5]"
            style={{ ...STYLE_DISPLAY, letterSpacing: "-0.42px" }}
          >
            All rights reserved.
          </p>
        </div>
        {/* Centre — copyright */}
        <div className="flex gap-[4px] md:gap-[6px] items-baseline md:justify-center md:flex-1">
          <span className="text-[18px] md:text-[28px] text-[#eaeae5]" style={STYLE_DISPLAY}>©</span>
          <span
            className="text-[13px] md:text-[20px] text-[#eaeae5]"
            style={{ ...STYLE_DISPLAY, letterSpacing: "-1px" }}
          >
            2026 Higher Standards
          </span>
        </div>
        {/* Right */}
        <div className="md:flex-1 md:flex md:justify-end">
          <a
            className="text-[11px] md:text-[14px] text-[#eaeae5] hover:opacity-60 transition-opacity duration-150"
            href="https://www.unknw.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...STYLE_DISPLAY, letterSpacing: "-0.7px" }}
          >
            designed by UNKNW
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Prevent body scroll while intro overlay is active
  useEffect(() => {
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}
      {/* Page is always rendered (opacity 1) — intro overlay sits on top */}
      <div className="flex flex-col w-full">
        <Navbar />
        <HeroSection />
        <PartnersSection />
        <WhatWorkingSection />
        <RolesSection />
        <TestimonialsSection />
        <NewsletterSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
