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
// Phase 0 (0ms):    Rectangle + centre dot visible; all arrows hidden
// Phase 1 (700ms):  Arrows grow asynchronously from centre over ~2 s
// Phase 2 (3100ms): Corner text labels appear (300 ms after last arrow)
// Phase 3 (5200ms): Labels fade; burst slides to hero illustration (desktop)
//                   OR whole overlay fades out (mobile)
// onComplete (6000ms): overlay unmounts
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [burstTransform, setBurstTransform] = useState<string>("none");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1),  700),
      setTimeout(() => setPhase(2), 3100),
      setTimeout(() => setPhase(3), 5200),
      setTimeout(onComplete,        6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // At phase 3 on desktop: slide burst to hero illustration position
  useEffect(() => {
    if (phase !== 3) return;
    if (window.innerWidth < 1020) return;
    const anchor = document.getElementById("hero-illustration-anchor");
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const targetCX = rect.left + rect.width / 2;
    const targetCY = rect.top + rect.height / 2;
    const containerW = Math.min(687, window.innerWidth * 0.9);
    const dX = targetCX - window.innerWidth / 2;
    const dY = targetCY - window.innerHeight / 2;
    const sc = rect.width / containerW;
    setBurstTransform(`translate(${dX}px, ${dY}px) scale(${sc})`);
  }, [phase]);

  // clip-path grow from SVG centre (51.09% / 53.93%) with per-arrow stagger
  const arrowStyle = (delay: number): React.CSSProperties => ({
    clipPath: phase >= 1
      ? "circle(200% at 51.09% 53.93%)"
      : "circle(0%   at 51.09% 53.93%)",
    transition: phase >= 1
      ? `clip-path 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
      : "none",
  });

  const labels = [
    { text: "Higher",    pos: { left: "17.26%",  top: "19.5%" },                              delay: 0   },
    { text: "Standard",  pos: { right: "14.71%", top: "19.5%", textAlign: "right" as const }, delay: 100 },
    { text: "In hiring", pos: { left: "17.26%",  top: "87.5%" },                              delay: 200 },
    { text: "People",    pos: { right: "14.71%", top: "87.5%", textAlign: "right" as const }, delay: 300 },
  ];

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
        transform: phase === 3 ? burstTransform : "none",
        transition: phase === 3 ? "transform 0.85s cubic-bezier(0.4,0,0.2,1)" : "none",
        transformOrigin: "center center",
      }}>
        {/* ── Inline SVG burst ─────────────────────────────────────────────── */}
        <svg
          viewBox="0 0 686.049 736.525"
          width="100%"
          style={{ display: "block" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rectangle — always visible (phase 0+) */}
          <rect
            x="118.415" y="165.103" width="466.677" height="466.677"
            stroke="#4D453B" strokeWidth="0.634935"
          />

          {/* ── Wave 1 — cross lines (0 ms, 80 ms) ── */}
          <path d="M350.484 164.785L348.651 167.96H352.317L350.484 164.785ZM350.167 631.5V631.817H350.802V631.5H350.484H350.167ZM350.484 167.642H350.167V631.5H350.484H350.802V167.642H350.484Z" fill="#4D453B" style={arrowStyle(0)} />
          <path d="M118.098 396.854H117.78V397.489H118.098V397.171V396.854ZM582.871 397.171V396.854H118.098V397.171V397.489H582.871V397.171Z" fill="#4D453B" style={arrowStyle(80)} />

          {/* ── Wave 2 — upper arrows (250 ms – 400 ms) ── */}
          <path d="M429.216 45.4173L426.734 48.115L430.312 48.9157L429.216 45.4173ZM350.175 397.102L350.105 397.412L350.725 397.551L350.794 397.241L350.484 397.171L350.175 397.102ZM428.592 48.2055L428.282 48.1362L350.175 397.102L350.484 397.171L350.794 397.241L428.902 48.2749L428.592 48.2055Z" fill="#4D453B" style={arrowStyle(250)} />
          <path d="M440.645 223.498L437.555 225.471L440.809 227.16L440.645 223.498ZM350.202 397.026L350.056 397.308L350.619 397.6L350.765 397.318L350.484 397.172L350.202 397.026ZM439.329 226.033L439.047 225.887L350.202 397.026L350.484 397.172L350.765 397.318L439.61 226.18L439.329 226.033Z" fill="#4D453B" style={arrowStyle(330)} />
          <path d="M393.025 150.817L390.679 153.633L394.291 154.257L393.025 150.817ZM350.172 397.117L350.118 397.43L350.744 397.538L350.798 397.226L350.485 397.172L350.172 397.117ZM392.539 153.632L392.226 153.578L350.172 397.117L350.485 397.172L350.798 397.226L392.852 153.686L392.539 153.632Z" fill="#4D453B" style={arrowStyle(410)} />

          {/* ── Wave 3 — lower-left + right arrows (550 ms – 700 ms) ── */}
          <path d="M271.752 736.525L274.255 733.847L270.684 733.018L271.752 736.525ZM350.793 397.243L350.865 396.934L350.246 396.791L350.174 397.1L350.484 397.172L350.793 397.243ZM272.398 733.742L272.707 733.814L350.793 397.243L350.484 397.172L350.174 397.1L272.089 733.67L272.398 733.742Z" fill="#4D453B" style={arrowStyle(550)} />
          <path d="M275.559 634.14L278.264 631.666L274.769 630.56L275.559 634.14ZM350.787 397.267L350.883 396.964L350.277 396.773L350.182 397.076L350.484 397.171L350.787 397.267ZM276.421 631.416L276.724 631.511L350.787 397.267L350.484 397.171L350.182 397.076L276.118 631.32L276.421 631.416Z" fill="#4D453B" style={arrowStyle(630)} />
          <path d="M591.125 480.983L588.73 478.208L587.524 481.67L591.125 480.983ZM350.588 396.872L350.288 396.768L350.079 397.367L350.379 397.472L350.484 397.172L350.588 396.872ZM588.427 480.043L588.531 479.743L350.588 396.872L350.484 397.172L350.379 397.472L588.322 480.343L588.427 480.043Z" fill="#4D453B" style={arrowStyle(710)} />

          {/* ── Wave 4 — mid-ring arrows (850 ms – 1100 ms) ── */}
          <path d="M86.9861 348.916L89.7787 351.291L90.4391 347.685L86.9861 348.916ZM350.426 397.484L350.738 397.541L350.852 396.916L350.54 396.859L350.483 397.171L350.426 397.484ZM89.7966 349.431L89.7394 349.743L350.426 397.484L350.483 397.171L350.54 396.859L89.8538 349.119L89.7966 349.431Z" fill="#4D453B" style={arrowStyle(850)} />
          <path d="M330.166 586.382L332.328 583.421L328.683 583.03L330.166 586.382ZM350.799 397.205L350.833 396.89L350.201 396.822L350.167 397.138L350.483 397.171L350.799 397.205ZM330.471 583.541L330.787 583.575L350.799 397.205L350.483 397.171L350.167 397.138L330.156 583.507L330.471 583.541Z" fill="#4D453B" style={arrowStyle(930)} />
          <path d="M540.33 594.636L539.451 591.078L536.808 593.618L540.33 594.636ZM350.712 396.951L350.492 396.723L350.034 397.163L350.254 397.392L350.483 397.171L350.712 396.951ZM538.35 592.577L538.579 592.357L350.712 396.951L350.483 397.171L350.254 397.392L538.121 592.797L538.35 592.577Z" fill="#4D453B" style={arrowStyle(1010)} />
          <path d="M511.123 421.299L508.256 419.015L507.711 422.64L511.123 421.299ZM350.53 396.858L350.216 396.811L350.122 397.439L350.436 397.486L350.483 397.172L350.53 396.858ZM508.297 420.875L508.345 420.561L350.53 396.858L350.483 397.172L350.436 397.486L508.25 421.189L508.297 420.875Z" fill="#4D453B" style={arrowStyle(1090)} />
          <path d="M263.498 350.821L265.438 353.932L267.162 350.697L263.498 350.821ZM350.334 397.452L350.614 397.601L350.913 397.041L350.632 396.892L350.483 397.172L350.334 397.452ZM266.02 352.165L265.87 352.445L350.334 397.452L350.483 397.172L350.632 396.892L266.169 351.885L266.02 352.165Z" fill="#4D453B" style={arrowStyle(1170)} />

          {/* ── Wave 5 — outer / diagonal arrows (1300 ms – 1600 ms) ── */}
          <path d="M222.862 594.3L226.126 592.631L223.049 590.639L222.862 594.3ZM350.751 397.343L350.924 397.077L350.391 396.732L350.218 396.998L350.485 397.171L350.751 397.343ZM224.415 591.901L224.681 592.074L350.751 397.343L350.485 397.171L350.218 396.998L224.148 591.729L224.415 591.901Z" fill="#4D453B" style={arrowStyle(1300)} />
          <path d="M295.882 287.326L295.646 290.984L298.932 289.36L295.882 287.326ZM480.427 607.809C480.598 607.849 480.769 607.743 480.809 607.573L481.461 604.791C481.501 604.62 481.395 604.449 481.225 604.409C481.054 604.369 480.883 604.475 480.843 604.646L480.263 607.118L477.79 606.538C477.62 606.498 477.449 606.604 477.409 606.775C477.369 606.946 477.475 607.117 477.645 607.157L480.427 607.809ZM350.488 397.806L350.203 397.946L350.21 397.96L350.218 397.973L350.488 397.806ZM297.148 289.888L296.864 290.028L350.203 397.946L350.488 397.806L350.772 397.665L297.433 289.747L297.148 289.888ZM350.488 397.806L350.218 397.973L480.23 607.667L480.5 607.5L480.769 607.333L350.757 397.638L350.488 397.806Z" fill="#4D453B" style={arrowStyle(1380)} />
          <path d="M212.068 189.211L212.296 192.87L215.351 190.843L212.068 189.211ZM350.221 397.981L350.396 398.246L350.925 397.895L350.75 397.63L350.485 397.806L350.221 397.981ZM213.648 191.592L213.384 191.767L350.221 397.981L350.485 397.806L350.75 397.63L213.913 191.416L213.648 191.592Z" fill="#4D453B" style={arrowStyle(1460)} />
          <path d="M295.883 287.326L295.646 290.984L298.933 289.36L295.883 287.326ZM476.875 712.292C477.037 712.361 477.223 712.286 477.292 712.124L478.411 709.496C478.48 709.334 478.405 709.148 478.244 709.079C478.082 709.01 477.896 709.086 477.827 709.247L476.832 711.584L474.496 710.588C474.334 710.52 474.148 710.595 474.079 710.756C474.01 710.917 474.085 711.104 474.247 711.173L476.875 712.292ZM350.488 397.806L350.783 397.687L350.778 397.676L350.773 397.665L350.488 397.806ZM297.149 289.887L296.864 290.028L350.203 397.946L350.488 397.806L350.773 397.665L297.433 289.747L297.149 289.887ZM350.488 397.806L350.194 397.924L476.705 712.119L477 712L477.294 711.881L350.783 397.687L350.488 397.806Z" fill="#4D453B" style={arrowStyle(1540)} />
          <path d="M0 48.592L0.955192 52.1312L3.5426 49.5344L0 48.592ZM350.895 398.666L351.12 398.89L351.568 398.441L351.343 398.216L351.119 398.441L350.895 398.666ZM2.02401 50.6087L1.79993 50.8336L350.895 398.666L351.119 398.441L351.343 398.216L2.24808 50.3838L2.02401 50.6087Z" fill="#4D453B" style={arrowStyle(1620)} />
          <path d="M686.048 62.8304C686.048 62.6551 685.906 62.513 685.73 62.5131L682.873 62.5142C682.698 62.5143 682.556 62.6565 682.556 62.8318C682.556 63.0071 682.698 63.1492 682.873 63.1491L685.413 63.1482L685.414 65.6879C685.414 65.8632 685.556 66.0053 685.732 66.0052C685.907 66.0052 686.049 65.863 686.049 65.6877L686.048 62.8304ZM118.276 630.276L118.051 630.5L118.5 630.949L118.725 630.725L118.5 630.5L118.276 630.276ZM685.73 62.8306L685.506 62.6062L118.276 630.276L118.5 630.5L118.725 630.725L685.955 63.055L685.73 62.8306Z" fill="#4D453B" style={arrowStyle(1700)} />
          <path d="M667.951 261.458L664.31 261.033L665.762 264.399L667.951 261.458ZM111.749 501.465L115.39 501.89L113.937 498.524L111.749 501.465ZM665.328 262.59L665.202 262.299L114.246 500.041L114.372 500.333L114.498 500.624L665.454 262.882L665.328 262.59Z" fill="#4D453B" style={arrowStyle(1780)} />

          {/* Centre dot — always on top */}
          <circle cx="350.484" cy="397.171" r="4.76201" fill="#FFEDD7" stroke="#4D453B" strokeWidth="0.634935" />
        </svg>

        {/* Corner labels — appear at phase 2, fade at phase 3 */}
        {labels.map(({ text, pos, delay }) => (
          <p key={text} style={{
            ...STYLE_DISPLAY,
            fontSize: "clamp(16px, 3.7vw, 25.4px)",
            color: "black",
            position: "absolute",
            ...pos,
            opacity: phase >= 2 && phase < 3 ? 1 : 0,
            transform: phase >= 2 && phase < 3 ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
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

        {/* Logo — custom SVG for all breakpoints */}
        <img
          src="/nav-logo.svg"
          alt="Higher Standard"
          className="w-auto cursor-pointer"
          style={{ height: "46px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

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

          {/* Left content: top=129px, w=799px, gap=40px between all three elements */}
          <div
            className="absolute flex flex-col gap-[40px]"
            style={{ left: "0px", top: "129px", width: "799px" }}
          >
            <p className="text-black" style={{ ...STYLE_DISPLAY, fontSize: "60px", letterSpacing: "-3px", lineHeight: "1.1" }}>
              The right hire changes everything that comes after it.
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
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[134px] pb-[67px]">
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
        style={{ gap: "30px", padding: "134px 30px", alignItems: "flex-start" }}
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
    <section id="partners" className="bg-[#ffedd7] w-full overflow-hidden py-[56px]">
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
    <section id="roles" className="bg-[#ffedd7] w-full py-[134px]">
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
    name: "Maria Monks", title: "IQ Capital",
    photo: "/photo_maria.jpeg" as string | null, bg: "#efd7ba",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across the IQ Capital portfolio. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
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
    name: "Gastón Tourn", title: "Chief Growth Officer, Oddbox",
    photo: "/photo_gaston.jpeg" as string | null, bg: "#c1c497",
    text: [
      "Tiffany's took the time to understand my interests and introduced the opportunity when she saw it was a perfect match.",
      "This refreshing approach builds trust and confidence. I was considering other opportunities at the time, but I chose the role at Curio partly because of the assurance Tiffany provided during the hiring process.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need.",
    ],
  },
  {
    name: "Govind Balakrishnan", title: "Co-founder, Gibran",
    photo: "/photo_govind.jpeg" as string | null, bg: "#ffffff",
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires at Curio. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
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
function TestimonialCardInner({ t }: { t: typeof TESTIMONIALS[0] }) {
  const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div style={{ backgroundColor: t.bg, padding: "6px" }}>
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
      {/* Body */}
      <div style={{ border: "0.6px solid black", borderTop: "none", borderRadius: "0 0 4.8px 4.8px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {t.text.map((para, i) => (
          <p key={i} style={{ ...STYLE_MONO, fontSize: 16, color: "black", lineHeight: 1.1 }}>{para}</p>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS_SCATTER = [
  { idx: 0, left: "68px",  top: "197px", width: "330px", rotate: 0      },
  { idx: 1, left: "354px", top: "166px", width: "330px", rotate: -1.96  },
  { idx: 2, left: "663px", top: "155px", width: "330px", rotate: 0      },
  { idx: 3, left: "980px", top: "160px", width: "380px", rotate: -1.67  },
  { idx: 4, left: "81px",  top: "516px", width: "380px", rotate: -1.67  },
  { idx: 5, left: "425px", top: "557px", width: "330px", rotate: -1.67  },
  { idx: 6, left: "662px", top: "386px", width: "400px", rotate: 2      },
  { idx: 7, left: "949px", top: "630px", width: "380px", rotate: 0      },
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

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#ffedd7] w-full py-[134px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[41px] md:mb-[61px]" style={STYLE_DISPLAY}>
          Testimonials
        </p>

        {/* Desktop xl+: absolute scatter layout with hover-lift */}
        <div className="hidden xl:block relative" style={{ minHeight: "980px" }}>
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

        {/* Mobile/tablet: 2-col grid with hover-lift */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px]">
          {TESTIMONIALS.map((t, i) => (
            <MobileTestimonialCard
              key={t.name}
              t={t}
              rotate={i % 2 === 0 ? -0.8 : 0.8}
              inView={inView}
              delay={i * 200}
            />
          ))}
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
    <section className="bg-[#ffedd7] w-full py-[134px]">
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
        <Reveal delay={60} className="flex flex-col sm:flex-row gap-[10px] items-stretch sm:items-center justify-center mb-[68px] md:mb-[78px]">
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
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[134px]">
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
      className="bg-[#4d453b] w-full relative overflow-hidden"
      style={{ height: "400px" }}
    >
      {/* "Higher Standard" — large display text, Figma 520:892: 126px, top 30px left 30px */}
      <p
        className="absolute text-[#eaeae5] whitespace-nowrap"
        style={{
          ...STYLE_DISPLAY,
          fontSize: "clamp(52px, 8.75vw, 126px)",
          letterSpacing: "-0.02em",
          left: "clamp(16px, 2.08vw, 30px)",
          top: "clamp(16px, 2.08vw, 30px)",
          lineHeight: 1,
        }}
      >
        Higher Standard
      </p>

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
