import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Brand */
const EJAD_BLUE = "#143D8D";
const EJAD_RED  = "#E61E62";

/* --- FuSa images (UPPERCASE PNG + ?url so Vite handles them) --- */
import fusaHero      from "./assets/fusa-hero.PNG?url";
import fusaFootprint from "./assets/fusa-footprint.PNG?url";
import fusaAct1      from "./assets/fusa-activities-1.PNG?url";
import fusaAct2      from "./assets/fusa-activities-2.PNG?url";

/* UI bits */
const Badge = ({ children }) => (
  <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">{children}</span>
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
  /* Pages (rotation includes new domains) */
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
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
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

  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-extrabold tracking-tight" style={{ color: EJAD_BLUE }}>
            <span style={{ color: EJAD_RED }}>eJad</span> • Automotive Safety
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm overflow-x-auto max-w-[80%]">
            <Tab id="fusa" label="FuSa (ISO 26262)" />
            <Tab id="sotif" label="SOTIF (ISO 21448)" />
            <Tab id="iso8800" label="ISO 8800 (AI)" />
            <Tab id="appdev" label="Application Dev" />
            <Tab id="ecu" label="ECU SW Integration" />
            <Tab id="devops" label="DevOps / CI-CD" />
            <Tab id="testing" label="SW Testing" />
            <Tab id="systems" label="System Eng." />
            <Tab id="quality" label="SW Quality" />
            <Tab id="security" label="Cyber Security" />
            <Tab id="sdv" label="SDV Services" />
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

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            {page === "fusa"    && (<><span style={{color:EJAD_BLUE}}>Functional Safety</span> <span style={{color:EJAD_RED}}>ISO 26262</span> Services</>)}
            {page === "sotif"   && (<><span style={{color:EJAD_BLUE}}>SOTIF</span> <span style={{color:EJAD_RED}}>(ISO 21448)</span> Services</>)}
            {page === "iso8800" && (<><span style={{color:EJAD_BLUE}}>AI Safety & Assurance</span> <span style={{color:EJAD_RED}}>ISO 8800</span></>)}
            {page === "appdev"  && (<><span style={{color:EJAD_BLUE}}>Application Development</span></>)}
            {page === "ecu"     && (<><span style={{color:EJAD_BLUE}}>ECU Software Development</span> <span style={{color:EJAD_RED}}>& Integration</span></>)}
            {page === "devops"  && (<><span style={{color:EJAD_BLUE}}>DevOps</span> <span style={{color:EJAD_RED}}>CI/CD & Tooling</span></>)}
            {page === "testing" && (<><span style={{color:EJAD_BLUE}}>Software Testing</span> <span style={{color:EJAD_RED}}>& Validation</span></>)}
            {page === "systems" && (<><span style={{color:EJAD_BLUE}}>System Engineering</span></>)}
            {page === "quality" && (<><span style={{color:EJAD_BLUE}}>Software Quality</span></>)}
            {page === "security"&& (<><span style={{color:EJAD_BLUE}}>Cyber Security</span></>)}
            {page === "sdv"     && (<><span style={{color:EJAD_BLUE}}>eJad SDV Services</span></>)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-lg text-gray-700 max-w-3xl"
          >
            {page === "fusa"    && "End-to-end ISO 26262 application—concept, system, HW/SW development, verification and production—integrated with your toolchain."}
            {page === "sotif"   && "SOTIF with ASPICE discipline: scenario catalogs, insufficiency analysis, measurable coverage & validation wrapped by SYS/SWE/SUP processes."}
            {page === "iso8800" && "Operationalize ISO/PAS 8800 and connect to ASPICE SWE/SUP for an auditable AI pipeline."}
            {page === "appdev"  && "ECU application logic and model-based design across AUTOSAR & non-AUTOSAR platforms following ASPICE SWE.1-6."}
            {page === "ecu"     && "Complete ECU software integration—Classic & Adaptive AUTOSAR—under ASPICE SWE.2–SWE.6 and SUP.x support."}
            {page === "devops"  && "ARTOP/toolchains, CI/CD automation and dashboards aligned to SUP.1/2/8/9 and MAN.3."}
            {page === "testing" && "Unit/integration/system qualification mapped to SWE.4/5, SYS.4 and SUP.8."}
            {page === "systems" && "Requirements, architecture, documentation and traceability under SYS.1-3 and MAN.3."}
            {page === "quality" && "ASPICE SUP.2 QA with SUP.1 CM, SUP.9 Problem Resolution and release evidence."}
            {page === "security"&& "Cybersecurity with ASPICE for CS extensions (SEC.*), linked to MAN.3, SUP.1/9 and SWE.x gates."}
            {page === "sdv"     && "Application dev, CI/CD and containerized deployment for SDV mapped to SWE/SUP processes."}
          </motion.p>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {/* ----------- FuSa: REVERTED with images & content ----------- */}
          {page === "fusa" && (
            <PageShell>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <img src={fusaHero} alt="ISO 26262 Functional Safety Services"
                     className="w-full rounded-xl border border-gray-200 shadow-sm" />
                <Card>
                  <h3 className="text-2xl font-extrabold" style={{ color: EJAD_BLUE }}>Our Strategy</h3>
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
                <img src={fusaFootprint} alt="Safety Footprint"
                     className="w-full rounded-xl border border-gray-200 shadow-sm" />
                <Card>
                  <h3 className="text-2xl font-extrabold" style={{ color: EJAD_BLUE }}>Safety Footprint</h3>
                  <p className="mt-2">
                    <strong>16+ years</strong> applying ISO 26262 at vehicle and architecture levels
                    (ADAS, EV). Concepts for AUTOSAR, QNX, Linux embedded, AI, high-performance processors—and more.
                  </p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <img src={fusaAct1} alt="FuSa Activities Overview"
                     className="w-full rounded-xl border border-gray-200 shadow-sm" />
                <img src={fusaAct2} alt="FuSa Activities Detailed"
                     className="w-full rounded-xl border border-gray-200 shadow-sm" />
              </div>
            </PageShell>
          )}

          {/* ----------- SOTIF (ASPICE-aligned steps) ----------- */}
          {page === "sotif" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SYS.1" title="Stakeholder & ODD Needs"
                      desc="Elicit needs/assumptions; define operational design domain and safety intents."/>
                <Step n="SYS.2" title="System Requirements (SOTIF)"
                      desc="Derive SOTIF requirements incl. insufficiency mitigations and monitors."/>
                <Step n="SYS.3" title="System Architecture"
                      desc="Allocate SOTIF functions to HW/SW; define diagnostics & fallback paths."/>
                <Step n="SWE.1" title="SW Requirements"
                      desc="SW-level SOTIF reqs for perception/planning; trace to scenarios & tests."/>
                <Step n="SWE.5" title="SW Testing"
                      desc="Scenario coverage, KPIs with confidence bounds; replay/sim/track testing."/>
                <Step n="SUP.8" title="Validation & Evidence"
                      desc="Consolidate results and safety case work-products for assessment."/>
              </div>
            </PageShell>
          )}

          {/* ----------- ISO 8800 (ASPICE-bridged) ----------- */}
          {page === "iso8800" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SYS.2" title="Allocate AI Safety"
                      desc="From encompassing system to AI system & components (models/non-models)."/>
                <Step n="SWE.1" title="Data & Model Requirements"
                      desc="Dataset safety, performance targets, monitors, and acceptance criteria."/>
                <Step n="SWE.2" title="Design"
                      desc="Model boundary defenses, feature governance, and runtime hooks."/>
                <Step n="SWE.3" title="Implementation"
                      desc="Training/build pipelines with traceability; tool confidence planning (SUP.1/2)."/>
                <Step n="SWE.4/5" title="Integration & Test"
                      desc="Component verification and AI system V&V tied to scenarios & KPIs."/>
                <Step n="SUP.8" title="Operate & OTA"
                      desc="Runtime monitoring, thresholds, retraining gates, continuous assurance."/>
              </div>
            </PageShell>
          )}

          {/* ----------- Application Development (ASPICE SWE.1–6) ----------- */}
          {page === "appdev" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SWE.1" title="SW Requirements"
                      desc="Functional/non-functional reqs, interfaces, safety hooks, diagnostics."/>
                <Step n="SWE.2" title="SW Architecture & Design"
                      desc="Components, RTE interfaces, model-based design, error handling."/>
                <Step n="SWE.3" title="Implementation"
                      desc="Auto/hand code, coding standards, static analysis, unit tests."/>
                <Step n="SWE.4" title="Integration"
                      desc="Build profiles, stubs/mocks, integration tests on bench/HiL."/>
                <Step n="SWE.5" title="Testing"
                      desc="Branch/MCDC, functional & performance tests; defect management (SUP.9)."/>
                <Step n="SWE.6" title="Release"
                      desc="Release notes, evidence pack, configuration baselines (SUP.1)."/>
              </div>
            </PageShell>
          )}

          {/* ----------- ECU SW Development & Integration ----------- */}
          {page === "ecu" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SWE.2" title="Platform Design"
                      desc="MCAL/BSP, memory/clock, safety-related init; Classic/Adaptive AUTOSAR."/>
                <Step n="SWE.3" title="Implementation"
                      desc="Drivers, BSW config, ara::com, SOME/IP/DoIP, OEM extensions."/>
                <Step n="SWE.4" title="Integration"
                      desc="ECU bring-up, flashing, diagnostics, secure boot; integration tests."/>
                <Step n="SWE.5" title="Testing"
                      desc="Feature/system tests on HiL/rig; timing/stack/resource checks."/>
                <Step n="SUP.1" title="Configuration Mgmt"
                      desc="Baselines, change control, traceability to HW/SW items."/>
                <Step n="SWE.6" title="Release"
                      desc="Calibration, variant mgmt, and production hand-off."/>
              </div>
            </PageShell>
          )}

          {/* ----------- DevOps / CI-CD & Tooling ----------- */}
          {page === "devops" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="MAN.3" title="Project & Build Strategy"
                      desc="Branching, versioning, quality gates, Definition of Done."/>
                <Step n="SUP.1" title="Configuration Management"
                      desc="Artifacts, baselines, SBOMs, traceability, license governance."/>
                <Step n="SUP.8" title="Continuous Integration"
                      desc="Automated builds/tests, coverage & metrics dashboards."/>
                <Step n="SUP.2" title="Quality Assurance"
                      desc="Process audits, compliance checks, tool qualification where needed."/>
                <Step n="SUP.9" title="Problem Resolution"
                      desc="Defect workflow, RCAs, CAPAs, and trend analysis."/>
                <Step n="SWE.6" title="Release & Delivery"
                      desc="Signed artifacts, reproducible builds, evidence export."/>
              </div>
            </PageShell>
          )}

          {/* ----------- SW Testing & Validation ----------- */}
          {page === "testing" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SWE.4" title="Integration Testing"
                      desc="Module integration, interface robustness, fault injection."/>
                <Step n="SWE.5" title="SW Qualification"
                      desc="Black-box tests, coverage goals (branch/MCDC), performance/stress."/>
                <Step n="SYS.4" title="System Integration & Test"
                      desc="Vehicle/rig tests, diagnostics validation, regression packs."/>
                <Step n="SUP.8" title="Validation Evidence"
                      desc="KPIs, traceability, sign-off with objective compliance."/>
                <Step n="SUP.9" title="Defect Mgmt"
                      desc="Issue triage, RCAs, fix-verify loops, trend KPIs."/>
                <Step n="SWE.6" title="Release Readiness"
                      desc="Exit criteria, gate reviews, final approval."/>
              </div>
            </PageShell>
          )}

          {/* ----------- System Engineering ----------- */}
          {page === "systems" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SYS.1" title="Stakeholder Requirements"
                      desc="Capture needs, constraints, regulations; maintain change control."/>
                <Step n="SYS.2" title="System Requirements"
                      desc="Derive measurable, testable system requirements and interfaces."/>
                <Step n="SYS.3" title="Architecture & Allocation"
                      desc="HW/SW partitioning, safety/security allocation, ICDs."/>
                <Step n="MAN.3" title="Planning & Monitoring"
                      desc="Milestones, risks, KPIs and progress control."/>
                <Step n="SUP.1" title="Configuration/Traceability"
                      desc="End-to-end trace across reqs → design → code → tests."/>
                <Step n="ACQ.4" title="Supplier Monitoring"
                      desc="Supplier agreements, reviews, acceptance criteria."/>
              </div>
            </PageShell>
          )}

          {/* ----------- SW Quality ----------- */}
          {page === "quality" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SUP.2" title="Quality Assurance"
                      desc="Process tailoring, audits, objective evidence, compliance reports."/>
                <Step n="SUP.1" title="Configuration Management"
                      desc="Baselines, change control, release records and SBOMs."/>
                <Step n="SUP.4" title="Verification Support"
                      desc="Reviews, walkthroughs, static analysis, metrics & gate checks."/>
                <Step n="SUP.9" title="Problem Resolution"
                      desc="Nonconformance handling, CAPA, trend analysis."/>
                <Step n="SWE.6" title="Release Quality"
                      desc="Acceptance criteria, sign-off package, archive & retention."/>
                <Step n="MAN.3" title="Quality Planning"
                      desc="Plan quality goals, KPIs and continuous improvement."/>
              </div>
            </PageShell>
          )}

          {/* ----------- Cyber Security ----------- */}
          {page === "security" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SEC.1" title="TARA & Goals"
                      desc="Threat analysis & risk assessment; cybersecurity goals & claims."/>
                <Step n="SEC.2" title="CS Requirements"
                      desc="Security requirements & controls; trace to system/software."/>
                <Step n="SEC.3" title="CS Concept & Architecture"
                      desc="HSM, keys, secure boot/update, comms hardening."/>
                <Step n="SEC.4/5" title="Implementation & Verification"
                      desc="Crypto integration, secure coding, fuzzing, penetration tests."/>
                <Step n="SUP.9" title="Vulnerability Mgmt"
                      desc="Issue intake, triage, patch strategy, disclosure."/>
                <Step n="MAN.3" title="CS Management"
                      desc="Plans, roles, monitoring; link to SWE/SUP for releases."/>
              </div>
            </PageShell>
          )}

          {/* ----------- SDV Services ----------- */}
          {page === "sdv" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Step n="SWE.1–3" title="SDV App Dev"
                      desc="Rust/C++ services, APIs, framework tailoring (e.g., Velocitas)." />
                <Step n="SUP.8" title="CI/CD Automation"
                      desc="Pipelines, code quality metrics, automated tests, quality gates." />
                <Step n="SWE.6" title="Containerized Delivery"
                      desc="Docker/OCI packaging, orchestration, rollout & monitoring." />
              </div>
            </PageShell>
          )}

        </AnimatePresence>

        {/* Shared Services */}
        <section id="services" className="py-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: EJAD_BLUE }}>
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card title="Gap Assessment">
              Map practice to <span style={{ color: EJAD_BLUE }}>ISO 26262</span>,{" "}
              <span style={{ color: EJAD_BLUE }}>ISO 21448</span>,{" "}
              <span style={{ color: EJAD_BLUE }}>ISO 8800</span> and ASPICE. Action plan with prioritized gates & artifacts.
            </Card>
            <Card title="Data & Scenario Pipeline">
              Governance, labeling QA, gold sets, ODD-aligned catalogs and coverage dashboards.
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
