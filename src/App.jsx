import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---- Brand colors ---- */
const EJAD_BLUE = "#143D8D";
const EJAD_RED  = "#E61E62";

/* ---- Reusable small bits ---- */
const Badge = ({ children }) => (
  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">
    {children}
  </span>
);

function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
      {title && <div className="font-semibold">{title}</div>}
      <div className="text-sm text-gray-700 mt-1">{children}</div>
    </div>
  );
}

const Step = ({ n, title, desc }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5">
    <div className="text-xs font-semibold" style={{ color: EJAD_RED }}>{n}</div>
    <div className="font-semibold">{title}</div>
    <p className="text-gray-700 mt-1">{desc}</p>
  </div>
);

export default function App() {
  /* Add the new pages to the rotation */
  const PAGES = [
    "fusa", "sotif", "iso8800",
    "appdev", "ecu", "devops",
    "testing", "systems", "quality", "security", "sdv"
  ];
  const AUTOPLAY_MS = 5000;

  const [page, setPage] = React.useState("fusa");
  const timerRef = React.useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const nextPage = React.useCallback(() => {
    setPage(p => PAGES[(PAGES.indexOf(p) + 1) % PAGES.length]);
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
      className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
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

  /* -------- Header -------- */
  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-sky-50 via-white to-white">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-extrabold tracking-tight" style={{ color: EJAD_BLUE }}>
            <span style={{ color: EJAD_RED }}>eJad</span> • Automotive Safety
          </a>

          {/* many tabs -> horizontally scrollable */}
          <nav className="hidden md:flex items-center gap-2 text-sm overflow-x-auto max-w-[80%]">
            <Tab id="fusa"     label="FuSa (ISO 26262)" />
            <Tab id="sotif"    label="SOTIF (ISO 21448)" />
            <Tab id="iso8800"  label="ISO 8800 (AI)" />
            <Tab id="appdev"   label="Application Dev" />
            <Tab id="ecu"      label="ECU SW Integration" />
            <Tab id="devops"   label="DevOps / CI-CD" />
            <Tab id="testing"  label="SW Testing" />
            <Tab id="systems"  label="System Eng." />
            <Tab id="quality"  label="SW Quality" />
            <Tab id="security" label="Cyber Security" />
            <Tab id="sdv"      label="SDV Services" />
          </nav>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-70" aria-hidden>
          <div className="absolute -top-28 left-1/3 w-96 h-96 bg-sky-200 rounded-full" />
          <div className="absolute top-24 -left-20 w-72 h-72 bg-indigo-200 rounded-full" />
          <div className="absolute -bottom-24 right-10 w-80 h-80 bg-emerald-200 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {page === "fusa"     && (<><span style={{color:EJAD_BLUE}}>Functional Safety</span> <span style={{color:EJAD_RED}}>ISO 26262</span> Services</>)}
            {page === "sotif"    && (<><span style={{color:EJAD_BLUE}}>SOTIF</span> <span style={{color:EJAD_RED}}>(ISO 21448)</span> Services</>)}
            {page === "iso8800"  && (<><span style={{color:EJAD_BLUE}}>AI Safety & Assurance</span> <span style={{color:EJAD_RED}}>ISO 8800</span></>)}
            {page === "appdev"   && (<><span style={{color:EJAD_BLUE}}>Application Development</span></>)}
            {page === "ecu"      && (<><span style={{color:EJAD_BLUE}}>ECU Software Development</span> <span style={{color:EJAD_RED}}>& Integration</span></>)}
            {page === "devops"   && (<><span style={{color:EJAD_BLUE}}>DevOps</span> <span style={{color:EJAD_RED}}>CI/CD & Tooling</span></>)}
            {page === "testing"  && (<><span style={{color:EJAD_BLUE}}>Software Testing</span> <span style={{color:EJAD_RED}}>& Validation</span></>)}
            {page === "systems"  && (<><span style={{color:EJAD_BLUE}}>System Engineering</span></>)}
            {page === "quality"  && (<><span style={{color:EJAD_BLUE}}>Software Quality</span></>)}
            {page === "security" && (<><span style={{color:EJAD_BLUE}}>Cyber Security</span></>)}
            {page === "sdv"      && (<><span style={{color:EJAD_BLUE}}>eJad SDV Services</span></>)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-lg text-gray-700 max-w-3xl"
          >
            {page === "fusa"     && "End-to-end ISO 26262 application—concept, system, HW/SW development, verification and production."}
            {page === "sotif"    && "Safety of the Intended Functionality: scenario catalogs, insufficiency analysis, measurable coverage & validation for ADAS/DMS."}
            {page === "iso8800"  && "Operationalize ISO/PAS 8800 with an auditable pipeline tied to ISO 26262 and SOTIF."}
            {page === "appdev"   && "ECU application logic and model-based design for AUTOSAR & non-AUTOSAR platforms."}
            {page === "ecu"      && "Complete ECU software integration—Classic & Adaptive AUTOSAR, OEM extensions, platform bring-up."}
            {page === "devops"   && "ARTOP/toolchains, build automation, CI/CD, and cloud dashboards for automotive software."}
            {page === "testing"  && "Unit, integration, system qualification, fault injection, and conformance verification."}
            {page === "systems"  && "Requirements, architecture, documentation and bidirectional traceability ownership."}
            {page === "quality"  && "ASPICE, ISO 9001, process audits, and standards implementation for reliable delivery."}
            {page === "security" && "TARA-driven cybersecurity, HSM development, secure stack integration for ECUs."}
            {page === "sdv"      && "Application development, CI/CD automation, and containerized deployment for SDV."}
          </motion.p>
        </div>
      </section>

      {/* ---- BODY ---- */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">

          {/* Existing pages remain text-only cards (no images). */}
          {page === "fusa" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Item & Concept"
                  desc="HARA, safety goals, functional safety concept (FSC) and ASIL decomposition." />
                <Step n="02" title="System & SW Dev"
                  desc="Partitioning, safety mechanisms, tool confidence, and guided integration." />
                <Step n="03" title="V&V & Assessment"
                  desc="Unit/integration/system tests, coverage metrics, and assessor-ready evidence." />
              </div>
            </PageShell>
          )}

          {page === "sotif" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Scenario Engineering"
                      desc="ODD-aligned scenario catalog (nominal, boundary, long-tail) with coverage metrics."/>
                <Step n="02" title="Insufficient Performance"
                      desc="Analyze sensor/ML limitations, define monitors & fallbacks, feed back to design."/>
                <Step n="03" title="Validation Evidence"
                      desc="Simulation, replay & track tests; KPIs with confidence; safety argument packs."/>
              </div>
            </PageShell>
          )}

          {page === "iso8800" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Scope & Tailoring"
                      desc="Allocate AI safety to AI system/components. Define ODD, targets & monitors."/>
                <Step n="02" title="Design & V-Model"
                      desc="Data governance, component design & implementation, component/system V&V."/>
                <Step n="03" title="Operate & Assure"
                      desc="Runtime monitoring, OTA re-qualification, and tool confidence."/>
              </div>
            </PageShell>
          )}

          {/* ---- New Pages ---- */}

          {page === "appdev" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Requirements & Model-Based Design"
                  desc="Capture functional needs and develop Simulink/Stateflow or code-first models."/>
                <Step n="02" title="Autosar & Non-Autosar Apps"
                  desc="Component architecture, RTE interfaces, diagnostics, NVM, and safety hooks."/>
                <Step n="03" title="Code Gen & Integration"
                  desc="Auto-code or hand-code, static checks, build profiles, and CI unit tests."/>
              </div>
            </PageShell>
          )}

          {page === "ecu" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Platform Bring-up"
                  desc="MCAL/BSP/boot, clock & memory, drivers, and safety-related init."/>
                <Step n="02" title="Classic & Adaptive AUTOSAR"
                  desc="BSW config, RTE, SOME/IP/DoIP, ara::com, and OEM extensions."/>
                <Step n="03" title="Integration & Flash"
                  desc="Integration tests on HiL/bench, flashing, secure boot and diagnostics."/>
              </div>
            </PageShell>
          )}

          {page === "devops" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Tooling & ARTOP"
                  desc="Workspace standards, templates, static analysis, and license governance."/>
                <Step n="02" title="CI/CD Pipeline"
                  desc="Build automation, test orchestration, artifact retention, metrics and gates."/>
                <Step n="03" title="Dashboards"
                  desc="Coverage, defects, performance & reliability KPIs with trend alerts."/>
              </div>
            </PageShell>
          )}

          {page === "testing" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Unit & Integration Tests"
                  desc="Branch/MCDC coverage, GoogleTest/CppUTest, middleware & driver tests."/>
                <Step n="02" title="System & Qualification"
                  desc="Black-box tests, fault injection, endurance, startup/run-time checks."/>
                <Step n="03" title="Conformance"
                  desc="OEM / MISRA / Autosar C++ checks, timing/stack/latency verification."/>
              </div>
            </PageShell>
          )}

          {page === "systems" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Requirements Ownership"
                  desc="HW/SW requirements, change control, and stakeholder alignment."/>
                <Step n="02" title="Architecture & Documentation"
                  desc="System, software and interface specs with diagrams and acceptance criteria."/>
                <Step n="03" title="Traceability"
                  desc="Bi-directional linkage across reqs → design → code → tests → evidence."/>
              </div>
            </PageShell>
          )}

          {page === "quality" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="Quality System"
                  desc="ASPICE & ISO 9001 tailoring; process assets, checklists and audits."/>
                <Step n="02" title="Standards & Reviews"
                  desc="Coding standards, static analysis policies, design & code reviews."/>
                <Step n="03" title="Release & Evidence"
                  desc="Definition of Done, quality gates, and release documentation packs."/>
              </div>
            </PageShell>
          )}

          {page === "security" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="TARA & Requirements"
                  desc="Threat analysis, assets, attack paths, and cybersecurity goals."/>
                <Step n="02" title="Secure Architecture"
                  desc="HSM, key management, secure boot, update, and comms hardening."/>
                <Step n="03" title="Implementation & Tests"
                  desc="Crypto integration, fuzzing, penetration tests, and vuln management."/>
              </div>
            </PageShell>
          )}

          {page === "sdv" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="01" title="SDV App Development"
                  desc="Rust/C++ services, APIs, and Velocitas-based framework tailoring."/>
                <Step n="02" title="DevOps CI/CD"
                  desc="Automation pipelines, metrics/quality gates, and dashboarding."/>
                <Step n="03" title="Containerization & Deploy"
                  desc="Dockerized apps, orchestration, rollout strategies, and monitoring."/>
              </div>
            </PageShell>
          )}

        </AnimatePresence>

        {/* Shared Services footer section */}
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
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} <span style={{ color: EJAD_RED }}>eJad</span> Automotive Safety</div>
          <div className="flex gap-4">
            {["fusa","sotif","iso8800","appdev","ecu","devops","testing","systems","quality","security","sdv"]
              .map(k => <button key={k} onClick={() => onTabClick(k)} className="hover:underline capitalize">{k}</button>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
