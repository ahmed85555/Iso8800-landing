import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Badge = ({ children }) => (
  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
    {children}
  </span>
);

function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
      <div className="font-semibold">{title}</div>
      <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
  );
}

export default function App() {
  const PAGES = ["fusa", "sotif", "iso8800"];
  const AUTOPLAY_MS = 5000;

  const [page, setPage] = React.useState("fusa");
  const timerRef = React.useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const nextPage = React.useCallback(() => {
    setPage((p) => PAGES[(PAGES.indexOf(p) + 1) % PAGES.length]);
  }, []);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = React.useCallback(() => {
    if (prefersReduced || document.hidden) return;
    clearTimer();
    timerRef.current = setTimeout(nextPage, AUTOPLAY_MS);
  }, [clearTimer, nextPage, prefersReduced]);

  // Restart timer whenever the page changes
  React.useEffect(() => {
    startTimer();
    return clearTimer;
  }, [page, startTimer, clearTimer]);

  // Pause on tab hidden; resume on visible
  React.useEffect(() => {
    const onVis = () => (document.hidden ? clearTimer() : startTimer());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startTimer, clearTimer]);

  // Manual nav also resets the timer
  const onTabClick = (id) => {
    setPage(id);
    // scroll to top and restart timer
    window.scrollTo(0, 0);
    startTimer();
  };

  const Tab = ({ id, label }) => (
    <button
      onClick={() => onTabClick(id)}
      className={`px-3 py-1.5 rounded-lg text-sm transition ${
        page === id ? "bg-gray-900 text-white" : "hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  const PageShell = ({ children }) => (
    <motion.div
      key={page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="min-h-[70vh]"
      // Pause autoplay while user hovers the content (optional, nice UX)
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-bold tracking-tight">
            Ejad • Automotive Safety
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <Tab id="fusa" label="FuSa (ISO 26262)" />
            <Tab id="sotif" label="SOTIF (ISO 21448)" />
            <Tab id="iso8800" label="ISO 8800 (AI)" />
            <a
              href="#services"
              className="ml-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white"
            >
              Services
            </a>
            <a href="#faq" className="px-3 py-1.5 rounded-lg hover:bg-gray-100">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-70" aria-hidden>
          <div className="absolute -top-28 left-1/3 w-96 h-96 bg-sky-200 rounded-full" />
          <div className="absolute top-24 -left-20 w-72 h-72 bg-indigo-200 rounded-full" />
          <div className="absolute -bottom-24 right-10 w-80 h-80 bg-emerald-200 rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {page === "fusa" && (
              <>
                Ejad — End-to-End{" "}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  Functional Safety
                </span>{" "}
                Services
              </>
            )}
            {page === "sotif" && (
              <>
                Ejad —{" "}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  SOTIF
                </span>{" "}
                (ISO 21448) Services
              </>
            )}
            {page === "iso8800" && (
              <>
                Ejad — Operationalize{" "}
                <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  ISO 8800
                </span>{" "}
                for AI
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-lg text-gray-700 max-w-3xl"
          >
            {page === "fusa" &&
              "We deliver ISO 26262 across concept, system, hardware/software, and production—integrated with your development V-model and toolchain."}
            {page === "sotif" &&
              "We engineer Safety of the Intended Functionality: scenario catalogs, insufficiency analysis, measurable coverage and validation for ADAS/DMS."}
            {page === "iso8800" &&
              "We turn ISO/PAS 8800 into a concrete, auditable AI safety pipeline that ties into ISO 26262 and SOTIF."}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2">
            {page === "fusa" && (
              <>
                <Badge>HARA / SGs / TSR/TSC</Badge>
                <Badge>ASIL decomposition</Badge>
                <Badge>SW Safety & tool confidence</Badge>
              </>
            )}
            {page === "sotif" && (
              <>
                <Badge>Scenario & coverage</Badge>
                <Badge>Insufficient performance</Badge>
                <Badge>Validation strategy</Badge>
              </>
            )}
            {page === "iso8800" && (
              <>
                <Badge>ODD → Data → Model → Tests → Runtime</Badge>
                <Badge>Evidence-driven safety case</Badge>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Animated page body */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {page === "fusa" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Card title="Concept & System">
                  Item definition, HARA, safety goals, FTTI, technical safety
                  concept, ASIL tailoring.
                </Card>
                <Card title="HW/SW Development">
                  SW safety requirements, architecture, unit design &
                  verification, tool confidence.
                </Card>
                <Card title="Verification & Production">
                  System test, safety case, production/operation planning,
                  audits.
                </Card>
              </div>
            </PageShell>
          )}

          {page === "sotif" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Card title="Scenario Engineering">
                  ODD-aligned catalogs, boundary/long-tail bins, measurable
                  KPIs.
                </Card>
                <Card title="Insufficient Performance">
                  Hazardous mis-behavior due to perception/planning limits;
                  mitigations.
                </Card>
                <Card title="Validation & Evidence">
                  Sim/replay/track, statistics, confidence bounds, safety
                  argument inputs.
                </Card>
              </div>
            </PageShell>
          )}

          {page === "iso8800" && (
            <PageShell>
              <section id="scope" className="py-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Scope & Tailoring (Item → AI system → AI components)
                </h2>
                <p className="text-gray-600 mt-2 max-w-3xl">
                  Per ISO 8800, the AI system is derived from the item. Identify
                  AI components (model vs non-model) before data/model work
                  begins.
                </p>
              </section>
              <section id="lifecycle" className="py-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  ISO 8800 Lifecycle — from Item to Assured Operation
                </h2>
                <ol className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                  {[
                    [
                      "01",
                      "Allocate safety to AI system",
                      "Safety concept from encompassing system → AI system.",
                    ],
                    [
                      "02",
                      "Refine AI safety requirements",
                      "ODD, performance targets, monitors, fallbacks.",
                    ],
                    [
                      "03",
                      "Design & V-model",
                      "Data, component design, implementation, component verification, system V&V, safety analysis.",
                    ],
                    [
                      "04",
                      "Evaluate assurance",
                      "Are AI safety requirements fulfilled?",
                    ],
                    [
                      "05",
                      "Integrate & system V&V",
                      "Assurance valid at system level.",
                    ],
                    [
                      "06",
                      "Operate & monitor (OTA)",
                      "Runtime monitoring, OTA requalification, continuous assurance.",
                    ],
                    [
                      "07",
                      "Tool confidence",
                      "Confidence-in-use / qualification for AI frameworks & tools.",
                    ],
                  ].map(([n, t, d], i) => (
                    <li
                      key={i}
                      className={`rounded-2xl border border-gray-200 bg-white p-5 ${
                        i === 6 ? "md:col-span-3" : ""
                      }`}
                    >
                      <div className="text-xs font-semibold text-gray-500">
                        {n}
                      </div>
                      <div className="font-semibold">{t}</div>
                      <p className="text-gray-700 mt-1">{d}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </PageShell>
          )}
        </AnimatePresence>

        {/* Shared sections */}
        <section id="services" className="py-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card title="Gap Assessment">
              Map your current practice to 26262 / 21448 / 8800. Action plan
              with prioritized gates and artifacts.
            </Card>
            <Card title="Data & Scenario Pipeline">
              Governance, labeling QA, gold sets, and ODD-aligned catalogs.
            </Card>
            <Card title="Runtime & OTA Governance">
              Monitors, thresholds, retraining/OTA requalification; keep safety
              post-deployment.
            </Card>
          </div>
        </section>

        <section id="faq" className="py-10 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            FAQs
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">
            <Card title="Do you work with existing toolchains?">
              Yes—MLflow/DVC, CARLA/esmini, or in-house; we integrate via
              evidence packs.
            </Card>
            <Card title="What’s a good first pilot?">
              A bounded AI item (e.g., lane detection or DMS) or a focused 26262
              safety work-package.
            </Card>
          </div>
        </section>
      </div>

      <footer className="py-10 border-t border-gray-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Ejad Automotive Safety</div>
          <div className="flex gap-4">
            <button onClick={() => onTabClick("fusa")} className="hover:underline">
              FuSa
            </button>
            <button onClick={() => onTabClick("sotif")} className="hover:underline">
              SOTIF
            </button>
            <button onClick={() => onTabClick("iso8800")} className="hover:underline">
              ISO 8800
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
