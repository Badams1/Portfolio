import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "From meal photo to FHIR — Benjamin Adams",
  description:
    "The architecture of an LLM pipeline that turns a meal photo into a structured, schema-constrained FHIR food log: Claude on Bedrock, Nutritionix, scoring, SSE.",
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-2xl tracking-tight">{children}</h2>
  );
}

function Diagram() {
  const box = "fill-[var(--card)] stroke-[var(--border)]";
  const label = "fill-[var(--foreground)] font-mono text-[11px]";
  const sub = "fill-[var(--muted-foreground)] font-mono text-[9.5px]";
  const arrow = "stroke-[var(--primary)]";
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 640 240"
        role="img"
        aria-label="Pipeline diagram: photo or text into Claude on Bedrock, then Nutritionix, then scoring, then FHIR food log, streamed to the client over SSE"
        className="w-full rounded-lg border border-border bg-card p-2"
      >
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 z" className="fill-[var(--primary)]" />
          </marker>
        </defs>

        {/* input */}
        <rect x="20" y="40" width="120" height="56" rx="8" className={box} />
        <text x="80" y="64" textAnchor="middle" className={label}>meal photo</text>
        <text x="80" y="80" textAnchor="middle" className={sub}>or free text</text>

        {/* bedrock */}
        <rect x="200" y="40" width="150" height="56" rx="8" className={box} />
        <text x="275" y="64" textAnchor="middle" className={label}>Claude Sonnet 4.5</text>
        <text x="275" y="80" textAnchor="middle" className={sub}>Amazon Bedrock · JSON schema</text>

        {/* nutritionix */}
        <rect x="410" y="40" width="130" height="56" rx="8" className={box} />
        <text x="475" y="64" textAnchor="middle" className={label}>Nutritionix</text>
        <text x="475" y="80" textAnchor="middle" className={sub}>macros per ingredient</text>

        {/* scoring */}
        <rect x="410" y="160" width="130" height="56" rx="8" className={box} />
        <text x="475" y="184" textAnchor="middle" className={label}>scoring pass</text>
        <text x="475" y="200" textAnchor="middle" className={sub}>allergen safety · plan fit</text>

        {/* fhir */}
        <rect x="200" y="160" width="150" height="56" rx="8" className={box} />
        <text x="275" y="184" textAnchor="middle" className={label}>FHIR food log</text>
        <text x="275" y="200" textAnchor="middle" className={sub}>Medplum</text>

        {/* client */}
        <rect x="20" y="160" width="120" height="56" rx="8" className={box} />
        <text x="80" y="184" textAnchor="middle" className={label}>client app</text>
        <text x="80" y="200" textAnchor="middle" className={sub}>SSE stream</text>

        {/* arrows */}
        <line x1="140" y1="68" x2="196" y2="68" strokeWidth="1.5" markerEnd="url(#arr)" className={arrow} />
        <line x1="350" y1="68" x2="406" y2="68" strokeWidth="1.5" markerEnd="url(#arr)" className={arrow} />
        <line x1="475" y1="96" x2="475" y2="156" strokeWidth="1.5" markerEnd="url(#arr)" className={arrow} />
        <line x1="410" y1="188" x2="354" y2="188" strokeWidth="1.5" markerEnd="url(#arr)" className={arrow} />
        <line x1="200" y1="188" x2="144" y2="188" strokeWidth="1.5" markerEnd="url(#arr)" className={arrow} />

        {/* streaming side-channel */}
        <path d="M 275 96 C 275 130, 120 130, 85 156" fill="none" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arr)" className={arrow} />
        <text x="180" y="122" textAnchor="middle" className={sub}>tokens stream as they’re produced</text>
      </svg>
      <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
        The pipeline, end to end. Solid arrows are the data path; the dashed
        arrow is the SSE stream that keeps the UI live while the pipeline runs.
      </figcaption>
    </figure>
  );
}

export default function CaseStudy() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
        Architecture · PlusWellbeing.ai
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl [text-wrap:balance]">
        From meal photo to <em className="wonk text-primary">FHIR</em>
      </h1>
      <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
        Details below are limited to what the product publicly does; internal
        specifics are simplified.
      </p>

      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          The feature sounds simple: photograph your lunch, get a nutrition
          log. The engineering problem is that every step of that sentence is
          probabilistic — vision models guess, food databases disagree, and
          health data has to end up in a format clinicians and other systems
          can trust. This is the pipeline that makes it dependable.
        </p>
      </div>

      <Diagram />

      <H2>Schema-constrained, or it didn’t happen</H2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          The model call (Claude Sonnet 4.5 on Amazon Bedrock) is forced to
          return JSON matching a strict schema — ingredient names, quantities,
          units, confidence. Free-text answers are never parsed with regexes
          and hope; a response that fails validation is retried, and one that
          fails twice degrades to a “needs review” state instead of writing
          garbage into a health record. LLM output is treated like any other
          untrusted user input.
        </p>
      </div>

      <H2>Why FHIR</H2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          The end of the pipeline isn’t a bespoke <code className="font-mono text-[13px] text-foreground">meals</code>{" "}
          table — it’s a FHIR resource in Medplum. That one decision buys
          interoperability with the rest of the healthcare stack: care teams,
          analytics, and any future integration read the same standard
          resource, and access control comes with the platform instead of
          being reinvented.
        </p>
      </div>

      <H2>Why streaming</H2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          A full pipeline run takes seconds — too long for a spinner. Results
          stream to the client over SSE as they’re produced, so the app shows
          ingredients appearing while macros and scoring are still in flight.
          Same total latency, entirely different feel.
        </p>
        <p>
          The scoring pass at the end is deliberately boring: deterministic
          rules for allergen safety and plan fit, applied to the structured
          data — not another model call. When a number decides whether a meal
          is flagged for an allergy, you want arithmetic, not vibes.
        </p>
      </div>
    </article>
  );
}
