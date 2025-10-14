import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* --- Brand colors --- */
const EJAD_BLUE = "#143D8D";
const EJAD_RED  = "#E61E62";

/* --- FuSa images (uppercase .PNG + ?url for Vite) --- */
import fusaHero      from "./assets/fusa-hero.PNG?url";
import fusaFootprint from "./assets/fusa-footprint.PNG?url";
import fusaAct1      from "./assets/fusa-activities-1.PNG?url";
import fusaAct2      from "./assets/fusa-activities-2.PNG?url";

const Badge = ({ children }) => (
  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
    {children}
  </span>
);

function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
      {title && <div className="font-semibold">{title}</div>}
      <div className="text-sm text-gray-600 mt-1">{children}</div>
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

  React.useEffect(() => { startTimer(); return clearTimer; }, [page, startTimer, clearTimer]);

  React.useEffect(() => {
    const onVis = () => (document.hidden ? clearTimer() : startTimer());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startTimer, clearTimer]);

  const onTabClick = (id) => { setPage(id); window.scrollTo(0,0); startTimer(); };

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
          <a href="#top" className="font-extrabold tracking-tight" style={{ color: EJAD_BLUE }}>
            <span style={{ color: EJAD_RED }}>Ejad</span> • Automotive Safety
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <Tab id="fusa" label="FuSa (ISO 26262)" />
            <Tab id="sotif" label="SOTIF (ISO 21448)" />
            <Tab id="iso8800" label="ISO 8800 (AI)" />
            <a href="#services" className="ml-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white">Services</a>
            <a href="#faq" className="px-3 py-1.5 rounded-lg hover:bg-gray-100">FAQ</a>
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
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {page === "fusa" && (
              <>
                <span style={{ color: EJAD_BLUE }}>Functional Safety</span>{" "}
                <span style={{ color: EJAD_RED }}>ISO 26262</span> Services
              </>
            )}
            {page === "sotif" && (
              <>
                <span style={{ color: EJAD_BLUE }}>SOTIF</span>{" "}
                <span style={{ color: EJAD_RED }}>(ISO 21448)</span> Services
              </>
            )}
            {page === "iso8800" && (
              <>
                <span style={{ color: EJAD_BLUE }}>AI Safety & Assurance</span>{" "}
                <span style={{ color: EJAD_RED }}>ISO 8800</span>
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
              "End-to-end ISO 26262 application—concept, system, HW/SW development, verification and production—integrated with your toolchain."}
            {page === "sotif" &&
              "Safety of the Intended Functionality: scenario catalogs, insufficiency analysis, measurable coverage and validation for ADAS/DMS."}
            {page === "iso8800" &&
              "Operationalize ISO/PAS 8800 with an auditable pipeline that ties into ISO 26262 and SOTIF."}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2">
            {page === "fusa" && (
              <>
                <Badge>HARA • Safety Goals • TSC</Badge>
                <Badge>ASIL decomposition</Badge>
                <Badge>SW Safety & Tool Confidence</Badge>
              </>
            )}
            {page === "sotif" && (
              <>
                <Badge>Scenario & Coverage</Badge>
                <Badge>Insufficient Performance</Badge>
                <Badge>Validation Strategy</Badge>
              </>
            )}
            {page === "iso8800" && (
              <>
                <Badge>ODD → Data → Model → Tests → Runtime</Badge>
                <Badge>Evidence-Driven Safety Case</Badge>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Animated page body */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {/* ---------------- FuSa page (keeps images) ---------------- */}
          {page === "fusa" && (
            <PageShell>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <img
                  src={fusaHero}
                  alt="ISO 26262 Functional Safety Services"
                  className="w-full rounded-xl border border-gray-200 shadow-sm"
                />
                <Card>
                  <h3 className="text-2xl font-extrabold" style={{ color: EJAD_BLUE }}>
                    Our Strategy
                  </h3>
                  <ul className="mt-3 list-disc pl-5 space-y-1">
                    <li>Apply ISO 26262 development methods up to ASIL-D.</li>
                    <li>Support functional safety assessment and compliance.</li>
                    <li>Assist OEMs with item definition, safety goals, and FSC.</li>
                    <li>Decompose high ASILs for lean design.</li>
                    <li>Propose effective and adequate safety mechanisms.</li>
                  </ul>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center mt-10">
                <img
                  src={fusaFootprint}
                  alt="Safety Footprint"
                  className="w-full rounded-xl border border-gray-200 shadow-sm"
                />
                <Card>
                  <h3 className="text-2xl font-extrabold" style={{ color: EJAD_BLUE }}>
                    Safety Footprint
                  </h3>
                  <p className="mt-2">
                    <strong>16+ years</strong> applying ISO 26262 at vehicle and architecture levels
                    (ADAS, EV). Concepts for AUTOSAR, QNX, Linux embedded, AI, high-performance
                    processors—and more.
                  </p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <img
                  src={fusaAct1}
                  alt="FuSa Activities Overview"
                  className="w-full rounded-xl border border-gray-200 shadow-sm"
                />
                <img
                  src={fusaAct2}
                  alt="FuSa Activities Detailed"
                  className="w-full rounded-xl border border-gray-200 shadow-sm"
                />
              </div>
            </PageShell>
          )}

          {/* ---------------- SOTIF page (no images, just boxes) ---------------- */}
          {page === "sotif" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Card title={<span style={{ color: EJAD_BLUE }}>Scenario Engineering</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>ODD-aligned scenario catalog (nominal, boundary, long-tail).</li>
                    <li>Coverage metrics for perception/planning behavior.</li>
                    <li>Traceability to requirements & tests.</li>
                  </ul>
                </Card>
                <Card title={<span style={{ color: EJAD_BLUE }}>Insufficient Performance</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Analyze sensor/ML limitations that can cause hazards.</li>
                    <li>Define mitigations, monitors, and fallbacks.</li>
                    <li>Feed insights back to design & validation.</li>
                  </ul>
                </Card>
                <Card title={<span style={{ color: EJAD_BLUE }}>Validation & Evidence</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Simulation, replay, and track testing plans.</li>
                    <li>Measurable KPIs with confidence bounds.</li>
                    <li>Evidence packs for the safety argument.</li>
                  </ul>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card title={<span style={{ color: EJAD_RED }}>Use Cases</span>}>
                  DMS • Front Camera (ADAS) — end-to-end from scenarios to validation.
                </Card>
                <Card title="Deliverables">
                  SOTIF requirements, coverage reports, insufficiency analysis, and validation
                  results integrated into your toolchain.
                </Card>
              </div>
            </PageShell>
          )}

          {/* ---------------- ISO 8800 page (no images, just boxes) ---------------- */}
          {page === "iso8800" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Card title={<span style={{ color: EJAD_BLUE }}>Scope & Tailoring</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Item → AI system → AI components (model vs non-model).</li>
                    <li>Allocate AI safety reqs from encompassing system.</li>
                    <li>Define ODD, performance targets, monitors, fallbacks.</li>
                  </ul>
                </Card>
                <Card title={<span style={{ color: EJAD_BLUE }}>Design & V-Model</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Data governance and gold sets.</li>
                    <li>Component design & implementation.</li>
                    <li>Component verification & AI system V&amp;V.</li>
                  </ul>
                </Card>
                <Card title={<span style={{ color: EJAD_BLUE }}>Runtime & OTA</span>}>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Runtime monitors & thresholds.</li>
                    <li>Retraining/OTA re-qualification gates.</li>
                    <li>Continuous assurance & KPIs.</li>
                  </ul>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card title="Evaluate Assurance">
                  Are AI safety requirements fulfilled? Evidence rolled into the safety case.
                </Card>
                <Card title="Integrate & System V&V">
                  Close the loop at system level; keep assurance argument valid across releases.
                </Card>
                <Card title="Tool Confidence">
                  Confidence-in-use / qualification for AI frameworks, data tools, and pipelines.
                </Card>
              </div>
            </PageShell>
          )}
        </AnimatePresence>

        {/* Shared sections */}
        <section id="services" className="py-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: EJAD_BLUE }}>
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card title="Gap Assessment">
              Map current practice to <span style={{ color: EJAD_BLUE }}>ISO 26262</span>,{" "}
              <span style={{ color: EJAD_BLUE }}>ISO 21448</span>, and{" "}
              <span style={{ color: EJAD_BLUE }}>ISO 8800</span>. Action plan with prioritized gates & artifacts.
            </Card>
            <Card title="Data & Scenario Pipeline">
              Governance, labeling QA, gold sets, and ODD-aligned catalogs for robust validation.
            </Card>
            <Card title="Runtime & OTA Governance">
              Monitors, thresholds, retraining/OTA re-qualification; keep safety post-deployment.
            </Card>
          </div>
        </section>
      </div>

      <footer className="py-10 border-t border-gray-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} <span style={{ color: EJAD_RED }}>Ejad</span> Automotive Safety
          </div>
          <div className="flex gap-4">
            <button onClick={() => onTabClick("fusa")} className="hover:underline">FuSa</button>
            <button onClick={() => onTabClick("sotif")} className="hover:underline">SOTIF</button>
            <button onClick={() => onTabClick("iso8800")} className="hover:underline">ISO 8800</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
