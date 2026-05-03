import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import path from "path";
import fs from "fs";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "portfolio.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return { props: { data } };
}

export default function Portfolio({ data }) {
  const [lang, setLang] = useState("en");
  const [ready, setReady] = useState(false);
  const cursorRef = useRef(null);

  const t = (en, bn) => lang === "bn" ? bn : en;
  const { hero, projects, skills, contact, testimonials } = data;

  useEffect(() => { setReady(true); }, []);

  // Cursor glow
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e) => {
      el.style.left = e.clientX + "px";
      el.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
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

  const valueProps = [
    { en: "Fast delivery", bn: "দ্রুত ডেলিভারি", subEn: "2–7 days", subBn: "২–৭ দিন" },
    { en: "Local + global", bn: "দেশি + বিদেশি", subEn: "BD & beyond", subBn: "বাংলাদেশ ও বাইরে" },
    { en: "Problem-focused", bn: "সমস্যাকেন্দ্রিক", subEn: "Not just code", subBn: "শুধু কোড না" },
    { en: "Full stack", bn: "ফুল স্ট্যাক", subEn: "Frontend + Firebase", subBn: "ফ্রন্টএন্ড + ফায়ারবেস" },
    { en: "Bangla + English", bn: "বাংলা + ইংরেজি", subEn: "Fluent in both", subBn: "দুটোতেই সাবলীল" },
  ];

  const services = [
    {
      titleEn: "Map-Based Apps",
      titleBn: "ম্যাপ-ভিত্তিক অ্যাপ",
      descEn: "Interactive maps with location data, filtering, and crowd-sourced contributions. Perfect for directories, real estate, and local discovery tools.",
      descBn: "লোকেশন ডেটা, ফিল্টারিং ও ক্রাউডসোর্সড কন্ট্রিবিউশন সহ ইন্টারেক্টিভ ম্যাপ।",
      refEn: "Like Muchi Koi or Dhaka Rent Map",
      refBn: "মুচি কই বা ঢাকা রেন্ট ম্যাপের মতো",
    },
    {
      titleEn: "Custom MVPs",
      titleBn: "কাস্টম MVP",
      descEn: "Turn your idea into a working product fast. Lean, functional MVPs with Firebase + Next.js ready to test with real users.",
      descBn: "আপনার আইডিয়াকে দ্রুত কার্যকর পণ্যে রূপান্তর করুন। Firebase + Next.js দিয়ে তৈরি MVP।",
      refEn: "From idea to deployed in 1–2 weeks",
      refBn: "আইডিয়া থেকে ডেপ্লয় ১–২ সপ্তাহে",
    },
    {
      titleEn: "Interactive Tools & Games",
      titleBn: "ইন্টারেক্টিভ টুলস ও গেম",
      descEn: "Quizzes, calculators, shareable generators, and fun branded experiences. Great for campaigns, events, and engagement.",
      descBn: "কুইজ, ক্যালকুলেটর, শেয়ারযোগ্য জেনারেটর ও ব্র্যান্ডেড অভিজ্ঞতা।",
      refEn: "Like Salamichai",
      refBn: "সালামিচাইয়ের মতো",
    },
    {
      titleEn: "Data Dashboards & Forms",
      titleBn: "ডেটা ড্যাশবোর্ড ও ফর্ম",
      descEn: "Survey tools, data collection forms, and visual dashboards. Ideal for NGOs, researchers, and institutions needing structured data.",
      descBn: "সার্ভে টুল, ডেটা কালেকশন ফর্ম ও ভিজ্যুয়াল ড্যাশবোর্ড। NGO ও গবেষকদের জন্য আদর্শ।",
      refEn: "Especially for NGO/INGO use cases",
      refBn: "বিশেষত NGO/INGO ব্যবহারের জন্য",
    },
  ];

  const whyMe = [
    {
      num: "01",
      titleEn: "I build fast",
      titleBn: "দ্রুত বানাই",
      descEn: "Most projects delivered in 2–7 days. I don't disappear for weeks. You get updates and a working product quickly.",
      descBn: "বেশিরভাগ প্রজেক্ট ২–৭ দিনে ডেলিভারি। আপডেট পাবেন দ্রুত।",
    },
    {
      num: "02",
      titleEn: "Working products, not complexity",
      titleBn: "কার্যকর পণ্য, জটিলতা নয়",
      descEn: "I focus on what solves the problem — not on showing off clever code. Simple, clean, and maintainable.",
      descBn: "সমস্যা সমাধানে মনোযোগ দিই — চালাক কোড দেখানোয় নয়। সহজ, পরিষ্কার ও রক্ষণযোগ্য।",
    },
    {
      num: "03",
      titleEn: "I understand local context",
      titleBn: "স্থানীয় প্রেক্ষাপট বুঝি",
      descEn: "I know Dhaka, Bangladesh, and local user behavior. I build for real people — not generic templates.",
      descBn: "ঢাকা, বাংলাদেশ ও স্থানীয় ব্যবহারকারীদের আচরণ জানি। জেনেরিক টেমপ্লেট নয়।",
    },
    {
      num: "04",
      titleEn: "Clear communication",
      titleBn: "স্পষ্ট যোগাযোগ",
      descEn: "Fluent in Bangla and English. I explain things clearly, ask the right questions, and keep you in the loop.",
      descBn: "বাংলা ও ইংরেজিতে সাবলীল। স্পষ্টভাবে বুঝিয়ে বলি এবং আপডেটে রাখি।",
    },
  ];

  const aboutTags = [
    { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
    { en: "IR Student", bn: "আইআর শিক্ষার্থী" },
    { en: "Political Activism", bn: "রাজনৈতিক সক্রিয়তা" },
    { en: "Social Work", bn: "সামাজিক কাজ" },
    { en: "Survey & Research", bn: "জরিপ ও গবেষণা" },
  ];

  return (
    <>
      <Head>
        <title>{hero.nameEn} — Developer</title>
        <meta name="description" content={hero.bioEn} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        /* ── Cursor glow ── */
        .cursor-glow {
          pointer-events:none; position:fixed; z-index:9999;
          width:420px; height:420px;
          border-radius:50%;
          background:radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%);
          transform:translate(-50%,-50%);
          transition:left .12s ease, top .12s ease;
          mix-blend-mode:screen;
        }

        /* ── Reveal ── */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal.in { opacity:1; transform:translateY(0); }

        /* ── Nav ── */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          padding:18px 52px;
          display:flex; align-items:center; justify-content:space-between;
          background:linear-gradient(to bottom,rgba(14,14,14,.96) 0%,transparent 100%);
          backdrop-filter:blur(6px);
        }
        .nav-logo { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:700; color:var(--accent); }
        .nav-right { display:flex; align-items:center; gap:32px; }
        .nav-right a { font-size:.72rem; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); transition:color .2s; }
        .nav-right a:hover { color:var(--text); }
        .lang-btn { background:none; border:1px solid var(--border); color:var(--muted); padding:5px 14px; border-radius:2px; font-size:.72rem; letter-spacing:.08em; transition:all .2s; }
        .lang-btn:hover { border-color:var(--accent); color:var(--accent); }

        /* ── Hero ── */
        .hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; }
        .hero-left { display:flex; flex-direction:column; justify-content:center; padding:130px 52px 90px; z-index:2; }
        .badge { display:inline-flex; align-items:center; gap:8px; background:rgba(90,174,138,.08); border:1px solid rgba(90,174,138,.3); color:var(--success); padding:6px 16px; border-radius:20px; font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; width:fit-content; margin-bottom:36px; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--success); animation:pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
        .hero-eyebrow { font-family:'DM Mono',monospace; font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); margin-bottom:14px; }
        .hero-name { font-size:clamp(3rem,5.5vw,5.2rem); font-weight:900; line-height:1; margin-bottom:16px; }
        .hero-title { font-size:1.05rem; color:var(--muted); margin-bottom:24px; font-weight:400; }
        .hero-bio { font-size:.92rem; line-height:1.85; color:rgba(240,234,214,.58); max-width:430px; margin-bottom:40px; }
        .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .btn-gold { background:var(--accent); color:var(--bg); border:none; padding:13px 28px; font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; font-weight:500; border-radius:2px; transition:all .2s; display:inline-block; }
        .btn-gold:hover { background:var(--accent2); transform:translateY(-2px); }
        .btn-ghost { background:none; color:var(--text); border:1px solid var(--border); padding:13px 28px; font-size:.74rem; letter-spacing:.12em; text-transform:uppercase; border-radius:2px; transition:all .2s; display:inline-block; }
        .btn-ghost:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }
        .hero-right { position:relative; display:flex; align-items:center; justify-content:center; }
        .hero-glow { position:absolute; inset:0; background:radial-gradient(ellipse 65% 70% at 55% 50%, rgba(200,169,110,.07) 0%,transparent 70%), radial-gradient(ellipse 35% 40% at 85% 18%, rgba(200,169,110,.04) 0%,transparent 60%); }
        .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(200,169,110,.033) 1px,transparent 1px), linear-gradient(90deg,rgba(200,169,110,.033) 1px,transparent 1px); background-size:52px 52px; mask-image:radial-gradient(ellipse at center,black 20%,transparent 75%); }
        .hero-stats { position:relative; z-index:2; display:flex; flex-direction:column; gap:36px; }
        .stat { border-left:2px solid var(--accent); padding-left:22px; }
        .stat-n { font-family:'Playfair Display',serif; font-size:2.6rem; font-weight:700; color:var(--accent); line-height:1; }
        .stat-l { font-size:.67rem; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); margin-top:4px; }

        /* ── Section shell ── */
        .sec { padding:100px 52px; }
        .sec-tag { font-family:'DM Mono',monospace; font-size:.65rem; letter-spacing:.22em; text-transform:uppercase; color:var(--accent); margin-bottom:10px; }
        .sec-title { font-size:clamp(1.9rem,3vw,2.7rem); font-weight:700; line-height:1.15; }
        .sec-sub { font-size:.95rem; color:var(--muted); margin-top:12px; max-width:520px; line-height:1.7; }
        .sec-rule { width:44px; height:2px; background:var(--accent); margin-top:18px; }
        .sec-head { margin-bottom:60px; }

        /* ── Value props ── */
        .vp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1px; background:var(--border); }
        .vp-card { background:var(--bg); padding:32px 28px; transition:background .2s; }
        .vp-card:hover { background:var(--bg3); }
        .vp-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; margin-bottom:6px; color:var(--text); }
        .vp-sub { font-size:.78rem; color:var(--accent); font-family:'DM Mono',monospace; letter-spacing:.08em; }

        /* ── About ── */
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        .about-body { font-size:.95rem; color:rgba(240,234,214,.7); line-height:1.85; }
        .about-body p { margin-bottom:18px; }
        .about-quote {
          border-left:2px solid var(--accent); padding:16px 24px;
          margin:28px 0; font-family:'Playfair Display',serif;
          font-size:1.05rem; font-style:italic; color:var(--text);
          background:rgba(200,169,110,.04);
        }
        .about-tags { display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; }
        .about-tag { font-family:'DM Mono',monospace; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); border:1px solid var(--border); padding:5px 14px; border-radius:2px; transition:all .2s; }
        .about-tag:hover { border-color:var(--accent); color:var(--accent); }
        .about-visual { position:relative; display:flex; align-items:center; justify-content:center; }
        .about-box {
          width:100%; aspect-ratio:1;
          border:1px solid var(--border); border-radius:2px;
          background:var(--bg2); display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; max-width:360px;
        }
        .about-box-glow { position:absolute; inset:0; background:radial-gradient(ellipse at center, rgba(200,169,110,.06) 0%, transparent 70%); }
        .about-box-text { position:relative; z-index:2; text-align:center; }
        .about-box-initial { font-family:'Playfair Display',serif; font-size:7rem; font-weight:900; color:rgba(200,169,110,.12); line-height:1; }
        .about-box-label { font-family:'DM Mono',monospace; font-size:.65rem; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); margin-top:8px; }

        /* ── Services ── */
        .services-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
        .service-card { background:var(--bg2); border:1px solid var(--border); padding:32px; border-radius:2px; transition:border-color .25s, transform .25s; }
        .service-card:hover { border-color:rgba(200,169,110,.4); transform:translateY(-3px); }
        .service-num { font-family:'DM Mono',monospace; font-size:.62rem; letter-spacing:.18em; color:var(--accent); margin-bottom:16px; opacity:.6; }
        .service-title { font-size:1.1rem; font-weight:700; margin-bottom:12px; font-family:'Playfair Display',serif; }
        .service-desc { font-size:.86rem; color:rgba(240,234,214,.58); line-height:1.75; margin-bottom:18px; }
        .service-ref { font-family:'DM Mono',monospace; font-size:.68rem; letter-spacing:.06em; color:var(--accent); opacity:.7; }

        /* ── Projects ── */
        .proj-wrap { background:var(--bg2); }
        .proj-inner { padding:100px 52px 0; }
        .proj-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1px; background:var(--border); }
        .proj-card { background:var(--bg2); padding:36px; position:relative; overflow:hidden; transition:background .2s; }
        .proj-card::after { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--accent); transform:scaleX(0); transform-origin:left; transition:transform .3s ease; }
        .proj-card:hover::after { transform:scaleX(1); }
        .proj-card:hover { background:var(--bg3); }
        .proj-thumb { width:100%; height:168px; background:var(--bg3); border:1px solid var(--border); border-radius:2px; margin-bottom:22px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .proj-thumb img { width:100%; height:100%; object-fit:cover; }
        .proj-placeholder { font-family:'DM Mono',monospace; font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:var(--border); }
        .proj-title { font-size:1.2rem; font-weight:700; margin-bottom:10px; }
        .proj-desc { font-size:.86rem; color:rgba(240,234,214,.57); line-height:1.75; margin-bottom:18px; }
        .proj-tags { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:22px; }
        .proj-tag { font-family:'DM Mono',monospace; font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); border:1px solid rgba(200,169,110,.22); padding:3px 10px; border-radius:2px; }
        .proj-links { display:flex; gap:10px; flex-wrap:wrap; }
        .link-live { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; padding:7px 16px; border-radius:2px; background:var(--accent); color:var(--bg); border:none; transition:background .2s; display:inline-block; }
        .link-live:hover { background:var(--accent2); }
        .link-gh { font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; padding:7px 16px; border-radius:2px; border:1px solid var(--border); color:var(--muted); background:none; transition:all .2s; display:inline-block; }
        .link-gh:hover { border-color:var(--text); color:var(--text); }

        /* ── Skills ── */
        .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
        .skill-group { background:var(--bg2); border:1px solid var(--border); padding:26px; border-radius:2px; transition:border-color .2s; }
        .skill-group:hover { border-color:rgba(200,169,110,.3); }
        .skill-cat { font-family:'DM Mono',monospace; font-size:.65rem; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); margin-bottom:14px; }
        .skill-items { display:flex; flex-wrap:wrap; gap:8px; }
        .skill-pill { font-size:.8rem; background:var(--bg3); border:1px solid var(--border); padding:5px 13px; border-radius:2px; transition:border-color .2s; }
        .skill-pill:hover { border-color:var(--accent); }

        /* ── Why Me ── */
        .whyme-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px; }
        .whyme-card { padding:32px; border:1px solid var(--border); border-radius:2px; transition:border-color .25s, background .25s; }
        .whyme-card:hover { border-color:rgba(200,169,110,.35); background:var(--bg2); }
        .whyme-num { font-family:'Playfair Display',serif; font-size:2.8rem; font-weight:900; color:rgba(200,169,110,.15); line-height:1; margin-bottom:14px; }
        .whyme-title { font-size:1rem; font-weight:500; margin-bottom:10px; letter-spacing:.01em; }
        .whyme-desc { font-size:.86rem; color:rgba(240,234,214,.55); line-height:1.75; }

        /* ── Testimonials ── */
        .test-empty { border:1px dashed var(--border); padding:52px; text-align:center; color:var(--muted); font-size:.85rem; border-radius:2px; font-style:italic; }
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
        .c-icon { width:36px; height:36px; flex-shrink:0; border:1px solid var(--border); border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:.78rem; transition:border-color .2s; }
        .c-link:hover .c-icon { border-color:var(--accent); }
        .contact-form { background:var(--bg2); border:1px solid var(--border); padding:32px; border-radius:2px; }
        .form-row { margin-bottom:14px; }
        .form-row input, .form-row textarea { width:100%; background:var(--bg); border:1px solid var(--border); color:var(--text); padding:11px 14px; border-radius:2px; font-family:'DM Sans',sans-serif; font-size:.88rem; outline:none; transition:border-color .2s; }
        .form-row input:focus, .form-row textarea:focus { border-color:var(--accent); }
        .form-row textarea { resize:vertical; }

        /* ── Footer ── */
        .footer { padding:36px 52px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; font-size:.72rem; color:var(--muted); letter-spacing:.06em; }
        .footer-mono { font-family:'DM Mono',monospace; font-size:.62rem; color:var(--border); }

        /* ── Mobile ── */
        @media(max-width:768px){
          .cursor-glow { display:none; }
          .nav { padding:14px 20px; }
          .nav-right a { display:none; }
          .nav-right { gap:16px; }
          .hero { grid-template-columns:1fr; min-height:auto; }
          .hero-left { padding:100px 20px 60px; }
          .hero-right { display:none; }
          .sec { padding:70px 20px; }
          .proj-inner { padding:70px 20px 0; }
          .proj-grid { grid-template-columns:1fr; }
          .about-grid { grid-template-columns:1fr; gap:44px; }
          .about-visual { display:none; }
          .contact-grid { grid-template-columns:1fr; gap:44px; }
          .footer { flex-direction:column; gap:10px; text-align:center; }
          .vp-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" ref={cursorRef} />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">{t(hero.nameEn, hero.nameBn)}</div>
        <div className="nav-right">
          <a href="#about">{t("About", "পরিচয়")}</a>
          <a href="#services">{t("Services", "সেবা")}</a>
          <a href="#projects">{t("Projects", "প্রজেক্ট")}</a>
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

      {/* ── VALUE PROPS ── */}
      <section style={{ background: "var(--bg2)", padding: "0" }}>
        <div className="vp-grid">
          {valueProps.map((vp, i) => (
            <div key={i} className="vp-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="vp-title">{t(vp.en, vp.bn)}</div>
              <div className="vp-sub">{t(vp.subEn, vp.subBn)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec" id="about">
        <div className="about-grid">
          <div className="reveal">
            <div className="sec-tag">// {t("Who I Am", "আমি কে")}</div>
            <h2 className="sec-title" style={{ marginBottom: "28px" }}>
              {t("Not just a developer.", "শুধু একজন ডেভেলপার নই।")}
            </h2>
            <div className="about-body">
              <p>
                {t(
                  "I'm Shakib — an International Relations student at Dhaka University and a self-taught web developer. I started building because I saw problems around me that needed simple, digital solutions.",
                  "আমি শাকিব — ঢাকা বিশ্ববিদ্যালয়ের আন্তর্জাতিক সম্পর্কের শিক্ষার্থী এবং স্ব-শিক্ষিত ওয়েব ডেভেলপার। আমি বিল্ড করা শুরু করেছিলাম কারণ আমি আমার চারপাশে সমস্যা দেখেছিলাম যেগুলোর সহজ, ডিজিটাল সমাধান দরকার ছিল।"
                )}
              </p>
              <p>
                {t(
                  "My IR background gives me something most developers don't have: I understand people, context, and why problems exist — not just how to fix them in code.",
                  "আমার আইআর ব্যাকগ্রাউন্ড আমাকে এমন কিছু দেয় যা বেশিরভাগ ডেভেলপারের নেই: আমি মানুষ, প্রেক্ষাপট এবং কেন সমস্যাগুলো বিদ্যমান তা বুঝি — শুধু কোডে কীভাবে ঠিক করতে হয় তা নয়।"
                )}
              </p>
            </div>
            <div className="about-quote">
              {t(
                `"I care more about whether something works than whether it looks impressive in code."`,
                `"কোড দেখতে চমৎকার কিনা তার চেয়ে কিছু কাজ করে কিনা তা নিয়ে আমি বেশি চিন্তা করি।"`
              )}
            </div>
            <div className="about-tags">
              {aboutTags.map((tag, i) => (
                <span key={i} className="about-tag">{t(tag.en, tag.bn)}</span>
              ))}
            </div>
          </div>
          <div className="about-visual reveal" style={{ transitionDelay: "120ms" }}>
            <div className="about-box">
              <div className="about-box-glow" />
                <img 
                  src="/shakib-photo.jpg"
                  alt="Shakib"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "2px" }}
                />
              </div>
            </div>
          </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sec" id="services" style={{ background: "var(--bg2)" }}>
        <div className="sec-head reveal">
          <div className="sec-tag">// {t("What I Do", "আমি কী করি")}</div>
          <h2 className="sec-title">{t("Services", "সেবাসমূহ")}</h2>
          <p className="sec-sub">{t("Fast, practical web apps — delivered in days, not months.", "দ্রুত, ব্যবহারিক ওয়েব অ্যাপ — মাস নয়, দিনের মধ্যে ডেলিভারি।")}</p>
          <div className="sec-rule" />
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="service-num">0{i + 1}</div>
              <div className="service-title">{t(s.titleEn, s.titleBn)}</div>
              <p className="service-desc">{t(s.descEn, s.descBn)}</p>
              <div className="service-ref">→ {t(s.refEn, s.refBn)}</div>
            </div>
          ))}
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
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link-live">↗ {t("Live Demo", "লাইভ")}</a>}
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="link-gh">⌥ GitHub</a>}
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

      {/* ── WHY ME ── */}
      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="sec-head reveal">
          <div className="sec-tag">// {t("Why Me", "কেন আমি")}</div>
          <h2 className="sec-title">{t("Why work with me?", "কেন আমার সাথে কাজ করবেন?")}</h2>
          <div className="sec-rule" />
        </div>
        <div className="whyme-grid">
          {whyMe.map((w, i) => (
            <div key={i} className="whyme-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="whyme-num">{w.num}</div>
              <div className="whyme-title">{t(w.titleEn, w.titleBn)}</div>
              <p className="whyme-desc">{t(w.descEn, w.descBn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec">
        <div className="sec-head reveal">
          <div className="sec-tag">// {t("Social Proof", "সামাজিক প্রমাণ")}</div>
          <h2 className="sec-title">{t("What Clients Say", "ক্লায়েন্টরা কী বলেন")}</h2>
          <div className="sec-rule" />
        </div>
        {(!testimonials || testimonials.length === 0) ? (
          <div className="test-empty reveal">
            {t("Testimonials coming soon — currently open to first clients.", "টেস্টিমোনিয়াল শীঘ্রই আসছে — প্রথম ক্লায়েন্টের জন্য উন্মুক্ত।")}
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
      <section className="sec" id="contact" style={{ background: "var(--bg2)" }}>
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
              <div className="sec-tag" style={{ marginBottom: "22px" }}>// {t("Quick Message", "দ্রুত বার্তা")}</div>
              <div className="form-row"><input placeholder={t("Your name", "আপনার নাম")} /></div>
              <div className="form-row"><input type="email" placeholder={t("Your email", "আপনার ইমেইল")} /></div>
              <div className="form-row"><textarea rows={4} placeholder={t("Tell me about your project...", "আপনার প্রজেক্ট সম্পর্কে বলুন...")} /></div>
              <button className="btn-gold" style={{ width: "100%" }}>{t("Send Message →", "বার্তা পাঠান →")}</button>
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
