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

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "What's working", href: "working" },
  { label: "Partners",       href: "partners" },
  { label: "Roles",          href: "roles" },
  { label: "Testimonials",   href: "testimonials" },
];

function Navbar() {
  const [pastHero, setPastHero]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnH, setBtnH] = useState(46);
  const [navHov, setNavHov] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (btnRef.current) setBtnH(btnRef.current.getBoundingClientRect().height);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAndGo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
  };

  const navBg = pastHero ? "#fb8349" : "white";

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#ffedd7] flex items-center justify-between px-[16px] md:px-[30px] py-[14px] md:py-[20px] w-full">
        <img
          src="/TP_logo.svg"
          alt="TPRecruitment"
          className="block w-auto cursor-pointer"
          style={{ height: `${btnH}px`, maxHeight: "46px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Desktop CTA */}
        <div
          className="hidden md:flex flex-col items-start p-[6px]"
          style={{ backgroundColor: navHov ? "#FF9A6A" : navBg, transition: "background-color 0.2s ease" }}
          onMouseEnter={() => setNavHov(true)}
          onMouseLeave={() => setNavHov(false)}
        >
          <button
            ref={btnRef}
            onClick={scrollToContact}
            className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer"
            style={{ backgroundColor: "transparent" }}
          >
            <p className="text-[18px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
              Start a conversation
            </p>
          </button>
        </div>

        {/* Mobile "Menu" button */}
        <div
          className="flex md:hidden flex-col items-start p-[6px] ml-auto transition-colors duration-300"
          style={{ backgroundColor: navBg }}
        >
          <button
            ref={btnRef}
            onClick={() => setMenuOpen(true)}
            className="border border-black flex items-center p-[10px] rounded-[4px] cursor-pointer"
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
function HeroSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[48px] md:pt-[80px] lg:pt-[100px] pb-[60px]">

        {/* Headline — fades in immediately on mount */}
        <Reveal y={20} className="mb-[40px] md:mb-[60px]">
          <p className="text-[36px] md:text-[48px] lg:text-[60px] text-black max-w-[1155px]" style={STYLE_DISPLAY}>
            Recruitment is messy, human, and brutal. Most recruiters hide from that. I&nbsp;don&apos;t.
          </p>
        </Reveal>

        {/* Two equal-width cards — 675px each at 1440px viewport */}
        <div className="flex flex-col md:flex-row gap-[16px] md:gap-[30px] md:items-stretch">

          {/* Left: Usual process */}
          <Reveal delay={100} className="flex flex-1 min-w-0 md:max-w-[675px] md:self-stretch">
            <HoverCard className="flex w-full">
              <div className="bg-[#d1d1d1] flex flex-col w-full p-[10px]">
                <div className="flex items-start shrink-0 w-full" style={{ marginBottom: "-1.372px" }}>
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="shrink-0 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>Usual process:</p>
                  </div>
                </div>
                <div className="flex flex-1 min-h-0">
                  <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[24px] md:gap-[30px] items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
                    <div className="flex flex-col gap-[16px] md:gap-[20px] items-start w-full">
                      {["You fill out a brief.", "You get CVs.", "You do the thinking."].map((t) => (
                        <div key={t} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                          <div className="shrink-0 border border-[#4d453b] rounded-[2px] w-[18px] h-[18px] mt-[3px]" />
                          <p className="flex-1 text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>{t}</p>
                        </div>
                      ))}
                    </div>
                    <p className="w-full text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>Sound familiar?</p>
                  </div>
                </div>
              </div>
            </HoverCard>
          </Reveal>

          {/* Right: Working with me */}
          <Reveal delay={180} className="flex flex-1 min-w-0 md:max-w-[675px] md:self-stretch">
            <HoverCard className="flex w-full">
              <div className="bg-white flex flex-col w-full p-[10px]">
                <div className="flex items-start shrink-0 w-full" style={{ marginBottom: "-1.372px" }}>
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="flex-1 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>Working with me:</p>
                  </div>
                </div>
                <div className="flex flex-1 min-h-0">
                  <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[20px] md:gap-[40px] items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
                    <div className="flex flex-col gap-[14px] md:gap-[20px] items-start w-full">
                      {["You have a conversation.", "You meet people I believe in."].map((t) => (
                        <div key={t} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                          <OrangeCheckbox />
                          <p className="flex-1 text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>{t}</p>
                        </div>
                      ))}
                      <div className="flex gap-[16px] md:gap-[20px] items-start w-full">
                        <OrangeCheckbox />
                        <div className="flex-1 text-[18px] md:text-[24px] text-black" style={{ ...STYLE_MONO, lineHeight: "1.1" }}>
                          <p>The decision is up to you —</p>
                          <p>but you never carry that weight alone.</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-[18px] md:text-[24px] text-black" style={{ ...STYLE_MONO, lineHeight: "1.1" }}>
                      <p>Good hiring is a collaboration,</p>
                      <p>not a transaction.</p>
                    </div>
                    <div className="md:mt-auto">
                      <OrangeBtn onClick={scrollToContact}>
                        <p className="text-[18px] md:text-[24px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                          Start working together
                        </p>
                      </OrangeBtn>
                    </div>
                  </div>
                </div>
              </div>
            </HoverCard>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ── What's Working ────────────────────────────────────────────────────────────
const WORKING_CARDS = [
  { title: "My standards",   icon: "check" as const, items: [
    "Personally understand and assess every candidate before sharing their name.",
    "Hire through the lens of fast-moving company experience.",
    "Only hand over work I can fully stand behind.",
    "Treat candidates and hiring managers as people, not profiles or clients.",
  ]},
  { title: "Communication",  icon: "check" as const, items: [
    "Start with your reality, not just the brief.",
    "Understand your culture, chaos level, stage, and what the right hire actually looks like.",
    "Tell you what the market says, even when it is not what you want to hear.",
    "Give honest feedback throughout.",
  ]},
  { title: "After the offer", icon: "check" as const, items: [
    "Stay involved after placement.",
    "Measure outcomes, not speed.",
    "Prioritize people over pipeline.",
    "Prioritize outcomes over optics.",
  ]},
  { title: "What I won't do", icon: "cross" as const, items: [
    "Send 20 CVs by Friday just to fill a quota.",
    "Drop names and disappear.",
    "Place people who look right on paper but cannot survive the reality.",
    "Write generic job descriptions.",
    "Mistake activity for judgment.",
  ]},
];

const BODY_TEXT = (
  <>
    <p className="mb-[1.08em]">
      I know that growth asks a lot of a company. The pace. The pressure. The decisions that shape what comes next. None of it works without the right people around the table.
    </p>
    <p className="mb-[1.08em]">
      That&apos;s why I work in partnership with ambitious teams to find the people who can carry that responsibility, people who bring judgement, energy and ownership, people who understand what it takes to build inside a fast-moving company, people who can help shape the outcome.
    </p>
    <p>The strongest teams are built in collaboration.</p>
  </>
);

function WhatWorkingSection() {
  return (
    <section id="working" className="bg-[#ffedd7] w-full">

      {/* ── Mobile / tablet ── */}
      <div className="lg:hidden">
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[60px] pb-[40px]">
          <Reveal className="flex flex-col gap-[24px]">
            <div className="text-[36px] md:text-[44px] text-black" style={STYLE_DISPLAY}>
              <p>What&apos;s working</p>
              <p>with me looks like</p>
            </div>
            <div className="text-[16px] md:text-[20px] text-black" style={STYLE_MONO}>{BODY_TEXT}</div>
          </Reveal>
        </div>

        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
          {WORKING_CARDS.map((card, idx) => (
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
                <SectionCard title={card.title} expanded>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    {card.items.map((t) => <CheckItem key={t} icon={card.icon} text={t} />)}
                  </div>
                </SectionCard>
              </HoverCard>
            </div>
          ))}
          <div style={{ height: "300px" }} />
        </div>
      </div>

      {/* ── Desktop: two equal columns (each 675px at 1440px viewport) ── */}
      <div
        className="hidden lg:flex max-w-[1440px] mx-auto"
        style={{ gap: "30px", padding: "60px 30px", alignItems: "flex-start" }}
      >
        {/* Left: sticky text — flex-1 = 675px at 1440px */}
        <Reveal
          className="flex-1 min-w-0 flex flex-col gap-[40px] items-start"
          style={{ position: "sticky", top: "var(--stack-top)" }}
        >
          <div className="text-[52px] text-black" style={STYLE_DISPLAY}>
            <p>What&apos;s working</p>
            <p>with me looks like</p>
          </div>
          <div className="text-[24px] text-black" style={STYLE_MONO}>{BODY_TEXT}</div>
        </Reveal>

        {/* Right: sticky stacking cards — flex-1 = 675px at 1440px */}
        <div className="flex-1 min-w-0">
          {WORKING_CARDS.map((card, idx) => (
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
                <SectionCard title={card.title} expanded>
                  <div className="flex flex-col gap-[20px] items-start w-full">
                    {card.items.map((t) => <CheckItem key={t} icon={card.icon} text={t} />)}
                  </div>
                </SectionCard>
              </HoverCard>
            </div>
          ))}
          <div style={{ height: "600px" }} />
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
    const u = () => setSmall(window.innerWidth < 768);
    u(); window.addEventListener("resize", u, { passive: true });
    return () => window.removeEventListener("resize", u);
  }, []);

  return (
    <section id="partners" className="bg-[#ffedd7] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]" style={STYLE_DISPLAY}>
            My partners &amp; collaborators
          </p>
        </Reveal>
      </div>
      <Reveal y={16}>
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
      </Reveal>
    </section>
  );
}

// ── Roles ─────────────────────────────────────────────────────────────────────
const ROLES = [
  { title: "Commercial, Growth & Go-to-market",
    description: "Experienced leaders who drive ambitious revenue results — not just manage them." },
  { title: "Early-stage & First-Function Hires",
    description: "The entrepreneurial mindset isn't common. I find the person with it to build — not just execute even when the structure isn't there yet." },
  { title: "Marketing, Creative & Design",
    description: "Full-time and contract. The people who make what you're building impossible to ignore and support your growth." },
];

function RolesSection() {
  return (
    <section id="roles" className="bg-[#ffedd7] w-full py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]" style={STYLE_DISPLAY}>
            Roles that I hire for
          </p>
        </Reveal>

        {/* Mobile: sticky stacking */}
        <div className="md:hidden">
          {ROLES.map((role, i) => (
            <div
              key={role.title}
              style={{
                position: "sticky",
                top: `calc(var(--stack-top) + ${i} * var(--stack-step))`,
                marginTop: i === 0 ? 0 : "var(--stack-gap)",
                zIndex: i + 1,
              }}
            >
              <HoverCard>
                <div className="bg-white flex flex-col p-[10px]">
                  <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] rounded-tl-[8px] rounded-tr-[8px]">
                      <p className="flex-1 text-[22px] text-black" style={STYLE_DISPLAY}>{role.title}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] rounded-bl-[8px] rounded-br-[8px]">
                      <p className="w-full text-[18px] text-black" style={STYLE_MONO}>{role.description}</p>
                    </div>
                  </div>
                </div>
              </HoverCard>
            </div>
          ))}
          <div style={{ height: "300px" }} />
        </div>

        {/* Tablet + desktop: horizontal flex row */}
        <div className="hidden md:flex flex-row gap-[30px] items-stretch">
          {ROLES.map((role, i) => (
            <Reveal key={role.title} delay={i * 80} className="flex-1 basis-0 min-w-0">
              <HoverCard className="h-full">
                <div className="bg-white flex flex-col h-full p-[10px]">
                  <div className="flex items-start mb-[-1.372px]">
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                      <p className="flex-1 text-[22px] md:text-[28px] text-black" style={STYLE_DISPLAY}>{role.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-1">
                    <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                      <p className="w-full text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>{role.description}</p>
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

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Gastón Tourn", title: "Chief Marketing Officer, Curio",
    photo: "/photo_gaston.jpeg", bg: "#c1c497",
    text: [
      "Tiffany's took the time to understand my interests and introduced the opportunity when she saw it was a perfect match. This refreshing approach builds trust and confidence. I was considering other opportunities at the time, but I chose the role at Curio partly because of the assurance Tiffany provided during the hiring process.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need.",
    ],
  },
  {
    name: "Jonathan Canizales", title: "Chief of Staff, Mindgard",
    photo: "/photo_jonathan.jpeg", bg: "#90b0bb",
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process.",
      "I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process. Most importantly, the entire process was incredibly fast, which was a huge plus. I would definitely work with Tiffany again and highly recommend her to anyone in need of a top-notch recruiter.",
    ],
  },
  {
    name: "Maria Monks", title: "IQ Capital",
    photo: "/photo_maria.jpeg", bg: "#edead6",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across the IQ Capital portfolio. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment, and building teams, related.",
    ],
  },
  {
    name: "Govind Balakrishnan", title: "Co-founder, Curio",
    photo: "/photo_govind.jpeg", bg: "#ffffff",
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires at Curio. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
      "Thanks to our collaboration, we have a phenomenal tight-knit team, investment from tier 1 Silicon Valley investors and partnerships with top media outlets. We trust her fully and will work with her again.",
    ],
  },
];

// Tablet + desktop: hover-expand row (thefirstthelast.agency style)
// Uses CSS grid-template-rows trick for buttery-smooth height animation.
function TestimonialRow({ t, idx }: { t: typeof TESTIMONIALS[0]; idx: number }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      style={{ borderTop: "1.372px solid black", position: "relative", cursor: "default" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Sliding background — lives BELOW the row, so clipping isn't needed on outer div */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: t.bg,
          transform: hov ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Row header: index · name · title */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", padding: "clamp(18px,2vw,28px) 30px" }}>
        <span style={{ ...STYLE_MONO, fontSize: "15px", color: "black", opacity: 0.4, width: "clamp(44px,4.5vw,72px)", flexShrink: 0 }}>
          {String(idx + 1).padStart(2, "0")}.
        </span>

        <p style={{ ...STYLE_DISPLAY, fontSize: "clamp(22px, 3.2vw, 52px)", color: "black", flex: 1 }}>
          {t.name}
        </p>

        <p style={{ ...STYLE_MONO, fontSize: "clamp(12px,1.1vw,15px)", color: "black", opacity: hov ? 0 : 0.5, transition: "opacity 0.3s ease", flexShrink: 0, maxWidth: "clamp(140px,20vw,280px)", textAlign: "right" }}>
          {t.title}
        </p>
      </div>

      {/* Expanded content — CSS grid trick: 0fr → 1fr animates to EXACT content height, no jumpiness */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateRows: hov ? "1fr" : "0fr",
          transition: "grid-template-rows 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "clamp(20px,2.5vw,36px)", padding: "0 30px 32px clamp(44px,4.5vw,102px)", alignItems: "flex-start" }}>
            <img
              src={t.photo}
              alt={t.name}
              style={{ width: "clamp(80px,8vw,130px)", height: "clamp(80px,8vw,130px)", objectFit: "cover", objectPosition: "top center", flexShrink: 0, border: "1.372px solid black", borderRadius: "4px" }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              {t.text.map((para, i) => (
                <p key={i} style={{ ...STYLE_MONO, fontSize: "clamp(14px,1.15vw,17px)", color: "black", lineHeight: "1.55" }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragStart,  setDragStart]  = useState(0);
  const [dragDelta,  setDragDelta]  = useState(0);
  const [dragging,   setDragging]   = useState(false);

  const go = (i: number) => setActiveIdx(Math.max(0, Math.min(TESTIMONIALS.length - 1, i)));

  return (
    <div className="pb-[60px]">
      <div
        className="overflow-hidden"
        style={{ borderTop: "1.372px solid black" }}
        onTouchStart={(e) => { setDragStart(e.touches[0].clientX); setDragging(true); }}
        onTouchMove={(e)  => { if (dragging) setDragDelta(e.touches[0].clientX - dragStart); }}
        onTouchEnd={() => {
          if (dragDelta > 60) go(activeIdx - 1);
          else if (dragDelta < -60) go(activeIdx + 1);
          setDragDelta(0); setDragging(false);
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(calc(-${activeIdx * 100}% + ${dragDelta}px))`,
            transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ minWidth: "100%", backgroundColor: t.bg }}>
              <div style={{ padding: "10px" }}>
                <div style={{ display: "flex", alignItems: "stretch", marginBottom: "-1.372px" }}>
                  <div style={{ width: "110px", height: "110px", flexShrink: 0, border: "1.372px solid black", borderRadius: "8px 0 0 0", overflow: "hidden" }}>
                    <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ border: "1.372px solid black", borderRadius: "0 8px 0 0", flex: 1, display: "flex", alignItems: "center", padding: "0 16px", marginBottom: "-1.372px" }}>
                      <p style={{ ...STYLE_DISPLAY, fontSize: "20px", color: "black" }}>{t.name}</p>
                    </div>
                    <div style={{ border: "1.372px solid black", flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
                      <p style={{ ...STYLE_DISPLAY, fontSize: "14px", color: "black" }}>{t.title}</p>
                    </div>
                  </div>
                </div>
                <div style={{ border: "1.372px solid black", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {t.text.map((para, i) => (
                    <p key={i} style={{ ...STYLE_MONO, fontSize: "16px", color: "black" }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-[20px] pt-[20px]">
        <button
          onClick={() => go(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="w-[36px] h-[36px] border border-black rounded-full flex items-center justify-center transition-colors duration-150 disabled:opacity-30 hover:bg-[#FF9A6A] hover:border-[#FF9A6A]"
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex gap-[8px] items-center">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className="rounded-full transition-all duration-250"
              style={{ width: i === activeIdx ? "20px" : "8px", height: "8px", backgroundColor: i === activeIdx ? "#000" : "rgba(0,0,0,0.25)" }}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(activeIdx + 1)}
          disabled={activeIdx === TESTIMONIALS.length - 1}
          className="w-[36px] h-[36px] border border-black rounded-full flex items-center justify-center transition-colors duration-150 disabled:opacity-30 hover:bg-[#FF9A6A] hover:border-[#FF9A6A]"
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#ffedd7] w-full">
      <div className="px-[16px] md:px-[30px] pt-[60px] pb-[24px] md:pb-[40px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black" style={STYLE_DISPLAY}>
            I could keep going.<br />But they&apos;ll say it better.
          </p>
        </Reveal>
      </div>

      {/* Mobile only: swipe carousel */}
      <div className="md:hidden">
        <TestimonialsCarousel />
      </div>

      {/* Tablet + desktop: hover-expand rows */}
      <Reveal y={16} className="hidden md:block pb-[60px]">
        <div style={{ borderBottom: "1.372px solid black" }}>
          {TESTIMONIALS.map((t, idx) => (
            <TestimonialRow key={t.name} t={t} idx={idx} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] flex flex-col lg:flex-row gap-[40px] lg:gap-[35px] lg:items-start">

        <Reveal className="lg:shrink-0 lg:w-[655px] flex flex-col gap-[40px] md:gap-[60px]">
          <div className="text-[36px] md:text-[44px] lg:text-[52px] text-black" style={STYLE_DISPLAY}>
            <p>If you&apos;ve read</p>
            <p>this far, we should</p>
            <p>probably talk</p>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col gap-[24px] md:gap-[40px] lg:gap-[30px] text-[16px] text-black">
            <div className="flex flex-col gap-[16px]">
              <p style={STYLE_DISPLAY}>Contacts</p>
              <div className="flex flex-col gap-[8px]" style={STYLE_MONO}>
                <a href="https://tprecruitment.co" className="hover:underline underline-offset-2 transition-all duration-150">tprecruitment.co</a>
                <a href="mailto:tiffany@tprecruitment.co" className="hover:underline underline-offset-2 transition-all duration-150">tiffany@tprecruitment.co</a>
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
                  { href: "https://www.linkedin.com/company/tp-recruitment/", label: "TP Recruitment" },
                  { href: "https://www.linkedin.com/in/tiffany-philippou/",   label: "Tiffany Philippou" },
                ].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                     className="flex gap-[6px] items-center hover:opacity-60 transition-opacity duration-150" style={STYLE_MONO}>
                    <img src={imgLinkedInIcon} alt="LinkedIn" className="w-[16px] h-[16px]" />
                    <span className="text-[16px]">{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex-1 flex flex-col gap-[24px] md:gap-[30px]">
          <div className="text-[18px] md:text-[22px] lg:text-[24px] text-black" style={STYLE_MONO}>
            <p>I&apos;d love to hear what you&apos;re building</p>
            <p>or just have a good conversation with you</p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[30px]">
              {[{ type: "text",  label: "Your Name & Surname" }, { type: "email", label: "Email" }].map((f) => (
                <div key={f.label} className="flex flex-col gap-[8px] flex-1">
                  <label className="text-[16px]" style={STYLE_DISPLAY}>{f.label}</label>
                  <input type={f.type}
                    className="w-full border-b-[1.372px] border-black bg-transparent outline-none text-[16px] pb-[8px] transition-colors duration-150 focus:border-[#fb8349]"
                    style={STYLE_MONO}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px]" style={STYLE_DISPLAY}>Tell me about you</label>
              <textarea
                className="w-full h-[160px] md:h-[197px] border-[1.372px] border-black rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] resize-none transition-colors duration-150 focus:border-[#fb8349]"
                style={STYLE_MONO}
              />
            </div>
          </div>

          <OrangeBtn>
            <p className="text-[18px] md:text-[20px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>Let&apos;s talk</p>
          </OrangeBtn>
        </Reveal>

      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#4d453b] w-full overflow-hidden relative" style={{ minHeight: "200px", height: "clamp(200px,28vw,400px)" }}>
      <img src="/TPRecruitment_FooterLogo.svg" alt="TPRecruitment"
           className="absolute left-[16px] right-[16px] md:left-[30px] md:right-[30px]"
           style={{ top: "20px", width: "calc(100% - 32px)", height: "auto" }} />
      <div className="absolute bottom-[16px] md:bottom-[30px] left-[16px] right-[16px] md:left-[30px] md:right-[30px] flex flex-col md:flex-row items-start md:items-end justify-between gap-[6px] text-white">
        <p className="text-[11px] md:text-[14px]" style={STYLE_DISPLAY}>All rights reserved.</p>
        <div className="flex gap-[4px] md:gap-[6px] items-center">
          <span className="text-[18px] md:text-[28px]" style={STYLE_DISPLAY}>©</span>
          <span className="text-[13px] md:text-[20px]" style={STYLE_DISPLAY}>2026 TP Recruitment</span>
        </div>
        <a className="text-[11px] md:text-[14px] hover:opacity-60 transition-opacity duration-150"
           href="https://www.unknw.com/" target="_blank" rel="noopener noreferrer" style={STYLE_DISPLAY}>
          brand &amp; website by UNKNW
        </a>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <WhatWorkingSection />
      <PartnersSection />
      <RolesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
