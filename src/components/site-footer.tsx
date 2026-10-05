import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-sea-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="m-0 text-[11px] uppercase tracking-[0.28em] text-gold">Est. 1912</p>
          <h2 className="mt-3 font-display text-4xl italic">An inn at the edge of the Atlantic.</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-cream/75">
            18 Harbor Lane, Cape Meridian, Maine. Fires are laid at four. The last ferry is at dusk.
            We hold rooms until seven unless you write ahead.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/rooms">Rooms & suites</Link>
            </li>
            <li>
              <Link href="/dining">Tide Table</Link>
            </li>
            <li>
              <Link href="/wellness">Cedar soak</Link>
            </li>
            <li>
              <Link href="/stay">Book a stay</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">The house</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/find">Find a reservation</Link>
            </li>
            <li>
              <Link href="/desk">Innkeeper desk</Link>
            </li>
            <li>desk@hearthandharbor.com</li>
            <li>207 · 555 · 1912</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs tracking-[0.16em] text-cream/50">
        Hearth & Harbor · Both the guest house and the innkeeper desk live here.
      </div>
    </footer>
  );
}
