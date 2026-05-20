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
const imgAKT = "/akt-logo.svg";

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

// ── Nav logo ─────────────────────────────────────────────────────────────────
function NavLogo() {
  return (
    <>
      {/* Desktop: full three-section logo */}
      <img
        src="/nav-logo-lg.svg"
        alt="Higher Standard"
        className="hidden lg:block w-auto"
        style={{ height: "46px" }}
      />
      {/* Mobile: compact logo */}
      <img
        src="/nav-logo-sm.svg"
        alt="Higher Standard"
        className="lg:hidden w-auto"
        style={{ height: "46px" }}
      />
    </>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "How I work",   href: "working" },
  { label: "Roles",        href: "roles" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact",      href: "contact" },
];

function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [navHov,    setNavHov]    = useState(false);
  const [menuHov,   setMenuHov]   = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-[16px] md:px-[30px] py-[14px] md:py-[20px] w-full"
        style={{ backgroundColor: "transparent" }}
      >

        {/* Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <NavLogo />
        </div>

        {/* Desktop CTA — white on hero, orange after scroll; hidden when contact form visible */}
        <div
          className="hidden lg:flex flex-col items-start p-[6px]"
          style={{
            backgroundColor: scrolled
              ? (navHov ? "#FF9A6A" : "#fb8349")   // orange after scroll
              : (navHov ? "#ececec"  : "#ffffff"),  // white on hero
            opacity: ctaHidden ? 0 : 1,
            pointerEvents: ctaHidden ? "none" : "auto",
            transition: "background-color 0.35s ease, opacity 0.3s ease",
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
            src="/nav-logo-sm.svg"
            alt="Higher Standard"
            className="w-auto"
            style={{ height: "32px", filter: "invert(1) brightness(2)" }}
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

// ── Hero arrows — 3-speed SVG clip animation ──────────────────────────────
function HeroArrowsSVG({ ready }: { ready: boolean }) {
  const cx = 627.879, cy = 729.637, r = ready ? 2000 : 0;
  return (
    <svg width="100%" height="100%" overflow="visible" viewBox="0 0 1289.02 729.95"
         fill="black" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        {/* Short arrows grow fast */}
        <clipPath id="hclip-fast">
          <circle cx={cx} cy={cy} r={r} style={{ transition: ready ? "r 2.4s cubic-bezier(0.25,0,0.2,1)" : "none" }} />
        </clipPath>
        {/* Medium arrows — mid speed */}
        <clipPath id="hclip-mid">
          <circle cx={cx} cy={cy} r={r} style={{ transition: ready ? "r 4.56s cubic-bezier(0.25,0,0.2,1)" : "none" }} />
        </clipPath>
        {/* Long arrows grow slow */}
        <clipPath id="hclip-slow">
          <circle cx={cx} cy={cy} r={r} style={{ transition: ready ? "r 6.6s cubic-bezier(0.1,0,0.15,1)" : "none" }} />
        </clipPath>
      </defs>

      {/* Center dot — always visible */}
      <path d="M627.879 729.637L627.859 729.948L627.882 729.95L627.905 729.948L627.879 729.637Z" />

      {/* Fast group: arrows 6 (~218px), 4 (~279px), 1 (~316px) */}
      <g clipPath="url(#hclip-fast)">
        <path d="M627.879 729.637L628.191 729.626L620.926 513.795L620.614 513.805L620.302 513.816L627.567 729.647L627.879 729.637ZM620.52 511L618.825 514.178L622.424 514.056L620.52 511ZM627.879 729.637L628.165 729.513L517.422 473.951L517.136 474.075L516.85 474.199L627.593 729.761L627.879 729.637ZM516.02 471.5L515.608 475.078L518.912 473.646L516.02 471.5ZM627.879 729.637L628.115 729.432L421.595 491.416L421.359 491.62L421.124 491.824L627.643 729.841L627.879 729.637ZM419.52 489.5L420.204 493.036L422.924 490.676L419.52 489.5Z" />
      </g>

      {/* Medium group: arrows 2 (~365px), 13 (~390px), 9 (~495px), 8 (~536px) */}
      <g clipPath="url(#hclip-mid)">
        <path d="M627.879 729.637L628.057 729.381L329.088 520.783L328.91 521.039L328.731 521.295L627.701 729.893L627.879 729.637ZM326.608 519.433L328.135 522.694L330.196 519.741L326.608 519.433ZM627.879 729.637L627.936 729.33L245.336 658.206L245.279 658.513L245.222 658.82L627.822 729.944L627.879 729.637ZM242.52 658L245.257 660.34L245.915 656.8L242.52 658ZM627.879 729.637L628.016 729.917L1072.64 512.513L1072.5 512.233L1072.36 511.953L627.742 729.357L627.879 729.637ZM1075.02 511L1071.43 510.752L1073.01 513.988L1075.02 511ZM627.879 729.637L628.116 729.839L975.935 322.337L975.697 322.135L975.46 321.932L627.642 729.434L627.879 729.637ZM977.52 320L974.125 321.203L976.864 323.541L977.52 320Z" />
      </g>

      {/* Slow group: arrows 3 (~588px), 11 (~589px), 14 (~629px), 7 (~655px), 12 (~660px), 5 (~763px), 10 (~806px) */}
      <g clipPath="url(#hclip-slow)">
        <path d="M627.879 729.637L627.985 729.344L75.7653 529.661L75.6593 529.954L75.5532 530.248L627.773 729.93L627.879 729.637ZM73.0196 529L75.3402 531.754L76.5648 528.367L73.0196 529ZM627.879 729.637L627.963 729.937L1195.4 572.053L1195.32 571.752L1195.23 571.452L627.795 729.336L627.879 729.637ZM1198.02 571L1194.53 570.101L1195.5 573.571L1198.02 571ZM627.879 729.637L627.899 729.326L0.0392992 689.689L0.0196496 690L0 690.311L627.859 729.948L627.879 729.637ZM627.879 729.637L628.154 729.784L937.468 153.121L937.193 152.974L936.918 152.826L627.604 729.49L627.879 729.637ZM938.52 150.5L935.459 152.397L938.632 154.099L938.52 150.5ZM627.879 729.637L627.905 729.948L1286.25 674.546L1286.22 674.235L1286.2 673.925L627.853 729.326L627.879 729.637ZM1289.02 674L1285.76 672.467L1286.06 676.056L1289.02 674ZM627.879 729.637L628.177 729.729L852.988 2.77372L852.69 2.68158L852.392 2.58943L627.581 729.545L627.879 729.637ZM853.52 0L850.878 2.44755L854.318 3.51151L853.52 0ZM627.879 729.637L628.077 729.878L1251.05 218.522L1250.85 218.281L1250.65 218.04L627.681 729.396L627.879 729.637ZM1253.02 216.5L1249.47 217.087L1251.75 219.871L1253.02 216.5Z" />
      </g>
    </svg>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">

      {/* ── Desktop (≥1020px): absolute positions matching Figma exactly ── */}
      {/* Figma frame: 1440×821px (incl. nav ~86px). Section = frame minus nav = 735px + 120px bottom padding = 855px */}
      {/* Burst: w=1289px, h=730px, left-edge=91px (= 50%+15.5px - 1289/2 at 1440px), top=65.5px from frame */}
      {/* → In section coords: top = 65.5-86 ≈ -20px. Burst bottom at 710px — within 855px section. */}
      {/* Content: left=30px, top=215-86=129px in section coords. Width=950px for 3-line heading. */}
      <div className="hidden lg:block relative" style={{ minHeight: "855px", overflow: "hidden" }}>

        {/* Burst — full-width positioned, NOT inside max-w container */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "calc(50% + 15.5px)",
            top: "0",
            width: "1289px",
            height: "730px",
            transform: "translateX(-50%)",
          }}
        >
          <HeroArrowsSVG ready={heroReady} />
        </div>

        {/* Content — max-width constrained, sits on top of burst */}
        <div className="max-w-[1440px] mx-auto px-[30px] relative" style={{ height: "855px" }}>
          <div
            className="absolute flex flex-col gap-[40px]"
            style={{
              left: "30px", top: "103px", width: "950px",
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(20px)",
              transition: heroReady ? "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s" : "none",
            }}
          >
            <p className="text-black" style={{ ...STYLE_DISPLAY, fontSize: "60px", letterSpacing: "-5.5px", lineHeight: "1.1" }}>
              A great hire changes the trajectory. That&apos;s the Higher Standard.
            </p>
            <div style={{ ...STYLE_MONO, fontSize: "28px", lineHeight: "1.1", color: "black" }}>
              <p>I&apos;m Tiffany Philippou, founder of Higher Standard.</p>
              <p>I find the people who raise the bar for your whole company and shape the outcome, then I stay long after the offer is signed.</p>
            </div>
            <OrangeBtn onClick={scrollToContact}>
              <p style={{ ...STYLE_MONO, fontSize: "24px", lineHeight: "20px", color: "black", whiteSpace: "nowrap" }}>
                Start working together
              </p>
            </OrangeBtn>
          </div>
        </div>

      </div>

      {/* ── Mobile (<1020px): stacked ── */}
      <div className="lg:hidden px-[16px] md:px-[30px] pt-[46px] pb-[61px]">
        <div className="flex flex-col gap-[40px]">
          <Reveal>
            <p style={{ ...STYLE_DISPLAY, fontSize: "clamp(36px, 10vw, 48px)", letterSpacing: "-3px", lineHeight: "1.1", color: "black" }}>
              A great hire changes the trajectory. That&apos;s the Higher Standard.
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

      {/* ── Mobile / tablet (up to xl) ── */}
      <div className="xl:hidden">
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[103px] pb-[51px]">
          <Reveal>
            <div className="text-[40px] md:text-[44px] text-black" style={{ ...STYLE_DISPLAY, letterSpacing: "-3.5px" }}>
              <p>What</p>
              <p>Higher Standard</p>
              <p>means in practice</p>
            </div>
          </Reveal>
        </div>
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pb-[73px]">
          {WORKING_MOBILE_CARDS.map((card, idx) => {
            const isLast = idx === WORKING_MOBILE_CARDS.length - 1;
            return (
            <div
              key={card.title}
              style={{
                position: "sticky",
                top: `calc(var(--stack-top) + ${idx} * var(--stack-step))`,
                marginTop: idx === 0 ? 0 : "var(--stack-gap)",
                zIndex: idx + 1,
                // Last card expands to fill the viewport so it fully covers all previous cards' body content
                ...(isLast && { minHeight: `calc(100vh - var(--stack-top) - ${idx} * var(--stack-step))` }),
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
                        <p className="flex-1 min-w-0 text-[16px] md:text-[18px] text-black" style={STYLE_MONO}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </div>
            );
          })}
          {/* Spacer = last-card minHeight so the stack stays stable until it fully exits */}
          <div style={{ height: "calc(100vh - var(--stack-top) - 1 * var(--stack-step))" }} />
        </div>
      </div>

      {/* ── Desktop xl+: title left, two cards right ── */}
      <div
        className="hidden xl:flex max-w-[1440px] mx-auto"
        style={{ gap: "30px", padding: "103px 30px", alignItems: "flex-start" }}
      >
        {/* Left: sticky title — 675px (matches right card width exactly) */}
        <div style={{ width: "675px", maxWidth: "675px", flexShrink: 0, position: "sticky", top: "var(--stack-top)" }}>
          <Reveal>
            <div className="text-[52px] text-black" style={{ ...STYLE_DISPLAY, letterSpacing: "-3.5px" }}>
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
                      <p className="flex-1 min-w-0 text-[20px] text-black" style={STYLE_MONO}>{t}</p>
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
                      <p className="flex-1 min-w-0 text-[20px] text-black" style={STYLE_MONO}>{t}</p>
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
const partnerLogosRow1 = [imgAKT, imgImage30, imgImage31, imgImage32, imgImage33, imgImage36, imgImage34, imgImage35, imgImage37];
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
    <section id="partners" className="bg-[#ffedd7] w-full overflow-hidden pt-[80px] pb-[43px]">
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

// ── About — "Where the Higher Standard comes from" ───────────────────────────
const ABOUT_CARDS = [
  {
    id: "exp",
    title: "17 years of experience",
    body: "I was employee #1 and a founding team member at Onefinestay. Spent over ten years in leadership roles inside startups, then watched the company sell in a deal worth $200 million.\nThat's the lens everything else is built on.",
  },
  {
    id: "platform",
    title: "Head of Platform, 33east",
    body: "I work closely with portfolio founders on leadership hiring, growth challenges, and the decisions that shape a company as it moves from early traction into scale. Previously I was an analyst at the same fund.",
  },
  {
    id: "coach",
    title: "Trained coach",
    body: "Trained with the Co-Active Training Institute. Completed the Positive Intelligence programme. Coaching isn't a side interest — it shapes how I assess people and how I work with hiring leaders on judgement calls.",
  },
  {
    id: "consult",
    title: "Consulting",
    body: "20+ startups advised as a strategic consultant. Covers brand, communications strategy, GTM and leadership decisions. Still actively advising alongside the hiring work.",
  },
  {
    id: "writer",
    title: "Writer",
    body: "I write openly about growth, leadership and what it really takes to build inside a fast-moving company. Honest takes for both hiring leaders and the people considering their next role.",
  },
];

function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-[#ffedd7] w-full pb-[103px] md:pb-[120px]">

      {/* ── Desktop xl+: Figma 607-831 absolute layout ─────────────────────── */}
      {/* Layer order: bg photo (DOM 1st) → connector SVG (DOM 2nd) → fg photo (DOM 3rd) → cards */}
      {/* Animation: connector clips L→R (1.5s), bg photo fades (delay 0.7s), fg photo (delay 1.1s), cards stagger (delay 1.5+) */}
      <div className="hidden xl:block">
        <div className="max-w-[1440px] mx-auto relative" style={{ minHeight: "1300px" }}>

          {/* Title */}
          <div style={{
            position: "absolute", left: "30px", top: "50px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: inView ? "opacity 0.66s ease 0.22s, transform 0.66s ease 0.22s" : "none",
          }}>
            <p className="text-[52px] text-black" style={STYLE_DISPLAY}>
              Where the Higher Standard<br/>comes from
            </p>
          </div>

          {/* Photo — background layer (peach bg, below connector) */}
          <div style={{
            position: "absolute", left: "111px", top: "605px",
            width: "293px", height: "293px", overflow: "hidden",
            opacity: inView ? 1 : 0,
            transition: inView ? "opacity 0.88s ease 0.77s" : "none",
          }}>
            <img
              src="/tiffany-bg.png"
              alt=""
              style={{
                position: "absolute",
                width: "390px", height: "439px",
                objectFit: "cover", objectPosition: "center top",
                left: "50%", top: "50%",
                transform: "translate(-50%, calc(-50% + 13px))",
              }}
            />
          </div>

          {/* Connector SVG — clips left-to-right over 1.5s (middle layer, over bg photo) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", left: "-233px", top: "290px",
              width: "903px", height: "898px",
              pointerEvents: "none",
              clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: inView ? "clip-path 1.65s cubic-bezier(0.4, 0, 0.2, 1) 0.33s" : "none",
            }}
          >
            <img src="/about-connector.svg" alt="" style={{ width: "100%", height: "100%", display: "block" }} />
          </div>

          {/* Photo — foreground layer (cutout, no bg, above connector) */}
          <div style={{
            position: "absolute", left: "111px", top: "605px",
            width: "293px", height: "293px", overflow: "hidden",
            opacity: inView ? 1 : 0,
            transition: inView ? "opacity 0.88s ease 1.21s" : "none",
          }}>
            <img
              src="/tiffany-fg.png"
              alt="Tiffany Philippou"
              style={{
                position: "absolute",
                width: "390px", height: "439px",
                objectFit: "cover", objectPosition: "center top",
                left: "50%", top: "50%",
                transform: "translate(-50%, calc(-50% + 13px))",
              }}
            />
          </div>

          {/* Cards column — stagger in from top as connector animation completes */}
          <div style={{
            position: "absolute", left: "670px", top: "168px",
            width: "740px", display: "flex", flexDirection: "column", gap: "30px",
          }}>
            {ABOUT_CARDS.map((card, i) => (
              <div
                key={card.id}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: inView
                    ? `opacity 0.6s ease ${1.65 + i * 0.2}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${1.65 + i * 0.2}s`
                    : "none",
                }}
              >
                <div className="bg-white p-[10px]">
                  <div style={{ marginBottom: "-1.372px" }}>
                    <div className="border-[1.372px] border-black p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                      <p className="text-[32px] text-black" style={{ ...STYLE_DISPLAY, letterSpacing: "-0.96px" }}>
                        {card.title}
                      </p>
                    </div>
                  </div>
                  <div className="border-[1.372px] border-black border-t-0 p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                    <p className="text-[20px] text-black whitespace-pre-line" style={STYLE_MONO}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Mobile / tablet (up to xl): title + photo + sticky-stacking cards ── */}
      <div className="xl:hidden pt-[103px]">

        {/* Title + photo — scroll normally */}
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pb-[48px]">
          <Reveal>
            <p className="text-[36px] md:text-[44px] text-black mb-[48px] md:mb-[56px]" style={STYLE_DISPLAY}>
              Where the Higher Standard<br/>comes from
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-col items-center gap-[12px]">
              <div style={{ width: "min(260px, 70vw)", aspectRatio: "1", overflow: "hidden", border: "0.635px solid #4D453B" }}>
                <img src="/tiffany-bg.png" alt="Tiffany Philippou" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <p style={{ ...STYLE_DISPLAY, fontSize: 24, color: "black", letterSpacing: "-1.2px" }}>Tiffany Philippou</p>
            </div>
          </Reveal>
        </div>

        {/* Sticky-stacking cards */}
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pb-[73px]">
          {ABOUT_CARDS.map((card, idx) => {
            const isLast = idx === ABOUT_CARDS.length - 1;
            return (
              <div
                key={card.id}
                style={{
                  position: "sticky",
                  top: `calc(var(--stack-top) + ${idx} * var(--stack-step))`,
                  marginTop: idx === 0 ? 0 : "var(--stack-gap)",
                  zIndex: idx + 1,
                  ...(isLast && { minHeight: `calc(100vh - var(--stack-top) - ${idx} * var(--stack-step))` }),
                }}
              >
                <HoverCard>
                  <div className="bg-white flex flex-col p-[10px]">
                    <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                      <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                        <p className="text-[20px] md:text-[24px] text-black" style={STYLE_DISPLAY}>{card.title}</p>
                      </div>
                    </div>
                    <div className="border-[1.372px] border-black p-[16px] md:p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                      <p className="text-[15px] md:text-[16px] text-black whitespace-pre-line" style={{ ...STYLE_MONO, lineHeight: 1.1 }}>{card.body}</p>
                    </div>
                  </div>
                </HoverCard>
              </div>
            );
          })}
          {/* Spacer = last-card minHeight so stack stays stable until it fully exits */}
          <div style={{ height: "calc(100vh - var(--stack-top) - 4 * var(--stack-step))" }} />
        </div>

      </div>

    </section>
  );
}

function RolesSection() {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <section id="roles" className="bg-[#ffedd7] w-full py-[103px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <Reveal>
          <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[48px] md:mb-[72px]" style={STYLE_DISPLAY}>
            Roles that I hire for
          </p>
        </Reveal>

        {/* xl desktop: row with stretch — left accordion, right column justified */}
        <div className="flex flex-col xl:flex-row xl:gap-[30px] xl:items-stretch gap-[30px] items-start">

          {/* Left: accordion */}
          <Reveal className="xl:w-[671px] xl:shrink-0 w-full xl:order-1 order-1">
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

          {/* Right: description text (mobile order 2, xl order 2 with justify-between) */}
          <Reveal
            delay={100}
            className="flex-1 xl:order-2 order-2 xl:flex xl:flex-col xl:justify-between"
          >
            <p className="text-[18px] md:text-[24px] xl:text-[28px] text-black" style={STYLE_MONO}>
              {ROLES_DESCRIPTION}
            </p>
            {/* Desktop button — bottom of right column, justified */}
            <div className="hidden xl:block mt-[40px]">
              <OrangeBtn onClick={scrollToContact}>
                <p className="text-[18px] md:text-[20px] xl:text-[24px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                  Start working together
                </p>
              </OrangeBtn>
            </div>
          </Reveal>

          {/* Mobile-only button — after accordion (order 3) */}
          <div className="xl:hidden order-3 w-full">
            <OrangeBtn onClick={scrollToContact}>
              <p className="text-[18px] md:text-[20px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                Start working together
              </p>
            </OrangeBtn>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
// All 8 testimonials — shown in scattered grid on desktop, grid on mobile
const TESTIMONIALS = [
  {
    name: "Tom Picarony", title: "Head of Expansion",
    photo: "/photo_tom.jpeg" as string | null, bg: "#edead6",
    text: [
      "Thanks to Tiffany's invaluable assistance, we've successfully hired our UK team.",
      "Her leadership, strategic insight, and dedication were instrumental in assembling a top-notch team ready to tackle any challenge.",
    ],
  },
  {
    name: "Maria Monks", title: "Fractional CMO",
    photo: "/photo_maria.jpeg" as string | null, bg: "#efd7ba",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across multiple startups. I have enjoyed working with her for years — her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment, and building teams, related.",
    ],
  },
  {
    name: "Ruben Tadmor", title: "Founder",
    photo: "/photo_ruben.jpeg" as string | null, bg: "#90b0bb",
    text: [
      "Tiffany is by far the best experience I've had working with external support for recruitment — really felt like an extension of the hiring team.",
    ],
  },
  {
    name: "Gastón Tourn", title: "Chief Growth Officer at Oddbox",
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
    photo: "/photo_martin.jpeg" as string | null, bg: "#edead6",
    text: [
      "Working with Tiffany has been great, she's helped us on multiple briefs and has been so effective in providing the right candidates within such a fast turnaround.",
      "Whether for full time or temp requirements, Tiffany has a vast network of quality candidates to reach out to.",
    ],
  },
  {
    name: "Jonathan Canizales", title: "Chief of Staff, Mindgard",
    photo: "/photo_jonathan.jpeg" as string | null, bg: "#fff5e9",
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process. I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process.",
    ],
  },
  {
    name: "Haralds Gabrans Zukovs", title: "Head of Growth, Mindgard",
    photo: "/photo_haralds.jpeg" as string | null, bg: "#e0e0e0",
    text: [
      "Tiffany's expert guidance was invaluable in navigating my career transition.",
      "Her personalised advice and unwavering support empowered me to confidently land the perfect next step. I highly recommend her services to anyone seeking a career change partner.",
    ],
  },
];

// Shared card inner layout
// stretch=true makes the card fill its parent container height (for equal-height carousels)
function TestimonialCardInner({ t, stretch = false }: { t: typeof TESTIMONIALS[0]; stretch?: boolean }) {
  const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div style={{
      backgroundColor: t.bg, padding: "6px",
      ...(stretch ? { height: "100%", display: "flex", flexDirection: "column" } : {}),
    }}>
      {/* Header */}
      <div style={{ display: "flex", marginBottom: "-0.823px", flexShrink: 0 }}>
        <div style={{ width: 133, height: 117, flexShrink: 0, border: "0.6px solid black", borderRadius: "4.8px 0 0 0", overflow: "hidden" }}>
          {t.photo ? (
            <img src={t.photo} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#4d453b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...STYLE_DISPLAY, fontSize: 28, color: "white" }}>{initials}</span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ border: "0.823px solid black", borderLeft: "none", borderBottom: "none", borderRadius: "0 4.8px 0 0", flex: 1, display: "flex", alignItems: "center", padding: "0 18px" }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: 16, color: "black", lineHeight: 1.08, letterSpacing: "-0.8px" }}>{t.name}</p>
          </div>
          <div style={{ border: "0.823px solid black", borderLeft: "none", flex: 1, display: "flex", alignItems: "center", padding: "0 18px" }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: 16, color: "black", lineHeight: 1.08, letterSpacing: "-0.8px" }}>{t.title}</p>
          </div>
        </div>
      </div>
      {/* Body — flex-grow when stretching so card fills container height */}
      <div style={{
        border: "0.6px solid black", borderTop: "none", borderRadius: "0 0 4.8px 4.8px",
        padding: "18px", display: "flex", flexDirection: "column", gap: "12px",
        ...(stretch ? { flex: 1 } : {}),
      }}>
        {t.text.map((para, i) => (
          <p key={i} style={{ ...STYLE_MONO, fontSize: 16, color: "black", lineHeight: 1.1 }}>{para}</p>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS_SCATTER = [
  { idx: 0, left: "30px",  top: "58px", width: "330px", rotate: 0      },
  { idx: 1, left: "354px", top: "66px", width: "330px", rotate: -1.96  },
  { idx: 2, left: "663px", top: "50px", width: "330px", rotate: 0      },
  { idx: 3, left: "980px", top: "48px", width: "380px", rotate: -1.67  },
  { idx: 4, left: "56px",  top: "380px", width: "360px", rotate: -1.67  },
  { idx: 5, left: "425px", top: "420px", width: "330px", rotate: -1.67  },
  { idx: 6, left: "662px", top: "300px", width: "400px", rotate: 2      },
  { idx: 7, left: "949px", top: "400px", width: "380px", rotate: 0      },
];

// Scatter card with hover-lift interaction.
// `entered` tracks when each card's entrance animation has fully played —
// only after that do hover transitions switch to the snappy spring version.
function ScatterCard({
  t, left, top, width, rotate, baseZ, inView, delay,
}: {
  t: typeof TESTIMONIALS[0]; left: string; top: string; width: string;
  rotate: number; baseZ: number; inView: boolean; delay: number;
}) {
  const [hov, setHov]       = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setEntered(true), delay + 650);
    return () => clearTimeout(id);
  }, [inView, delay]);

  const transform = !inView
    ? `translateY(32px) rotate(${rotate}deg)`
    : hov && entered
      ? `translateY(-10px) scale(1.04) rotate(0deg)`
      : `rotate(${rotate}deg)`;

  const transition = entered
    ? hov
      ? "transform 0.3s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.25s ease"
      : "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease"
    : `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;

  return (
    <div
      style={{
        position: "absolute", left, top, width,
        opacity: inView ? 1 : 0,
        transform,
        zIndex: hov && entered ? 100 : baseZ,
        boxShadow: hov && entered ? "0 24px 64px rgba(0,0,0,0.22)" : "none",
        transition,
        cursor: "default",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <TestimonialCardInner t={t} />
    </div>
  );
}

// Mobile hover card — same lift effect for grid layout
function MobileTestimonialCard({
  t, rotate, inView, delay,
}: {
  t: typeof TESTIMONIALS[0]; rotate: number; inView: boolean; delay: number;
}) {
  const [hov, setHov]       = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setEntered(true), delay + 560);
    return () => clearTimeout(id);
  }, [inView, delay]);

  const transform = !inView
    ? `translateY(24px) rotate(${rotate}deg)`
    : hov && entered
      ? `translateY(-8px) scale(1.03) rotate(0deg)`
      : `rotate(${rotate}deg)`;

  const transition = entered
    ? hov
      ? "transform 0.28s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.25s ease"
      : "transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease"
    : `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform,
        boxShadow: hov && entered ? "0 16px 48px rgba(0,0,0,0.18)" : "none",
        transition,
        position: "relative",
        zIndex: hov && entered ? 10 : 1,
        cursor: "default",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <TestimonialCardInner t={t} />
    </div>
  );
}

function TestimonialsCarousel({ testimonials }: { testimonials: typeof TESTIMONIALS }) {
  const [idx, setIdx] = useState(0);
  const total = testimonials.length;
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div className="lg:hidden">
      {/* All cards in same grid cell — height = tallest card; stretch fills that height */}
      <div style={{ display: "grid" }}>
        {testimonials.map((t, i) => (
          <div key={t.name} style={{ gridArea: "1 / 1", visibility: i === idx ? "visible" : "hidden", height: "100%" }}>
            <TestimonialCardInner t={t} stretch={true} />
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between mt-[16px]">
        <p style={{ ...STYLE_MONO, fontSize: "14px", color: "black" }}>
          {idx + 1} / {total}
        </p>
        <div className="flex gap-[10px]">
          <button onClick={prev} className="border border-black rounded-[4px] p-[10px] cursor-pointer hover:bg-black/5 transition-colors" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9L11 15" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={next} className="border border-black rounded-[4px] p-[10px] cursor-pointer hover:bg-black/5 transition-colors" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 3L13 9L7 15" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [scatterScale, setScatterScale] = useState(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      // Scatter natural width ~1400px; account for 60px total padding
      const s = Math.min(1, Math.max(0.7, (window.innerWidth - 60) / 1400));
      setScatterScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#ffedd7] w-full pt-[103px] pb-[61px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[41px] md:mb-[61px]" style={STYLE_DISPLAY}>
          Testimonials
        </p>

        {/* Desktop lg+: scaled scatter layout */}
        <div className="hidden lg:block relative overflow-hidden" style={{ height: `${Math.round(920 * scatterScale)}px` }}>
          <div style={{ transform: `scale(${scatterScale})`, transformOrigin: "top left", width: "1400px", position: "relative" }}>
            {TESTIMONIALS_SCATTER.map(({ idx, left, top, width, rotate }, layoutIdx) => (
              <ScatterCard
                key={TESTIMONIALS[idx].name}
                t={TESTIMONIALS[idx]}
                left={left} top={top} width={width}
                rotate={rotate} baseZ={layoutIdx}
                inView={inView} delay={layoutIdx * 300}
              />
            ))}
          </div>
        </div>

        {/* Mobile/tablet: carousel */}
        <TestimonialsCarousel testimonials={TESTIMONIALS} />
      </div>
    </section>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
// Subscribe button: explicitly 50px tall (matches the email input height)
function SubscribeBtn({ label = "Subscribe" }: { label?: string }) {
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
        <p className="text-[18px] md:text-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>{label}</p>
      </button>
    </div>
  );
}

const NEWSLETTER_ARTICLES = [
  {
    title: "Why great hires fail after six months",
    excerpt: "The VP Product who left, the questions worth asking first, and this week's classifieds.",
    href: "https://higher.beehiiv.com/p/why-startup-hires-fail",
  },
  {
    title: "Good people leave quietly",
    excerpt: "On the hire that breaks startups and the kind of leader that holds them together.",
    href: "https://higher.beehiiv.com/p/good-people-leave-quietly",
  },
  {
    title: "Mindset is non-negotiable",
    excerpt: "Why the unobvious hire usually wins.",
    href: "https://higher.beehiiv.com/p/mindset-is-non-negotiable",
  },
  {
    title: "The reps nobody sees",
    excerpt: "The years that don't make the deck.",
    href: "https://higher.beehiiv.com/p/the-reps-nobody-sees",
  },
];

const NEWSLETTER_TAGS = [
  { label: "Founders",        color: "#90b0bb", left: "74px",    top: "360px" },
  { label: "Strategy",        color: "#c1c497", left: "187px",   top: "90px"  },
  { label: "Results",         color: "#c1c497", left: "249px",   top: "379px" },
  { label: "Leadership",      color: "#ff9a6a", left: "443px",   top: "330px" },
  { label: "Analytics",       color: "#90b0bb", left: "552px",   top: "392px" },
  { label: "Conversion",      color: "#90b0bb", left: "281px",   top: "267px" },
  { label: "Business",        color: "#ff9a6a", left: "130px",   top: "217px" },
  { label: "Community",       color: "#c1c497", left: "479px",   top: "158px" },
  { label: "Growth",          color: "#ff9a6a", left: "369px",   top: "398px" },
  { label: "Startups",        color: "#ff9a6a", left: "402px",   top: "71px"  },
  { label: "Entrepreneurship",color: "#c1c497", left: "603px",   top: "258px" },
];

function NewsletterCarousel({ articles }: { articles: typeof NEWSLETTER_ARTICLES }) {
  const [idx, setIdx] = useState(0);
  const total = articles.length;
  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div className="md:hidden">
      {/* All cards in same grid cell — height = tallest card; stretch fills that height */}
      <div style={{ display: "grid", marginBottom: "16px" }}>
        {articles.map((article, i) => (
          <div key={article.title} style={{ gridArea: "1 / 1", visibility: i === idx ? "visible" : "hidden", height: "100%" }}>
            <HoverCard className="h-full" style={{ height: "100%" }}>
              <div className="bg-white flex flex-col p-[10px]" style={{ height: "100%" }}>
                <div className="flex items-start" style={{ marginBottom: "-1.372px" }}>
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="text-[20px] text-black whitespace-pre-line" style={STYLE_DISPLAY}>{article.title}</p>
                  </div>
                </div>
                <div className="border-[1.372px] border-black flex flex-1 flex-col justify-between p-[20px] rounded-bl-[8px] rounded-br-[8px] gap-[20px]">
                  <p className="text-[16px] text-black" style={STYLE_MONO}>{article.excerpt}</p>
                  <div className="bg-[#ffedd7] p-[4px] self-start">
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black rounded-[4px] px-[12px] py-[10px] bg-[#ffedd7] hover:bg-[#f0e4cf] transition-colors duration-150 inline-block"
                    >
                      <p className="text-[16px] text-black whitespace-nowrap" style={STYLE_MONO}>read now</p>
                    </a>
                  </div>
                </div>
              </div>
            </HoverCard>
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between mt-[16px]">
        <p style={{ ...STYLE_MONO, fontSize: "14px", color: "black" }}>{idx + 1} / {total}</p>
        <div className="flex gap-[10px]">
          <button onClick={prev} className="border border-black rounded-[4px] p-[10px] cursor-pointer hover:bg-black/5 transition-colors" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9L11 15" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={next} className="border border-black rounded-[4px] p-[10px] cursor-pointer hover:bg-black/5 transition-colors" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 3L13 9L7 15" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-[#ffedd7] w-full py-[103px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">

        {/* Header — left aligned */}
        <Reveal className="mb-[52px] md:mb-[60px]">
          <p className="text-[36px] md:text-[52px] text-black" style={STYLE_DISPLAY}>
            Higher Newsletter
          </p>
          <p className="text-[18px] md:text-[24px] text-black mt-[16px] md:mt-[20px]" style={STYLE_MONO}>
            Honest writing about growth, leadership and building inside fast-moving companies.
          </p>
        </Reveal>

        {/* Desktop md+: two-column layout */}
        <div className="hidden md:flex gap-[30px] items-start">
          {/* Left: banner + subscribe */}
          <div className="shrink-0 flex flex-col gap-[30px]" style={{ width: "min(808px, 55%)", position: "sticky", top: "var(--stack-top)", alignSelf: "flex-start" }}>
            {/* Banner box */}
            <div className="overflow-hidden relative" style={{ backgroundColor: "#fff5e9", height: "560px" }}>
              {/* Arrow burst SVG */}
              <div style={{ position: "absolute", left: "30px", top: "30px", right: "30px", bottom: "80px" }}>
                <img src="/newsletter-burst.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center" }} />
              </div>
              {/* Keyword tags */}
              {NEWSLETTER_TAGS.map((tag) => (
                <div key={tag.label} style={{ position: "absolute", left: tag.left, top: tag.top, backgroundColor: tag.color, padding: "4px 8px" }}>
                  <p style={{ ...STYLE_MONO, fontSize: "16px", color: "black", whiteSpace: "nowrap" }}>{tag.label}</p>
                </div>
              ))}
              {/* "Higher" wordmark at bottom — image */}
              <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff5e9", padding: "6px 12px" }}>
                <img src="/nav-logo-sm.svg" alt="Higher" style={{ height: "43px", width: "auto", display: "block" }} />
              </div>
            </div>
            {/* Subscribe row */}
            <div className="flex gap-[10px] items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-[#949494] rounded-[4px] h-[50px] px-[20px] flex-1 text-[16px] text-black bg-transparent outline-none hover:border-black/60 focus:border-[#fb8349] transition-colors duration-200 placeholder:text-[#767676]"
                style={STYLE_DISPLAY}
              />
              <SubscribeBtn label="Subscribe to Higher" />
            </div>
          </div>

          {/* Right: 4 article cards — sticky stacking as user scrolls */}
          <div className="flex-1 min-w-0">
            {NEWSLETTER_ARTICLES.map((article, i) => (
              <div
                key={article.title}
                style={{
                  position: "sticky",
                  top: `calc(var(--stack-top) + ${i} * var(--stack-step))`,
                  marginTop: i === 0 ? 0 : "var(--stack-gap)",
                  zIndex: i + 1,
                }}
              >
                <HoverCard>
                  <div className="bg-white flex flex-col p-[10px]">
                    <div style={{ marginBottom: "-1.372px" }}>
                      <div className="border-[1.372px] border-black p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                        <p className="text-[22px] md:text-[24px] text-black" style={STYLE_DISPLAY}>{article.title}</p>
                      </div>
                    </div>
                    <div className="border-[1.372px] border-black border-t-0 p-[20px] rounded-bl-[8px] rounded-br-[8px] flex flex-col gap-[24px]">
                      <p className="text-[18px] md:text-[20px] text-black" style={STYLE_MONO}>{article.excerpt}</p>
                      <div className="bg-[#ffedd7] p-[4px] self-start">
                        <a
                          href={article.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-black rounded-[4px] px-[12px] py-[10px] bg-[#ffedd7] hover:bg-[#f0e4cf] transition-colors duration-150 inline-block"
                        >
                          <p className="text-[16px] md:text-[18px] text-black whitespace-nowrap" style={STYLE_MONO}>read now</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </div>
            ))}
            {/* Spacer to hold the stack in place before the section exits */}
            <div style={{ height: "300px" }} />
          </div>
        </div>

        {/* Mobile: header → burst image → carousel → email field */}
        <div className="md:hidden flex flex-col gap-[28px]">
          {/* Banner image */}
          <div className="overflow-hidden relative" style={{ backgroundColor: "#fff5e9", height: "240px" }}>
            <div style={{ position: "absolute", left: "20px", top: "16px", right: "20px", bottom: "56px" }}>
              <img src="/newsletter-burst.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center" }} />
            </div>
            <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff5e9", padding: "4px 10px" }}>
              <img src="/nav-logo-sm.svg" alt="Higher" style={{ height: "32px", width: "auto", display: "block" }} />
            </div>
          </div>
          {/* Article carousel */}
          <NewsletterCarousel articles={NEWSLETTER_ARTICLES} />
          {/* Subscribe field */}
          <div className="flex flex-col gap-[10px] items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-[#949494] rounded-[4px] h-[50px] px-[20px] w-full text-[16px] text-black bg-transparent outline-none hover:border-black/60 focus:border-[#fb8349] transition-colors duration-200 placeholder:text-[#767676]"
              style={STYLE_DISPLAY}
            />
            <SubscribeBtn label="Subscribe to Higher" />
          </div>
        </div>

      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden pt-[61px] md:pt-[46px] pb-[103px]">
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
    <footer className="bg-[#4d453b] w-full relative overflow-hidden h-[320px] md:h-[400px]">
      {/* "Higher Standard" — SVG scales to fill footer width, Figma 520:892 */}
      <img
        src="/footer-logo.svg"
        alt="Higher Standard"
        className="absolute"
        style={{
          left: "clamp(16px, 2.08vw, 30px)",
          top: "clamp(16px, 2.08vw, 30px)",
          width: "calc(98% - clamp(16px, 2.08vw, 30px))",
          height: "auto",
        }}
      />

      {/* Bottom bar — pinned to footer bottom */}
      <div className="absolute bottom-[16px] md:bottom-[30px] left-[16px] right-[16px] md:left-[30px] md:right-[30px] flex flex-col md:flex-row items-start md:items-end gap-[6px]">
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
        <div className="flex md:justify-center md:flex-1">
          <span
            className="text-[14px] md:text-[20px] text-[#eaeae5]"
            style={{ ...STYLE_DISPLAY, letterSpacing: "-1px" }}
          >
            © 2026 Higher Standard
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
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <WhatWorkingSection />
      <AboutSection />
      <RolesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </div>
  );
}
