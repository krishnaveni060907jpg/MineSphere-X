import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM = `You help a Lovable project owner connect their project to GitHub on a laptop browser.
Known facts: the GitHub connection lives in the + menu next to the chat input -> Project -> GitHub, or project name -> Settings -> Git (shortcut Ctrl/Cmd + .). Connecting needs workspace or project owner/admin rights. It always creates a NEW private repository; it cannot link an existing one. The user clicks Connect (or Add connection), signs in to GitHub, installs/authorizes the Lovable GitHub app, picks an account or organization, and confirms. The repo link then shows on the Git page. Popup blockers, being signed into the wrong GitHub account, or not granting the app access to the organization are common blockers.
Reply in plain, friendly language for a non-technical person. Give ONE next step (at most 3 short numbered actions) and one sentence on what they should see afterwards. Never invent buttons that are not listed above; if unsure, ask them to describe the screen.`;

export const Route = createFileRoute("/api/github-help")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI is not configured.", { status: 500 });
        const body = (await request.json().catch(() => null)) as { description?: string } | null;
        const description = body?.description?.trim().slice(0, 2000);
        if (!description) return new Response("Please describe what you see.", { status: 400 });

        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });
        let upstreamError: string | null = null;
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system: SYSTEM,
          messages: [{ role: "user", content: description }],
          abortSignal: request.signal,
          maxRetries: 0,
          providerOptions: {
            openai: { forceReasoning: true, reasoningEffort: "low", store: false },
          },
          onError: ({ error }) => {
            const e = error as { statusCode?: number; message?: string };
            upstreamError =
              e.statusCode === 402
                ? "AI credits have run out for this workspace."
                : e.statusCode === 429
                  ? "Too many requests, please wait a moment and try again."
                  : "The assistant could not answer right now.";
            console.error("github-help AI error", e.statusCode, e.message);
          },
        });
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
            } catch {
              /* reported via onError */
            }
            if (upstreamError) controller.enqueue(encoder.encode(`\n\n⚠ ${upstreamError}`));
            controller.close();
          },
        });
        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
        });
      },
    },
  },
});
