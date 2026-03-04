import { useState, useEffect, useRef } from "react";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const skillGroups: Record<string, string[]> = {
  Languages:         ["C#", "JavaScript", "TypeScript", "SQL"],
  Frontend:          ["React", "RxJS", "HTML5", "CSS3"],
  Backend:           ["ASP.NET Core", "REST APIs", "Entity Framework"],
  Database:          ["SQL Server"],
  "Desktop / Tools": ["WPF (.NET)", "Revit 2025 API", "Git"],
};

const devicons: Record<string, string> = {
  "C#":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  JavaScript:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  SQL:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  React:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  RxJS:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rxjs/rxjs-original.svg",
  HTML5:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "ASP.NET Core": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "SQL Server":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Git:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};

const experiences = [
  {
    company: "AMC Bridge, Inc.",
    role: "Software Engineer",
    period: "Nov 2024 – Present",
    current: true,
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
          "WPF-based Revit 2025 add-in to automate family creation and instance placement workflows.",
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
        name: "Nirmaan Web Application",
        stack: "ASP.NET Core · React · SQL Server",
        bullets: [
          "Full-stack modules for project scheduling, activity linking, and WBS generation workflows.",
          "Role-based authentication and email notification for secure multi-user access.",
          "Optimized SQL Server schemas managing project hierarchy and activity dependencies.",
        ],
      },
      {
        name: "FiMa – Field Management Application",
        stack: "C# · TypeScript · REST APIs",
        bullets: [
          "Real-time issue tracking and sheet management with API-based synchronization across mobile and web.",
          "Backend in C# with TypeScript frontend components for responsive workflow management.",
          "Efficient data models and REST APIs supporting field-to-office data consistency.",
        ],
      },
      {
        name: "MRQC – Model Review & QC",
        stack: "C# · WPF · Revit API · SQL Server",
        bullets: [
          "C# WPF-based Revit add-in automating parametric and non-parametric model validation.",
          "Rule-based validation logic with API-driven data exchange to centralized SQL database.",
          "Improved model review efficiency automating compliance across engineering disciplines.",
        ],
      },
    ],
  },
];

function SectionHeader({ label, title, center = false }: { label: string; title: string; center?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      <p style={{ color: "#6366f1", letterSpacing: "0.3em", fontSize: "0.72rem", fontWeight: 700, margin: "0 0 0.6rem", textTransform: "uppercase" }}>{label}</p>
      <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, margin: 0, background: "linear-gradient(135deg,#ffffff 40%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.15 }}>{title}</h2>
      <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: 2, marginTop: "0.9rem", marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }} />
    </div>
  );
}
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [typedText, setTypedText]         = useState("");
  const roles                             = ["Full-Stack Developer", ".NET Engineer", "React Specialist", "BIM Tech Builder"];
  const [roleIdx, setRoleIdx]             = useState(0);
  const [charIdx, setCharIdx]             = useState(0);
  const [deleting, setDeleting]           = useState(false);

  useEffect(() => {
    const cur = roles[roleIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        setTypedText(cur.slice(0, charIdx + 1));
        if (charIdx + 1 === cur.length) setTimeout(() => setDeleting(true), 1600);
        else setCharIdx((c) => c + 1);
      } else {
        setTypedText(cur.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setRoleIdx((i) => (i + 1) % roles.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? 45 : 95);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  useEffect(() => {
    const ids = ["home","about","skills","experience","education","contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 110) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navItems = ["about","skills","experience","education","contact"];
  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", backgroundColor: "#0a0a0f", color: "#e2e8f0", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, background: scrolled ? "rgba(10,10,15,0.93)" : "rgba(10,10,15,0.5)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${scrolled ? "rgba(99,102,241,0.25)" : "transparent"}`, transition: "background 0.4s, border-color 0.4s", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1rem,4vw,3rem)" }}>
        <span onClick={() => scrollTo("home")} style={{ fontSize: "1.2rem", fontWeight: 800, cursor: "pointer", background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.05em", flexShrink: 0 }}>ASCR</span>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,2.5vw,2rem)" }}>
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} style={{ background: "none", border: "none", cursor: "pointer", textTransform: "capitalize", fontSize: "0.88rem", fontWeight: activeSection === item ? 600 : 400, color: activeSection === item ? "#a78bfa" : "#94a3b8", transition: "color 0.3s", letterSpacing: "0.04em", padding: "0.25rem 0" }}>{item}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 6, color: "white", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", padding: "0.5rem 1.1rem", whiteSpace: "nowrap", transition: "transform 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>Hire Me</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ background: "none", border: "1px solid rgba(99,102,241,0.35)", borderRadius: 6, cursor: "pointer", color: "#e2e8f0", width: 40, height: 40, display: "none", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 199, background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.2)", padding: menuOpen ? "1.5rem clamp(1rem,4vw,2rem)" : "0 clamp(1rem,4vw,2rem)", maxHeight: menuOpen ? "420px" : "0", overflow: "hidden", transition: "max-height 0.35s ease, padding 0.35s ease" }}>
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollTo(item)} style={{ display: "block", width: "100%", background: "none", border: "none", textAlign: "left", textTransform: "capitalize", fontSize: "1.05rem", color: activeSection === item ? "#a78bfa" : "#e2e8f0", padding: "0.85rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontWeight: activeSection === item ? 600 : 400 }}>{item}</button>
        ))}
        <button onClick={() => scrollTo("contact")} style={{ display: "block", width: "100%", marginTop: "1rem", padding: "0.85rem", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 8, color: "white", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Hire Me</button>
      </div>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px clamp(1rem,5vw,4rem) 4rem" }}>
        <div style={{ position: "absolute", width: "min(700px,90vw)", height: "min(700px,90vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 70%)", top: "-15%", left: "-15%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "min(500px,70vw)", height: "min(500px,70vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.09) 0%,transparent 70%)", bottom: "-10%", right: "-10%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", zIndex: 1, width: "100%", maxWidth: 720 }}>
          <div style={{ width: "clamp(90px,15vw,130px)", height: "clamp(90px,15vw,130px)", borderRadius: "50%", margin: "0 auto 2rem", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(2rem,6vw,3rem)", boxShadow: "0 0 50px rgba(99,102,241,0.35)", border: "3px solid rgba(99,102,241,0.45)" }}>👨‍💻</div>
          <p style={{ color: "#6366f1", letterSpacing: "0.3em", fontSize: "clamp(0.68rem,1.5vw,0.85rem)", marginBottom: "0.8rem", fontWeight: 700 }}>HELLO, I'M</p>
          <h1 style={{ fontSize: "clamp(2rem,7vw,4.8rem)", fontWeight: 800, lineHeight: 1.08, margin: "0 0 1.5rem", background: "linear-gradient(135deg,#ffffff 30%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admala Shiva<br />Charan Reddy</h1>
          <div style={{ fontSize: "clamp(1rem,2.5vw,1.45rem)", color: "#94a3b8", marginBottom: "2rem", minHeight: "2.2em" }}>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>{typedText}</span>
            <span style={{ animation: "blink 1s infinite", color: "#6366f1" }}>|</span>
          </div>
          <p style={{ maxWidth: 560, margin: "0 auto 2.5rem", color: "#64748b", lineHeight: 1.85, fontSize: "clamp(0.88rem,1.6vw,1rem)" }}>3+ years building scalable web applications with <strong style={{ color: "#e2e8f0" }}>.NET & React</strong>. Passionate about clean architecture, performance, and elegant solutions to complex engineering problems.</p>
          <div style={{ display: "flex", gap: "clamp(0.6rem,2vw,1rem)", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("experience")} style={{ padding: "clamp(0.7rem,2vw,0.9rem) clamp(1.2rem,3vw,2rem)", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 8, color: "white", fontWeight: 600, cursor: "pointer", fontSize: "clamp(0.85rem,1.5vw,0.95rem)", boxShadow: "0 4px 24px rgba(99,102,241,0.4)", transition: "transform 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>View My Work</button>
            <button onClick={() => scrollTo("contact")} style={{ padding: "clamp(0.7rem,2vw,0.9rem) clamp(1.2rem,3vw,2rem)", background: "transparent", border: "1px solid rgba(99,102,241,0.5)", borderRadius: 8, color: "#a78bfa", fontWeight: 600, cursor: "pointer", fontSize: "clamp(0.85rem,1.5vw,0.95rem)", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "#6366f1"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; }}>Get In Touch</button>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", justifyContent: "center", marginTop: "2.5rem" }}>
            {[{ icon: "in", href: "https://www.linkedin.com/in/shivacharanreddy-admala/" }, { icon: "✉", href: "mailto:charan.shiva567@gmail.com" }].map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={{ color: "#475569", fontSize: "1.4rem", textDecoration: "none", transition: "color 0.3s", display: "flex", alignItems: "center", lineHeight: 1 }} onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")} onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "#334155", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
          SCROLL
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom,#6366f1,transparent)" }} />
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" style={{ padding: "clamp(4rem,8vw,7rem) clamp(1rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><SectionHeader label="About Me" title="Who I Am" /></FadeIn>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", marginTop: "clamp(2rem,4vw,3.5rem)", alignItems: "center" }}>
            <FadeIn delay={0.1}>
              <div>
                {([
                  <> I'm a <strong style={{color:"#e2e8f0"}}>Full-Stack Developer</strong> with 3+ years of experience crafting scalable web applications. My stack lives at the intersection of <strong style={{color:"#a78bfa"}}>.NET backend systems</strong> and <strong style={{color:"#a78bfa"}}>React frontends</strong>, with a knack for clean REST APIs and modular architectures.</>,
                  <> What makes me unique is my background in <strong style={{color:"#e2e8f0"}}>Construction Tech (BIM)</strong> — I've built enterprise Revit add-ins, automated engineering workflows, and field management tools that bridge software and the physical world.</>,
                  <> M.Tech from <strong style={{color:"#e2e8f0"}}>VNIT Nagpur</strong> gives me a perspective that blends domain knowledge with software engineering craft.</>,
                ] as React.ReactNode[]).map((p, i) => (
                  <p key={i} style={{ color: "#94a3b8", lineHeight: 1.95, fontSize: "clamp(0.88rem,1.4vw,1rem)", marginBottom: "1.2rem" }}>{p}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.6rem,1.5vw,1rem)" }}>
                {[{ v:"3+",l:"Years Experience" },{ v:"5+",l:"Projects Delivered" },{ v:".NET + React",l:"Core Stack" },{ v:"BIM / AEC",l:"Domain Expertise" }].map((s) => (
                  <div key={s.l} style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:"clamp(8px,1.5vw,14px)", padding:"clamp(1rem,2.5vw,1.75rem)", textAlign:"center", transition:"border-color 0.3s, transform 0.3s" }} onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(167,139,250,0.55)"; e.currentTarget.style.transform="translateY(-3px)"; }} onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(99,102,241,0.2)"; e.currentTarget.style.transform="translateY(0)"; }}>
                    <div style={{ fontSize:"clamp(1.3rem,2.5vw,2rem)", fontWeight:800, background:"linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"0.4rem" }}>{s.v}</div>
                    <div style={{ color:"#64748b", fontSize:"clamp(0.7rem,1.2vw,0.82rem)", lineHeight:1.4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,4rem)", background:"rgba(99,102,241,0.025)", borderTop:"1px solid rgba(99,102,241,0.1)", borderBottom:"1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <FadeIn><SectionHeader label="Technical Skills" title="My Stack" /></FadeIn>
          <div style={{ marginTop:"clamp(2rem,4vw,3.5rem)", display:"flex", flexDirection:"column", gap:"clamp(1.5rem,3vw,2.5rem)" }}>
            {Object.entries(skillGroups).map(([cat, items], ci) => (
              <FadeIn key={cat} delay={ci * 0.06}>
                <p style={{ color:"#6366f1", fontSize:"0.72rem", letterSpacing:"0.22em", fontWeight:700, marginBottom:"0.85rem", textTransform:"uppercase" }}>{cat}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(0.5rem,1.2vw,0.8rem)" }}>
                  {items.map((skill) => (
                    <div key={skill} style={{ display:"flex", alignItems:"center", gap:"0.55rem", padding:"clamp(0.45rem,1vw,0.65rem) clamp(0.85rem,1.8vw,1.2rem)", background:"rgba(10,10,15,0.85)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:"clamp(6px,1vw,9px)", fontSize:"clamp(0.8rem,1.3vw,0.92rem)", color:"#cbd5e1", transition:"all 0.2s", cursor:"default" }}
                      onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="#6366f1"; el.style.background="rgba(99,102,241,0.09)"; el.style.transform="translateY(-2px)"; }}
                      onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(99,102,241,0.2)"; el.style.background="rgba(10,10,15,0.85)"; el.style.transform="translateY(0)"; }}>
                      {devicons[skill] && <img src={devicons[skill]} alt={skill} width={18} height={18} style={{ objectFit:"contain", flexShrink:0 }} onError={(e)=>(e.currentTarget.style.display="none")} />}
                      {skill}
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* EXPERIENCE */}
      <section id="experience" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,4rem)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <FadeIn><SectionHeader label="Experience" title="Where I've Worked" /></FadeIn>
          <div style={{ marginTop:"clamp(2rem,4vw,3.5rem)", position:"relative" }}>
            <div className="timeline-spine" style={{ position:"absolute", left:11, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#6366f1 0%,rgba(99,102,241,0.08) 100%)" }} />
            <div style={{ paddingLeft:"clamp(1.5rem,4vw,3.5rem)", display:"flex", flexDirection:"column", gap:"clamp(2rem,5vw,3.5rem)" }}>
              {experiences.map((exp, ei) => (
                <FadeIn key={exp.company} delay={ei * 0.08}>
                  <div style={{ position:"relative" }}>
                    <div style={{ position:"absolute", left:"clamp(-1.8rem,-4vw,-3.5rem)", top:"0.35rem", width:24, height:24, borderRadius:"50%", background:exp.current?"linear-gradient(135deg,#6366f1,#a78bfa)":"rgba(99,102,241,0.25)", border:`2px solid ${exp.current?"#6366f1":"rgba(99,102,241,0.35)"}`, boxShadow:exp.current?"0 0 14px rgba(99,102,241,0.5)":"none" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.4rem" }}>
                      <div>
                        <h3 style={{ fontSize:"clamp(1rem,2vw,1.3rem)", fontWeight:700, color:"#e2e8f0", margin:0 }}>{exp.company}</h3>
                        <p style={{ color:"#a78bfa", fontWeight:500, margin:"0.2rem 0 0", fontSize:"clamp(0.85rem,1.4vw,0.95rem)" }}>{exp.role}</p>
                      </div>
                      <span style={{ padding:"0.28rem 0.8rem", background:exp.current?"rgba(99,102,241,0.14)":"rgba(255,255,255,0.04)", border:`1px solid ${exp.current?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:20, fontSize:"clamp(0.72rem,1.2vw,0.82rem)", color:exp.current?"#a78bfa":"#64748b", whiteSpace:"nowrap" }}>{exp.period}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"clamp(0.8rem,2vw,1.25rem)", marginTop:"1.25rem" }}>
                      {exp.projects.map((proj) => (
                        <div key={proj.name} style={{ background:"rgba(99,102,241,0.035)", border:"1px solid rgba(99,102,241,0.14)", borderRadius:"clamp(8px,1.5vw,14px)", padding:"clamp(1rem,2.5vw,1.6rem)", transition:"border-color 0.3s" }} onMouseEnter={(e)=>(e.currentTarget.style.borderColor="rgba(99,102,241,0.42)")} onMouseLeave={(e)=>(e.currentTarget.style.borderColor="rgba(99,102,241,0.14)")}>
                          <div className="proj-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.9rem" }}>
                            <h4 style={{ margin:0, color:"#e2e8f0", fontWeight:600, fontSize:"clamp(0.88rem,1.5vw,1rem)" }}>{proj.name}</h4>
                            <span style={{ fontSize:"clamp(0.65rem,1.1vw,0.75rem)", color:"#6366f1", background:"rgba(99,102,241,0.1)", padding:"0.2rem 0.6rem", borderRadius:4, fontFamily:"monospace", whiteSpace:"nowrap" }}>{proj.stack}</span>
                          </div>
                          <ul style={{ margin:0, paddingLeft:"1.1rem", display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                            {proj.bullets.map((b, bi) => <li key={bi} style={{ color:"#94a3b8", fontSize:"clamp(0.82rem,1.3vw,0.92rem)", lineHeight:1.75 }}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,4rem)", background:"rgba(99,102,241,0.025)", borderTop:"1px solid rgba(99,102,241,0.1)", borderBottom:"1px solid rgba(99,102,241,0.1)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <FadeIn><SectionHeader label="Education" title="Academic Background" /></FadeIn>
          <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(0.8rem,2vw,1.5rem)", marginTop:"clamp(2rem,4vw,3rem)" }}>
            {[
              { degree:"M.Tech – Construction Technology & Management", institute:"VNIT Nagpur", year:"2022", cgpa:"8.63" },
              { degree:"B.E – Civil Engineering", institute:"MVSR Engineering College", year:"2019", cgpa: null },
            ].map((edu, i) => (
              <FadeIn key={edu.degree} delay={i * 0.1}>
                <div style={{ background:"rgba(10,10,15,0.8)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:"clamp(10px,2vw,18px)", padding:"clamp(1.25rem,3vw,2.25rem)", transition:"all 0.3s", height:"100%", boxSizing:"border-box" }} onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.transform="translateY(-4px)"; }} onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(99,102,241,0.2)"; e.currentTarget.style.transform="translateY(0)"; }}>
                  <div style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", marginBottom:"1rem" }}>🎓</div>
                  <h3 style={{ color:"#e2e8f0", fontWeight:700, margin:"0 0 0.5rem", fontSize:"clamp(0.88rem,1.5vw,1rem)", lineHeight:1.5 }}>{edu.degree}</h3>
                  <p style={{ color:"#a78bfa", fontWeight:500, margin:"0 0 1rem", fontSize:"clamp(0.85rem,1.3vw,0.95rem)" }}>{edu.institute}</p>
                  <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
                    <span style={{ fontSize:"clamp(0.7rem,1.1vw,0.8rem)", color:"#64748b", background:"rgba(255,255,255,0.04)", padding:"0.25rem 0.75rem", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)" }}>Class of {edu.year}</span>
                    {edu.cgpa && <span style={{ fontSize:"clamp(0.7rem,1.1vw,0.8rem)", color:"#6366f1", background:"rgba(99,102,241,0.1)", padding:"0.25rem 0.75rem", borderRadius:20, border:"1px solid rgba(99,102,241,0.2)" }}>CGPA: {edu.cgpa}</span>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"clamp(4rem,8vw,7rem) clamp(1rem,5vw,4rem)" }}>
        <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <FadeIn><SectionHeader label="Contact" title="Let's Work Together" center /></FadeIn>
          <FadeIn delay={0.1}><p style={{ color:"#64748b", marginTop:"1.25rem", lineHeight:1.85, fontSize:"clamp(0.88rem,1.5vw,1rem)" }}>Whether it's a full-stack product, a backend API, or a complex engineering automation — I'm always open to new challenges and conversations.</p></FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display:"flex", flexDirection:"column", gap:"clamp(0.65rem,1.5vw,1rem)", marginTop:"clamp(1.5rem,3vw,2.5rem)" }}>
              {[
                { icon:"✉️", label:"Email",    value:"charan.shiva567@gmail.com",              href:"mailto:charan.shiva567@gmail.com",                              external:false },
                { icon:"📞", label:"Phone",    value:"+91 8639364151",                         href:"tel:+918639364151",                                             external:false },
                { icon:"💼", label:"LinkedIn", value:"linkedin.com/in/shivacharanreddy-admala", href:"https://www.linkedin.com/in/shivacharanreddy-admala/", external:true  },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.external?"_blank":undefined} rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"clamp(0.75rem,2vw,1.1rem)", padding:"clamp(1rem,2.5vw,1.35rem) clamp(1rem,2.5vw,1.6rem)", background:"rgba(99,102,241,0.04)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:"clamp(8px,1.5vw,13px)", textDecoration:"none", color:"#e2e8f0", transition:"all 0.2s" }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="#6366f1"; e.currentTarget.style.background="rgba(99,102,241,0.09)"; e.currentTarget.style.transform="translateX(5px)"; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(99,102,241,0.2)"; e.currentTarget.style.background="rgba(99,102,241,0.04)"; e.currentTarget.style.transform="translateX(0)"; }}>
                  <span style={{ fontSize:"clamp(1.2rem,2.5vw,1.5rem)", flexShrink:0 }}>{c.icon}</span>
                  <div style={{ textAlign:"left", overflow:"hidden" }}>
                    <div style={{ fontSize:"clamp(0.65rem,1.1vw,0.75rem)", color:"#6366f1", letterSpacing:"0.12em", marginBottom:"0.15rem" }}>{c.label.toUpperCase()}</div>
                    <div style={{ fontSize:"clamp(0.82rem,1.4vw,0.95rem)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.value}</div>
                  </div>
                  <span style={{ marginLeft:"auto", color:"#475569", flexShrink:0 }}>→</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(99,102,241,0.14)", padding:"clamp(1.25rem,3vw,2rem)", textAlign:"center", color:"#334155", fontSize:"clamp(0.75rem,1.2vw,0.85rem)" }}>
        Designed & Built by <span style={{ color:"#6366f1", fontWeight:600 }}>Admala Shiva Charan Reddy</span> · {new Date().getFullYear()}
      </footer>

      {/* GLOBAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        @media (min-width: 768px) {
          .hamburger { display: none !important; }
          .nav-links  { display: flex !important; }
        }
        @media (max-width: 767px) {
          .nav-links       { display: none !important; }
          .hamburger       { display: flex !important; }
          .timeline-spine  { display: none !important; }
          .about-grid      { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .edu-grid        { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .edu-grid   { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1600px) {
          #about > div, #skills > div,
          #experience > div, #education > div { max-width: 1440px !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.65); }
      `}</style>
    </div>
  );
}