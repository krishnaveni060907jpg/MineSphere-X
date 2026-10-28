import {
  Brain, FileCheck2, Activity, RotateCcw, Unlink, Clock, FileX, WifiOff, FileWarning, Search, TrendingUp,
  CheckCircle2, Camera, Gauge, ClipboardList, ShieldCheck, Cpu, Microscope, Link2, UserCheck, Wrench,
  Eye, ListOrdered, Users, ScanSearch, Radio, Thermometer, Wind, Nfc, Cog, Bell, Server, Database, Monitor, ArrowRight, ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SafeImage, IconBadge } from "./Shared";
import hero from "@/assets/hero-mine.jpg";
import workers from "@/assets/workers.jpg";
import iot from "@/assets/iot-prototype.jpg";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-16 sm:px-6">
      <SafeImage src={hero} alt="Open-pit mine with conveyor equipment at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto w-full max-w-6xl py-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">AI + Industrial IoT | College Innovation Prototype</span>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            Fix the Hazard.<br /><span className="text-gradient">Prevent Its Return.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">AI-powered mine safety that learns from past hazards, predicts recurrence risk, and helps teams verify corrective actions.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" variant="hero" asChild><a href="#solution">Explore Our Solution</a></Button>
            <Button size="lg" variant="glass" asChild><a href="#contact">Request a Demo</a></Button>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[{ i: Brain, t: "AI-Powered Risk Prediction" }, { i: FileCheck2, t: "Evidence-Based Closure Review" }, { i: Activity, t: "Sensor-Supported Verification" }].map(({ i: I, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-border bg-card/60 p-3 backdrop-blur">
                <I className="h-5 w-5 shrink-0 text-accent" /><span className="text-sm font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const problems = [
  { i: RotateCcw, t: "Hazards Recur", d: "Previously repaired hazards can return when root causes remain." },
  { i: Unlink, t: "Disconnected History", d: "Historical hazard reports are often difficult to connect." },
  { i: Clock, t: "Delayed Action", d: "Late corrective actions can increase operational risk." },
  { i: FileX, t: "Missing Evidence", d: "Without repair evidence, verification becomes difficult." },
  { i: WifiOff, t: "Isolated Sensor Data", d: "Disconnected sensor data creates uncertainty about repairs." },
];

export function Problem() {
  return (
    <Section id="problem" eyebrow="The Problem" title="One Repair Is Not Always the End of the Problem.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {problems.map(({ i: I, t, d }) => (
          <div key={t} className="card-surface p-6"><IconBadge><I className="h-5 w-5" /></IconBadge>
            <h3 className="font-semibold text-foreground">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
        ))}
      </div>
    </Section>
  );
}

const flow = [
  { i: FileWarning, t: "Report a Hazard" }, { i: Search, t: "Analyze History" }, { i: TrendingUp, t: "Predict Recurrence" },
  { i: UserCheck, t: "Approve Corrective Action" }, { i: FileCheck2, t: "Review Evidence" }, { i: Activity, t: "Monitor Follow-Up" },
];

export function Solution() {
  return (
    <Section id="solution" alt eyebrow="Our Solution" title="One Platform. The Full Hazard Lifecycle." intro="MineSphere-X connects hazard reporting, historical records, AI predictions, corrective actions, and sensor observations in one place.">
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-start">
        {flow.map(({ i: I, t }, idx) => (
          <li key={t} className="flex flex-1 flex-col items-center md:flex-row md:items-start">
            <div className="flex w-full flex-row items-center gap-4 md:flex-col md:text-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand shadow-glow"><I className="h-6 w-6 text-primary-foreground" /></div>
              <div><p className="text-xs text-accent">Step {idx + 1}</p><p className="text-sm font-semibold text-foreground">{t}</p></div>
            </div>
            {idx < flow.length - 1 && (<>
              <ArrowDown className="my-2 h-5 w-5 self-start text-primary md:hidden ml-4" />
              <ArrowRight className="mt-4 hidden h-5 w-5 shrink-0 text-primary md:block" />
            </>)}
          </li>
        ))}
      </ol>
    </Section>
  );
}

const features = [
  { i: Camera, t: "Intelligent Hazard Reporting", d: "Workers submit reports with equipment details, severity, descriptions, photographs, and timestamps." },
  { i: Brain, t: "AI Recurrence Prediction", d: "A proposed Random Forest model estimates whether a similar hazard may recur within 30 days." },
  { i: Gauge, t: "Hazard Echo Score", d: "An illustrative 0–100 risk score with a Data Confidence indicator and understandable reasons." },
  { i: ClipboardList, t: "Corrective-Action Management", d: "Track assignments, deadlines, overdue tasks, escalation, and human approval." },
  { i: ShieldCheck, t: "Closure Quality Index", d: "Scores closures on evidence, reviewer approval, timely completion, and scheduled follow-up." },
  { i: Cpu, t: "Sensor-Supported Verification", d: "An ESP32 prototype with a vibration sensor helps assess whether a simulated conveyor repair holds. Missing or stale readings show as unknown." },
  { i: Microscope, t: "Recurrence Autopsy", d: "Compares recurring hazards with previous closure records to surface weaknesses in earlier corrective actions." },
];

export function Features() {
  return (
    <Section id="features" eyebrow="Key Features" title="Built for Accountable Prevention">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ i: I, t, d }, n) => (
          <div key={t} className={`card-surface p-6 ${n === 6 ? "lg:col-span-3 lg:flex lg:items-center lg:gap-6" : ""}`}>
            <IconBadge><I className="h-5 w-5" /></IconBadge>
            <div><h3 className="font-semibold text-foreground">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const steps = [
  { i: Camera, d: "A worker reports a hazard and uploads a photograph." },
  { i: Link2, d: "The system links similar historical reports." },
  { i: Brain, d: "The AI estimates recurrence risk and explains contributing factors." },
  { i: UserCheck, d: "A safety officer reviews and approves corrective actions." },
  { i: Wrench, d: "Maintenance uploads evidence; sensor readings help assess the repair." },
];

export function HowItWorks() {
  return (
    <Section id="how" alt eyebrow="How It Works" title="Five Steps From Report to Verified Repair">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <SafeImage src={workers} alt="Mine workers in PPE inspecting a conveyor belt" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-glow" />
        <ol className="relative space-y-6 border-l border-primary/40 pl-8">
          {steps.map(({ i: I, d }, n) => (
            <li key={n} className="relative">
              <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-primary-foreground">{n + 1}</span>
              <div className="card-surface flex items-start gap-3 p-4"><I className="mt-0.5 h-5 w-5 shrink-0 text-accent" /><p className="text-sm text-foreground">{d}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

const hardware = [
  { i: Cpu, t: "ESP32", d: "Collects and transmits prototype sensor readings." },
  { i: Activity, t: "MPU6050", d: "Supports vibration and motion measurements." },
  { i: Thermometer, t: "DHT22", d: "Measures temperature and humidity." },
  { i: Wind, t: "MQ-series gas sensor", d: "Provides experimental gas-related readings." },
  { i: Nfc, t: "RC522 RFID", d: "Identifies tagged equipment." },
  { i: Cog, t: "Small DC motor", d: "Simulates conveyor vibration." },
  { i: Bell, t: "LED / buzzer", d: "Provides an advisory indication." },
];
const arch = [{ i: Radio, t: "Sensors" }, { i: Cpu, t: "ESP32" }, { i: WifiOff, t: "Wi-Fi" }, { i: Server, t: "Backend API" }, { i: Database, t: "Database" }, { i: Monitor, t: "Dashboard" }];

export function Hardware() {
  return (
    <Section id="technology" eyebrow="Hardware & Industrial IoT" title="A Hands-On Sensor Prototype" intro="A bench-scale setup that simulates a conveyor and streams prototype readings.">
      <div className="grid gap-10 lg:grid-cols-2">
        <SafeImage src={iot} alt="ESP32 IoT prototype with sensors and a mini conveyor" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full rounded-2xl border border-border object-cover" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {hardware.map(({ i: I, t, d }) => (
            <li key={t} className="card-surface flex gap-3 p-4"><I className="h-5 w-5 shrink-0 text-accent" /><div><p className="text-sm font-semibold text-foreground">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div></li>
          ))}
        </ul>
      </div>
      <div className="mt-12 card-surface p-6">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">System Architecture</p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          {arch.map(({ i: I, t }, n) => (
            <div key={t} className="flex flex-col items-center md:flex-row">
              <div className="flex w-36 flex-col items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 p-3"><I className="h-5 w-5 text-accent" /><span className="text-sm font-medium text-foreground">{t === "Dashboard" ? "MineSphere-X Dashboard" : t}</span></div>
              {n < arch.length - 1 && (<><ArrowDown className="my-1 h-4 w-4 text-primary md:hidden" /><ArrowRight className="mx-1 hidden h-4 w-4 text-primary md:block" /></>)}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const ai = [
  "Generate and validate synthetic historical hazard data.",
  "Compare a rule-based baseline, Logistic Regression, Random Forest, and Gradient Boosting.",
  "Predict recurrence within a configurable 30-day window.",
  "Use SHAP to explain each model prediction.",
  "Evaluate precision, recall, F1-score, confusion matrix, and false-alert rate.",
  "Retrain only with verified outcomes; approve new model versions before deployment.",
];

export function AISection() {
  return (
    <Section id="ai" alt eyebrow="Artificial Intelligence" title="A Transparent, Proposed AI Pipeline" intro="The model and its predictions are proposed and simulated. No accuracy results are claimed until a model is trained and evaluated.">
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ai.map((t, n) => (
          <li key={t} className="card-surface p-5"><span className="text-3xl font-bold text-gradient font-display">0{n + 1}</span><p className="mt-2 text-sm text-foreground">{t}</p></li>
        ))}
      </ol>
    </Section>
  );
}

export function Benefits() {
  const b = [
    { i: Eye, t: "Better visibility into recurring hazards" },
    { i: ListOrdered, t: "More informed inspection priorities" },
    { i: Users, t: "Improved corrective-action accountability" },
    { i: ScanSearch, t: "More systematic repair verification" },
  ];
  return (
    <Section id="benefits" eyebrow="Benefits" title="From Repeated Repairs to Smarter Prevention.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {b.map(({ i: I, t }) => (<div key={t} className="card-surface p-6 text-center"><div className="flex justify-center"><IconBadge><I className="h-5 w-5" /></IconBadge></div><p className="font-semibold text-foreground">{t}</p></div>))}
      </div>
    </Section>
  );
}

export function SDG() {
  const s = [
    { n: "8", t: "Decent Work and Economic Growth", d: "Primary alignment: supports safer working conditions by helping teams address recurring workplace hazards.", c: "bg-destructive", primary: true },
    { n: "9", t: "Industry, Innovation and Infrastructure", d: "Applies AI and industrial IoT to strengthen the reliability of mining infrastructure.", c: "bg-warning" },
    { n: "16", t: "Peace, Justice and Strong Institutions", d: "Encourages accountable, evidence-based decisions through transparent closure records.", c: "bg-primary" },
  ];
  return (
    <Section id="sdg" alt eyebrow="SDG Alignment" title="Aligned With Sustainable Development Goals" intro="SDG-inspired accents; this project is not endorsed by the United Nations.">
      <div className="grid gap-5 md:grid-cols-3">
        {s.map((x) => (
          <div key={x.n} className={`card-surface overflow-hidden ${x.primary ? "ring-2 ring-accent/60" : ""}`}>
            <div className={`h-1.5 ${x.c}`} />
            <div className="p-6">
              <div className="flex items-center gap-3"><span className={`flex h-12 w-12 items-center justify-center rounded-lg ${x.c} font-display text-xl font-bold text-primary-foreground`}>{x.n}</span>
                {x.primary && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">Primary</span>}</div>
              <h3 className="mt-4 font-semibold text-foreground">SDG {x.n} — {x.t}</h3><p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  const rows = [["Project Name", "MineSphere-X"], ["Project ID", "SEC26ITSO144"], ["Project Domain", "Artificial Intelligence"], ["Project Type", "College Innovation Prototype"]];
  return (
    <Section id="about" eyebrow="About the Project" title="MineSphere-X: Predictive Intelligence for Mine Safety">
      <div className="grid gap-6 md:grid-cols-2">
        <dl className="card-surface divide-y divide-border">
          {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 p-4"><dt className="text-sm text-muted-foreground">{k}</dt><dd className="text-sm font-semibold text-foreground">{v}</dd></div>))}
        </dl>
        <div className="card-surface flex flex-col justify-center p-8">
          <CheckCircle2 className="mb-4 h-8 w-8 text-accent" />
          <h3 className="text-xl font-semibold text-foreground">Mission</h3>
          <p className="mt-3 text-muted-foreground">To support proactive mine safety through predictive intelligence, accountable corrective actions, and sensor-supported verification.</p>
        </div>
      </div>
    </Section>
  );
}
