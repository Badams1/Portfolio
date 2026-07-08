import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">$</span> cat {`{page}`}
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">
        No such file or <em className="wonk text-primary">directory</em>.
      </h1>
      <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-muted-foreground">
        This path doesn’t exist — but the shell that error message comes from
        does, and I wrote it in C.
      </p>
      <div className="mt-8 flex items-center gap-6 font-mono text-sm">
        <Link className="link-editorial" href="/">
          cd ~
        </Link>
        <Link className="link-editorial" href="/terminal/">
          open the terminal
        </Link>
      </div>
    </main>
  );
}
