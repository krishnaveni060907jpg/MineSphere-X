import { useState } from "react";
import { CheckCircle2, Info, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./Shared";
import { Logo, navLinks } from "./Navbar";

type Fields = { name: string; organization: string; email: string; message: string };
const empty: Fields = { name: "", organization: "", email: "", message: "" };

export function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.organization.trim().length < 2) e.organization = "Please enter your organization.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email.";
  if (f.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

export function Contact() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [done, setDone] = useState(false);
  const endpoint = import.meta.env["VITE_CONTACT_API_URL"] as string | undefined;
  const [sendError, setSendError] = useState("");

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(f); setErrors(e); setSendError("");
    if (Object.keys(e).length) return;
    if (endpoint) {
      try {
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
        if (!r.ok) throw new Error();
      } catch { setSendError("We couldn't send your request. Please try again."); return; }
    }
    setDone(true); setF(empty);
  }
  const input = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const field = (k: keyof Fields, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      {k === "message"
        ? <textarea id={k} rows={4} className={input} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errors[k]} />
        : <input id={k} type={type} className={input} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errors[k]} />}
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );
  return (
    <Section id="contact" eyebrow="Contact" title="Let's Build Safer Mining Operations Together." intro="Interested in our innovation? Contact our team to discuss the prototype or arrange a demonstration.">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-surface space-y-4 p-6 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-warning">Placeholders — team to replace</p>
          {[{ i: Mail, t: "[Team email address]" }, { i: Phone, t: "[Team phone number]" }, { i: MapPin, t: "[College name & address]" }].map(({ i: I, t }) => (
            <p key={t} className="flex items-center gap-3 text-sm text-muted-foreground"><I className="h-4 w-4 text-accent" />{t}</p>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="card-surface space-y-4 p-6 lg:col-span-3">
          {done ? (
            <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <p className="text-lg font-semibold text-foreground">Thank you — your request was captured.</p>
              {!endpoint && <p className="max-w-sm text-sm text-muted-foreground">This form is a frontend demonstration. No message was delivered because no email service is connected yet.</p>}
              <Button variant="glass" type="button" onClick={() => setDone(false)}>Send another</Button>
            </div>
          ) : (<>
            <div className="grid gap-4 sm:grid-cols-2">{field("name", "Name")}{field("organization", "Organization")}</div>
            {field("email", "Email", "email")}{field("message", "Message")}
            {sendError && <p className="text-sm text-destructive">{sendError}</p>}
            {!endpoint && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Info className="h-3.5 w-3.5" />Frontend demonstration — messages are not sent.</p>}
            <Button type="submit" variant="hero" size="lg" className="w-full">Request a Demo</Button>
          </>)}
        </form>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><Logo /><p className="mt-3 text-sm text-muted-foreground">Fix the Hazard. Prevent Its Return.</p></div>
        <ul className="grid grid-cols-2 gap-2 text-sm">{navLinks.map((l) => <li key={l.href}><a href={l.href} className="text-muted-foreground hover:text-foreground">{l.label}</a></li>)}</ul>
        <div className="space-y-1 text-sm text-muted-foreground"><p>Project ID: SEC26ITSO144</p><p>SDG 8 (primary) · SDG 9 · SDG 16</p><p>MineSphere-X is a college innovation prototype.</p></div>
      </div>
    </footer>
  );
}
