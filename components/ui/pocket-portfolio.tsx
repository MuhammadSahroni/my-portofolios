"use client"

// Pocket Portfolio — a minimal, card-stacked one-page portfolio template.
// A pill nav (Info / Work / Contact) folds each card open and shut, the intro
// card carries a drawn portrait, a live local clock and a bilingual bio, a
// client marquee scrolls underneath, the work card expands each project in
// place, and the contact card copies your email on click.
//
// Stacked like a phone at narrow widths; splits into two columns (sticky info
// on the left, work on the right) when its container is wide. Everything is
// drawn in this file — no fonts, images or packages load unless you pass your
// own portrait / project image URLs.
import * as React from "react"

// ---------------------------------------------------------------- types

export type SectionId = "info" | "work" | "contact"

export type ArtPreset = "phone" | "signage" | "packaging" | "poster" | "type" | "cards"
export type MarkPreset = "orbit" | "wave" | "hash" | "stack" | "spark" | "half"

export interface PocketLabels {
  info: string
  work: string
  contact: string
  services: string
  experience: string
  education?: string
  certifications?: string
  skills?: string
  showAll: string
  showLess: string
  copy: string
  copied: string
  hello: string
  viewCase: string
  year: string
  role: string
}

export interface PocketEducation {
  years: string
  degree: string
  institution: string
  notes?: string
}

export interface PocketCertification {
  title: string
  issuer: string
}

export interface PocketLanguage {
  /** Short code shown in the switcher, e.g. "EN". */
  code: string
  /** BCP-47 tag for the bio paragraph, e.g. "cy". Defaults to the code. */
  lang?: string
  bio: string
  labels?: Partial<PocketLabels>
}

export interface PocketProject {
  title: string
  /** A string, or one per language code: { EN: "...", CY: "..." }. */
  description: string | Record<string, string>
  /** Drawn cover. Ignored when `image` is set. */
  art?: ArtPreset
  /** Your own cover image URL. */
  image?: string
  year?: string
  role?: string
  tags?: string[]
  href?: string
}

export interface PocketClient {
  name: string
  mark?: MarkPreset
}

export interface PocketSocial {
  label: string
  href: string
  handle?: string
}

export interface PocketExperience {
  years: string
  role: string
  org: string
}

export interface PocketPortfolioProps {
  name?: string
  role?: string
  education?: string
  educationList?: PocketEducation[]
  coreSkills?: string[]
  certifications?: (string | PocketCertification)[]
  handle?: string
  email?: string
  LinkedIn?: string
  location?: string
  /** IANA zone for the live clock. */
  timeZone?: string
  languages?: PocketLanguage[]
  defaultLanguage?: string
  /** Portrait URL. Omit for the drawn portrait. */
  portrait?: string
  portraitAlt?: string
  projects?: PocketProject[]
  clients?: PocketClient[]
  socials?: PocketSocial[]
  services?: string[]
  experience?: PocketExperience[]
  /** Status line on the contact card. `null` hides it. */
  availability?: string | null
  accent?: string
  accentForeground?: string
  theme?: "auto" | "light" | "dark"
  /** "auto" splits into two columns on wide containers. */
  layout?: "auto" | "stack"
  defaultOpen?: SectionId[]
  /** Projects shown while the Work card is folded. */
  collapsedProjects?: number
  /** Seconds for one loop of the client marquee. */
  marqueeSeconds?: number
  minHeight?: string
  className?: string
  style?: React.CSSProperties
}

// ---------------------------------------------------------------- defaults

const DEFAULT_LABELS: PocketLabels = {
  info: "Profil",
  work: "Proyek",
  contact: "Kontak",
  services: "Keahlian Utama",
  experience: "Pengalaman Kerja",
  education: "Pendidikan",
  certifications: "Sertifikasi & Penghargaan",
  skills: "Core Skills",
  showAll: "Semua proyek",
  showLess: "Lebih sedikit",
  copy: "Salin email",
  copied: "Tersalin",
  hello: "Kirim pesan",
  viewCase: "Lihat detail",
  year: "Tahun",
  role: "Peran",
}

const DEFAULT_LANGUAGES: PocketLanguage[] = [
  {
    code: "ID",
    lang: "id",
    bio: "Lulusan Manajemen (Universitas Singaperbangsa Karawang) dengan minat kuat di bidang Data Analytics, Teknologi, dan Operasional Manufaktur, dengan pengalaman di bidang Production Planning, Quality Control, dan Data Science. Saat ini bekerja sebagai Production Planner di Hankook Tire Indonesia, mengelola dan memonitor siklus produksi serta mengembangkan solusi berbasis Computer Vision untuk monitoring operasional real-time. Memiliki keahlian dalam Python, SQL, Microsoft Excel, Data Analysis, Data Visualization, dan Machine Learning, dengan pengalaman mengerjakan sentiment analysis ulasan Tokopedia (NLP) dan Computer Vision monitoring kantin.",
    labels: {
      info: "Profil",
      work: "Proyek",
      contact: "Kontak",
      services: "Keahlian Utama",
      experience: "Pengalaman Kerja",
      education: "Pendidikan",
      certifications: "Sertifikasi & Penghargaan",
      skills: "Core Skills",
      showAll: "Semua proyek",
      showLess: "Lebih sedikit",
      copy: "Salin email",
      copied: "Tersalin",
      hello: "Kirim pesan",
      viewCase: "Lihat detail",
      year: "Tahun",
      role: "Peran",
    },
  },
  {
    code: "EN",
    lang: "en",
    bio: "Management graduate (Universitas Singaperbangsa Karawang) with a strong interest in Data Analytics, Technology, and Manufacturing Operations, with hands-on experience in Production Planning, Quality Control, and Data Science. Currently working as a Production Planner at Hankook Tire Indonesia, managing production cycles while developing Computer Vision solutions for real-time operational monitoring. Proficient in Python, SQL, Microsoft Excel, Data Analysis, Data Visualization, and Machine Learning, with NLP sentiment analysis and Computer Vision monitoring projects.",
    labels: {
      info: "Profile",
      work: "Projects",
      contact: "Contact",
      services: "Core Skills",
      experience: "Work Experience",
      education: "Education",
      certifications: "Certifications & Awards",
      skills: "Core Skills",
      showAll: "All projects",
      showLess: "Show less",
      copy: "Copy email",
      copied: "Copied",
      hello: "Say hello",
      viewCase: "View case study",
      year: "Year",
      role: "Role",
    },
  },
]

const DEFAULT_CORE_SKILLS: string[] = [
  "Data Analytics",
  "Python",
  "SQL",
  "Machine Learning",
  "Computer Vision",
  "Production Planning",
  "Next.js",
  "Microsoft Excel",
]

const DEFAULT_EDUCATION: PocketEducation[] = [
  {
    years: "2022 — 2026",
    degree: "Gelar Sarjana, Business Administration and Management",
    institution: "Universitas Singaperbangsa Karawang",
  },
  {
    years: "2024",
    degree: "Business/Office Automation/Technology",
    institution: "Course-Net Indonesia",
  },
  {
    years: "2025",
    degree: "Administrasi Database & Data Modeling",
    institution: "Rakamin Academy",
  },
]

const DEFAULT_CERTIFICATIONS: PocketCertification[] = [
  {
    title: "DATA ANALYSIS: Fullstack Intensive Bootcamp",
    issuer: "Bootcamp Intensive",
  },
  {
    title: "Data Science Course Level Basic",
    issuer: "ITBox Certificate",
  },
  {
    title: "Algoritma Pemrograman C",
    issuer: "ITBox Certificate",
  },
  {
    title: "Database Intermediate Level",
    issuer: "ITBox Certificate",
  },
  {
    title: "Basic Jaringan Komputer",
    issuer: "ITBox Certificate",
  },
  {
    title: "Chief Operating Officer (Manajemen Produksi)",
    issuer: "Honors & Awards",
  },
]

const DEFAULT_PROJECTS: PocketProject[] = [
  {
    title: "Computer Vision Canteen Monitoring",
    art: "phone",
    year: "2026",
    role: "Computer Vision & IoT",
    tags: ["Computer Vision", "Python", "Real-Time Monitoring", "Operations"],
    description: {
      ID: "Pengembangan solusi Computer Vision untuk monitoring jumlah orang secara real-time di area kantin dan fasilitas pabrik guna mendukung efisiensi operasional dan analisis kepadatan.",
      EN: "Computer Vision solution for real-time people counting and operational density monitoring in canteen and factory facilities to optimize operational efficiency.",
    },
  },
  {
    title: "Tokopedia Review Sentiment Analysis",
    art: "signage",
    year: "2025",
    role: "Data Scientist / NLP",
    tags: ["NLP", "Machine Learning", "Python", "Data Visualization"],
    description: {
      ID: "Proyek analisis sentimen ulasan pelanggan e-commerce Tokopedia menggunakan Natural Language Processing (NLP) dan algoritma Machine Learning untuk klasifikasi feedback.",
      EN: "Sentiment analysis pipeline analyzing e-commerce Tokopedia customer reviews using NLP and Machine Learning algorithms to classify customer satisfaction.",
    },
  },
  {
    title: "Hankook Production & Inventory Planning",
    art: "packaging",
    year: "2026",
    role: "Production Planner",
    tags: ["Production Planning", "Inventory", "Supply Control", "Excel"],
    description: {
      ID: "Pengelolaan dan monitoring production cycle, penjadwalan produksi tepat waktu, serta kontrol ketersediaan material untuk mencegah hambatan operasional di Hankook Tire.",
      EN: "Production cycle management, on-time production scheduling, and raw material inventory planning to prevent operational bottlenecks at Hankook Tire.",
    },
  },
  {
    title: "Loan Approval Credit Risk Modeling",
    art: "cards",
    year: "2025",
    role: "Data Scientist Intern",
    tags: ["Data Science", "SQL", "Machine Learning", "Financial Analytics"],
    description: {
      ID: "Eksplorasi data, query SQL, feature engineering, dan pemodelan prediktif Machine Learning untuk klasifikasi risiko kredit pada program Virtual Internship id/x partners.",
      EN: "Exploratory data analysis, SQL querying, feature engineering, and predictive ML modeling for credit risk classification at id/x partners.",
    },
  },
]

const DEFAULT_CLIENTS: PocketClient[] = [
  { name: "Hankook Tire", mark: "orbit" },
  { name: "BYD Indonesia", mark: "wave" },
  { name: "UNSIKA", mark: "spark" },
  { name: "id/x partners", mark: "stack" },
  { name: "Rakamin Academy", mark: "hash" },
  { name: "Course-Net", mark: "half" },
]

const DEFAULT_SOCIALS: PocketSocial[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-sahroni", handle: "in/muhammad-sahroni" },
  { label: "Email", href: "mailto:muhammadsahroni2304@gmail.com", handle: "muhammadsahroni2304@gmail.com" },
]

const DEFAULT_SERVICES = [
  "Data Analytics & Modeling",
  "Python & SQL Querying",
  "Machine Learning & NLP",
  "Computer Vision Monitoring",
  "Production Planning & Inventory Control",
  "Quality Control & Inspection",
  "Next.js & Web Applications",
  "Back-end Operations & JSON",
  "Microsoft Excel & Data Visualization",
]

const DEFAULT_EXPERIENCE: PocketExperience[] = [
  { years: "2026 — Now", role: "Staff Production Planner", org: "Hankook Tire Indonesia" },
  { years: "2026", role: "Checker & Cleaner (Roof & Body)", org: "BYD Indonesia" },
  { years: "2025", role: "Project-Based Data Scientist", org: "id/x partners x Rakamin Academy" },
  { years: "2022 — 23", role: "Operator", org: "PT Chandra Nugerahcipta (CNC Group)" },
]

// #region logic
/** "13:55:19" in the given zone; falls back to local time if the zone is unknown. */
function formatClock(date: Date, timeZone: string | undefined, hour12: boolean): string {
  const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12 }
  let out: string
  try {
    out = new Intl.DateTimeFormat("en-GB", { ...opts, timeZone }).format(date)
  } catch {
    out = new Intl.DateTimeFormat("en-GB", opts).format(date)
  }
  return out.replace(/\s?(am|pm)$/i, (m) => " " + m.trim().toUpperCase())
}

/** Pick the text for a language code from a string or a per-language record. */
function pickText(value: string | Record<string, string>, code: string): string {
  if (typeof value === "string") return value
  if (value[code] != null) return value[code]
  const first = Object.keys(value)[0]
  return first ? value[first] : ""
}

/** The projects to render: every one when open, else the first `collapsed` (at least one). */
function visibleProjects<T>(projects: T[], open: boolean, collapsed: number): T[] {
  if (open) return projects
  const n = Math.max(1, Math.floor(Number.isFinite(collapsed) ? collapsed : 2))
  return projects.slice(0, n)
}

/** Toggle a section in the open list, keeping nav order. */
function toggleSection(open: SectionId[], id: SectionId): SectionId[] {
  const order: SectionId[] = ["info", "work", "contact"]
  const next = open.includes(id) ? open.filter((s) => s !== id) : [...open, id]
  return order.filter((s) => next.includes(s))
}
// #endregion logic

// ---------------------------------------------------------------- styles

const PPF_CSS = `
.ppf-root{--ppf-page:#e7e7e7;--ppf-card:#ffffff;--ppf-inner:#f1f1f1;--ppf-ink:#0f0f0f;--ppf-soft:#8c8c8c;--ppf-line:rgba(0,0,0,.08);--ppf-pill:#efefef;--ppf-pill-hover:#e4e4e4;
  width:100%;box-sizing:border-box;background:var(--ppf-page);color:var(--ppf-ink);container-type:inline-size;overflow-x:clip;
  font-family:"Inter","Neue Haas Grotesk Text","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif;-webkit-font-smoothing:antialiased;letter-spacing:-.01em;line-height:1.3}
.ppf-root[data-theme="dark"]{--ppf-page:#0c0c0c;--ppf-card:#181818;--ppf-inner:#212121;--ppf-ink:#f3f3f3;--ppf-soft:#8f8f8f;--ppf-line:rgba(255,255,255,.08);--ppf-pill:#262626;--ppf-pill-hover:#303030}
:where(.dark) .ppf-root[data-theme="auto"]{--ppf-page:#0c0c0c;--ppf-card:#181818;--ppf-inner:#212121;--ppf-ink:#f3f3f3;--ppf-soft:#8f8f8f;--ppf-line:rgba(255,255,255,.08);--ppf-pill:#262626;--ppf-pill-hover:#303030}
.ppf-root *,.ppf-root *::before,.ppf-root *::after{box-sizing:border-box}
.ppf-root :where(svg,img){max-width:none;display:block}
.ppf-root :where(button){font:inherit;color:inherit;letter-spacing:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit}
.ppf-root :where(a){color:inherit;text-decoration:none}
.ppf-root :focus-visible{outline:2px solid var(--ppf-accent);outline-offset:2px}
.ppf-shell{margin:0 auto;max-width:460px;padding:16px 12px 24px;display:flex;flex-direction:column;gap:8px}
.ppf-col{display:contents}
.ppf-card{background:var(--ppf-card);border-radius:22px;padding:12px;position:relative;animation:ppf-in .7s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes ppf-in{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}

.ppf-nav{order:1;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 7px 7px 14px;border-radius:999px;position:sticky;top:8px;z-index:5;box-shadow:0 1px 0 var(--ppf-line)}
.ppf-logo{width:22px;height:22px;flex:none;transition:transform .6s cubic-bezier(.3,1.6,.5,1)}
.ppf-logo:hover,.ppf-logo:focus-visible{transform:rotate(180deg)}
.ppf-pills{display:flex;gap:5px}
.ppf-pill{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 7px 0 12px;border-radius:999px;background:var(--ppf-pill);font-size:16px;white-space:nowrap;transition:background-color .25s,color .25s,transform .2s}
.ppf-pill:hover{background:var(--ppf-pill-hover)}
.ppf-pill:active{transform:scale(.96)}
.ppf-pill[aria-expanded="true"]{background:var(--ppf-accent);color:var(--ppf-accent-ink)}
.ppf-pm{width:18px;height:18px;flex:none}
.ppf-pm-v{transform-origin:9px 9px;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
.ppf-root [aria-expanded="true"] .ppf-pm-v{transform:rotate(90deg) scaleX(0)}

.ppf-fold{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.8,.2,1)}
.ppf-fold.is-open{grid-template-rows:1fr}
.ppf-fold>div{min-height:0;overflow:hidden}
.ppf-fold>div>*{transition:opacity .35s,transform .45s cubic-bezier(.2,.8,.2,1);opacity:0;transform:translateY(8px)}
.ppf-fold.is-open>div>*{opacity:1;transform:none;transition-delay:.08s}

.ppf-info{order:2;scroll-margin-top:64px}
.ppf-top{display:flex;gap:14px;align-items:flex-start}
.ppf-portrait{width:116px;height:116px;flex:none;border-radius:14px;overflow:hidden;background:var(--ppf-inner);position:relative;display:flex;align-items:center;justify-content:center}
.ppf-portrait svg,.ppf-portrait img{width:100% !important;height:100% !important;max-width:100% !important;max-height:100% !important;object-fit:cover;display:block}
.ppf-profile-side{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.ppf-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;min-width:0}
.ppf-langs{display:flex;gap:6px}
.ppf-lang{color:var(--ppf-soft);font-weight:600;font-size:11px;transition:color .2s}
.ppf-lang:hover{color:var(--ppf-ink)}
.ppf-lang[aria-pressed="true"]{color:var(--ppf-ink);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px}
.ppf-clock{font-variant-numeric:tabular-nums;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.ppf-clock small{font-size:10px;color:var(--ppf-soft);opacity:0;transform:translateY(-3px);transition:opacity .25s,transform .25s}
.ppf-clock:hover small,.ppf-clock:focus-visible small{opacity:1;transform:none}

.ppf-profile-header{display:flex;flex-direction:column;gap:1.5px;margin-top:2px}
.ppf-profile-name{font-size:18px;font-weight:700;line-height:1.2;letter-spacing:-.03em;color:var(--ppf-ink);margin:0}
.ppf-profile-role{font-size:11px;font-weight:500;color:var(--ppf-soft);line-height:1.25}
.ppf-profile-edu{display:inline-flex;align-items:center;gap:4.5px;font-size:11px;color:var(--ppf-soft);line-height:1.25;margin-top:2px;font-weight:450}
.ppf-profile-edu svg{width:13px;height:13px;flex-shrink:0;stroke-width:1.9;opacity:.85}

.ppf-profile-skills{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}
.ppf-profile-skill{display:inline-flex;align-items:center;font-size:10px;font-weight:500;padding:2px 7px;border-radius:999px;background:var(--ppf-inner);color:var(--ppf-ink);border:1px solid var(--ppf-line);transition:background-color .2s,color .2s,border-color .2s;white-space:nowrap}
.ppf-profile-skill:hover{background:var(--ppf-accent);color:var(--ppf-accent-ink);border-color:transparent}

.ppf-bio{font-size:15px;line-height:1.35;letter-spacing:-.015em;margin:14px 2px 4px;text-wrap:pretty;font-weight:450}
.ppf-bio span{display:inline-block;animation:ppf-word .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--w) * 14ms)}
@keyframes ppf-word{from{opacity:0;transform:translateY(6px);filter:blur(3px)}to{opacity:1;transform:none;filter:none}}
.ppf-sub{margin:20px 2px 2px;display:grid;gap:18px}
.ppf-h{font-size:11px;color:var(--ppf-soft);margin:0 0 8px;font-weight:500;letter-spacing:0}
.ppf-chips{display:flex;flex-wrap:wrap;gap:5px}
.ppf-chip{font-size:12px;padding:5px 10px;border-radius:999px;background:var(--ppf-inner);transition:background-color .2s,color .2s}
.ppf-chip:hover{background:var(--ppf-accent);color:var(--ppf-accent-ink)}
.ppf-xp{list-style:none;margin:0;padding:0;font-size:12px}
.ppf-xp li{display:grid;grid-template-columns:84px 1fr auto;gap:8px;padding:7px 0;border-top:1px solid var(--ppf-line)}
.ppf-xp li span:first-child,.ppf-xp li span:last-child{color:var(--ppf-soft)}

.ppf-clients{order:3;padding:0;overflow:hidden;height:52px;display:flex;align-items:center;-webkit-mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.ppf-track{display:flex;width:max-content;animation:ppf-marquee var(--ppf-mq,24s) linear infinite}
.ppf-clients:hover .ppf-track{animation-play-state:paused}
@keyframes ppf-marquee{to{transform:translateX(-50%)}}
.ppf-client{display:inline-flex;align-items:center;gap:6px;padding:0 14px;font-size:17px;font-weight:700;letter-spacing:-.045em;white-space:nowrap;color:var(--ppf-ink);opacity:.9;transition:opacity .25s,color .25s}
.ppf-clients:hover .ppf-client{opacity:.35}
.ppf-clients .ppf-client:hover{opacity:1;color:var(--ppf-accent)}
.ppf-client svg{width:20px;height:20px;flex:none}

.ppf-work{order:4;padding:6px;scroll-margin-top:64px}
.ppf-list{display:flex;flex-direction:column;gap:6px}
.ppf-item{background:var(--ppf-inner);border-radius:16px;transition:background-color .3s}
.ppf-row{display:flex;gap:12px;width:100%;padding:10px;align-items:flex-start;border-radius:16px}
.ppf-thumb{width:96px;height:96px;flex:none;border-radius:10px;overflow:hidden;position:relative;transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.ppf-thumb svg,.ppf-thumb img,.ppf-hero svg,.ppf-hero img{width:100%;height:100%;object-fit:cover}
.ppf-row:hover .ppf-thumb{transform:scale(1.04) rotate(-1.5deg)}
.ppf-row-t{flex:1;min-width:0;padding-top:4px;display:flex;flex-direction:column;gap:14px}
.ppf-title{font-size:12px;display:flex;justify-content:space-between;gap:8px;align-items:center}
.ppf-arrow{width:14px;height:14px;opacity:0;transform:translateX(-4px);transition:opacity .25s,transform .35s}
.ppf-row:hover .ppf-arrow,.ppf-row:focus-visible .ppf-arrow,.ppf-row[aria-expanded="true"] .ppf-arrow{opacity:1;transform:none}
.ppf-row[aria-expanded="true"] .ppf-arrow{transform:rotate(90deg)}
.ppf-desc{font-size:11px;line-height:1.35;color:var(--ppf-soft);margin:0}
.ppf-detail{padding:0 10px 10px}
.ppf-hero{aspect-ratio:16/10;border-radius:12px;overflow:hidden;width:100%}
.ppf-facts{display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px;margin:10px 2px 8px}
.ppf-facts dt{color:var(--ppf-soft)}
.ppf-facts dd{margin:2px 0 0}
.ppf-detail-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.ppf-cta{display:inline-flex;align-items:center;gap:6px;font-size:12px;height:30px;padding:0 12px;border-radius:999px;background:var(--ppf-ink);color:var(--ppf-card);transition:background-color .25s,color .25s}
.ppf-cta:hover{background:var(--ppf-accent);color:var(--ppf-accent-ink)}
.ppf-more{margin:6px auto 2px;display:flex;align-items:center;gap:6px;font-size:12px;padding:7px 12px;border-radius:999px;color:var(--ppf-soft);transition:color .2s,background-color .2s}
.ppf-more:hover{color:var(--ppf-ink);background:var(--ppf-inner)}

.ppf-contact{order:5;min-height:96px;display:flex;flex-direction:column;justify-content:space-between;padding:14px;scroll-margin-top:64px}
.ppf-avail{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ppf-soft)}
.ppf-dot{width:7px;height:7px;border-radius:50%;background:#2fd06f;position:relative}
.ppf-dot::after{content:"";position:absolute;inset:0;border-radius:50%;background:inherit;animation:ppf-ping 2s cubic-bezier(0,0,.2,1) infinite}
@keyframes ppf-ping{75%,100%{transform:scale(2.6);opacity:0}}
.ppf-id{font-size:12px;color:var(--ppf-soft);margin-top:28px;display:flex;flex-direction:column;align-items:flex-start}
.ppf-email{position:relative;transition:color .2s}
.ppf-email:hover{color:var(--ppf-ink)}
.ppf-toast{position:absolute;left:calc(100% + 8px);top:50%;font-size:10px;padding:2px 7px;border-radius:999px;background:var(--ppf-accent);color:var(--ppf-accent-ink);white-space:nowrap;transform:translateY(-50%) scale(.6);opacity:0;transition:opacity .2s,transform .3s cubic-bezier(.3,1.6,.5,1);pointer-events:none}
.ppf-toast.is-on{opacity:1;transform:translateY(-50%) scale(1)}
.ppf-socials{list-style:none;margin:16px 0 0;padding:0;font-size:13px}
.ppf-socials a{display:grid;grid-template-columns:1fr auto 14px;gap:10px;align-items:center;padding:9px 0;border-top:1px solid var(--ppf-line);transition:padding .3s cubic-bezier(.2,.8,.2,1)}
.ppf-socials a:hover{padding-left:6px}
.ppf-socials a span:nth-child(2){color:var(--ppf-soft);font-size:11px}
.ppf-socials svg{width:14px;height:14px;transition:transform .3s}
.ppf-socials a:hover svg{transform:translate(2px,-2px)}
.ppf-actions{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap}
.ppf-ghost{display:inline-flex;align-items:center;font-size:12px;height:30px;padding:0 12px;border-radius:999px;background:var(--ppf-pill);transition:background-color .2s}
.ppf-ghost:hover{background:var(--ppf-pill-hover)}
.ppf-copy{font-size:10px;color:var(--ppf-soft);position:absolute;right:14px;bottom:14px}

.ppf-eyes{animation:ppf-blink 5.5s infinite;transform-origin:60px 52px}
@keyframes ppf-blink{0%,94%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
.ppf-pupils{transition:transform .25s ease-out}
.ppf-glint{transform:translateX(-40px);transition:transform 0s}
.ppf-portrait:hover .ppf-glint{transform:translateX(40px);transition:transform .8s ease}

.ppf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

@container (max-width:420px){
  .ppf-nav{padding-left:12px}
  .ppf-pills{gap:4px}
  .ppf-pill{font-size:14px;height:30px;padding:0 6px 0 10px;gap:5px}
  .ppf-pm{width:16px;height:16px}
  .ppf-top{gap:10px}
  .ppf-portrait{width:90px;height:90px;border-radius:12px}
  .ppf-profile-name{font-size:16px}
  .ppf-profile-role{font-size:10.5px}
  .ppf-profile-edu{font-size:10px}
  .ppf-profile-skill{font-size:9.5px;padding:1.5px 5px}
  .ppf-bio{font-size:14px}
  .ppf-thumb{width:84px;height:84px}
}
@container (max-width:350px){
  .ppf-top{flex-direction:column;align-items:center;text-align:center;gap:10px}
  .ppf-profile-side{width:100%}
  .ppf-portrait{width:96px;height:96px}
  .ppf-meta{justify-content:center;gap:16px}
  .ppf-profile-header{align-items:center}
  .ppf-profile-skills{justify-content:center}
}
@container (min-width:880px){
  .ppf-root[data-layout="auto"] .ppf-shell{max-width:1080px;flex-direction:row;align-items:flex-start;gap:8px;padding:20px}
  .ppf-root[data-layout="auto"] .ppf-col{display:flex;flex-direction:column;gap:8px;flex:1;min-width:0}
  .ppf-root[data-layout="auto"] .ppf-col-a{position:sticky;top:20px;flex:0 0 420px}
  .ppf-root[data-layout="auto"] .ppf-nav{position:relative;top:0}
  .ppf-root[data-layout="auto"] .ppf-work .ppf-thumb{width:128px;height:128px}
  .ppf-root[data-layout="auto"] .ppf-desc{font-size:12px}
  .ppf-root[data-layout="auto"] .ppf-title{font-size:14px}
}

@media (prefers-reduced-motion:reduce){
  .ppf-root *,.ppf-root *::before,.ppf-root *::after{animation:none !important;transition-duration:0s !important;transition-delay:0s !important}
  .ppf-clients{overflow-x:auto}
}
`

// ---------------------------------------------------------------- icons

function PlusMinus() {
  return (
    <svg className="ppf-pm" viewBox="0 0 18 18" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
      <circle cx="9" cy="9" r="8.2" />
      <path d="M5 9h8" strokeLinecap="round" />
      <path className="ppf-pm-v" d="M9 5v8" strokeLinecap="round" />
    </svg>
  )
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10 10 4M5 4h5v5" />
    </svg>
  )
}

function GradCap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function LogoMark() {
  // A little figure: a head, open arms, a stride.
  return (
    <svg className="ppf-logo" viewBox="0 0 22 22" width={22} height={22} fill="currentColor" aria-hidden="true">
      <circle cx="11" cy="4" r="2.8" />
      <rect x="2" y="9" width="18" height="2.8" rx="1.4" />
      <path d="M9.6 12.6h2.8L6.6 20.4a1.5 1.5 0 0 1-2.4-1.8zM12.4 12.6H9.6l5.8 7.8a1.5 1.5 0 0 0 2.4-1.8z" />
    </svg>
  )
}

function ClientMark({ mark }: { mark: MarkPreset }) {
  const common = { viewBox: "0 0 20 20", width: 20, height: 20, "aria-hidden": true as const }
  switch (mark) {
    case "orbit":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2.6}>
          <circle cx="10" cy="10" r="6.6" />
          <circle cx="16" cy="4" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case "wave":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
          <path d="M2 6.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0" />
          <path d="M2 13.5c2.7-2.6 5.3-2.6 8 0s5.3 2.6 8 0" />
        </svg>
      )
    case "hash":
      return (
        <svg {...common} fill="currentColor">
          <rect x="6" y="1.5" width="3" height="17" rx="1.5" />
          <rect x="11" y="1.5" width="3" height="17" rx="1.5" />
          <rect x="1.5" y="6" width="17" height="3" rx="1.5" />
          <rect x="1.5" y="11" width="17" height="3" rx="1.5" />
        </svg>
      )
    case "stack":
      return (
        <svg {...common} fill="currentColor">
          <path d="M10 1.5 18.5 6 10 10.5 1.5 6z" />
          <path d="m3.4 9.6 6.6 3.5 6.6-3.5 1.9 1-8.5 4.5-8.5-4.5z" opacity=".75" />
          <path d="m3.4 13.1 6.6 3.5 6.6-3.5 1.9 1-8.5 4.5-8.5-4.5z" opacity=".5" />
        </svg>
      )
    case "spark":
      return (
        <svg {...common} fill="currentColor">
          <path d="M10 .8c.6 5 2.2 7.2 9.2 9.2-7 2-8.6 4.2-9.2 9.2-.6-5-2.2-7.2-9.2-9.2C7.8 8 9.4 5.8 10 .8z" />
        </svg>
      )
    case "half":
    default:
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth={2.2} />
          <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
        </svg>
      )
  }
}

const MARKS: MarkPreset[] = ["orbit", "wave", "hash", "stack", "spark", "half"]

// ---------------------------------------------------------------- drawn portrait

function DrawnPortrait({ uid, look }: { uid: string; look: { x: number; y: number } }) {
  const bg = uid + "-pbg"
  const lens = uid + "-lens"
  return (
    <svg viewBox="0 0 120 120" width={120} height={120} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5efe6" />
          <stop offset="1" stopColor="#ded5c4" />
        </linearGradient>
        <clipPath id={lens}>
          <rect x="42.5" y="45" width="16" height="14" rx="6.5" />
          <rect x="61.5" y="45" width="16" height="14" rx="6.5" />
        </clipPath>
      </defs>
      <rect width="120" height="120" fill={"url(#" + bg + ")"} />
      <g transform="translate(-18 -6) scale(1.3)">
        {/* body & clothing: beige knit vest over white shirt */}
        <path d="M4 120c2-20 22-30 56-31 34 1 54 11 56 31z" fill="#cfbea5" />
        {/* white collared shirt visible in neck & collar */}
        <path d="M48 76v16l12 12 12-12V76z" fill="#ffffff" />
        {/* vest V-neck opening border */}
        <path d="M46 88l14 14 14-14" fill="none" stroke="#ba9f83" strokeWidth={2.4} strokeLinecap="round" />
        {/* white shirt collar wings */}
        <polygon points="43,80 54,90 51,77" fill="#ffffff" stroke="#d5d0c7" strokeWidth={0.9} />
        <polygon points="77,80 66,90 69,77" fill="#ffffff" stroke="#d5d0c7" strokeWidth={0.9} />
        
        {/* neck */}
        <path d="M49 71v14c6 4.5 16 4.5 22 0V71z" fill="#cbb39e" />
        
        {/* ears */}
        <ellipse cx="38" cy="56" rx="3.8" ry="6.2" fill="#cbb39e" />
        <ellipse cx="82" cy="56" rx="3.8" ry="6.2" fill="#cbb39e" />

        {/* face - clean shaven, smooth jawline */}
        <path d="M38.5 51c0-14 9.6-26 21.5-26s21.5 12 21.5 26c0 14-8.5 26.5-21.5 32.5-13-6-21.5-18.5-21.5-32.5z" fill="#ddc7b3" />
        <path d="M40.5 54c1.5 10 5.5 17 19.5 25 14-8 18-15 19.5-25" fill="none" stroke="#caa991" strokeWidth={1.3} opacity={0.4} />

        {/* hair base & back volume */}
        <path d="M36.5 52c-1.5-18 8-32 23.5-32 17 0 26 12 24 32-3-11-8-16-12-17-5 2-17 3-23 0-4 3-8 9.5-12.5 17z" fill="#1f1a16" />
        {/* stylish voluminous swept-back hair with wave */}
        <path d="M35 44c0-17 10-27 25-27 15 0 26 9 24 22-3-13-14-18-25-16-9 1.5-17 9-20 21h-4z" fill="#2c241e" />
        <path d="M40 26c9-9 28-7 38 6-7-5.5-23-6.5-31 0-3 2.5-5.5 0-7-6z" fill="#3a3128" />
        <path d="M36 38c3-6 9-11 16-13-5 3-8 7-9 12-3 2-5.5 2.5-7 1z" fill="#2c241e" />

        {/* nose */}
        <path d="M60 51.5q-1 7.5-3 9 3 1.8 6 0" fill="none" stroke="#997d66" strokeWidth={1.2} strokeLinecap="round" />

        {/* clean mouth & gentle smile (NO beard, NO mustache) */}
        <path d="M53.5 70.5q6.5 3.5 13 0" fill="none" stroke="#5a3d2e" strokeWidth={1.6} strokeLinecap="round" />
        <path d="M56.5 73.5q3.5 1.4 7 0" fill="none" stroke="#b08d75" strokeWidth={1.2} strokeLinecap="round" opacity={0.7} />

        {/* brows */}
        <path d="M43.5 44.5q5.5-2.8 11.5-.2M65 44.3q6-2.6 11.5.2" fill="none" stroke="#221c17" strokeWidth={2.2} strokeLinecap="round" />

        {/* eyes - interactive pupils following cursor */}
        <g className="ppf-eyes">
          <ellipse cx="50.5" cy="51.5" rx="3.2" ry="2.2" fill="#fafafa" />
          <ellipse cx="69.5" cy="51.5" rx="3.2" ry="2.2" fill="#fafafa" />
          <g className="ppf-pupils" style={{ transform: "translate(" + look.x.toFixed(2) + "px," + look.y.toFixed(2) + "px)" }}>
            <circle cx="50.5" cy="51.5" r="1.6" fill="#1c1612" />
            <circle cx="69.5" cy="51.5" r="1.6" fill="#1c1612" />
            <circle cx="51.1" cy="51" r="0.5" fill="#ffffff" />
            <circle cx="70.1" cy="51" r="0.5" fill="#ffffff" />
          </g>
        </g>

        {/* glasses - rounded dark frames like in photo */}
        <g fill="rgba(255,255,255,.12)" stroke="#1a1816" strokeWidth={1.35}>
          <rect x="42.5" y="45" width="16" height="14" rx="6.5" />
          <rect x="61.5" y="45" width="16" height="14" rx="6.5" />
        </g>
        {/* bridge & temples */}
        <path d="M58.5 49.5q1.5-1.8 3 0" fill="none" stroke="#1a1816" strokeWidth={1.35} />
        <path d="M42.5 49.5l-4.5 1.5M77.5 49.5l4.5 1.5" fill="none" stroke="#1a1816" strokeWidth={1.2} />

        {/* glasses glare glint */}
        <g clipPath={"url(#" + lens + ")"}>
          <path className="ppf-glint" d="M40 64 52 40h4L44 64z" fill="rgba(255,255,255,.7)" />
        </g>
      </g>
    </svg>
  )
}

// ---------------------------------------------------------------- drawn project covers

const ICON_COLORS = ["#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec", "#3a86ff", "#fb5607", "#ffbe0b", "#2ec4b6", "#e0e0e0", "#ff006e", "#8ac926", "#1982c4", "#6a4c93", "#f4a261"]

function ProjectArt({ preset, accent, uid, label }: { preset: ArtPreset; accent: string; uid: string; label: string }) {
  const word = (label.split(/\s+/)[0] || "Work").toUpperCase().slice(0, 8)
  const g = uid + "-g"
  const box = { viewBox: "0 0 160 160", preserveAspectRatio: "xMidYMid slice", width: 160, height: 160, "aria-hidden": true as const }
  switch (preset) {
    case "phone":
      return (
        <svg {...box}>
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3b2a55" />
              <stop offset="1" stopColor="#0d0d16" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill={accent} />
          <circle cx="20" cy="140" r="46" fill="#fff" opacity=".18" />
          <rect x="36" y="12" width="130" height="250" rx="24" fill="#0e0e0e" />
          <rect x="37.5" y="13.5" width="127" height="247" rx="22.5" fill="none" stroke="#5a5a5a" strokeWidth="1" />
          <rect x="42" y="18" width="118" height="238" rx="19" fill={"url(#" + g + ")"} />
          <rect x="84" y="24" width="36" height="11" rx="5.5" fill="#000" />
          <text x="54" y="33" fontSize="7" fontWeight="700" fill="#fff" fontFamily="system-ui,sans-serif">9:41</text>
          {Array.from({ length: 16 }, (_, i) => {
            const c = i % 4
            const r = Math.floor(i / 4)
            return <rect key={i} x={50 + c * 26} y={46 + r * 28} width="19" height="19" rx="5.5" fill={ICON_COLORS[i]} />
          })}
          <rect x="55" y="54" width="9" height="3" rx="1.5" fill="#fff" opacity=".85" />
          <circle cx="85.5" cy="55.5" r="4" fill="#fff" opacity=".9" />
          <text x="104" y="60" fontSize="9" fontWeight="700" fill="#111" fontFamily="system-ui,sans-serif">6</text>
        </svg>
      )
    case "signage":
      return (
        <svg {...box}>
          <defs>
            <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fb7ae" />
              <stop offset="1" stopColor="#2f5c57" />
            </linearGradient>
          </defs>
          <rect width="160" height="160" fill={"url(#" + g + ")"} />
          <g stroke="#dff1ec" strokeOpacity=".45" strokeWidth="1.2">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={"v" + i} d={"M" + (i * 20 + 4) + " 0v90"} />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
              <path key={"h" + i} d={"M0 " + (i * 16 + 6) + "h160"} />
            ))}
          </g>
          <path d="M0 58 160 92v68H0z" fill="#ecebe6" />
          <path d="M0 58 160 92v6L0 64z" fill="#c9c8c2" />
          <path d="M0 132 160 150v10H0z" fill="#d7d6d0" />
          <rect x="30" y="76" width="18" height="60" fill="#1a1a1a" />
          <text x="0" y="0" transform="translate(43.5 128) rotate(-90)" fontSize="11" fontWeight="800" fill="#fff" fontFamily="system-ui,sans-serif" letterSpacing="1">B2B</text>
          <g transform="translate(66 74) skewY(12)">
            <rect width="58" height="54" rx="2" fill="#e2412d" />
            <path d="M14 12h30v9H24v22h-10z" fill="#fff" />
            <path d="M28 25h16v18H28z" fill="#fff" />
          </g>
        </svg>
      )
    case "packaging":
      return (
        <svg {...box}>
          <rect width="160" height="160" fill="#e9dfcf" />
          <ellipse cx="80" cy="140" rx="54" ry="8" fill="#000" opacity=".12" />
          <path d="M80 28 132 54 80 80 28 54z" fill="#f8f3ea" />
          <path d="M28 54 80 80v58L28 112z" fill="#d8c6aa" />
          <path d="M80 80 132 54v58L80 138z" fill="#c7ad89" />
          <path d="M80 96 132 70v14L80 110z" fill={accent} />
          <circle cx="54" cy="92" r="9" fill="none" stroke="#6b5a42" strokeWidth="1.6" />
          <path d="M49 92h10M54 87v10" stroke="#6b5a42" strokeWidth="1.4" />
          <path d="M40 106l28 14M40 112l20 10" stroke="#6b5a42" strokeWidth="1.2" opacity=".6" />
          <path d="M80 28 132 54" stroke="#fff" strokeWidth="1" opacity=".8" />
        </svg>
      )
    case "poster":
      return (
        <svg {...box}>
          <rect width="160" height="160" fill="#141414" />
          <circle cx="104" cy="58" r="42" fill={accent} />
          <path d="M62 66c14-8 28 8 42 0s28 8 42 0v94H62z" fill="#141414" />
          <path d="M62 78c14-8 28 8 42 0s28 8 42 0" fill="none" stroke={accent} strokeWidth="2" opacity=".6" />
          <text x="12" y="132" fontSize={Math.min(36, 190 / Math.max(1, word.length))} fontWeight="800" fill="#f2f2f2" fontFamily="system-ui,sans-serif" letterSpacing="-2">{word}</text>
          <text x="13" y="148" fontSize="7" fill="#9b9b9b" fontFamily="system-ui,sans-serif" letterSpacing="1.5">12—14 JUL · LIVE</text>
          <text x="13" y="22" fontSize="7" fill="#9b9b9b" fontFamily="system-ui,sans-serif" letterSpacing="1.5">VOL. 04</text>
        </svg>
      )
    case "type":
      return (
        <svg {...box}>
          <rect width="160" height="160" fill="#f0eee7" />
          <g stroke="#111" strokeOpacity=".08">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={"M0 " + (i * 20 + 10) + "h160M" + (i * 20 + 10) + " 0v160"} />
            ))}
          </g>
          <path d="M0 108h160M0 58h160" stroke={accent} strokeWidth="1" />
          <text x="10" y="108" fontSize="84" fontWeight="700" fill="#111" fontFamily="system-ui,sans-serif" letterSpacing="-5">Aa</text>
          <circle cx="138" cy="30" r="8" fill={accent} />
          <text x="11" y="140" fontSize="8" fill="#555" fontFamily="system-ui,sans-serif">{label.slice(0, 28)}</text>
        </svg>
      )
    case "cards":
    default:
      return (
        <svg {...box}>
          <rect width="160" height="160" fill="#2a2a2a" />
          <g transform="rotate(-14 80 80)">
            <rect x="26" y="52" width="98" height="58" rx="4" fill={accent} />
          </g>
          <g transform="rotate(6 80 80)">
            <rect x="34" y="56" width="98" height="58" rx="4" fill="#f5f5f5" />
            <rect x="44" y="66" width="30" height="5" rx="2.5" fill="#111" />
            <rect x="44" y="96" width="50" height="3" rx="1.5" fill="#999" />
            <rect x="44" y="102" width="36" height="3" rx="1.5" fill="#bbb" />
            <circle cx="118" cy="70" r="5" fill={accent} />
          </g>
        </svg>
      )
  }
}

const ART: ArtPreset[] = ["phone", "signage", "packaging", "poster", "type", "cards"]

function Cover({ project, index, accent, uid }: { project: PocketProject; index: number; accent: string; uid: string }) {
  if (project.image) {
    return <img src={project.image} alt="" width={160} height={160} loading="lazy" decoding="async" style={{ maxWidth: "none" }} />
  }
  return <ProjectArt preset={project.art ?? ART[index % ART.length]} accent={accent} uid={uid} label={project.title} />
}

// ---------------------------------------------------------------- component

function useInert(ref: React.RefObject<HTMLElement | null>, inert: boolean) {
  React.useEffect(() => {
    const el = ref.current as (HTMLElement & { inert?: boolean }) | null
    if (!el) return
    el.inert = inert
    if (inert) el.setAttribute("aria-hidden", "true")
    else el.removeAttribute("aria-hidden")
  }, [ref, inert])
}

function Fold({ open, id, children }: { open: boolean; id?: string; children: React.ReactNode }) {
  const ref = React.useRef(null as HTMLDivElement | null)
  useInert(ref, !open)
  return (
    <div className={"ppf-fold" + (open ? " is-open" : "")} id={id}>
      <div ref={ref}>{children}</div>
    </div>
  )
}

export default function PocketPortfolio({
  name = "Muhammad Sahroni",
  role = "Staff Production Planner · Hankook Tire Indonesia",
  education = "Universitas Singaperbangsa Karawang · S1 Manajemen",
  educationList = DEFAULT_EDUCATION,
  coreSkills = DEFAULT_CORE_SKILLS,
  certifications = DEFAULT_CERTIFICATIONS,
  handle = "@msroni.png",
  email = "muhammadsahroni2304@gmail.com",
  LinkedIn = "linkedin.com/in/muhammad-sahroni",
  location = "Bekasi, Indonesia",
  timeZone = "Asia/Jakarta",
  languages = DEFAULT_LANGUAGES,
  defaultLanguage,
  portrait,
  portraitAlt,
  projects = DEFAULT_PROJECTS,
  clients = DEFAULT_CLIENTS,
  socials = DEFAULT_SOCIALS,
  services = DEFAULT_SERVICES,
  experience = DEFAULT_EXPERIENCE,
  availability = "Tersedia untuk peluang baru",
  accent = "#6366f1",
  accentForeground = "#ffffff",
  theme = "auto",
  layout = "auto",
  defaultOpen = ["info"],
  collapsedProjects = 2,
  marqueeSeconds = 24,
  minHeight = "100svh",
  className,
  style,
}: PocketPortfolioProps) {
  const uid = "ppf" + React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const langs = languages.length ? languages : DEFAULT_LANGUAGES
  const [code, setCode] = React.useState(() => defaultLanguage ?? langs[0].code)
  const lang = langs.find((l) => l.code === code) ?? langs[0]
  const t: PocketLabels = { ...DEFAULT_LABELS, ...lang.labels }

  const [open, setOpen] = React.useState(defaultOpen as SectionId[])
  const [project, setProject] = React.useState(null as number | null)
  const [now, setNow] = React.useState(null as Date | null)
  const [hour12, setHour12] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [look, setLook] = React.useState({ x: 0, y: 0 })

  const resolvedSocials = React.useMemo(() => {
    let list = socials ? [...socials] : [...DEFAULT_SOCIALS]
    if (LinkedIn) {
      const href = LinkedIn.startsWith("http") ? LinkedIn : `https://${LinkedIn}`
      const rawHandle = LinkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/, "").replace(/\/$/, "")
      const handle = "in/" + rawHandle
      const existingIdx = list.findIndex((s) => s.label.toLowerCase() === "linkedin")
      const item = { label: "LinkedIn", href, handle }
      if (existingIdx >= 0) {
        list[existingIdx] = item
      } else {
        list.push(item)
      }
    }
    return list
  }, [socials, LinkedIn])

  const infoRef = React.useRef(null as HTMLElement | null)
  const workRef = React.useRef(null as HTMLElement | null)
  const contactRef = React.useRef(null as HTMLElement | null)
  const portraitRef = React.useRef(null as HTMLDivElement | null)

  // live clock, ticking on the second
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const d = new Date()
      setNow(d)
      timer = setTimeout(tick, 1000 - d.getMilliseconds())
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  // the portrait's eyes follow the pointer
  React.useEffect(() => {
    if (portrait) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = portraitRef.current?.getBoundingClientRect()
        if (!r) return
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height * 0.43)
        const len = Math.hypot(dx, dy) || 1
        const k = Math.min(1, len / 240)
        setLook({ x: (dx / len) * 1.4 * k, y: (dy / len) * 0.8 * k })
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [portrait])

  // Escape folds an open project
  React.useEffect(() => {
    if (project == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProject(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [project])

  React.useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(id)
  }, [copied])

  const refs: Record<SectionId, React.RefObject<HTMLElement | null>> = { info: infoRef, work: workRef, contact: contactRef }

  const onPill = (id: SectionId) => {
    const opening = !open.includes(id)
    setOpen((o) => toggleSection(o, id))
    if (id === "work" && !opening) setProject((p) => (p != null && p >= collapsedProjects ? null : p))
    if (opening) {
      const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches
      requestAnimationFrame(() => refs[id].current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }))
    }
  }

  const copyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return // let the mailto link do its thing
    e.preventDefault()
    navigator.clipboard.writeText(email).then(
      () => setCopied(true),
      () => {
        window.location.href = "mailto:" + email
      },
    )
  }

  const workOpen = open.includes("work")
  const shown = visibleProjects(projects, workOpen, collapsedProjects)
  const words = lang.bio.split(/\s+/).filter(Boolean)

  const rootStyle = {
    minHeight,
    "--ppf-accent": accent,
    "--ppf-accent-ink": accentForeground,
    "--ppf-mq": Math.max(4, marqueeSeconds) + "s",
    ...style,
  } as React.CSSProperties

  const sections: SectionId[] = ["info", "work", "contact"]
  const loop = clients.length ? [...clients, ...clients] : []

  return (
    <div className={"ppf-root" + (className ? " " + className : "")} data-theme={theme} data-layout={layout} style={rootStyle}>
      <style>{PPF_CSS}</style>
      <h1 className="ppf-sr">{name}</h1>
      <div className="ppf-shell">
        <div className="ppf-col ppf-col-a">
          {/* nav */}
          <nav className="ppf-card ppf-nav" aria-label="Sections" style={{ "--i": 0 } as React.CSSProperties}>
            <button
              type="button"
              aria-label={"Back to top — " + name}
              onClick={() => infoRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
            >
              <LogoMark />
            </button>
            <div className="ppf-pills">
              {sections.map((id) => (
                <button key={id} type="button" className="ppf-pill" aria-expanded={open.includes(id)} aria-controls={uid + "-" + id} onClick={() => onPill(id)}>
                  {t[id]}
                  <PlusMinus />
                </button>
              ))}
            </div>
          </nav>

          {/* info */}
          <section ref={infoRef} className="ppf-card ppf-info" aria-label={t.info} style={{ "--i": 1 } as React.CSSProperties}>
            <div className="ppf-top">
              <div className="ppf-portrait" ref={portraitRef}>
                {portrait ? (
                  <img src={portrait} alt={portraitAlt ?? name} width={120} height={120} style={{ maxWidth: "none" }} />
                ) : (
                  <DrawnPortrait uid={uid} look={look} />
                )}
              </div>
              <div className="ppf-profile-side">
                <div className="ppf-meta">
                  {langs.length > 1 ? (
                    <div className="ppf-langs" role="group" aria-label="Language">
                      {langs.map((l) => (
                        <button key={l.code} type="button" className="ppf-lang" aria-pressed={l.code === lang.code} onClick={() => setCode(l.code)}>
                          {l.code}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="ppf-clock"
                    onClick={() => setHour12((h) => !h)}
                    aria-label={"Local time in " + location + ", switch to " + (hour12 ? "24" : "12") + "-hour"}
                  >
                    <time suppressHydrationWarning>{now ? formatClock(now, timeZone, hour12) : "--:--:--"}</time>
                    <small>{location}</small>
                  </button>
                </div>

                <div className="ppf-profile-header">
                  <h2 className="ppf-profile-name">{name}</h2>
                  {role ? <div className="ppf-profile-role">{role}</div> : null}
                  {education ? (
                    <div className="ppf-profile-edu" title={education}>
                      <GradCap />
                      <span>{education}</span>
                    </div>
                  ) : null}
                </div>

                {coreSkills && coreSkills.length > 0 ? (
                  <div className="ppf-profile-skills" aria-label="Core Skills">
                    {coreSkills.map((skill) => (
                      <span key={skill} className="ppf-profile-skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <Fold open={open.includes("info")} id={uid + "-info"}>
              <p className="ppf-bio" lang={lang.lang ?? lang.code.toLowerCase()} key={lang.code}>
                {words.map((w, i) => (
                  <React.Fragment key={i}>
                    <span style={{ "--w": i } as React.CSSProperties}>{w}</span>{" "}
                  </React.Fragment>
                ))}
              </p>
              {services.length || experience.length || (educationList && educationList.length) || (certifications && certifications.length) ? (
                <div className="ppf-sub">
                  {services.length ? (
                    <div>
                      <h2 className="ppf-h">{t.services}</h2>
                      <div className="ppf-chips">
                        {services.map((s) => (
                          <span key={s} className="ppf-chip">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {educationList && educationList.length ? (
                    <div>
                      <h2 className="ppf-h">{t.education ?? "Pendidikan"}</h2>
                      <ul className="ppf-xp">
                        {educationList.map((ed, idx) => (
                          <li key={ed.years + ed.institution + idx}>
                            <span>{ed.years}</span>
                            <span>{ed.degree}</span>
                            <span>{ed.institution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {experience.length ? (
                    <div>
                      <h2 className="ppf-h">{t.experience}</h2>
                      <ul className="ppf-xp">
                        {experience.map((x) => (
                          <li key={x.years + x.org}>
                            <span>{x.years}</span>
                            <span>{x.role}</span>
                            <span>{x.org}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {certifications && certifications.length ? (
                    <div>
                      <h2 className="ppf-h">{t.certifications ?? "Sertifikasi & Penghargaan"}</h2>
                      <ul className="ppf-xp">
                        {certifications.map((cert, idx) => {
                          const isStr = typeof cert === "string"
                          const title = isStr ? cert : cert.title
                          const issuer = isStr ? "Sertifikasi" : cert.issuer
                          return (
                            <li key={title + idx}>
                              <span>{issuer}</span>
                              <span style={{ gridColumn: "span 2" }}>{title}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </Fold>
          </section>

          {/* clients */}
          {loop.length ? (
            <div className="ppf-card ppf-clients" style={{ "--i": 2 } as React.CSSProperties}>
              <ul className="ppf-sr">
                {clients.map((c) => (
                  <li key={c.name}>{c.name}</li>
                ))}
              </ul>
              <div className="ppf-track" aria-hidden="true">
                {loop.map((c, i) => (
                  <span key={i} className="ppf-client">
                    <ClientMark mark={c.mark ?? MARKS[(i % clients.length) % MARKS.length]} />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="ppf-col ppf-col-b">
          {/* work */}
          <section ref={workRef} className="ppf-card ppf-work" aria-label={t.work} id={uid + "-work"} style={{ "--i": 3 } as React.CSSProperties}>
            <ul className="ppf-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {shown.map((p, i) => {
                const isOpen = project === i
                const desc = pickText(p.description, lang.code)
                return (
                  <li key={p.title + i} className="ppf-item">
                    <button type="button" className="ppf-row" aria-expanded={isOpen} aria-controls={uid + "-p" + i} onClick={() => setProject(isOpen ? null : i)}>
                      <span className="ppf-thumb">
                        <Cover project={p} index={i} accent={accent} uid={uid + "t" + i} />
                      </span>
                      <span className="ppf-row-t">
                        <span className="ppf-title">
                          <span>{p.title}</span>
                          <Arrow className="ppf-arrow" />
                        </span>
                        <span className="ppf-desc">{desc}</span>
                      </span>
                    </button>
                    <Fold open={isOpen} id={uid + "-p" + i}>
                      <div className="ppf-detail">
                        <div className="ppf-hero">
                          <Cover project={p} index={i} accent={accent} uid={uid + "h" + i} />
                        </div>
                        <dl className="ppf-facts">
                          {p.year ? (
                            <div>
                              <dt>{t.year}</dt>
                              <dd>{p.year}</dd>
                            </div>
                          ) : null}
                          {p.role ? (
                            <div>
                              <dt>{t.role}</dt>
                              <dd>{p.role}</dd>
                            </div>
                          ) : null}
                        </dl>
                        <div className="ppf-detail-foot">
                          <div className="ppf-chips">
                            {(p.tags ?? []).map((tag) => (
                              <span key={tag} className="ppf-chip" style={{ background: "var(--ppf-card)" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          {p.href ? (
                            <a className="ppf-cta" href={p.href}>
                              {t.viewCase}
                              <Arrow />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </Fold>
                  </li>
                )
              })}
            </ul>
            {projects.length > collapsedProjects ? (
              <button type="button" className="ppf-more" aria-expanded={workOpen} onClick={() => onPill("work")}>
                {workOpen ? t.showLess : t.showAll + " (" + projects.length + ")"}
                <PlusMinus />
              </button>
            ) : null}
          </section>

          {/* contact */}
          <section ref={contactRef} className="ppf-card ppf-contact" aria-label={t.contact} style={{ "--i": 4 } as React.CSSProperties}>
            {availability ? (
              <div className="ppf-avail">
                <span className="ppf-dot" aria-hidden="true" />
                {availability}
              </div>
            ) : (
              <span />
            )}
            <Fold open={open.includes("contact")} id={uid + "-contact"}>
              <ul className="ppf-socials">
                {resolvedSocials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <span>{s.label}</span>
                      <span>{s.handle}</span>
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="ppf-actions">
                <a className="ppf-cta" href={"mailto:" + email}>
                  {t.hello}
                  <Arrow />
                </a>
                <button type="button" className="ppf-ghost" onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true), () => { })}>
                  {t.copy}
                </button>
              </div>
            </Fold>
            <div className="ppf-id">
              <span>{handle}</span>
              <a className="ppf-email" href={"mailto:" + email} onClick={copyEmail} title={t.copy}>
                {email}
                <span className={"ppf-toast" + (copied ? " is-on" : "")} role="status" aria-live="polite">
                  {copied ? t.copied : ""}
                </span>
              </a>
            </div>
            <span className="ppf-copy" aria-hidden="true">
              © {now ? now.getFullYear() : ""}
            </span>
          </section>
        </div>
      </div>
    </div>
  )
}
