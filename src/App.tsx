import { useState, useEffect, useRef } from "react";

// ─── TYPES ────────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
}

// ─── REVEAL ON SCROLL ─────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "", direction = "up" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up:    visible ? "translateY(0)"   : "translateY(36px)",
    left:  visible ? "translateX(0)"   : "translateX(-48px)",
    right: visible ? "translateX(0)"   : "translateX(48px)",
    scale: visible ? "scale(1)"        : "scale(0.9)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────
const ROLES = ["Full-Stack Developer", ".NET Engineer", "React Specialist", "Software Engineer"];

const SKILLS = [
  { cat: "Languages",       items: [{ label: "C#", icon: "⚡" }, { label: "TypeScript", icon: "🔷" }, { label: "JavaScript", icon: "🟡" }, { label: "SQL", icon: "🗄" }] },
  { cat: "Frontend",        items: [{ label: "React", icon: "⚛️" }, { label: "RxJS", icon: "🔄" }, { label: "HTML5", icon: "🌐" }, { label: "CSS3", icon: "🎨" }] },
  { cat: "Backend",         items: [{ label: "ASP.NET Core", icon: "🌿" }, { label: "REST APIs", icon: "🔗" }, { label: "Entity Framework", icon: "🧬" }, { label: "OAuth 2.0", icon: "🔐" }] },
  { cat: "Desktop & Tools", items: [{ label: "WPF (.NET)", icon: "🖥" }, { label: "Revit API", icon: "🏗" }, { label: "SQL Server", icon: "🗄" }, { label: "Git", icon: "🌿" }] },
];

const EXPERIENCES = [
  {
    company: "AMC Bridge, Inc.",
    role: "Software Engineer",
    period: "Nov 2024 – Present",
    current: true,
    projects: [
      {
        name: "ESDT Portal — BIM Scoping Web App",
        stack: ["React", "TypeScript", "RxJS"],
        bullets: [
          "Developed modular frontend components using React and TypeScript for enterprise application workflows.",
          "Implemented dependency injection patterns and reactive data handling with RxJS observables.",
          "Contributed to asset management and scoping modules with reusable, testable component design.",
        ],
      },
      {
        name: "Revit Automation Add-in",
        stack: ["C#", ".NET 8", "WPF", "Revit API"],
        bullets: [
          "WPF-based Revit 2025 add-in automating family creation and instance placement workflows.",
          "CSV-driven data import and revision-aware update logic using Revit API transactions.",
          "Structured folder-scanning and processing pipeline for geometry and metadata handling.",
        ],
      },
    ],
  },
  {
    company: "vConstruct Private Limited",
    role: "Full-Stack Developer",
    period: "Jun 2022 – Oct 2024",
    current: false,
    projects: [
      {
        name: "Nirmaan — Construction Management Platform",
        stack: ["ASP.NET Core", "React", "SQL Server"],
        bullets: [
          "Full-stack modules for project scheduling, activity linking, and WBS generation workflows.",
          "Role-based authentication and email notifications for secure multi-user access.",
          "Optimized SQL Server schemas managing project hierarchy and activity dependencies.",
        ],
      },
      {
        name: "FiMa — Field Management Application",
        stack: ["ASP.NET Core", "React", "TypeScript", "REST APIs"],
        bullets: [
          "Real-time issue tracking and sheet management with API-based sync across mobile and web.",
          "Backend in C# with TypeScript frontend for responsive workflow management.",
          "Efficient data models and REST APIs supporting field-to-office data consistency.",
        ],
      },
      {
        name: "MRQC — Model Review & QC",
        stack: ["C#", "WPF", "Revit API", "SQL Server"],
        bullets: [
          "C# WPF add-in automating parametric and non-parametric model validation logic.",
          "Rule-based validation with API-driven data exchange to a centralized SQL database.",
          "Improved review efficiency by automating compliance checks across engineering disciplines.",
        ],
      },
    ],
  },
];

// ─── SECTION HEADER ───────────────────────────────────────────
const SectionHeader = ({
  eyebrow, title, italic, sub, center = false,
}: { eyebrow: string; title: string; italic?: string; sub?: string; center?: boolean }) => (
  <div style={{ textAlign: center ? "center" : "left" }}>
    <p style={{
      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
      background: "linear-gradient(90deg, var(--a1), var(--a2))", WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent", marginBottom: "0.75rem",
      display: "flex", alignItems: "center", gap: 12,
      justifyContent: center ? "center" : "flex-start",
    }}>
      {!center && <span style={{ width: 28, height: 1.5, background: "linear-gradient(90deg,var(--a1),var(--a2))", display: "block", flexShrink: 0 }} />}
      {eyebrow}
    </p>
    <h2 style={{
      fontFamily: "var(--ff-display)", fontSize: "clamp(2rem,5vw,3.5rem)",
      fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", margin: 0,
    }}>
      {title}{" "}
      {italic && (
        <em style={{
          fontFamily: "var(--ff-serif)", fontStyle: "italic",
          background: "linear-gradient(135deg,var(--a1),var(--a3))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{italic}</em>
      )}
    </h2>
    {sub && (
      <p style={{ color: "var(--text-secondary)", fontSize: "1.02rem", lineHeight: 1.8, marginTop: "0.9rem", maxWidth: 560 }}>{sub}</p>
    )}
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Apply theme to <html> so CSS attribute selectors work
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const cur = ROLES[roleIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        setTypedText(cur.slice(0, charIdx + 1));
        if (charIdx + 1 === cur.length) setTimeout(() => setDeleting(true), 1800);
        else setCharIdx((c) => c + 1);
      } else {
        setTypedText(cur.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? 42 : 88);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  // Active section tracker
  useEffect(() => {
    const ids = ["hero", "about", "skills", "experience", "education", "contact"];
    const onScroll = () => {
      const y = window.scrollY;
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const isDark = theme === "dark";
  const NAV_ITEMS = ["about", "skills", "experience", "education", "contact"];

  // ── CSS variables injected via style tag
  const cssVars = `
    @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@300;400;500;700;800&family=Instrument+Serif:ital@0;1&display=swap');
    @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

    :root {
      --a1: #c084fc;
      --a2: #38bdf8;
      --a3: #fb7185;
      --a4: #34d399;
      --ff-display: 'Clash Display', 'Cabinet Grotesk', sans-serif;
      --ff-body: 'Cabinet Grotesk', sans-serif;
      --ff-serif: 'Instrument Serif', Georgia, serif;
    }

    /* DARK — deep near-black, vivid glass */
    [data-theme="dark"] {
      --text-primary:   #f1f5f9;
      --text-secondary: #94a3b8;
      --text-muted:     #475569;
      --bg:             #04040e;
      --glass:          rgba(255,255,255,0.055);
      --glass-strong:   rgba(255,255,255,0.095);
      --glass-border:   rgba(255,255,255,0.10);
      --glass-shadow:   0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
      --grid-line:      rgba(255,255,255,0.028);
      --orb-opacity:    0.32;
    }

    /* LIGHT — crisp white, high contrast dark text */
    [data-theme="light"] {
      --text-primary:   #080812;
      --text-secondary: #1e2a3a;
      --text-muted:     #64748b;
      --bg:             #fafafa;
      --glass:          rgba(255,255,255,0.78);
      --glass-strong:   rgba(255,255,255,0.95);
      --glass-border:   rgba(0,0,0,0.09);
      --glass-shadow:   0 4px 20px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1);
      --grid-line:      rgba(80,60,180,0.055);
      --orb-opacity:    0.12;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--ff-body);
      background: var(--bg);
      color: var(--text-primary);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      transition: background 0.4s ease, color 0.4s ease;
    }
    a { text-decoration: none; color: inherit; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(var(--a1), var(--a2)); border-radius: 10px; }
    @keyframes drift {
      0%   { transform: translate(0,0) rotate(0deg); }
      25%  { transform: translate(60px,-40px) rotate(90deg); }
      50%  { transform: translate(-40px,60px) rotate(180deg); }
      75%  { transform: translate(40px,40px) rotate(270deg); }
      100% { transform: translate(0,0) rotate(360deg); }
    }
    @keyframes pulse-green { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)} 50%{box-shadow:0 0 0 6px rgba(52,211,153,0)} }
    @keyframes blink { 50%{opacity:0} }
  `;

  // ── Shared glass style
  const glass: React.CSSProperties = {
    background: "var(--glass)",
    backdropFilter: "blur(24px) saturate(160%)",
    WebkitBackdropFilter: "blur(24px) saturate(160%)",
    border: "1px solid var(--glass-border)",
    borderRadius: 20,
    boxShadow: "var(--glass-shadow)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      <style>{cssVars}</style>

      {/* ── AURORA BACKGROUND */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { size: 600, color: "var(--a1)", top: "-15%", left: "-10%", dur: "25s", delay: "0s" },
          { size: 500, color: "var(--a2)", top: "15%", right: "-12%", dur: "30s", delay: "-8s" },
          { size: 420, color: "var(--a3)", bottom: "5%",  left: "18%",  dur: "20s", delay: "-12s" },
          { size: 350, color: "var(--a4)", bottom: "-8%", right: "8%",  dur: "35s", delay: "-5s" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            top: o.top, left: (o as any).left, right: (o as any).right, bottom: (o as any).bottom,
            filter: "blur(80px)", opacity: isDark ? 0.32 : 0.12,
            animation: `drift ${o.dur} linear ${o.delay} infinite`,
          }} />
        ))}
        {/* Mesh grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(var(--grid-line, rgba(255,255,255,0.025)) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line, rgba(255,255,255,0.025)) 1px,transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
      </div>

      {/* ── SCROLL PROGRESS */}
      <ScrollProgress />

      {/* ── NAV */}
      <nav style={{
        position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 500, display: "flex", alignItems: "center", gap: 3,
        padding: "7px 10px",
        ...glass, borderRadius: 999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        maxWidth: "calc(100vw - 32px)",
      }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              background: activeSection === item
                ? "linear-gradient(135deg,rgba(192,132,252,0.18),rgba(56,189,248,0.18))"
                : "none",
              border: "none",
              borderRadius: 999,
              color: activeSection === item ? "var(--a1)" : "var(--text-secondary)",
              fontFamily: "var(--ff-body)",
              fontSize: "0.82rem",
              fontWeight: activeSection === item ? 600 : 500,
              padding: "7px 15px",
              cursor: "pointer",
              textTransform: "capitalize",
              letterSpacing: "0.02em",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
              display: typeof window !== "undefined" && window.innerWidth < 900 ? "none" : "block",
            }}
          >{item}</button>
        ))}
        <div style={{ paddingLeft: 6, marginLeft: 4, borderLeft: "1px solid var(--glass-border)", display: "flex", gap: 6, alignItems: "center" }}>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            title="Toggle theme"
          >{isDark ? "🌙" : "☀️"}</button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              color: "var(--text-primary)", fontSize: "1rem", cursor: "pointer",
              display: "none",
              alignItems: "center", justifyContent: "center",
            }}
            className="mobile-menu-btn"
          >{menuOpen ? "✕" : "☰"}</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 76, left: 16, right: 16, zIndex: 490,
          padding: 16, ...glass, borderRadius: 20,
        }}>
          {[...NAV_ITEMS].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} style={{
              display: "block", width: "100%", background: "none", border: "none",
              textAlign: "left", fontSize: "1rem", color: "var(--text-primary)",
              padding: "11px 16px", borderRadius: 12, cursor: "pointer",
              fontWeight: 500, textTransform: "capitalize",
              borderBottom: "1px solid var(--glass-border)",
            }}>{item}</button>
          ))}
        </div>
      )}

      {/* ──────────── PAGE ──────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══ HERO ═══ */}
        <section id="hero" style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          padding: "clamp(7rem,14vw,10rem) clamp(1.5rem,6vw,5rem) 4rem",
        }}>
          <div style={{ maxWidth: 760, width: "100%" }}>
            {/* Badge */}
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 16px", ...glass, borderRadius: 999,
                fontSize: "0.77rem", fontWeight: 600, color: "var(--text-secondary)",
                letterSpacing: "0.06em", marginBottom: "1.75rem",
              }}>
                <span style={{
                  width: 7, height: 7, background: "var(--a4)", borderRadius: "50%",
                  flexShrink: 0, animation: "pulse-green 2.5s ease infinite",
                }} />
                Open to new opportunities
              </div>
            </Reveal>

            {/* Name */}
            <Reveal delay={0.05}>
              <h1 style={{
                fontFamily: "var(--ff-display)", fontSize: "clamp(3.5rem,11vw,8rem)",
                fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em",
                marginBottom: "0.5rem",
              }}>
                <span style={{ color: "var(--text-primary)", display: "block" }}>Shiva</span>
                <span style={{
                  display: "block",
                  WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.22)" : "1.5px rgba(8,8,18,0.18)",
                  color: "transparent",
                }}>Charan.</span>
              </h1>
            </Reveal>

            {/* Role typewriter */}
            <Reveal delay={0.1}>
              <div style={{
                fontFamily: "var(--ff-serif)", fontStyle: "italic",
                fontSize: "clamp(1.15rem,3vw,1.9rem)", color: "var(--text-secondary)",
                marginBottom: "1.5rem", minHeight: "1.5em", letterSpacing: "-0.01em",
              }}>
                <span style={{ color: "var(--a1)" }}>{typedText}</span>
                <span style={{
                  display: "inline-block", width: 2, height: "0.9em", background: "var(--a2)",
                  marginLeft: 3, verticalAlign: "middle", animation: "blink 0.9s step-end infinite",
                }} />
              </div>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.15}>
              <p style={{
                color: "var(--text-secondary)", fontSize: "clamp(0.95rem,1.8vw,1.08rem)",
                lineHeight: 1.85, maxWidth: 560, marginBottom: "2.5rem",
              }}>
                Full-Stack Developer with <strong style={{ color: "var(--text-primary)" }}>3+ years of experience</strong> building scalable web applications using <strong style={{ color: "var(--text-primary)" }}>.NET and React</strong>. Strong in designing REST APIs, modular front-end architectures, and SQL-backed systems — with a focus on clean architecture and performance.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={() => scrollTo("experience")}
                  style={{
                    padding: "13px 28px", borderRadius: 999,
                    background: "linear-gradient(135deg,var(--a1),var(--a2))",
                    border: "none", color: "#fff",
                    fontFamily: "var(--ff-body)", fontSize: "0.92rem", fontWeight: 700,
                    cursor: "pointer", boxShadow: "0 6px 28px rgba(192,132,252,0.4)",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(192,132,252,0.6)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(192,132,252,0.4)"; }}
                >View My Work ↓</button>
                <button
                  onClick={() => scrollTo("contact")}
                  style={{
                    padding: "13px 28px", borderRadius: 999,
                    ...glass, color: "var(--text-primary)",
                    fontFamily: "var(--ff-body)", fontSize: "0.92rem", fontWeight: 600,
                    cursor: "pointer", border: "1px solid var(--glass-border)",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(192,132,252,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.transform = "none"; }}
                >Let's Talk →</button>
                <a
                  href="/src/assets/ShivaCharan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "13px 24px", borderRadius: 999,
                    background: "var(--glass)", border: "1px solid var(--glass-border)",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--ff-body)", fontSize: "0.88rem", fontWeight: 600,
                    textDecoration: "none",
                    backdropFilter: "blur(16px)",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(192,132,252,0.45)"; e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.transform = "none"; }}
                >↓ Resume</a>
              </div>
            </Reveal>

            {/* Socials */}
            <Reveal delay={0.25}>
              <div style={{ display: "flex", gap: 10, marginTop: "1.75rem" }}>
                {[
                  { icon: "✉", href: "mailto:charan.shiva567@gmail.com", label: "Email" },
                  { icon: "in", href: "https://www.linkedin.com/in/shivacharanreddy-admala/", label: "LinkedIn" },
                  { icon: "📱", href: "tel:+918639364151", label: "Phone" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    title={s.label}
                    style={{
                      width: 42, height: 42, borderRadius: "50%",
                      ...glass, display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)", fontSize: "0.95rem",
                      transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--a1)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(192,132,252,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--glass-shadow)"; }}
                  >{s.icon}</a>
                ))}
              </div>
            </Reveal>

            {/* Scroll hint */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              gap: 6, marginTop: "3.5rem", color: "var(--text-muted)",
              fontSize: "0.62rem", letterSpacing: "0.2em",
            }}>
              SCROLL
              <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--a1), transparent)" }} />
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="01 — About" title="The human behind" italic="the code" />
            </Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
              gap: "clamp(2.5rem,5vw,5rem)",
              marginTop: "clamp(2.5rem,4vw,3.5rem)",
              alignItems: "start",
            }}>
              <Reveal direction="left" delay={0.05}>
                <div>
                  {[
                    <>Full-Stack Developer with <strong style={{ color: "var(--text-primary)" }}>3+ years of experience</strong> building scalable web applications using <strong style={{ color: "var(--text-primary)" }}>.NET and React</strong>. Strong in designing REST APIs, modular front-end architectures, and SQL-backed systems.</>,
                    <>Experienced in developing <strong style={{ color: "var(--text-primary)" }}>enterprise-grade solutions</strong> across web and desktop environments — currently at <strong style={{ color: "var(--text-primary)" }}>AMC Bridge, Inc.</strong> contributing to frontend architecture and backend automation components.</>,
                    <>I hold an M.Tech in <em style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", color: "var(--a1)" }}>Construction Technology & Management</em> from VNIT Nagpur, which gives me domain intuition most engineers don't have — I understand the problems before I write the solutions.</>,
                  ].map((p, i) => (
                    <p key={i} style={{
                      color: "var(--text-secondary)", lineHeight: 1.9,
                      fontSize: "clamp(0.9rem,1.4vw,1rem)", marginBottom: "1.25rem",
                    }}>{p}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal direction="right" delay={0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { n: "3+",  l: "Years of Experience" },
                    { n: "5",   l: "Projects Shipped" },
                    { n: "2",   l: "Companies" },
                    { n: "8.63",l: "M.Tech CGPA" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      style={{ ...glass, borderRadius: 18, padding: "1.5rem", textAlign: "center", transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.3)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--glass-border)"; }}
                    >
                      <div style={{
                        fontFamily: "var(--ff-display)", fontSize: "2.1rem", fontWeight: 700,
                        background: "linear-gradient(135deg,var(--a1),var(--a2))",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        lineHeight: 1, marginBottom: 6,
                      }}>{s.n}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.06em", fontWeight: 500 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="skills" style={{
          padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)",
          background: "var(--glass)", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader
                eyebrow="02 — Skills"
                title="My"
                italic="tech stack"
                sub="The tools I reach for to build fast, maintainable, production-ready software."
              />
            </Reveal>
            <div style={{ marginTop: "3rem" }}>
              {SKILLS.map((group, gi) => (
                <div key={group.cat}>
                  <Reveal delay={gi * 0.06}>
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em",
                      textTransform: "uppercase", color: "var(--text-muted)",
                      marginBottom: 12, marginTop: gi === 0 ? 0 : 28,
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      {group.cat}
                      <span style={{ flex: 1, height: 1, background: "var(--glass-border)", display: "block" }} />
                    </p>
                  </Reveal>
                  <Reveal delay={gi * 0.06 + 0.04}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {group.items.map((skill) => (
                        <div
                          key={skill.label}
                          style={{
                            display: "flex", alignItems: "center", gap: 9,
                            padding: "12px 18px", ...glass, borderRadius: 14,
                            fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)",
                            cursor: "default", transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                            position: "relative", overflow: "hidden",
                          }}
                          onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = "var(--text-primary)"; el.style.transform = "translateY(-3px)"; el.style.borderColor = "rgba(192,132,252,0.3)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(192,132,252,0.2)"; }}
                          onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = "var(--text-secondary)"; el.style.transform = "none"; el.style.borderColor = "var(--glass-border)"; el.style.boxShadow = "var(--glass-shadow)"; }}
                        >
                          <span style={{ fontSize: "1.1rem", lineHeight: 1, flexShrink: 0 }}>{skill.icon}</span>
                          {skill.label}
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="03 — Experience" title="Where I've" italic="built things" />
            </Reveal>
            <div style={{ marginTop: "clamp(2.5rem,4vw,3.5rem)", position: "relative" }}>
              {/* Timeline spine */}
              <div style={{
                position: "absolute", left: 0, top: 8, bottom: 0, width: 1,
                background: `linear-gradient(to bottom, var(--a1), var(--a2), transparent)`,
                opacity: 0.35,
              }} />
              <div style={{ paddingLeft: "clamp(2rem,5vw,4rem)", display: "flex", flexDirection: "column", gap: "clamp(3rem,6vw,5rem)" }}>
                {EXPERIENCES.map((exp, ei) => (
                  <Reveal key={exp.company} delay={ei * 0.08}>
                    <div style={{ position: "relative" }}>
                      {/* Timeline dot */}
                      <div style={{
                        position: "absolute", left: "clamp(-2.35rem,-5.4vw,-4.35rem)", top: 8,
                        width: 14, height: 14, borderRadius: "50%",
                        background: exp.current ? "linear-gradient(135deg,var(--a1),var(--a2))" : "var(--bg)",
                        border: `2px solid ${exp.current ? "var(--a1)" : "rgba(192,132,252,0.4)"}`,
                        boxShadow: exp.current ? "0 0 14px rgba(192,132,252,0.6)" : "none",
                      }} />
                      {/* Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: "1.5rem" }}>
                        <div>
                          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{exp.company}</h3>
                          <p style={{ color: "var(--a1)", fontWeight: 500, fontSize: "0.9rem", letterSpacing: "0.02em" }}>{exp.role}</p>
                        </div>
                        <span style={{
                          padding: "5px 14px", borderRadius: 999, fontSize: "0.73rem", fontWeight: 600, whiteSpace: "nowrap",
                          background: exp.current ? "linear-gradient(135deg,rgba(192,132,252,0.15),rgba(56,189,248,0.15))" : "var(--glass)",
                          border: `1px solid ${exp.current ? "rgba(192,132,252,0.3)" : "var(--glass-border)"}`,
                          color: exp.current ? "var(--a1)" : "var(--text-muted)",
                        }}>{exp.period}</span>
                      </div>
                      {/* Project cards */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {exp.projects.map((proj) => (
                          <div
                            key={proj.name}
                            style={{ ...glass, borderRadius: 18, padding: "clamp(1.25rem,3vw,1.75rem)", transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(192,132,252,0.35)"; e.currentTarget.style.transform = "translateX(5px) translateY(-2px)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.transform = "none"; }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                              <h4 style={{ fontFamily: "var(--ff-display)", fontSize: "0.98rem", fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "var(--a1)", fontSize: "0.75rem" }}>◈</span>
                                {proj.name}
                              </h4>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {proj.stack.map((t) => (
                                  <span key={t} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.05em", padding: "3px 9px", borderRadius: 5, background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.2)", color: "var(--a1)" }}>{t}</span>
                                ))}
                              </div>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                              {proj.bullets.map((b, bi) => (
                                <li key={bi} style={{ color: "var(--text-secondary)", fontSize: "clamp(0.83rem,1.3vw,0.9rem)", lineHeight: 1.75, paddingLeft: 16, position: "relative" }}>
                                  <span style={{ position: "absolute", left: 0, color: "var(--text-muted)" }}>–</span>
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ EDUCATION ═══ */}
        <section id="education" style={{
          padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)",
          background: "var(--glass)", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="04 — Education" title="Academic" italic="foundations" />
            </Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))",
              gap: 18, marginTop: "clamp(2rem,4vw,3rem)",
            }}>
              {[
                { icon: "🎓", degree: "M.Tech — Construction Technology & Management", school: "VNIT Nagpur", tags: [{ label: "Class of 2022" }, { label: "CGPA 8.63", highlight: true }] },
                { icon: "🏛", degree: "B.E — Civil Engineering", school: "MVSR Engineering College", tags: [{ label: "Class of 2019" }] },
              ].map((edu, i) => (
                <Reveal key={edu.degree} direction={i === 0 ? "left" : "right"} delay={i * 0.1}>
                  <div
                    style={{ ...glass, borderRadius: 20, padding: "clamp(1.5rem,3vw,2.25rem)", height: "100%", transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", position: "relative", overflow: "hidden" }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--glass-border)"; }}
                  >
                    {/* Top accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--a1),var(--a2))", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scaleX(1)"; }}
                    />
                    <div style={{ fontSize: "2.4rem", marginBottom: "1.25rem" }}>{edu.icon}</div>
                    <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "1.02rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: 8 }}>{edu.degree}</h3>
                    <p style={{ color: "var(--a2)", fontWeight: 500, fontSize: "0.88rem", marginBottom: 16 }}>{edu.school}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {edu.tags.map((tag) => (
                        <span key={tag.label} style={{
                          fontSize: "0.72rem", fontWeight: 600, padding: "4px 12px", borderRadius: 999,
                          background: tag.highlight ? "rgba(52,211,153,0.1)" : "var(--glass)",
                          border: `1px solid ${tag.highlight ? "rgba(52,211,153,0.3)" : "var(--glass-border)"}`,
                          color: tag.highlight ? "var(--a4)" : "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}>{tag.label}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <SectionHeader eyebrow="05 — Contact" title="Let's" italic="build something" center />
              </div>
            </Reveal>
            {/* Big CTA glass box */}
            <Reveal delay={0.05}>
              <div style={{
                ...glass, borderRadius: 24, padding: "clamp(2.5rem,5vw,4rem)",
                textAlign: "center", marginTop: "clamp(2.5rem,4vw,3.5rem)", marginBottom: "clamp(1.5rem,3vw,2rem)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,132,252,0.12),transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", position: "relative" }}>Have a project in mind?</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem", position: "relative" }}>Whether it's a full-stack product, a backend API, or a complex engineering automation — I'm always open to the right challenge.</p>
                <a
                  href="mailto:charan.shiva567@gmail.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 34px", borderRadius: 999,
                    background: "linear-gradient(135deg,var(--a1),var(--a2))",
                    color: "#fff", fontFamily: "var(--ff-body)", fontSize: "1rem", fontWeight: 700,
                    boxShadow: "0 6px 28px rgba(192,132,252,0.4)",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(192,132,252,0.6)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(192,132,252,0.4)"; }}
                >Say Hello ✉</a>
                <a
                  href="/src/assets/ShivaCharan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 28px", borderRadius: 999,
                    background: "var(--glass)", border: "1px solid var(--glass-border)",
                    color: "var(--text-secondary)", fontFamily: "var(--ff-body)", fontSize: "1rem", fontWeight: 600,
                    backdropFilter: "blur(16px)", marginTop: 12,
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(192,132,252,0.45)"; e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.transform = "none"; }}
                >↓ Download Resume</a>
              </div>
            </Reveal>
            {/* Contact links */}
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "✉️", label: "Email", value: "charan.shiva567@gmail.com", href: "mailto:charan.shiva567@gmail.com", external: false },
                  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/shivacharanreddy-admala", href: "https://www.linkedin.com/in/shivacharanreddy-admala/", external: true },
                  { icon: "📱", label: "Phone", value: "+91 – 8639364151", href: "tel:+918639364151", external: false },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "clamp(1rem,2.5vw,1.35rem) clamp(1.25rem,3vw,1.75rem)",
                      ...glass, borderRadius: 18, transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(8px)"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--glass-border)"; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 13, ...glass, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{c.icon}</div>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.value}</div>
                    </div>
                    <span style={{ marginLeft: "auto", color: "var(--text-muted)", flexShrink: 0, fontSize: "1rem" }}>→</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── FOOTER */}
        <footer style={{
          borderTop: "1px solid var(--glass-border)", padding: "1.75rem clamp(1.5rem,6vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "1rem", background: "var(--glass)",
        }}>
          <span style={{ fontFamily: "var(--ff-display)", fontWeight: 700, fontSize: "0.95rem", background: "linear-gradient(135deg,var(--a1),var(--a2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shiva Charan Reddy</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Designed & built with care · {new Date().getFullYear()}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Open to work · India</span>
        </footer>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 900px) {
          .mobile-menu-btn { display: none !important; }
          nav button[data-nav] { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setWidth((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 2,
      width: `${width}%`, zIndex: 9000,
      background: "linear-gradient(90deg,var(--a1),var(--a2),var(--a4))",
      boxShadow: "0 0 12px var(--a1)",
      transition: "width 0.1s linear",
    }} />
  );
}
