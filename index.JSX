import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Awards", "Contact"];

const SKILLS = [
  { name: "Python", level: 90, cat: "lang" },
  { name: "R", level: 82, cat: "lang" },
  { name: "SQL", level: 78, cat: "lang" },
  { name: "Machine Learning", level: 85, cat: "ai" },
  { name: "Data Visualization", level: 88, cat: "ai" },
  { name: "Statistical Analysis", level: 84, cat: "ai" },
  { name: "Pandas / NumPy", level: 88, cat: "tool" },
  { name: "Scikit-learn", level: 82, cat: "tool" },
  { name: "Power BI", level: 76, cat: "tool" },
  { name: "Jupyter Notebook", level: 90, cat: "tool" },
  { name: "Flutter", level: 72, cat: "tool" },
  { name: "Linux / Unix", level: 74, cat: "sys" },
  { name: "Shell Scripting", level: 68, cat: "sys" },
];

const SKILL_COLORS = {
  lang: { bar: "from-violet-500 to-purple-400", badge: "text-violet-300 bg-violet-500/10 border-violet-500/20" },
  ai:   { bar: "from-purple-500 to-fuchsia-400", badge: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20" },
  tool: { bar: "from-indigo-500 to-violet-400", badge: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20" },
  sys:  { bar: "from-pink-500 to-violet-400", badge: "text-pink-300 bg-pink-500/10 border-pink-500/20" },
};

const PROJECTS = [
  {
    tag: "Graduation Project", tagColor: "text-violet-300 bg-violet-500/10",
    title: "QLife — AI-Powered Digital Health Platform",
    desc: "AI healthcare application built with Flutter and Firebase. Trained ML models on 5,000+ records achieving 89% accuracy, in collaboration with VR House company.",
    techs: ["Flutter", "Firebase", "Machine Learning", "Python"],
    link: "https://github.com/FatimaAbduljabar7/QLife-AI-Analytics", linkLabel: "GitHub →",
    meta: "89% accuracy", accentFrom: "#7c3aed", accentTo: "#a855f7",
  },
  {
    tag: "Data Analysis", tagColor: "text-indigo-300 bg-indigo-500/10",
    title: "Metagenomics Analysis Project",
    desc: "Analyzed large-scale gut microbiome datasets of 147 samples using statistical and computational methods in R, focusing on data interpretation and insight extraction.",
    techs: ["R", "Statistical Analysis", "Bioinformatics", "Data Visualization"],
    link: "https://github.com/FatimaAbduljabar7/Gut_Microbiome_Dynamics", linkLabel: "GitHub →",
    meta: "147 samples", accentFrom: "#6366f1", accentTo: "#8b5cf6",
  },
  {
    tag: "Buildathon", tagColor: "text-fuchsia-300 bg-fuchsia-500/10",
    title: "ERFlow Intelligence",
    desc: "AI-driven emergency room flow intelligence system to optimize patient triage and resource allocation. Full pitch deck developed during a buildathon competition.",
    techs: ["AI", "Healthcare", "Data Analysis"],
    linkLabel: "Pitch Deck — PDF", disabled: true,
    meta: "Buildathon", accentFrom: "#a855f7", accentTo: "#ec4899",
  },
  {
    tag: "Web Development", tagColor: "text-amber-300 bg-amber-500/10",
    title: "SurgElite BootCamp Website",
    desc: "Responsive platform for medical and surgical training with track registration and structured information architecture. Fully deployed and live.",
    techs: ["Web Development", "Responsive Design", "Deployment"],
    link: "https://sesbootcamp.com", linkLabel: "Visit Website →",
    accentFrom: "#f59e0b", accentTo: "#f97316",
  },
  {
    tag: "Web Development", tagColor: "text-emerald-300 bg-emerald-500/10",
    title: "Dalah (دَالّة) Website",
    desc: "Built and maintained the Dalah organizational website, delivering a polished digital presence with responsive design and domain deployment.",
    techs: ["Web Development", "Domain Deployment", "UI Design"],
    link: "https://dalah.org", linkLabel: "Visit Website →",
    accentFrom: "#10b981", accentTo: "#3b82f6",
  },
];

const EXPERIENCE = [
  {
    period: "Jan 2025 – Present", badge: "Work", badgeColor: "text-violet-300 bg-violet-500/10",
    role: "Web Developer", org: "Dalah (دَالّة)", orgHref: "https://dalah.org",
    accentColor: "#a855f7",
    bullets: [
      "Designed, built, and maintained responsive public websites, overseeing domain deployment.",
      "Partnered to deliver digital solutions for organizational and event platforms.",
    ],
  },
  {
    period: "Jul 2025 – Aug 2025", badge: "Research Internship", badgeColor: "text-indigo-300 bg-indigo-500/10",
    role: "Bioinformatics Intern", org: "University of Cambridge · Cambridge, UK",
    accentColor: "#6366f1",
    bullets: [
      "Analyzed real-world biological datasets using Python and R for statistical and computational analysis.",
      "Processed and validated published datasets to reproduce analytical findings and ensure reproducibility.",
      "Worked in Linux-based research environments and data processing workflows.",
      "Presented a scientific research poster — received the Highly Commended Poster Award ✦",
    ],
  },
  {
    period: "2026", badge: "Teaching", badgeColor: "text-amber-300 bg-amber-500/10",
    role: "Bioinformatics Teaching Assistant", org: "KAUST Academy · Dhahran, KSA",
    accentColor: "#f59e0b",
    bullets: [
      "Assisted students in data analysis using Python and bioinformatics coding labs.",
    ],
  },
];

const EDUCATION = [
  {
    period: "2022 – 2026", deg: "BSc in Computer Information Systems",
    inst: "Imam Abdulrahman Bin Faisal University", loc: "Dammam, KSA",
    detail: "Very Good with Second Honors Rank",
    gradient: "from-violet-500 to-purple-400", instColor: "text-violet-300",
  },
  {
    period: "2024 – 2025", deg: "Bioinformatics Specialization Program",
    inst: "KAUST Academy", loc: "Thuwal, KSA",
    detail: "320 hours of intensive coursework",
    gradient: "from-indigo-500 to-violet-500", instColor: "text-indigo-300",
  },
  {
    period: "Summer 2025", deg: "Bioinformatics Summer Programme",
    inst: "University of Cambridge", loc: "Cambridge, United Kingdom",
    detail: "Research internship · Highly Commended Poster Award ✦",
    gradient: "from-fuchsia-500 to-purple-500", instColor: "text-fuchsia-300",
  },
];

const WORDS = ["Machine Learning Engineer", "Bioinformatics Researcher", "Data Analyst", "AI App Developer"];

/* ─── TYPEWRITER ────────────────────────────────────────── */
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) { setTimeout(() => setDeleting(true), 2000); return; }
        setCharIdx(c => c + 1);
      } else {
        setText(word.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0); return; }
        setCharIdx(c => c - 1);
      }
    }, deleting ? 40 : 72);
    return () => clearTimeout(timeout);
  }, [text, charIdx, deleting, wordIdx, words]);
  return text;
}

/* ─── FADE-IN HOOK ──────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, vis] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── SKILL BAR ─────────────────────────────────────────── */
function SkillBar({ skill, visible }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { if (visible) { const t = setTimeout(() => setWidth(skill.level), 100); return () => clearTimeout(t); } }, [visible, skill.level]);
  const { bar, badge } = SKILL_COLORS[skill.cat];
  const catLabel = { lang: "Language", ai: "AI & Data", tool: "Tool", sys: "Systems" }[skill.cat];
  return (
    <div style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 14, padding: "1.1rem 1.25rem", transition: "border-color .2s, transform .2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".6rem" }}>
        <span style={{ fontSize: ".9rem", fontWeight: 700, color: "#f5f0ff" }}>{skill.name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".8rem", fontWeight: 600, color: "#c4b5fd" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,.07)", borderRadius: 100, overflow: "hidden", marginBottom: ".6rem" }}>
        <div style={{ height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${bar.includes("violet") ? "#7c3aed" : bar.includes("fuchsia") ? "#a855f7" : bar.includes("indigo") ? "#6366f1" : "#ec4899"}, ${bar.includes("violet") ? "#a855f7" : bar.includes("fuchsia") ? "#e879f9" : bar.includes("indigo") ? "#8b5cf6" : "#a855f7"})`, width: `${width}%`, transition: "width 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <span style={{ fontSize: ".62rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: ".2rem .65rem", borderRadius: 100, border: "1px solid", fontFamily: "'DM Mono', monospace" }} className={badge}>{catLabel}</span>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSkillFilter, setActiveSkillFilter] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const typedText = useTypewriter(WORDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.05 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobOpen(false); };

  const filteredSkills = activeSkillFilter === "all" ? SKILLS : SKILLS.filter(s => s.cat === activeSkillFilter);

  const S = {
    // colors
    bg: "#06040e",
    surface: "rgba(139,92,246,0.05)",
    border: "rgba(139,92,246,0.15)",
    borderHover: "rgba(139,92,246,0.35)",
    text: "#f5f0ff",
    textMuted: "rgba(196,181,253,0.6)",
    textDim: "rgba(196,181,253,0.35)",
    accent: "#a855f7",
    accentGlow: "rgba(139,92,246,0.4)",
    mono: "'DM Mono', monospace",
    serif: "'Playfair Display', serif",
    sans: "'Inter', sans-serif",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #06040e; color: #f5f0ff; font-family: 'Inter', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #06040e; } ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.4); border-radius: 10px; }
        .skill-badge { font-size: .62rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; padding: .2rem .65rem; border-radius: 100px; border: 1px solid; font-family: 'DM Mono', monospace; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
        @keyframes ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .orb1 { animation: float 20s ease-in-out infinite; }
        .orb2 { animation: float 24s ease-in-out infinite reverse; }
        .scroll-line { animation: float 1.8s ease-in-out infinite; }
        .chip { display:inline-flex;align-items:center;gap:.45rem;font-family:'DM Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#c4b5fd;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.25);border-radius:100px;padding:.28rem .85rem;margin-bottom:1.2rem; }
        .chip-dot { width:5px;height:5px;border-radius:50%;background:#a855f7;animation:pulse 2s infinite; }
        .section-bg-alt { background: rgba(139,92,246,0.03); border-top: 1px solid rgba(139,92,246,0.08); border-bottom: 1px solid rgba(139,92,246,0.08); }
        .nav-link-btn { background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:500;letter-spacing:.03em;color:rgba(196,181,253,0.55);transition:color .25s;position:relative; }
        .nav-link-btn:hover { color:#e9d5ff; }
        .project-card { background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.12);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .25s, transform .25s, box-shadow .25s; }
        .project-card:hover { border-color:rgba(139,92,246,0.3);transform:translateY(-5px);box-shadow:0 20px 60px rgba(139,92,246,0.12); }
        .tl-line { position:absolute;left:0;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,#7c3aed,#a855f7,#ec4899,transparent); }
        .form-input { width:100%;font-family:'Inter',sans-serif;font-size:.875rem;border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:.7rem 1rem;color:#f5f0ff;background:rgba(139,92,246,0.05);outline:none;transition:border-color .2s,box-shadow .2s; }
        .form-input::placeholder { color:rgba(196,181,253,0.3); }
        .form-input:focus { border-color:rgba(168,85,247,0.6);box-shadow:0 0 20px rgba(139,92,246,0.15); }
        .contact-row { display:flex;gap:.875rem;align-items:center;padding:.95rem 1.25rem;background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.12);border-radius:12px;text-decoration:none;color:inherit;transition:border-color .2s,background .2s; }
        .contact-row:hover { border-color:rgba(139,92,246,0.35);background:rgba(139,92,246,0.08); }
        textarea.form-input { min-height:120px; resize:none; }
      `}</style>

      {/* AMBIENT ORBS */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div className="orb1" style={{ position: "absolute", width: "70vw", height: "70vw", bottom: "-20vw", left: "-15vw", background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(109,40,217,0.18) 45%, transparent 70%)", filter: "blur(50px)", borderRadius: "50%" }} />
        <div className="orb2" style={{ position: "absolute", width: "55vw", height: "55vw", top: "-12vw", right: "-10vw", background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(126,34,206,0.14) 40%, transparent 70%)", filter: "blur(60px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: "80vw", height: "40vh", top: "35%", left: "10%", background: "radial-gradient(ellipse, rgba(76,29,149,0.1) 0%, transparent 70%)", filter: "blur(70px)" }} />
        {/* noise texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1.5rem,5vw,4rem)", background: scrolled ? "rgba(6,4,14,.85)" : "rgba(6,4,14,.6)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${scrolled ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.1)"}`, transition: "all .3s" }}>
        <a href="#" style={{ fontFamily: S.serif, fontSize: "1.2rem", fontWeight: 600, color: S.text, textDecoration: "none", letterSpacing: "-.02em" }}>
          Fatima<span style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
        </a>
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }} className="nav-desktop">
          {NAV_LINKS.map(l => <li key={l}><button className="nav-link-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button></li>)}
        </ul>
        <a href="https://www.linkedin.com/in/fatimaah-cis/" target="_blank" rel="noopener" style={{ fontSize: ".78rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#f5f0ff", background: "linear-gradient(135deg,#7c3aed,#a855f7)", padding: ".42rem 1.3rem", borderRadius: 100, textDecoration: "none", boxShadow: "0 0 20px rgba(139,92,246,0.35)" }}>Connect</a>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 100, paddingBottom: 80, paddingLeft: "clamp(1.5rem,5vw,4rem)", paddingRight: "clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Available badge */}
        <div style={{ animation: "fadeUp .6s ease .2s both", display: "inline-flex", alignItems: "center", gap: ".5rem", marginBottom: "2rem", padding: ".3rem .9rem", borderRadius: 100, border: "1px solid rgba(168,85,247,0.3)", background: "rgba(88,28,135,0.12)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ fontFamily: S.mono, fontSize: ".68rem", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(196,181,253,0.7)" }}>Available for opportunities</span>
        </div>

        <p style={{ fontFamily: S.mono, fontSize: ".85rem", letterSpacing: ".14em", textTransform: "uppercase", color: S.textMuted, marginBottom: ".75rem", animation: "fadeUp .6s ease .3s both" }}>Welcome to my Portfolio</p>

        <h1 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(3.2rem,8vw,6.5rem)", lineHeight: 1.02, letterSpacing: "-.02em", color: S.text, marginBottom: "1rem", animation: "fadeUp .8s ease .35s both" }}>
          Fatima<br />
          <span style={{ background: "linear-gradient(135deg, #e9d5ff 0%, #a855f7 50%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 40px rgba(139,92,246,0.5))" }}>Alhelal</span>
        </h1>

        <div style={{ fontFamily: S.mono, fontSize: "clamp(.85rem,2vw,1.05rem)", color: "#c4b5fd", letterSpacing: ".02em", minHeight: "1.8rem", marginBottom: "1.75rem", animation: "fadeUp .7s ease .5s both" }}>
          {typedText}<span style={{ borderRight: "2px solid #a855f7", animation: "pulse .65s step-end infinite", display: "inline-block", width: 2, height: "1em", verticalAlign: "text-bottom", marginLeft: 2 }} />
        </div>

        <p style={{ fontSize: "1rem", color: S.textMuted, maxWidth: 540, lineHeight: 1.9, marginBottom: "2.25rem", animation: "fadeUp .7s ease .65s both" }}>
          Computer Information Systems student specializing in AI and Data Analysis. Cambridge Bioinformatics alumna · KAUST Academy graduate · Building AI-powered healthcare solutions.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", animation: "fadeUp .6s ease .8s both" }}>
          <button onClick={() => scrollTo("projects")} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#f5f0ff", fontSize: ".9rem", fontWeight: 600, padding: ".8rem 2.1rem", borderRadius: 100, border: "none", cursor: "pointer", boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}>View Projects →</button>
          <a href="https://github.com/FatimaAbduljabar7" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "transparent", color: "rgba(196,181,253,0.8)", border: "1px solid rgba(139,92,246,0.3)", fontSize: ".9rem", fontWeight: 500, padding: ".8rem 2.1rem", borderRadius: 100, textDecoration: "none" }}>GitHub ↗</a>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: ".65rem", marginTop: "1.75rem", animation: "fadeUp .6s ease 1s both" }}>
          {[
            { href: "https://www.linkedin.com/in/fatimaah-cis/", label: "LinkedIn", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.98-1.98c0-1.093.887-1.98 1.98-1.98s1.98.887 1.98 1.98a1.98 1.98 0 0 1-1.98 1.98zm1.706 13.019H3.631V9h3.412v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
            { href: "mailto:Fatima1dh@hotmail.com", label: "Email", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
            { href: "https://github.com/FatimaAbduljabar7", label: "GitHub", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.205 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg> },
          ].map(({ href, label, svg }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(139,92,246,0.2)", color: "rgba(196,181,253,0.5)", background: "rgba(88,28,135,0.08)", textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)"; e.currentTarget.style.color = "#d8b4fe"; e.currentTarget.style.background = "rgba(88,28,135,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)"; e.currentTarget.style.color = "rgba(196,181,253,0.5)"; e.currentTarget.style.background = "rgba(88,28,135,0.08)"; }}>
              {svg}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: S.mono, fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: S.textDim }}>scroll</span>
          <div className="scroll-line" style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(168,85,247,0.5), transparent)" }} />
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ position: "relative", zIndex: 1, background: "rgba(139,92,246,0.04)", borderTop: "1px solid rgba(139,92,246,0.1)", borderBottom: "1px solid rgba(139,92,246,0.1)", padding: "2.5rem clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
          {[
            { val: "320 hrs", label: "KAUST Program Hours", color: "#c4b5fd" },
            { val: "89%", label: "QLife ML Accuracy", color: "#e879f9" },
            { val: "147", label: "Research Samples", color: "#fbbf24" },
            { val: "Highly Commended ✦", label: "Cambridge Award", color: "#38bdf8" },
          ].map(({ val, label, color }) => (
            <FadeIn key={label}>
              <div style={{ padding: "1.5rem 1.75rem", textAlign: "center", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 16 }}>
                <div style={{ fontFamily: S.mono, fontSize: "1.4rem", fontWeight: 700, color, marginBottom: ".3rem" }}>{val}</div>
                <div style={{ fontSize: ".8rem", color: S.textMuted }}>{label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />About Me</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: ".75rem" }}>Data Science meets<br />Healthcare Innovation</h2>
            <p style={{ fontSize: ".975rem", color: S.textMuted, lineHeight: 1.95, marginBottom: "1.25rem" }}>I'm a Computer Information Systems student at Imam Abdulrahman Bin Faisal University, specializing in Artificial Intelligence and Data Analysis. My work sits at the intersection of bioinformatics, machine learning, and real-world health impact.</p>
            <p style={{ fontSize: ".975rem", color: S.textMuted, lineHeight: 1.95, marginBottom: "1.5rem" }}>I trained at the University of Cambridge's Bioinformatics Summer Programme and completed 320 hours of intensive coursework through KAUST Academy. My graduation project, QLife, is an AI-powered digital health platform built in collaboration with VR House company, achieving 89% model accuracy on 5,000+ records.</p>
            <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
              {["Arabic — Native", "English — Professional"].map(l => (
                <span key={l} style={{ fontFamily: S.mono, fontSize: ".75rem", fontWeight: 500, padding: ".3rem 1rem", borderRadius: 100, border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", color: "#c4b5fd" }}>{l}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { val: "320h", label: "KAUST Bioinformatics coursework", color: "#c4b5fd", border: "rgba(139,92,246,0.3)" },
                { val: "5K+", label: "Records in QLife ML dataset", color: "#e879f9", border: "rgba(168,85,247,0.3)" },
                { val: "89%", label: "Model accuracy — QLife", color: "#f0abfc", border: "rgba(217,70,239,0.3)" },
                { val: "147", label: "Samples in Metagenomics study", color: "#fbbf24", border: "rgba(245,158,11,0.3)" },
              ].map(({ val, label, color, border }) => (
                <div key={label} style={{ padding: "1.5rem", borderRadius: 18, background: "rgba(139,92,246,0.05)", border: `1px solid ${border}` }}>
                  <div style={{ fontFamily: S.mono, fontSize: "2rem", fontWeight: 700, lineHeight: 1, marginBottom: ".3rem", color }}>{val}</div>
                  <div style={{ fontSize: ".8rem", color: S.textMuted, lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }} className="section-bg-alt">
        <div style={{ maxWidth: 1080, margin: "0 auto" }} ref={skillsRef}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Technical Skills</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: ".75rem" }}>My Toolkit</h2>
            <p style={{ fontSize: "1rem", color: S.textMuted, maxWidth: 520, lineHeight: 1.85, marginBottom: "2.25rem" }}>From ML pipelines to shell scripting — built through real research and project experience.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.25rem" }}>
              {[["all","All"],["lang","Languages"],["ai","AI & Data"],["tool","Tools"],["sys","Systems"]].map(([key,label]) => (
                <button key={key} onClick={() => setActiveSkillFilter(key)} style={{ fontSize: ".8rem", fontWeight: 600, letterSpacing: ".04em", padding: ".35rem 1.1rem", borderRadius: 100, cursor: "pointer", border: "1px solid", fontFamily: "'Inter',sans-serif", background: activeSkillFilter === key ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "transparent", borderColor: activeSkillFilter === key ? "transparent" : "rgba(139,92,246,0.25)", color: activeSkillFilter === key ? "#fff" : "rgba(196,181,253,0.55)", boxShadow: activeSkillFilter === key ? "0 0 18px rgba(139,92,246,0.35)" : "none", transition: "all .2s" }}>{label}</button>
              ))}
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1rem" }}>
            {filteredSkills.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.05}>
                <SkillBar skill={s} visible={skillsVisible} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Experience</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: ".75rem" }}>Where I've Worked</h2>
            <p style={{ fontSize: "1rem", color: S.textMuted, maxWidth: 520, lineHeight: 1.85, marginBottom: "3rem" }}>From Cambridge research labs to web development — building real-world impact through code and data.</p>
          </FadeIn>
          <div style={{ paddingLeft: "2rem", position: "relative" }}>
            <div className="tl-line" />
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.role} delay={i * 0.1}>
                <div style={{ position: "relative", paddingBottom: i < EXPERIENCE.length - 1 ? "3rem" : 0 }}>
                  <div style={{ position: "absolute", left: "-2.45rem", top: 6, width: 12, height: 12, borderRadius: "50%", background: exp.accentColor, boxShadow: `0 0 14px ${exp.accentColor}, 0 0 28px ${exp.accentColor}40`, border: "2px solid #06040e" }} />
                  <div style={{ display: "flex", gap: ".65rem", alignItems: "center", flexWrap: "wrap", marginBottom: ".5rem" }}>
                    <span style={{ fontFamily: S.mono, fontSize: ".7rem", color: S.textDim, letterSpacing: ".04em" }}>{exp.period}</span>
                    <span style={{ fontFamily: S.mono, fontSize: ".6rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: ".2rem .65rem", borderRadius: 100, border: "1px solid" }} className={exp.badgeColor.split(" ").map(c => c).join(" ")}>{exp.badge}</span>
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: S.text, letterSpacing: "-.02em", marginBottom: ".2rem" }}>{exp.role}</div>
                  <div style={{ fontFamily: S.mono, fontSize: ".8rem", color: exp.accentColor, marginBottom: ".9rem" }}>
                    {exp.orgHref ? <a href={exp.orgHref} target="_blank" rel="noopener" style={{ color: "inherit", textDecoration: "none" }}>{exp.org} ↗</a> : exp.org}
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".4rem" }}>
                    {exp.bullets.map(b => (
                      <li key={b} style={{ fontSize: ".9rem", color: S.textMuted, paddingLeft: "1.25rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, fontFamily: S.mono, fontSize: ".7rem", color: S.textDim, top: ".15rem" }}>//</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }} className="section-bg-alt">
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Projects</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: ".75rem" }}>Featured Work</h2>
            <p style={{ fontSize: "1rem", color: S.textMuted, maxWidth: 520, lineHeight: 1.85, marginBottom: "2.25rem" }}>AI health platforms, metagenomics datasets, and live web products.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.25rem" }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.07}>
                <div className="project-card" style={{ height: "100%" }}>
                  <div style={{ padding: "1.75rem", flex: 1 }}>
                    <div style={{ display: "inline-block", fontFamily: S.mono, fontSize: ".62rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: ".25rem .75rem", borderRadius: 100, marginBottom: "1rem", border: "1px solid rgba(139,92,246,0.15)" }} className={p.tagColor}>{p.tag}</div>
                    <div style={{ fontSize: "1.0625rem", fontWeight: 700, color: S.text, letterSpacing: "-.02em", marginBottom: ".6rem", lineHeight: 1.35 }}>{p.title}</div>
                    <p style={{ fontSize: ".875rem", color: S.textMuted, lineHeight: 1.8, marginBottom: "1.1rem" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                      {p.techs.map(t => <span key={t} style={{ fontFamily: S.mono, fontSize: ".67rem", padding: ".2rem .65rem", borderRadius: 100, background: "rgba(139,92,246,0.07)", color: S.textDim, border: "1px solid rgba(139,92,246,0.12)" }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ padding: "1rem 1.75rem", borderTop: "1px solid rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {p.disabled
                      ? <span style={{ fontFamily: S.mono, fontSize: ".8rem", color: "rgba(168,85,247,0.4)", cursor: "default" }}>{p.linkLabel}</span>
                      : <a href={p.link} target="_blank" rel="noopener" style={{ fontFamily: S.mono, fontSize: ".8rem", fontWeight: 700, textDecoration: "none", color: p.accentFrom || "#a855f7", display: "inline-flex", alignItems: "center", gap: ".35rem", transition: "gap .2s" }} onMouseEnter={e => e.currentTarget.style.gap = ".6rem"} onMouseLeave={e => e.currentTarget.style.gap = ".35rem"}>{p.linkLabel}</a>
                    }
                    {p.meta && <span style={{ fontFamily: S.mono, fontSize: ".7rem", color: S.textDim }}>{p.meta}</span>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Research Posters */}
          <div style={{ marginTop: "4rem" }}>
            <FadeIn>
              <h3 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "1.375rem", letterSpacing: "-.03em", color: S.text, marginBottom: ".4rem" }}>Research Posters</h3>
              <p style={{ fontSize: ".9rem", color: S.textMuted, marginBottom: "1.5rem" }}>Scientific posters presented at international research programmes.</p>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem" }}>
              {[
                { title: "QLife Project Poster", desc: "Research poster for the AI-Powered Digital Health Platform graduation project, showcasing ML architecture and results.", link: "https://github.com/FatimaAbduljabar7/QLife-AI-Analytics", color: "#a855f7", gradFrom: "#7c3aed", gradTo: "#a855f7" },
                { title: "Cambridge Research Poster", desc: "Scientific poster presented at the University of Cambridge Bioinformatics Summer Programme — awarded Highly Commended Poster.", link: "https://github.com/FatimaAbduljabar7/Gut_Microbiome_Dynamics", color: "#818cf8", gradFrom: "#6366f1", gradTo: "#8b5cf6" },
              ].map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: ".75rem", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 18 }}>
                    <div style={{ width: 28, height: 2, borderRadius: 100, background: `linear-gradient(90deg,${p.gradFrom},${p.gradTo})` }} />
                    <div style={{ fontSize: ".9375rem", fontWeight: 700, color: S.text, letterSpacing: "-.02em" }}>{p.title}</div>
                    <p style={{ fontSize: ".875rem", color: S.textMuted, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                    <a href={p.link} target="_blank" rel="noopener" style={{ fontFamily: S.mono, fontSize: ".75rem", fontWeight: 600, textDecoration: "none", color: p.color, display: "inline-flex", alignItems: "center", gap: ".35rem" }}>Related project →</a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Education</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: ".75rem" }}>Academic Background</h2>
            <p style={{ fontSize: "1rem", color: S.textMuted, maxWidth: 520, lineHeight: 1.85, marginBottom: "2.25rem" }}>Rigorous CS fundamentals combined with specialized AI and bioinformatics training.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
            {EDUCATION.map((e, i) => (
              <FadeIn key={e.deg} delay={i * 0.1}>
                <div style={{ padding: "1.75rem", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 20, overflow: "hidden", transition: "border-color .2s, transform .2s" }} onMouseEnter={ev => { ev.currentTarget.style.borderColor = "rgba(139,92,246,0.3)"; ev.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={ev => { ev.currentTarget.style.borderColor = "rgba(139,92,246,0.15)"; ev.currentTarget.style.transform = "none"; }}>
                  <div style={{ height: 2, borderRadius: 100, background: `linear-gradient(90deg,${e.gradient.replace("from-","").split(" to-").map(c => ({ "violet-500": "#8b5cf6", "purple-400": "#c084fc", "indigo-500": "#6366f1", "violet-500b": "#8b5cf6", "fuchsia-500": "#d946ef", "purple-500": "#a855f7" })[c] || "#a855f7").join(",")})`, marginBottom: "1.25rem" }} />
                  <div style={{ fontFamily: S.mono, fontSize: ".7rem", color: S.textDim, letterSpacing: ".05em", marginBottom: ".75rem" }}>{e.period}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: S.text, letterSpacing: "-.02em", marginBottom: ".2rem" }}>{e.deg}</div>
                  <div style={{ fontFamily: S.mono, fontSize: ".8rem", marginBottom: ".2rem" }} className={e.instColor}>{e.inst}</div>
                  <div style={{ fontSize: ".8rem", color: S.textDim, marginBottom: ".65rem" }}>{e.loc}</div>
                  <div style={{ fontSize: ".8rem", color: S.textMuted }}>{e.detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }} className="section-bg-alt">
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Recognition & Leadership</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: "2.5rem" }}>Awards & Activities</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem" }}>
            {[
              {
                heading: "Awards",
                items: [
                  { title: "Highly Commended Poster Award", org: "Bioinformatics Summer Programme · University of Cambridge", grad: "linear-gradient(to bottom,#f59e0b,#f97316)" },
                  { title: "Excellence Certificate", org: "Imam Abdulrahman Bin Faisal University", grad: "linear-gradient(to bottom,#7c3aed,#c4b5fd)" },
                ],
              },
              {
                heading: "Leadership",
                items: [
                  { title: "Innovation & Development Member", org: "AI & Robotic Club · Imam Abdulrahman Bin Faisal University", grad: "linear-gradient(to bottom,#6366f1,#8b5cf6)" },
                  { title: "Event Committee Member", org: "Google Developer Club · Imam Abdulrahman Bin Faisal University", grad: "linear-gradient(to bottom,#ec4899,#8b5cf6)" },
                ],
              },
            ].map(({ heading, items }) => (
              <div key={heading}>
                <FadeIn><div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-.02em", color: S.text, marginBottom: "1.25rem" }}>{heading}</div></FadeIn>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {items.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.1}>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem 1.5rem", background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 14, transition: "border-color .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.28)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.12)"}>
                        <div style={{ width: 2, borderRadius: 100, flexShrink: 0, marginTop: 3, alignSelf: "stretch", background: item.grad }} />
                        <div>
                          <div style={{ fontSize: ".9375rem", fontWeight: 700, color: S.text, marginBottom: ".2rem" }}>{item.title}</div>
                          <div style={{ fontFamily: S.mono, fontSize: ".75rem", color: S.textDim }}>{item.org}</div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div className="chip"><span className="chip-dot" />Get In Touch</div>
            <h2 style={{ fontFamily: S.serif, fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.6rem)", lineHeight: 1.1, letterSpacing: "-.03em", color: S.text, marginBottom: "2.25rem" }}>Let's Connect</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <FadeIn>
              <p style={{ fontSize: "1rem", color: S.textMuted, lineHeight: 1.9, marginBottom: "2.25rem" }}>Open to research collaborations, data science projects, and opportunities in AI and bioinformatics. Feel free to reach out through any channel below.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {[
                  { href: "mailto:Fatima1dh@hotmail.com", label: "Email", val: "Fatima1dh@hotmail.com", iconBg: "rgba(139,92,246,0.12)", iconColor: "#c4b5fd", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { href: "https://www.linkedin.com/in/fatimaah-cis/", label: "LinkedIn", val: "linkedin.com/in/fatimaah-cis", iconBg: "rgba(99,102,241,0.12)", iconColor: "#818cf8", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.98-1.98c0-1.093.887-1.98 1.98-1.98s1.98.887 1.98 1.98a1.98 1.98 0 0 1-1.98 1.98zm1.706 13.019H3.631V9h3.412v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { href: "https://github.com/FatimaAbduljabar7", label: "GitHub", val: "FatimaAbduljabar7", iconBg: "rgba(236,72,153,0.1)", iconColor: "#f9a8d4", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.205 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg> },
                  { label: "Location", val: "Dammam, Saudi Arabia", iconBg: "rgba(245,158,11,0.1)", iconColor: "#fbbf24", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                ].map(({ href, label, val, iconBg, iconColor, svg }) => {
                  const inner = (
                    <>
                      <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: iconBg, color: iconColor }}>{svg}</div>
                      <div><div style={{ fontFamily: S.mono, fontSize: ".65rem", color: S.textDim, letterSpacing: ".04em" }}>{label}</div><div style={{ fontSize: ".9rem", fontWeight: 600, color: S.text }}>{val}</div></div>
                    </>
                  );
                  return href
                    ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="contact-row">{inner}</a>
                    : <div key={label} className="contact-row" style={{ cursor: "default" }}>{inner}</div>;
                })}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={e => { e.preventDefault(); setFormSent(true); e.target.reset(); setTimeout(() => setFormSent(false), 5000); }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                    <label style={{ fontFamily: S.mono, fontSize: ".7rem", fontWeight: 500, color: S.textMuted, letterSpacing: ".04em" }}>First Name</label>
                    <input className="form-input" type="text" placeholder="Your name" required />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                    <label style={{ fontFamily: S.mono, fontSize: ".7rem", fontWeight: 500, color: S.textMuted, letterSpacing: ".04em" }}>Last Name</label>
                    <input className="form-input" type="text" placeholder="Last name" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                  <label style={{ fontFamily: S.mono, fontSize: ".7rem", fontWeight: 500, color: S.textMuted, letterSpacing: ".04em" }}>Email</label>
                  <input className="form-input" type="email" placeholder="your@email.com" required />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                  <label style={{ fontFamily: S.mono, fontSize: ".7rem", fontWeight: 500, color: S.textMuted, letterSpacing: ".04em" }}>Subject</label>
                  <input className="form-input" type="text" placeholder="Research collaboration, opportunity..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                  <label style={{ fontFamily: S.mono, fontSize: ".7rem", fontWeight: 500, color: S.textMuted, letterSpacing: ".04em" }}>Message</label>
                  <textarea className="form-input" placeholder="Tell me about your project or opportunity..." />
                </div>
                <button type="submit" style={{ alignSelf: "flex-start", fontFamily: "'Inter',sans-serif", fontSize: ".875rem", fontWeight: 700, padding: ".8rem 2.25rem", borderRadius: 100, background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 0 24px rgba(139,92,246,0.4)", transition: "opacity .2s, transform .15s" }} onMouseEnter={e => { e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}>Send Message →</button>
                {formSent && <p style={{ fontFamily: S.mono, fontSize: ".825rem", color: "#c4b5fd", fontWeight: 600 }}>// Message sent — I'll be in touch soon.</p>}
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "rgba(139,92,246,0.03)", borderTop: "1px solid rgba(139,92,246,0.1)", padding: "2.5rem clamp(1.5rem,5vw,4rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: S.serif, fontSize: "1.1rem", fontWeight: 600, color: S.text }}>
            Fatima<span style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[["https://github.com/FatimaAbduljabar7","GitHub"],["https://www.linkedin.com/in/fatimaah-cis/","LinkedIn"],["mailto:Fatima1dh@hotmail.com","Email"]].map(([href,label]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={{ fontFamily: S.mono, fontSize: ".75rem", color: S.textDim, textDecoration: "none", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "#c4b5fd"} onMouseLeave={e => e.currentTarget.style.color = S.textDim}>{label}</a>
            ))}
          </div>
          <div style={{ fontFamily: S.mono, fontSize: ".75rem", color: S.textDim }}>© 2026 Fatima Alhelal</div>
        </div>
      </footer>
    </>
  );
}
