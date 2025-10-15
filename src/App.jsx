import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Brand */
const EJAD_BLUE = "#143D8D";
const EJAD_RED  = "#E61E62";

/* Functional Safety images (keep as before) */
import fusaHero      from "./assets/fusa-hero.PNG?url";
import fusaFootprint from "./assets/fusa-footprint.PNG?url";
import fusaAct1      from "./assets/fusa-activities-1.PNG?url";
import fusaAct2      from "./assets/fusa-activities-2.PNG?url";

/* SDV page images (add these three files to src/assets/) */
import sdvApp     from "./assets/sdv-app.PNG?url";
import sdvCi      from "./assets/sdv-ci.PNG?url";
import sdvDeploy  from "./assets/sdv-deploy.PNG?url";

/* UI atoms */
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

const Box = ({ title, points = [], highlight }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5">
    <div className="font-semibold">{title}</div>
    <ul className="mt-2 list-disc pl-5 space-y-1">
      {points.map((p, i) => <li key={i}>{p}</li>)}
    </ul>
    {highlight && <p className="mt-3 text-sm text-emerald-700">{highlight}</p>}
  </div>
);

export default function App() {
  const PAGES = [
    "fusa", "sotif", "iso8800",
    "appdev", "ecu", "devops",
    "testing", "systems", "quality",
    "security", "sdv"
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
            <Tab id="sotif" label="SOTIF" />
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
            {page === "sotif"   && (<><span style={{color:EJAD_BLUE}}>SOTIF</span> <span style={{color:EJAD_RED}}>Services</span></>)}
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
            {page === "sotif"   && "We turn SOTIF into a practical program: scenarios, sensor capability analysis, requirements, and measurable validation for ADAS and DMS."}
            {page === "iso8800" && "A complete AI safety service—dataset governance, model boundary protections, runtime monitoring and OTA re-qualification."}
            {page === "appdev"  && "ECU application logic with model-based design across AUTOSAR & non-AUTOSAR platforms."}
            {page === "ecu"     && "Complete ECU software integration—Classic & Adaptive AUTOSAR, application and OEM extensions."}
            {page === "devops"  && "Build pipelines, dashboards, code quality automation, and metrics at scale."}
            {page === "testing" && "Unit, integration, system qualification, fault injection and conformance verification."}
            {page === "systems" && "Requirements, architecture, documentation and full traceability ownership."}
            {page === "quality" && "Quality assurance per industry standards with actionable reviews and audits."}
            {page === "security"&& "Cybersecurity analysis and implementation—TARA, HSM development and secure stack integration."}
            {page === "sdv"     && "SDV application development, DevOps CI/CD, and containerized deployment with the platforms you use."}
          </motion.p>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {/* -------- Functional Safety (unchanged, with images) -------- */}
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

          {/* -------- SOTIF Services -------- */}
          {page === "sotif" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "SOTIF scenario identification & catalogs for ADAS systems",
                    "Sensor capability analysis to expose functional limitations",
                    "SOTIF requirements at system & component level",
                    "Trigger-condition design and scenario injection for testing",
                    "Use cases: DMS & Front Camera",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Start from item assumptions & ODD to map SOTIF goals",
                    "Tie scenarios to requirements, tests and KPIs",
                    "Execute replay/sim/track campaigns",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Improved unsafe-event prevention via targeted monitors",
                    "Scenario coverage reports your auditors can trust",
                    "Clear evidence packs for safety reviews",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- ISO 8800 (AI Safety) Services -------- */}
          {page === "iso8800" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Model boundary analysis & safeguards for inputs/outputs",
                    "Dataset selection & governance during learning",
                    "Field testing dataset criteria & runtime monitors",
                    "OTA re-qualification and continuous assurance",
                    "Tool confidence for AI frameworks and data tooling",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Start from item → AI system → AI components",
                    "Define ODD & performance targets with KPIs",
                    "Build traceable pipelines from data to deployment",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Stable KPIs at safety gates with no regression at release",
                    "Faster model iterations with preserved compliance evidence",
                    "Audit-ready safety case artifacts",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- Application Development -------- */}
          {page === "appdev" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "ECU application logic development",
                    "Model-based design (Simulink/Stateflow or code-first)",
                    "Autosar & Non-Autosar applications",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Requirements capture & interface design",
                    "RTE/diagnostics/NVM integration with safety hooks",
                    "Static analysis & unit testing in CI",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Rapid feature delivery with consistent quality",
                    "Clean hand-off to platform teams",
                    "Reduced debug cycle time through early testing",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- ECU SW Development & Integration -------- */}
          {page === "ecu" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Complete ECU software integration",
                    "Classic & Adaptive AUTOSAR configuration",
                    "Application & OEM extensions integration",
                    "Secure boot, flashing, diagnostics bring-up",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "MCAL/BSP, memory/clock & driver setup",
                    "ara::com, SOME/IP/DoIP, network & diagnostics",
                    "Integration tests on bench & HiL",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Predictable boot & runtime performance",
                    "Robust memory/stack usage & timing",
                    "Frictionless production release",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- DevOps — CI/CD & Tooling -------- */}
          {page === "devops" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Build-automation pipeline design",
                    "Front-end dashboards for metrics/quality",
                    "Metrics/Build statistics & automatic merge to main",
                    "Automated code-quality & policy gates",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Artifact retention, SBOMs & traceability",
                    "Scalable runners and cache strategy",
                    "Security scanning and release sign-off",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Shorter lead time for changes",
                    "Consistent releases with repeatable builds",
                    "Clear visibility across teams",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- SW Testing & Validation -------- */}
          {page === "testing" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Unit & integration testing (branch/MCDC coverage)",
                    "System qualification & black-box testing",
                    "Fault-injection campaigns",
                    "OEM conformance verification",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Test design tied to requirements & risks",
                    "Continuous execution in CI/HiL",
                    "Defect triage with root-cause analysis",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Higher defect detection before vehicle tests",
                    "Actionable quality dashboards",
                    "Gate-ready evidence packages",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- System Engineering -------- */}
          {page === "systems" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "HW & SW requirements analysis",
                    "Functional ownership & documentation",
                    "Bidirectional traceability",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Stakeholder needs → measurable specs",
                    "Architecture & interface definitions",
                    "Controlled change process and reviews",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Aligned teams with fewer late surprises",
                    "Clear design baselines & evidence",
                    "Faster reviews and approvals",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- SW Quality -------- */}
          {page === "quality" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Quality assurance & audits (ASPICE / ISO 9001)",
                    "Implementing & reviewing software standards",
                    "Process coaching and gap closure",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Tailored process assets and checklists",
                    "Objective audits and improvement plans",
                    "Release quality gates & sign-off",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Higher audit pass rates",
                    "Reduced rework through earlier review",
                    "Consistent, documented releases",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- Cyber Security -------- */}
          {page === "security" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-4">
                <Box
                  title="Services"
                  points={[
                    "Cybersecurity analysis per TARA",
                    "HSM development & secure boot/update",
                    "Secure stack integration",
                  ]}
                />
                <Box
                  title="How We Work"
                  points={[
                    "Threat modeling & risk treatment mapping",
                    "Crypto, keys, and policy enforcement",
                    "Pen-testing, fuzzing and vulnerability mgmt",
                  ]}
                />
                <Box
                  title="Achievements"
                  points={[
                    "Hardened ECUs with traceable controls",
                    "Repeatable response to vulnerabilities",
                    "Security evidence for audits",
                  ]}
                />
              </div>
            </PageShell>
          )}

          {/* -------- eJad SDV Services (with your images) -------- */}
          {page === "sdv" && (
            <PageShell>
              <div className="grid md:grid-cols-3 gap-6 items-start">
                <div className="space-y-4">
                  <h3 className="font-semibold" style={{ color: EJAD_BLUE }}>SDV Application Development</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Application development using Rust / C++</li>
                    <li>Velocitas development framework tailoring</li>
                    <li>Runtime OS deployment (Ankaios, ThreadX, …)</li>
                  </ul>
                  <img src={sdvApp} alt="SDV Application Development" className="w-full rounded-xl border border-gray-200 shadow-sm" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold" style={{ color: EJAD_BLUE }}>DevOps CI/CD</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Build-automation pipeline design</li>
                    <li>Front-end dashboards for visibility</li>
                    <li>Metrics/Build statistics & auto-merge to main</li>
                    <li>Automated metrics and code quality gates</li>
                  </ul>
                  <img src={sdvCi} alt="DevOps CI/CD" className="w-full rounded-xl border border-gray-200 shadow-sm" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold" style={{ color: EJAD_BLUE }}>Containerization & Deployment</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Automation & streamlining of deployment processes</li>
                    <li>Docker-based deployment, scaling, updates & monitoring</li>
                    <li>Orchestration of containerized apps</li>
                  </ul>
                  <img src={sdvDeploy} alt="Containerization & Deployment" className="w-full rounded-xl border border-gray-200 shadow-sm" />
                </div>
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
              <span style={{ color: EJAD_BLUE }}>ISO 8800</span>. Action plan with prioritized gates & artifacts.
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
