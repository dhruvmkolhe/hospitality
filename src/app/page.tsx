import Image from "next/image";
import Link from "next/link";
import { initialRooms } from "@/lib/data";
import { RoomCard } from "@/components/room-card";
import { InquiryForm } from "@/components/inquiry-form";

const hero =
  "https://images.pexels.com/photos/30820150/pexels-photo-30820150.jpeg?auto=compress&cs=tinysrgb&w=1800";
const dining =
  "https://images.pexels.com/photos/36694451/pexels-photo-36694451.jpeg?auto=compress&cs=tinysrgb&w=1600";
const spa =
  "https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&w=1600";
const pool =
  "https://images.pexels.com/photos/12387908/pexels-photo-12387908.jpeg?auto=compress&cs=tinysrgb&w=1600";
const lobby =
  "https://images.pexels.com/photos/14036246/pexels-photo-14036246.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function HomePage() {
  const featured = [...initialRooms].sort((a, b) => a.rate - b.rate).slice(0, 3);

  return (
    <main>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-sea-deep">
        <Image src={hero} alt="Hearth and Harbor on the Cape Meridian coast" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-deep via-sea-deep/45 to-sea-deep/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-28">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Cape Meridian, Maine</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] text-cream md:text-7xl">
            Come in from the weather. Stay until the tide forgets you.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-cream/80">
            Six rooms, a tide-facing kitchen, and a cedar soak above the rocks. The guest house is open
            for booking. The innkeeper desk keeps the book.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/stay"
              className="rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.18em] text-ink"
            >
              Book a stay
            </Link>
            <Link
              href="/rooms"
              className="rounded-full border border-cream/30 px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream"
            >
              See the rooms
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The house</p>
          <h2 className="mt-3 font-display text-5xl italic leading-tight">A working inn, not a stage set.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-ink/75">
            Hearth & Harbor has taken in weather-blown travelers since 1912. Fires are laid at four.
            Breakfast is served until the last guest comes down. Both the public rooms and the
            innkeeper’s ledger live in this house — book a chamber, then find it again by name.
          </p>
        </div>
        <div className="relative h-80 overflow-hidden rounded-[2rem]">
          <Image src={lobby} alt="The inn lobby" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-sand/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Chambers</p>
              <h2 className="mt-3 font-display text-5xl">Rooms facing water, garden, and green.</h2>
            </div>
            <Link href="/rooms" className="hidden text-xs uppercase tracking-[0.18em] text-sea md:inline">
              All rooms
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-2">
        <Link href="/dining" className="group relative isolate min-h-[420px] overflow-hidden rounded-[2rem]">
          <Image src={dining} alt="Tide Table dining" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-cream">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">The Tide Table</p>
            <h3 className="mt-2 font-display text-4xl italic">Supper beside the black water.</h3>
          </div>
        </Link>
        <Link href="/wellness" className="group relative isolate min-h-[420px] overflow-hidden rounded-[2rem]">
          <Image src={spa} alt="Cedar soak" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-cream">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">Wellness</p>
            <h3 className="mt-2 font-display text-4xl italic">Cedar, steam, and a long look at the bay.</h3>
          </div>
        </Link>
      </section>

      <section className="relative isolate overflow-hidden bg-sea-deep py-24">
        <Image src={pool} alt="The pool above the rocks" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 text-center text-cream">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Both sides of the house</p>
          <h2 className="mt-4 font-display text-5xl italic">Guests book. Innkeepers keep the book.</h2>
          <p className="mt-5 text-base leading-8 text-cream/80">
            Request a stay from the guest house, then open the innkeeper desk to confirm, hold a room,
            or file a letter. Everything writes to the same ledger.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/stay" className="rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.18em] text-ink">
              Guest booking
            </Link>
            <Link href="/desk" className="rounded-full border border-cream/30 px-6 py-3 text-xs uppercase tracking-[0.18em] text-cream">
              Innkeeper desk
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Write the house</p>
          <h2 className="mt-3 font-display text-5xl italic">A note for private supper, a soak, a celebration.</h2>
          <p className="mt-4 text-base leading-8 text-ink/75">
            Letters arrive at the innkeeper desk the same afternoon. We answer by dusk unless the
            ferry is late.
          </p>
        </div>
        <InquiryForm />
      </section>
    </main>
  );
}
