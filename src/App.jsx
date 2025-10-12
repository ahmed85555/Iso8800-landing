import React, { useEffect } from "react"
import { motion } from "framer-motion"

const stages = [
  { title: "AI Item & ODD", desc: "Define function, interfaces, and ODD with safety goals tied to boundaries." },
  { title: "Data Governance", desc: "Spec → collect → label → version; prove representativeness vs ODD." },
  { title: "Model Development", desc: "Reproducible training, HP registry, anti-shortcut strategies." },
  { title: "Scenario & Coverage", desc: "ODD-aligned catalog, boundary bins, measurable coverage KPIs." },
  { title: "Robustness & V&V", desc: "Stress (noise/blur/weather), OOD & uncertainty metrics, regression-free." },
  { title: "Runtime Monitoring", desc: "Health & OOD detectors, confidence gating, safe-state/MRM." },
  { title: "Change & OTA", desc: "Retraining classes, staged rollout & rollback, requalification gates." },
  { title: "AI Safety Case", desc: "GSN argument with traceability from requirements → evidence." },
]

function Badge({ children }) {
  return <span className="px-2 py-1 rounded-full bg-white/70 backdrop-blur text-gray-700 text-xs border border-white/60">{children}</span>
}

function Stat({ value, label }) {
  return (
    <div className="p-4 rounded-2xl bg-white/70 border border-white/60 shadow-sm">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "ISO 8800 AI Safety for Automotive",
      description: "Consulting and implementation services to operationalize ISO/PAS 8800 with ISO 26262 & SOTIF.",
      areaServed: "Global",
      serviceType: ["AI Safety Engineering", "SOTIF & Functional Safety", "Runtime Monitoring & OTA Governance"],
    })
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-sky-50 via-white to-white">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="font-bold tracking-tight">ISO 8800 Automotive</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#process" className="hover:underline">Process</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#case" className="hover:underline">Case Study</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="#contact" className="px-3 py-1.5 rounded-lg bg-gray-900 text-white">Talk to us</a>
          </nav>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-70" aria-hidden>
          <div className="absolute -top-28 left-1/3 w-96 h-96 bg-sky-200 rounded-full" />
          <div className="absolute top-24 -left-20 w-72 h-72 bg-indigo-200 rounded-full" />
          <div className="absolute -bottom-24 right-10 w-80 h-80 bg-emerald-200 rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Operationalize <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">ISO 8800</span> for AI‑enabled automotive systems
          </motion.h1>
          <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.6}} className="mt-4 text-lg text-gray-700 max-w-3xl">
            We help Tier‑1 suppliers and OEMs turn the ISO/PAS 8800 guidance into a concrete, auditable safety pipeline that integrates with ISO 26262 and SOTIF.
          </motion.p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>26262 V‑model aligned</Badge>
            <Badge>ODD → Data → Model → Tests → Runtime</Badge>
            <Badge>Evidence‑driven safety case</Badge>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold">Book a discovery call</a>
            <a href="#process" className="px-5 py-3 rounded-xl border border-gray-300 bg-white font-semibold">See the process</a>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat value="90%+" label="ODD coverage before release" />
            <Stat value=">=0.9" label="OOD AUROC runtime monitors" />
            <Stat value="0" label="Safety KPI regressions at gates" />
            <Stat value="4–8 wks" label="Typical pilot timeline" />
          </div>
        </div>
      </section>

      <section id="process" className="py-14 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our ISO 8800 Safety Loop</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">A closed loop where requirements drive data, models, scenarios, robustness tests, runtime monitors, and controlled OTAs—all rolling into a living AI Safety Case.</p>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {stages.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.02*i}} className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
                <div className="text-xs font-semibold text-gray-500">{String(i+1).padStart(2,'0')}</div>
                <div className="font-semibold mt-1">{s.title}</div>
                <div className="text-sm text-gray-600 mt-1">{s.desc}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm">
            <span className="font-semibold">Release gates:</span> coverage ≥ 90%, robustness drop ≤ 20%, OOD AUROC ≥ 0.9, and no safety KPI regressions.
          </div>
        </div>
      </section>

      <section id="services" className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Services for Tier‑1s & OEMs</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
              <div className="font-semibold">ISO 8800 Gap Assessment</div>
              <p className="text-sm text-gray-600 mt-1">Map your current 26262/SOTIF practice to 8800. Produce an action plan with prioritized gates and artifacts.</p>
            </div>
            <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
              <div className="font-semibold">Data & Scenario Pipeline</div>
              <p className="text-sm text-gray-600 mt-1">Set up data governance, labeling QA, gold sets, and ODD‑aligned scenario catalogs (incl. boundary/long‑tail).</p>
            </div>
            <div className="rounded-2xl p-5 border border-gray-200 bg-white shadow-sm">
              <div className="font-semibold">Runtime & OTA Governance</div>
              <p className="text-sm text-gray-600 mt-1">Design monitors, thresholds, and retraining/OTA requalification to maintain safety post‑deployment.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="case" className="py-14 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Mini Case Study</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">L2 highway assistant with camera‑based lane detection + map corroboration. Night construction zones caused false lanes (cones/tape).</p>
          <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-gray-800 list-disc list-inside">
            <li>Added synthetic cones/tape data & targeted mining from field logs.</li>
            <li>Trained FP‑minimizing head; added temporal consistency OOD monitor.</li>
            <li>Adjusted fusion disagreement threshold with map corroboration.</li>
            <li><span className="font-semibold">Results:</span> FP ↓ 56%, OOD AUROC 0.92→0.95, field complaints ↓ 73%.</li>
          </ul>
          <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm">All changes passed requalification gates; safety case updated with new evidence nodes.</div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="rounded-3xl p-6 md:p-10 border border-gray-200 bg-gradient-to-br from-white to-sky-50">
            <h3 className="text-xl md:text-2xl font-bold">Ready to pilot ISO 8800 in 4–8 weeks?</h3>
            <p className="text-gray-700 mt-2">Start with a gap assessment and a small, measurable AI item (e.g., lane detection or DMS). We’ll deliver artifacts, gates, and a mini safety case.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#contact" className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold">Get a proposal</a>
              <a href="#faq" className="px-5 py-3 rounded-xl border border-gray-300 bg-white font-semibold">See FAQs</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-14 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">FAQs</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <div className="font-semibold">Does ISO 8800 replace ISO 26262 or SOTIF?</div>
              <p className="text-gray-700 mt-1">No—8800 complements them with AI‑specific activities, artifacts, and evidence expectations.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <div className="font-semibold">What’s a good first pilot?</div>
              <p className="text-gray-700 mt-1">A bounded AI item like lane detection or driver monitoring with clear ODD and measurable KPIs.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <div className="font-semibold">Can you work with our existing toolchain?</div>
              <p className="text-gray-700 mt-1">Yes—whether you use MLflow, DVC/LakeFS, CARLA/esmini, or in‑house tools, we integrate via evidence packs.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <div className="font-semibold">How do you handle OTA updates?</div>
              <p className="text-gray-700 mt-1">We define retraining classes, requalification triggers, shadowing, staged rollout, and rollback—then update the safety case.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Contact</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">Tell us about your AI item, target ASIL, and current 26262/SOTIF status. We’ll come back with a short plan and timeline.</p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <form className="rounded-2xl border border-gray-200 p-5 bg-white shadow-sm" onSubmit={(e)=>{e.preventDefault(); window.location.href='mailto:hello@example.com?subject=ISO%208800%20Pilot&body=Tell%20us%20about%20your%20AI%20item%20and%20ODD...'}}>
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Name" className="border border-gray-300 rounded-lg px-3 py-2" />
                <input required type="email" placeholder="Work email" className="border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <input placeholder="Company (Tier‑1/OEM)" className="border border-gray-300 rounded-lg px-3 py-2 mt-3 w-full" />
              <textarea placeholder="Your AI item, ASIL target, ODD highlights" className="border border-gray-300 rounded-lg px-3 py-2 mt-3 w-full h-28" />
              <button className="mt-4 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold">Request proposal</button>
              <p className="text-xs text-gray-500 mt-2">This opens your mail client with pre-filled details (no backend needed).</p>
            </form>
            <div className="rounded-2xl border border-gray-200 p-5 bg-white shadow-sm">
              <div className="font-semibold">What to prepare</div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                <li>Brief item definition and ODD outline</li>
                <li>Any existing KPIs, gold sets, or monitors</li>
                <li>Release cadence and OTA constraints</li>
              </ul>
              <div className="mt-4 text-sm text-gray-600">Prefer WhatsApp/Teams? Add it in the message—we’ll follow up there.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-gray-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} ISO 8800 Automotive Safety</div>
          <div className="flex gap-4">
            <a href="#process" className="hover:underline">Process</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
