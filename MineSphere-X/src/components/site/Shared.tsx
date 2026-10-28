import { useState, type ReactNode } from "react";
import { ImageOff } from "lucide-react";

export function Section({ id, eyebrow, title, intro, children, alt }: { id: string; eyebrow?: string; title: ReactNode; intro?: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 ${alt ? "bg-section" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function SafeImage({ src, alt, className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed || !src)
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-muted text-muted-foreground ${className ?? ""}`}>
        <ImageOff className="h-8 w-8" />
      </div>
    );
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}

export function IconBadge({ children }: { children: ReactNode }) {
  return <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-accent">{children}</div>;
}
