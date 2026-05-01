import { useState, useEffect } from "react";
import Head from "next/head";
import path from "path";
import fs from "fs";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "portfolio.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  return { props: { data } };
}

export default function Portfolio({ data }) {
  const [lang, setLang] = useState("en");
  const [ready, setReady] = useState(false);

  const t = (en, bn) => lang === "bn" ? bn : en;

  const { hero, projects, skills, contact, testimonials } = data;

  useEffect(() => {
    setReady(true);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!ready) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ready]);

  return (
    <>
      <Head>
        <title>{hero.nameEn} — Developer</title>
        <meta name="description" content={hero.bioEn} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${hero.nameEn} — Developer`} />
        <meta property="og:description" content={hero.bioEn} />
      </Head>

      <style>{`
        /* ── Reveal animation ── */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal.in  { opacity:1; transform:translateY(0); }

        /* ── Nav ── */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          padding:18px 52px;
          display:flex; align-items:center; justify-content:space-between;
          background:linear-gradient(to bottom,rgba(14,14,14,.96) 0%,transparent 100%);
          backdrop-filter:blur(6px);
        }
        .nav-logo {
          font-family:'Playfair Display',serif;
          font-size:1.15rem; font-weight:700; color:var(--accent);
        }
        .nav-right { display:flex; align-items:center; gap:36px; }
        .nav-right a {
          font-size:.72rem; letter-spacing:.15em;
          text-transform:uppercase; color:var(--muted); transition:color .2s;
        }
        .nav-right a:hover { color:var(--text); }
        .lang-btn {
          background:none; border:1px solid var(--border);
          color:var(--muted); padding:5px 14px; border-radius:2px;
          font-size:.72rem; letter-spacing:.08em; transition:all .2s;
        }
        .lang-btn:hover { border-color:var(--accent); color:var(--accent); }

        /* ── Hero ── */
        .hero {
          min-height:100vh; display:grid;
          grid-template-columns:1fr 1fr; overflow:hidden;
        }
        .hero-left {
          display:flex; flex-direction:column; justify-content:center;
          padding:130px 52px 90px; z-index:2;
        }
        .badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(90,174,138,.08);
          border:1px solid rgba(90,174,138,.3);
          color:var(--success); padding:6px 16px;
          border-radius:20px; font-size:.68rem;
          letter-spacing:.14em; text-transform:uppercase;
          width:fit-content; margin-bottom:36px;
        }
        .badge-dot {
          width:6px; height:6px; border-radius:50%;
          background:var(--success); animation:pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.35;transform:scale(.7)}
        }
        .hero-eyebrow {
          font-family:'DM Mono',monospace; font-size:.68rem;
          letter-spacing:.2em; text-transform:uppercase;
          color:var(--accent); margin-bottom:14px;
        }
        .hero-name {
          font-size:clamp(3rem,5.5vw,5.2rem);
          font-weight:900; line-height:1; margin-bottom:16px;
        }
        .hero-title {
          font-size:1.05rem; color:var(--muted);
          margin-bottom:24px; font-weight:400;
        }
        .hero-bio {
          font-size:.92rem; line-height:1.85;
          color:rgba(240,234,214,.58); max-width:430px; margin-bottom:40px;
        }
        .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .btn-gold {
          background:var(--accent); color:var(--bg); border:none;
          padding:13px 28px; font-size:.74rem; letter-spacing:.12em;
          text-transform:uppercase; font-weight:500; border-radius:2px;
          transition:all .2s; display:inline-block;
        }
        .btn-gold:hover { background:var(--accent2); transform:translateY(-2px); }
        .btn-ghost {
          background:none; color:var(--text);
          border:1px solid var(--border); padding:13px 28px;
          font-size:.74rem; letter-spacing:.12em; text-transform:uppercase;
          border-radius:2px; transition:all .2s; display:inline-block;
        }
        .btn-ghost:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }

        .hero-right { position:relative; display:flex; align-items:center; justify-content:center; }
        .hero-glow {
          position:absolute; inset:0;
          background:
            radial-gradient(ellipse 65% 70% at 55% 50%, rgba(200,169,110,.07) 0%,transparent 70%),
            radial-gradient(ellipse 35% 40% at 85% 18%, rgba(200,169,110,.04) 0%,transparent 60%);
        }
        .hero-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(200,169,110,.033) 1px,transparent 1px),
            linear-gradient(90deg,rgba(200,169,110,.033) 1px,transparent 1px);
          background-size:52px 52px;
          mask-image:radial-gradient(ellipse at center,black 20%,transparent 75%);
        }
        .hero-stats { position:relative; z-index:2; display:flex; flex-direction:column; gap:36px; }
        .stat { border-left:2px solid var(--accent); padding-left:22px; }
        .stat-n { font-family:'Playfair Display',serif; font-size:2.6rem; font-weight:700; color:var(--accent); line-height:1; }
        .stat-l { font-size:.67rem; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); margin-top:4px; }

        /* ── Section ── */
        .sec { padding:100px 52px; }
        .sec-tag {
          font-family:'DM Mono',monospace; font-size:.65rem;
          letter-spacing:.22em; text-transform:uppercase;
          color:var(--accent); margin-bottom:10px;
        }
        .sec-title { font-size:clamp(1.9rem,3vw,2.7rem); font-weight:700; line-height:1.15; }
        .sec-rule { width:44px; height:2px; background:var(--accent); margin-top:18px; }
        .sec-head { margin-bottom:60px; }

        /* ── Projects ── */
        .proj-wrap { background:var(--bg2); }
        .proj-inner { padding:100px 52px 0; }
        .proj-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill, minmax(320px,1fr));
          gap:1px; background:var(--border);
          margin-top:0;
        }
        .proj-card {
          background:var(--bg2); padding:36px;
          position:relative; overflow:hidden; transition:background .2s;
        }
        .proj-card::after {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--accent); transform:scaleX(0);
          transform-origin:left; transition:transform .3s ease;
        }
        .proj-card:hover::after { transform:scaleX(1); }
        .proj-card:hover { background:var(--bg3); }
        .proj-thumb {
          width:100%; height:168px; background:var(--bg3);
          border:1px solid var(--border); border-radius:2px;
          margin-bottom:22px; display:flex; align-items:center;
          justify-content:center; overflow:hidden;
        }
        .proj-thumb img { width:100%; height:100%; object-fit:cover; }
        .proj-placeholder {
          font-family:'DM Mono',monospace; font-size:.6rem;
          letter-spacing:.12em; text-transform:uppercase; color:var(--border);
        }
        .proj-title { font-size:1.2rem; font-weight:700; margin-bottom:10px; }
        .proj-desc { font-size:.86rem; color:rgba(240,234,214,.57); line-height:1.75; margin-bottom:18px; }
        .proj-tags { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:22px; }
        .proj-tag {
          font-family:'DM Mono',monospace; font-size:.6rem;
          letter-spacing:.1em; text-transform:uppercase;
          color:var(--accent); border:1px solid rgba(200,169,110,.22);
          padding:3px 10px; border-radius:2px;
        }
        .proj-links { display:flex; gap:10px; flex-wrap:wrap; }
        .link-live {
          font-size:.68rem; letter-spacing:.1em; text-transform:uppercase;
          padding:7px 16px; border-radius:2px; background:var(--accent);
          color:var(--bg); border:none; transition:background .2s; display:inline-block;
        }
        .link-live:hover { background:var(--accent2); }
        .link-gh {
          font-size:.68rem; letter-spacing:.1em; text-transform:uppercase;
          padding:7px 16px; border-radius:2px; border:1px solid var(--border);
          color:var(--muted); background:none; transition:all .2s; display:inline-block;
        }
        .link-gh:hover { border-color:var(--text); color:var(--text); }

        /* ── Skills ── */
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
        .skill-group {
          background:var(--bg2); border:1px solid var(--border);
          padding:26px; border-radius:2px; transition:border-color .2s;
        }
        .skill-group:hover { border-color:rgba(200,169,110,.3); }
        .skill-cat {
          font-family:'DM Mono',monospace; font-size:.65rem;
          letter-spacing:.16em; text-transform:uppercase;
          color:var(--accent); margin-bottom:14px;
        }
        .skill-items { display:flex; flex-wrap:wrap; gap:8px; }
        .skill-pill {
          font-size:.8rem; background:var(--bg3);
          border:1px solid var(--border); padding:5px 13px;
          border-radius:2px; transition:border-color .2s;
        }
        .skill-pill:hover { border-color:var(--accent); }

        /* ── Testimonials ── */
        .test-empty {
          border:1px dashed var(--border); padding:52px;
          text-align:center; color:var(--muted);
          font-size:.85rem; border-radius:2px; font-style:italic;
        }
        .test-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:20px; }
        .test-card { background:var(--bg2); border:1px solid var(--border); padding:28px; border-radius:2px; }
        .test-q { font-family:'Playfair Display',serif; font-size:2.4rem; color:var(--accent); line-height:1; margin-bottom:10px; }
        .test-text { font-size:.86rem; color:rgba(240,234,214,.65); line-height:1.75; margin-bottom:18px; }
        .test-author { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); }

        /* ── Contact ── */
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
        .contact-note { font-size:.9rem; color:var(--muted); line-height:1.8; margin-bottom:32px; }
        .c-links { display:flex; flex-direction:column; gap:14px; }
        .c-link { display:flex; align-items:center; gap:14px; color:var(--muted); font-size:.84rem; transition:color .2s; }
        .c-link:hover { color:var(--accent); }
        .c-icon {
          width:36px; height:36px; flex-shrink:0;
          border:1px solid var(--border); border-radius:2px;
          display:flex; align-items:center; justify-content:center;
          font-size:.78rem; transition:border-color .2s;
        }
        .c-link:hover .c-icon { border-color:var(--accent); }
        .contact-form { background:var(--bg2); border:1px solid var(--border); padding:32px; border-radius:2px; }
        .form-row { margin-bottom:14px; }
        .form-row input, .form-row textarea {
          width:100%; background:var(--bg);
          border:1px solid var(--border); color:var(--text);
          padding:11px 14px; border-radius:2px;
          font-family:'DM Sans',sans-serif; font-size:.88rem;
          outline:none; transition:border-color .2s;
        }
        .form-row input:focus, .form-row textarea:focus { border-color:var(--accent); }
        .form-row textarea { resize:vertical; }

        /* ── Footer ── */
        .footer {
          padding:36px 52px; border-top:1px solid var(--border);
          display:flex; justify-content:space-between; align-items:center;
          font-size:.72rem; color:var(--muted); letter-spacing:.06em;
        }
        .footer-mono { font-family:'DM Mono',monospace; font-size:.62rem; color:var(--border); }

        /* ── Mobile ── */
        @media(max-width:768px){
          .nav { padding:14px 20px; }
          .nav-right a { display:none; }
          .nav-right { gap:16px; }
          .hero { grid-template-columns:1fr; min-height:auto; }
          .hero-left { padding:100px 20px 60px; }
          .hero-right { display:none; }
          .sec { padding:70px 20px; }
          .proj-inner { padding:70px 20px 0; }
          .proj-grid { grid-template-columns:1fr; }
          .contact-grid { grid-template-columns:1fr; gap:44px; }
          .footer { flex-direction:column; gap:10px; text-align:center; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">{t(hero.nameEn, hero.nameBn)}</div>
        <div className="nav-right">
          <a href="#projects">{t("Projects", "প্রজেক্ট")}</a>
          <a href="#skills">{t("Skills", "দক্ষতা")}</a>
          <a href="#contact">{t("Contact", "যোগাযোগ")}</a>
          <button className="lang-btn" onClick={() => setLang(l => l === "en" ? "bn" : "en")}>
            {lang === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          {hero.available && (
            <div className="badge">
              <span className="badge-dot" />
              {t("Open to Freelance", "ফ্রিল্যান্সের জন্য উন্মুক্ত")}
            </div>
          )}
          <div className="hero-eyebrow">{t("Based in Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")}</div>
          <h1 className="hero-name">{t(hero.nameEn, hero.nameBn)}</h1>
          <div className="hero-title">{t(hero.titleEn, hero.titleBn)}</div>
          <p className="hero-bio">{t(hero.bioEn, hero.bioBn)}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn-gold">{t("View Work", "কাজ দেখুন")}</a>
            <a href="#contact" className="btn-ghost">{t("Hire Me", "কাজে লাগান")}</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-glow" />
          <div className="hero-grid" />
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-n">{projects.length}+</div>
              <div className="stat-l">{t("Live Projects", "লাইভ প্রজেক্ট")}</div>
            </div>
            <div className="stat">
              <div className="stat-n">2</div>
              <div className="stat-l">{t("Markets Served", "বাজার")}</div>
            </div>
            <div className="stat">
              <div className="stat-n">∞</div>
              <div className="stat-l">{t("Learning Daily", "প্রতিদিন শেখা")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="proj-wrap">
        <div className="proj-inner">
          <div className="sec-head reveal">
            <div className="sec-tag">// {t("Portfolio", "পোর্টফোলিও")}</div>
            <h2 className="sec-title">{t("Selected Work", "নির্বাচিত কাজ")}</h2>
            <div className="sec-rule" />
          </div>
        </div>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div key={p.id} className="proj-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="proj-thumb">
                {p.imageUrl
                  ? <img src={p.imageUrl} alt={p.titleEn} />
                  : <span className="proj-placeholder">{t("Preview", "প্রিভিউ")}</span>
                }
              </div>
              <h3 className="proj-title">{t(p.titleEn, p.titleBn)}</h3>
              <p className="proj-desc">{t(p.descEn, p.descBn)}</p>
              <div className="proj-tags">
                {(p.stack || []).map(s => <span key={s} className="proj-tag">{s}</span>)}
              </div>
              <div className="proj-links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link-live">
                    ↗ {t("Live Demo", "লাইভ")}
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="link-gh">
                    ⌥ GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="sec" id="skills">
        <div className="sec-head reveal">
          <div className="sec-tag">// {t("Stack", "প্রযুক্তি")}</div>
          <h2 className="sec-title">{t("Skills & Tools", "দক্ষতা ও টুলস")}</h2>
          <div className="sec-rule" />
        </div>
        <div className="skills-grid">
          {skills.map((g, i) => (
            <div key={g.category} className="skill-group reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="skill-cat">{g.category}</div>
              <div className="skill-items">
                {(g.items || []).map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="sec-head reveal">
          <div className="sec-tag">// {t("Social Proof", "সামাজিক প্রমাণ")}</div>
          <h2 className="sec-title">{t("What Clients Say", "ক্লায়েন্টরা কী বলেন")}</h2>
          <div className="sec-rule" />
        </div>
        {(!testimonials || testimonials.length === 0) ? (
          <div className="test-empty reveal">
            {t(
              "Testimonials coming soon — currently open to first clients.",
              "টেস্টিমোনিয়াল শীঘ্রই আসছে — প্রথম ক্লায়েন্টের জন্য উন্মুক্ত।"
            )}
          </div>
        ) : (
          <div className="test-grid">
            {testimonials.map((tm, i) => (
              <div key={i} className="test-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="test-q">"</div>
                <p className="test-text">{tm.text}</p>
                <div className="test-author">— {tm.author}, {tm.role}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CONTACT ── */}
      <section className="sec" id="contact">
        <div className="contact-grid">
          <div className="reveal">
            <div className="sec-tag">// {t("Let's Talk", "কথা বলা যাক")}</div>
            <h2 className="sec-title" style={{ marginBottom: "18px" }}>{t("Hire Me", "কাজে লাগান")}</h2>
            <div className="sec-rule" style={{ marginBottom: "26px" }} />
            <p className="contact-note">{t(contact.noteEn, contact.noteBn)}</p>
            <div className="c-links">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="c-link">
                  <div className="c-icon">✉</div>
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="c-link">
                  <div className="c-icon">W</div>
                  <span>WhatsApp</span>
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="c-link">
                  <div className="c-icon">in</div>
                  <span>LinkedIn</span>
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="c-link">
                  <div className="c-icon">gh</div>
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <div className="contact-form">
              <div className="sec-tag" style={{ marginBottom: "22px" }}>
                // {t("Quick Message", "দ্রুত বার্তা")}
              </div>
              <div className="form-row">
                <input placeholder={t("Your name", "আপনার নাম")} />
              </div>
              <div className="form-row">
                <input type="email" placeholder={t("Your email", "আপনার ইমেইল")} />
              </div>
              <div className="form-row">
                <textarea rows={4} placeholder={t("Tell me about your project...", "আপনার প্রজেক্ট সম্পর্কে বলুন...")} />
              </div>
              <button className="btn-gold" style={{ width: "100%" }}>
                {t("Send Message →", "বার্তা পাঠান →")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>© 2025 {hero.nameEn}. {t("Built with Next.js.", "Next.js দিয়ে তৈরি।")}</span>
        <span className="footer-mono">Dhaka, Bangladesh</span>
      </footer>
    </>
  );
}
