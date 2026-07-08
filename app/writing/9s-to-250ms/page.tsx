import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "9s → 0.25s: killing an N+1 in a healthcare API — Benjamin Adams",
  description:
    "How one endpoint went from ~75 queries and 9-second responses to 3 queries and 250ms: DISTINCT ON, batched aggregates, and selective KMS decryption.",
};

function Code({ children }: { children: string }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-5 font-mono text-[13px] leading-relaxed text-card-foreground">
      <code>{children}</code>
    </pre>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-2xl tracking-tight">{children}</h2>
  );
}

export default function CaseStudy() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
        Case study · PlusWellbeing.ai
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl [text-wrap:balance]">
        9s → <em className="wonk text-primary">0.25s</em>: killing an N+1 in a
        healthcare API
      </h1>
      <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
        The schema and query plans below are recreated on a toy dataset out of
        respect for employer confidentiality. The shapes, techniques, and
        numbers in the headline are the real ones.
      </p>

      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          A core endpoint — the one that lists a user’s chat sessions — was
          taking about <strong className="text-foreground">9 seconds</strong>{" "}
          at the median for active users. Tracing showed the API firing roughly{" "}
          <strong className="text-foreground">75 queries per request</strong>,
          adding up to ~98 seconds of cumulative database time across a
          session list. Nothing was slow individually; there was just an
          absurd number of round trips.
        </p>
        <p>The shape was the classic N+1, twice over:</p>
      </div>

      <Code>{`const sessions = await db.query(
  "SELECT * FROM chat_sessions WHERE user_id = $1", [userId]);

for (const session of sessions) {          // ~25 sessions
  // 1 query: the latest message for the preview line
  session.lastMessage = await db.query(
    "SELECT * FROM messages WHERE session_id = $1
     ORDER BY created_at DESC LIMIT 1", [session.id]);

  // 1 query: unread count
  session.unread = await db.query(
    "SELECT COUNT(*) FROM messages
     WHERE session_id = $1 AND read_at IS NULL", [session.id]);

  // 1 query: participant profile
  session.participant = await db.query(...);
}                                          // ≈ 1 + 25 × 3 queries`}</Code>

      <H2>The rewrite: think in sets, not rows</H2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          Three per-row lookups became two set-based queries.{" "}
          <code className="font-mono text-[13px] text-foreground">DISTINCT ON</code>{" "}
          — Postgres’s “first row per group” idiom — fetches every session’s
          latest message in one pass, and a single{" "}
          <code className="font-mono text-[13px] text-foreground">GROUP BY</code>{" "}
          computes all unread counts at once:
        </p>
      </div>

      <Code>{`-- latest message per session, one query for all sessions
SELECT DISTINCT ON (m.session_id) m.*
FROM messages m
WHERE m.session_id = ANY($1)
ORDER BY m.session_id, m.created_at DESC;

-- unread counts for all sessions, one query
SELECT session_id, COUNT(*) AS unread
FROM messages
WHERE session_id = ANY($1) AND read_at IS NULL
GROUP BY session_id;`}</Code>

      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          On the toy dataset (25 sessions, ~200 messages each), the before/after
          plans tell the story — 76 plan executions collapse into two:
        </p>
      </div>

      <Code>{`-- BEFORE (per session, × 75):
Limit (cost=0.42..4.10 rows=1)  actual time=1.2..1.3
  -> Index Scan Backward using messages_session_created_idx
     Filter: (session_id = '…')
-- × 75 round trips ≈ tens of seconds of cumulative DB time

-- AFTER (once):
Unique (cost=310..390 rows=25)  actual time=3.8..4.1
  -> Index Scan using messages_session_created_idx
HashAggregate (cost=180..205 rows=25)  actual time=2.9..3.1
-- 3 queries total, single-digit milliseconds each`}</Code>

      <H2>The sneaky half: decryption</H2>
      <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <p>
          Fixing the queries only got the endpoint to ~1s. The rest was
          application-side: message fields are encrypted at rest, and the old
          code decrypted <em>every</em> field on <em>every</em> row it touched
          — including fields the response never used. Restricting decryption
          to the two fields the session list actually renders (preview text,
          sender name) cut the remaining time to ~250ms.
        </p>
        <p>
          Final result:{" "}
          <span className="font-mono text-sm text-primary">
            ~75 queries → 3
          </span>{" "}
          ·{" "}
          <span className="font-mono text-sm text-primary">
            ~98s cumulative DB time → ~20ms
          </span>{" "}
          ·{" "}
          <span className="font-mono text-sm text-primary">9s → 0.25s</span>{" "}
          endpoint latency.
        </p>
      </div>

      <H2>What I took from it</H2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-muted-foreground [text-wrap:pretty]">
        <li>
          N+1s hide in ORMs and “clean” per-entity helper functions. The
          fastest way to find them is to count queries per request, not to
          stare at slow-query logs — no individual query was slow here.
        </li>
        <li>
          <code className="font-mono text-[13px] text-foreground">DISTINCT ON</code>{" "}
          + batched aggregates handle most “latest per group / count per
          group” patterns without window functions or lateral joins.
        </li>
        <li>
          Database time isn’t the whole story: per-row crypto, serialization,
          and network chatter deserve the same set-based thinking as SQL.
        </li>
      </ul>
    </article>
  );
}
