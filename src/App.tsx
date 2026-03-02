import { useState, useEffect, useRef } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const skills: Record<string, string[]> = {
  Languages: ["C#", "JavaScript", "TypeScript", "SQL"],
  Frontend: ["React", "RxJS", "HTML5", "CSS3"],
  Backend: ["ASP.NET Core", "REST APIs", "Entity Framework"],
  Database: ["SQL Server"],
  "Desktop / Tools": ["WPF (.NET)", "Revit 2025 API", "Git"],
};

const skillIcons: Record<string, string> = {
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  RxJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rxjs/rxjs-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "ASP.NET Core": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};

const experiences = [
  {
    company: "AMC Bridge, Inc.",
    role: "Software Engineer",
    period: "Nov 2024 – Present",
    type: "current",
    projects: [
      {
        name: "BIM Scoping Web Application",
        stack: "React · TypeScript · RxJS",
        bullets: [
          "Developed modular frontend components using React and TypeScript for enterprise application workflows.",
          "Implemented dependency injection patterns and reactive data handling using RxJS.",
          "Contributed to asset management and scoping modules with reusable and testable component design.",
        ],
      },
      {
        name: "Revit Automation Add-in",
        stack: "C# · .NET 8 · WPF · Revit API",
        bullets: [
          "Developed a WPF-based Revit 2025 add-in using C# to automate family creation and instance placement.",
          "Implemented CSV-driven data import and revision-aware update logic using Revit API transactions.",
          "Designed structured folder-scanning and processing pipeline for geometry and metadata handling.",
        ],
      },
    ],
  },
  {
    company: "vConstruct Private Limited",
    role: "Full-Stack Developer",
    period: "Jun 2022 – Oct 2024",
    type: "past",
    projects: [
      {
        name: "Nirmaan Web Application",
        stack: "ASP.NET Core · React · SQL Server",
        bullets: [
          "Full-stack modules for project scheduling, activity linking, and WBS generation workflows.",
          "Role-based authentication, email notifications, and secure multi-user access.",
          "Designed and optimized SQL Server schemas managing project hierarchy and dependencies.",
        ],
      },
      {
        name: "FiMa – Field Management Application",
        stack: "C# · TypeScript · REST APIs",
        bullets: [
          "Real-time issue tracking and sheet management with API-based sync across mobile and web.",
          "Backend services in C# with TypeScript-based frontend components for responsive workflows.",
          "Efficient REST APIs supporting field-to-office data consistency.",
        ],
      },
      {
        name: "MRQC – Model Review & QC",
        stack: "C# · WPF · Revit API · SQL Server",
        bullets: [
          "WPF-based Revit add-in automating parametric and non-parametric model validation.",
          "Rule-based validation logic with API-driven data exchange to a centralized SQL database.",
          "Improved review efficiency by automating compliance checks across engineering disciplines.",
        ],
      },
    ],
  },
];

function SectionHeader({ label, title, center = false }: { label: string; title: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      <p style={{ color: "#6366f1", letterSpacing: "0.3em", fontSize: "0.75rem", fontWeight: 700, margin: "0 0 0.75rem" }}>{label}</p>
      <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #ffffff 40%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {title}
      </h2>
      <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #6366f1, #a78bfa)", borderRadius: "2px", marginTop: "1rem", marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }} />
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const roles = ["Full-Stack Developer", ".NET Engineer", "React Specialist", "BIM Tech Builder"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTypedText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), 1500);
        else setCharIndex(c => c + 1);
      } else {
        setTypedText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) { setDeleting(false); setRoleIndex(i => (i + 1) % roles.length); setCharIndex(0); }
        else setCharIndex(c => c - 1);
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex, roles]);

  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "education", "contact"];
    const handler = () => { const y = window.scrollY; for (const id of sections) { const el = document.getElementById(id); if (el && y >= el.offsetTop - 100) setActiveSection(id); } };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navItems = ["about", "skills", "experience", "education", "contact"];

  const hov = (el: HTMLElement, on: boolean) => {
    el.style.borderColor = on ? "#6366f1" : "rgba(99,102,241,0.2)";
    el.style.background = on ? "rgba(99,102,241,0.08)" : "rgba(10,10,15,0.8)";
    el.style.transform = on ? "translateY(-2px)" : "translateY(0)";
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", backgroundColor: "#0a0a0f", color: "#e2e8f0", overflowX: "hidden" }}>
      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(99,102,241,0.2)", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <span onClick={() => scrollTo("home")} style={{ fontSize: "1.25rem", fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ASCR</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{ background: "none", border: "none", cursor: "pointer", textTransform: "capitalize", fontSize: "0.9rem", fontWeight: activeSection === item ? 600 : 400, color: activeSection === item ? "#a78bfa" : "#94a3b8", transition: "color 0.3s", letterSpacing: "0.05em" }}>
              {item}
            </button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", fontSize: "1.5rem", display: "none" }} className="mob-btn">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, background: "rgba(10,10,15,0.97)", zIndex: 99, padding: "1.5rem", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
          {navItems.map(item => <button key={item} onClick={() => scrollTo(item)} style={{ display: "block", width: "100%", background: "none", border: "none", textAlign: "left", textTransform: "capitalize", fontSize: "1.1rem", color: "#e2e8f0", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}>{item}</button>)}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)", top: -100, left: -100, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.1) 0%,transparent 70%)", bottom: 0, right: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", zIndex: 1, padding: "0 1rem" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 2rem", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", boxShadow: "0 0 40px rgba(99,102,241,0.4)", border: "3px solid rgba(99,102,241,0.5)" }}>👨‍💻</div>
          <p style={{ color: "#6366f1", letterSpacing: "0.3em", fontSize: "0.85rem", marginBottom: "1rem", fontWeight: 600 }}>HELLO, I'M</p>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 1.5rem", background: "linear-gradient(135deg,#ffffff 30%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Admala Shiva<br />Charan Reddy
          </h1>
          <div style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "#94a3b8", marginBottom: "2.5rem", minHeight: "2em" }}>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{typedText}</span>
            <span style={{ animation: "blink 1s infinite", color: "#6366f1" }}>|</span>
          </div>
          <p style={{ maxWidth: 600, margin: "0 auto 3rem", color: "#64748b", lineHeight: 1.8 }}>
            3+ years building scalable web applications with <strong style={{ color: "#e2e8f0" }}>.NET & React</strong>. Passionate about clean architecture, performance, and turning complex engineering problems into elegant solutions.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("experience")} style={{ padding: "0.85rem 2rem", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 8, color: "white", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>View My Work</button>
            <button onClick={() => scrollTo("contact")} style={{ padding: "0.85rem 2rem", background: "transparent", border: "1px solid rgba(99,102,241,0.5)", borderRadius: 8, color: "#a78bfa", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "#6366f1"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}>Get In Touch</button>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginTop: "3rem" }}>
            {[{ label: "LI", href: "https://www.linkedin.com/in/shivacharanreddy-admala/", icon: "in" }, { label: "Email", href: "mailto:charan.shiva567@gmail.com", icon: "✉" }].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ color: "#64748b", fontSize: "1.5rem", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"} onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>{l.icon}</a>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "#475569", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
          SCROLL
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#6366f1,transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionHeader label="ABOUT ME" title="Who I Am" /></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "3rem", alignItems: "center" }} className="two-col">
          <FadeIn delay={0.1}>
            <div>
              <p style={{ color: "#94a3b8", lineHeight: 2, marginBottom: "1.5rem" }}>I'm a <strong style={{ color: "#e2e8f0" }}>Full-Stack Developer</strong> with 3+ years of experience crafting scalable web applications. My stack lives at the intersection of <strong style={{ color: "#a78bfa" }}>.NET backend systems</strong> and <strong style={{ color: "#a78bfa" }}>React frontends</strong>, with a knack for designing clean REST APIs and modular architectures.</p>
              <p style={{ color: "#94a3b8", lineHeight: 2, marginBottom: "1.5rem" }}>What makes me unique is my background in <strong style={{ color: "#e2e8f0" }}>Construction Tech (BIM)</strong> — I've built enterprise Revit add-ins, automated engineering workflows, and developed field management tools that bridge the gap between software and the physical world.</p>
              <p style={{ color: "#94a3b8", lineHeight: 2 }}>M.Tech from <strong style={{ color: "#e2e8f0" }}>VNIT Nagpur</strong>, giving me a unique perspective blending domain knowledge with software engineering.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[{ v: "3+", l: "Years Experience" }, { v: "5+", l: "Projects Delivered" }, { v: ".NET + React", l: "Core Stack" }, { v: "BIM / AEC", l: "Domain Expertise" }].map(s => (
                <div key={s.l} style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>{s.v}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "6rem 2rem", background: "rgba(99,102,241,0.03)", borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><SectionHeader label="TECHNICAL SKILLS" title="My Stack" /></FadeIn>
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {Object.entries(skills).map(([cat, items], ci) => (
              <FadeIn key={cat} delay={ci * 0.05}>
                <div>
                  <p style={{ color: "#6366f1", fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem" }}>{cat.toUpperCase()}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {items.map(skill => (
                      <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 1.2rem", background: "rgba(10,10,15,0.8)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, fontSize: "0.9rem", color: "#cbd5e1", transition: "all 0.2s", cursor: "default" }}
                        onMouseEnter={e => hov(e.currentTarget as HTMLElement, true)} onMouseLeave={e => hov(e.currentTarget as HTMLElement, false)}>
                        {skillIcons[skill] && <img src={skillIcons[skill]} alt={skill} width={20} height={20} style={{ objectFit: "contain" }} onError={e => (e.currentTarget.style.display = "none")} />}
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><SectionHeader label="EXPERIENCE" title="Where I've Worked" /></FadeIn>
        <div style={{ marginTop: "3rem", position: "relative" }}>
          <div style={{ position: "absolute", left: 11, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,#6366f1,rgba(99,102,241,0.1))" }} />
          <div style={{ paddingLeft: "3rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
            {experiences.map((exp, ei) => (
              <FadeIn key={exp.company} delay={ei * 0.1}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "-3rem", top: "0.4rem", width: 24, height: 24, borderRadius: "50%", background: exp.type === "current" ? "linear-gradient(135deg,#6366f1,#a78bfa)" : "rgba(99,102,241,0.3)", border: "2px solid", borderColor: exp.type === "current" ? "#6366f1" : "rgba(99,102,241,0.4)", boxShadow: exp.type === "current" ? "0 0 12px rgba(99,102,241,0.5)" : "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{exp.company}</h3>
                      <p style={{ color: "#a78bfa", fontWeight: 500, margin: "0.25rem 0 0" }}>{exp.role}</p>
                    </div>
                    <span style={{ padding: "0.3rem 0.8rem", background: exp.type === "current" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${exp.type === "current" ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 20, fontSize: "0.8rem", color: exp.type === "current" ? "#a78bfa" : "#64748b", whiteSpace: "nowrap" }}>{exp.period}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
                    {exp.projects.map(proj => (
                      <div key={proj.name} style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 12, padding: "1.5rem", transition: "border-color 0.3s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)"}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                          <h4 style={{ margin: 0, color: "#e2e8f0", fontWeight: 600 }}>{proj.name}</h4>
                          <span style={{ fontSize: "0.75rem", color: "#6366f1", background: "rgba(99,102,241,0.1)", padding: "0.25rem 0.6rem", borderRadius: 4, fontFamily: "monospace" }}>{proj.stack}</span>
                        </div>
                        <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          {proj.bullets.map((b, bi) => <li key={bi} style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7 }}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "6rem 2rem", background: "rgba(99,102,241,0.03)", borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn><SectionHeader label="EDUCATION" title="Academic Background" /></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "3rem" }} className="two-col">
            {[
              { degree: "M.Tech – Construction Technology & Management", institute: "VNIT Nagpur", year: "2022", cgpa: "8.63" },
              { degree: "B.E – Civil Engineering", institute: "MVSR Engineering College", year: "2019", cgpa: null },
            ].map((edu, i) => (
              <FadeIn key={edu.degree} delay={i * 0.1}>
                <div style={{ background: "rgba(10,10,15,0.8)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: "2rem", transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎓</div>
                  <h3 style={{ color: "#e2e8f0", fontWeight: 700, marginBottom: "0.5rem", fontSize: "1rem" }}>{edu.degree}</h3>
                  <p style={{ color: "#a78bfa", marginBottom: "0.5rem", fontWeight: 500 }}>{edu.institute}</p>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", background: "rgba(255,255,255,0.04)", padding: "0.25rem 0.75rem", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>Class of {edu.year}</span>
                    {edu.cgpa && <span style={{ fontSize: "0.8rem", color: "#6366f1", background: "rgba(99,102,241,0.1)", padding: "0.25rem 0.75rem", borderRadius: 20, border: "1px solid rgba(99,102,241,0.2)" }}>CGPA: {edu.cgpa}</span>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn><SectionHeader label="CONTACT" title="Let's Work Together" center /></FadeIn>
          <FadeIn delay={0.1}><p style={{ color: "#64748b", marginTop: "1.5rem", lineHeight: 1.8 }}>Whether it's a full-stack product, a backend API, or a complex engineering automation — I'm always open to new challenges and conversations.</p></FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "3rem" }}>
              {[
                { icon: "✉️", label: "Email", value: "charan.shiva567@gmail.com", href: "mailto:charan.shiva567@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 8639364151", href: "tel:+918639364151" },
                { icon: "💼", label: "LinkedIn", value: "shivacharanreddy-admala", href: "https://www.linkedin.com/in/shivacharanreddy-admala/" },
              ].map(c => (
                <a key={c.label} href={c.href} target={c.label === "LinkedIn" ? "_blank" : undefined} rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, textDecoration: "none", color: "#e2e8f0", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; e.currentTarget.style.background = "rgba(99,102,241,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "0.75rem", color: "#6366f1", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{c.label.toUpperCase()}</div>
                    <div style={{ fontSize: "0.95rem" }}>{c.value}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "#475569" }}>→</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(99,102,241,0.15)", padding: "2rem", textAlign: "center", color: "#334155", fontSize: "0.85rem" }}>
        Designed & Built by <span style={{ color: "#6366f1", fontWeight: 600 }}>Admala Shiva Charan Reddy</span> · {new Date().getFullYear()}
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:768px){
          .two-col { grid-template-columns:1fr!important; }
          .mob-btn { display:block!important; }
          nav>div:nth-child(2) { display:none!important; }
        }
      `}</style>
    </div>
  );
}