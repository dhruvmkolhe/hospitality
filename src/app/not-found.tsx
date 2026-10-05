import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Off the map</p>
      <h1 className="mt-3 font-display text-5xl italic">That room is not in the house.</h1>
      <p className="mt-4 text-ink/70">The path you followed does not match a chamber or a page.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-sea px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream"
      >
        Back to the inn
      </Link>
    </main>
  );
}
