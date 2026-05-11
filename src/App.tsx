import { useEffect, useRef, useState } from "react";

// Image assets
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

const FONT_DISPLAY = "'GT Canon Trial'";
const FONT_MONO = "'GT Pressura Mono'";

const STYLE_DISPLAY: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  letterSpacing: "-0.05em",
  lineHeight: "1.1",
};
const STYLE_MONO: React.CSSProperties = {
  fontFamily: FONT_MONO,
  lineHeight: "1.08",
};

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

// ── Shared icon components ────────────────────────────────────────────────────

function CheckIcon() {
  return <img src="/CheckedBox.svg" alt="" className="shrink-0 w-[24px] h-[24px]" />;
}
function CrossIcon() {
  return <img src="/crossedBox.svg" alt="" className="shrink-0 w-[24px] h-[24px]" />;
}

/** Orange filled square with a white checkmark — used in the Hero "Working with me" card */
function OrangeCheckbox() {
  return (
    <div className="shrink-0 bg-[#fb8349] rounded-[2px] w-[18px] h-[18px] mt-[3px] flex items-center justify-center">
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
        <path
          d="M1 3.5L4 6.5L10 1"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
      <p className="flex-1 text-black text-[18px] md:text-[20px]" style={STYLE_MONO}>
        {text}
      </p>
    </div>
  );
}

function SectionCard({
  title,
  children,
  expanded = true,
}: {
  title: string;
  children: React.ReactNode;
  expanded?: boolean;
}) {
  return (
    <div className="bg-white flex flex-col items-start p-[10px] w-full">
      <div
        className="flex items-start w-full"
        style={{ marginBottom: expanded ? "-1.372px" : "0" }}
      >
        <div
          className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] w-full"
          style={{
            borderRadius: expanded ? "8px 8px 0 0" : "8px",
            transition: "border-radius 0.05s",
          }}
        >
          <p
            className="text-[22px] md:text-[32px] text-black"
            style={STYLE_DISPLAY}
          >
            {title}
          </p>
        </div>
      </div>
      <div
        className="w-full"
        style={{
          maxHeight: expanded ? "800px" : "0",
          overflow: "hidden",
          transition: "max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="border-[1.372px] border-black flex flex-1 flex-col items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "What's working", href: "#working" },
  { label: "Partners", href: "#partners" },
  { label: "Roles", href: "#roles" },
  { label: "Testimonials", href: "#testimonials" },
];

function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnHeight, setBtnHeight] = useState(46);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (btnRef.current) setBtnHeight(btnRef.current.getBoundingClientRect().height);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAndGo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* ── Main bar ── */}
      <div className="sticky top-0 z-50 bg-[#ffedd7] flex items-center justify-between px-[16px] md:px-[30px] py-[14px] md:py-[20px] w-full border-b border-transparent">
        <img
          src="/TP_logo.svg"
          alt="TPRecruitment"
          className="w-auto"
          style={{ height: `${btnHeight}px`, maxHeight: "46px" }}
        />

        {/* Desktop CTA button */}
        <div
          className="hidden md:flex flex-col items-start p-[6px] transition-colors duration-300"
          style={{ backgroundColor: pastHero ? "#fb8349" : "white" }}
        >
          <button
            ref={btnRef}
            onClick={scrollToContact}
            className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
          >
            <p className="text-[18px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
              Start a conversation
            </p>
          </button>
        </div>

        {/* Mobile hamburger */}
        <div
          className="flex md:hidden flex-col items-start p-[6px] transition-colors duration-300"
          style={{ backgroundColor: pastHero ? "#fb8349" : "white" }}
        >
          <button
            ref={btnRef}
            onClick={() => setMenuOpen(true)}
            className="border border-black flex items-center justify-center p-[10px] rounded-[4px] cursor-pointer"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-[5px]">
              <div className="w-[18px] h-[1.5px] bg-black rounded-full transition-all duration-200" />
              <div className="w-[18px] h-[1.5px] bg-black rounded-full transition-all duration-200" />
              <div className="w-[18px] h-[1.5px] bg-black rounded-full transition-all duration-200" />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen overlay menu ── */}
      <div
        className="fixed inset-0 z-[100] flex flex-col bg-[#4d453b]"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-[16px] py-[14px] border-b border-white/15">
          <img
            src="/TP_logo.svg"
            alt="TPRecruitment"
            className="w-auto opacity-90"
            style={{ height: `${btnHeight}px`, maxHeight: "46px", filter: "invert(1) brightness(2)" }}
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

        {/* Nav links */}
        <div className="flex-1 flex flex-col justify-center px-[24px]">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => closeAndGo(link.href)}
              className="text-left border-b border-white/15 py-[24px] group"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                transition: `opacity 0.35s ease ${i * 0.06 + 0.15}s, transform 0.35s ease ${i * 0.06 + 0.15}s`,
              }}
            >
              <p
                className="text-white text-[36px] md:text-[44px] group-hover:text-[#fb8349] transition-colors duration-200"
                style={STYLE_DISPLAY}
              >
                {link.label}
              </p>
            </button>
          ))}
        </div>

        {/* CTA button at bottom */}
        <div
          className="px-[24px] py-[30px]"
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.35s ease 0.4s",
          }}
        >
          <div className="bg-[#fb8349] flex flex-col items-start p-[6px] self-start w-fit">
            <button
              onClick={() => { setMenuOpen(false); setTimeout(scrollToContact, 350); }}
              className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
            >
              <p className="text-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                Start a conversation
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[48px] md:pt-[80px] lg:pt-[100px] pb-[60px] lg:pb-[60px]">
        <div className="mb-[40px] md:mb-[60px]">
          <p
            className="text-[36px] md:text-[48px] lg:text-[60px] text-black max-w-[1155px]"
            style={STYLE_DISPLAY}
          >
            Recruitment is messy, human, and brutal. Most recruiters hide from that. I&nbsp;don&apos;t.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-[16px] md:gap-[30px] md:items-stretch">
          {/* Left: Usual process */}
          <div className="flex md:flex-1 md:self-stretch">
            <div className="bg-[#d1d1d1] flex flex-col w-full md:h-full p-[10px]">
              <div className="flex items-start shrink-0 w-full" style={{ marginBottom: "-1.372px" }}>
                <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                  <p className="shrink-0 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>
                    Usual process:
                  </p>
                </div>
              </div>
              <div className="flex md:flex-1 min-h-0">
                <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[24px] md:gap-[30px] md:h-full items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
                  <div className="flex flex-col gap-[16px] md:gap-[20px] items-start w-full">
                    {["You fill out a brief.", "You get CVs.", "You do the thinking."].map((text) => (
                      <div key={text} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                        <div className="shrink-0 border border-[#4d453b] rounded-[2px] w-[18px] h-[18px] mt-[3px]" />
                        <p className="flex-1 text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="w-full text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>
                    Sound familiar?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Working with me */}
          <div className="bg-white flex flex-col md:flex-1 p-[10px]">
            <div className="flex items-start shrink-0 w-full" style={{ marginBottom: "-1.372px" }}>
              <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                <p className="flex-1 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>
                  Working with me:
                </p>
              </div>
            </div>
            <div className="flex md:flex-1 min-h-0">
              <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[20px] md:gap-[40px] items-start p-[20px] md:p-[30px] md:h-full rounded-bl-[8px] rounded-br-[8px]">
                <div className="flex flex-col gap-[14px] md:gap-[20px] items-start w-full">
                  {[
                    "You have a conversation.",
                    "You meet people I believe in.",
                  ].map((text) => (
                    <div key={text} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                      <OrangeCheckbox />
                      <p className="flex-1 text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>
                        {text}
                      </p>
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
                <div className="bg-[#fb8349] flex flex-col items-start p-[6px] md:mt-auto">
                  <button
                    onClick={scrollToContact}
                    className="border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <p className="text-[18px] md:text-[24px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                      Start working together
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What's Working ────────────────────────────────────────────────────────────

const WORKING_CARDS = [
  {
    title: "My standards",
    icon: "check" as const,
    items: [
      "Personally understand and assess every candidate before sharing their name.",
      "Hire through the lens of fast-moving company experience.",
      "Only hand over work I can fully stand behind.",
      "Treat candidates and hiring managers as people, not profiles or clients.",
    ],
  },
  {
    title: "Communication",
    icon: "check" as const,
    items: [
      "Start with your reality, not just the brief.",
      "Understand your culture, chaos level, stage, and what the right hire actually looks like.",
      "Tell you what the market says, even when it is not what you want to hear.",
      "Give honest feedback throughout.",
    ],
  },
  {
    title: "After the offer",
    icon: "check" as const,
    items: [
      "Stay involved after placement.",
      "Measure outcomes, not speed.",
      "Prioritize people over pipeline.",
      "Prioritize outcomes over optics.",
    ],
  },
  {
    title: "What I won't do",
    icon: "cross" as const,
    items: [
      "Send 20 CVs by Friday just to fill a quota.",
      "Drop names and disappear.",
      "Place people who look right on paper but cannot survive the reality.",
      "Write generic job descriptions.",
      "Mistake activity for judgment.",
    ],
  },
];

function WhatWorkingSection() {
  return (
    <section id="working" className="bg-[#ffedd7] w-full">
      {/* ── Mobile / tablet: text up top, then sticky stacking cards ── */}
      <div className="lg:hidden">
        {/* Intro text — normal flow */}
        <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[60px] pb-[40px] flex flex-col gap-[24px]">
          <div className="text-[36px] md:text-[44px] text-black" style={STYLE_DISPLAY}>
            <p>What&apos;s working</p>
            <p>with me looks like</p>
          </div>
          <div className="text-[16px] md:text-[20px] text-black" style={STYLE_MONO}>
            <p className="mb-[1.08em]">
              I know that growth asks a lot of a company. The pace. The pressure. The decisions that shape what comes next. None of it works without the right people around the table.
            </p>
            <p className="mb-[1.08em]">
              That&apos;s why I work in partnership with ambitious teams to find the people who can carry that responsibility, people who bring judgement, energy and ownership, people who understand what it takes to build inside a fast-moving company, people who can help shape the outcome.
            </p>
            <p>The strongest teams are built in collaboration.</p>
          </div>
        </div>

        {/* Sticky stacking cards (same mechanic, single column) */}
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
              <SectionCard title={card.title} expanded={true}>
                <div className="flex flex-col gap-[16px] items-start w-full">
                  {card.items.map((text) => (
                    <CheckItem key={text} icon={card.icon} text={text} />
                  ))}
                </div>
              </SectionCard>
            </div>
          ))}
          <div style={{ height: "300px" }} />
        </div>
      </div>

      {/* ── Desktop: two-column sticky layout ── */}
      <div
        className="hidden lg:flex max-w-[1440px] mx-auto"
        style={{ gap: "61px", padding: "60px 30px", alignItems: "flex-start" }}
      >
        {/* Left: sticky text */}
        <div
          className="flex flex-col gap-[40px] items-start"
          style={{
            width: "644px",
            flexShrink: 0,
            position: "sticky",
            top: "var(--stack-top)",
          }}
        >
          <div className="text-[52px] text-black" style={STYLE_DISPLAY}>
            <p>What&apos;s working</p>
            <p>with me looks like</p>
          </div>
          <div className="text-[24px] text-black" style={STYLE_MONO}>
            <p className="mb-[1.08em]">
              I know that growth asks a lot of a company. The pace. The pressure. The decisions that shape what comes next. None of it works without the right people around the table.
            </p>
            <p className="mb-[1.08em]">
              That&apos;s why I work in partnership with ambitious teams to find the people who can carry that responsibility, people who bring judgement, energy and ownership, people who understand what it takes to build inside a fast-moving company, people who can help shape the outcome.
            </p>
            <p>The strongest teams are built in collaboration.</p>
          </div>
        </div>

        {/* Right: sticky stacking cards */}
        <div className="flex-1">
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
              <SectionCard title={card.title} expanded={true}>
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {card.items.map((text) => (
                    <CheckItem key={text} icon={card.icon} text={text} />
                  ))}
                </div>
              </SectionCard>
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
  const h = small ? 80 : 120;
  return (
    <div
      className="border-r border-black flex items-center justify-center shrink-0 p-[14px] md:p-[20px] transition-opacity duration-200 hover:opacity-60"
      style={{ width: w, height: h }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundColor: "#4d453b",
          maskImage: `url('${src}')`,
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          WebkitMaskImage: `url('${src}')`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
        }}
      />
    </div>
  );
}

function PartnersSection() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const update = () => setSmall(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="partners" className="bg-[#ffedd7] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p
          className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]"
          style={STYLE_DISPLAY}
        >
          My partners &amp; collaborators
        </p>
      </div>
      <div className="flex border-t border-b border-black overflow-hidden mb-[-1px]">
        <div className="flex animate-marquee">
          {[...partnerLogosRow1, ...partnerLogosRow1].map((src, i) => (
            <PartnerLogo key={i} src={src} small={small} />
          ))}
        </div>
      </div>
      <div className="flex border-t border-b border-black overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {[...partnerLogosRow2, ...partnerLogosRow2].map((src, i) => (
            <PartnerLogo key={i} src={src} small={small} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Roles ─────────────────────────────────────────────────────────────────────

function RolesSection() {
  const roles = [
    {
      title: "Commercial, Growth & Go-to-market",
      description: "Experienced leaders who drive ambitious revenue results — not just manage them.",
    },
    {
      title: "Early-stage & First-Function Hires",
      description: "The entrepreneurial mindset isn't common. I find the person with it to build — not just execute even when the structure isn't there yet.",
    },
    {
      title: "Marketing, Creative & Design",
      description: "Full-time and contract. The people who make what you're building impossible to ignore and support your growth.",
    },
  ];

  return (
    <section id="roles" className="bg-[#ffedd7] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p
          className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]"
          style={STYLE_DISPLAY}
        >
          Roles that I hire for
        </p>
        <div className="flex flex-col md:flex-row gap-[16px] md:gap-[30px] md:items-stretch">
          {roles.map((role) => (
            <div
              key={role.title}
              className="md:flex-1 md:basis-0 md:min-w-0 transition-shadow duration-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]"
            >
              <div className="bg-white flex flex-col h-full p-[10px]">
                <div className="flex items-start mb-[-1.372px]">
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="flex-1 text-[22px] md:text-[28px] text-black" style={STYLE_DISPLAY}>
                      {role.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[16px] md:p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                    <p className="w-full text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: "Gastón Tourn",
    title: "Chief Marketing Officer, Curio",
    photo: "/photo_gaston.jpeg",
    bg: "#c1c497",
    text: [
      "Tiffany's took the time to understand my interests and introduced the opportunity when she saw it was a perfect match. This refreshing approach builds trust and confidence. I was considering other opportunities at the time, but I chose the role at Curio partly because of the assurance Tiffany provided during the hiring process.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need.",
    ],
  },
  {
    name: "Jonathan Canizales",
    title: "Chief of Staff, Mindgard",
    photo: "/photo_jonathan.jpeg",
    bg: "#90b0bb",
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process.",
      "I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process. Most importantly, the entire process was incredibly fast, which was a huge plus. I would definitely work with Tiffany again and highly recommend her to anyone in need of a top-notch recruiter.",
    ],
  },
  {
    name: "Maria Monks",
    title: "IQ Capital",
    photo: "/photo_maria.jpeg",
    bg: "#edead6",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across the IQ Capital portfolio. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment, and building teams, related.",
    ],
  },
  {
    name: "Govind Balakrishnan",
    title: "Co-founder, Curio",
    photo: "/photo_govind.jpeg",
    bg: "#ffffff",
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires at Curio. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
      "Thanks to our collaboration, we have a phenomenal tight-knit team, investment from tier 1 Silicon Valley investors and partnerships with top media outlets. We trust her fully and will work with her again.",
    ],
  },
];

/** Mobile/tablet swipe carousel */
function TestimonialsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [dragging, setDragging] = useState(false);

  const go = (i: number) => setActiveIdx(Math.max(0, Math.min(testimonials.length - 1, i)));

  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragging) setDragDelta(e.touches[0].clientX - dragStart);
  };
  const onTouchEnd = () => {
    if (dragDelta > 60) go(activeIdx - 1);
    else if (dragDelta < -60) go(activeIdx + 1);
    setDragDelta(0);
    setDragging(false);
  };

  return (
    <div className="pb-[60px]">
      {/* Slide track */}
      <div
        className="overflow-hidden"
        style={{ borderTop: "1.372px solid black" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(calc(-${activeIdx * 100}% + ${dragDelta}px))`,
            transition: dragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {testimonials.map((t) => (
            <div key={t.name} style={{ minWidth: "100%", backgroundColor: t.bg }}>
              <div style={{ padding: "10px" }}>
                {/* Header: photo + name/title */}
                <div style={{ display: "flex", alignItems: "stretch", marginBottom: "-1.372px" }}>
                  <div
                    style={{
                      width: "110px",
                      height: "110px",
                      flexShrink: 0,
                      border: "1.372px solid black",
                      borderRadius: "8px 0 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={t.photo}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        border: "1.372px solid black",
                        borderRadius: "0 8px 0 0",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                        marginBottom: "-1.372px",
                      }}
                    >
                      <p style={{ ...STYLE_DISPLAY, fontSize: "20px", color: "black" }}>{t.name}</p>
                    </div>
                    <div
                      style={{
                        border: "1.372px solid black",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 16px",
                      }}
                    >
                      <p style={{ ...STYLE_DISPLAY, fontSize: "14px", color: "black" }}>{t.title}</p>
                    </div>
                  </div>
                </div>
                {/* Quote body */}
                <div
                  style={{
                    border: "1.372px solid black",
                    borderTop: "none",
                    borderRadius: "0 0 8px 8px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {t.text.map((para, i) => (
                    <p key={i} style={{ ...STYLE_MONO, fontSize: "16px", color: "black" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation: prev / dots / next */}
      <div className="flex items-center justify-center gap-[20px] pt-[20px]">
        <button
          onClick={() => go(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="w-[36px] h-[36px] border border-black rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-30 hover:bg-black hover:text-white active:scale-[0.92]"
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-[8px]">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === activeIdx ? "20px" : "8px",
                height: "8px",
                backgroundColor: i === activeIdx ? "#000" : "rgba(0,0,0,0.25)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(activeIdx + 1)}
          disabled={activeIdx === testimonials.length - 1}
          className="w-[36px] h-[36px] border border-black rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-30 hover:bg-black hover:text-white active:scale-[0.92]"
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="testimonials" className="bg-[#ffedd7] w-full overflow-hidden">
      {/* Section heading */}
      <div className="px-[16px] md:px-[30px] pt-[60px] pb-[24px] md:pb-[40px]">
        <p
          className="text-[36px] md:text-[44px] lg:text-[52px] text-black"
          style={STYLE_DISPLAY}
        >
          I could keep going.<br />But they&apos;ll say it better.
        </p>
      </div>

      {/* Mobile + tablet: swipe carousel */}
      <div className="lg:hidden">
        <TestimonialsCarousel />
      </div>

      {/* Desktop: horizontal hover accordion */}
      <div
        className="hidden lg:flex w-full"
        style={{ height: "500px" }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {testimonials.map((t, idx) => {
          const isHovered = hoveredIdx === idx;
          const anyHovered = hoveredIdx !== null;
          return (
            <div
              key={t.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              style={{
                flex: isHovered ? "3 0 0" : anyHovered ? "0.4 0 0" : "1 0 0",
                backgroundColor: t.bg,
                transition: "flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                position: "relative",
                cursor: "default",
                borderRight: idx < testimonials.length - 1 ? "1.372px solid black" : "none",
                borderTop: "1.372px solid black",
              }}
            >
              {/* Collapsed label */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "flex-end", justifyContent: "center",
                  paddingBottom: "30px",
                  opacity: isHovered ? 0 : 1,
                  transition: "opacity 0.25s ease",
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    ...STYLE_DISPLAY,
                    fontSize: "20px", color: "black",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.name}
                </p>
              </div>

              {/* Expanded content */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.35s ease 0.15s",
                  display: "flex", flexDirection: "column",
                  padding: "10px", minWidth: "560px",
                }}
              >
                <div style={{ display: "flex", alignItems: "stretch", marginBottom: "-1.372px" }}>
                  <div
                    style={{
                      width: "180px", height: "160px", flexShrink: 0,
                      border: "1.372px solid black", borderRadius: "8px 0 0 0",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={t.photo}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        border: "1.372px solid black", borderRadius: "0 8px 0 0",
                        flex: 1, display: "flex", alignItems: "center", padding: "0 24px",
                        marginBottom: "-1.372px",
                      }}
                    >
                      <p style={{ ...STYLE_DISPLAY, fontSize: "28px", color: "black", whiteSpace: "nowrap" }}>
                        {t.name}
                      </p>
                    </div>
                    <div
                      style={{
                        border: "1.372px solid black",
                        flex: 1, display: "flex", alignItems: "center", padding: "0 24px",
                      }}
                    >
                      <p style={{ ...STYLE_DISPLAY, fontSize: "20px", color: "black", whiteSpace: "nowrap" }}>
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    border: "1.372px solid black", borderTop: "none",
                    borderRadius: "0 0 8px 8px",
                    padding: "24px",
                    display: "flex", flexDirection: "column", gap: "14px",
                    overflowY: "auto",
                  }}
                >
                  {t.text.map((para, i) => (
                    <p key={i} style={{ ...STYLE_MONO, fontSize: "18px", color: "black" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] flex flex-col lg:flex-row gap-[40px] lg:gap-[35px] lg:items-start">
        {/* Left: headline + contacts */}
        <div className="lg:shrink-0 lg:w-[655px] flex flex-col gap-[40px] md:gap-[60px]">
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
                  { href: "https://www.linkedin.com/in/tiffany-philippou/", label: "Tiffany Philippou" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-[6px] items-center hover:opacity-70 transition-opacity duration-150"
                    style={STYLE_MONO}
                  >
                    <img src={imgLinkedInIcon} alt="LinkedIn" className="w-[16px] h-[16px]" />
                    <span className="text-[16px]">{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: tagline + form */}
        <div className="flex-1 flex flex-col gap-[24px] md:gap-[30px]">
          <div className="text-[18px] md:text-[22px] lg:text-[24px] text-black" style={STYLE_MONO}>
            <p>I&apos;d love to hear what you&apos;re building</p>
            <p>or just have a good conversation with you</p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[30px]">
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[16px]" style={STYLE_DISPLAY}>Your Name &amp; Surname</label>
                <input
                  type="text"
                  className="w-full border-b-[1.372px] border-black bg-transparent outline-none text-[16px] pb-[8px] transition-all duration-150 focus:border-[#fb8349]"
                  style={STYLE_MONO}
                />
              </div>
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[16px]" style={STYLE_DISPLAY}>Email</label>
                <input
                  type="email"
                  className="w-full border-b-[1.372px] border-black bg-transparent outline-none text-[16px] pb-[8px] transition-all duration-150 focus:border-[#fb8349]"
                  style={STYLE_MONO}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px]" style={STYLE_DISPLAY}>Tell me about you</label>
              <textarea
                className="w-full h-[160px] md:h-[197px] border-[1.372px] border-black rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] resize-none transition-all duration-150 focus:border-[#fb8349]"
                style={STYLE_MONO}
              />
            </div>
          </div>

          <div className="bg-[#fb8349] flex flex-col items-start p-[6px] self-start">
            <button className="border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]">
              <p className="text-[18px] md:text-[20px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                Let&apos;s talk
              </p>
            </button>
          </div>
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
      <img
        src="/TPRecruitment_FooterLogo.svg"
        alt="TPRecruitment"
        className="absolute left-[16px] right-[16px] md:left-[30px] md:right-[30px]"
        style={{ top: "20px", width: "calc(100% - 32px)", height: "auto" }}
      />
      <div className="absolute bottom-[16px] md:bottom-[30px] left-[16px] right-[16px] md:left-[30px] md:right-[30px] flex flex-col md:flex-row items-start md:items-end justify-between gap-[6px] text-white">
        <p className="text-[11px] md:text-[14px]" style={STYLE_DISPLAY}>All rights reserved.</p>
        <div className="flex gap-[4px] md:gap-[6px] items-center">
          <span className="text-[18px] md:text-[28px]" style={STYLE_DISPLAY}>©</span>
          <span className="text-[13px] md:text-[20px]" style={STYLE_DISPLAY}>2026 TP Recruitment</span>
        </div>
        <a
          className="text-[11px] md:text-[14px] hover:opacity-70 transition-opacity duration-150"
          href="https://www.unknw.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={STYLE_DISPLAY}
        >
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
