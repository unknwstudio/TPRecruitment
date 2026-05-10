import { useEffect, useRef, useState } from "react";

// Image assets served from Figma MCP local server
const imgImage30 = "http://localhost:3845/assets/727dc296dda1d75bd0cdc98681dcc08142ac496f.png";
const imgImage31 = "http://localhost:3845/assets/f6a9ce2b039315aad435d4806f9e04ecc0200bcf.png";
const imgImage32 = "http://localhost:3845/assets/c4cdbcaeb862c8524e37b95b4b0b399737b7e33f.png";
const imgImage33 = "http://localhost:3845/assets/84e7950346f9498caad6439efe5f829b7367d29e.png";
const imgImage36 = "http://localhost:3845/assets/56279ec2e160d7849ecb6055c86d62aa6ec24a1c.png";
const imgImage34 = "http://localhost:3845/assets/4e1e3949787afdf2b9e7910d0a21dd29b5aba124.png";
const imgImage35 = "http://localhost:3845/assets/1694819d010494453060ceb1c5e1a82a83c99929.png";
const imgImage37 = "http://localhost:3845/assets/df456b218d26e54c86d7b05063c2a42097d9d8f1.png";
const imgImage38 = "http://localhost:3845/assets/60d6e5b0e4595603cd25085be7f24c27c728f1e0.png";
const imgImage39 = "http://localhost:3845/assets/68e47cfc40084adb6895328d5ac24d1827f44302.png";
const imgImage40 = "http://localhost:3845/assets/14afcb4fd41ec336e0587206844d115e43373d18.png";
const imgImage41 = "http://localhost:3845/assets/081aa4e351c2e0169de059c2a06e912abb5974ad.png";
const imgImage42 = "http://localhost:3845/assets/16e4361f02a28f0cd23c9a99b79dedfe3f3dbca4.png";
const imgImage43 = "http://localhost:3845/assets/b1b231da64657e8a58908636e9f36217b737646d.png";
const imgImage44 = "http://localhost:3845/assets/bc9c7fd2100358c6b03345f7fc4f5b53c183239e.png";
const imgImage14 = "http://localhost:3845/assets/7208c93375929544241a249b6f44f1c7de9692b2.png";
const imgImage16 = "http://localhost:3845/assets/693b966c6500b1d7cfa212bae255e396422ba02f.png";
const imgImage17 = "http://localhost:3845/assets/35cf14732cfa3b6611a8004954a7964376d301d1.png";
const imgImage15 = "http://localhost:3845/assets/b8e7921e6cb9a8c757d8fdc43aa359896fce36ed.png";
const imgImage45 = "http://localhost:3845/assets/e3d64af76a1ad3a69f69cdd4a51390b3fcb13168.svg";
const imgLinkedInIcon = "http://localhost:3845/assets/54c0a72beecaf4250c22a9d1fdb61d8eaf7bd115.svg";

const FONT_DISPLAY = "'GT Canon Trial'";
const FONT_MONO = "'GT Pressura Mono'";
const FONT_SCRIPT = "'Seaweed Script', cursive";

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

// Reusable check icon components — rendered at 24px so the inner box equals 18px
function CheckIcon() {
  return <img src="/CheckedBox.svg" alt="" className="shrink-0 size-[24px]" />;
}

function DashIcon() {
  return <img src="/EmptyCheckbox.svg" alt="" className="shrink-0 size-[24px]" />;
}

function CrossIcon() {
  return <img src="/crossedBox.svg" alt="" className="shrink-0 size-[24px]" />;
}

function CheckItem({ text, icon = "check" }: { text: string; icon?: "check" | "dash" | "cross" }) {
  return (
    <div className="flex gap-[14px] items-start w-full">
      <div className="shrink-0 mt-[1px]">
        {icon === "check" ? <CheckIcon /> : icon === "cross" ? <CrossIcon /> : <DashIcon />}
      </div>
      <p className="flex-1 text-black text-[20px]" style={STYLE_MONO}>
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
          className="border-[1.372px] border-black flex flex-1 items-start p-[30px] w-full"
          style={{
            borderRadius: expanded ? '8px 8px 0 0' : '8px',
            transition: 'border-radius 0.05s',
          }}
        >
          <p className="text-[32px] text-black whitespace-nowrap" style={STYLE_DISPLAY}>
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
        <div className="border-[1.372px] border-black flex flex-1 flex-col items-start p-[30px] rounded-bl-[8px] rounded-br-[8px]">
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
    <div className="sticky top-0 z-50 bg-[#ffedd7] flex items-center justify-between px-[30px] py-[20px] w-full">
      <img src="/TP_logo.svg" alt="TPRecruitment" className="w-auto" style={{ height: `${btnHeight}px` }} />
      <div
        className="flex flex-col items-start p-[6px] transition-colors duration-300"
        style={{ backgroundColor: pastHero ? '#fb8349' : 'white' }}
      >
        <button
          ref={btnRef}
          onClick={scrollToContact}
          className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer"
        >
          <p className="text-[18px] text-black whitespace-nowrap leading-[20px]" style={STYLE_MONO}>
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
      <div className="max-w-[1440px] mx-auto px-[30px] pt-[100px] pb-[60px]">
        {/* Hero headline */}
        <div className="mb-[60px]">
          <p className="text-[60px] text-black max-w-[1155px]" style={STYLE_DISPLAY}>
            Recruitment is messy, human, and brutal. Most recruiters hide from that. I&nbsp;don&apos;t.
          </p>
        </div>

        {/* Two columns */}
        <div className="flex gap-[30px] items-stretch">
          {/* Left: Usual process */}
          <div className="flex flex-1">
            <div className="bg-[#d1d1d1] flex flex-col flex-1 p-[10px]">
              <div className="flex items-start mb-[-1.372px]">
                <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                  <p className="flex-1 text-[28px] text-black whitespace-nowrap" style={STYLE_DISPLAY}>
                    Usual process of recruitment:
                  </p>
                </div>
              </div>
              <div className="flex flex-1">
                <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[30px] items-center p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                  <div className="flex flex-col gap-[20px] items-start w-full">
                    {[
                      "You fill out a brief.",
                      "You get CVs.",
                      "You do the thinking.",
                    ].map((text) => (
                      <div key={text} className="flex gap-[14px] items-start w-full">
                        <img src="/EmptyCheckbox.svg" alt="" className="shrink-0 size-[24px] mt-[1px]" />
                        <p className="flex-1 text-[24px] text-black" style={STYLE_MONO}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="w-full text-[24px] text-black" style={STYLE_MONO}>
                    Sound familiar?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Working with me */}
          <div className="bg-white flex flex-col flex-1 p-[10px]">
            <div className="flex items-start mb-[-1.372px]">
              <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px] h-[60px]">
                <p className="flex-1 text-[28px] text-black" style={STYLE_DISPLAY}>
                  Working with me:
                </p>
              </div>
            </div>
            <div className="flex items-end">
              <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[40px] items-start p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                <div className="flex flex-col gap-[20px] items-start w-full">
                  <div className="flex gap-[14px] items-start w-full">
                    <div className="shrink-0 mt-[1px]"><CheckIcon /></div>
                    <p className="flex-1 text-[24px] text-black" style={STYLE_MONO}>
                      You have a conversation.
                    </p>
                  </div>
                  <div className="flex gap-[14px] items-start w-full">
                    <div className="shrink-0 mt-[1px]"><CheckIcon /></div>
                    <p className="flex-1 text-[24px] text-black" style={STYLE_MONO}>
                      You meet people I believe in.
                    </p>
                  </div>
                  <div className="flex gap-[14px] items-start w-full">
                    <div className="shrink-0 mt-[1px]"><CheckIcon /></div>
                    <div className="flex-1 text-[24px] text-black" style={STYLE_MONO}>
                      <p>The decision is up to you —</p>
                      <p>but you never carry that weight alone.</p>
                    </div>
                  </div>
                </div>
                <div className="text-[24px] text-black" style={STYLE_MONO}>
                  <p>Good hiring is a collaboration,</p>
                  <p>not a transaction.</p>
                </div>
                <div className="bg-[#fb8349] flex flex-col items-start p-[6px]">
                  <button
                    onClick={scrollToContact}
                    className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <p className="text-[24px] text-black whitespace-nowrap" style={STYLE_MONO}>
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

// Scroll-driven: phases control which cards are collapsed.
// Phase 0: all 4 visible → Phase 1: first 2 collapse → Phase 2: 3rd collapses → Phase 3: 4th collapses
const PHASE_HEIGHT = 320;
const PHASE_COLLAPSED = [0, 2, 3, 4]; // how many cards are collapsed at each phase

function WhatWorkingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [collapsedCount, setCollapsedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      const scrolled = Math.max(0, -top);
      const phase = Math.min(
        Math.floor(scrolled / PHASE_HEIGHT),
        PHASE_COLLAPSED.length - 1
      );
      setCollapsedCount(PHASE_COLLAPSED[phase]);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#ffedd7] w-full"
      style={{ paddingBottom: `${PHASE_HEIGHT * (PHASE_COLLAPSED.length - 1)}px` }}
    >
      <div style={{ position: "sticky", top: "80px" }}>
        <div
          className="max-w-[1440px] mx-auto flex"
          style={{ gap: "61px", padding: "30px" }}
        >
          {/* Left: body text — 644px per Figma */}
          <div
            className="flex flex-col gap-[40px] items-start"
            style={{ width: "644px", flexShrink: 0 }}
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

          {/* Right: animated card stack — 675px per Figma (flex-1 fills remaining space) */}
          <div className="flex flex-col gap-[20px] flex-1">
            {WORKING_CARDS.map((card, idx) => (
              <SectionCard
                key={card.title}
                title={card.title}
                expanded={idx >= collapsedCount}
              >
                <div className="flex flex-col gap-[20px] items-start w-full">
                  {card.items.map((text) => (
                    <CheckItem key={text} icon={card.icon} text={text} />
                  ))}
                </div>
              </SectionCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PARTNERS SECTION ---
const partnerLogosRow1 = [imgImage30, imgImage31, imgImage32, imgImage33, imgImage36, imgImage34, imgImage35, imgImage37];
const partnerLogosRow2 = [imgImage38, imgImage39, imgImage40, imgImage41, imgImage42, imgImage43, imgImage44, imgImage45];

function PartnerLogo({ src }: { src: string }) {
  return (
    <div className="border-r border-black flex items-center justify-center shrink-0 w-[220px] h-[120px] p-[20px]">
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
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[30px]">
        <p className="text-[52px] text-black mb-[60px]" style={STYLE_DISPLAY}>
          My partners &amp; collaborators
        </p>
      </div>

      {/* Row 1 — scrolling left */}
      <div className="flex border-t border-b border-black overflow-hidden mb-[-1px]">
        <div className="flex animate-marquee">
          {[...partnerLogosRow1, ...partnerLogosRow1].map((src, i) => (
            <PartnerLogo key={i} src={src} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling right */}
      <div className="flex border-t border-b border-black overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {[...partnerLogosRow2, ...partnerLogosRow2].map((src, i) => (
            <PartnerLogo key={i} src={src} />
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
      <div className="max-w-[1440px] mx-auto px-[30px]">
        <p className="text-[52px] text-black mb-[60px] whitespace-nowrap" style={STYLE_DISPLAY}>
          Roles that i hire for
        </p>

        <div className="flex gap-[30px]">
          {roles.map((role) => (
            <div key={role.title} className="flex-1 basis-0 min-w-0">
              <div className="bg-white flex flex-col h-full p-[10px]">
                <div className="flex items-start mb-[-1.372px]">
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="flex-1 text-[28px] text-black whitespace-pre-line" style={STYLE_DISPLAY}>
                      {role.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="border-[1.372px] border-black flex flex-1 items-start justify-center p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                    <p className="text-[24px] text-black text-left" style={STYLE_MONO}>
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
    title: "Co-founder, Curio",
    photo: "/photo_gaston.jpeg",
    text: [
      "Tiffany's took the time to understand my interests and introduced the opportunity when she saw it was a perfect match.",
      "This refreshing approach builds trust and confidence. I was considering other opportunities at the time, but I chose the role at Curio partly because of the assurance Tiffany provided during the hiring process.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need.",
    ],
  },
  {
    name: "Jonathan Canizales",
    title: "Chief of Staff, Mindgard",
    photo: "/photo_jonathan.jpeg",
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process. I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process. Most importantly, the entire process was incredibly fast, which was a huge plus.",
      "I would definitely work with Tiffany again and highly recommend her to anyone in need of a top-notch recruiter.",
    ],
  },
  {
    name: "Maria Monks",
    title: "IQ Capital",
    photo: "/photo_maria.jpeg",
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across the IQ Capital portfolio. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment, and building teams, related.",
    ],
  },
  {
    name: "Govind Balakrishnan",
    title: "Co-founder, Curio",
    photo: "/photo_govind.jpeg",
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires at Curio. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
      "Thanks to our collaboration, we have a phenomenal tight-knit team, investment from tier 1 Silicon Valley investors and partnerships with top media outlets. We trust her fully and will work with her again.",
    ],
  },
];

// Single testimonial card — Figma 204-178 layout
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white flex flex-col p-[10px] w-full">
      {/* Header: photo + name/title */}
      <div className="flex items-start w-full" style={{ marginBottom: '-1.372px' }}>
        <div style={{
          width: '222px', height: '195px', flexShrink: 0,
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignSelf: 'stretch' }}>
          <div style={{
            border: '1.372px solid black', borderRadius: '0 8px 0 0',
            flex: 1, display: 'flex', alignItems: 'center', padding: '0 30px',
            marginBottom: '-1.372px',
          }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: '32px', color: 'black', whiteSpace: 'nowrap' }}>{t.name}</p>
          </div>
          <div style={{
            border: '1.372px solid black',
            flex: 1, display: 'flex', alignItems: 'center', padding: '0 30px',
          }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: '32px', color: 'black', whiteSpace: 'nowrap' }}>{t.title}</p>
          </div>
        </div>
      </div>
      {/* Quote body */}
      <div style={{
        borderLeft: '1.37px solid black', borderRight: '1.37px solid black',
        borderBottom: '1.37px solid black', borderRadius: '0 0 8px 8px',
        padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {t.text.map((para, i) => (
          <p key={i} style={{ ...STYLE_MONO, fontSize: '28px', color: 'black', width: '100%' }}>{para}</p>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIAL_PHASE = 450;

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      const scrolled = Math.max(0, -top);
      setActiveIdx(Math.min(Math.floor(scrolled / TESTIMONIAL_PHASE), testimonials.length - 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#ffedd7] w-full"
      style={{ paddingBottom: `${TESTIMONIAL_PHASE * (testimonials.length - 1)}px` }}
    >
      <div style={{ position: 'sticky', top: '80px' }}>
        <div style={{
          maxWidth: '1440px', margin: '0 auto',
          padding: '30px', display: 'flex', gap: '61px', alignItems: 'flex-start',
        }}>
          {/* Left: heading + progress dots */}
          <div style={{ width: '644px', flexShrink: 0 }}>
            <p style={{ ...STYLE_DISPLAY, fontSize: '52px', color: 'black', whiteSpace: 'pre' }}>
              {`I could keep going.\nBut they'll say it better.`}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '40px' }}>
              {testimonials.map((_, i) => (
                <div key={i} style={{
                  height: '8px', borderRadius: '4px', backgroundColor: '#4d453b',
                  opacity: i === activeIdx ? 1 : 0.25,
                  width: i === activeIdx ? '32px' : '8px',
                  transition: 'width 0.35s ease, opacity 0.35s ease',
                }} />
              ))}
            </div>
          </div>

          {/* Right: scroll-driven card stack */}
          <div style={{ flex: 1, position: 'relative' }}>
            {testimonials.map((t, idx) => {
              const offset = idx - activeIdx;
              const isActive = offset === 0;
              const isPast = offset < 0;
              const isComing = offset > 0;
              return (
                <div
                  key={t.name}
                  style={{
                    // Active card is in flow (sets container height); others absolute
                    position: isActive ? 'relative' : 'absolute',
                    top: 0, left: 0, right: 0,
                    zIndex: testimonials.length - Math.abs(offset),
                    transform: isActive
                      ? 'translateY(0) scale(1)'
                      : isPast
                        ? 'translateY(-24px) scale(0.97)'
                        : `translateY(${Math.min(offset * 18, 54)}px) scale(${Math.max(0.94, 0.97 - (offset - 1) * 0.015)})`,
                    opacity: isActive ? 1 : offset === 1 ? 0.3 : 0,
                    transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <TestimonialCard t={t} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CTA / CONTACT SECTION ---
function CTASection() {
  return (
    <section id="contact" className="bg-[#eaeae5] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[30px]">
        {/* Top row: headline + tagline */}
        <div className="flex gap-[35px] items-end mb-[60px]">
          <div className="shrink-0 w-[655px]">
            <div className="text-[52px] text-black" style={STYLE_DISPLAY}>
              <p>If you&apos;ve read</p>
              <p>this far, we should</p>
              <p>probably talk</p>
            </div>
          </div>
          <div className="text-[24px] text-black whitespace-nowrap" style={STYLE_MONO}>
            <p>I&apos;d love to hear what you&apos;re building</p>
            <p>or just have a good conversation with you</p>
          </div>
        </div>

        {/* Bottom row: contacts + form */}
        <div className="flex gap-[30px]">
          {/* Left: contacts */}
          <div className="flex flex-col gap-[30px] items-start shrink-0 w-[300px]">
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p className="text-[16px]" style={STYLE_DISPLAY}>Contacts</p>
              <div className="flex flex-col gap-[10px] text-[16px]" style={STYLE_MONO}>
                <p>tprecruitment.co</p>
                <p>tiffany@tprecruitment.co</p>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p style={STYLE_DISPLAY}>Office</p>
              <p style={STYLE_MONO}>
                20-22 Wenlock Road<br />
                London, England, N1 7GU
              </p>
            </div>
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p style={STYLE_DISPLAY}>Socials</p>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={imgLinkedInIcon} alt="LinkedIn" className="size-[16px]" />
                  <a className="text-[16px]" href="https://www.linkedin.com/in/tiffany-philippou/" target="_blank" style={STYLE_MONO}>Tiffany Philippou</a>
                </div>
                <div className="flex gap-[6px] items-center">
                  <img src={imgLinkedInIcon} alt="LinkedIn" className="size-[16px]" />
                  <a className="text-[16px]" href="https://www.linkedin.com/company/tp-recruitment/" target="_blank" style={STYLE_MONO}>TPRecruitment</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex flex-col gap-[30px] flex-1">
            <div className="flex flex-col gap-[30px]">
              {/* Name + Email row */}
              <div className="flex gap-[30px]">
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="text-[16px] tracking-[-0.8px] leading-[1.08]"
                    style={STYLE_DISPLAY}>
                    Your Name &amp; Surname
                  </label>
                  <input
                    type="text"
                    className="w-full h-[24px] border-b border-[#4d453b] bg-transparent outline-none text-[16px]"
                    style={STYLE_MONO}
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="text-[16px] tracking-[-0.8px] leading-[1.08]"
                    style={STYLE_DISPLAY}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full h-[24px] border-b border-[#4d453b] bg-transparent outline-none text-[16px]"
                    style={STYLE_MONO}
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-[15px]">
                <label className="text-[16px] tracking-[-0.8px] leading-[1.08]"
                  style={STYLE_DISPLAY}>
                  Tell me about you
                </label>
                <textarea
                  className="w-full h-[197px] border border-[#949494] rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] resize-none"
                  style={STYLE_MONO}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="bg-[#fb8349] flex flex-col items-start p-[6px] self-start">
              <button className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity">
                <p className="text-[20px] leading-[20px] text-black whitespace-nowrap" style={STYLE_MONO}>
                  Let&apos;s talk
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#4d453b] w-full overflow-hidden relative h-[400px]">
      {/* Big TPRecruitment logo */}
      <img
        src="/TPRecruitment_FooterLogo.svg"
        alt="TPRecruitment"
        className="absolute left-[30px] right-[30px]"
        style={{ top: '30px', width: 'calc(100% - 60px)', height: 'auto' }}
      />

      {/* Bottom bar */}
      <div className="absolute bottom-[30px] left-[30px] right-[30px] flex items-end justify-between text-white">
        <p className="text-[14px]" style={STYLE_DISPLAY}>All rights reserved.</p>
        <div className="flex gap-[6px] items-center">
          <span className="text-[28px]" style={STYLE_DISPLAY}>©</span>
          <span className="text-[20px]" style={STYLE_DISPLAY}>2026 TP Recruitment</span>
        </div>
        <a className="text-[14px]" href="https://www.unknw.com/" target="_blank" style={STYLE_DISPLAY}>brand &amp; website by UNKNW</a>
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
