import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroPrompt } from "@/components/hero-prompt";
import { ScrollFX, Metric } from "@/components/motion";

/* ----------------------------------------------------------------------------
   Content
---------------------------------------------------------------------------- */

const links = {
  github: "https://github.com/Badams1",
  linkedin: "https://www.linkedin.com/in/benjamin-adams-444651292/",
  email: "bdadams083104@gmail.com",
  resume: "/BenjaminAdamsResume.pdf",
};

type WorkItem = {
  title: string;
  metric?: string;
  description: string;
  stack: string[];
  caseStudy?: { href: string; label: string };
};

type FeaturedRole = {
  company: string;
  companyUrl: string;
  role: string;
  dates: string;
  location: string;
  items: WorkItem[];
};

type SummaryRole = {
  company: string;
  companyUrl: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  stack: string[];
};

const featuredRole: FeaturedRole = {
  company: "PlusWellbeing.ai",
  companyUrl: "https://pluswellbeing.ai",
  role: "Software Engineer",
  dates: "Nov 2025 — Present",
  location: "Remote · Boston, MA",
  items: [
    {
      title: "AI meal-analysis pipeline",
      description:
        "A meal photo or free text goes in; structured nutrition data comes out. Claude Sonnet 4.5 (via Amazon Bedrock) identifies the ingredients, Nutritionix fills in the macros, and a scoring pass rates allergen safety and plan fit. Every response is JSON-schema-constrained, streamed over SSE, and saved as a FHIR food log.",
      stack: ["TypeScript", "Amazon Bedrock", "Nutritionix", "FHIR / Medplum", "SSE"],
      caseStudy: { href: "/writing/meal-photo-to-fhir/", label: "architecture" },
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
        "An n8n + Amazon Bedrock workflow that normalizes free-text recipe ingredients and maps them to retailer carts through modular Walmart and Instacart adapters.",
      stack: ["n8n", "Amazon Bedrock", "AWS"],
    },
    {
      title: "Internal tooling",
      description:
        "An org-wide GitHub → Monday.com sync and a reusable smoke-test framework that covers release QA across 4 apps.",
      stack: ["GitHub Actions", "Monday.com"],
    },
  ],
};

const earlierRoles: SummaryRole[] = [
  {
    company: "ATPCO",
    companyUrl: "https://www.atpco.net",
    role: "Software Engineering Intern",
    dates: "Jun — Aug 2025",
    location: "Herndon, VA",
    summary:
      "Built a custom OpenFeature provider for ATPCO’s Java services: flag definitions live as YAML in S3, evaluated from an in-memory store that degrades gracefully when S3 is unreachable. Shipped with JUnit 5/Mockito/JaCoCo coverage and OpenTelemetry instrumentation.",
    stack: ["Java", "Spring Boot", "OpenFeature", "AWS S3", "OpenTelemetry"],
  },
  {
    company: "Snipp Interactive",
    companyUrl: "https://www.snipp.com",
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
      "A Unix shell written in C — custom tokenizer and parser, process execution, pipes and redirection in the native build — compiled to WebAssembly so it runs right here on a sandboxed virtual filesystem.",
    stack: ["C", "WebAssembly", "Emscripten"],
    primaryLink: { label: "Try the terminal", href: "/terminal/", external: false },
    githubLink: "https://github.com/Badams1/MiniShell",
  },
  {
    title: "LeetGenie",
    tagline: "AI hints for LeetCode",
    command: "$ hint --no-spoilers",
    description:
      "A Chrome extension that gives you step-by-step hints on the LeetCode problem you’re stuck on — calibrated to point you in the right direction without leaking the answer. Live on the Chrome Web Store.",
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

function SectionHeading({ index, label }: { index: string; label: string }) {
  return (
    <h2 className="mb-8 flex items-center gap-4" data-reveal>
      <span className="font-mono text-[13px] font-medium tracking-[0.2em] text-primary/60">
        {index}
      </span>
      <span className="font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
      <span className="rule h-px flex-1 bg-border" aria-hidden="true" />
    </h2>
  );
}

/**
 * Server-rendered "types itself" line: every character is a span revealed on
 * a steps() delay, so the text still wraps naturally, stays selectable via
 * the sr-only copy, and renders instantly with reduced motion or no JS.
 */
function TypedLine({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="type-line"
        style={{ "--td": `${delay}ms` } as React.CSSProperties}
      >
        {Array.from(text).map((ch, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
    </p>
  );
}

function StackLine({ stack }: { stack: string[] }) {
  return (
    <p className="mt-3 font-mono text-xs text-muted-foreground">
      {stack.join("  ·  ")}
    </p>
  );
}

function DateStamp({ dates, location, align }: { dates: string; location: string; align?: "right" }) {
  return (
    <div className={`font-mono text-xs text-muted-foreground ${align === "right" ? "sm:text-right" : ""} lg:text-right`}>
      <div>{dates}</div>
      <div className="mt-0.5 text-[11px] tracking-[0.02em]">{location}</div>
    </div>
  );
}

function ExternalArrow() {
  return (
    <span aria-hidden="true" className="arrow-ext">
      &nbsp;↗
    </span>
  );
}

function CaseStudyLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group/cs mt-3 inline-block font-mono text-xs font-medium text-primary"
    >
      read the {label}{" "}
      <span aria-hidden="true" className="inline-block transition-transform group-hover/cs:translate-x-0.5">
        →
      </span>
    </a>
  );
}

/* ----------------------------------------------------------------------------
   Page
---------------------------------------------------------------------------- */

export default function Portfolio() {
  return (
    <>
      <ScrollFX />
      <a
        href="#work"
        className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-full bg-primary px-4 py-2 font-mono text-xs text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* Header ------------------------------------------------------------ */}
      <header className="site-header sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[46rem] items-center justify-between px-6 lg:max-w-[68rem]">
          <a href="#top" className="font-display text-[15px] italic tracking-tight">
            Benjamin Adams
          </a>
          <nav aria-label="Main" className="flex items-center gap-5">
            <div className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
              <a className="nav-link hover:text-primary" href="#work">Work</a>
              <a className="nav-link hover:text-primary" href="#projects">Projects</a>
              <a className="nav-link hover:text-primary" href="#about">About</a>
              <a className="nav-link hover:text-primary" href="#contact">Contact</a>
            </div>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-[#174736] active:scale-[0.97] motion-reduce:active:scale-100 dark:hover:bg-[#9ad0b5]"
            >
              Résumé
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-[46rem] px-6 lg:max-w-[68rem]">
        {/* Hero -------------------------------------------------------------- */}
        <section className="pb-16 pt-16 sm:pb-20 sm:pt-24">
          <h1 className="font-display text-[clamp(3.2rem,9vw,5.75rem)] leading-[0.98] tracking-tight [text-wrap:balance]">
            <span className="mask-word">
              <span style={{ "--d": "0ms" } as React.CSSProperties}>Benjamin</span>
            </span>{" "}
            <em className="wonk mask-word text-primary">
              <span style={{ "--d": "110ms" } as React.CSSProperties}>Adams</span>
            </em>
          </h1>
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16">
            <div>
              <p
                className="reveal mt-7 max-w-[40rem] text-lg leading-relaxed text-muted-foreground [text-wrap:pretty] sm:text-xl"
                style={{ animationDelay: "220ms" }}
              >
                Software engineer at PlusWellbeing.ai, turning LLM output into
                structured healthcare data — and making the PostgreSQL underneath
                it fast.
              </p>
              <TypedLine
                className="mt-7 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
                text="Boston, MA · Northeastern CS ’26 · Open to new-grad roles"
                delay={450}
              />
              <div
                className="reveal mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-sm"
                style={{ animationDelay: "560ms" }}
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
            </div>
            <div className="reveal mt-10 lg:mt-8" style={{ animationDelay: "720ms" }}>
              <HeroPrompt />
            </div>
          </div>
        </section>

        {/* Experience --------------------------------------------------------- */}
        <section id="work" className="scroll-mt-20 pb-16">
          <SectionHeading index="01" label="Experience" />

          {/* Featured: PlusWellbeing */}
          <article className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-10">
            <div className="rail relative hidden lg:block lg:pr-6 lg:pt-2" data-reveal>
              <DateStamp dates={featuredRole.dates} location={featuredRole.location} />
              <span
                aria-hidden="true"
                className="node absolute -right-[3.5px] top-3 h-1.5 w-1.5 rounded-full bg-primary"
              />
            </div>
            <div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between" data-reveal>
                <div>
                  <h3 className="font-display text-2xl tracking-tight">
                    <a className="transition-colors hover:text-primary" href={featuredRole.companyUrl} target="_blank" rel="noopener noreferrer">
                      {featuredRole.company}
                    </a>
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{featuredRole.role}</p>
                </div>
                <div className="lg:hidden">
                  <DateStamp dates={featuredRole.dates} location={featuredRole.location} align="right" />
                </div>
              </div>
              <ul className="mt-2 divide-y divide-border">
                {featuredRole.items.map((item) => (
                  <li key={item.title} className="py-6" data-reveal>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-display text-lg tracking-tight">{item.title}</h4>
                      {item.metric && (
                        <span className="font-mono text-sm font-medium text-primary">
                          <Metric value={item.metric} />
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-[46rem] text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
                      {item.description}
                    </p>
                    <StackLine stack={item.stack} />
                    {item.caseStudy && (
                      <CaseStudyLink href={item.caseStudy.href} label={item.caseStudy.label} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Earlier roles */}
          <p
            className="mt-12 mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            data-reveal
          >
            Earlier
            <span className="rule h-px flex-1 bg-border" aria-hidden="true" />
          </p>
          <div className="space-y-12">
            {earlierRoles.map((role) => (
              <article key={role.company} className="lg:grid lg:grid-cols-[10rem_1fr] lg:gap-10" data-reveal>
                <div className="rail relative hidden lg:block lg:pr-6 lg:pt-2">
                  <DateStamp dates={role.dates} location={role.location} />
                  <span
                    aria-hidden="true"
                    className="node absolute -right-[3.5px] top-3 h-1.5 w-1.5 rounded-full bg-primary"
                  />
                </div>
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl tracking-tight">
                        <a className="transition-colors hover:text-primary" href={role.companyUrl} target="_blank" rel="noopener noreferrer">
                          {role.company}
                        </a>
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{role.role}</p>
                    </div>
                    <div className="lg:hidden">
                      <DateStamp dates={role.dates} location={role.location} align="right" />
                    </div>
                  </div>
                  <p className="mt-4 max-w-[46rem] text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
                    {role.summary}
                  </p>
                  <StackLine stack={role.stack} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects ----------------------------------------------------------- */}
        <section id="projects" className="scroll-mt-20 pb-16">
          <SectionHeading index="02" label="Projects" />
          <div className="grid gap-5 sm:grid-cols-2" data-reveal-stagger>
            {projects.map((project) => (
              <article
                key={project.title}
                className="project-card group rounded-lg border border-border bg-card hover:border-primary/60"
              >
                {/* terminal chrome */}
                <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="term-dot h-2 w-2 rounded-full border border-muted-foreground/50" />
                    <span className="term-dot h-2 w-2 rounded-full border border-muted-foreground/50" />
                    <span className="term-dot h-2 w-2 rounded-full border border-muted-foreground/50" />
                  </span>
                  <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {project.tagline}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl tracking-tight">{project.title}</h3>
                  <p className="mt-1 font-mono text-xs text-primary">{project.command}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
                    {project.description}
                  </p>
                  <StackLine stack={project.stack} />
                  <div className="mt-5 flex items-center gap-5 font-mono text-sm">
                    <a
                      className="font-medium text-primary underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
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
        <section id="about" className="scroll-mt-20 pb-16">
          <SectionHeading index="03" label="About" />
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-16">
            <p className="max-w-[44rem] text-lg leading-relaxed [text-wrap:pretty]" data-reveal>
              I like systems that are fast, typed, and observable — and the
              unglamorous work that makes AI features trustworthy:
              schema-constrained outputs, idempotent backfills, queries that
              don’t fall over.
            </p>
            <dl
              className="mt-10 divide-y divide-border border-y border-border font-mono text-xs lg:mt-1"
              data-reveal
            >
              {[
                ["Currently", "SWE · PlusWellbeing.ai"],
                ["Education", "Northeastern · B.S. CS"],
                ["Graduating", "April 2026"],
                ["Based in", "Boston, MA"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact ------------------------------------------------------------- */}
        <section id="contact" className="scroll-mt-20 pb-16">
          <SectionHeading index="04" label="Contact" />
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-16" data-reveal-stagger>
            <div>
              <p className="font-display text-4xl tracking-tight sm:text-5xl">
                Let’s <em className="wonk text-primary">connect</em>.
              </p>
              <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-muted-foreground">
                Email is the fastest way to reach me — I read every message.
              </p>
              <div className="mt-6">
                <a
                  className="link-editorial inline-block font-display text-xl tracking-tight sm:text-2xl"
                  href={`mailto:${links.email}`}
                >
                  {links.email}
                </a>
              </div>
            </div>
            <div
              className="mt-10 divide-y divide-border border-y border-border font-mono text-sm lg:mt-2"
              data-reveal
            >
              <a
                className="group/row flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">GitHub</span>
                <span>Badams1<ExternalArrow /></span>
              </a>
              <a
                className="group/row flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary"
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">LinkedIn</span>
                <span>benjamin-adams<ExternalArrow /></span>
              </a>
              <a
                className="group/row flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary"
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Résumé</span>
                <span>PDF, 1 page<ExternalArrow /></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer -------------------------------------------------------------- */}
      <footer className="mx-auto max-w-[46rem] px-6 lg:max-w-[68rem]">
        <div
          className="flex flex-col gap-2 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
          data-reveal
        >
          <span>© 2026 Benjamin Adams</span>
          <span className="normal-case">$ curl bdadams.dev — yes, really</span>
          <span>Boston, MA — built with Next.js</span>
        </div>
      </footer>
    </>
  );
}
