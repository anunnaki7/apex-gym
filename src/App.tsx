import { useState, useEffect, useRef } from "react";
import "./hover.css";

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (2000 / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Reveal on scroll ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── Translations ──────────────────────────────────────────────────────────────
const t = {
  sr: {
    nav: ["Početna", "O Nama", "Programi", "Cijene", "Treneri", "Kontakt"],
    demoBanner: "⚠️ DEMO PROJEKAT — Svi podaci su fiktivni · Napravio:",
    badge: "#1 Teretana u Podgorici",
    heroTitle1: "IZGRADI",
    heroTitle2: "SVOJU",
    heroTitle3: "LEGENDU",
    heroSub: "Transformiši svoje tijelo, ojačaj svoju volju. Premium gym iskustvo u srcu Podgorice — gdje se prave legende.",
    heroCta1: "Istraži Programme",
    heroCta2: "Postani Član",
    statsYears: "Godina",
    statsMembers: "Članova",
    statsTrainers: "Trenera",
    statsSatisfaction: "Zadovoljstvo",
    aboutTitle: "O NAMA",
    aboutSub: "Više od teretane — to je zajednica",
    aboutText1: "Apex Gym je osnovan 2012. godine sa jednom misijom: stvoriti prostor gdje se svaki čovjek može transformisati. Nismo samo teretana — mi smo zajednica.",
    aboutText2: "Sa over 3.000 aktivnih članova i timom od 50+ sertifikovanih trenera, nudimo premium iskustvo koje prevazilazi očekivanja.",
    aboutFeatures: ["Oprema najnovije generacije", "Otvoreno 24/7 sve dane", "Personalizovani planovi", "Besplatna prva konsultacija"],
    aboutCta: "Saznaj više",
    programsTitle: "NAŠI PROGRAMI",
    programsSub: "Izaberi svoju transformaciju",
    programs: [
      { name: "Snaga", desc: "Powerlifting i bodybuilding treninzi sa vrhunskom opremom i profesionalnim vodičima." },
      { name: "HIIT", desc: "Visoko intenzivni intervalni treninzi koji tope masti i grade kondiciju za rekordno kratko vrijeme." },
      { name: "Borilačke vještine", desc: "Box, MMA i Kickboxing sa iskusnim borcima. Za sve nivoe — od početnika do takmičara." },
      { name: "Mobilnost", desc: "Yoga, pilates i mobility rad. Fleksibilnost i balans kao osnova svakog zdravog tijela." },
      { name: "Funkcionalni", desc: "CrossFit-inspirisani treninzi koji razvijaju snagu, brzinu i izdržljivost u jednom." },
      { name: "Body Transform", desc: "12-nedjelni program sa personalnim trenerom, planom ishrane i tjednim praćenjem napretka." },
    ],
    pricingTitle: "CIJENE",
    pricingSub: "Transparentno, bez skrivenih troškova",
    plans: [
      { name: "Starter", price: "29", per: "mj", tag: null, features: ["Pristup teretani", "Grupni treninzi", "Locker room", "App pristup"] },
      { name: "Pro", price: "59", per: "mj", tag: "NAJPOPULARNIJE", features: ["Sve iz Starter plana", "2× Personal trening/mj", "Nutri konsultacija", "Sauna & spa pristup", "Prioritetna rezervacija"] },
      { name: "Elite", price: "99", per: "mj", tag: null, features: ["Sve iz Pro plana", "Neograničen personal", "Privatni locker", "Mjesečni health check", "VIP zona pristup", "24/7 trener na pozivu"] },
    ],
    pricingCta: "Odaberi Plan",
    trainersTitle: "NAŠI TRENERI",
    trainersSub: "Stručnjaci koji te vode do cilja",
    trainers: [
      { name: "Marko Petrović", role: "Strength & Powerlifting", exp: "8 god. iskustva", cert: "NSCA Sertifikat" },
      { name: "Ana Nikolić", role: "HIIT & Kardio", exp: "6 god. iskustva", cert: "ACE Certified" },
      { name: "Stefan Đurić", role: "MMA & Borilačke", exp: "10 god. iskustva", cert: "Bivši šampion" },
      { name: "Maja Vukić", role: "Yoga & Mobilnost", exp: "7 god. iskustva", cert: "RYT-500 Yoga" },
    ],
    testimonialsTitle: "USPJEŠNE PRIČE",
    testimonialsSub: "Naši članovi, naša ponos",
    testimonials: [
      { name: "Nikola M.", result: "-22kg za 4 mj", text: "Apex mi je promijenio život. Trener Stefan je uvijek tu, plan je personalizovan i rezultati su nevjerovatni." },
      { name: "Jelena K.", result: "+15kg mišića", text: "Kao žena nisam bila sigurna, ali ovdje se osjećam kao kod kuće. Ana je fenomenalna trenerica!" },
      { name: "Miloš R.", result: "Maraton za 6 mj", text: "Došao sam s nultom kondicijom, za 6 mjeseci istrčao prvi maraton. Ovo je više od teretane." },
    ],
    contactTitle: "KONTAKTIRAJ NAS",
    contactSub: "Slobodni smo za sva pitanja",
    contactForm: { name: "Ime i prezime", email: "Email adresa", message: "Poruka...", send: "Pošalji poruku" },
    contactInfo: ["Bulevar Svetog Petra Cetinjskog 12, Podgorica", "Radnim danima: 06:00 – 23:00\nVikendom: 08:00 – 21:00", "+382 20 123 456"],
    footerRights: "Sva prava zadržana.",
    footerDemo: "Demo projekat · Svi podaci su fiktivni",
    footerMadeBy: "Napravio",
    ctaTitle: "SPREMAN SI?",
    ctaSub: "Pridruži se 3.000+ članova koji su već promijenili svoje živote. Prva sedmica — besplatno.",
    ctaBtn: "Počni Odmah — Besplatno",
    backToTop: "Nazad gore",
  },
  en: {
    nav: ["Home", "About", "Programs", "Pricing", "Trainers", "Contact"],
    demoBanner: "⚠️ DEMO PROJECT — All data is fictional · Made by:",
    badge: "#1 Gym in Podgorica",
    heroTitle1: "FORGE",
    heroTitle2: "YOUR",
    heroTitle3: "LEGACY",
    heroSub: "Transform your body, strengthen your will. Premium gym experience in the heart of Podgorica — where legends are made.",
    heroCta1: "Explore Programs",
    heroCta2: "Become a Member",
    statsYears: "Years",
    statsMembers: "Members",
    statsTrainers: "Trainers",
    statsSatisfaction: "Satisfaction",
    aboutTitle: "ABOUT US",
    aboutSub: "More than a gym — it's a community",
    aboutText1: "Apex Gym was founded in 2012 with one mission: to create a space where every person can transform. We're not just a gym — we're a community.",
    aboutText2: "With over 3,000 active members and a team of 50+ certified trainers, we offer a premium experience that exceeds expectations.",
    aboutFeatures: ["Latest generation equipment", "Open 24/7 every day", "Personalized plans", "Free first consultation"],
    aboutCta: "Learn more",
    programsTitle: "OUR PROGRAMS",
    programsSub: "Choose your transformation",
    programs: [
      { name: "Strength", desc: "Powerlifting and bodybuilding workouts with top equipment and professional guidance." },
      { name: "HIIT", desc: "High-intensity interval training that burns fat and builds endurance in record time." },
      { name: "Combat Sports", desc: "Boxing, MMA and Kickboxing with experienced fighters. For all levels — beginner to competitor." },
      { name: "Mobility", desc: "Yoga, pilates and mobility work. Flexibility and balance as the foundation of every healthy body." },
      { name: "Functional", desc: "CrossFit-inspired workouts that develop strength, speed and endurance all in one." },
      { name: "Body Transform", desc: "12-week program with personal trainer, nutrition plan and weekly progress tracking." },
    ],
    pricingTitle: "PRICING",
    pricingSub: "Transparent, no hidden costs",
    plans: [
      { name: "Starter", price: "29", per: "mo", tag: null, features: ["Gym access", "Group classes", "Locker room", "App access"] },
      { name: "Pro", price: "59", per: "mo", tag: "MOST POPULAR", features: ["Everything in Starter", "2× Personal training/mo", "Nutrition consultation", "Sauna & spa access", "Priority booking"] },
      { name: "Elite", price: "99", per: "mo", tag: null, features: ["Everything in Pro", "Unlimited personal training", "Private locker", "Monthly health check", "VIP zone access", "24/7 trainer on call"] },
    ],
    pricingCta: "Choose Plan",
    trainersTitle: "OUR TRAINERS",
    trainersSub: "Experts who guide you to your goal",
    trainers: [
      { name: "Marko Petrović", role: "Strength & Powerlifting", exp: "8 years experience", cert: "NSCA Certified" },
      { name: "Ana Nikolić", role: "HIIT & Cardio", exp: "6 years experience", cert: "ACE Certified" },
      { name: "Stefan Đurić", role: "MMA & Combat Sports", exp: "10 years experience", cert: "Former Champion" },
      { name: "Maja Vukić", role: "Yoga & Mobility", exp: "7 years experience", cert: "RYT-500 Yoga" },
    ],
    testimonialsTitle: "SUCCESS STORIES",
    testimonialsSub: "Our members, our pride",
    testimonials: [
      { name: "Nikola M.", result: "-22kg in 4 mo", text: "Apex changed my life. Trainer Stefan is always there, the plan is personalized and the results are incredible." },
      { name: "Jelena K.", result: "+15kg muscle", text: "As a woman I wasn't sure, but here I feel at home. Ana is a phenomenal trainer!" },
      { name: "Miloš R.", result: "Marathon in 6 mo", text: "I came with zero fitness, in 6 months I ran my first marathon. This is more than a gym." },
    ],
    contactTitle: "CONTACT US",
    contactSub: "We're available for all questions",
    contactForm: { name: "Full name", email: "Email address", message: "Message...", send: "Send message" },
    contactInfo: ["Bulevar Svetog Petra Cetinjskog 12, Podgorica", "Weekdays: 06:00 – 23:00\nWeekends: 08:00 – 21:00", "+382 20 123 456"],
    footerRights: "All rights reserved.",
    footerDemo: "Demo project · All data is fictional",
    footerMadeBy: "Made by",
    ctaTitle: "ARE YOU READY?",
    ctaSub: "Join 3,000+ members who have already changed their lives. First week — free.",
    ctaBtn: "Start Now — Free",
    backToTop: "Back to top",
  },
};

const programIcons = [
  // Strength
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11M3 12h18M9 6.5V3M15 6.5V3M9 21v-3.5M15 21v-3.5"/></svg>,
  // HIIT
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // Combat
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l4-4 4 4-4 4-4-4z"/></svg>,
  // Mobility
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-5 13-5 13S7 10 7 7a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="2"/></svg>,
  // Functional
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>,
  // Body Transform
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
];

const programColors = [
  "rgba(239,68,68,0.15)", "rgba(249,115,22,0.15)", "rgba(168,85,247,0.15)",
  "rgba(20,184,166,0.15)", "rgba(59,130,246,0.15)", "rgba(234,179,8,0.15)",
];
const programBorders = [
  "rgba(239,68,68,0.3)", "rgba(249,115,22,0.3)", "rgba(168,85,247,0.3)",
  "rgba(20,184,166,0.3)", "rgba(59,130,246,0.3)", "rgba(234,179,8,0.3)",
];
const programIconColors = ["#ef4444", "#f97316", "#a855f7", "#14b8a6", "#3b82f6", "#eab308"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lang, setLang] = useState<"sr" | "en">("sr");
  const [activeSection, setActiveSection] = useState("home");
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preloaderHide, setPreloaderHide] = useState(false);
  const txt = t[lang];

  // Preloader logic
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPreloaderHide(true), 600);
        setTimeout(() => setPreloaderDone(true), 1200);
      } else {
        setProgress(Math.floor(p));
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navIds = ["home", "o-nama", "programi", "cijene", "treneri", "kontakt"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div style={{ background: "#080808", color: "#fff", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
        .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }
        .grad-text {
          background: linear-gradient(135deg, #ff4444, #ff8c00, #ff4444);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 3s ease infinite;
        }
        @keyframes gradShift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        

        /* DEMO BANNER */
        .demo-banner {
          background: rgba(180,20,20,0.92);
          text-align: center;
          padding: 5px 16px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.9);
          position: fixed;
          top: 0;
          left: 0; right: 0;
          z-index: 10001;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .demo-banner a {
          color: #fff;
          font-weight: 800;
          text-decoration: underline;
        }

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 27px; left: 0; right: 0; z-index: 1000;
          transition: all 0.4s ease;
          padding: 12px 20px;
          background: transparent;
          backdrop-filter: blur(0px);
        }
        .navbar.scrolled {
          background: rgba(8,8,8,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(220,38,38,0.2);
          padding: 10px 20px;
          box-shadow: 0 4px 30px rgba(220,38,38,0.1);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px; cursor: pointer;
        }
        .logo-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: white;
          font-family: 'Bebas Neue', sans-serif;
          box-shadow: 0 0 20px rgba(220,38,38,0.5);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .logo-icon:hover {
          transform: rotate(10deg) scale(1.1);
        }
        .logo-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 3px;
          background: linear-gradient(135deg, #fff, #dc2626);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* LANG SWITCHER */
        .lang-switcher {
          display: flex; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 4px;
        }
        .lang-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px 10px; border-radius: 6px;
          font-size: 12px; font-weight: 700; letter-spacing: 1px;
          color: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
        }
        .lang-btn.active {
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          color: #fff;
        }
        .lang-btn:hover:not(.active) { color: #fff; }

        /* HAMBURGER */
        .hamburger {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 8px;
          border-radius: 8px; transition: background 0.3s;
        }
        .hamburger:hover { background: rgba(220,38,38,0.1); }
        .ham-line {
          width: 24px; height: 2px; background: #fff; border-radius: 2px;
          transition: all 0.3s ease; transform-origin: center;
        }
        .hamburger.open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999;
          background: rgba(8,8,8,0.98);
          backdrop-filter: blur(30px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu-lang {
          display: flex; gap: 12px; margin-bottom: 20px;
        }
        .mobile-nav-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px; letter-spacing: 4px;
          color: rgba(255,255,255,0.35);
          cursor: pointer; transition: all 0.3s ease;
          position: relative; padding: 8px 30px;
          text-align: center;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active { color: #fff; }
        .mobile-nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 50%; right: 50%;
          height: 2px; background: linear-gradient(90deg, #dc2626, #ff8c00);
          transition: all 0.3s ease; border-radius: 2px;
        }
        .mobile-nav-link:hover::after, .mobile-nav-link.active::after { left: 20%; right: 20%; }

        /* DESKTOP NAV */
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .desktop-nav { display: none; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex; gap: 28px; align-items: center; }
          .hamburger { display: none; }
          .mobile-menu { display: none; }
        }
        .desk-link {
          color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.3s ease; letter-spacing: 1px;
          text-transform: uppercase; position: relative; padding-bottom: 4px;
          background: none; border: none;
        }
        .desk-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 100%;
          height: 1px; background: linear-gradient(90deg, #dc2626, #ff8c00);
          transition: right 0.3s ease;
        }
        .desk-link:hover { color: #fff; }
        .desk-link:hover::after { right: 0; }
        .desk-link.active { color: #fff; }
        .desk-link.active::after { right: 0; }

        /* HERO */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative;
          padding: 60px 20px 120px;
          text-align: center;
          background: #060606;
        }

        /* LIQUID BLOBS */
        .liquid-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); animation: blobFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .blob1 {
          width: 500px; height: 500px; top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(220,38,38,0.35) 0%, rgba(255,60,0,0.15) 50%, transparent 70%);
          animation-duration: 9s;
        }
        .blob2 {
          width: 400px; height: 400px; bottom: -80px; right: -100px;
          background: radial-gradient(circle, rgba(255,120,0,0.25) 0%, rgba(220,38,38,0.1) 50%, transparent 70%);
          animation-duration: 11s; animation-delay: -3s;
        }
        .blob3 {
          width: 300px; height: 300px; top: 40%; left: 60%;
          background: radial-gradient(circle, rgba(180,0,80,0.2) 0%, transparent 70%);
          animation-duration: 7s; animation-delay: -5s;
        }
        @keyframes blobFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(20px,-30px) scale(1.05); }
          50% { transform: translate(-15px,20px) scale(0.95); }
          75% { transform: translate(25px,10px) scale(1.03); }
        }

        /* NOISE TEXTURE */
        .hero-noise {
          position: absolute; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* GRID LINES */
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          pointer-events: none;
        }

        /* LIQUID GLASS BADGE */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 100px; padding: 10px 20px; margin-bottom: 32px;
          font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          animation: fadeDown 0.8s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #dc2626;
          box-shadow: 0 0 8px #dc2626;
          animation: blink 1.5s ease infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; box-shadow: 0 0 8px #dc2626; } 50% { opacity: 0.4; box-shadow: 0 0 2px #dc2626; } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }

        /* HERO TITLE */
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 22vw, 200px);
          line-height: 0.85; letter-spacing: 2px;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        .hero-title-line {
          display: block;
          transform-style: preserve-3d;
        }
        .hero-title-line.white { color: #ffffff; }
        .hero-title-line.accent {
          background: linear-gradient(135deg, #ff3a3a 0%, #ff8c00 50%, #ff3a3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 3s ease infinite, fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both;
          filter: drop-shadow(0 0 40px rgba(220,38,38,0.4));
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

        /* 3D FLOATING CARDS */
        .hero-3d-cards {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .float-card {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border-radius: 20px;
          padding: 16px 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          animation: cardFloat linear infinite;
        }
        .fc1 {
          top: 18%; left: 3%; width: 140px;
          animation-duration: 6s; animation-delay: 0s;
        }
        .fc2 {
          top: 25%; right: 4%; width: 130px;
          animation-duration: 7s; animation-delay: -2s;
        }
        .fc3 {
          bottom: 22%; left: 5%; width: 120px;
          animation-duration: 5.5s; animation-delay: -1s;
        }
        .fc4 {
          bottom: 28%; right: 3%; width: 135px;
          animation-duration: 8s; animation-delay: -3s;
        }
        @media (max-width: 640px) {
          .fc1 { left: -20px; top: 12%; width: 110px; }
          .fc2 { right: -15px; top: 18%; width: 105px; }
          .fc3 { left: -15px; bottom: 18%; width: 100px; }
          .fc4 { right: -15px; bottom: 22%; width: 110px; }
        }
        @keyframes cardFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        .fc-label { font-size: 9px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 6px; }
        .fc-value { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; line-height: 1; }
        .fc-sub { font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 4px; }
        .fc-red { color: #ff4444; }
        .fc-orange { color: #ff8c00; }
        .fc-green { color: #22c55e; }
        .fc-blue { color: #60a5fa; }

        /* LIQUID GLASS LINE */
        .hero-divider {
          width: 80px; height: 2px; margin: 24px auto 28px;
          background: linear-gradient(90deg, transparent, #dc2626, #ff8c00, transparent);
          border-radius: 2px;
          animation: fadeUp 0.9s ease 0.5s both;
        }

        /* HERO SUB */
        .hero-sub {
          font-size: clamp(14px, 3.5vw, 17px);
          color: rgba(255,255,255,0.85); max-width: 440px;
          margin: 0 auto 36px; line-height: 1.8; font-weight: 400;
          animation: fadeUp 0.9s ease 0.4s both;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.8);
        }

        /* LIQUID GLASS BUTTONS */
        .hero-btns {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.9s ease 0.55s both;
          margin-bottom: 20px;
        }
        @media (max-width: 480px) {
          .hero-btns { flex-direction: column; align-items: center; gap: 10px; }
          .btn-primary, .btn-secondary { width: 100%; max-width: 280px; }
        }
        .btn-primary {
          background: linear-gradient(135deg, #dc2626 0%, #ff6500 100%);
          color: #fff; border: none; border-radius: 16px;
          padding: 16px 32px; font-size: 13px; font-weight: 700;
          cursor: pointer; letter-spacing: 1.5px; text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 32px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          position: relative; overflow: hidden;
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          border-radius: inherit;
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 40px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .btn-primary:active { transform: scale(0.96); }
        .btn-secondary {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
          padding: 16px 32px; font-size: 13px; font-weight: 600;
          cursor: pointer; letter-spacing: 1.5px; text-transform: uppercase;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .btn-secondary:hover { 
          border-color: rgba(220,38,38,0.4); 
          background: rgba(220,38,38,0.08);
          transform: translateY(-3px);
        }
        .btn-secondary:active { transform: scale(0.96); }

        /* SCROLL INDICATOR */
        .scroll-indicator {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          animation: fadeUp 1s ease 1.5s both;
          pointer-events: none;
          z-index: 5;
          padding: 20px 0 10px;
        }
        .scroll-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.3); font-weight: 600;
        }
        .scroll-mouse {
          width: 20px; height: 32px; border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 10px; display: flex; justify-content: center; padding-top: 5px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(10px);
        }
        .scroll-wheel {
          width: 2px; height: 5px; background: #dc2626; border-radius: 2px;
          animation: scrollWheel 1.5s ease infinite;
        }
        @keyframes scrollWheel { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(7px); } }

        /* SECTIONS */
        .section { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 480px) {
          .section { padding: 60px 16px; }
          .section-title { font-size: clamp(32px, 10vw, 56px); }
          .trainer-card { padding: 18px 12px; }
          .trainer-avatar { width: 56px; height: 56px; font-size: 20px; }
          .trainer-name { font-size: 13px; }
          .trainer-role { font-size: 11px; }
          .price-card { padding: 24px 18px; }
          .cta-section { margin: 0 12px 60px; padding: 48px 16px; }
          .testi-card { padding: 20px 16px; }
          .info-card { padding: 14px 12px; }
          .stats-grid { margin: 0 12px; }
          .stat-card { padding: 24px 12px; }
        }
        .section-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: #dc2626; margin-bottom: 12px;
        }
        .section-tag::before { content: ''; width: 20px; height: 1px; background: #dc2626; }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 8vw, 64px);
          line-height: 1; margin-bottom: 8px;
        }
        .section-sub {
          color: rgba(255,255,255,0.4); font-size: 15px; font-weight: 300; margin-bottom: 48px;
        }

        /* STATS */
        .stats-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
          background: rgba(255,255,255,0.05); border-radius: 20px; overflow: hidden;
          margin: 0 20px;
        }
        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .stat-card {
          background: rgba(12,12,12,1); padding: 32px 16px; text-align: center;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          background: rgba(220,38,38,0.05);
        }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(42px, 8vw, 64px);
          background: linear-gradient(135deg, #ff4444, #ff8c00);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .stat-label { color: rgba(255,255,255,0.4); font-size: 12px; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase; }

        /* ABOUT */
        .about-grid {
          display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center;
        }
        @media (min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr; } }
        .about-visual {
          aspect-ratio: 1; border-radius: 24px; overflow: hidden;
          background: linear-gradient(135deg, #1a0a0a, #0d0505);
          border: 1px solid rgba(220,38,38,0.25);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .about-visual-bg {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 70%);
          animation: pulse 3s ease-in-out infinite;
        }
        .about-visual-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.15);
          animation: ringPulse 3s ease-in-out infinite;
        }
        .about-visual-ring:nth-child(2) { width: 60%; height: 60%; animation-delay: 0s; }
        .about-visual-ring:nth-child(3) { width: 75%; height: 75%; animation-delay: 0.5s; border-color: rgba(255,140,0,0.1); }
        .about-visual-ring:nth-child(4) { width: 90%; height: 90%; animation-delay: 1s; }
        @keyframes ringPulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
        .about-logo-center {
          position: relative; z-index: 2; text-align: center;
        }
        .about-logo-letters {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 15vw, 120px);
          line-height: 1;
          background: linear-gradient(135deg, #fff 0%, #dc2626 50%, #ff8c00 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 30px rgba(220,38,38,0.4));
          animation: float 3s ease-in-out infinite;
        }
        .about-logo-sub {
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-top: 4px; font-weight: 600;
        }
        .about-stat-badges {
          position: absolute; inset: 0; pointer-events: none;
        }
        .about-badge {
          position: absolute; background: rgba(220,38,38,0.15);
          backdrop-filter: blur(10px); border: 1px solid rgba(220,38,38,0.3);
          border-radius: 12px; padding: 8px 14px; text-align: center;
        }
        .about-badge:nth-child(1) { top: 15%; left: 5%; animation: float 3s ease-in-out infinite; }
        .about-badge:nth-child(2) { top: 15%; right: 5%; animation: float 3s ease-in-out infinite 1s; }
        .about-badge:nth-child(3) { bottom: 15%; left: 50%; transform: translateX(-50%); animation: float 3s ease-in-out infinite 0.5s; }
        .about-badge-num { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #ff8c00; line-height: 1; }
        .about-badge-label { font-size: 9px; color: rgba(255,255,255,0.5); letter-spacing: 1px; text-transform: uppercase; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .about-features { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .about-feature {
          display: flex; align-items: center; gap: 12px;
          color: rgba(255,255,255,0.7); font-size: 14px;
          transition: all 0.3s ease;
        }
        .about-feature:hover {
          transform: translateX(6px);
          color: #fff;
        }
        .check-icon { color: #dc2626; flex-shrink: 0; }

        /* PROGRAMS */
        .programs-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 480px) { .programs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .programs-grid { grid-template-columns: repeat(3, 1fr); } }
        .program-card {
          border-radius: 20px; padding: 28px 24px;
          border: 1px solid; transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .program-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .program-card:active { transform: scale(0.98); }
        .prog-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: all 0.3s ease;
        }
        .program-card:hover .prog-icon {
          transform: rotate(10deg) scale(1.1);
        }
        .prog-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 1px; margin-bottom: 8px;
        }
        .prog-desc { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.6; }

        /* PRICING */
        .pricing-grid {
          display: grid; grid-template-columns: 1fr; gap: 20px;
        }
        @media (min-width: 768px) { .pricing-grid { grid-template-columns: repeat(3, 1fr); } }
        .price-card {
          border-radius: 24px; padding: 32px 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position: relative; overflow: hidden;
        }
        .price-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .price-card.featured {
          background: rgba(220,38,38,0.07);
          border-color: rgba(220,38,38,0.4);
          box-shadow: 0 0 60px rgba(220,38,38,0.15);
        }
        .price-card.featured:hover {
          box-shadow: 0 30px 60px rgba(220,38,38,0.3);
        }
        .price-tag {
          position: absolute; top: 16px; right: 16px;
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          color: #fff; font-size: 9px; font-weight: 800; letter-spacing: 1.5px;
          padding: 4px 10px; border-radius: 100px; text-transform: uppercase;
        }
        .price-name {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin-bottom: 16px;
        }
        .price-amount {
          display: flex; align-items: flex-start; gap: 4px; margin-bottom: 24px;
        }
        .price-currency { font-size: 20px; color: rgba(255,255,255,0.5); margin-top: 8px; }
        .price-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 1;
          background: linear-gradient(135deg, #ff4444, #ff8c00);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .price-per { font-size: 13px; color: rgba(255,255,255,0.3); margin-top: 16px; align-self: flex-end; }
        .price-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .price-feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.7); }
        .btn-plan {
          width: 100%; padding: 14px;
          border-radius: 12px; font-size: 13px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s ease; border: none;
        }
        .btn-plan.featured-btn {
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          color: #fff; box-shadow: 0 8px 30px rgba(220,38,38,0.3);
        }
        .btn-plan.featured-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(220,38,38,0.4);
        }
        .btn-plan.normal-btn {
          background: transparent; color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .btn-plan.normal-btn:hover {
          border-color: rgba(220,38,38,0.4);
          background: rgba(220,38,38,0.08);
        }
        .btn-plan:active { transform: scale(0.97); }

        /* TRAINERS */
        .trainers-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        @media (min-width: 640px) { .trainers-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .trainers-grid { grid-template-columns: repeat(4, 1fr); } }
        .trainer-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px 16px; text-align: center;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .trainer-card:hover {
          transform: translateY(-8px);
          border-color: rgba(220,38,38,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .trainer-card:active { transform: scale(0.97); }
        .trainer-avatar {
          width: 70px; height: 70px; border-radius: 50%; margin: 0 auto 14px;
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: white;
          box-shadow: 0 0 30px rgba(220,38,38,0.3);
          transition: all 0.3s ease;
        }
        .trainer-card:hover .trainer-avatar {
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(220,38,38,0.5);
        }
        .trainer-name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
        .trainer-role { color: #dc2626; font-size: 12px; font-weight: 600; letter-spacing: 1px; margin-bottom: 8px; }
        .trainer-meta { color: rgba(255,255,255,0.3); font-size: 11px; line-height: 1.7; }

        /* TESTIMONIALS */
        .testi-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 768px) { .testi-grid { grid-template-columns: repeat(3, 1fr); } }
        .testi-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 24px 20px;
          transition: all 0.3s ease;
        }
        .testi-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,140,0,0.3);
        }
        .testi-stars { color: #ff8c00; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
        .testi-text { color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.7; margin-bottom: 16px; font-style: italic; }
        .testi-author { display: flex; justify-content: space-between; align-items: center; }
        .testi-name { font-weight: 700; font-size: 13px; }
        .testi-result {
          background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
          color: #ff6b6b; font-size: 11px; font-weight: 700; letter-spacing: 1px;
          padding: 3px 10px; border-radius: 100px;
        }

        /* CTA SECTION */
        .cta-section {
          margin: 0 20px 80px; border-radius: 28px; overflow: hidden;
          background: linear-gradient(135deg, rgba(220,38,38,0.15), rgba(255,140,0,0.1));
          border: 1px solid rgba(220,38,38,0.2);
          padding: 60px 24px; text-align: center; position: relative;
        }
        .cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 10vw, 72px); line-height: 1; margin-bottom: 16px;
        }
        .cta-sub { color: rgba(255,255,255,0.5); font-size: 15px; max-width: 400px; margin: 0 auto 32px; line-height: 1.7; }

        /* CONTACT */
        .contact-grid {
          display: grid; grid-template-columns: 1fr; gap: 40px;
        }
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 1fr 1fr; } }
        .contact-form { display: flex; flex-direction: column; gap: 14px; }
        .form-input {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 14px 16px; color: #fff; font-size: 14px;
          outline: none; transition: all 0.3s ease; width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.25); }
        .form-input:focus { 
          border-color: rgba(220,38,38,0.5);
          box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
        }
        textarea.form-input { min-height: 120px; resize: vertical; }
        .contact-info-cards { display: flex; flex-direction: column; gap: 14px; }
        .info-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 18px 16px; display: flex; gap: 14px; align-items: flex-start;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          transform: translateX(4px);
          border-color: rgba(220,38,38,0.2);
        }
        .info-icon {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
          display: flex; align-items: center; justify-content: center; color: #dc2626;
          transition: all 0.3s ease;
        }
        .info-card:hover .info-icon {
          transform: scale(1.1);
        }
        .info-text { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.7; white-space: pre-line; }

        /* FOOTER */
        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 28px 20px; text-align: center;
        }
        .footer-top {
          display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px;
        }
        .footer-text { color: rgba(255,255,255,0.2); font-size: 12px; line-height: 1.8; }
        .footer-link { color: rgba(220,38,38,0.8); text-decoration: none; font-weight: 700; }
        .footer-link:hover { color: #ff8c00; }

        /* BACK TO TOP */
        .back-to-top {
          position: fixed; bottom: 24px; right: 20px; z-index: 999;
          width: 46px; height: 46px; border-radius: 14px;
          background: linear-gradient(135deg, #dc2626, #ff8c00);
          border: none; cursor: pointer; color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(220,38,38,0.4);
          transition: all 0.3s ease;
          opacity: 0; pointer-events: none; transform: translateY(10px);
        }
        .back-to-top.visible { opacity: 1; pointer-events: all; transform: translateY(0); }
        .back-to-top:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 12px 32px rgba(220,38,38,0.5);
        }
        .back-to-top:active { transform: scale(0.93); }

        /* PRELOADER */
        .preloader {
          position: fixed; inset: 0; z-index: 9999;
          background: #060606;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        .preloader.hide { opacity: 0; visibility: hidden; }
        .preloader-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 12vw, 90px);
          letter-spacing: 8px;
          background: linear-gradient(135deg, #ff3a3a 0%, #ff8c00 50%, #ff3a3a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 2s ease infinite, logoReveal 0.8s cubic-bezier(0.16,1,0.3,1) both;
          margin-bottom: 8px;
        }
        @keyframes logoReveal {
          from { opacity: 0; transform: translateY(30px) scale(0.9); letter-spacing: 20px; }
          to { opacity: 1; transform: translateY(0) scale(1); letter-spacing: 8px; }
        }
        .preloader-tagline {
          font-size: 11px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 60px;
          animation: fadeUp 0.8s ease 0.3s both;
        }
        .preloader-bar-wrap {
          width: min(280px, 70vw);
          height: 2px; background: rgba(255,255,255,0.08); border-radius: 2px;
          overflow: hidden; margin-bottom: 16px;
          animation: fadeUp 0.8s ease 0.4s both;
        }
        .preloader-bar {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #ff8c00);
          border-radius: 2px;
          transition: width 0.15s ease;
          box-shadow: 0 0 10px rgba(220,38,38,0.8);
        }
        .preloader-percent {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; letter-spacing: 3px;
          color: rgba(255,255,255,0.3);
          animation: fadeUp 0.8s ease 0.4s both;
        }
        .preloader-figure {
          position: absolute; bottom: 60px;
          animation: figureRun 0.5s steps(1) infinite, figureEnter 1s ease 0.2s both;
        }
        @keyframes figureEnter { from { opacity:0; transform: translateX(-100px); } to { opacity:1; transform: translateX(0); } }
        @keyframes figureRun { 0%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .preloader-glow {
          position: absolute; width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 2s ease infinite;
        }
        @keyframes glowPulse { 0%,100% { transform: scale(1); opacity:1; } 50% { transform: scale(1.3); opacity:0.5; } }

        /* VIDEO HERO */
        .video-hero {
          min-height: 100svh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative;
          overflow: visible;
          padding: 0 20px 80px;
          text-align: center;
          margin-top: 0;
        }
        .video-wrap {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none; overflow: hidden;
          background: #0a0a0a;
        }
        .video-fallback {
          position: absolute; inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(220,38,38,0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(234,88,12,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(220,38,38,0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%);
          z-index: 0;
        }
        .video-wrap iframe {
          position: absolute;
          top: 50%; left: 50%;
          width: 177.78vh;
          height: 56.25vw;
          min-width: 100%;
          min-height: 100%;
          transform: translate(-50%, -50%);
          border: none;
        }
        .video-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(6,6,6,0.7) 0%,
            rgba(6,6,6,0.55) 40%,
            rgba(6,6,6,0.75) 80%,
            rgba(6,6,6,1) 100%
          );
        }
        .video-overlay-side {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            to right,
            rgba(6,6,6,0.5) 0%,
            transparent 30%,
            transparent 70%,
            rgba(6,6,6,0.5) 100%
          );
        }
        .video-red-glow {
          position: absolute; inset: 0; z-index: 1;
          background: radial-gradient(ellipse at center, rgba(220,38,38,0.2) 0%, transparent 70%);
        }
      `}</style>

      {/* DEMO BANNER */}
      <div className="demo-banner">
        {txt.demoBanner}{" "}
        <a href="https://github.com/anunnaki7/apex-gym" target="_blank" rel="noreferrer">anunnaki7 / apex-gym</a>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("home")}>
            <div className="logo-icon">A</div>
            <span className="logo-text">APEX GYM</span>
          </div>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            {navIds.map((id, i) => (
              <button key={id} className={`desk-link${activeSection === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
                {txt.nav[i]}
              </button>
            ))}
          </div>

          <div className="nav-right">
            {/* LANG SWITCHER */}
            <div className="lang-switcher">
              <button className={`lang-btn${lang === "sr" ? " active" : ""}`} onClick={() => setLang("sr")}>SR</button>
              <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
            </div>

            {/* HAMBURGER */}
            <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mobile-menu-lang">
          <button className={`lang-btn${lang === "sr" ? " active" : ""}`} onClick={() => setLang("sr")} style={{ fontSize: 14, padding: "6px 16px" }}>SR</button>
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")} style={{ fontSize: 14, padding: "6px 16px" }}>EN</button>
        </div>
        {navIds.map((id, i) => (
          <div key={id} className={`mobile-nav-link${activeSection === id ? " active" : ""}`} onClick={() => scrollTo(id)}>
            {txt.nav[i]}
          </div>
        ))}
      </div>

      {/* PRELOADER */}
      {!preloaderDone && (
        <div className={`preloader${preloaderHide ? " hide" : ""}`}>
          <div className="preloader-glow" />
          <div className="preloader-logo">APEX GYM</div>
          <div className="preloader-tagline">Forge Your Legacy</div>
          <div className="preloader-bar-wrap">
            <div className="preloader-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="preloader-percent">{progress}%</div>
          <div className="preloader-figure">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              {/* Stick figure lifting */}
              <circle cx="24" cy="8" r="4" fill="#dc2626"/>
              <line x1="24" y1="12" x2="24" y2="28" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="18" x2="14" y2="24" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="18" x2="34" y2="24" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="14" y1="24" x2="8" y2="22" stroke="#ff8c00" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="34" y1="24" x2="40" y2="22" stroke="#ff8c00" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="8" cy="22" r="3" fill="none" stroke="#ff8c00" strokeWidth="2"/>
              <circle cx="40" cy="22" r="3" fill="none" stroke="#ff8c00" strokeWidth="2"/>
              <line x1="24" y1="28" x2="18" y2="40" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="28" x2="30" y2="40" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      )}

      {/* HERO — YouTube Video Background */}
      <section id="home" className="video-hero">
        {/* Video background */}
        <div className="video-wrap">
          <div className="video-fallback" />
          <iframe
            src="https://www.youtube.com/embed/tUykoP30Gb0?autoplay=1&mute=1&loop=1&playlist=tUykoP30Gb0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Apex Gym background"
            style={{ position: 'absolute', top: '50%', left: '50%', width: '177.78vh', height: '56.25vw', minWidth: '100%', minHeight: '100%', transform: 'translate(-50%, -50%)', border: 'none', zIndex: 1 }}
          />
        </div>
        <div className="video-overlay" />
        <div className="video-overlay-side" />
        <div className="video-red-glow" />
        <div className="grid-overlay" style={{ zIndex: 2 }} />

        {/* Main content + scroll indicator zajedno u centru */}
        <div style={{ position: "relative", zIndex: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "clamp(100px, 18vw, 160px)", paddingBottom: "40px" }}>
          <div className="hero-badge">
            <div className="badge-dot" />
            {txt.badge}
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line white">{txt.heroTitle1}</span>
            <span className="hero-title-line accent">{txt.heroTitle2}</span>
            <span className="hero-title-line white">{txt.heroTitle3}</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-sub">{txt.heroSub}</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("programi")}>{txt.heroCta1}</button>
            <button className="btn-secondary" onClick={() => scrollTo("cijene")}>{txt.heroCta2}</button>
          </div>

          {/* Scroll indicator — flexbox ga automatski centrira */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            marginTop: "32px",
            pointerEvents: "none",
            animation: "fadeUp 1s ease 1.5s both",
          }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>scroll</div>
            <div style={{ width: "20px", height: "32px", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "10px", display: "flex", justifyContent: "center", paddingTop: "5px", background: "rgba(255,255,255,0.03)" }}>
              <div style={{ width: "2px", height: "5px", background: "#dc2626", borderRadius: "2px", animation: "scrollWheel 1.5s ease infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ padding: "0 0 80px" }}>
        <Reveal>
          <div className="stats-grid">
            {[
              { target: 12, suffix: "+", label: txt.statsYears },
              { target: 3000, suffix: "+", label: txt.statsMembers },
              { target: 50, suffix: "+", label: txt.statsTrainers },
              { target: 98, suffix: "%", label: txt.statsSatisfaction },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-num"><Counter target={s.target} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ABOUT */}
      <div id="o-nama" style={{ padding: "0 0 80px" }}>
        <div className="section" style={{ padding: "0 20px" }}>
          <div className="about-grid">
            <Reveal delay={0}>
              <div className="about-visual">
                <div className="about-visual-bg" />
                <div className="about-visual-ring" />
                <div className="about-visual-ring" />
                <div className="about-visual-ring" />
                <div className="about-logo-center">
                  <div className="about-logo-letters">APEX</div>
                  <div className="about-logo-sub">Premium Gym · Est. 2012</div>
                </div>
                <div className="about-stat-badges">
                  <div className="about-badge">
                    <div className="about-badge-num">12+</div>
                    <div className="about-badge-label">Godina</div>
                  </div>
                  <div className="about-badge">
                    <div className="about-badge-num">3K+</div>
                    <div className="about-badge-label">Članova</div>
                  </div>
                  <div className="about-badge">
                    <div className="about-badge-num">50+</div>
                    <div className="about-badge-label">Trenera</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <div className="section-tag">{txt.aboutTitle}</div>
                <h2 className="section-title">{txt.aboutSub}</h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>{txt.aboutText1}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8 }}>{txt.aboutText2}</p>
                <div className="about-features">
                  {txt.aboutFeatures.map((f, i) => (
                    <div className="about-feature" key={i}>
                      <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => scrollTo("kontakt")}>{txt.aboutCta}</button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* PROGRAMS */}
      <div id="programi" style={{ padding: "0 0 80px", background: "rgba(255,255,255,0.01)" }}>
        <div className="section">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>{txt.programsTitle}</div>
              <h2 className="section-title">{txt.programsSub}</h2>
            </div>
          </Reveal>
          <div className="programs-grid">
            {txt.programs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="program-card" style={{ background: programColors[i], borderColor: programBorders[i] }}>
                  <div className="prog-icon" style={{ background: programColors[i], border: `1px solid ${programBorders[i]}`, color: programIconColors[i] }}>
                    {programIcons[i]}
                  </div>
                  <div className="prog-name" style={{ color: programIconColors[i] }}>{p.name}</div>
                  <p className="prog-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="cijene" style={{ padding: "0 0 80px" }}>
        <div className="section">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>{txt.pricingTitle}</div>
              <h2 className="section-title">{txt.pricingSub}</h2>
            </div>
          </Reveal>
          <div className="pricing-grid">
            {txt.plans.map((plan, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`price-card${plan.tag ? " featured" : ""}`}>
                  {plan.tag && <div className="price-tag">{plan.tag}</div>}
                  <div className="price-name">{plan.name}</div>
                  <div className="price-amount">
                    <span className="price-currency">€</span>
                    <span className="price-num">{plan.price}</span>
                    <span className="price-per">/{plan.per}</span>
                  </div>
                  <div className="price-features">
                    {plan.features.map((f, j) => (
                      <div className="price-feature" key={j}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button className={`btn-plan${plan.tag ? " featured-btn" : " normal-btn"}`} onClick={() => scrollTo("kontakt")}>
                    {txt.pricingCta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* TRAINERS */}
      <div id="treneri" style={{ padding: "0 0 80px", background: "rgba(255,255,255,0.01)" }}>
        <div className="section">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>{txt.trainersTitle}</div>
              <h2 className="section-title">{txt.trainersSub}</h2>
            </div>
          </Reveal>
          <div className="trainers-grid">
            {txt.trainers.map((tr, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="trainer-card">
                  <div className="trainer-avatar">{tr.name.charAt(0)}</div>
                  <div className="trainer-name">{tr.name}</div>
                  <div className="trainer-role">{tr.role}</div>
                  <div className="trainer-meta">{tr.exp}<br />{tr.cert}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: "0 0 80px" }}>
        <div className="section">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>{txt.testimonialsTitle}</div>
              <h2 className="section-title">{txt.testimonialsSub}</h2>
            </div>
          </Reveal>
          <div className="testi-grid">
            {txt.testimonials.map((te, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="testi-card">
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">"{te.text}"</p>
                  <div className="testi-author">
                    <span className="testi-name">{te.name}</span>
                    <span className="testi-result">{te.result}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Reveal>
        <div className="cta-section">
          <div className="hero-bg" style={{ opacity: 0.5 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="cta-title">
              <span className="grad-text">{txt.ctaTitle}</span>
            </h2>
            <p className="cta-sub">{txt.ctaSub}</p>
            <button className="btn-primary" style={{ fontSize: 15, padding: "18px 36px" }} onClick={() => scrollTo("kontakt")}>
              {txt.ctaBtn}
            </button>
          </div>
        </div>
      </Reveal>

      {/* CONTACT */}
      <div id="kontakt" style={{ padding: "80px 0" }}>
        <div className="section">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag" style={{ justifyContent: "center" }}>{txt.contactTitle}</div>
              <h2 className="section-title">{txt.contactSub}</h2>
            </div>
          </Reveal>
          <div className="contact-grid">
            <Reveal delay={0}>
              <form className="contact-form" onSubmit={e => e.preventDefault()}>
                <input className="form-input" type="text" placeholder={txt.contactForm.name} />
                <input className="form-input" type="email" placeholder={txt.contactForm.email} />
                <textarea className="form-input" placeholder={txt.contactForm.message} />
                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "16px" }}>
                  {txt.contactForm.send}
                </button>
              </form>
            </Reveal>
            <Reveal delay={150}>
              <div className="contact-info-cards">
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    text: txt.contactInfo[0],
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    text: txt.contactInfo[1],
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.76 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.68 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    text: txt.contactInfo[2],
                  },
                ].map((item, i) => (
                  <div className="info-card" key={i}>
                    <div className="info-icon">{item.icon}</div>
                    <div className="info-text">{item.text}</div>
                  </div>
                ))}
                {/* MAP PLACEHOLDER */}
                <div style={{
                  borderRadius: 16, overflow: "hidden",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  height: 160, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.2)", fontSize: 13, gap: 8,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Podgorica, Crna Gora 🇲🇪
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="logo-icon" style={{ width: 30, height: 30, fontSize: 14, borderRadius: 8 }}>A</div>
          <span className="logo-text" style={{ fontSize: 18 }}>APEX GYM</span>
        </div>
        <div className="footer-text">
          © 2024 Apex Gym · {txt.footerRights}<br />
          {txt.footerDemo}<br />
          {txt.footerMadeBy}: <a className="footer-link" href="https://github.com/anunnaki7" target="_blank" rel="noreferrer">@anunnaki7</a>
          {" · "}
          <a className="footer-link" href="https://nikolalutovac-portfolio.vercel.app/" target="_blank" rel="noreferrer">Portfolio</a>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        className={`back-to-top${showBackToTop ? " visible" : ""}`}
        onClick={scrollToTop}
        aria-label={txt.backToTop}
        title={txt.backToTop}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </div>
  );
}
