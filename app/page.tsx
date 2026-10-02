"use client";

import * as React from "react";
import PocketPortfolio from "@/components/ui/pocket-portfolio";

export default function Home() {
  const [isDark, setIsDark] = React.useState(false);

  // Sync dark class to document root for Tailwind and PocketPortfolio theme
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Tailwind Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/15 blur-[120px] rounded-full dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-pink-600/20" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-gradient-to-tl from-emerald-500/10 to-cyan-500/10 blur-[100px] rounded-full dark:from-emerald-600/15 dark:to-cyan-600/15" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Header with Tailwind */}
      <header className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between rounded-full border border-black/[0.08] dark:border-white/[0.12] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-4 py-2 shadow-sm transition-all">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              Open to Opportunities
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:scale-105 active:scale-95 transition"
              aria-label="Toggle Theme"
              title="Ganti Tema"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Quick Contact Action Button */}
            <a
              href="mailto:muhammadsahroni2304@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-sm hover:opacity-90 active:scale-95 transition"
            >
              <span>Get in Touch</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Pocket Portfolio Component */}
      <main className="relative z-10 px-4 py-6">
        <PocketPortfolio
          name="Muhammad Sahroni"
          role="Staff Production Planner · Hankook Tire Indonesia"
          education="Universitas Singaperbangsa Karawang · S1 Manajemen"
          educationList={[
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
          ]}
          coreSkills={[
            "Data Analytics",
            "Python",
            "SQL",
            "Machine Learning",
            "Computer Vision",
            "Production Planning",
            "Next.js",
            "Microsoft Excel",
          ]}
          services={[
            "Data Analytics & Modeling",
            "Python & SQL Querying",
            "Machine Learning & NLP",
            "Computer Vision Monitoring",
            "Production Planning & Inventory Control",
            "Quality Control & Inspection",
            "Next.js & Web Applications",
            "Back-end Operations & JSON",
            "Microsoft Excel & Data Visualization",
          ]}
          experience={[
            {
              years: "2026 — Now",
              role: "Staff Production Planner",
              org: "Hankook Tire Indonesia",
            },
            {
              years: "2026",
              role: "Checker & Cleaner (Roof & Body Inspection)",
              org: "BYD Indonesia",
            },
            {
              years: "2025",
              role: "Project-Based Data Scientist",
              org: "id/x partners x Rakamin Academy",
            },
            {
              years: "2022 — 2023",
              role: "Operator",
              org: "PT Chandra Nugerahcipta (CNC Group)",
            },
          ]}
          certifications={[
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
          ]}
          handle="@msroni.png"
          email="muhammadsahroni2304@gmail.com"
          LinkedIn="linkedin.com/in/muhammad-sahroni"
          location="Bekasi, Indonesia"
          timeZone="Asia/Jakarta"
          accent="#6366f1"
          availability="Tersedia untuk peluang baru"
          theme={isDark ? "dark" : "light"}
          className="mx-auto"
        />
      </main>

      {/* Tailwind Footer */}
      <footer className="relative z-10 border-t border-zinc-200/60 dark:border-zinc-800/60 py-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Muhammad Sahroni. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 px-2.5 py-1 font-mono text-[11px]">
              Next.js 16
            </span>
            <span className="rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 font-mono text-[11px]">
              Tailwind CSS v4
            </span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 font-mono text-[11px]">
              React 19
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}


