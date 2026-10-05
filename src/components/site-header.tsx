import Link from "next/link";

const links = [
  { href: "/rooms", label: "Rooms" },
  { href: "/dining", label: "Dining" },
  { href: "/wellness", label: "Wellness" },
  { href: "/find", label: "Find a stay" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-sea-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-cream">
          <p className="m-0 text-[11px] uppercase tracking-[0.28em] text-gold">Cape Meridian</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">Hearth & Harbor</p>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/90 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          ))}
          <Link
            href="/stay"
            className="rounded-full border border-cream/30 px-4 py-2 text-xs uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold"
          >
            Book a stay
          </Link>
        </nav>
        <Link
          href="/stay"
          className="rounded-full border border-cream/30 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-cream md:hidden"
        >
          Book
        </Link>
      </div>
      <nav className="flex gap-4 overflow-x-auto px-6 pb-3 text-[11px] uppercase tracking-[0.16em] text-cream/80 md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
