import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Database, AlertTriangle, FileText, ClipboardList, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Shared";
import { demoReports, categoryData, trendData, demoMetrics, demoSensors, type Severity, type SensorStatus } from "@/data/demo";

const sevClass: Record<Severity, string> = {
  Low: "bg-success/15 text-success", Medium: "bg-warning/15 text-warning", High: "bg-chart-4/15 text-destructive", Critical: "bg-destructive text-destructive-foreground",
};
const sensorClass: Record<SensorStatus, string> = { Normal: "text-success", Abnormal: "text-destructive", Unknown: "text-muted-foreground" };
const tip = { contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--foreground)" } };

function Ring({ value, label }: { value: number; label: string }) {
  const c = 2 * Math.PI * 40;
  return (
    <div className="card-surface flex items-center gap-4 p-5">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--muted)" strokeWidth="10" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div><p className="font-display text-3xl font-bold text-foreground">{value}<span className="text-base text-muted-foreground">/100</span></p><p className="text-sm text-muted-foreground">{label}</p><p className="text-xs text-muted-foreground">Sample value</p></div>
    </div>
  );
}

export function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const stats = [
    { i: FileText, l: "Total Hazard Reports", v: demoMetrics.totalReports },
    { i: ClipboardList, l: "Open Corrective Actions", v: demoMetrics.openActions },
    { i: ShieldAlert, l: "High-Risk Hazards", v: demoMetrics.highRisk },
    { i: CheckCircle2, l: "Verified Closures", v: demoMetrics.verifiedClosures },
  ];
  return (
    <Section id="demo" alt eyebrow="Interactive Demo" title="Explore the Demo Dashboard" intro="Load clearly identified sample records to see how MineSphere-X presents hazard intelligence.">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-lg border border-warning/50 bg-warning/10 p-4 sm:flex-row">
        <p className="flex items-center gap-2 text-sm font-semibold text-warning"><AlertTriangle className="h-4 w-4" />DEMONSTRATION DATA — NOT LIVE MINE DATA</p>
        <Button variant="hero" onClick={() => setLoaded(true)} disabled={loaded}><Database className="h-4 w-4" />{loaded ? "Demo Data Loaded" : "Load Demo Data"}</Button>
      </div>
      {!loaded ? (
        <div className="card-surface flex h-72 flex-col items-center justify-center gap-3 text-center text-muted-foreground"><Database className="h-10 w-10" />Press “Load Demo Data” to populate the dashboard with sample records.</div>
      ) : (
        <div className="space-y-5 animate-fade-up">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ i: I, l, v }) => (<div key={l} className="card-surface p-5"><I className="h-5 w-5 text-accent" /><p className="mt-3 font-display text-3xl font-bold text-foreground">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div>))}
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="card-surface p-5"><h3 className="mb-4 font-semibold text-foreground">Hazard Categories</h3>
              <ResponsiveContainer width="100%" height={240}><BarChart data={categoryData}><XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip {...tip} cursor={{ fill: "var(--muted)" }} /><Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
            <div className="card-surface p-5"><h3 className="mb-4 font-semibold text-foreground">Illustrative Hazard Trend</h3>
              <ResponsiveContainer width="100%" height={240}><LineChart data={trendData}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} /><YAxis stroke="var(--muted-foreground)" fontSize={12} /><Tooltip {...tip} /><Legend /><Line dataKey="reports" name="Reports" stroke="var(--primary)" strokeWidth={2} /><Line dataKey="recurring" name="Recurring" stroke="var(--accent)" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <Ring value={demoMetrics.echoScore} label="Hazard Echo Score" />
            <Ring value={demoMetrics.closureQuality} label="Closure Quality Index" />
            <div className="card-surface p-5"><h3 className="mb-3 font-semibold text-foreground">Sensor Panel (simulated)</h3>
              <ul className="space-y-2">{demoSensors.map((s) => (<li key={s.equipment} className="flex items-start justify-between gap-2 text-sm"><div><p className="text-foreground">{s.equipment}</p><p className="text-xs text-muted-foreground">{s.note}</p></div><span className={`font-semibold ${sensorClass[s.status]}`}>{s.status}</span></li>))}</ul></div>
          </div>
          <div className="card-surface overflow-x-auto p-5"><h3 className="mb-4 font-semibold text-foreground">Recent Hazard Reports (sample)</h3>
            <table className="w-full min-w-[560px] text-left text-sm"><thead className="text-muted-foreground"><tr>{["ID", "Date", "Equipment", "Category", "Severity", "Status"].map((h) => <th key={h} className="pb-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">{demoReports.map((r) => (<tr key={r.id} className="text-foreground"><td className="py-3 font-mono text-xs">{r.id}</td><td>{r.date}</td><td>{r.equipment}</td><td>{r.category}</td><td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${sevClass[r.severity]}`}>{r.severity}</span></td><td className="text-muted-foreground">{r.status}</td></tr>))}</tbody></table></div>
        </div>
      )}
    </Section>
  );
}
