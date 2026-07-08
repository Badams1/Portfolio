import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[44rem] items-center justify-between px-6">
          <Link href="/" className="font-display text-[15px] italic tracking-tight">
            Benjamin Adams
          </Link>
          <nav aria-label="Main" className="flex items-center gap-5">
            <Link
              href="/#work"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to work
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[44rem] px-6 pb-24 pt-16">{children}</main>
      <footer className="mx-auto max-w-[44rem] px-6">
        <div className="flex flex-col gap-2 border-t border-border py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 Benjamin Adams</span>
          <span>bdadams.dev</span>
        </div>
      </footer>
    </>
  );
}
