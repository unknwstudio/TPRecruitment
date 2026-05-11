import { useEffect, useRef, useState } from "react";

// Image assets (local copies in public/assets/)
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
  letterSpacing: '-0.05em',
  lineHeight: '1.1',
};

const STYLE_MONO: React.CSSProperties = {
  fontFamily: FONT_MONO,
  lineHeight: '1.08',
};

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

// Check icon components
function CheckIcon() {
  return <img src="/CheckedBox.svg" alt="" className="shrink-0 w-[24px] h-[24px]" />;
}

function CrossIcon() {
  return <img src="/crossedBox.svg" alt="" className="shrink-0 w-[24px] h-[24px]" />;
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

function SectionCard({ title, children, expanded = true }: { title: string; children: React.ReactNode; expanded?: boolean }) {
  return (
    <div className="bg-white flex flex-col items-start p-[10px] w-full">
      <div className="flex items-start w-full" style={{ marginBottom: expanded ? '-1.372px' : '0' }}>
        <div
          className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] w-full"
          style={{
            borderRadius: expanded ? '8px 8px 0 0' : '8px',
            transition: 'border-radius 0.05s',
          }}
        >
          <p className="text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>
            {title}
          </p>
        </div>
      </div>
      <div
        className="w-full"
        style={{
          maxHeight: expanded ? '800px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="border-[1.372px] border-black flex flex-1 flex-col items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- NAV ---
function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnHeight, setBtnHeight] = useState(46);

  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (btnRef.current) setBtnHeight(btnRef.current.getBoundingClientRect().height);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-[#ffedd7] flex items-center justify-between px-[16px] md:px-[30px] py-[14px] md:py-[20px] w-full">
      <img src="/TP_logo.svg" alt="TPRecruitment" className="w-auto max-h-[36px] md:max-h-none" style={{ height: `${btnHeight}px` }} />
      <div
        className="flex flex-col items-start p-[6px] transition-colors duration-300"
        style={{ backgroundColor: pastHero ? '#fb8349' : 'white' }}
      >
        <button
          ref={btnRef}
          onClick={scrollToContact}
          className="border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer"
        >
          <p className="text-[14px] md:text-[18px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
            Start a conversation
          </p>
        </button>
      </div>
    </div>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] pt-[48px] md:pt-[80px] lg:pt-[100px] pb-[40px] md:pb-[60px]">
        {/* Hero headline */}
        <div className="mb-[40px] md:mb-[60px]">
          <p className="text-[36px] md:text-[48px] lg:text-[60px] text-black max-w-[1155px]" style={STYLE_DISPLAY}>
            Recruitment is messy, human, and brutal. Most recruiters hide from that. I&nbsp;don&apos;t.
          </p>
        </div>

        {/* Two columns — stack on mobile, side by side on md+ */}
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[30px] md:items-stretch">
          {/* Left: Usual process */}
          <div className="flex md:flex-1 md:self-stretch">
            <div className="bg-[#d1d1d1] flex flex-col w-full md:h-full p-[10px]">
              {/* Header: overlap trick */}
              <div className="flex items-start shrink-0 w-full" style={{ marginBottom: '-1.372px' }}>
                <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                  <p className="shrink-0 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>
                    Usual process:
                  </p>
                </div>
              </div>
              {/* Body: full border */}
              <div className="flex md:flex-1 min-h-0">
                <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[24px] md:gap-[30px] md:h-full items-start p-[20px] md:p-[30px] rounded-bl-[8px] rounded-br-[8px]">
                  <div className="flex flex-col gap-[16px] md:gap-[20px] items-start w-full">
                    {[
                      "You fill out a brief.",
                      "You get CVs.",
                      "You do the thinking.",
                    ].map((text) => (
                      <div key={text} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                        {/* Empty bordered 18px square */}
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
            {/* Header: overlap trick */}
            <div className="flex items-start shrink-0 w-full" style={{ marginBottom: '-1.372px' }}>
              <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] md:p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
                <p className="flex-1 text-[24px] md:text-[32px] text-black" style={STYLE_DISPLAY}>
                  Working with me:
                </p>
              </div>
            </div>
            {/* Body: flex-1 + h-full to match left card height */}
            <div className="flex md:flex-1 min-h-0">
              <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[24px] md:gap-[40px] items-start p-[20px] md:p-[30px] md:h-full rounded-bl-[8px] rounded-br-[8px]">
                <div className="flex flex-col gap-[16px] md:gap-[20px] items-start w-full">
                  {[
                    "You have a conversation.",
                    "You meet people I believe in.",
                  ].map((text) => (
                    <div key={text} className="flex gap-[16px] md:gap-[20px] items-start w-full">
                      {/* Filled orange 18px square */}
                      <div className="shrink-0 bg-[#fb8349] rounded-[2px] w-[18px] h-[18px] mt-[3px]" />
                      <p className="flex-1 text-[18px] md:text-[24px] text-black" style={STYLE_MONO}>
                        {text}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-[16px] md:gap-[20px] items-start w-full">
                    <div className="shrink-0 bg-[#fb8349] rounded-[2px] w-[18px] h-[18px] mt-[3px]" />
                    <div className="flex-1 text-[18px] md:text-[24px] text-black" style={{ ...STYLE_MONO, lineHeight: '1.1' }}>
                      <p>The decision is up to you —</p>
                      <p>but you never carry that weight alone.</p>
                    </div>
                  </div>
                </div>
                <div className="text-[18px] md:text-[24px] text-black" style={{ ...STYLE_MONO, lineHeight: '1.1' }}>
                  <p>Good hiring is a collaboration,</p>
                  <p>not a transaction.</p>
                </div>
                <div className="bg-[#fb8349] flex flex-col items-start p-[6px] md:mt-auto">
                  <button
                    onClick={scrollToContact}
                    className="border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer"
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

// --- WHAT'S WORKING SECTION ---
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

const STACK_FIRST_TOP = 96;
const STACK_STEP = 16;
const STACK_GAP = 40;

function WhatWorkingSection() {
  return (
    <section className="bg-[#ffedd7] w-full">
      {/* Mobile / tablet: stacked layout, no sticky */}
      <div className="lg:hidden max-w-[1440px] mx-auto px-[16px] md:px-[30px] py-[40px] md:py-[60px] flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[24px]">
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
        <div className="flex flex-col gap-[16px]">
          {WORKING_CARDS.map((card) => (
            <SectionCard key={card.title} title={card.title} expanded={true}>
              <div className="flex flex-col gap-[16px] items-start w-full">
                {card.items.map((text) => (
                  <CheckItem key={text} icon={card.icon} text={text} />
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      </div>

      {/* Desktop: sticky stacking layout */}
      <div
        className="hidden lg:flex max-w-[1440px] mx-auto"
        style={{ gap: '61px', padding: '30px', alignItems: 'flex-start' }}
      >
        {/* Left: sticky body text */}
        <div
          className="flex flex-col gap-[40px] items-start"
          style={{ width: '644px', flexShrink: 0, position: 'sticky', top: `${STACK_FIRST_TOP}px` }}
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
                position: 'sticky',
                top: `${STACK_FIRST_TOP + idx * STACK_STEP}px`,
                marginTop: idx === 0 ? 0 : `${STACK_GAP}px`,
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
          <div style={{ height: '600px' }} />
        </div>
      </div>
    </section>
  );
}

// --- PARTNERS SECTION ---
const partnerLogosRow1 = [imgImage30, imgImage31, imgImage32, imgImage33, imgImage36, imgImage34, imgImage35, imgImage37];
const partnerLogosRow2 = [imgImage38, imgImage39, imgImage40, imgImage41, imgImage42, imgImage43, imgImage44, imgImage45];

function PartnerLogo({ src, small }: { src: string; small?: boolean }) {
  return (
    <div
      className="border-r border-black flex items-center justify-center shrink-0 p-[14px] md:p-[20px]"
      style={{ width: small ? '140px' : '220px', height: small ? '80px' : '120px' }}
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
  // Detect small screens for logo sizing via state + resize observer
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const update = () => setSmall(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]" style={STYLE_DISPLAY}>
          My partners &amp; collaborators
        </p>
      </div>

      {/* Row 1 — scrolling left */}
      <div className="flex border-t border-b border-black overflow-hidden mb-[-1px]">
        <div className="flex animate-marquee">
          {[...partnerLogosRow1, ...partnerLogosRow1].map((src, i) => (
            <PartnerLogo key={i} src={src} small={small} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling right */}
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

// --- ROLES SECTION ---
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
    <section className="bg-[#ffedd7] w-full overflow-hidden py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px]">
        <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black mb-[40px] md:mb-[60px]" style={STYLE_DISPLAY}>
          Roles that I hire for
        </p>

        {/* Stack on mobile, row on md+ */}
        <div className="flex flex-col md:flex-row gap-[20px] md:gap-[30px] md:items-stretch">
          {roles.map((role) => (
            <div key={role.title} className="md:flex-1 md:basis-0 md:min-w-0">
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

// --- TESTIMONIALS SECTION ---
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

function TestimonialsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">
      {/* Section heading */}
      <div className="px-[16px] md:px-[30px] pt-[40px] md:pt-[60px] pb-[24px] md:pb-[40px]">
        <p className="text-[36px] md:text-[44px] lg:text-[52px] text-black" style={STYLE_DISPLAY}>
          I could keep going.<br />But they&apos;ll say it better.
        </p>
      </div>

      {/* Mobile: vertical expanded cards */}
      <div className="flex flex-col gap-[0px] md:hidden pb-[40px]">
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            style={{
              backgroundColor: t.bg,
              borderTop: '1.372px solid black',
              borderBottom: idx === testimonials.length - 1 ? '1.372px solid black' : 'none',
            }}
          >
            {/* Header: photo + name/title */}
            <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1.372px solid black' }}>
              <div style={{ width: '90px', height: '90px', flexShrink: 0, overflow: 'hidden' }}>
                <img
                  src={t.photo}
                  alt={t.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
              <div style={{ flex: 1, borderLeft: '1.372px solid black', padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                <p style={{ ...STYLE_DISPLAY, fontSize: '18px', color: 'black' }}>{t.name}</p>
                <p style={{ ...STYLE_DISPLAY, fontSize: '14px', color: 'black' }}>{t.title}</p>
              </div>
            </div>
            {/* Quote */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.text.map((para, i) => (
                <p key={i} style={{ ...STYLE_MONO, fontSize: '16px', color: 'black' }}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet: 2×2 grid */}
      <div className="hidden md:grid lg:hidden grid-cols-2 pb-[40px]" style={{ borderTop: '1.372px solid black' }}>
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            style={{
              backgroundColor: t.bg,
              borderRight: idx % 2 === 0 ? '1.372px solid black' : 'none',
              borderBottom: idx < 2 ? '1.372px solid black' : 'none',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1.372px solid black' }}>
              <div style={{ width: '110px', height: '110px', flexShrink: 0, overflow: 'hidden' }}>
                <img
                  src={t.photo}
                  alt={t.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
              <div style={{ flex: 1, borderLeft: '1.372px solid black', padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
                <p style={{ ...STYLE_DISPLAY, fontSize: '20px', color: 'black' }}>{t.name}</p>
                <p style={{ ...STYLE_DISPLAY, fontSize: '16px', color: 'black' }}>{t.title}</p>
              </div>
            </div>
            {/* Quote */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {t.text.map((para, i) => (
                <p key={i} style={{ ...STYLE_MONO, fontSize: '16px', color: 'black' }}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal hover accordion — height reduced ~25% from 680px */}
      <div
        className="hidden lg:flex w-full"
        style={{ height: '500px' }}
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
                flex: isHovered ? '3 0 0' : anyHovered ? '0.4 0 0' : '1 0 0',
                backgroundColor: t.bg,
                transition: 'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'default',
                borderRight: idx < testimonials.length - 1 ? '1.372px solid black' : 'none',
                borderTop: '1.372px solid black',
              }}
            >
              {/* Collapsed label */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: '30px',
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.25s ease',
                pointerEvents: 'none',
              }}>
                <p style={{
                  ...STYLE_DISPLAY,
                  fontSize: '20px',
                  color: 'black',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.02em',
                }}>
                  {t.name}
                </p>
              </div>

              {/* Expanded content */}
              <div style={{
                position: 'absolute', inset: 0,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.35s ease 0.15s',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                minWidth: '560px',
              }}>
                {/* Header: photo + name/title */}
                <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: '-1.372px' }}>
                  <div style={{
                    width: '180px', height: '160px', flexShrink: 0,
                    border: '1.372px solid black',
                    borderRadius: '8px 0 0 0',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={t.photo}
                      alt={t.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      border: '1.372px solid black', borderRadius: '0 8px 0 0',
                      flex: 1, display: 'flex', alignItems: 'center', padding: '0 24px',
                      marginBottom: '-1.372px',
                    }}>
                      <p style={{ ...STYLE_DISPLAY, fontSize: '28px', color: 'black', whiteSpace: 'nowrap' }}>{t.name}</p>
                    </div>
                    <div style={{
                      border: '1.372px solid black',
                      flex: 1, display: 'flex', alignItems: 'center', padding: '0 24px',
                    }}>
                      <p style={{ ...STYLE_DISPLAY, fontSize: '20px', color: 'black', whiteSpace: 'nowrap' }}>{t.title}</p>
                    </div>
                  </div>
                </div>
                {/* Quote body */}
                <div style={{
                  flex: 1,
                  border: '1.372px solid black',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  overflowY: 'auto',
                }}>
                  {t.text.map((para, i) => (
                    <p key={i} style={{ ...STYLE_MONO, fontSize: '18px', color: 'black' }}>{para}</p>
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

// --- CTA / CONTACT SECTION ---
function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[40px] md:py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[30px] flex flex-col lg:flex-row gap-[40px] lg:gap-[35px] lg:items-start">

        {/* Left column: headline + contacts */}
        <div className="lg:shrink-0 lg:w-[655px] flex flex-col gap-[40px] md:gap-[60px]">
          <div className="text-[36px] md:text-[44px] lg:text-[52px] text-black" style={STYLE_DISPLAY}>
            <p>If you&apos;ve read</p>
            <p>this far, we should</p>
            <p>probably talk</p>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col gap-[24px] md:gap-[40px] lg:gap-[30px] text-[16px] text-black">
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <p style={STYLE_DISPLAY}>Contacts</p>
              <div className="flex flex-col gap-[8px] md:gap-[10px]" style={STYLE_MONO}>
                <p>tprecruitment.co</p>
                <p>tiffany@tprecruitment.co</p>
              </div>
            </div>
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <p style={STYLE_DISPLAY}>Office</p>
              <p style={STYLE_MONO}>
                20-22 Wenlock Road<br />
                London, England, N1 7GU
              </p>
            </div>
            <div className="flex flex-col gap-[16px] md:gap-[20px]">
              <p style={STYLE_DISPLAY}>Socials</p>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={imgLinkedInIcon} alt="LinkedIn" className="w-[16px] h-[16px]" />
                  <a className="text-[16px]" href="https://www.linkedin.com/company/tp-recruitment/" target="_blank" style={STYLE_MONO}>TP Recruitment</a>
                </div>
                <div className="flex gap-[6px] items-center">
                  <img src={imgLinkedInIcon} alt="LinkedIn" className="w-[16px] h-[16px]" />
                  <a className="text-[16px]" href="https://www.linkedin.com/in/tiffany-philippou/" target="_blank" style={STYLE_MONO}>Tiffany Philippou</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: tagline + form */}
        <div className="flex-1 flex flex-col gap-[24px] md:gap-[30px]">
          {/* Tagline */}
          <div className="text-[18px] md:text-[22px] lg:text-[24px] text-black" style={STYLE_MONO}>
            <p>I&apos;d love to hear what you&apos;re building</p>
            <p>or just have a good conversation with you</p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-[20px]">
            {/* Name + Email row */}
            <div className="flex flex-col sm:flex-row gap-[20px] sm:gap-[30px]">
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[16px]" style={STYLE_DISPLAY}>
                  Your Name &amp; Surname
                </label>
                <input
                  type="text"
                  className="w-full border-b-[1.372px] border-black bg-transparent outline-none text-[16px] pb-[8px]"
                  style={STYLE_MONO}
                />
              </div>
              <div className="flex flex-col gap-[8px] flex-1">
                <label className="text-[16px]" style={STYLE_DISPLAY}>
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border-b-[1.372px] border-black bg-transparent outline-none text-[16px] pb-[8px]"
                  style={STYLE_MONO}
                />
              </div>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px]" style={STYLE_DISPLAY}>
                Tell me about you
              </label>
              <textarea
                className="w-full h-[160px] md:h-[197px] border-[1.372px] border-black rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] resize-none"
                style={STYLE_MONO}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="bg-[#fb8349] flex flex-col items-start p-[6px] self-start">
            <button className="border border-black flex items-center p-[10px] md:p-[12px] rounded-[4px] cursor-pointer">
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

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#4d453b] w-full overflow-hidden relative" style={{ minHeight: '200px', height: 'clamp(200px, 28vw, 400px)' }}>
      {/* Big TPRecruitment logo */}
      <img
        src="/TPRecruitment_FooterLogo.svg"
        alt="TPRecruitment"
        className="absolute left-[16px] right-[16px] md:left-[30px] md:right-[30px]"
        style={{ top: '20px', width: 'calc(100% - 32px)', height: 'auto' }}
      />

      {/* Bottom bar */}
      <div className="absolute bottom-[16px] md:bottom-[30px] left-[16px] right-[16px] md:left-[30px] md:right-[30px] flex flex-col md:flex-row items-start md:items-end justify-between gap-[8px] text-white">
        <p className="text-[11px] md:text-[14px]" style={STYLE_DISPLAY}>All rights reserved.</p>
        <div className="flex gap-[4px] md:gap-[6px] items-center">
          <span className="text-[20px] md:text-[28px]" style={STYLE_DISPLAY}>©</span>
          <span className="text-[14px] md:text-[20px]" style={STYLE_DISPLAY}>2026 TP Recruitment</span>
        </div>
        <a className="text-[11px] md:text-[14px]" href="https://www.unknw.com/" target="_blank" style={STYLE_DISPLAY}>brand &amp; website by UNKNW</a>
      </div>
    </footer>
  );
}

// --- APP ---
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
