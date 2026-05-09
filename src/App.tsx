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

const FONT_DISPLAY = "'GT Canon Trial', Georgia, serif";
const FONT_MONO = "'GT Pressura Mono', 'Courier New', monospace";
const FONT_SCRIPT = "'Seaweed Script', cursive";

// Reusable check icon components
function CheckIcon() {
  return (
    <div className="shrink-0 size-[18px] rounded-[2px] bg-[#fb8349]" />
  );
}

function DashIcon() {
  return (
    <div className="shrink-0 size-[18px] rounded-[2px] border border-[#4d453b]" />
  );
}

function CrossIcon() {
  return (
    <div className="shrink-0 size-[18px] rounded-[2px] bg-[#4d453b]" />
  );
}

function CheckItem({ text, icon = "check" }: { text: string; icon?: "check" | "dash" | "cross" }) {
  return (
    <div className="flex gap-5 items-start w-full">
      <div className="flex items-center justify-center shrink-0 mt-[3px]">
        {icon === "check" ? <CheckIcon /> : icon === "cross" ? <CrossIcon /> : <DashIcon />}
      </div>
      <p className="flex-1 leading-[1.1] text-black text-[20px]" style={{ fontFamily: FONT_MONO }}>
        {text}
      </p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white flex flex-col items-start p-[10px] w-full">
      <div className="flex items-start mb-[-1.372px] w-full">
        <div className="border-[1.372px] border-black flex flex-1 items-start p-[30px] rounded-tl-[8px] rounded-tr-[8px]">
          <p className="leading-[1.08] text-[32px] text-black tracking-[-0.96px] whitespace-nowrap"
            style={{ fontFamily: FONT_DISPLAY }}>
            {title}
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-start w-full">
        <div className="border-[1.372px] border-black flex flex-1 flex-col items-start p-[30px] rounded-bl-[8px] rounded-br-[8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// --- NAV ---
function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-[#ffedd7] flex items-start justify-between px-[30px] py-[20px] w-full border-b border-black/10">
      <div className="bg-white flex items-start p-[6px]">
        <div className="flex items-start">
          <div className="border-[1.1px] border-black flex items-center justify-center px-[5px] py-[16px] rounded-bl-[6px] rounded-tl-[6px] w-[200px]">
            <p className="text-[22px] text-black tracking-[-0.5px] whitespace-nowrap"
              style={{ fontFamily: FONT_DISPLAY }}>
              TPRecruitment
            </p>
          </div>
          <div className="flex items-start self-stretch w-[200px]">
            <div className="border-[1.1px] border-black flex flex-1 h-full items-center justify-center px-[9px] py-[5px] leading-[0]">
              <p className="flex-1 text-[10px] text-black leading-[1.1]" style={{ fontFamily: FONT_MONO }}>
                The personal<br />recruitment standard.
              </p>
            </div>
            <div className="border-[1.1px] border-black flex flex-1 h-full items-center justify-center p-[5px] rounded-br-[6px] rounded-tr-[6px]">
              <p className="text-[15px] text-black whitespace-nowrap" style={{ fontFamily: FONT_SCRIPT }}>
                Tiffany Philippou
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col items-start p-[6px]">
        <button className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer hover:bg-[#fb8349] transition-colors">
          <p className="text-[18px] text-black whitespace-nowrap leading-[20px]" style={{ fontFamily: FONT_MONO }}>
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
          <p className="text-[60px] leading-[1.1] tracking-[-3px] text-black max-w-[1155px]"
            style={{ fontFamily: FONT_DISPLAY }}>
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
                  <p className="flex-1 text-[28px] leading-[1.08] tracking-[-0.84px] text-black"
                    style={{ fontFamily: FONT_DISPLAY }}>
                    Usual process of recruitment:
                  </p>
                </div>
              </div>
              <div className="flex flex-1 items-start">
                <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[30px] items-center p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                  <div className="flex flex-col gap-[20px] items-start w-full">
                    {[
                      "You fill out a brief.",
                      "You get CVs.",
                      "You do the thinking.",
                    ].map((text) => (
                      <div key={text} className="flex gap-5 items-start w-full">
                        <div className="shrink-0 size-[18px] rounded-[2px] border border-[#4d453b] mt-[3px]" />
                        <p className="flex-1 text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="w-full text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
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
                <p className="flex-1 text-[28px] leading-[1.08] tracking-[-0.84px] text-black"
                  style={{ fontFamily: FONT_DISPLAY }}>
                  Working with me:
                </p>
              </div>
            </div>
            <div className="flex items-end">
              <div className="border-[1.372px] border-black flex flex-1 flex-col gap-[40px] items-start p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                <div className="flex flex-col gap-[20px] items-start w-full">
                  <div className="flex gap-5 items-start w-full">
                    <CheckIcon />
                    <p className="flex-1 text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
                      You have a conversation.
                    </p>
                  </div>
                  <div className="flex gap-5 items-start w-full">
                    <CheckIcon />
                    <p className="flex-1 text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
                      You meet people I believe in.
                    </p>
                  </div>
                  <div className="flex gap-5 items-start w-full">
                    <CheckIcon />
                    <div className="flex-1 text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
                      <p>The decision is up to you —</p>
                      <p>but you never carry that weight alone.</p>
                    </div>
                  </div>
                </div>
                <div className="text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
                  <p>Good hiring is a collaboration,</p>
                  <p>not a transaction.</p>
                </div>
                <div className="bg-[#fb8349] flex flex-col items-start p-[6px]">
                  <button className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity">
                    <p className="text-[24px] leading-[20px] text-black whitespace-nowrap" style={{ fontFamily: FONT_MONO }}>
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
function WhatWorkingSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-0">
          {/* Left: body text */}
          <div className="flex flex-col gap-[40px] items-start p-[30px] w-[645px] shrink-0 self-start">
            <div className="text-[52px] tracking-[-2.6px] text-black leading-[0]"
              style={{ fontFamily: FONT_DISPLAY }}>
              <p className="leading-[1.1] mb-0">What&apos;s working</p>
              <p className="leading-[1.1]">with me looks like</p>
            </div>
            <div className="text-[24px] text-black leading-[1.1]" style={{ fontFamily: FONT_MONO }}>
              <p className="mb-[1.1em]">
                I know that growth asks a lot of a company. The pace. The pressure. The decisions that shape what comes next. None of it works without the right people around the table.
              </p>
              <p className="mb-[1.1em]">
                That&apos;s why I work in partnership with ambitious teams to find the people who can carry that responsibility, people who bring judgement, energy and ownership, people who understand what it takes to build inside a fast-moving company, people who can help shape the outcome.
              </p>
              <p>The strongest teams are built in collaboration.</p>
            </div>
          </div>

          {/* Right: card stack */}
          <div className="flex flex-col gap-[20px] items-end p-[30px] flex-1">
            {/* My standards */}
            <SectionCard title="My standards">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <CheckItem text="Personally understand and assess every candidate before sharing their name." />
                <CheckItem text="Hire through the lens of fast-moving company experience." />
                <CheckItem text="Only hand over work I can fully stand behind." />
                <CheckItem text="Treat candidates and hiring managers as people, not profiles or clients." />
              </div>
            </SectionCard>

            {/* Communication */}
            <SectionCard title="Communication">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <CheckItem text="Start with your reality, not just the brief." />
                <CheckItem text="Understand your culture, chaos level, stage, and what the right hire actually looks like." />
                <CheckItem text="Tell you what the market says, even when it is not what you want to hear." />
                <CheckItem text="Give honest feedback throughout." />
              </div>
            </SectionCard>

            {/* After the offer */}
            <SectionCard title="After the offer">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <CheckItem text="Stay involved after placement." />
                <CheckItem text="Measure outcomes, not speed." />
                <CheckItem text="Prioritize people over pipeline." />
                <CheckItem text="Prioritize outcomes over optics." />
              </div>
            </SectionCard>

            {/* What I won't do */}
            <SectionCard title="What I won't do">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <CheckItem icon="cross" text="Send 20 CVs by Friday just to fill a quota." />
                <CheckItem icon="cross" text="Drop names and disappear." />
                <CheckItem icon="cross" text="Place people who look right on paper but cannot survive the reality." />
                <CheckItem icon="cross" text="Write generic job descriptions." />
                <CheckItem icon="cross" text="Mistake activity for judgment." />
              </div>
            </SectionCard>
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
        <p className="text-[52px] leading-[1.08] tracking-[-2.6px] text-black mb-[60px]"
          style={{ fontFamily: FONT_DISPLAY }}>
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
      title: "Commercial, Growth\n& Go-to-market",
      description: "Experienced leaders who drive ambitious revenue results — not just manage them.",
    },
    {
      title: "Early-stage & First\nFunction Hires",
      description: "The entrepreneurial mindset isn't common. I find the person with it to build — not just execute even when the structure isn't there yet.",
    },
    {
      title: "Marketing,\nCreative & Design",
      description: "Full-time and contract. The people who make what you're building impossible to ignore and support your growth.",
    },
  ];

  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[30px]">
        <p className="text-[52px] leading-[1.08] tracking-[-2.6px] text-black mb-[60px] whitespace-nowrap"
          style={{ fontFamily: FONT_DISPLAY }}>
          Roles that i hire for
        </p>

        <div className="flex gap-[30px] items-stretch">
          {roles.map((role) => (
            <div key={role.title} className="flex flex-1">
              <div className="bg-white flex flex-1 flex-col p-[10px]">
                <div className="flex items-start mb-[-1.372px]">
                  <div className="border-[1.372px] border-black flex flex-1 items-start p-[20px] rounded-tl-[8px] rounded-tr-[8px]">
                    <p className="flex-1 text-[28px] leading-[1.08] tracking-[-0.84px] text-black whitespace-pre-line"
                      style={{ fontFamily: FONT_DISPLAY }}>
                      {role.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-start">
                  <div className="border-[1.372px] border-black flex flex-1 h-full items-center p-[20px] rounded-bl-[8px] rounded-br-[8px]">
                    <p className="text-[24px] leading-[1.1] text-black" style={{ fontFamily: FONT_MONO }}>
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
    bg: "#c1c497",
    photo: imgImage14,
    photoStyle: { objectFit: "contain" as const },
    text: [
      "Tiffany's took the time to understand my interests and introduced the opportunity when she saw it was a perfect match.",
      "This refreshing approach builds trust and confidence. I was considering other opportunities at the time, but I chose the role at Curio partly because of the assurance Tiffany provided during the hiring process.",
      "I highly recommend Tiffany for her exceptional ability to identify and engage top talent. If you're looking for a dedicated ambassador for your startup, she is the professional you need.",
    ],
  },
  {
    name: "Jonathan Canizales",
    title: "Chief of Staff, Mindgard",
    bg: "#90b0bb",
    photo: imgImage16,
    photoStyle: { objectFit: "cover" as const },
    text: [
      "I had the pleasure of working with Tiffany as my recruiter, and I couldn't be more impressed, she has been the best by far. She did an outstanding job from start to finish. Tiffany was super communicative, keeping me informed at every step of the process.",
      "Her honesty and openness was refreshing and made me feel confident throughout the process. I always felt I could trust her, and I truly appreciated how she checked up on me throughout the process. Most importantly, the entire process was incredibly fast, which was a huge plus.",
      "I would definitely work with Tiffany again and highly recommend her to anyone in need of a top-notch recruiter.",
    ],
  },
  {
    name: "Maria Monks",
    title: "IQ Capital",
    bg: "#edead6",
    photo: imgImage17,
    photoStyle: { objectFit: "cover" as const },
    text: [
      "Tiffany has been instrumental in helping me with marketing leadership hires across the IQ Capital portfolio. I have enjoyed working with her for years —her passion and professionalism is outstanding.",
      "She also offers a great personalised service to both individual companies, and me, and I often seek her advice on everything recruitment, and building teams, related.",
    ],
  },
  {
    name: "Govind Balakrishnan",
    title: "Co-founder, Curio",
    bg: "#ffffff",
    photo: imgImage15,
    photoStyle: { objectFit: "contain" as const },
    text: [
      "We've loved working with Tiffany over several years on multiple senior hires at Curio. Our requirements are often atypical, and she takes a very hands-on and considered approach.",
      "Thanks to our collaboration, we have a phenomenal tight-knit team, investment from tier 1 Silicon Valley investors and partnerships with top media outlets. We trust her fully and will work with her again.",
    ],
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-[#ffedd7] w-full overflow-hidden py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[30px]">
        <div className="mb-[60px]">
          <p className="text-[52px] leading-[1.08] tracking-[-2.6px] text-black whitespace-pre"
            style={{ fontFamily: FONT_DISPLAY }}>
            I could keep going.{"\n"}But they&apos;ll say it better.
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col" style={{ backgroundColor: t.bg }}>
              <div className="flex items-start p-[10px]">
                {/* Photo + name */}
                <div className="flex items-start w-full">
                  {/* Photo */}
                  <div className="border border-black h-[195px] w-[222px] shrink-0 overflow-hidden rounded-tl-[8px]">
                    <img
                      alt={t.name}
                      src={t.photo}
                      className="w-full h-full"
                      style={{ objectFit: t.photoStyle.objectFit }}
                    />
                  </div>
                  {/* Name / title */}
                  <div className="flex flex-1 flex-col self-stretch">
                    <div className="border-[1.372px] border-black flex flex-1 items-center px-[30px] rounded-tr-[8px]">
                      <p className="text-[32px] leading-[1.08] tracking-[-1.6px] text-black whitespace-nowrap"
                        style={{ fontFamily: FONT_DISPLAY }}>
                        {t.name}
                      </p>
                    </div>
                    <div className="border-[1.372px] border-black flex flex-1 items-center px-[30px]">
                      <p className="text-[32px] leading-[1.08] tracking-[-1.6px] text-black whitespace-nowrap"
                        style={{ fontFamily: FONT_DISPLAY }}>
                        {t.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quote */}
              <div className="px-[10px] pb-[10px]">
                <div className="border border-black flex flex-col gap-[20px] p-[30px] rounded-bl-[8px] rounded-br-[8px]">
                  {t.text.map((para, i) => (
                    <p key={i} className="text-[28px] leading-[1.1] text-black w-full"
                      style={{ fontFamily: FONT_MONO }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA / CONTACT SECTION ---
function CTASection() {
  return (
    <section className="bg-[#eaeae5] w-full overflow-hidden py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[30px]">
        {/* Top row: headline + tagline */}
        <div className="flex gap-[35px] items-end mb-[60px]">
          <div className="shrink-0 w-[655px]">
            <div className="text-[52px] tracking-[-2.6px] text-black leading-[0]"
              style={{ fontFamily: FONT_DISPLAY }}>
              <p className="leading-[1.08] mb-0">If you&apos;ve read</p>
              <p className="leading-[1.08]">this far, we should probably talk</p>
            </div>
          </div>
          <div className="text-[24px] text-black leading-[1.1] whitespace-nowrap" style={{ fontFamily: FONT_MONO }}>
            <p>I&apos;d love to hear what you&apos;re building</p>
            <p>or just have a good conversation with you</p>
          </div>
        </div>

        {/* Bottom row: contacts + form */}
        <div className="flex gap-[30px]">
          {/* Left: contacts */}
          <div className="flex flex-col gap-[30px] items-start shrink-0 w-[300px]">
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p className="leading-[1.08] tracking-[-0.8px]" style={{ fontFamily: FONT_DISPLAY }}>
                Contacts
              </p>
              <div className="flex flex-col gap-[10px] leading-[1.1]" style={{ fontFamily: FONT_MONO }}>
                <p>tprecruitment.co</p>
                <p>tiffany@tprecruitment.co</p>
              </div>
            </div>
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p className="leading-[1.08] tracking-[-0.8px]" style={{ fontFamily: FONT_DISPLAY }}>
                Office
              </p>
              <p className="leading-[1.1]" style={{ fontFamily: FONT_MONO }}>
                20-22 Wenlock Road<br />
                London, England, N1 7GU
              </p>
            </div>
            <div className="flex flex-col gap-[20px] items-start text-[16px] text-black">
              <p className="leading-[1.08] tracking-[-0.8px]" style={{ fontFamily: FONT_DISPLAY }}>
                Socials
              </p>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px] items-center">
                  <img src={imgLinkedInIcon} alt="LinkedIn" className="size-[16px]" />
                  <p className="text-[16px] leading-[1.1]" style={{ fontFamily: FONT_MONO }}>
                    Tiffany Philippou
                  </p>
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
                    style={{ fontFamily: FONT_DISPLAY }}>
                    Your Name &amp; Surname
                  </label>
                  <input
                    type="text"
                    className="w-full h-[24px] border-b border-[#4d453b] bg-transparent outline-none text-[16px]"
                    style={{ fontFamily: FONT_MONO }}
                  />
                </div>
                <div className="flex flex-col gap-[6px] flex-1">
                  <label className="text-[16px] tracking-[-0.8px] leading-[1.08]"
                    style={{ fontFamily: FONT_DISPLAY }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full h-[24px] border-b border-[#4d453b] bg-transparent outline-none text-[16px]"
                    style={{ fontFamily: FONT_MONO }}
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-[15px]">
                <label className="text-[16px] tracking-[-0.8px] leading-[1.08]"
                  style={{ fontFamily: FONT_DISPLAY }}>
                  Tell me about you
                </label>
                <textarea
                  className="w-full h-[197px] border border-[#949494] rounded-[4px] bg-transparent outline-none p-[12px] text-[16px] resize-none"
                  style={{ fontFamily: FONT_MONO }}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="bg-[#fb8349] flex flex-col items-start p-[6px] self-start">
              <button className="border border-black flex items-center p-[12px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity">
                <p className="text-[20px] leading-[20px] text-black whitespace-nowrap" style={{ fontFamily: FONT_MONO }}>
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
      {/* Big TPRecruitment text */}
      <p className="absolute top-[30px] left-[30px] text-[#eaeae5] leading-normal tracking-[-2.77px]"
        style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(80px, 9.6vw, 138px)" }}>
        TPRecruitment
      </p>

      {/* Bottom bar */}
      <div className="absolute bottom-[30px] left-[30px] right-[30px] flex items-end justify-between text-white">
        <p className="text-[14px] leading-none tracking-[-0.42px]" style={{ fontFamily: FONT_DISPLAY }}>
          All rights reserved.
        </p>
        <div className="flex gap-[6px] items-center">
          <span className="text-[28px] leading-none" style={{ fontFamily: "Georgia, serif" }}>©</span>
          <span className="text-[20px] leading-none tracking-[-1px]" style={{ fontFamily: FONT_DISPLAY }}>
            2026 TP Recruitment
          </span>
        </div>
        <p className="text-[14px] leading-none tracking-[-0.7px]" style={{ fontFamily: FONT_DISPLAY }}>
          brand &amp; website by UNKNW
        </p>
      </div>
    </footer>
  );
}

// --- APP ---
export default function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1440px] mx-auto">
        <Navbar />
      </div>
      <div className="w-full">
        <HeroSection />
        <WhatWorkingSection />
        <PartnersSection />
        <RolesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
