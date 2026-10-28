import { useState } from "react";
import { Menu, X, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#technology", label: "Technology" },
  { href: "#contact", label: "Contact" },
];

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand"><Radar className="h-5 w-5 text-primary-foreground" /></span>
      MineSphere<span className="text-accent">-X</span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a></li>
          ))}
        </ul>
        <div className="hidden lg:block"><Button variant="hero" asChild><a href="#contact">Request a Demo</a></Button></div>
        <button className="text-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-muted-foreground hover:text-foreground">{l.label}</a>
          ))}
          <Button variant="hero" className="mt-2 w-full" asChild><a href="#contact" onClick={() => setOpen(false)}>Request a Demo</a></Button>
        </div>
      )}
    </header>
  );
}
