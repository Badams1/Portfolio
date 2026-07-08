import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

/* ----------------------------------------------------------------------------
   Content
---------------------------------------------------------------------------- */

const links = {
  github: "https://github.com/Badams1",
  linkedin: "https://www.linkedin.com/in/benjamin-adams-444651292/",
  email: "adams.be@northeastern.edu",
  resume: "/BenjaminAdamsResume.pdf",
};

type WorkItem = {
  title: string;
  metric?: string;
  description: string;
  stack: string[];
};

type Role = {
  company: string;
  role: string;
  dates: string;
  location: string;
  items?: WorkItem[];
  summary?: string;
  stack?: string[];
};

const featuredRole: Role = {
  company: "PlusWellbeing.ai",
  role: "Software Engineer",
  dates: "Nov 2025 — Present",
  location: "Remote · Boston, MA",
  items: [
    {
      title: "AI meal-analysis pipeline",
      metric: "photo → FHIR",
      description:
        "A meal photo or free text goes in; structured nutrition data comes out. Multimodal Amazon Bedrock (Claude Sonnet 4.5) identifies the ingredients, NutritionIX fills in the macros, a scoring pass rates allergen safety and plan fit, and the result is saved as a FHIR food log — JSON-schema-constrained output, streamed to clients over SSE.",
      stack: ["TypeScript", "Amazon Bedrock", "NutritionIX", "FHIR / Medplum", "SSE"],
    },
    {
      title: "PostgreSQL query optimization",
      metric: "9s → 0.25s",
      description:
        "Tracked an N+1 problem on a core endpoint down to ~75 per-session queries (~98s of cumulative database time) and rewrote it with set-based SQL — DISTINCT ON, batched GROUP BY counts — plus selective KMS decryption.",
      stack: ["PostgreSQL", "TypeScript", "AWS KMS"],
    },
    {
      title: "Patient identifier (MRN) system",
      description:
        "UUID-based medical record numbers for a healthcare platform: an idempotent batch backfill for existing patients and an event-driven service that assigns IDs at creation, collision-safe under concurrency.",
      stack: ["TypeScript", "Medplum / FHIR", "AWS Lambda"],
    },
    {
      title: "Agentic shopping workflow",
      description:
        "An n8n + Amazon Bedrock workflow that normalizes free-text recipe ingredients and maps them to retailer carts through modular Walmart and Instacart adapters. Also built an org-wide GitHub → Monday.com sync and a reusable smoke-test framework covering release QA across 4 apps.",
      stack: ["n8n", "Amazon Bedrock", "GitHub Actions"],
    },
  ],
};

const earlierRoles: Role[] = [
  {
    company: "ATPCO",
    role: "Software Engineering Intern",
    dates: "Jun — Aug 2025",
    location: "Herndon, VA",
    summary:
      "Built a custom OpenFeature provider that evaluates feature flags from YAML definitions in S3 through an in-memory store with graceful fallback. Shipped unit and integration coverage with JUnit 5, Mockito, and JaCoCo, added OpenTelemetry instrumentation, and closed the summer with a live demo.",
    stack: ["Java", "Spring Boot", "OpenFeature", "AWS S3", "OpenTelemetry"],
  },
  {
    company: "Snipp Interactive",
    role: "Software Engineering Intern",
    dates: "Jan — Jun 2024",
    location: "Bethesda, MD",
    summary:
      "Built a Node.js ingestion API that turns messy vendor CSVs into validated, schema-conformant records using OpenAI prompt + JSON-schema workflows; a LibPostal address-normalization service feeding fraud-detection signals; and a Vue 3 asset-management UI on top of S3.",
    stack: ["Node.js", "OpenAI API", "LibPostal", "Vue 3", "AWS S3"],
  },
];

const projects = [
  {
    title: "MiniShell",
    tagline: "a Unix shell, in your browser",
    command: "$ ./minishell",
    description:
      "A Unix shell written in C — custom tokenizer and parser, process execution, pipes, redirection — compiled to WebAssembly so it runs right here with a sandboxed virtual filesystem.",
    stack: ["C", "WebAssembly", "Emscripten"],
    primaryLink: { label: "Try the terminal", href: "/terminal/", external: false },
    githubLink: "https://github.com/Badams1/MiniShell",
  },
  {
    title: "LeetGenie",
    tagline: "AI hints for LeetCode",
    command: "$ hint --no-spoilers",
    description:
      "A Chrome extension that adds AI-powered hints to LeetCode problems — step-by-step guidance that points you in the right direction without giving the answer away.",
    stack: ["JavaScript", "Manifest V3", "OpenAI API"],
    primaryLink: {
      label: "Chrome Web Store",
      href: "https://chromewebstore.google.com/detail/eodogpbkkimfpclkdjlglkjjdfepjnpl",
      external: true,
    },
    githubLink: "https://github.com/Badams1/LeetGenie",
  },
];

/* ----------------------------------------------------------------------------
   Small building blocks
---------------------------------------------------------------------------- */

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-5">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}

function StackLine({ stack }: { stack: string[] }) {
  return (
    <p className="mt-3 font-mono text-xs text-muted-foreground/90">
      {stack.join("  ·  ")}
    </p>
  );
}

function RoleHeader({ role }: { role: Role }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h3 className="font-display text-2xl tracking-tight">{role.company}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{role.role}</p>
      </div>
      <div className="font-mono text-xs text-muted-foreground sm:text-right">
        <div>{role.dates}</div>
        <div className="mt-0.5 opacity-70">{role.location}</div>
      </div>
    </div>
  );
}

function ExternalArrow() {
  return <span aria-hidden="true">&nbsp;↗</span>;
}

/* ----------------------------------------------------------------------------
   Page
---------------------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <main className="min-h-screen">
      {/* Header ------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[46rem] items-center justify-between px-6">
          <a href="#top" className="font-display text-[15px] italic tracking-tight">
            Benjamin Adams
          </a>
          <nav className="flex items-center gap-5">
            <div className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
              <a className="transition-colors hover:text-primary" href="#work">Work</a>
              <a className="transition-colors hover:text-primary" href="#projects">Projects</a>
              <a className="transition-colors hover:text-primary" href="#about">About</a>
              <a className="transition-colors hover:text-primary" href="#contact">Contact</a>
            </div>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-85"
            >
              Résumé
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-[46rem] px-6">
        {/* Hero -------------------------------------------------------------- */}
        <section className="pb-20 pt-20 sm:pb-24 sm:pt-28">
          <p className="reveal font-mono text-sm text-muted-foreground" style={{ animationDelay: "0ms" }}>
            $ whoami
          </p>
          <h1
            className="reveal mt-4 font-display text-[clamp(3.2rem,9vw,5.75rem)] leading-[0.98] tracking-tight"
            style={{ animationDelay: "90ms" }}
          >
            Benjamin <em className="text-primary">Adams</em>
          </h1>
          <p
            className="reveal mt-7 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ animationDelay: "180ms" }}
          >
            Software engineer building applied-AI and data systems — currently
            shipping healthcare infrastructure at PlusWellbeing.ai.
          </p>
          <p
            className="reveal mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            style={{ animationDelay: "270ms" }}
          >
            Boston, MA · Northeastern CS ’26 · Open to new-grad roles
            <span className="cursor-blink" aria-hidden="true" />
          </p>
          <div
            className="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-sm"
            style={{ animationDelay: "360ms" }}
          >
            <a className="link-editorial" href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub<ExternalArrow />
            </a>
            <a className="link-editorial" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<ExternalArrow />
            </a>
            <a className="link-editorial" href={`mailto:${links.email}`}>
              {links.email}
            </a>
          </div>
        </section>

        {/* Experience --------------------------------------------------------- */}
        <section id="work" className="scroll-mt-20 pb-20">
          <SectionHeading label="Experience" />

          {/* Featured: PlusWellbeing */}
          <RoleHeader role={featuredRole} />
          <ul className="mt-2 divide-y divide-border">
            {featuredRole.items!.map((item) => (
              <li key={item.title} className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-lg tracking-tight">{item.title}</h4>
                  {item.metric && (
                    <span className="font-mono text-sm font-medium text-primary">
                      {item.metric}
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-[40rem] text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <StackLine stack={item.stack} />
              </li>
            ))}
          </ul>

          {/* Earlier roles */}
          <div className="mt-14 space-y-12">
            {earlierRoles.map((role) => (
              <article key={role.company}>
                <RoleHeader role={role} />
                <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted-foreground">
                  {role.summary}
                </p>
                <StackLine stack={role.stack!} />
              </article>
            ))}
          </div>
        </section>

        {/* Projects ----------------------------------------------------------- */}
        <section id="projects" className="scroll-mt-20 pb-20">
          <SectionHeading label="Projects" />
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60"
              >
                {/* terminal chrome */}
                <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
                    <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
                    <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
                  </span>
                  <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {project.tagline}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl tracking-tight">{project.title}</h3>
                  <p className="mt-1 font-mono text-xs text-primary">{project.command}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <StackLine stack={project.stack} />
                  <div className="mt-5 flex items-center gap-5 font-mono text-sm">
                    <a
                      className="font-medium text-primary transition-all hover:underline hover:underline-offset-4"
                      href={project.primaryLink.href}
                      {...(project.primaryLink.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {project.primaryLink.label}{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                    <a
                      className="link-editorial text-muted-foreground"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub<ExternalArrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About --------------------------------------------------------------- */}
        <section id="about" className="scroll-mt-20 pb-20">
          <SectionHeading label="About" />
          <p className="max-w-[38rem] text-lg leading-relaxed">
            Video games got me curious about how software works; Northeastern’s
            CS program turned that curiosity into a career. I like systems that
            are fast, typed, and observable — and shipping things real people
            use. I graduate in April 2026 and I’m looking for new-grad software
            engineering roles.
          </p>
        </section>

        {/* Contact ------------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 pb-16">
          <SectionHeading label="Contact" />
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Let’s <em className="text-primary">connect</em>.
          </h2>
          <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-muted-foreground">
            The fastest way to reach me — I read everything.
          </p>
          <a
            className="link-editorial mt-6 inline-block font-display text-xl tracking-tight sm:text-2xl"
            href={`mailto:${links.email}`}
          >
            {links.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-sm">
            <a className="link-editorial" href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub<ExternalArrow />
            </a>
            <a className="link-editorial" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<ExternalArrow />
            </a>
            <a className="link-editorial" href={links.resume} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)
            </a>
          </div>
        </section>

        {/* Footer -------------------------------------------------------------- */}
        <footer className="flex flex-col gap-2 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Benjamin Adams</span>
          <span>Boston, MA — built with Next.js</span>
        </footer>
      </div>
    </main>
  );
}
