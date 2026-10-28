import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function GitHubHelper() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function ask() {
    if (!text.trim() || loading) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setAnswer("");
    setLoading(true);
    try {
      const res = await fetch("/api/github-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        setAnswer(await res.text());
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((a) => a + dec.decode(value, { stream: true }));
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="github-help" className="py-20 px-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">GitHub connection helper</h2>
        <p className="mt-2 text-muted-foreground">
          Stuck connecting this project to GitHub on your laptop? Describe what you see on screen and get the next step.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2000}
          rows={4}
          placeholder="e.g. I clicked + → Project but there is no GitHub option, only Settings…"
          className="mt-4 w-full rounded-md border border-input bg-background p-3 text-foreground"
        />
        <div className="mt-3 flex gap-3">
          <Button onClick={ask} disabled={loading || !text.trim()}>
            {loading ? "Thinking…" : "Suggest next step"}
          </Button>
          {loading && (
            <Button variant="outline" onClick={() => abortRef.current?.abort()}>Stop</Button>
          )}
        </div>
        {(answer || loading) && (
          <div className="mt-5 whitespace-pre-wrap rounded-md bg-muted p-4 text-foreground" aria-live="polite">
            {answer || "Looking at your description…"}
          </div>
        )}
      </div>
    </section>
  );
}
