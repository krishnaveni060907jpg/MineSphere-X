import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero, Problem, Solution, Features, HowItWorks, Hardware, AISection, Benefits, SDG, About } from "@/components/site/Sections";
import { Dashboard } from "@/components/site/Dashboard";
import { Contact, Footer } from "@/components/site/Contact";
import { GitHubHelper } from "@/components/site/GitHubHelper";

const title = "MineSphere-X — Predictive Intelligence for Mine Safety";
const description = "AI-powered mine safety prototype that predicts hazard recurrence, tracks corrective actions, and verifies repairs with IoT sensors.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero /><Problem /><Solution /><Features /><HowItWorks /><Dashboard /><Hardware /><AISection /><Benefits /><SDG /><About /><GitHubHelper /><Contact />
      </main>
      <Footer />
    </div>
  );
}
